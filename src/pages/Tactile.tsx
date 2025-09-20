import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Layers, Download, Volume2, FileText, Brain, Zap, Heart, Eye, Printer, Package } from 'lucide-react';

const Tactile = () => {
  const [selectedCategory, setSelectedCategory] = useState("brain-anatomy");

  const modelCategories = [
    {
      id: "brain-anatomy",
      title: "Brain Anatomy",
      icon: Brain,
      description: "3D models of brain regions and structures",
      count: 12
    },
    {
      id: "neurons",
      title: "Neurons & Cells",
      icon: Zap,
      description: "Individual neural cells and their components",
      count: 8
    },
    {
      id: "lab-tools",
      title: "Lab Equipment",
      icon: Package,
      description: "Research instruments and experimental setups",
      count: 6
    },
    {
      id: "pathways",
      title: "Neural Pathways",
      icon: Eye,
      description: "Connected brain circuits and signal flows",
      count: 10
    }
  ];

  const models = {
    "brain-anatomy": [
      {
        id: 1,
        title: "Complete Human Brain",
        description: "Full brain model with removable sections for detailed exploration",
        files: ["brain_complete.stl", "brain_sections.obj"],
        printTime: "8-12 hours",
        difficulty: "Intermediate",
        audioGuide: "45 minutes",
        tags: ["Cerebrum", "Cerebellum", "Brainstem"]
      },
      {
        id: 2,
        title: "Hippocampus Detail",
        description: "High-resolution hippocampal formation showing internal structure",
        files: ["hippocampus_detailed.stl"],
        printTime: "3-4 hours",
        difficulty: "Beginner",
        audioGuide: "20 minutes",
        tags: ["Memory", "Learning", "Temporal lobe"]
      },
      {
        id: 3,
        title: "Visual Cortex Layers",
        description: "Layered model showing cortical organization and visual processing areas",
        files: ["visual_cortex_layers.stl", "layer_guide.obj"],
        printTime: "5-6 hours",
        difficulty: "Advanced",
        audioGuide: "35 minutes",
        tags: ["Vision", "Cortex", "Processing"]
      }
    ],
    "neurons": [
      {
        id: 4,
        title: "Motor Neuron",
        description: "Large-scale motor neuron with dendrites, axon, and synapses",
        files: ["motor_neuron.stl"],
        printTime: "2-3 hours",
        difficulty: "Beginner",
        audioGuide: "15 minutes",
        tags: ["Movement", "Spinal cord", "Muscle control"]
      },
      {
        id: 5,
        title: "Synapse Detail",
        description: "Magnified synaptic cleft showing neurotransmitter release mechanisms",
        files: ["synapse_detail.stl", "neurotransmitters.obj"],
        printTime: "4-5 hours",
        difficulty: "Intermediate",
        audioGuide: "25 minutes",
        tags: ["Communication", "Chemicals", "Transmission"]
      }
    ],
    "lab-tools": [
      {
        id: 6,
        title: "EEG Electrode Array",
        description: "Tactile representation of EEG electrode placement on scalp",
        files: ["eeg_array.stl", "electrode_positions.obj"],
        printTime: "3-4 hours",
        difficulty: "Intermediate",
        audioGuide: "30 minutes",
        tags: ["Recording", "Brain waves", "Non-invasive"]
      }
    ],
    "pathways": [
      {
        id: 7,
        title: "Visual Pathway Complete",
        description: "From retina to visual cortex - complete signal flow model",
        files: ["visual_pathway.stl", "pathway_sections.obj"],
        printTime: "6-8 hours",
        difficulty: "Advanced",
        audioGuide: "40 minutes",
        tags: ["Retina", "LGN", "Cortex", "Processing"]
      }
    ]
  };

  const getCurrentModels = () => {
    return models[selectedCategory as keyof typeof models] || [];
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-success text-white';
      case 'Intermediate': return 'bg-warning text-white';
      case 'Advanced': return 'bg-destructive text-white';
      default: return 'bg-muted';
    }
  };

  return (
    <Layout>
      {/* Header */}
      <section className="py-16 bg-gradient-secondary text-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Layers className="h-16 w-16 mx-auto mb-6 text-white/90" aria-hidden="true" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Tactile Hub
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Downloadable 3D-printable models of brain regions, neurons, and lab tools 
              with step-by-step audio instructions for tactile learning
            </p>
          </div>
        </div>
      </section>

      {/* Quick Guide */}
      <section className="py-8 bg-muted" aria-labelledby="guide-heading">
        <div className="container mx-auto px-4">
          <h2 id="guide-heading" className="text-2xl font-bold mb-6">
            3D Printing Guide
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-start space-x-3">
              <div className="bg-primary text-primary-foreground rounded-full p-2">
                <Download className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">Download</h3>
                <p className="text-sm text-muted-foreground">
                  Get STL/OBJ files and audio guides
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-primary text-primary-foreground rounded-full p-2">
                <Printer className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">Print</h3>
                <p className="text-sm text-muted-foreground">
                  Use PLA plastic, 0.2mm layer height
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-primary text-primary-foreground rounded-full p-2">
                <Volume2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">Listen</h3>
                <p className="text-sm text-muted-foreground">
                  Follow step-by-step audio assembly
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-primary text-primary-foreground rounded-full p-2">
                <Brain className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">Explore</h3>
                <p className="text-sm text-muted-foreground">
                  Learn through tactile interaction
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Model Categories */}
      <section className="py-16" aria-labelledby="categories-heading">
        <div className="container mx-auto px-4">
          <h2 id="categories-heading" className="text-3xl font-bold mb-8 text-center">
            Model Categories
          </h2>
          
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
              {modelCategories.map((category) => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="flex items-center space-x-2"
                >
                  <category.icon className="h-4 w-4" />
                  <span>{category.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {modelCategories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <div className="mb-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <category.icon className="h-6 w-6 mr-2" />
                        {category.title}
                        <Badge variant="secondary" className="ml-2">
                          {category.count} models
                        </Badge>
                      </CardTitle>
                      <CardDescription className="text-base">
                        {category.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>

                {/* Models Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {getCurrentModels().map((model, index) => (
                    <Card 
                      key={model.id} 
                      className="hover:shadow-medium transition-all duration-300 animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between mb-3">
                          <Badge className={getDifficultyColor(model.difficulty)}>
                            {model.difficulty}
                          </Badge>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Printer className="h-4 w-4 mr-1" />
                            {model.printTime}
                          </div>
                        </div>
                        <CardTitle className="text-xl">
                          {model.title}
                        </CardTitle>
                        <CardDescription className="text-base">
                          {model.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {/* Files */}
                          <div>
                            <h4 className="font-semibold mb-2">Files:</h4>
                            <div className="space-y-1">
                              {model.files.map((file) => (
                                <div key={file} className="flex items-center text-sm text-muted-foreground">
                                  <FileText className="h-4 w-4 mr-2" />
                                  {file}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Audio Guide */}
                          <div className="flex items-center text-sm">
                            <Volume2 className="h-4 w-4 mr-2 text-primary" />
                            <span>Audio guide: {model.audioGuide}</span>
                          </div>

                          {/* Tags */}
                          <div>
                            <h4 className="font-semibold mb-2">Topics:</h4>
                            <div className="flex flex-wrap gap-2">
                              {model.tags.map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Download Button */}
                          <Button className="w-full" aria-label={`Download ${model.title} files and audio guide`}>
                            <Download className="mr-2 h-4 w-4" />
                            Download Package
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Printing Requirements */}
      <section className="py-12 bg-card border-t" aria-labelledby="requirements-heading">
        <div className="container mx-auto px-4">
          <h2 id="requirements-heading" className="text-2xl font-bold mb-8 text-center">
            Printing Requirements & Tips
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Printer className="h-6 w-6 mr-2" />
                    Technical Specifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <strong>Material:</strong> PLA or PETG plastic recommended
                  </div>
                  <div>
                    <strong>Layer Height:</strong> 0.15-0.2mm for detail
                  </div>
                  <div>
                    <strong>Infill:</strong> 15-20% for structural models
                  </div>
                  <div>
                    <strong>Support:</strong> Required for complex overhangs
                  </div>
                  <div>
                    <strong>Print Speed:</strong> 40-60mm/s for quality
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Volume2 className="h-6 w-6 mr-2" />
                    Audio Guide Features
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <strong>Pre-Print:</strong> Material preparation and settings
                  </div>
                  <div>
                    <strong>During Print:</strong> Quality check indicators
                  </div>
                  <div>
                    <strong>Post-Print:</strong> Removal and finishing steps
                  </div>
                  <div>
                    <strong>Assembly:</strong> Step-by-step construction guide
                  </div>
                  <div>
                    <strong>Learning:</strong> Tactile exploration instructions
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Accessibility Note */}
      <section className="py-8 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl font-bold mb-4">
            Designed for Universal Access
          </h3>
          <p className="max-w-2xl mx-auto">
            All models include braille labels, tactile surface textures, and comprehensive 
            audio descriptions to ensure accessibility for learners with varying visual abilities.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Tactile;