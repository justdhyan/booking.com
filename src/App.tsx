
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Listings from "./pages/Listings";
import PropertyDetail from "./pages/PropertyDetail";
import LocalGuides from "./pages/LocalGuides";
import TravelJournal from "./pages/TravelJournal";
import PackingListGenerator from "./pages/PackingListGenerator";
import ARPropertyPreview from "./pages/ARPropertyPreview";
import NotFound from "./pages/NotFound";
import MobileBottomNav from "./components/layout/MobileBottomNav";
import BackToTopButton from "./components/ui/back-to-top-button";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/local-guides" element={<LocalGuides />} />
          <Route path="/travel-journal" element={<TravelJournal />} />
          <Route path="/packing-list" element={<PackingListGenerator />} />
          <Route path="/ar-preview" element={<ARPropertyPreview />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <MobileBottomNav />
        <BackToTopButton />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
