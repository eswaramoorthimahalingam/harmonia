"use client"

import { cn } from "@/lib/utils"
import { Music, Drum, GuitarIcon, Clock, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface LessonCardProps {
  title: string
  description: string
  instrument: "piano" | "drums" | "guitar"
  duration: string
  level: "Beginner" | "Intermediate" | "Advanced"
  progress: number
  onClick?: () => void
}

const instrumentIcons = {
  piano: Music,
  drums: Drum,
  guitar: GuitarIcon,
}

const levelColors = {
  Beginner: "bg-chart-4 text-foreground",
  Intermediate: "bg-chart-2 text-foreground",
  Advanced: "bg-chart-3 text-foreground",
}

export function LessonCard({
  title,
  description,
  instrument,
  duration,
  level,
  progress,
  onClick,
}: LessonCardProps) {
  const Icon = instrumentIcons[instrument]

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full p-4 rounded-xl bg-card border border-border",
        "hover:border-primary/50 hover:bg-card/80 transition-all",
        "flex flex-col gap-3 text-left"
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-card-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-1">{description}</p>
          </div>
        </div>
        <Badge className={levelColors[level]}>{level}</Badge>
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-muted-foreground">
            <Clock className="w-4 h-4" />
            {duration}
          </span>
          <span className="flex items-center gap-1 text-accent">
            <Star className="w-4 h-4 fill-current" />
            {Math.round(progress)}%
          </span>
        </div>
      </div>

      <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </button>
  )
}
