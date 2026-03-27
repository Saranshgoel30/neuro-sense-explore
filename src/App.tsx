import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AccessibilityProvider } from "@/components/AccessibilityProvider";
import Index from "./pages/Index";
import Lessons from "./pages/Lessons";
import Maps from "./pages/Maps";
import Tactile from "./pages/Tactile";
import Library from "./pages/Library";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import BrainModel from "./pages/BrainModel";
import PodcastScripts from "./pages/PodcastScripts";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AccessibilityProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/maps" element={<Maps />} />
            <Route path="/tactile" element={<Tactile />} />
            <Route path="/models/brain" element={<BrainModel />} />
            <Route path="/podcast-scripts" element={<PodcastScripts />} />
            <Route path="/library" element={<Library />} />
            <Route path="/about" element={<About />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AccessibilityProvider>
  </QueryClientProvider>
);

export default App;
