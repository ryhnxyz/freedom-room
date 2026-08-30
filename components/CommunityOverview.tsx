"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";

export default function CommunityOverview() {
  return (
    <section id="overview-bento" className="bg-canvas py-12 sm:py-16">
      <div className="mx-auto max-w-[1440px] space-y-8 px-4 sm:px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <span className="block text-[10px] font-extrabold uppercase tracking-[0.18em] text-muted">The FreedomRoom standard</span>
            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-primary sm:text-4xl lg:text-5xl">
              Kenyamanan, privasi, dan kebersihan prima.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-secondary sm:text-base">
            Menghadirkan pengalaman menginap transit, harian, staycation villa, dan kamar hotel berstandar modern dengan fasilitas lengkap serta konfirmasi instan.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-12">
          
          {/* Bento Card 1: Tall Dark Card */}
          <div className="relative flex min-h-[480px] flex-col justify-between overflow-hidden rounded-[32px] bg-primary p-6 text-white shadow-sm sm:min-h-[520px] sm:p-7 lg:col-span-4">
            
            <div className="space-y-3 relative z-10 max-w-sm">
              <span className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-brand">Flexible living</span>
              <h3 className="font-heading text-xl font-extrabold leading-tight sm:text-2xl">
                Pilihan Durasi Sewa Fleksibel Sesuai Kebutuhan
              </h3>
              <p className="text-xs text-sand-100 leading-relaxed">
                Tersedia paket transit 3 Jam, 6 Jam, 8 Jam, hingga sewa Full Day dan Bulanan dengan proses check-in mudah, cepat, dan tanpa ribet.
              </p>
            </div>

            <div className="relative z-10 space-y-2.5 pt-6">
              <div className="flex items-center gap-2 rounded-2xl bg-white/10 p-3 text-xs text-white backdrop-blur-md">
                <Icon icon="solar:clock-circle-bold" className="h-4 w-4 text-brand shrink-0" />
                <span>Transit 3 Jam: Mulai Rp 150.000</span>
              </div>
              <div className="flex items-center gap-2 rounded-2xl bg-white/10 p-3 text-xs text-white backdrop-blur-md">
                <Icon icon="solar:bed-bold" className="h-4 w-4 text-brand shrink-0" />
                <span>Sewa Harian: Mulai Rp 250.000 / Malam</span>
              </div>
            </div>

            {/* Bottom Room Image */}
            <div className="absolute bottom-0 left-0 right-0 w-full flex items-end pointer-events-none z-0 opacity-40">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/img/freedom-room/one-bed-102-1.png"
                alt="FreedomRoom Unit"
                className="w-full h-auto object-cover object-bottom"
              />
            </div>

          </div>

          {/* Right Bento Container (8 cols) */}
          <div className="lg:col-span-8 flex flex-col justify-between gap-4 h-full">
            
            {/* Top Row: Wide Card */}
            <div className="flex shrink-0 flex-col items-start justify-between gap-4 rounded-[28px] border border-black/5 bg-brand-light p-6 shadow-sm md:flex-row">
              <div className="space-y-2 max-w-lg">
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-primary">
                  Lokasi Strategis & Akses Transportasi Mudah
                </h3>
                <p className="text-xs text-secondary leading-relaxed font-sans">
                  Unit apartemen berlokasi di area prima dengan akses cepat ke jalan tol utama, pusat perbelanjaan (mall), kuliner, dan sarana rekreasi.
                </p>
              </div>
               <div className="w-full shrink-0 rounded-2xl bg-primary p-4 text-center text-white sm:w-auto sm:min-w-[150px]">
                 <span className="block font-heading text-xl font-extrabold text-brand">Akses Kilat</span>
                <span className="text-[10px] text-sand-200 tracking-wider uppercase font-semibold">Ke Pintu Tol & Mall</span>
              </div>
            </div>

            {/* Bottom Row: 2 Equal Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
              
              {/* Card 2: Rating & Ulasan */}
              <div className="app-panel flex h-full flex-col items-center justify-between space-y-4 p-6 text-center">
                <div className="space-y-1.5 pt-2">
                  <span className="text-xs font-semibold text-secondary uppercase tracking-wider block">
                    Standar Kualitas & Kenyamanan
                  </span>
                  <div className="flex items-center justify-center gap-1 text-amber-500 text-xl font-bold font-heading">
                    <span>★ 4.9 / 5.0</span>
                  </div>
                  <p className="text-xs text-muted max-w-xs leading-relaxed">
                    Kepuasan tamu dengan kebersihan unit, kecepatan check-in mandiri, dan kenyamanan fasilitas FreedomRoom.
                  </p>
                </div>
                <div className="w-full rounded-2xl bg-canvas p-3 text-[11px] font-bold text-primary">
                  100% Linen Steril & AC Dingin Terawat
                </div>
              </div>

              {/* Card 3: Fasilitas Lengkap */}
              <div className="app-panel flex h-full flex-col items-center justify-between space-y-4 p-6 text-center">
                <div className="space-y-1.5 pt-2">
                  <span className="text-xs font-semibold text-secondary uppercase tracking-wider block">
                    Fasilitas Kamar & Gedung Lengkap
                  </span>
                  <h4 className="font-heading text-lg font-bold text-primary">
                    Kolam Renang, Smart TV & WiFi
                  </h4>
                  <p className="text-xs text-muted max-w-xs leading-relaxed">
                    Setiap unit dilengkapi Smart TV dengan streaming Netflix/YouTube, WiFi kencang, water heater, serta akses fasilitas gedung.
                  </p>
                </div>
                <div className="w-full rounded-2xl bg-canvas p-3 text-[11px] font-bold text-primary">
                  Kartu Akses Lift & Keamanan 24 Jam
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
