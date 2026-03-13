"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { HomeContent } from "@/components/home-content"
import { Piano } from "@/components/instruments/piano"
import { Drums } from "@/components/instruments/drums"
import { Guitar } from "@/components/instruments/guitar"
import { LessonsSection } from "@/components/lessons/lessons-section"
import { Music } from "lucide-react"

export default function MusicLearningApp() {
  const [activeTab, setActiveTab] = useState("home")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Music className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Harmonia</span>
          </div>
          <div className="hidden md:block">
            <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6 pb-24 md:pb-6">
        {activeTab === "home" && <HomeContent onNavigate={setActiveTab} />}
        
        {activeTab === "piano" && (
          <div className="flex flex-col items-center gap-8">
            {/* Maximized Piano Logo/Header */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-primary to-primary/60 shadow-lg shadow-primary/25">
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-14 h-14 md:w-20 md:h-20 text-primary-foreground"
                  fill="currentColor"
                >
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 14H9V9h2v8zm2 0V9h2v8h-2zm-6 0H5V5h2v12zm10 0h-2V5h2v12zm2 0h-2V5h2v12z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">Piano</h1>
                <p className="text-lg md:text-xl text-muted-foreground mt-2">
                  Master the keys with our full 88-key digital piano
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">88 Keys</span>
                <span className="px-3 py-1 rounded-full bg-accent/10 text-accent font-medium">Movie BGM Tutorials</span>
                <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground">Keyboard Support</span>
              </div>
            </div>
            <div className="w-full overflow-x-auto py-4">
              <Piano />
            </div>
          </div>
        )}
        
        {activeTab === "drums" && (
          <div className="flex flex-col items-center gap-6">
            <div className="text-center space-y-2">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Drums</h1>
              <p className="text-muted-foreground">Hit the drum pads to create beats</p>
            </div>
            <Drums />
          </div>
        )}
        
        {activeTab === "guitar" && (
          <div className="flex flex-col items-center gap-6">
            <div className="text-center space-y-2">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Guitar</h1>
              <p className="text-muted-foreground">Strum strings and play chords</p>
            </div>
            <Guitar />
          </div>
        )}
        
        {activeTab === "lessons" && <LessonsSection />}
      </main>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  )
}
