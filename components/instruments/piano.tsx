"use client"

import { useCallback, useEffect, useState, useRef } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { PianoTutorials } from "./piano-tutorials"

// Generate full 88-key piano (A0 to C8)
const noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
const keyboardMapping: Record<string, string> = {
  "a": "C", "w": "C#", "s": "D", "e": "D#", "d": "E", "f": "F",
  "t": "F#", "g": "G", "y": "G#", "h": "A", "u": "A#", "j": "B",
  "k": "C+", "o": "C#+", "l": "D+", "p": "D#+", ";": "E+"
}

function generateFullPiano() {
  const notes: { note: string; isBlack: boolean }[] = []
  
  // Start with A0, A#0, B0
  notes.push({ note: "A0", isBlack: false })
  notes.push({ note: "A#0", isBlack: true })
  notes.push({ note: "B0", isBlack: false })
  
  // Full octaves 1-7
  for (let octave = 1; octave <= 7; octave++) {
    for (const name of noteNames) {
      notes.push({
        note: `${name}${octave}`,
        isBlack: name.includes("#")
      })
    }
  }
  
  // End with C8
  notes.push({ note: "C8", isBlack: false })
  
  return notes
}

const allNotes = generateFullPiano()

// Calculate frequency for any note
function getFrequency(note: string): number {
  const match = note.match(/^([A-G]#?)(\d)$/)
  if (!match) return 440
  
  const [, noteName, octaveStr] = match
  const octave = parseInt(octaveStr)
  
  const noteIndex = noteNames.indexOf(noteName)
  const semitonesFromA4 = (octave - 4) * 12 + (noteIndex - 9)
  
  return 440 * Math.pow(2, semitonesFromA4 / 12)
}

export function Piano() {
  const [activeNotes, setActiveNotes] = useState<Set<string>>(new Set())
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null)
  const [currentOctave, setCurrentOctave] = useState(4)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    setAudioContext(ctx)
    return () => {
      ctx.close()
    }
  }, [])

  // Scroll to middle C (C4) on mount
  useEffect(() => {
    if (scrollRef.current) {
      const whiteKeyWidth = 40
      const c4Index = allNotes.filter(n => !n.isBlack).findIndex(
        (_, i, arr) => arr.slice(0, i + 1).filter(n => allNotes.indexOf(n) <= allNotes.findIndex(note => note.note === "C4")).length > 0
      )
      // Find white key index for C4
      let whiteKeyCount = 0
      for (let i = 0; i < allNotes.length; i++) {
        if (!allNotes[i].isBlack) whiteKeyCount++
        if (allNotes[i].note === "C4") break
      }
      const scrollTo = (whiteKeyCount - 1) * whiteKeyWidth - scrollRef.current.clientWidth / 2 + whiteKeyWidth / 2
      scrollRef.current.scrollLeft = Math.max(0, scrollTo)
    }
  }, [])

  const playNote = useCallback(async (note: string) => {
    if (!audioContext) return

    // Resume audio context if it's suspended (browser autoplay policy)
    if (audioContext.state === "suspended") {
      await audioContext.resume()
    }

    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.value = getFrequency(note)
    oscillator.type = "triangle"
    
    gainNode.gain.setValueAtTime(0.25, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.5)
    
    oscillator.start()
    oscillator.stop(audioContext.currentTime + 1.5)
    
    setActiveNotes(prev => new Set([...prev, note]))
    setTimeout(() => {
      setActiveNotes(prev => {
        const next = new Set(prev)
        next.delete(note)
        return next
      })
    }, 150)
  }, [audioContext])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      const mapping = keyboardMapping[key]
      if (!mapping) return
      
      let noteName = mapping
      let octave = currentOctave
      
      if (mapping.endsWith("+")) {
        noteName = mapping.slice(0, -1)
        octave = currentOctave + 1
      }
      
      const fullNote = `${noteName}${octave}`
      if (allNotes.some(n => n.note === fullNote) && !activeNotes.has(fullNote)) {
        playNote(fullNote)
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "z" || e.key === "Z") {
        setCurrentOctave(prev => Math.max(1, prev - 1))
      } else if (e.key === "x" || e.key === "X") {
        setCurrentOctave(prev => Math.min(7, prev + 1))
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [playNote, activeNotes, currentOctave])

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = direction === "left" ? -300 : 300
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" })
    }
  }

  const whiteKeys = allNotes.filter(n => !n.isBlack)

  // Calculate black key positions
  const getBlackKeyPosition = (note: string) => {
    const noteIndex = allNotes.findIndex(n => n.note === note)
    let whiteKeyCount = 0
    for (let i = 0; i < noteIndex; i++) {
      if (!allNotes[i].isBlack) whiteKeyCount++
    }
    return whiteKeyCount * 40 - 12 // 40px white key width, 12px offset
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="flex items-center justify-between w-full max-w-4xl px-4">
        <div className="text-sm text-muted-foreground">
          Keys: A-L (white), W,E,T,Y,U,O,P (black) | Z/X to shift octave
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Octave: {currentOctave}</span>
          <Button variant="outline" size="sm" onClick={() => setCurrentOctave(prev => Math.max(1, prev - 1))}>
            -
          </Button>
          <Button variant="outline" size="sm" onClick={() => setCurrentOctave(prev => Math.min(7, prev + 1))}>
            +
          </Button>
        </div>
      </div>
      
      <div className="flex items-center gap-2 w-full max-w-5xl">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => scroll("left")}
          className="shrink-0"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        
        <div 
          ref={scrollRef}
          className="overflow-x-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent flex-1"
          style={{ scrollbarWidth: "thin" }}
        >
          <div className="relative flex" style={{ width: `${whiteKeys.length * 40}px` }}>
            {/* White keys */}
            {whiteKeys.map((noteObj) => {
              const octave = parseInt(noteObj.note.match(/\d+/)?.[0] || "4")
              const isCurrentOctave = octave === currentOctave || octave === currentOctave + 1
              
              return (
                <button
                  key={noteObj.note}
                  onClick={() => playNote(noteObj.note)}
                  className={cn(
                    "relative w-10 h-36 bg-foreground border-r border-border/50 transition-all duration-75",
                    "hover:bg-foreground/90 active:bg-muted",
                    "flex flex-col items-center justify-end pb-1",
                    "first:rounded-bl-md last:rounded-br-md",
                    activeNotes.has(noteObj.note) && "bg-primary/40 scale-y-[0.98] origin-top",
                    isCurrentOctave && "ring-1 ring-inset ring-primary/20"
                  )}
                  style={{ zIndex: 1 }}
                >
                  <span className={cn(
                    "text-[9px] text-background/70 font-medium",
                    noteObj.note.startsWith("C") && !noteObj.note.includes("#") && "text-background font-bold"
                  )}>
                    {noteObj.note}
                  </span>
                </button>
              )
            })}
            
            {/* Black keys */}
            {allNotes.filter(n => n.isBlack).map((noteObj) => {
              const left = getBlackKeyPosition(noteObj.note)
              const octave = parseInt(noteObj.note.match(/\d+/)?.[0] || "4")
              const isCurrentOctave = octave === currentOctave || octave === currentOctave + 1
              
              return (
                <button
                  key={noteObj.note}
                  onClick={() => playNote(noteObj.note)}
                  className={cn(
                    "absolute w-6 h-20 bg-background border border-border rounded-b-md transition-all duration-75",
                    "hover:bg-muted active:bg-muted/80",
                    activeNotes.has(noteObj.note) && "bg-primary scale-y-[0.98] origin-top",
                    isCurrentOctave && "ring-1 ring-primary/30"
                  )}
                  style={{ 
                    left: `${left}px`,
                    top: 0,
                    zIndex: 2,
                  }}
                />
              )
            })}
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => scroll("right")}
          className="shrink-0"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
      
      <div className="text-xs text-muted-foreground text-center">
        Full 88-key piano (A0 to C8) - Scroll or use arrows to navigate
      </div>

      {/* Movie BGM Tutorials */}
      <div className="w-full max-w-4xl mt-8 pt-8 border-t border-border">
        <PianoTutorials onPlayNote={playNote} activeNotes={activeNotes} />
      </div>
    </div>
  )
}
