'use client';

import Image from 'next/image';
import { Icon } from '@iconify/react';

interface TourSectionProps {
  onOpenScheduleTour: () => void;
}

export default function TourSection({ onOpenScheduleTour }: TourSectionProps) {
  return (
    <section id="tour" aria-labelledby="tour-section-title" className="py-20 sm:py-28 bg-canvas border-t border-border-subtle relative overflow-hidden">
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-timber-100/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Luxury Consultation Spread */}
        <div className="bg-surface rounded-2xl border border-border-subtle overflow-hidden shadow-xl grid lg:grid-cols-12 items-stretch">
          
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
            <div className="absolute bottom-6 sm:bottom-8 left-5 sm:left-8 right-5 sm:right-8 glass-frost rounded-2xl p-5 text-white border border-white/20 backdrop-blur-xl space-y-1.5">
              <span className="px-2.5 py-0.5 text-[10px] font-mono tracking-widest text-brand uppercase bg-black/90/60 rounded-full border border-brand/30 inline-block mb-1">
                Layanan 24 Jam
              </span>
              <h4 className="font-heading text-xl sm:text-2xl font-bold">
                FreedomRoom Apartment
              </h4>
              <p className="text-xs text-gray-200">
                Pilihan Unit Studio, 1BR & 2BR · Fasilitas Lengkap & Nyaman
              </p>
            </div>
          </div>

          {/* Right Column: Reservation Desk */}
          <div className="lg:col-span-6 p-6 sm:p-12 lg:p-14 flex flex-col justify-between space-y-6 sm:space-y-8 bg-surface">
            
            <div className="space-y-5 sm:space-y-6">
              <div className="space-y-3">
                <h2 id="tour-section-title" className="font-heading text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-primary leading-[1.15]">
                  Pesan Kamar & Nikmati Pengalaman Menginap Terbaik.
                </h2>
                <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                  Pilih durasi sewa transit (3 Jam, 6 Jam, 8 Jam) atau sewa harian. Customer service kami siap membantu pemesanan kamar dan check-in fleksibel 24 jam.
                </p>
              </div>

              {/* Consultation Features Checklist */}
              <div className="space-y-3 pt-1 text-xs sm:text-sm text-primary font-medium">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand-light text-brand flex items-center justify-center shrink-0">
                    <Icon icon="solar:check-circle-bold" className="w-4 h-4" />
                  </div>
                  <span>Proses reservasi instan & konfirmasi cepat via WhatsApp</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand-light text-brand flex items-center justify-center shrink-0">
                    <Icon icon="solar:check-circle-bold" className="w-4 h-4" />
                  </div>
                  <span>Check-in mandiri dengan kartu akses lift & kunci kamar aman</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand-light text-brand flex items-center justify-center shrink-0">
                    <Icon icon="solar:check-circle-bold" className="w-4 h-4" />
                  </div>
                  <span>100% Kamar Bersih Steril, Handuk Bersih & AC Dingin</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4 border-t border-border-subtle flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                type="button"
                onClick={onOpenScheduleTour}
                className="w-full sm:w-auto rounded-full bg-brand hover:bg-brand-hover text-white py-3.5 px-8 text-xs font-semibold uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 group"
              >
                <span>Booking Kamar Sekarang</span>
                <Icon icon="solar:calendar-bold" className="w-4 h-4" />
              </button>

              <span className="text-xs text-secondary text-center sm:text-left">
                WhatsApp CS: <strong className="text-primary font-mono">+62 878 7890 6899</strong>
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
