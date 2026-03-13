"use client"

import { useCallback, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { DrumsTutorials } from "./drums-tutorials"

const drumPads = [
  { name: "Kick", key: "1", color: "bg-chart-1" },
  { name: "Snare", key: "2", color: "bg-chart-2" },
  { name: "Hi-Hat", key: "3", color: "bg-chart-3" },
  { name: "Tom 1", key: "4", color: "bg-chart-4" },
  { name: "Tom 2", key: "q", color: "bg-chart-5" },
  { name: "Crash", key: "w", color: "bg-primary" },
  { name: "Ride", key: "e", color: "bg-accent" },
  { name: "Floor Tom", key: "r", color: "bg-chart-1" },
]

// Simple drum synth using Web Audio API
function createDrumSound(audioContext: AudioContext, type: string) {
  const now = audioContext.currentTime
  
  switch (type) {
    case "Kick": {
      const osc = audioContext.createOscillator()
      const gain = audioContext.createGain()
      osc.connect(gain)
      gain.connect(audioContext.destination)
      osc.frequency.setValueAtTime(150, now)
      osc.frequency.exponentialRampToValueAtTime(0.01, now + 0.5)
      gain.gain.setValueAtTime(1, now)
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5)
      osc.start(now)
      osc.stop(now + 0.5)
      break
    }
    case "Snare": {
      const noise = audioContext.createBufferSource()
      const noiseBuffer = audioContext.createBuffer(1, audioContext.sampleRate * 0.2, audioContext.sampleRate)
      const output = noiseBuffer.getChannelData(0)
      for (let i = 0; i < noiseBuffer.length; i++) {
        output[i] = Math.random() * 2 - 1
      }
      noise.buffer = noiseBuffer
      const noiseGain = audioContext.createGain()
      const filter = audioContext.createBiquadFilter()
      filter.type = "highpass"
      filter.frequency.value = 1000
      noise.connect(filter)
      filter.connect(noiseGain)
      noiseGain.connect(audioContext.destination)
      noiseGain.gain.setValueAtTime(0.5, now)
      noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.2)
      noise.start(now)
      noise.stop(now + 0.2)
      break
    }
    case "Hi-Hat": {
      const noise = audioContext.createBufferSource()
      const noiseBuffer = audioContext.createBuffer(1, audioContext.sampleRate * 0.05, audioContext.sampleRate)
      const output = noiseBuffer.getChannelData(0)
      for (let i = 0; i < noiseBuffer.length; i++) {
        output[i] = Math.random() * 2 - 1
      }
      noise.buffer = noiseBuffer
      const noiseGain = audioContext.createGain()
      const filter = audioContext.createBiquadFilter()
      filter.type = "highpass"
      filter.frequency.value = 5000
      noise.connect(filter)
      filter.connect(noiseGain)
      noiseGain.connect(audioContext.destination)
      noiseGain.gain.setValueAtTime(0.3, now)
      noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.05)
      noise.start(now)
      noise.stop(now + 0.05)
      break
    }
    default: {
      const osc = audioContext.createOscillator()
      const gain = audioContext.createGain()
      osc.connect(gain)
      gain.connect(audioContext.destination)
      const freq = type === "Tom 1" ? 200 : type === "Tom 2" ? 150 : type === "Floor Tom" ? 100 : 300
      osc.frequency.setValueAtTime(freq, now)
      osc.frequency.exponentialRampToValueAtTime(freq * 0.5, now + 0.3)
      gain.gain.setValueAtTime(0.5, now)
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3)
      osc.start(now)
      osc.stop(now + 0.3)
    }
  }
}

export function Drums() {
  const [activePads, setActivePads] = useState<Set<string>>(new Set())
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null)

  useEffect(() => {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    setAudioContext(ctx)
    return () => {
      ctx.close()
    }
  }, [])

  const playDrum = useCallback(async (name: string) => {
    if (!audioContext) return
    
    // Resume audio context if suspended
    if (audioContext.state === "suspended") {
      await audioContext.resume()
    }
    
    createDrumSound(audioContext, name)
    
    setActivePads(prev => new Set([...prev, name]))
    setTimeout(() => {
      setActivePads(prev => {
        const next = new Set(prev)
        next.delete(name)
        return next
      })
    }, 100)
  }, [audioContext])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const pad = drumPads.find(p => p.key === e.key.toLowerCase())
      if (pad && !activePads.has(pad.name)) {
        playDrum(pad.name)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [playDrum, activePads])

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-sm text-muted-foreground text-center">
        Use keys 1-4 and Q-R or click the pads to play drums
      </div>
      <div className="grid grid-cols-4 gap-3 md:gap-4">
        {drumPads.map((pad) => (
          <button
            key={pad.name}
            onClick={() => playDrum(pad.name)}
            className={cn(
              "w-16 h-16 md:w-20 md:h-20 rounded-xl transition-all duration-75",
              "flex flex-col items-center justify-center gap-1",
              "border-2 border-border",
              pad.color,
              activePads.has(pad.name) 
                ? "scale-95 brightness-150 shadow-lg shadow-primary/30" 
                : "hover:scale-105 hover:brightness-110"
            )}
          >
            <span className="text-xs md:text-sm font-bold text-foreground">{pad.name}</span>
            <span className="text-[10px] md:text-xs text-foreground/70 uppercase">{pad.key}</span>
          </button>
        ))}
      </div>

      {/* Drums Tutorials */}
      <div className="w-full max-w-4xl mt-8 pt-8 border-t border-border">
        <DrumsTutorials onPlayDrum={playDrum} activePads={activePads} />
      </div>
    </div>
  )
}
