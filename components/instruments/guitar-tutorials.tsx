"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, ChevronDown, ChevronUp, Star, Music, GraduationCap } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChordStep {
  chord: string
  beats: number
  lyrics?: string
}

interface GuitarTutorial {
  id: string
  title: string
  artist: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  tempo: string
  description: string
  chordsUsed: string[]
  progression: ChordStep[]
  strumPattern?: string
  tips: string[]
}

const beginnerTutorials: GuitarTutorial[] = [
  {
    id: "knockin-on-heaven",
    title: "Knockin' on Heaven's Door",
    artist: "Bob Dylan",
    difficulty: "Beginner",
    tempo: "Slow (68 BPM)",
    description: "One of the easiest songs to learn with just 4 chords. A classic that sounds great even when simplified.",
    chordsUsed: ["G", "D", "Am", "C"],
    progression: [
      { chord: "G", beats: 4, lyrics: "Mama take this" },
      { chord: "D", beats: 4, lyrics: "badge off of me" },
      { chord: "Am", beats: 4, lyrics: "I can't" },
      { chord: "Am", beats: 4, lyrics: "use it anymore" },
      { chord: "G", beats: 4, lyrics: "It's gettin'" },
      { chord: "D", beats: 4, lyrics: "dark, too dark to see" },
      { chord: "Am", beats: 4, lyrics: "Feel I'm knockin' on" },
      { chord: "Am", beats: 4, lyrics: "heaven's door" },
    ],
    strumPattern: "D - D U - U D U",
    tips: [
      "The whole song uses the same 4-chord progression on repeat",
      "Focus on smooth chord transitions before adding strumming",
      "G to D is the trickiest switch - practice it separately",
      "You can simplify Am by just strumming the top 4 strings"
    ]
  },
  {
    id: "horse-no-name",
    title: "A Horse With No Name",
    artist: "America",
    difficulty: "Beginner",
    tempo: "Medium (100 BPM)",
    description: "Perfect for beginners - uses only 2 chord shapes that are similar, making switching easy.",
    chordsUsed: ["Em", "D"],
    progression: [
      { chord: "Em", beats: 4, lyrics: "On the first part" },
      { chord: "Em", beats: 4, lyrics: "of the journey" },
      { chord: "D", beats: 4, lyrics: "I was looking" },
      { chord: "D", beats: 4, lyrics: "at all the life" },
      { chord: "Em", beats: 4, lyrics: "There were plants and" },
      { chord: "Em", beats: 4, lyrics: "birds and rocks" },
      { chord: "D", beats: 4, lyrics: "and things" },
      { chord: "D", beats: 4, lyrics: "" },
    ],
    strumPattern: "D - D U D U",
    tips: [
      "Only 2 chords needed for the entire song!",
      "Em and D shapes are similar - just move 2 fingers",
      "Keep your index finger anchored when switching",
      "Great song to practice your strumming pattern"
    ]
  },
  {
    id: "stand-by-me",
    title: "Stand By Me",
    artist: "Ben E. King",
    difficulty: "Beginner",
    tempo: "Slow-Medium (78 BPM)",
    description: "A timeless classic with a simple 4-chord progression that repeats throughout the song.",
    chordsUsed: ["G", "Em", "C", "D"],
    progression: [
      { chord: "G", beats: 4, lyrics: "When the night" },
      { chord: "G", beats: 4, lyrics: "has come" },
      { chord: "Em", beats: 4, lyrics: "And the land is" },
      { chord: "Em", beats: 4, lyrics: "dark" },
      { chord: "C", beats: 4, lyrics: "And the moon is the" },
      { chord: "D", beats: 4, lyrics: "only light we'll" },
      { chord: "G", beats: 4, lyrics: "see" },
      { chord: "G", beats: 4, lyrics: "" },
    ],
    strumPattern: "D D U U D U",
    tips: [
      "The bass line walks down: G-F#-E-D - try to emphasize these notes",
      "Keep the rhythm steady - this song is all about the groove",
      "Practice the G to Em transition until it's smooth",
      "The same progression repeats for verse and chorus"
    ]
  },
  {
    id: "three-little-birds",
    title: "Three Little Birds",
    artist: "Bob Marley",
    difficulty: "Beginner",
    tempo: "Relaxed (76 BPM)",
    description: "A feel-good reggae song with just 2 chords. Perfect for learning the reggae strum style.",
    chordsUsed: ["G", "C"],
    progression: [
      { chord: "G", beats: 8, lyrics: "Don't worry about a thing" },
      { chord: "C", beats: 4, lyrics: "'Cause every little" },
      { chord: "G", beats: 4, lyrics: "thing" },
      { chord: "G", beats: 4, lyrics: "gonna be al" },
      { chord: "C", beats: 4, lyrics: "right" },
      { chord: "G", beats: 8, lyrics: "" },
    ],
    strumPattern: "- D - U - U D U (reggae style: emphasis on upstrokes)",
    tips: [
      "Only 2 chords - G and C!",
      "Reggae strumming emphasizes the 'and' beats (upstrokes)",
      "Mute the strings slightly after each strum for that choppy reggae sound",
      "Keep it relaxed and laid back - don't rush!"
    ]
  },
]

const songTutorials: GuitarTutorial[] = [
  {
    id: "wonderwall",
    title: "Wonderwall",
    artist: "Oasis",
    difficulty: "Intermediate",
    tempo: "Medium (87 BPM)",
    description: "The quintessential campfire song. Uses a capo on fret 2 in the original, but we'll learn it without.",
    chordsUsed: ["Em", "G", "D", "Am", "C"],
    progression: [
      { chord: "Em", beats: 4, lyrics: "Today is gonna be the day" },
      { chord: "G", beats: 4, lyrics: "that they're gonna throw it back to you" },
      { chord: "D", beats: 4, lyrics: "By now you should've somehow" },
      { chord: "Am", beats: 4, lyrics: "realized what you gotta do" },
      { chord: "Em", beats: 4, lyrics: "I don't believe that anybody" },
      { chord: "G", beats: 4, lyrics: "feels the way I do" },
      { chord: "D", beats: 4, lyrics: "about you" },
      { chord: "Am", beats: 4, lyrics: "now" },
    ],
    strumPattern: "D D U U D U",
    tips: [
      "Keep your pinky and ring finger planted on the high E and B strings throughout",
      "The chord shapes all share common finger positions",
      "Practice the Em to G transition - it's used constantly",
      "Focus on consistent strumming before singing along"
    ]
  },
  {
    id: "hotel-california",
    title: "Hotel California (Intro)",
    artist: "Eagles",
    difficulty: "Intermediate",
    tempo: "Medium (74 BPM)",
    description: "The iconic intro uses arpeggiated chords. Here's a simplified strumming version.",
    chordsUsed: ["Am", "Em", "G", "D", "C"],
    progression: [
      { chord: "Am", beats: 4, lyrics: "" },
      { chord: "Em", beats: 4, lyrics: "" },
      { chord: "G", beats: 4, lyrics: "On a dark desert" },
      { chord: "D", beats: 4, lyrics: "highway" },
      { chord: "C", beats: 4, lyrics: "Cool wind in my" },
      { chord: "Em", beats: 4, lyrics: "hair" },
      { chord: "Am", beats: 4, lyrics: "Warm smell of co" },
      { chord: "Em", beats: 4, lyrics: "litas" },
    ],
    strumPattern: "D - D U - U D U",
    tips: [
      "The original uses fingerpicking - try picking individual strings",
      "Am and Em are minor chords - they give the song its mysterious feel",
      "Let the chords ring out fully",
      "The progression descends: Am-G-F-E in the chorus"
    ]
  },
  {
    id: "wish-you-were-here",
    title: "Wish You Were Here",
    artist: "Pink Floyd",
    difficulty: "Intermediate",
    tempo: "Slow (60 BPM)",
    description: "A beautiful acoustic ballad with a memorable intro riff and simple chord progression.",
    chordsUsed: ["Em", "G", "Am", "C", "D"],
    progression: [
      { chord: "C", beats: 4, lyrics: "So, so you think you can" },
      { chord: "D", beats: 4, lyrics: "tell" },
      { chord: "Am", beats: 4, lyrics: "Heaven from" },
      { chord: "G", beats: 4, lyrics: "Hell" },
      { chord: "D", beats: 4, lyrics: "Blue skies from" },
      { chord: "C", beats: 4, lyrics: "pain" },
      { chord: "Am", beats: 4, lyrics: "Can you tell a green" },
      { chord: "G", beats: 4, lyrics: "field from a cold steel rail" },
    ],
    strumPattern: "D - U - D U D U",
    tips: [
      "The intro uses a specific picking pattern on Em and G",
      "Let notes ring into each other for that spacious sound",
      "The verse has a conversational rhythm - follow the lyrics",
      "Dynamics are key - play softly on verses, build on chorus"
    ]
  },
]

interface GuitarTutorialsProps {
  onPlayChord?: (chord: string) => void
  selectedChord?: string | null
}

function TutorialList({
  tutorials,
  expandedTutorial,
  onToggle,
  onPlayChord,
  selectedChord
}: {
  tutorials: GuitarTutorial[]
  expandedTutorial: string | null
  onToggle: (id: string) => void
  onPlayChord: (chord: string) => void
  selectedChord: string | null
}) {
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
                <CardDescription className="text-base">{tutorial.artist}</CardDescription>
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

              {/* Chords used */}
              <div className="space-y-2">
                <h4 className="font-semibold text-lg">Chords Used:</h4>
                <div className="flex flex-wrap gap-2">
                  {tutorial.chordsUsed.map((chord) => (
                    <Button
                      key={chord}
                      variant={selectedChord === chord ? "default" : "outline"}
                      onClick={() => onPlayChord(chord)}
                      className="text-lg font-bold"
                    >
                      {chord}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Strum pattern */}
              {tutorial.strumPattern && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-lg">Strum Pattern:</h4>
                  <div className="bg-muted p-3 rounded-lg font-mono text-lg tracking-widest">
                    {tutorial.strumPattern}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    D = Down strum, U = Up strum, - = rest/mute
                  </p>
                </div>
              )}

              {/* Chord progression with lyrics */}
              <div className="space-y-3">
                <h4 className="font-semibold text-lg">Chord Progression:</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {tutorial.progression.map((step, index) => (
                    <button
                      key={index}
                      onClick={() => onPlayChord(step.chord)}
                      className={cn(
                        "p-3 rounded-lg border text-left transition-all",
                        "hover:bg-primary/10 hover:border-primary/30",
                        selectedChord === step.chord && "bg-primary/20 border-primary"
                      )}
                    >
                      <div className="text-xl font-bold text-primary">{step.chord}</div>
                      {step.lyrics && (
                        <div className="text-sm text-muted-foreground mt-1 italic">
                          {step.lyrics}
                        </div>
                      )}
                      <div className="text-xs text-muted-foreground mt-1">
                        {step.beats} beats
                      </div>
                    </button>
                  ))}
                </div>
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

export function GuitarTutorials({ onPlayChord, selectedChord = null }: GuitarTutorialsProps) {
  const [expandedTutorial, setExpandedTutorial] = useState<string | null>("knockin-on-heaven")
  const [activeTab, setActiveTab] = useState<"beginner" | "songs">("beginner")

  const handleToggle = (id: string) => {
    setExpandedTutorial(expandedTutorial === id ? null : id)
  }

  const handleChordClick = (chord: string) => {
    if (onPlayChord) {
      onPlayChord(chord)
    }
  }

  return (
    <div className="w-full space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold">Guitar Tutorials</h3>
        <p className="text-muted-foreground">Learn songs with chord progressions</p>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v as "beginner" | "songs"); setExpandedTutorial(null) }} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="beginner" className="flex items-center gap-2 text-base py-3">
            <Star className="h-5 w-5" />
            Easy Songs
          </TabsTrigger>
          <TabsTrigger value="songs" className="flex items-center gap-2 text-base py-3">
            <Music className="h-5 w-5" />
            Classic Hits
          </TabsTrigger>
        </TabsList>

        <TabsContent value="beginner" className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-primary/10 rounded-lg border border-primary/20">
            <GraduationCap className="h-8 w-8 text-primary shrink-0" />
            <div>
              <h4 className="font-semibold text-lg">Start Here!</h4>
              <p className="text-sm text-muted-foreground">
                Simple songs with 2-4 chords. Perfect for absolute beginners.
              </p>
            </div>
          </div>
          <TutorialList 
            tutorials={beginnerTutorials}
            expandedTutorial={expandedTutorial}
            onToggle={handleToggle}
            onPlayChord={handleChordClick}
            selectedChord={selectedChord}
          />
        </TabsContent>

        <TabsContent value="songs" className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-accent/10 rounded-lg border border-accent/20">
            <Music className="h-8 w-8 text-accent shrink-0" />
            <div>
              <h4 className="font-semibold text-lg">Classic Hits</h4>
              <p className="text-sm text-muted-foreground">
                Iconic songs that every guitarist should know.
              </p>
            </div>
          </div>
          <TutorialList 
            tutorials={songTutorials}
            expandedTutorial={expandedTutorial}
            onToggle={handleToggle}
            onPlayChord={handleChordClick}
            selectedChord={selectedChord}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
