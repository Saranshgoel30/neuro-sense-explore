import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Volume2, Play, Clock, Brain, Eye, Zap, Heart, Users } from 'lucide-react';
import { AudioDescription } from '@/components/AudioDescription';
import { AccessibleButton } from '@/components/AccessibleButton';

const Lessons = () => {
  const lessons = [
    {
      id: 1,
      title: "The Brain and Memory",
      description: "Journey through the neural pathways of memory formation, from encoding to retrieval",
      duration: "45 minutes",
      difficulty: "Beginner",
      icon: Brain,
      topics: ["Hippocampus", "Memory consolidation", "Forgetting curves"],
      audioPreview: "Imagine your brain as a vast library where memories are books..."
    },
    {
      id: 2,
      title: "The Visual System Beyond Vision",
      description: "Explore how visual processing works and what it means for non-visual learners",
      duration: "35 minutes",
      difficulty: "Intermediate",
      icon: Eye,
      topics: ["Visual cortex", "Non-visual pathways", "Neuroplasticity"],
      audioPreview: "The visual pathway acts like a highway where signals speed to the occipital lobe..."
    },
    {
      id: 3,
      title: "Neural Networks and Learning",
      description: "Understanding how neurons connect and adapt through experience",
      duration: "50 minutes",
      difficulty: "Advanced",
      icon: Zap,
      topics: ["Synaptic plasticity", "Learning algorithms", "Network topology"],
      audioPreview: "Picture neurons as musicians in an orchestra, each playing their part..."
    },
    {
      id: 4,
      title: "The Emotional Brain",
      description: "Dive into the limbic system and how emotions shape our neural responses",
      duration: "40 minutes",
      difficulty: "Beginner",
      icon: Heart,
      topics: ["Amygdala", "Emotional memory", "Fear conditioning"],
      audioPreview: "Emotions are like the conductors of our neural symphony..."
    },
    {
      id: 5,
      title: "Social Neuroscience",
      description: "How our brains are wired for social connection and interaction",
      duration: "55 minutes",
      difficulty: "Intermediate",
      icon: Users,
      topics: ["Mirror neurons", "Theory of mind", "Social cognition"],
      audioPreview: "Our brains are inherently social, like interconnected nodes in a network..."
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-success';
      case 'Intermediate': return 'bg-warning';
      case 'Advanced': return 'bg-destructive';
      default: return 'bg-muted';
    }
  };

  return (
    <Layout>
      {/* Header */}
      <section className="py-16 bg-gradient-secondary text-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Volume2 className="h-16 w-16 mx-auto mb-6 text-white/90" aria-hidden="true" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4" tabIndex={-1}>
              Audio Lessons
            </h1>
            <AudioDescription 
              text="Welcome to Audio Lessons. These podcast-style neuroscience modules use rich auditory storytelling and non-visual analogies to make complex concepts accessible for blind and low-vision learners."
              className="mb-4"
            />
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Podcast-style neuroscience modules using rich auditory storytelling 
              and non-visual analogies to make complex concepts accessible
            </p>
          </div>
        </div>
      </section>

      {/* Instructions */}
      <section className="py-8 bg-muted" aria-labelledby="instructions-heading">
        <div className="container mx-auto px-4">
          <h2 id="instructions-heading" className="text-2xl font-bold mb-4">
            How to Navigate Lessons
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <div className="bg-primary text-primary-foreground rounded-full p-2 mt-1">
                <span className="text-sm font-bold">Tab</span>
              </div>
              <div>
                <h3 className="font-semibold">Navigate</h3>
                <p className="text-muted-foreground text-sm">
                  Use Tab key to move between lessons and controls
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-primary text-primary-foreground rounded-full p-2 mt-1">
                <span className="text-sm font-bold">Enter</span>
              </div>
              <div>
                <h3 className="font-semibold">Activate</h3>
                <p className="text-muted-foreground text-sm">
                  Press Enter to start a lesson or interact with controls
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-primary text-primary-foreground rounded-full p-2 mt-1">
                <span className="text-sm font-bold">H</span>
              </div>
              <div>
                <h3 className="font-semibold">Headings</h3>
                <p className="text-muted-foreground text-sm">
                  Press H to jump between section headings
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lessons Grid */}
      <section className="py-16" aria-labelledby="lessons-heading">
        <div className="container mx-auto px-4">
          <h2 id="lessons-heading" className="text-3xl font-bold mb-8 text-center">
            Available Lessons
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lessons.map((lesson, index) => (
              <Card 
                key={lesson.id} 
                className="hover:shadow-medium transition-all duration-300 animate-fade-in-up group"
                style={{ animationDelay: `${index * 0.1}s` }}
                tabIndex={0}
                role="article"
                aria-labelledby={`lesson-${lesson.id}-title`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <lesson.icon className="h-8 w-8 text-primary" aria-hidden="true" />
                    <Badge 
                      className={`${getDifficultyColor(lesson.difficulty)} text-white`}
                      aria-label={`Difficulty level: ${lesson.difficulty}`}
                    >
                      {lesson.difficulty}
                    </Badge>
                  </div>
                  <CardTitle id={`lesson-${lesson.id}-title`} className="text-xl">
                    {lesson.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {lesson.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Duration */}
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="h-4 w-4 mr-2" aria-hidden="true" />
                      <span>{lesson.duration}</span>
                    </div>

                    {/* Topics */}
                    <div>
                      <h4 className="font-semibold mb-2">Key Topics:</h4>
                      <div className="flex flex-wrap gap-2">
                        {lesson.topics.map((topic) => (
                          <Badge key={topic} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Audio Preview */}
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <h4 className="font-semibold mb-2 text-sm">Audio Preview:</h4>
                      <p className="text-sm text-muted-foreground italic">
                        "{lesson.audioPreview}"
                      </p>
                    </div>

                    {/* Action Button */}
                    <AccessibleButton 
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground"
                      variant="outline"
                      aria-label={`Start lesson: ${lesson.title} - ${lesson.duration}`}
                      hapticFeedback="medium"
                      announcement={`Starting ${lesson.title} lesson`}
                    >
                      <Play className="mr-2 h-4 w-4" aria-hidden="true" />
                      Start Lesson
                    </AccessibleButton>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Audio Player Placeholder */}
      <section className="py-12 bg-card border-t" aria-labelledby="player-heading">
        <div className="container mx-auto px-4">
          <h2 id="player-heading" className="text-2xl font-bold mb-6 text-center">
            Integrated Audio Player
          </h2>
          <div className="max-w-2xl mx-auto bg-muted p-6 rounded-lg">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <Button size="lg" className="rounded-full" aria-label="Play lesson">
                <Play className="h-6 w-6" />
              </Button>
              <div className="flex-1">
                <div className="h-2 bg-border rounded-full">
                  <div className="h-2 bg-primary rounded-full w-1/3" role="progressbar" aria-label="Audio progress" aria-valuenow={33} aria-valuemin={0} aria-valuemax={100}></div>
                </div>
              </div>
              <span className="text-sm text-muted-foreground" aria-live="polite">
                15:32 / 45:00
              </span>
            </div>
            <div className="text-center">
              <h3 className="font-semibold">Currently Playing</h3>
              <p className="text-muted-foreground">Select a lesson to begin</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Lessons;