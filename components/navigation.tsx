"use client"

import { cn } from "@/lib/utils"
import { Music, Drum, GuitarIcon, BookOpen, Home } from "lucide-react"

interface NavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const tabs = [
  { id: "home", label: "Home", icon: Home },
  { id: "piano", label: "Piano", icon: Music },
  { id: "drums", label: "Drums", icon: Drum },
  { id: "guitar", label: "Guitar", icon: GuitarIcon },
  { id: "lessons", label: "Lessons", icon: BookOpen },
]

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 md:relative md:bottom-auto bg-card border-t md:border-t-0 md:border-b border-border z-50">
      <div className="flex items-center justify-around md:justify-center md:gap-2 max-w-4xl mx-auto p-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col md:flex-row items-center gap-1 md:gap-2 px-3 py-2 md:px-4 md:py-2 rounded-lg transition-all",
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs md:text-sm font-medium">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
