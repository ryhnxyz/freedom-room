"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HOUSE_MODELS, formatRupiah } from "@/data/houseModels";
import { api, RoomData } from "@/lib/api";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HouseGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [liveRooms, setLiveRooms] = useState<RoomData[]>([]);

  // Fetch real-time status from VPS database
  useEffect(() => {
    async function loadLiveRooms() {
      try {
        const rooms = await api.getRooms();
        if (Array.isArray(rooms)) setLiveRooms(rooms);
      } catch {
        // Fallback gracefully
      }
    }
    loadLiveRooms();
  }, []);

  useEffect(() => {
    // Only run desktop sticky parallax on large screens
    if (window.innerWidth < 1024) return;

    const ctx = gsap.context(() => {
      const tracks = gsap.utils.toArray<HTMLElement>(".house-card-track");

      tracks.forEach((track) => {
        const article = track.querySelector("article");
        const bgImg = track.querySelector(".house-card-bg");
        const content = track.querySelector(".house-card-content");

        if (article) {
          ScrollTrigger.create({
            trigger: track,
            start: "top top",
            end: "bottom top",
            pin: article,
            pinSpacing: false,
          });
        }

        if (bgImg) {
          gsap.fromTo(
            bgImg,
            { scale: 1.05, y: -20 },
            {
              scale: 1,
              y: 20,
              ease: "none",
              scrollTrigger: {
                trigger: track,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }

        if (content) {
          gsap.fromTo(
            content,
            { opacity: 0.85, y: 30 },
            {
              opacity: 1,
              y: 0,
              ease: "power2.out",
              scrollTrigger: {
                trigger: track,
                start: "top 60%",
                end: "top 20%",
                scrub: 0.5,
              },
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={containerRef}
        id="models"
        aria-labelledby="models-section-title"
        className="relative w-full bg-canvas py-8 sm:py-12"
      >
        {/* Section Header */}
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-6 px-4 pb-8 sm:px-6 sm:pb-10 md:flex-row md:items-end lg:px-10">
          <div className="space-y-3 max-w-2xl">
            <span className="block text-[10px] font-extrabold uppercase tracking-[0.18em] text-muted">
              KATALOG RESMI PENGINAPAN
            </span>
            <h2
              id="models-section-title"
              className="font-display text-4xl leading-[1.02] tracking-tight text-primary sm:text-5xl lg:text-6xl"
            >
              Pilihan Kamar Transit & Harian Eksklusif.
            </h2>
            <p className="text-xs sm:text-sm text-secondary leading-relaxed">
              Setiap unit apartemen dilengkapi tempat tidur premium, Smart TV dengan streaming Netflix/YouTube, AC dingin terawat, WiFi kencang, dan kamar mandi water heater.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://app.freedomroom.id"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#b39229] bg-[#b39229] px-3.5 py-2.5 text-xs font-semibold tracking-wide text-white shadow-sm transition-all duration-150 ease-out hover:border-[#967a21] hover:bg-[#967a21] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#E8DCB8]/60 active:scale-[0.985] sm:text-sm"
            >
              <Icon icon="solar:grid-bold" className="h-4.5 w-4.5 shrink-0" />
              <span>Lihat Semua Unit Kamar</span>
            </a>
          </div>
        </div>

        {/* Room Cards Stack (Fluid on Mobile, Parallax on Desktop) */}
        <div className="relative mx-auto w-full max-w-[1440px] space-y-6 px-4 pb-4 sm:px-6 lg:space-y-8 lg:px-10">
          {HOUSE_MODELS.slice(0, 3).map((model, idx) => {
            const dbRoom = liveRooms.find((r) => r.id === model.databaseId || r.unit_number === model.unitNumber);
            const isAvailable = (dbRoom?.status || model.status) === "Available";
            const rateVal = dbRoom ? (dbRoom.rate_3h || dbRoom.rate_transit_3h || model.rateTransit3h || model.startingPrice) : (model.rateTransit3h || model.startingPrice);
            const displayRate = formatRupiah(rateVal);

            return (
              <div
                key={model.id}
                style={{ zIndex: idx + 10 }}
                className="house-card-track relative w-full lg:h-[120vh]"
              >
                {/* Responsive Viewport Article */}
                <article className="relative flex min-h-[540px] w-full flex-col justify-end overflow-hidden rounded-[32px] bg-black text-white shadow-xl selection:bg-white selection:text-black sm:min-h-[600px] lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)] lg:min-h-[660px]">
                  
                  {/* Background Full Cover Image */}
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={model.featuredImage}
                      alt={model.name}
                      className="house-card-bg w-full h-full object-cover object-center scale-[1.02] transform-gpu will-change-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/30 pointer-events-none" />
                  </div>

                  {/* Inner Content Area */}
                  <div className="house-card-content relative z-10 mx-auto w-full space-y-4 p-4 will-change-transform sm:p-6 lg:p-8">
                    
                    {/* Frosted Glass Spec Panel */}
                    <div className="glass-frost w-full space-y-4 rounded-[28px] border border-white/15 p-5 shadow-2xl backdrop-blur-2xl sm:p-7">
                      
                      {/* Top Bar: Model Name & Base Price */}
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-white/15 pb-3 sm:pb-4">
                        <div>
                          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-sand-300/80 block mb-1">
                            UNIT APARTEMEN #{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                          </span>
                          <h3 className="font-display text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
                            {model.name}
                          </h3>
                        </div>

                        <div className="text-left sm:text-right">
                          <span className="text-[10px] font-mono uppercase text-sand-300/80 block">TARIF TRANSIT (3 JAM)</span>
                          <span className="font-heading text-xl sm:text-3xl font-bold text-brand tracking-tight">
                            {displayRate.includes("Rp") ? displayRate : `Rp ${displayRate}`}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-sand-100/90 font-sans leading-relaxed line-clamp-2">
                        {model.tagline}
                      </p>

                      {/* Specs Metrics Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                        
                        {/* Metric: Bedrooms */}
                        <div className="bg-white/10 backdrop-blur-md p-2.5 rounded-xl border border-white/15 flex flex-col gap-0.5">
                          <span className="text-[9px] sm:text-[10px] font-mono uppercase text-sand-300/80 block">KAPASITAS</span>
                          <span className="font-bold text-white text-xs sm:text-sm flex items-center gap-1.5 font-sans truncate">
                            <Icon icon="solar:bed-bold" className="w-4 h-4 text-brand shrink-0" />
                            <span className="truncate">{model.beds} Kamar • {model.baths} Mandi</span>
                          </span>
                        </div>

                        {/* Metric: House Area */}
                        <div className="bg-white/10 backdrop-blur-md p-2.5 rounded-xl border border-white/15 flex flex-col gap-0.5">
                          <span className="text-[9px] sm:text-[10px] font-mono uppercase text-sand-300/80 block">LUAS UNIT</span>
                          <span className="font-bold text-white text-xs sm:text-sm flex items-center gap-1.5 font-sans">
                            <Icon icon="solar:ruler-angular-bold" className="w-4 h-4 text-brand shrink-0" />
                            <span>{model.sqft} m²</span>
                          </span>
                        </div>

                        {/* Metric: Location */}
                        <div className="bg-white/10 backdrop-blur-md p-2.5 rounded-xl border border-white/15 flex flex-col gap-0.5">
                          <span className="text-[9px] sm:text-[10px] font-mono uppercase text-sand-300/80 block">LOKASI LANTAI</span>
                          <span className="font-bold text-white text-xs sm:text-sm flex items-center gap-1.5 font-sans truncate">
                            <Icon icon="solar:map-point-bold" className="w-4 h-4 text-brand shrink-0" />
                            <span className="truncate">{model.garage}</span>
                          </span>
                        </div>

                        {/* Metric: Status */}
                        <div className="bg-white/10 backdrop-blur-md p-2.5 rounded-xl border border-white/15 flex flex-col gap-0.5">
                          <span className="text-[9px] sm:text-[10px] font-mono uppercase text-sand-300/80 block">STATUS LIVE</span>
                          <span className="font-bold text-xs sm:text-sm flex items-center gap-1.5 font-sans">
                            <Icon icon="solar:check-circle-bold" className={`w-3.5 h-3.5 ${isAvailable ? "text-brand" : "text-amber-400"}`} />
                            <span className={isAvailable ? "text-brand" : "text-amber-300"}>
                              {isAvailable ? "Siap Huni" : dbRoom?.status || "Booked"}
                            </span>
                          </span>
                        </div>

                      </div>

                      {/* Actions Row */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                         <a
                           href="https://app.freedomroom.id"
                           target="_blank"
                           rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs font-semibold text-white hover:text-sand-200 transition-colors py-1"
                        >
                          <span>Lihat Rincian Foto & Fasilitas Kamar</span>
                          <Icon icon="solar:arrow-right-linear" className="w-4 h-4" />
                         </a>

                        <div className="flex items-center gap-2 w-full sm:w-auto">
                           <a href="https://app.freedomroom.id" target="_blank" rel="noopener noreferrer" className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-surface px-3.5 py-2.5 text-sm font-semibold tracking-wide text-primary transition-colors hover:bg-sand-200 sm:flex-initial">
                             <Icon icon="solar:eye-bold" className="h-4.5 w-4.5" />
                             <span>Detail</span>
                           </a>

                          <a href="https://app.freedomroom.id" target="_blank" rel="noopener noreferrer" className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-brand px-3.5 py-2.5 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-brand-hover sm:flex-initial">
                            <Icon icon="solar:calendar-bold" className="h-4.5 w-4.5" />
                            <span>Booking Kamar</span>
                          </a>
                        </div>
                      </div>

                    </div>

                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </section>

    </>
  );
}
