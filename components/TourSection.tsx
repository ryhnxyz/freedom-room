'use client';

import Image from 'next/image';
import { Icon } from '@iconify/react';

export default function TourSection() {
  return (
    <section id="tour" aria-labelledby="tour-section-title" className="relative overflow-hidden bg-canvas py-12 sm:py-16">
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-timber-100/30 blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        
        {/* Luxury Consultation Spread */}
        <div className="grid items-stretch overflow-hidden rounded-[28px] bg-primary shadow-xl sm:rounded-[32px] lg:grid-cols-12">
          
          {/* Left Column: Image (6 cols) */}
          <div className="lg:col-span-6 relative min-h-[340px] sm:min-h-[420px] lg:min-h-[580px] bg-charcoal-950">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/freedom-room/one-bed-102-1.png"
              alt="FreedomRoom Sentul Tower"
              className="w-full h-full object-cover object-center"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            
            {/* Frosted Glass Overlay Card */}
            <div className="absolute bottom-5 left-5 right-5 space-y-1.5 border-l border-brand bg-black/35 p-5 text-white backdrop-blur-xl sm:bottom-8 sm:left-8 sm:right-8">
              <span className="px-2.5 py-0.5 text-[10px] font-mono tracking-widest text-brand uppercase bg-black/90/60 rounded-full border border-brand/30 inline-block mb-1">
                Layanan 24 Jam
              </span>
              <h4 className="font-display text-3xl sm:text-4xl">
                FreedomRoom Apartment
              </h4>
              <p className="text-xs text-gray-200">
                Pilihan Unit Studio, 1BR & 2BR · Fasilitas Lengkap & Nyaman
              </p>
            </div>
          </div>

          {/* Right Column: Reservation Desk */}
          <div className="flex flex-col justify-between space-y-7 bg-primary p-6 text-white sm:p-12 lg:col-span-6 lg:p-14">
            
            <div className="space-y-5 sm:space-y-6">
              <div className="space-y-3">
                <span className="eyebrow block text-brand">Private reservation</span>
                <h2 id="tour-section-title" className="font-display text-4xl leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Pesan Kamar & Nikmati Pengalaman Menginap Terbaik.
                </h2>
                <p className="text-sm leading-relaxed text-white/60">
                  Pilih durasi sewa transit (3 Jam, 6 Jam, 8 Jam) atau sewa harian. Customer service kami siap membantu pemesanan kamar dan check-in fleksibel 24 jam.
                </p>
              </div>

              {/* Consultation Features Checklist */}
              <div className="space-y-4 pt-1 text-xs font-medium text-white/75 sm:text-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center text-brand">
                    <Icon icon="solar:check-circle-bold" className="w-4 h-4" />
                  </div>
                  <span>Proses reservasi instan & konfirmasi cepat via WhatsApp</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center text-brand">
                    <Icon icon="solar:check-circle-bold" className="w-4 h-4" />
                  </div>
                  <span>Check-in mandiri dengan kartu akses lift & kunci kamar aman</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center text-brand">
                    <Icon icon="solar:check-circle-bold" className="w-4 h-4" />
                  </div>
                  <span>100% Kamar Bersih Steril, Handuk Bersih & AC Dingin</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex flex-col items-stretch gap-4 border-t border-white/15 pt-5 sm:flex-row sm:items-center">
              <a
                href="https://app.freedomroom.id"
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-13 w-full cursor-pointer items-center justify-center gap-2 bg-brand px-8 py-3.5 text-xs font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-brand-hover sm:w-auto"
              >
                <span>Booking Kamar Sekarang</span>
                <Icon icon="solar:calendar-bold" className="w-4 h-4" />
              </a>

              <span className="text-center text-xs text-white/50 sm:text-left">
                WhatsApp concierge: <strong className="font-semibold text-white">+62 878 7890 6899</strong>
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
