"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CommunityOverview from "@/components/CommunityOverview";
import Masterplan from "@/components/Masterplan";
import HouseGrid from "@/components/HouseGrid";
import Neighborhood from "@/components/Neighborhood";
import FaqSection from "@/components/FaqSection";
import TourSection from "@/components/TourSection";
import TourBookingModal from "@/components/TourBookingModal";
import Footer from "@/components/Footer";

export default function Home() {
  // Modal State for Schedule Tour
  const [isScheduleTourOpen, setIsScheduleTourOpen] = useState(false);
  const [tourInitialModel, setTourInitialModel] = useState<string | undefined>(undefined);
  const [tourInitialPlot, setTourInitialPlot] = useState<string | undefined>(undefined);

  // Handlers
  const handleOpenScheduleTour = (modelName?: string) => {
    setTourInitialModel(modelName);
    setTourInitialPlot(undefined);
    setIsScheduleTourOpen(true);
  };

  const handleOpenTourForPlot = (plotNumber: string) => {
    setTourInitialPlot(plotNumber);
    setTourInitialModel(undefined);
    setIsScheduleTourOpen(true);
  };

  return (
    <main className="min-h-screen bg-canvas text-primary relative selection:bg-brand selection:text-white">
      {/* Navigation Header */}
      <Navbar onOpenScheduleTour={() => handleOpenScheduleTour()} />

      {/* Hero Section */}
      <Hero onOpenScheduleTour={() => handleOpenScheduleTour()} />

      {/* Community Overview & Vision (Bento Grid Layout) */}
      <CommunityOverview />

      {/* Interactive Realmap & Floorplan */}
      <Masterplan onOpenTourForPlot={handleOpenTourForPlot} />

      {/* House Models Sticky Stacking Cards */}
      <HouseGrid />

      {/* Neighborhood & Location */}
      <Neighborhood />

      {/* Frequently Asked Questions Section */}
      <FaqSection />

      {/* Inline Tour Section */}
      <TourSection onOpenScheduleTour={() => handleOpenScheduleTour()} />

      {/* Footer */}
      <Footer />

      {/* Booking Drawer Modal */}
      <TourBookingModal
        isOpen={isScheduleTourOpen}
        onClose={() => setIsScheduleTourOpen(false)}
        initialModelName={tourInitialModel}
        initialPlotNumber={tourInitialPlot}
      />
    </main>
  );
}
