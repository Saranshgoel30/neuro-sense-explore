import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Compass, Layers, Volume2 } from 'lucide-react';
import { AudioDescription } from '@/components/AudioDescription';
import { AccessibleButton } from '@/components/AccessibleButton';
import { useAccessibilityContext } from '@/components/AccessibilityProvider';

const Maps = () => {
  const [selectedMap, setSelectedMap] = useState<number | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const { triggerHapticFeedback, announceToScreenReader } = useAccessibilityContext();

  const brainMaps = [
    {
      id: 1,
      title: "Visual Pathway Map",
      description: "Navigate from retina to visual cortex with distinct audio tones",
      regions: ["Retina", "LGN", "V1", "V2", "V4", "IT Cortex"],
      baseFrequency: 220,
      complexity: "Beginner"
    },
    {
      id: 2,
      title: "Memory Circuit",
      description: "Explore hippocampal-cortical memory networks through sound",
      regions: ["Hippocampus", "Entorhinal Cortex", "Prefrontal Cortex", "Temporal Lobe"],
      baseFrequency: 440,
      complexity: "Intermediate"
    },
    {
      id: 3,
      title: "Neural Network Topology",
      description: "Experience complex neural connections through multi-layered audio",
      regions: ["Input Layer", "Hidden Layer 1", "Hidden Layer 2", "Output Layer"],
      baseFrequency: 330,
      complexity: "Advanced"
    }
  ];

  const getFrequencyForRegion = (baseFreq: number, index: number, total: number) => {
    // Progressively higher frequencies for regions
    return Math.round(baseFreq * Math.pow(1.2, index));
  };

  const playTone = (frequency: number, duration: number = 500) => {
    void duration;
    triggerHapticFeedback('light');
    announceToScreenReader(`Playing tone at ${frequency} hertz`, 'polite');
  };

  return (
    <Layout>
      {/* Header */}
      <section className="py-16 bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-4 py-2 mb-6 text-sm">
              <Compass className="h-4 w-4" aria-hidden="true" />
              Spatial audio navigation
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4" tabIndex={-1}>
              Interactive Sonified Maps
            </h1>
            <AudioDescription 
              text="Welcome to Interactive Sonified Maps. These keyboard-navigable brain diagrams use sound to represent neural activity and anatomical structures. Each region produces distinct tones to help you explore brain anatomy through audio."
              className="mb-4"
            />
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Keyboard-navigable brain diagrams with sonification where pitch changes 
              denote neural activation levels and anatomical structures
            </p>
          </div>
        </div>
      </section>

      {/* Navigation Instructions */}
      <section className="py-8 bg-muted" aria-labelledby="navigation-heading">
        <div className="container mx-auto px-4">
          <h2 id="navigation-heading" className="text-2xl font-bold mb-6">
            Navigation Controls
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3">
              <div className="bg-primary text-primary-foreground p-2 rounded font-semibold">↑</div>
              <div>
                <h3 className="font-semibold">↑ Arrow Key</h3>
                <p className="text-sm text-muted-foreground">Move to upper brain region</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-primary text-primary-foreground p-2 rounded font-semibold">↓</div>
              <div>
                <h3 className="font-semibold">↓ Arrow Key</h3>
                <p className="text-sm text-muted-foreground">Move to lower brain region</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-primary text-primary-foreground p-2 rounded font-semibold">←</div>
              <div>
                <h3 className="font-semibold">← Arrow Key</h3>
                <p className="text-sm text-muted-foreground">Move to left hemisphere</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-primary text-primary-foreground p-2 rounded font-semibold">→</div>
              <div>
                <h3 className="font-semibold">→ Arrow Key</h3>
                <p className="text-sm text-muted-foreground">Move to right hemisphere</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Available Maps */}
      <section className="py-16" aria-labelledby="maps-heading">
        <div className="container mx-auto px-4">
          <h2 id="maps-heading" className="text-3xl font-bold mb-8 text-center">
            Available Brain Maps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {brainMaps.map((map, index) => (
              <Card 
                key={map.id} 
                className={`card-modern transition-all duration-200 hover:-translate-y-1 hover:shadow-medium border-2 ${
                  selectedMap === map.id ? 'ring-2 ring-primary' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
                role="article"
                aria-labelledby={`map-${map.id}-title`}
              >
                <CardHeader>
                  <div className="flex items-center justify-end mb-3">
                    <Badge variant="outline">
                      {map.complexity}
                    </Badge>
                  </div>
                  <CardTitle id={`map-${map.id}-title`} className="text-xl">
                    {map.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {map.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Regions ({map.regions.length}):</h4>
                      <div className="flex flex-wrap gap-2">
                        {map.regions.map((region, idx) => (
                          <Badge 
                            key={region} 
                            variant="secondary" 
                            className="text-xs"
                            title={`Frequency: ${getFrequencyForRegion(map.baseFrequency, idx, map.regions.length)}Hz`}
                          >
                            {region}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Volume2 className="h-4 w-4 mr-2" aria-hidden="true" />
                        Base frequency: {map.baseFrequency}Hz
                      </div>
                    </div>
                    <AccessibleButton 
                      className="w-full"
                      variant={selectedMap === map.id ? "default" : "outline"}
                      hapticFeedback="medium"
                      announcement={selectedMap === map.id ? `${map.title} map deselected` : `${map.title} map selected`}
                      onClick={() => setSelectedMap(selectedMap === map.id ? null : map.id)}
                      aria-pressed={selectedMap === map.id}
                      aria-label={`${selectedMap === map.id ? "Deselect" : "Select"} ${map.title} interactive map`}
                    >
                      {selectedMap === map.id ? "Selected" : "Select Map"}
                    </AccessibleButton>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Map Viewer */}
      {selectedMap && (
        <section className="py-16 bg-card border-t" aria-labelledby="viewer-heading">
          <div className="container mx-auto px-4">
            <h2 id="viewer-heading" className="text-2xl font-bold mb-8 text-center">
              Interactive Map Viewer
            </h2>
            {(() => {
              const currentMap = brainMaps.find(m => m.id === selectedMap);
              if (!currentMap) return null;

              return (
                <div className="max-w-4xl mx-auto">
                  <div className="bg-muted p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-4 text-center">
                      {currentMap.title}
                    </h3>
                    
                    {/* Simulated Brain Map */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      {currentMap.regions.map((region, index) => (
                        <Button
                          key={region}
                          variant={selectedRegion === region ? "default" : "outline"}
                          className="h-20 flex flex-col items-center justify-center text-sm"
                          onClick={() => {
                            setSelectedRegion(region);
                            playTone(getFrequencyForRegion(currentMap.baseFrequency, index, currentMap.regions.length));
                          }}
                          aria-label={`${region} - Frequency ${getFrequencyForRegion(currentMap.baseFrequency, index, currentMap.regions.length)}Hz`}
                        >
                          <Layers className="h-4 w-4" aria-hidden="true" />
                          <span className="text-xs text-center">{region}</span>
                        </Button>
                      ))}
                    </div>

                    {/* Current Selection Info */}
                    <div className="bg-background p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Current Selection:</h4>
                      {selectedRegion ? (
                        <div className="space-y-2">
                          <p><strong>Region:</strong> {selectedRegion}</p>
                          <p><strong>Frequency:</strong> {
                            getFrequencyForRegion(
                              currentMap.baseFrequency, 
                              currentMap.regions.indexOf(selectedRegion), 
                              currentMap.regions.length
                            )
                          }Hz</p>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Volume2 className="h-4 w-4 mr-2" aria-hidden="true" />
                            Audio cue played on selection
                          </div>
                        </div>
                      ) : (
                        <p className="text-muted-foreground">Click on a region to hear its audio signature</p>
                      )}
                    </div>

                    {/* Navigation Help */}
                    <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                      <h4 className="font-semibold mb-2">Navigation Tips:</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Use Tab to navigate between regions</li>
                        <li>• Press Enter to activate a region and hear its tone</li>
                        <li>• Arrow keys to move spatially between connected regions</li>
                        <li>• Each region has a unique frequency signature</li>
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </section>
      )}

      {/* Sonification Info */}
      <section className="py-12 bg-muted" aria-labelledby="sonification-heading">
        <div className="container mx-auto px-4">
          <h2 id="sonification-heading" className="text-2xl font-bold mb-6 text-center">
            Understanding Sonification
          </h2>
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>How Audio Maps Neural Structure</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold">Frequency Mapping:</h4>
                  <p className="text-muted-foreground">
                    Lower frequencies represent earlier/peripheral structures, 
                    higher frequencies represent later/central processing areas
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Spatial Navigation:</h4>
                  <p className="text-muted-foreground">
                    Arrow keys move through anatomically connected regions, 
                    with audio transitions indicating pathway connections
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Interactive Feedback:</h4>
                  <p className="text-muted-foreground">
                    Each region produces distinct tones, helping users build 
                    mental maps of neural architecture through sound
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Maps;