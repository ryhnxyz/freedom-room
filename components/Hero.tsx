"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";

interface HeroProps {
  onOpenScheduleTour: () => void;
}

const highlights = [
  { value: "3-8 Jam", label: "Transit fleksibel" },
  { value: "24 Jam", label: "Konfirmasi reservasi" },
  { value: "4.9/5", label: "Kepuasan tamu" },
];

export default function Hero({ onOpenScheduleTour }: HeroProps) {
  return (
    <section id="overview" aria-labelledby="hero-title" className="px-4 pb-8 pt-24 sm:px-6 sm:pb-12 sm:pt-28 lg:px-10">
      <div className="relative mx-auto min-h-[680px] max-w-[1440px] overflow-hidden rounded-[32px] bg-primary text-white shadow-[0_30px_90px_rgba(17,17,17,0.18)] sm:min-h-[720px] lg:min-h-[760px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/img/freedom-room/one-bed-102-1.png"
          alt="Interior premium FreedomRoom"
          className="absolute inset-0 h-full w-full object-cover object-center lg:object-[68%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />

        <div className="relative z-10 flex min-h-[680px] flex-col justify-between p-6 sm:min-h-[720px] sm:p-10 lg:min-h-[760px] lg:p-14">
          <div className="flex items-center justify-between gap-4">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-brand backdrop-blur-xl">
              <Icon icon="solar:star-bold" className="h-3.5 w-3.5" />
              Curated stays by FreedomRoom
            </span>
            <span className="hidden items-center gap-2 rounded-full border border-white/15 bg-black/25 px-3 py-2 text-[10px] font-bold text-white/75 backdrop-blur-xl sm:inline-flex">
              <Icon icon="solar:shield-check-bold" className="h-4 w-4 text-brand" />
              Properti terverifikasi
            </span>
          </div>

          <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
            <div className="max-w-3xl">
              <p className="mb-4 text-sm font-bold text-white/55">Apartemen, hotel, dan villa pilihan</p>
              <h1 id="hero-title" className="font-heading text-5xl font-extrabold leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl xl:text-[84px]">
                Stay refined.<br />Feel <span className="text-brand">at home.</span>
              </h1>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/65 sm:text-base">
                Ruang menginap berkarakter untuk transit singkat, perjalanan bisnis, dan akhir pekan yang layak dinikmati lebih lama.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link href="/booking" className="inline-flex min-h-13 items-center justify-center gap-2 rounded-2xl bg-brand px-6 py-3.5 text-sm font-extrabold text-white transition-colors hover:bg-brand-hover">
                  Jelajahi penginapan
                  <Icon icon="solar:arrow-right-up-linear" className="h-5 w-5" />
                </Link>
                <button type="button" onClick={onOpenScheduleTour} className="inline-flex min-h-13 items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-extrabold text-white backdrop-blur-xl transition-colors hover:bg-white/20">
                  <Icon icon="solar:calendar-mark-bold" className="h-5 w-5" />
                  Booking sekarang
                </button>
              </div>
            </div>

            <aside className="rounded-[28px] border border-white/15 bg-black/35 p-5 backdrop-blur-2xl sm:p-6">
              <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-white/45">Featured stay</span>
                  <h2 className="mt-1 font-heading text-xl font-extrabold">One Bed Deluxe</h2>
                  <p className="mt-1 text-xs text-white/55">Sentul Tower · Private unit</p>
                </div>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand text-white">
                  <Icon icon="solar:key-square-bold" className="h-5 w-5" />
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-5">
                {highlights.map((item) => (
                  <div key={item.label} className="rounded-2xl bg-white/10 p-3">
                    <strong className="block font-heading text-sm font-extrabold text-white">{item.value}</strong>
                    <span className="mt-1 block text-[9px] leading-tight text-white/45">{item.label}</span>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
