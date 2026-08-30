'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Neighborhood from '@/components/Neighborhood';

const TourBookingModal = dynamic(() => import('@/components/TourBookingModal'), { ssr: false });

export default function LocationPage() {
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-canvas text-primary relative selection:bg-brand selection:text-white">
      <Navbar theme="light" onOpenScheduleTour={() => setIsTourModalOpen(true)} />

      <div className="pt-28 pb-12 bg-surface border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-3">
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-primary">
            Lokasi Strategis Properti Apartemen, Hotel & Villa
          </h1>
          <p className="text-secondary text-sm sm:text-base max-w-2xl">
            Ruko STA Shopping Arcade A7, Citaringgul, Kec. Babakan Madang, Kabupaten Bogor, Jawa Barat 16810 • Akses kilat 3 Menit dari Pintu Tol Sentul Selatan (Tol Jagorawi) dan 800 meter dari AEON Mall Sentul City.
          </p>
        </div>
      </div>

      <Neighborhood />

      <Footer />
      <TourBookingModal
        isOpen={isTourModalOpen}
        onClose={() => setIsTourModalOpen(false)}
      />
    </main>
  );
}
