import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Volume2, Map, Layers, BookOpen, Accessibility, Brain, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAccessibilityContext } from '@/components/AccessibilityProvider';

const Index = () => {
  const { triggerHapticFeedback, announceToScreenReader } = useAccessibilityContext();

  const handleFeatureClick = (featureName: string) => {
    triggerHapticFeedback('light');
    announceToScreenReader(`Exploring ${featureName}`, 'polite');
  };

  const features = [
    {
      icon: Volume2,
      title: 'Audio Lessons',
      description: 'Podcast-style modules using rich auditory storytelling and non-visual analogies',
      href: '/lessons',
      example: '"The Brain and Memory", "The Visual System Beyond Vision"'
    },
    {
      icon: Map,
      title: 'Sonified Maps',
      description: 'Interactive keyboard-navigable diagrams with pitch changes denoting neural activity',
      href: '/maps',
      example: 'Navigate brain regions with distinct tones and audio cues'
    },
    {
      icon: Layers,
      title: 'Tactile Hub',
      description: 'Downloadable 3D-printable models of brain regions, neurons, and lab tools',
      href: '/tactile',
      example: 'STL/OBJ files with step-by-step audio instructions'
    },
    {
      icon: BookOpen,
      title: 'Complete Library',
      description: 'Full collection of accessible neuroscience resources and materials',
      href: '/library',
      example: 'Organized by topic, difficulty, and learning style'
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-24" role="banner">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              NewroView
              <span className="block text-2xl md:text-3xl font-normal mt-2 text-white/90">
                Accessible Neuroscience Education
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              A multilingual, digitally accessible platform for neuroscience education 
              tailored specifically for blind and low-vision learners
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/lessons">
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="text-lg px-8 py-4"
                  onClick={() => handleFeatureClick('Audio Lessons')}
                  aria-describedby="start-learning-desc"
                >
                  <Volume2 className="mr-2 h-5 w-5" aria-hidden="true" />
                  Start Learning
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </Button>
              </Link>
              <span id="start-learning-desc" className="sr-only">
                Navigate to audio lessons page with podcast-style neuroscience modules
              </span>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-4 bg-white/10 border-white text-white hover:bg-white hover:text-primary"
                onClick={() => {
                  triggerHapticFeedback('medium');
                  announceToScreenReader('Scrolling to features section', 'polite');
                  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                  // Focus the features section for keyboard users
                  setTimeout(() => {
                    document.getElementById('features-heading')?.focus();
                  }, 500);
                }}
                aria-describedby="explore-features-desc"
              >
                <Accessibility className="mr-2 h-5 w-5" aria-hidden="true" />
                Explore Features
              </Button>
              <span id="explore-features-desc" className="sr-only">
                Scroll down to view detailed information about all accessibility features
              </span>
            </div>
          </div>
        </div>
        {/* Accessibility indicator */}
        <div className="absolute bottom-4 right-4 text-white/70 text-sm">
          <Accessibility className="inline h-4 w-4 mr-1" aria-hidden="true" />
          WCAG 2.1 AA Compliant
        </div>
      </section>

      {/* Key Stats */}
      <section className="py-16 bg-muted" aria-labelledby="stats-heading">
        <div className="container mx-auto px-4">
          <h2 id="stats-heading" className="sr-only">Platform Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="animate-fade-in-up">
              <Brain className="h-12 w-12 text-primary mx-auto mb-4" aria-hidden="true" />
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <p className="text-muted-foreground">Keyboard Navigable</p>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <Volume2 className="h-12 w-12 text-secondary mx-auto mb-4" aria-hidden="true" />
              <div className="text-3xl font-bold text-secondary mb-2">Audio-First</div>
              <p className="text-muted-foreground">Design Approach</p>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <Layers className="h-12 w-12 text-accent mx-auto mb-4" aria-hidden="true" />
              <div className="text-3xl font-bold text-accent mb-2">Multi-Modal</div>
              <p className="text-muted-foreground">Learning Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20" aria-labelledby="features-heading">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 
              id="features-heading" 
              className="text-4xl font-bold mb-4"
              tabIndex={-1}
              aria-describedby="features-description"
            >
              Inclusive Learning Features
            </h2>
            <p id="features-description" className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience neuroscience through multiple senses with our comprehensive 
              accessibility-first approach
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={feature.title} 
                className="hover:shadow-medium transition-all duration-300 animate-fade-in-up" 
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <feature.icon className="h-8 w-8 text-primary" aria-hidden="true" />
                    <CardTitle className="text-2xl">{feature.title}</CardTitle>
                  </div>
                  <CardDescription className="text-lg">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/50 p-4 rounded-lg mb-4">
                    <p className="text-sm text-muted-foreground italic">
                      Example: {feature.example}
                    </p>
                  </div>
                  <Link to={feature.href}>
                    <Button 
                      className="w-full" 
                      variant="outline"
                      onClick={() => handleFeatureClick(feature.title)}
                      aria-describedby={`feature-${feature.title.toLowerCase().replace(/\s+/g, '-')}-desc`}
                    >
                      Explore {feature.title}
                      <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Button>
                  </Link>
                  <span id={`feature-${feature.title.toLowerCase().replace(/\s+/g, '-')}-desc`} className="sr-only">
                    {feature.description}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Accessibility Commitment */}
      <section className="py-16 bg-primary text-primary-foreground" aria-labelledby="accessibility-heading">
        <div className="container mx-auto px-4 text-center">
          <h2 id="accessibility-heading" className="text-3xl font-bold mb-6">
            Built for Universal Access
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="flex flex-col items-center">
              <div className="bg-white/20 p-3 rounded-full mb-3">
                <Accessibility className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="font-semibold mb-2">Screen Reader Support</h3>
              <p className="text-primary-foreground/90 text-sm">
                Full compatibility with all major screen readers
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white/20 p-3 rounded-full mb-3">
                <Volume2 className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="font-semibold mb-2">Audio Descriptions</h3>
              <p className="text-primary-foreground/90 text-sm">
                Rich audio content for all visual elements
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white/20 p-3 rounded-full mb-3">
                <Map className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="font-semibold mb-2">Haptic Feedback</h3>
              <p className="text-primary-foreground/90 text-sm">
                Device vibrations for enhanced interaction
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white/20 p-3 rounded-full mb-3">
                <Brain className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="font-semibold mb-2">High Contrast</h3>
              <p className="text-primary-foreground/90 text-sm">
                Toggle mode for enhanced visibility
              </p>
            </div>
          </div>
          <p className="text-lg text-primary-foreground/90">
            Press <kbd className="bg-white/20 px-2 py-1 rounded text-sm">Ctrl+Alt+C</kbd> 
            {" "}to toggle high contrast mode
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Index;