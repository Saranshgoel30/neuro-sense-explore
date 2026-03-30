import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BookOpen, BrainCircuit, Layers, Map, Sparkles, Volume2 } from 'lucide-react';
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
      title: 'Audio Lessons',
      icon: Volume2,
      description: 'Podcast-style modules using rich auditory storytelling and non-visual analogies',
      href: '/lessons',
      example: '"The Brain and Memory", "The Visual System Beyond Vision"'
    },
    {
      title: 'Sonified Maps',
      icon: Map,
      description: 'Interactive keyboard-navigable diagrams with pitch changes denoting neural activity',
      href: '/maps',
      example: 'Navigate brain regions with distinct tones and audio cues'
    },
    {
      title: 'Tactile Hub',
      icon: Layers,
      description: 'Downloadable 3D-printable models of brain regions, neurons, and lab tools',
      href: '/tactile',
      example: 'STL/OBJ files with step-by-step audio instructions'
    },
    {
      title: 'Complete Library',
      icon: BookOpen,
      description: 'Full collection of accessible neuroscience resources and materials',
      href: '/library',
      example: 'Organized by topic, difficulty, and learning style'
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-24 text-primary-foreground" role="banner">
        <div className="container mx-auto px-4 text-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-4 py-2 mb-6 text-sm">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Designed for accessible learning
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              NewroView
              <span className="block text-2xl md:text-3xl font-normal mt-2 text-primary-foreground/90">
                Accessible Neuroscience Education
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              A multilingual, digitally accessible platform for neuroscience education
              tailored specifically for blind and low-vision learners
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-4"
              >
                <Link
                  to="/lessons"
                  onClick={() => handleFeatureClick('Audio Lessons')}
                  aria-describedby="start-learning-desc"
                >
                  <Volume2 className="h-5 w-5" aria-hidden="true" />
                  Start Learning
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>
              <span id="start-learning-desc" className="sr-only">
                Navigate to audio lessons page with podcast-style neuroscience modules
              </span>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 bg-primary-foreground/10 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
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
                <BrainCircuit className="h-5 w-5" aria-hidden="true" />
                Explore Features
              </Button>
              <span id="explore-features-desc" className="sr-only">
                Scroll down to view detailed information about all accessibility features
              </span>
            </div>
          </div>
        </div>
        {/* Accessibility indicator */}
        <div className="absolute bottom-4 right-4 text-primary-foreground/80 text-sm">
          WCAG 2.1 AA Compliant
        </div>
      </section>

      {/* Key Stats */}
      <section className="py-16 bg-muted" aria-labelledby="stats-heading">
        <div className="container mx-auto px-4">
          <h2 id="stats-heading" className="sr-only">Platform Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <p className="text-muted-foreground">Keyboard Navigable</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">Audio-First</div>
              <p className="text-muted-foreground">Design Approach</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">Multi-Modal</div>
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
                className="card-modern transition-all duration-200 hover:-translate-y-1 hover:shadow-medium border-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <feature.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                    {feature.title}
                  </CardTitle>
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
                  <Button asChild className="w-full" variant="outline">
                    <Link
                      to={feature.href}
                      onClick={() => handleFeatureClick(feature.title)}
                      aria-describedby={`feature-${feature.title.toLowerCase().replace(/\s+/g, '-')}-desc`}
                    >
                      Explore {feature.title}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
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
              <h3 className="font-semibold mb-2">Screen Reader Support</h3>
              <p className="text-primary-foreground/90 text-sm">
                Full compatibility with all major screen readers
              </p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="font-semibold mb-2">Audio Descriptions</h3>
              <p className="text-primary-foreground/90 text-sm">
                Rich audio content for all visual elements
              </p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="font-semibold mb-2">Haptic Feedback</h3>
              <p className="text-primary-foreground/90 text-sm">
                Device vibrations for enhanced interaction
              </p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="font-semibold mb-2">High Contrast</h3>
              <p className="text-primary-foreground/90 text-sm">
                Toggle mode for enhanced visibility
              </p>
            </div>
          </div>
          <p className="text-lg text-primary-foreground/90">
            Press <kbd className="bg-primary-foreground/20 px-2 py-1 rounded text-sm">Ctrl+Alt+C</kbd>
            {" "}to toggle high contrast mode
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Index;