import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookOpen, Download, Headphones, Search, Sparkles } from 'lucide-react';
import { AudioDescription } from '@/components/AudioDescription';
import { AccessibleButton } from '@/components/AccessibleButton';
import { useAccessibilityContext } from '@/components/AccessibilityProvider';

const Library = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const { announceToScreenReader } = useAccessibilityContext();

  const resources = [
    {
      id: 1,
      title: "Introduction to Neuroscience",
      type: "audio-lesson",
      description: "Comprehensive overview of the nervous system for beginners",
      duration: "2 hours 15 minutes",
      difficulty: "Beginner",
      topic: "General",
      tags: ["Foundation", "Overview", "Brain structure"],
      downloadSize: "45MB"
    },
    {
      id: 2,
      title: "Visual Pathway Interactive Map",
      type: "sonified-map",
      description: "Navigate from retina to visual cortex with audio guidance",
      duration: "45 minutes",
      difficulty: "Intermediate",
      topic: "Vision",
      tags: ["Visual processing", "Retina", "Cortex"],
      downloadSize: "12MB"
    },
    {
      id: 3,
      title: "Complete Human Brain Model",
      type: "3d-model",
      description: "Detailed 3D printable brain with removable sections",
      duration: "8-12 hours print time",
      difficulty: "Intermediate",
      topic: "Anatomy",
      tags: ["Brain anatomy", "3D printing", "Tactile"],
      downloadSize: "125MB"
    },
    {
      id: 4,
      title: "Memory and Learning",
      type: "audio-lesson",
      description: "How the brain forms, stores, and retrieves memories",
      duration: "1 hour 30 minutes",
      difficulty: "Beginner",
      topic: "Memory",
      tags: ["Hippocampus", "Memory formation", "Learning"],
      downloadSize: "38MB"
    },
    {
      id: 5,
      title: "Neural Networks Topology",
      type: "sonified-map",
      description: "Experience complex neural connections through layered audio",
      duration: "1 hour 15 minutes",
      difficulty: "Advanced",
      topic: "Networks",
      tags: ["Connectivity", "Networks", "Computation"],
      downloadSize: "18MB"
    },
    {
      id: 6,
      title: "Motor Neuron Model",
      type: "3d-model",
      description: "Large-scale neuron with dendrites, axon, and synapses",
      duration: "2-3 hours print time",
      difficulty: "Beginner",
      topic: "Cells",
      tags: ["Neuron", "Motor control", "Cell structure"],
      downloadSize: "28MB"
    },
    {
      id: 7,
      title: "Emotions and the Brain",
      type: "audio-lesson",
      description: "Understanding the limbic system and emotional processing",
      duration: "1 hour 45 minutes",
      difficulty: "Intermediate",
      topic: "Emotion",
      tags: ["Limbic system", "Emotions", "Amygdala"],
      downloadSize: "42MB"
    },
    {
      id: 8,
      title: "Social Brain Networks",
      type: "sonified-map",
      description: "Explore brain regions involved in social cognition",
      duration: "55 minutes",
      difficulty: "Advanced",
      topic: "Social",
      tags: ["Social cognition", "Theory of mind", "Mirror neurons"],
      downloadSize: "15MB"
    }
  ];

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'audio-lesson': return 'Audio Lesson';
      case 'sonified-map': return 'Sonified Map';
      case '3d-model': return '3D Model';
      default: return 'Resource';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-success text-success-foreground';
      case 'Intermediate': return 'bg-warning text-warning-foreground';
      case 'Advanced': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted';
    }
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = selectedType === "all" || resource.type === selectedType;
    const matchesDifficulty = selectedDifficulty === "all" || resource.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesType && matchesDifficulty;
  });

  React.useEffect(() => {
    announceToScreenReader(`${filteredResources.length} resources available`, 'polite');
  }, [filteredResources.length, announceToScreenReader]);

  return (
    <Layout>
      {/* Header */}
      <section className="section-regular bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-4 py-2 mb-6 text-sm">
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              Complete accessible resource hub
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4" tabIndex={-1}>
              Resource Library
            </h1>
            <AudioDescription 
              text="Welcome to the Resource Library. This is your complete collection of accessible neuroscience resources, organized by topic, difficulty, and learning style for comprehensive education."
              className="mb-4"
            />
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Complete collection of accessible neuroscience resources organized by topic, 
              difficulty, and learning style for comprehensive education
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="section-compact bg-card border-b">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto rounded-xl border bg-muted/40 p-4 shadow-soft">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <Label htmlFor="resource-search" className="sr-only">Search resources</Label>
                <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" aria-hidden="true" />
                <Input
                  id="resource-search"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                  aria-label="Search resources"
                />
              </div>

              {/* Type Filter */}
              <div>
                <Label htmlFor="type-filter" className="sr-only">Filter by resource type</Label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger id="type-filter" aria-label="Filter by resource type">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="audio-lesson">Audio Lessons</SelectItem>
                    <SelectItem value="sonified-map">Sonified Maps</SelectItem>
                    <SelectItem value="3d-model">3D Models</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Difficulty Filter */}
              <div>
                <Label htmlFor="difficulty-filter" className="sr-only">Filter by difficulty</Label>
                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger id="difficulty-filter" aria-label="Filter by difficulty">
                    <SelectValue placeholder="All Difficulties" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Difficulties</SelectItem>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-compact bg-muted" aria-live="polite" aria-atomic="true">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">
                  {filteredResources.length}
                </div>
                <p className="text-sm text-muted-foreground">
                  {searchQuery || selectedType !== "all" || selectedDifficulty !== "all" ? "Filtered" : "Total"} Resources
                </p>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">
                  {filteredResources.filter(r => r.type === 'audio-lesson').length}
                </div>
                <p className="text-sm text-muted-foreground">Audio Lessons</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">
                  {filteredResources.filter(r => r.type === 'sonified-map').length}
                </div>
                <p className="text-sm text-muted-foreground">Sonified Maps</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">
                  {filteredResources.filter(r => r.type === '3d-model').length}
                </div>
                <p className="text-sm text-muted-foreground">3D Models</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="section-regular" aria-labelledby="resources-heading">
        <div className="container mx-auto px-4 md:px-6">
          <h2 id="resources-heading" className="text-3xl font-bold mb-8">
            Available Resources
            {(searchQuery || selectedType !== "all" || selectedDifficulty !== "all") && (
              <Badge variant="outline" className="ml-4">
                {filteredResources.length} results
              </Badge>
            )}
          </h2>

          {filteredResources.length === 0 ? (
            <div className="text-center py-12 rounded-xl border bg-muted/40">
              <h3 className="text-xl font-semibold mb-2">No resources found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or filters
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredResources.map((resource, index) => {
                return (
                  <Card 
                    key={resource.id} 
                    className="card-modern transition-all duration-200 hover:-translate-y-1 hover:shadow-medium border-2"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="outline">{getTypeLabel(resource.type)}</Badge>
                        <Badge className={getDifficultyColor(resource.difficulty)}>
                          {resource.difficulty}
                        </Badge>
                      </div>
                      
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                      
                      <CardDescription className="text-base">
                        {resource.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-4">
                        {/* Duration & Size */}
                        <div className="flex justify-between text-sm text-muted-foreground rounded-lg border bg-muted/40 px-3 py-2">
                          <span>{resource.duration}</span>
                          <span>{resource.downloadSize}</span>
                        </div>

                        {/* Tags */}
                        <div>
                          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Topics</div>
                          <div className="flex flex-wrap gap-2">
                            {resource.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          {resource.type === 'audio-lesson' && (
                            <AccessibleButton 
                              size="sm" 
                              variant="outline" 
                              className="flex-1"
                              hapticFeedback="light"
                              announcement={`Playing ${resource.title}`}
                              aria-label={`Play ${resource.title} audio lesson`}
                            >
                                <Headphones className="h-4 w-4" aria-hidden="true" />
                              Play
                            </AccessibleButton>
                          )}
                          {resource.type === 'sonified-map' && (
                            <AccessibleButton 
                              size="sm" 
                              variant="outline" 
                              className="flex-1"
                              hapticFeedback="light"
                              announcement={`Exploring ${resource.title} map`}
                              aria-label={`Explore ${resource.title} interactive map`}
                            >
                                <Sparkles className="h-4 w-4" aria-hidden="true" />
                              Explore
                            </AccessibleButton>
                          )}
                          <AccessibleButton 
                            size="sm" 
                            className="flex-1"
                            hapticFeedback="medium"
                            announcement={`Downloading ${resource.title}`}
                            aria-label={`Download ${resource.title} resource`}
                          >
                            <Download className="h-4 w-4" aria-hidden="true" />
                            Get
                          </AccessibleButton>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Learning Paths */}
      <section className="section-regular bg-muted" aria-labelledby="paths-heading">
        <div className="container mx-auto px-4 md:px-6">
          <h2 id="paths-heading" className="text-3xl font-bold mb-8 text-center">
            Suggested Learning Paths
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Beginner Path</CardTitle>
                  <CardDescription>
                    Start your neuroscience journey with fundamental concepts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-2 text-sm">
                    <li>1. Introduction to Neuroscience</li>
                    <li>2. Motor Neuron Model</li>
                    <li>3. Memory and Learning</li>
                    <li>4. Complete Human Brain Model</li>
                  </ol>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Vision Specialist</CardTitle>
                  <CardDescription>
                    Deep dive into visual processing and perception
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-2 text-sm">
                    <li>1. Visual System Beyond Vision</li>
                    <li>2. Visual Pathway Interactive Map</li>
                    <li>3. Visual Cortex Layers Model</li>
                    <li>4. Advanced Visual Processing</li>
                  </ol>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Advanced Systems</CardTitle>
                  <CardDescription>
                    Explore complex neural networks and interactions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-2 text-sm">
                    <li>1. Neural Networks Topology</li>
                    <li>2. Social Brain Networks</li>
                    <li>3. Complex System Models</li>
                    <li>4. Research Applications</li>
                  </ol>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Library;