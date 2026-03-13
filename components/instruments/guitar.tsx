"use client"

import { useCallback, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { GuitarTutorials } from "./guitar-tutorials"

const strings = [
  { name: "E", baseFreq: 329.63, key: "1" },
  { name: "B", baseFreq: 246.94, key: "2" },
  { name: "G", baseFreq: 196.00, key: "3" },
  { name: "D", baseFreq: 146.83, key: "4" },
  { name: "A", baseFreq: 110.00, key: "5" },
  { name: "E", baseFreq: 82.41, key: "6" },
]

const frets = [0, 1, 2, 3, 4]

const chords: Record<string, number[][]> = {
  "C": [[0, 0], [1, 1], [2, 0], [3, 2], [4, 3]],
  "G": [[0, 3], [1, 0], [2, 0], [3, 0], [4, 2], [5, 3]],
  "D": [[0, 2], [1, 3], [2, 2], [3, 0]],
  "Am": [[0, 0], [1, 1], [2, 2], [3, 2], [4, 0]],
  "Em": [[0, 0], [1, 0], [2, 0], [3, 2], [4, 2], [5, 0]],
}

export function Guitar() {
  const [activeStrings, setActiveStrings] = useState<Set<string>>(new Set())
  const [selectedFret, setSelectedFret] = useState(0)
  const [selectedChord, setSelectedChord] = useState<string | null>(null)
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null)

  useEffect(() => {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    setAudioContext(ctx)
    return () => {
      ctx.close()
    }
  }, [])

  const playString = useCallback(async (stringIndex: number, fret: number = selectedFret) => {
    if (!audioContext) return
    
    // Resume audio context if suspended
    if (audioContext.state === "suspended") {
      await audioContext.resume()
    }
    
    const string = strings[stringIndex]
    const frequency = string.baseFreq * Math.pow(2, fret / 12)
    
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.value = frequency
    oscillator.type = "triangle"
    
    gainNode.gain.setValueAtTime(0.4, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.5)
    
    oscillator.start()
    oscillator.stop(audioContext.currentTime + 1.5)
    
    const key = `${stringIndex}-${fret}`
    setActiveStrings(prev => new Set([...prev, key]))
    setTimeout(() => {
      setActiveStrings(prev => {
        const next = new Set(prev)
        next.delete(key)
        return next
      })
    }, 200)
  }, [audioContext, selectedFret])

  const playChord = useCallback((chordName: string) => {
    const chord = chords[chordName]
    if (!chord) return
    
    setSelectedChord(chordName)
    
    chord.forEach(([stringIndex, fret], i) => {
      setTimeout(() => {
        playString(stringIndex, fret)
      }, i * 50)
    })
    
    setTimeout(() => setSelectedChord(null), 500)
  }, [playString])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const stringIndex = strings.findIndex(s => s.key === e.key)
      if (stringIndex !== -1) {
        playString(stringIndex)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [playString])

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-sm text-muted-foreground text-center">
        Select a fret, then use keys 1-6 or click strings to play. Try the chord buttons below!
      </div>
      
      {/* Fret selector */}
      <div className="flex gap-2">
        {frets.map((fret) => (
          <button
            key={fret}
            onClick={() => setSelectedFret(fret)}
            className={cn(
              "w-10 h-10 rounded-lg border-2 transition-all",
              "flex items-center justify-center text-sm font-bold",
              selectedFret === fret 
                ? "bg-primary text-primary-foreground border-primary" 
                : "bg-secondary text-secondary-foreground border-border hover:border-primary/50"
            )}
          >
            {fret === 0 ? "O" : fret}
          </button>
        ))}
      </div>

      {/* Guitar neck */}
      <div className="relative bg-secondary rounded-lg p-4 overflow-x-auto">
        <div className="flex flex-col gap-2 min-w-[300px]">
          {strings.map((string, stringIndex) => (
            <div key={stringIndex} className="flex items-center gap-2">
              <span className="w-6 text-xs text-muted-foreground font-mono">{string.name}</span>
              <button
                onClick={() => playString(stringIndex)}
                className={cn(
                  "flex-1 h-2 rounded-full transition-all relative",
                  "bg-foreground/20 hover:bg-foreground/40",
                  activeStrings.has(`${stringIndex}-${selectedFret}`) && "bg-primary scale-y-150"
                )}
              >
                <div 
                  className="absolute inset-y-0 w-1 bg-foreground/50 rounded-full"
                  style={{ left: `${(selectedFret / 4) * 100}%` }}
                />
              </button>
              <span className="w-6 text-xs text-muted-foreground">{string.key}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Chord buttons */}
      <div className="flex flex-wrap justify-center gap-2">
        {Object.keys(chords).map((chordName) => (
          <button
            key={chordName}
            onClick={() => playChord(chordName)}
            className={cn(
              "px-4 py-2 rounded-lg border-2 transition-all font-bold",
              selectedChord === chordName 
                ? "bg-accent text-accent-foreground border-accent scale-95" 
                : "bg-card text-card-foreground border-border hover:border-primary/50"
            )}
          >
            {chordName}
          </button>
        ))}
      </div>

      {/* Guitar Tutorials */}
      <div className="w-full max-w-4xl mt-8 pt-8 border-t border-border">
        <GuitarTutorials onPlayChord={playChord} selectedChord={selectedChord} />
      </div>
    </div>
  )
}
