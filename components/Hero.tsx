"use client";

import Link from "next/link";
import Button from "@/components/Button";
import { Icon } from "@iconify/react";

interface HeroProps {
  onOpenScheduleTour: () => void;
}

export default function Hero({ onOpenScheduleTour }: HeroProps) {
  return (
    <section
      id="overview"
      aria-labelledby="hero-title"
      className="relative w-full min-h-screen bg-canvas flex flex-col justify-between overflow-hidden"
    >
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0 bg-timber-950 overflow-hidden pointer-events-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/img/freedom-room/one-bed-102-1.png"
          alt="FreedomRoom Penginapan"
          className="w-full h-full object-cover object-center scale-[1.03] opacity-60 pointer-events-none select-none"
        />

        {/* Dark Gradient Overlay for Crisp Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-timber-950 via-timber-950/60 to-timber-950/40 z-10" />

        {/* Seamless Canvas Gradient Transition */}
        <div className="absolute -bottom-1 left-0 right-0 h-48 sm:h-64 bg-gradient-to-b from-transparent via-canvas/80 to-canvas z-20 pointer-events-none" />
      </div>

      {/* Hero Central Content */}
      <div className="relative z-30 max-w-4xl mx-auto px-4 sm:px-6 pt-32 sm:pt-44 pb-16 text-center space-y-6">
        <h1
          id="hero-title"
          className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.12] drop-shadow-md"
        >
          Booking Penginapan Apartemen, Hotel & Villa <span className="text-brand">Mudah & Fleksibel</span>
        </h1>

        <p className="text-sm sm:text-lg text-sand-200/90 max-w-2xl mx-auto leading-relaxed font-sans">
          Pilihan lengkap sewa apartemen transit & harian, kamar hotel, hingga villa staycation berfasilitas lengkap dengan harga terjangkau, proses check-in cepat, dan konfirmasi instan 24 jam.
        </p>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto">
          <Link href="/booking" className="w-full sm:w-auto">
            <Button
              variant="primary"
              size="lg"
              className="w-full justify-center shadow-lg"
              icon="solar:home-smile-bold"
            >
              Lihat Pilihan Penginapan
            </Button>
          </Link>

          <Button
            onClick={onOpenScheduleTour}
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto justify-center bg-white/10 hover:bg-white/20 text-white border-white/25"
            icon="solar:calendar-bold"
          >
            Booking Instan
          </Button>
        </div>


      </div>

      {/* Empty bottom bumper for spacing */}
      <div className="h-12 pointer-events-none" />
    </section>
  );
}
