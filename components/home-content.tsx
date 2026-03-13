"use client"

import { Music, Drum, GuitarIcon, Zap, Trophy, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface HomeContentProps {
  onNavigate: (tab: string) => void
}

const instruments = [
  {
    id: "piano",
    name: "Piano",
    icon: Music,
    color: "from-chart-1/20 to-chart-1/5",
    borderColor: "border-chart-1/30",
    description: "Master the keyboard with interactive lessons",
  },
  {
    id: "drums",
    name: "Drums",
    icon: Drum,
    color: "from-chart-2/20 to-chart-2/5",
    borderColor: "border-chart-2/30",
    description: "Feel the beat and rhythm",
  },
  {
    id: "guitar",
    name: "Guitar",
    icon: GuitarIcon,
    color: "from-chart-4/20 to-chart-4/5",
    borderColor: "border-chart-4/30",
    description: "Strum chords and play melodies",
  },
]

const stats = [
  { icon: Zap, label: "Practice Streak", value: "7 days" },
  { icon: Trophy, label: "Lessons Completed", value: "24" },
  { icon: Clock, label: "Time Practiced", value: "12h 30m" },
]

export function HomeContent({ onNavigate }: HomeContentProps) {
  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
          Welcome to <span className="text-primary">Harmonia</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          Learn music through play. Choose your instrument and start your journey.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 md:gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="bg-card border border-border rounded-xl p-3 md:p-4 text-center"
            >
              <Icon className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-2 text-primary" />
              <p className="text-lg md:text-xl font-bold text-card-foreground">{stat.value}</p>
              <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
            </div>
          )
        })}
      </div>

      {/* Instruments */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Choose Your Instrument</h2>
        <div className="grid gap-4">
          {instruments.map((instrument) => {
            const Icon = instrument.icon
            return (
              <button
                key={instrument.id}
                onClick={() => onNavigate(instrument.id)}
                className={cn(
                  "p-5 rounded-xl border transition-all text-left",
                  "bg-gradient-to-br",
                  instrument.color,
                  instrument.borderColor,
                  "hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/10"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-card/50 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{instrument.name}</h3>
                    <p className="text-sm text-muted-foreground">{instrument.description}</p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-card border border-border rounded-xl p-4 md:p-5">
        <h3 className="font-semibold text-card-foreground mb-3">Quick Tips</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            Use your computer keyboard to play the instruments
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            Practice for at least 15 minutes daily for best results
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            Complete lessons to track your progress and unlock achievements
          </li>
        </ul>
      </div>
    </div>
  )
}
