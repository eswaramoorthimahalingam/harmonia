"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Music, Film, ChevronDown, ChevronUp, Star, GraduationCap } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface TutorialNote {
  note: string
  duration: "quarter" | "half" | "whole" | "eighth"
  label?: string
}

interface MovieTutorial {
  id: string
  title: string
  movie: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  tempo: string
  description: string
  notes: TutorialNote[][]
  tips: string[]
}

// Easy beginner tutorials
const beginnerTutorials: MovieTutorial[] = [
  {
    id: "twinkle",
    title: "Twinkle Twinkle Little Star",
    movie: "Classic Nursery Rhyme",
    difficulty: "Beginner",
    tempo: "Slow (70 BPM)",
    description: "The perfect first song for absolute beginners. Uses only 6 notes and has a simple, repetitive pattern.",
    notes: [
      // "Twinkle twinkle little star"
      [
        { note: "C4", duration: "quarter", label: "Twin" },
        { note: "C4", duration: "quarter", label: "kle" },
        { note: "G4", duration: "quarter", label: "twin" },
        { note: "G4", duration: "quarter", label: "kle" },
        { note: "A4", duration: "quarter", label: "lit" },
        { note: "A4", duration: "quarter", label: "tle" },
        { note: "G4", duration: "half", label: "star" },
      ],
      // "How I wonder what you are"
      [
        { note: "F4", duration: "quarter", label: "How" },
        { note: "F4", duration: "quarter", label: "I" },
        { note: "E4", duration: "quarter", label: "won" },
        { note: "E4", duration: "quarter", label: "der" },
        { note: "D4", duration: "quarter", label: "what" },
        { note: "D4", duration: "quarter", label: "you" },
        { note: "C4", duration: "half", label: "are" },
      ],
      // "Up above the world so high"
      [
        { note: "G4", duration: "quarter", label: "Up" },
        { note: "G4", duration: "quarter", label: "a" },
        { note: "F4", duration: "quarter", label: "bove" },
        { note: "F4", duration: "quarter", label: "the" },
        { note: "E4", duration: "quarter", label: "world" },
        { note: "E4", duration: "quarter", label: "so" },
        { note: "D4", duration: "half", label: "high" },
      ],
    ],
    tips: [
      "Start by finding C4 (middle C) on the piano",
      "Use your thumb (1) for C, index (2) for D, middle (3) for E, ring (4) for F, pinky (5) for G",
      "Keep a steady rhythm - tap your foot while playing",
      "The melody repeats! Once you learn the first two lines, you know the whole song"
    ]
  },
  {
    id: "mary",
    title: "Mary Had a Little Lamb",
    movie: "Classic Nursery Rhyme",
    difficulty: "Beginner",
    tempo: "Slow (80 BPM)",
    description: "Another great beginner song using only 4 notes. Perfect for building finger coordination.",
    notes: [
      // "Mary had a little lamb"
      [
        { note: "E4", duration: "quarter", label: "Ma" },
        { note: "D4", duration: "quarter", label: "ry" },
        { note: "C4", duration: "quarter", label: "had" },
        { note: "D4", duration: "quarter", label: "a" },
        { note: "E4", duration: "quarter", label: "lit" },
        { note: "E4", duration: "quarter", label: "tle" },
        { note: "E4", duration: "half", label: "lamb" },
      ],
      // "Little lamb, little lamb"
      [
        { note: "D4", duration: "quarter", label: "lit" },
        { note: "D4", duration: "quarter", label: "tle" },
        { note: "D4", duration: "half", label: "lamb" },
        { note: "E4", duration: "quarter", label: "lit" },
        { note: "G4", duration: "quarter", label: "tle" },
        { note: "G4", duration: "half", label: "lamb" },
      ],
      // "Mary had a little lamb, its fleece was white as snow"
      [
        { note: "E4", duration: "quarter", label: "Ma" },
        { note: "D4", duration: "quarter", label: "ry" },
        { note: "C4", duration: "quarter", label: "had" },
        { note: "D4", duration: "quarter", label: "a" },
        { note: "E4", duration: "quarter", label: "lit" },
        { note: "E4", duration: "quarter", label: "tle" },
        { note: "E4", duration: "quarter", label: "lamb" },
        { note: "E4", duration: "quarter", label: "its" },
      ],
      [
        { note: "D4", duration: "quarter", label: "fleece" },
        { note: "D4", duration: "quarter", label: "was" },
        { note: "E4", duration: "quarter", label: "white" },
        { note: "D4", duration: "quarter", label: "as" },
        { note: "C4", duration: "whole", label: "snow" },
      ],
    ],
    tips: [
      "Only uses C, D, E, and G - just 4 notes!",
      "Start with E (your middle finger on E4)",
      "Notice the pattern: E-D-C-D-E-E-E repeats",
      "Practice slowly first, then gradually speed up"
    ]
  },
  {
    id: "c-scale",
    title: "C Major Scale",
    movie: "Fundamental Exercise",
    difficulty: "Beginner",
    tempo: "Very Slow (50 BPM)",
    description: "The most important scale to learn. Master this and you'll have the foundation for all other songs.",
    notes: [
      // Going up
      [
        { note: "C4", duration: "half", label: "Do" },
        { note: "D4", duration: "half", label: "Re" },
        { note: "E4", duration: "half", label: "Mi" },
        { note: "F4", duration: "half", label: "Fa" },
        { note: "G4", duration: "half", label: "Sol" },
        { note: "A4", duration: "half", label: "La" },
        { note: "B4", duration: "half", label: "Ti" },
        { note: "C5", duration: "whole", label: "Do" },
      ],
      // Going down
      [
        { note: "C5", duration: "half", label: "Do" },
        { note: "B4", duration: "half", label: "Ti" },
        { note: "A4", duration: "half", label: "La" },
        { note: "G4", duration: "half", label: "Sol" },
        { note: "F4", duration: "half", label: "Fa" },
        { note: "E4", duration: "half", label: "Mi" },
        { note: "D4", duration: "half", label: "Re" },
        { note: "C4", duration: "whole", label: "Do" },
      ],
    ],
    tips: [
      "Fingering (right hand): 1-2-3, cross thumb under, 1-2-3-4-5",
      "Keep your wrist relaxed and fingers curved",
      "Practice going up AND down - both directions matter",
      "Say the note names out loud as you play: C-D-E-F-G-A-B-C"
    ]
  },
  {
    id: "ode-to-joy",
    title: "Ode to Joy",
    movie: "Beethoven's 9th Symphony",
    difficulty: "Beginner",
    tempo: "Moderate (90 BPM)",
    description: "A beautiful classical melody that's surprisingly easy to play. A great step up after nursery rhymes.",
    notes: [
      // Line 1
      [
        { note: "E4", duration: "quarter" },
        { note: "E4", duration: "quarter" },
        { note: "F4", duration: "quarter" },
        { note: "G4", duration: "quarter" },
        { note: "G4", duration: "quarter" },
        { note: "F4", duration: "quarter" },
        { note: "E4", duration: "quarter" },
        { note: "D4", duration: "quarter" },
      ],
      // Line 2
      [
        { note: "C4", duration: "quarter" },
        { note: "C4", duration: "quarter" },
        { note: "D4", duration: "quarter" },
        { note: "E4", duration: "quarter" },
        { note: "E4", duration: "half" },
        { note: "D4", duration: "half" },
      ],
      // Line 3
      [
        { note: "E4", duration: "quarter" },
        { note: "E4", duration: "quarter" },
        { note: "F4", duration: "quarter" },
        { note: "G4", duration: "quarter" },
        { note: "G4", duration: "quarter" },
        { note: "F4", duration: "quarter" },
        { note: "E4", duration: "quarter" },
        { note: "D4", duration: "quarter" },
      ],
      // Line 4 (ending)
      [
        { note: "C4", duration: "quarter" },
        { note: "C4", duration: "quarter" },
        { note: "D4", duration: "quarter" },
        { note: "E4", duration: "quarter" },
        { note: "D4", duration: "half" },
        { note: "C4", duration: "half" },
      ],
    ],
    tips: [
      "Uses only the white keys from C to G",
      "Notice lines 1 and 3 are identical!",
      "The rhythm is mostly quarter notes - steady and even",
      "This is your first step into classical music!"
    ]
  },
  {
    id: "happy-birthday",
    title: "Happy Birthday",
    movie: "Celebration Classic",
    difficulty: "Beginner",
    tempo: "Moderate (100 BPM)",
    description: "Everyone should know this one! Great for parties and special occasions.",
    notes: [
      // "Happy birthday to you"
      [
        { note: "G4", duration: "eighth", label: "Hap" },
        { note: "G4", duration: "eighth", label: "py" },
        { note: "A4", duration: "quarter", label: "birth" },
        { note: "G4", duration: "quarter", label: "day" },
        { note: "C5", duration: "quarter", label: "to" },
        { note: "B4", duration: "half", label: "you" },
      ],
      // "Happy birthday to you"
      [
        { note: "G4", duration: "eighth", label: "Hap" },
        { note: "G4", duration: "eighth", label: "py" },
        { note: "A4", duration: "quarter", label: "birth" },
        { note: "G4", duration: "quarter", label: "day" },
        { note: "D5", duration: "quarter", label: "to" },
        { note: "C5", duration: "half", label: "you" },
      ],
      // "Happy birthday dear [name]"
      [
        { note: "G4", duration: "eighth", label: "Hap" },
        { note: "G4", duration: "eighth", label: "py" },
        { note: "G5", duration: "quarter", label: "birth" },
        { note: "E5", duration: "quarter", label: "day" },
        { note: "C5", duration: "quarter", label: "dear" },
        { note: "B4", duration: "quarter", label: "[name]" },
        { note: "A4", duration: "half" },
      ],
      // "Happy birthday to you"
      [
        { note: "F5", duration: "eighth", label: "Hap" },
        { note: "F5", duration: "eighth", label: "py" },
        { note: "E5", duration: "quarter", label: "birth" },
        { note: "C5", duration: "quarter", label: "day" },
        { note: "D5", duration: "quarter", label: "to" },
        { note: "C5", duration: "half", label: "you" },
      ],
    ],
    tips: [
      "The pickup notes (Hap-py) come before the beat",
      "Lines 1 and 2 are almost the same - spot the difference!",
      "Practice the jump to G5 in line 3 separately",
      "Sing along as you play to help with timing"
    ]
  },
]

const movieTutorials: MovieTutorial[] = [
  {
    id: "titanic",
    title: "My Heart Will Go On",
    movie: "Titanic (1997)",
    difficulty: "Beginner",
    tempo: "Slow (60 BPM)",
    description: "The iconic love theme from Titanic. This simplified version focuses on the memorable melody.",
    notes: [
      // Verse - "Every night in my dreams"
      [
        { note: "E4", duration: "quarter", label: "Ev" },
        { note: "E4", duration: "quarter", label: "ery" },
        { note: "E4", duration: "quarter", label: "night" },
        { note: "D4", duration: "quarter", label: "in" },
        { note: "E4", duration: "half", label: "my" },
        { note: "G4", duration: "half", label: "dreams" },
      ],
      // "I see you, I feel you"
      [
        { note: "A4", duration: "quarter", label: "I" },
        { note: "G4", duration: "quarter", label: "see" },
        { note: "E4", duration: "half", label: "you" },
        { note: "E4", duration: "quarter", label: "I" },
        { note: "D4", duration: "quarter", label: "feel" },
        { note: "E4", duration: "half", label: "you" },
      ],
      // Chorus - "Near, far, wherever you are"
      [
        { note: "G4", duration: "whole", label: "Near" },
        { note: "A4", duration: "whole", label: "Far" },
        { note: "G4", duration: "quarter", label: "wher" },
        { note: "E4", duration: "quarter", label: "ev" },
        { note: "D4", duration: "quarter", label: "er" },
        { note: "E4", duration: "quarter", label: "you" },
        { note: "G4", duration: "half", label: "are" },
      ],
    ],
    tips: [
      "Keep a slow, steady tempo - this is a ballad",
      "Let each note ring out before playing the next",
      "Practice the chorus section separately first",
      "Use the sustain (hold notes longer) for emotional effect"
    ]
  },
  {
    id: "pirates",
    title: "He's a Pirate",
    movie: "Pirates of the Caribbean (2003)",
    difficulty: "Intermediate",
    tempo: "Fast (140 BPM)",
    description: "The adventurous main theme. Start slow and gradually increase speed as you get comfortable.",
    notes: [
      // Main riff
      [
        { note: "D4", duration: "eighth" },
        { note: "D4", duration: "eighth" },
        { note: "D4", duration: "eighth" },
        { note: "D4", duration: "eighth" },
        { note: "D4", duration: "eighth" },
        { note: "D4", duration: "eighth" },
        { note: "D4", duration: "eighth" },
        { note: "D4", duration: "eighth" },
      ],
      // Melodic phrase 1
      [
        { note: "A4", duration: "quarter" },
        { note: "C5", duration: "quarter" },
        { note: "D5", duration: "quarter" },
        { note: "D5", duration: "quarter" },
        { note: "D5", duration: "eighth" },
        { note: "E5", duration: "eighth" },
        { note: "F5", duration: "quarter" },
        { note: "F5", duration: "quarter" },
      ],
      // Melodic phrase 2
      [
        { note: "F5", duration: "eighth" },
        { note: "G5", duration: "eighth" },
        { note: "E5", duration: "quarter" },
        { note: "E5", duration: "eighth" },
        { note: "D5", duration: "eighth" },
        { note: "C5", duration: "eighth" },
        { note: "C5", duration: "eighth" },
        { note: "D5", duration: "half" },
      ],
      // Dramatic ending phrase
      [
        { note: "A4", duration: "quarter" },
        { note: "C5", duration: "quarter" },
        { note: "B4", duration: "quarter" },
        { note: "D5", duration: "quarter" },
        { note: "A4", duration: "half" },
        { note: "A4", duration: "half" },
      ],
    ],
    tips: [
      "Start at half speed (70 BPM) until comfortable",
      "The rhythm is as important as the notes - keep it driving",
      "Accent the first beat of each measure",
      "Practice the repeating D4 pattern until it's automatic"
    ]
  },
  {
    id: "interstellar",
    title: "First Step",
    movie: "Interstellar (2014)",
    difficulty: "Intermediate",
    tempo: "Moderate (80 BPM)",
    description: "Hans Zimmer's emotional organ theme adapted for piano. Focus on creating atmosphere.",
    notes: [
      // Opening - building tension
      [
        { note: "A3", duration: "whole" },
        { note: "E4", duration: "whole" },
        { note: "A4", duration: "whole" },
        { note: "E4", duration: "whole" },
      ],
      // Main theme part 1
      [
        { note: "A4", duration: "half" },
        { note: "B4", duration: "half" },
        { note: "C5", duration: "half" },
        { note: "B4", duration: "half" },
        { note: "A4", duration: "whole" },
        { note: "G4", duration: "whole" },
      ],
      // Main theme part 2
      [
        { note: "E4", duration: "half" },
        { note: "F4", duration: "half" },
        { note: "G4", duration: "whole" },
        { note: "A4", duration: "half" },
        { note: "G4", duration: "half" },
        { note: "E4", duration: "whole" },
      ],
      // Climax
      [
        { note: "A4", duration: "quarter" },
        { note: "C5", duration: "quarter" },
        { note: "E5", duration: "half" },
        { note: "D5", duration: "half" },
        { note: "C5", duration: "half" },
        { note: "A4", duration: "whole" },
      ],
    ],
    tips: [
      "Let notes overlap slightly for a sustained, organ-like sound",
      "Play softly - this piece is about atmosphere, not volume",
      "Take your time between phrases - silence is part of the music",
      "Try playing the bass notes (A3, E4) with your left hand"
    ]
  },
]

const durationWidths = {
  eighth: "w-8",
  quarter: "w-12",
  half: "w-16",
  whole: "w-20",
}

const durationLabels = {
  eighth: "1/8",
  quarter: "1/4",
  half: "1/2",
  whole: "1",
}

interface PianoTutorialsProps {
  onPlayNote?: (note: string) => void
  activeNotes?: Set<string>
}

function TutorialList({ 
  tutorials, 
  expandedTutorial, 
  onToggle, 
  onNoteClick, 
  activeNotes 
}: { 
  tutorials: MovieTutorial[]
  expandedTutorial: string | null
  onToggle: (id: string) => void
  onNoteClick: (note: string) => void
  activeNotes: Set<string>
}) {
  const [currentPhrase, setCurrentPhrase] = useState<Record<string, number>>({})

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
                  <div className="flex items-center gap-2">
                    <Music className="h-4 w-4 text-accent" />
                    <CardTitle className="text-base">{tutorial.title}</CardTitle>
                  </div>
                  <CardDescription>{tutorial.movie}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={
                      tutorial.difficulty === "Beginner" ? "default" :
                      tutorial.difficulty === "Intermediate" ? "secondary" : "outline"
                    }
                  >
                    {tutorial.difficulty}
                  </Badge>
                  {expandedTutorial === tutorial.id ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
              </div>
            </CardHeader>

            {expandedTutorial === tutorial.id && (
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{tutorial.description}</p>
                  <p className="text-sm"><span className="text-muted-foreground">Tempo:</span> {tutorial.tempo}</p>
                </div>

                {/* Note sequences */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Note Sequence (click to play)</h4>
                  {tutorial.notes.map((phrase, phraseIndex) => (
                    <div key={phraseIndex} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground w-16">
                          Phrase {phraseIndex + 1}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setCurrentPhrase({ ...currentPhrase, [tutorial.id]: phraseIndex })}
                          className="h-6 px-2"
                        >
                          <Play className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 p-3 bg-secondary/30 rounded-lg">
                        {phrase.map((noteObj, noteIndex) => (
                          <button
                            key={noteIndex}
                            onClick={() => onNoteClick(noteObj.note)}
                            className={cn(
                              "flex flex-col items-center justify-center rounded-md border border-border p-2 transition-all",
                              "hover:bg-primary/20 hover:border-primary",
                              "active:scale-95",
                              durationWidths[noteObj.duration],
                              activeNotes.has(noteObj.note) && "bg-primary/30 border-primary"
                            )}
                          >
                            <span className="text-sm font-mono font-bold">{noteObj.note}</span>
                            {noteObj.label && (
                              <span className="text-[10px] text-muted-foreground">{noteObj.label}</span>
                            )}
                            <span className="text-[9px] text-muted-foreground/60 mt-1">
                              {durationLabels[noteObj.duration]}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tips */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Tips</h4>
                  <ul className="space-y-1">
                    {tutorial.tips.map((tip, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-4 pt-4 border-t border-border">
                  <div className="text-xs text-muted-foreground">
                    <span className="font-medium">Duration:</span>
                  </div>
                  <div className="flex gap-3 text-xs">
                    <span>1/8 = Eighth note</span>
                    <span>1/4 = Quarter note</span>
                    <span>1/2 = Half note</span>
                    <span>1 = Whole note</span>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
    </div>
  )
}

export function PianoTutorials({ onPlayNote, activeNotes = new Set() }: PianoTutorialsProps) {
  const [expandedTutorial, setExpandedTutorial] = useState<string | null>("twinkle")
  const [activeTab, setActiveTab] = useState<"beginner" | "movies">("beginner")

  const handleToggle = (id: string) => {
    setExpandedTutorial(expandedTutorial === id ? null : id)
  }

  const handleNoteClick = (note: string) => {
    if (onPlayNote) {
      onPlayNote(note)
    }
  }

  return (
    <div className="w-full space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold">Piano Tutorials</h3>
        <p className="text-muted-foreground">Learn to play with step-by-step instructions</p>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v as "beginner" | "movies"); setExpandedTutorial(null) }} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="beginner" className="flex items-center gap-2 text-base py-3">
            <Star className="h-5 w-5" />
            Easy Learning
          </TabsTrigger>
          <TabsTrigger value="movies" className="flex items-center gap-2 text-base py-3">
            <Film className="h-5 w-5" />
            Movie BGM
          </TabsTrigger>
        </TabsList>

        <TabsContent value="beginner" className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-primary/10 rounded-lg border border-primary/20">
            <GraduationCap className="h-8 w-8 text-primary shrink-0" />
            <div>
              <h4 className="font-semibold text-lg">Start Here!</h4>
              <p className="text-sm text-muted-foreground">
                Perfect for absolute beginners. These songs use simple patterns and few notes.
              </p>
            </div>
          </div>
          <TutorialList 
            tutorials={beginnerTutorials}
            expandedTutorial={expandedTutorial}
            onToggle={handleToggle}
            onNoteClick={handleNoteClick}
            activeNotes={activeNotes}
          />
        </TabsContent>

        <TabsContent value="movies" className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-accent/10 rounded-lg border border-accent/20">
            <Film className="h-8 w-8 text-accent shrink-0" />
            <div>
              <h4 className="font-semibold text-lg">Movie Soundtracks</h4>
              <p className="text-sm text-muted-foreground">
                Learn iconic themes from your favorite films. Some are beginner-friendly!
              </p>
            </div>
          </div>
          <TutorialList 
            tutorials={movieTutorials}
            expandedTutorial={expandedTutorial}
            onToggle={handleToggle}
            onNoteClick={handleNoteClick}
            activeNotes={activeNotes}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
