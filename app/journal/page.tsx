'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const TourBookingModal = dynamic(() => import('@/components/TourBookingModal'), { ssr: false });

export default function JournalPage() {
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-canvas text-primary relative selection:bg-brand selection:text-white">
      <Navbar onOpenScheduleTour={() => setIsTourModalOpen(true)} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 bg-timber-950 text-white overflow-hidden border-b border-border-subtle">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/freedom-room/project-1.jpg"
            alt="FreedomRoom Journal Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-timber-950 via-timber-950/80 to-canvas" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 space-y-4">
          <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white w-full leading-[1.1]">
            Jurnal & Tips Menginap Sentul
          </h1>
          <p className="text-base sm:text-lg text-sand-200/90 max-w-2xl font-sans leading-relaxed">
            Kumpulan artikel panduan sewa transit, rekomendasi wisata alam Sentul City, dan tips staycation hemat di Sentul Tower.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="border-y border-border-subtle py-16 text-center sm:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">Segera hadir</p>
          <h2 className="mt-3 font-display text-3xl text-primary sm:text-4xl">Belum ada artikel yang diterbitkan.</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-secondary">
            Panduan dan informasi terbaru FreedomRoom sedang kami siapkan.
          </p>
        </div>
      </section>

      <Footer />
      <TourBookingModal isOpen={isTourModalOpen} onClose={() => setIsTourModalOpen(false)} />
    </main>
  );
}
