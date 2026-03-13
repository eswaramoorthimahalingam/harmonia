"use client"

import { useState } from "react"
import { LessonCard } from "./lesson-card"
import { cn } from "@/lib/utils"

const lessons = [
  {
    id: 1,
    title: "Your First Notes",
    description: "Learn the basics of piano keys and play your first melody",
    instrument: "piano" as const,
    duration: "10 min",
    level: "Beginner" as const,
    progress: 100,
  },
  {
    id: 2,
    title: "Simple Chords",
    description: "Master C, G, and Am chords on guitar",
    instrument: "guitar" as const,
    duration: "15 min",
    level: "Beginner" as const,
    progress: 75,
  },
  {
    id: 3,
    title: "Basic Drum Beat",
    description: "Create your first rock drum pattern",
    instrument: "drums" as const,
    duration: "12 min",
    level: "Beginner" as const,
    progress: 50,
  },
  {
    id: 4,
    title: "Reading Sheet Music",
    description: "Introduction to musical notation",
    instrument: "piano" as const,
    duration: "20 min",
    level: "Intermediate" as const,
    progress: 30,
  },
  {
    id: 5,
    title: "Fingerpicking Patterns",
    description: "Advanced guitar techniques for beautiful melodies",
    instrument: "guitar" as const,
    duration: "25 min",
    level: "Intermediate" as const,
    progress: 0,
  },
  {
    id: 6,
    title: "Jazz Rhythms",
    description: "Explore syncopation and swing patterns",
    instrument: "drums" as const,
    duration: "18 min",
    level: "Advanced" as const,
    progress: 0,
  },
]

const filters = ["All", "Piano", "Drums", "Guitar"]

export function LessonsSection() {
  const [activeFilter, setActiveFilter] = useState("All")

  const filteredLessons = lessons.filter(
    (lesson) => activeFilter === "All" || lesson.instrument.toLowerCase() === activeFilter.toLowerCase()
  )

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          Music Lessons
        </h1>
        <p className="text-muted-foreground">
          Learn at your own pace with structured lessons
        </p>
      </div>

      {/* Filters */}
      <div className="flex justify-center gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all",
              activeFilter === filter
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Lessons Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {filteredLessons.map((lesson) => (
          <LessonCard
            key={lesson.id}
            title={lesson.title}
            description={lesson.description}
            instrument={lesson.instrument}
            duration={lesson.duration}
            level={lesson.level}
            progress={lesson.progress}
            onClick={() => {
              // Handle lesson click
              console.log("Opening lesson:", lesson.title)
            }}
          />
        ))}
      </div>

      {filteredLessons.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No lessons found for this filter.</p>
        </div>
      )}
    </div>
  )
}
