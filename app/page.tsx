'use client';

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CommunityOverview from "@/components/CommunityOverview";
import HouseGrid from "@/components/HouseGrid";
import Neighborhood from "@/components/Neighborhood";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";

// Lazy load below-the-fold and modal components to reduce initial main-thread blocking time
const Masterplan = dynamic(() => import("@/components/Masterplan"), { ssr: true });
const FaqSection = dynamic(() => import("@/components/FaqSection"), { ssr: true });
const TourSection = dynamic(() => import("@/components/TourSection"), { ssr: true });
const TourBookingModal = dynamic(() => import("@/components/TourBookingModal"), { ssr: false });

export default function Home() {
  // Modal State for Schedule Tour
  const [isScheduleTourOpen, setIsScheduleTourOpen] = useState(false);
  const [tourInitialModel, setTourInitialModel] = useState<string | undefined>(
    undefined,
  );
  const [tourInitialPlot, setTourInitialPlot] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    const asciiFlame = `
                   ▄▄████▄
                 ▄█████████
                █████▀  ▀███
               ████▀      ███       ▄▄
              ████        ███     ▄███
             ████    ▄▄▄   ███   █████
            ████   ▄█████▄  ███ ██████
           ████   █████████  █████████
          ████   ████   ████  ████████
          ████   ████   ████  ███████
          ████   ████   ████  ██████
           ████   ▀███████▀  ██████
            ████▄    ▀▀▀   ▄██████
              ██████▄▄▄▄▄███████▀
                ▀▀██████████▀▀`;

    console.log(
      `%c${asciiFlame}\n\nPurchase this template on https://ui8.net/users/onfire-studio\n\nDesigned by Alifia Hamzah\nhttps://hamzah.design`,
      "font-family: monospace; font-weight: bold; color: #FE3B02;",
    );
  }, []);

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

      {/* Interactive Masterplan Map */}
      <Masterplan onOpenTourForPlot={handleOpenTourForPlot} />

      {/* House Models Sticky Stacking Cards (100vh Full-Screen) */}
      <HouseGrid />

      {/* Neighborhood & Location (Magazine Editorial Layout) */}
      <Neighborhood />

      {/* Latest Architectural Journal & Blogs Section */}
      <BlogSection />

      {/* Frequently Asked Questions Section */}
      <FaqSection />

      {/* Inline Tour Section */}
      <TourSection onOpenScheduleTour={() => handleOpenScheduleTour()} />

      {/* Footer */}
      <Footer />

      {/* Schedule Tour Booking Drawer Modal */}
      <TourBookingModal
        isOpen={isScheduleTourOpen}
        onClose={() => setIsScheduleTourOpen(false)}
        initialModelName={tourInitialModel}
        initialPlotNumber={tourInitialPlot}
      />
    </main>
  );
}
