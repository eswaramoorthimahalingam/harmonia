"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, ChevronDown, ChevronUp, Star, Music, GraduationCap } from "lucide-react"
import { cn } from "@/lib/utils"

interface DrumBeat {
  name: string
  key: string
}

interface BeatPattern {
  beat: number
  drums: string[]
}

interface DrumTutorial {
  id: string
  title: string
  style: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  tempo: string
  description: string
  pattern: BeatPattern[]
  tips: string[]
}

const beginnerTutorials: DrumTutorial[] = [
  {
    id: "basic-rock",
    title: "Basic Rock Beat",
    style: "Rock/Pop Foundation",
    difficulty: "Beginner",
    tempo: "Slow (80 BPM)",
    description: "The most fundamental drum pattern in music. Master this and you can play thousands of songs!",
    pattern: [
      { beat: 1, drums: ["Kick", "Hi-Hat"] },
      { beat: 2, drums: ["Hi-Hat"] },
      { beat: 3, drums: ["Snare", "Hi-Hat"] },
      { beat: 4, drums: ["Hi-Hat"] },
      { beat: 5, drums: ["Kick", "Hi-Hat"] },
      { beat: 6, drums: ["Hi-Hat"] },
      { beat: 7, drums: ["Snare", "Hi-Hat"] },
      { beat: 8, drums: ["Hi-Hat"] },
    ],
    tips: [
      "Start with just Hi-Hat on every beat (1-2-3-4-5-6-7-8)",
      "Add Kick on beats 1 and 5",
      "Add Snare on beats 3 and 7",
      "Keep Hi-Hat steady - it's the backbone of the beat"
    ]
  },
  {
    id: "simple-kick-snare",
    title: "Kick-Snare Only",
    style: "Absolute Basics",
    difficulty: "Beginner",
    tempo: "Very Slow (60 BPM)",
    description: "Strip it down to the essentials. Just kick and snare to build your foundation.",
    pattern: [
      { beat: 1, drums: ["Kick"] },
      { beat: 2, drums: [] },
      { beat: 3, drums: ["Snare"] },
      { beat: 4, drums: [] },
      { beat: 5, drums: ["Kick"] },
      { beat: 6, drums: [] },
      { beat: 7, drums: ["Snare"] },
      { beat: 8, drums: [] },
    ],
    tips: [
      "Count out loud: 1-2-3-4-1-2-3-4",
      "Kick goes on 1, Snare goes on 3",
      "Empty beats give you time to prepare",
      "Once comfortable, try adding Hi-Hat on every beat"
    ]
  },
  {
    id: "four-on-floor",
    title: "Four on the Floor",
    style: "Disco/Dance",
    difficulty: "Beginner",
    tempo: "Medium (100 BPM)",
    description: "The classic disco and electronic dance beat. Kick drum on every quarter note.",
    pattern: [
      { beat: 1, drums: ["Kick", "Hi-Hat"] },
      { beat: 2, drums: ["Hi-Hat"] },
      { beat: 3, drums: ["Kick", "Snare", "Hi-Hat"] },
      { beat: 4, drums: ["Hi-Hat"] },
      { beat: 5, drums: ["Kick", "Hi-Hat"] },
      { beat: 6, drums: ["Hi-Hat"] },
      { beat: 7, drums: ["Kick", "Snare", "Hi-Hat"] },
      { beat: 8, drums: ["Hi-Hat"] },
    ],
    tips: [
      "Kick hits on EVERY odd beat (1, 3, 5, 7)",
      "Snare still on 3 and 7",
      "Hi-Hat plays straight 8th notes",
      "Great for dance music and disco!"
    ]
  },
]

const advancedTutorials: DrumTutorial[] = [
  {
    id: "billie-jean",
    title: "Billie Jean Pattern",
    style: "Pop/Funk",
    difficulty: "Intermediate",
    tempo: "Medium (117 BPM)",
    description: "The iconic drum pattern from Michael Jackson's Billie Jean - one of the most recognized beats ever.",
    pattern: [
      { beat: 1, drums: ["Kick", "Hi-Hat"] },
      { beat: 2, drums: ["Hi-Hat"] },
      { beat: 3, drums: ["Snare", "Hi-Hat"] },
      { beat: 4, drums: ["Hi-Hat", "Kick"] },
      { beat: 5, drums: ["Hi-Hat"] },
      { beat: 6, drums: ["Hi-Hat"] },
      { beat: 7, drums: ["Snare", "Hi-Hat"] },
      { beat: 8, drums: ["Hi-Hat"] },
    ],
    tips: [
      "Notice the extra Kick on beat 4 - that's what makes it special",
      "Keep the Hi-Hat very tight and consistent",
      "The Snare should be crisp and punchy",
      "Try adding a light ghost note before the main snare hits"
    ]
  },
  {
    id: "funky-drummer",
    title: "Funky Drummer",
    style: "Funk",
    difficulty: "Advanced",
    tempo: "Medium (100 BPM)",
    description: "Inspired by James Brown's legendary Funky Drummer - the most sampled beat in hip-hop history.",
    pattern: [
      { beat: 1, drums: ["Kick", "Hi-Hat"] },
      { beat: 2, drums: ["Hi-Hat", "Snare"] },
      { beat: 3, drums: ["Kick", "Hi-Hat"] },
      { beat: 4, drums: ["Hi-Hat"] },
      { beat: 5, drums: ["Kick", "Hi-Hat"] },
      { beat: 6, drums: ["Hi-Hat", "Snare"] },
      { beat: 7, drums: ["Hi-Hat"] },
      { beat: 8, drums: ["Kick", "Hi-Hat", "Snare"] },
    ],
    tips: [
      "The syncopated kick pattern is key to the funk feel",
      "Snare hits on unusual beats create the groove",
      "Keep it loose and relaxed, not stiff",
      "Accent the snare on beat 8 slightly"
    ]
  },
  {
    id: "boom-bap",
    title: "Boom Bap Hip-Hop",
    style: "Hip-Hop",
    difficulty: "Intermediate",
    tempo: "Slow (85 BPM)",
    description: "Classic 90s hip-hop beat pattern. The foundation of East Coast rap production.",
    pattern: [
      { beat: 1, drums: ["Kick"] },
      { beat: 2, drums: ["Hi-Hat"] },
      { beat: 3, drums: ["Snare"] },
      { beat: 4, drums: ["Hi-Hat"] },
      { beat: 5, drums: ["Kick"] },
      { beat: 6, drums: ["Hi-Hat", "Kick"] },
      { beat: 7, drums: ["Snare"] },
      { beat: 8, drums: ["Hi-Hat"] },
    ],
    tips: [
      "The extra kick on beat 6 gives it the head-nod feel",
      "Snare should be heavy and punchy",
      "Hi-Hat is usually open and loose",
      "Try swinging the timing slightly for more groove"
    ]
  },
]

const drumKeyMap: Record<string, string> = {
  "Kick": "1",
  "Snare": "2",
  "Hi-Hat": "3",
  "Tom 1": "4",
  "Tom 2": "Q",
  "Crash": "W",
  "Ride": "E",
  "Floor Tom": "R"
}

interface DrumsTutorialsProps {
  onPlayDrum?: (name: string) => void
  activePads?: Set<string>
}

function TutorialList({
  tutorials,
  expandedTutorial,
  onToggle,
  onPlayDrum,
  activePads
}: {
  tutorials: DrumTutorial[]
  expandedTutorial: string | null
  onToggle: (id: string) => void
  onPlayDrum: (name: string) => void
  activePads: Set<string>
}) {
  const [playingPattern, setPlayingPattern] = useState<string | null>(null)

  const playPattern = async (tutorial: DrumTutorial) => {
    if (playingPattern) return
    setPlayingPattern(tutorial.id)
    
    const tempo = parseInt(tutorial.tempo.match(/\d+/)?.[0] || "100")
    const beatDuration = (60 / tempo / 2) * 1000 // 8th note duration in ms

    for (let i = 0; i < tutorial.pattern.length; i++) {
      const beat = tutorial.pattern[i]
      beat.drums.forEach(drum => onPlayDrum(drum))
      await new Promise(resolve => setTimeout(resolve, beatDuration))
    }
    
    setPlayingPattern(null)
  }

  return (
    <div className="grid gap-4">
      {tutorials.map((tutorial) => (
        <Card 
          key={tutorial.id}
          className={cn(
            "transition-all duration-200",
            expandedTutorial === tutorial.id && "ring-1 ring-primary"
          )}
        >
          <CardHeader 
            className="cursor-pointer"
            onClick={() => onToggle(tutorial.id)}
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <CardTitle className="text-xl flex items-center gap-2">
                  {tutorial.title}
                  {expandedTutorial === tutorial.id ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </CardTitle>
                <CardDescription className="text-base">{tutorial.style}</CardDescription>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge variant={
                  tutorial.difficulty === "Beginner" ? "default" : 
                  tutorial.difficulty === "Intermediate" ? "secondary" : "destructive"
                }>
                  {tutorial.difficulty}
                </Badge>
                <span className="text-sm text-muted-foreground">{tutorial.tempo}</span>
              </div>
            </div>
          </CardHeader>

          {expandedTutorial === tutorial.id && (
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">{tutorial.description}</p>

              {/* Play button */}
              <Button 
                onClick={() => playPattern(tutorial)}
                disabled={playingPattern !== null}
                className="w-full"
              >
                <Play className="h-4 w-4 mr-2" />
                {playingPattern === tutorial.id ? "Playing..." : "Play Pattern"}
              </Button>

              {/* Beat pattern visualization */}
              <div className="space-y-3">
                <h4 className="font-semibold text-lg">Beat Pattern (8 beats):</h4>
                <div className="grid grid-cols-8 gap-1">
                  {tutorial.pattern.map((beat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-xs text-muted-foreground mb-1">{index + 1}</div>
                      <div 
                        className={cn(
                          "min-h-20 rounded-lg p-1 border flex flex-col items-center justify-center gap-1",
                          beat.drums.length > 0 ? "bg-primary/10 border-primary/30" : "bg-muted/30 border-border"
                        )}
                      >
                        {beat.drums.map((drum, i) => (
                          <button
                            key={i}
                            onClick={() => onPlayDrum(drum)}
                            className={cn(
                              "text-[10px] md:text-xs font-medium px-1 py-0.5 rounded transition-all",
                              "bg-primary/20 hover:bg-primary/40",
                              activePads.has(drum) && "bg-primary text-primary-foreground"
                            )}
                          >
                            {drum}
                          </button>
                        ))}
                        {beat.drums.length === 0 && (
                          <span className="text-xs text-muted-foreground">-</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key reference */}
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-muted-foreground">Keys:</span>
                {["Kick", "Snare", "Hi-Hat"].map((drum) => (
                  <span key={drum} className="text-sm bg-muted px-2 py-0.5 rounded">
                    {drum}: <kbd className="font-mono">{drumKeyMap[drum]}</kbd>
                  </span>
                ))}
              </div>

              {/* Tips */}
              <div className="space-y-2">
                <h4 className="font-semibold text-lg">Practice Tips:</h4>
                <ul className="space-y-2">
                  {tutorial.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-muted-foreground">
                      <span className="text-primary font-bold">{index + 1}.</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  )
}

export function DrumsTutorials({ onPlayDrum, activePads = new Set() }: DrumsTutorialsProps) {
  const [expandedTutorial, setExpandedTutorial] = useState<string | null>("basic-rock")
  const [activeTab, setActiveTab] = useState<"beginner" | "advanced">("beginner")

  const handleToggle = (id: string) => {
    setExpandedTutorial(expandedTutorial === id ? null : id)
  }

  const handleDrumClick = (name: string) => {
    if (onPlayDrum) {
      onPlayDrum(name)
    }
  }

  return (
    <div className="w-full space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold">Drum Tutorials</h3>
        <p className="text-muted-foreground">Learn beat patterns step by step</p>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v as "beginner" | "advanced"); setExpandedTutorial(null) }} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="beginner" className="flex items-center gap-2 text-base py-3">
            <Star className="h-5 w-5" />
            Easy Beats
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center gap-2 text-base py-3">
            <Music className="h-5 w-5" />
            Famous Patterns
          </TabsTrigger>
        </TabsList>

        <TabsContent value="beginner" className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-primary/10 rounded-lg border border-primary/20">
            <GraduationCap className="h-8 w-8 text-primary shrink-0" />
            <div>
              <h4 className="font-semibold text-lg">Start Here!</h4>
              <p className="text-sm text-muted-foreground">
                Master these fundamental patterns to build your drumming foundation.
              </p>
            </div>
          </div>
          <TutorialList 
            tutorials={beginnerTutorials}
            expandedTutorial={expandedTutorial}
            onToggle={handleToggle}
            onPlayDrum={handleDrumClick}
            activePads={activePads}
          />
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-accent/10 rounded-lg border border-accent/20">
            <Music className="h-8 w-8 text-accent shrink-0" />
            <div>
              <h4 className="font-semibold text-lg">Famous Drum Patterns</h4>
              <p className="text-sm text-muted-foreground">
                Learn iconic beats from legendary songs and genres.
              </p>
            </div>
          </div>
          <TutorialList 
            tutorials={advancedTutorials}
            expandedTutorial={expandedTutorial}
            onToggle={handleToggle}
            onPlayDrum={handleDrumClick}
            activePads={activePads}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
