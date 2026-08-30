"use client";

import { Icon } from "@iconify/react";

const APP_URL = "https://app.freedomroom.id";

export default function Hero() {
  return (
    <section id="overview" aria-labelledby="hero-title" className="w-full pt-[72px]">
      <div className="relative min-h-[calc(100svh-72px)] w-full overflow-hidden bg-primary text-white sm:min-h-[720px] lg:min-h-[760px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/img/freedom-room/one-bed-102-1.png"
          alt="Interior premium FreedomRoom"
          className="absolute inset-0 h-full w-full object-cover object-[62%_center] sm:object-center lg:object-[68%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />

        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-72px)] max-w-[1440px] flex-col justify-between px-5 py-7 sm:min-h-[720px] sm:px-8 sm:py-10 lg:min-h-[760px] lg:px-10 lg:py-14">
          <div className="flex items-center justify-between gap-4">
            <span className="eyebrow inline-flex w-fit items-center gap-2 border-l border-brand pl-3 text-brand">
              Curated residences · Indonesia
            </span>
            <span className="hidden items-center gap-2 rounded-full border border-white/15 bg-black/25 px-3 py-2 text-[10px] font-bold text-white/75 backdrop-blur-xl sm:inline-flex">
              <Icon icon="solar:shield-check-bold" className="h-4 w-4 text-brand" />
              Properti terverifikasi
            </span>
          </div>

          <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="max-w-3xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-white/55">Apartemen, hotel, dan villa pilihan</p>
              <h1 id="hero-title" className="font-display text-[3.3rem] leading-[0.94] tracking-[-0.045em] text-white sm:text-7xl lg:text-8xl xl:text-[96px]">
                A refined stay,<br /><em className="font-normal text-brand">distinctly yours.</em>
              </h1>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/65 sm:text-base">
                Ruang menginap berkarakter untuk transit singkat, perjalanan bisnis, dan akhir pekan yang layak dinikmati lebih lama.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-13 items-center justify-center gap-3 bg-brand px-6 py-3.5 text-xs font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-brand-hover">
                  Explore collection
                  <Icon icon="solar:arrow-right-up-linear" className="h-5 w-5" />
                </a>
                <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-13 items-center justify-center gap-3 border border-white/35 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-white hover:text-primary">
                  Reserve a stay
                </a>
              </div>
            </div>

            <aside className="border-l border-white/25 bg-black/20 p-5 backdrop-blur-xl sm:p-6">
              <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-white/45">Featured stay</span>
                  <h2 className="mt-2 font-display text-3xl">One Bed Deluxe</h2>
                  <p className="mt-1 text-xs uppercase tracking-[0.12em] text-white/55">Sentul Tower · Private residence</p>
                </div>
                <span className="font-display text-2xl italic text-brand">01</span>
              </div>
              <div className="flex items-center justify-between gap-4 pt-5 text-xs text-white/65">
                <span>Flexible stay · 3-24 hours</span>
                <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="font-bold text-brand hover:text-white">View residence</a>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
