"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CommunityOverview from "@/components/CommunityOverview";
import Masterplan from "@/components/Masterplan";
import HouseGrid from "@/components/HouseGrid";
import Neighborhood from "@/components/Neighborhood";
import FaqSection from "@/components/FaqSection";
import TourSection from "@/components/TourSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-canvas text-primary relative selection:bg-brand selection:text-white">
      {/* Navigation Header */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Community Overview & Vision (Bento Grid Layout) */}
      <CommunityOverview />

      {/* Interactive Realmap & Floorplan */}
      <Masterplan />

      {/* House Models Sticky Stacking Cards */}
      <HouseGrid />

      {/* Neighborhood & Location */}
      <Neighborhood />

      {/* Frequently Asked Questions Section */}
      <FaqSection />

      {/* Inline Tour Section */}
      <TourSection />

      {/* Footer */}
      <Footer />

    </main>
  );
}
