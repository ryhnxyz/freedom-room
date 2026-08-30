"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { HOUSE_MODELS, formatRupiah } from "@/data/houseModels";
import { api, RoomData } from "@/lib/api";
import { Icon } from "@iconify/react";
import Button from "@/components/Button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import dynamic from "next/dynamic";

const TourBookingModal = dynamic(() => import("@/components/TourBookingModal"), { ssr: false });

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function HouseGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [liveRooms, setLiveRooms] = useState<RoomData[]>([]);

  // Booking Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoomName, setSelectedRoomName] = useState<string | undefined>(undefined);
  const [selectedUnitNumber, setSelectedUnitNumber] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function load() {
      try {
        const data = await api.getRooms();
        if (Array.isArray(data) && data.length > 0) {
          setLiveRooms(data);
        }
      } catch {}
    }
    load();
  }, []);

  const openBooking = (name: string, unit: string) => {
    setSelectedRoomName(name);
    setSelectedUnitNumber(unit);
    setIsModalOpen(true);
  };

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const cardTracks = gsap.utils.toArray<HTMLElement>(".house-card-track", containerRef.current);

      cardTracks.forEach((track) => {
        const content = track.querySelector(".house-card-content");
        const bgImage = track.querySelector(".house-card-bg");

        if (content) {
          gsap.fromTo(
            content,
            { y: 0 },
            {
              y: -160,
              ease: "none",
              scrollTrigger: {
                trigger: track,
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
              },
            }
          );
        }

        if (bgImage) {
          gsap.fromTo(
            bgImage,
            { scale: 1 },
            {
              scale: 1.08,
              ease: "none",
              scrollTrigger: {
                trigger: track,
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
              },
            }
          );
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <>
      <section
        id="models"
        ref={containerRef}
        aria-labelledby="collection-title"
        className="relative w-full bg-charcoal-950"
      >
        {/* Intro Header Section */}
        <div className="bg-canvas py-16 sm:py-24 border-b border-border-subtle">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-4 text-center max-w-3xl mx-auto">
            <h2
              id="collection-title"
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-primary"
            >
              Pilihan Penginapan Apartemen, Hotel & Villa
            </h2>
            <p className="text-sm sm:text-base text-secondary leading-relaxed">
              Scroll ke bawah untuk menjelajahi unit Studio, 1 Bedroom, Family Suite / Villa 2 Bedroom, dan Hotel Room berfasilitas lengkap dengan tarif transit & harian bersahabat di FreedomRoom.
            </p>
          </div>
        </div>

        {/* Full-Screen Sticky Cards Stack with Scroll-Driven Parallax */}
        <div className="relative w-full">
          {HOUSE_MODELS.map((model, idx) => {
            const dbRoom = liveRooms.find((r) => r.id === model.databaseId || r.unit_number === model.unitNumber);
            const isAvailable = (dbRoom?.status || model.status) === "Available";
            const rateVal = dbRoom ? (dbRoom.rate_3h || dbRoom.rate_transit_3h || model.rateTransit3h || model.startingPrice) : (model.rateTransit3h || model.startingPrice);
            const displayRate = formatRupiah(rateVal);

            return (
              <div
                key={model.id}
                style={{ zIndex: idx + 10 }}
                className="house-card-track relative h-[140vh] w-full"
              >
                {/* Sticky 100vh Viewport Article */}
                <article className="sticky top-0 w-full h-screen min-h-[660px] flex flex-col justify-end overflow-hidden bg-black text-white selection:bg-white selection:text-black">
                  
                  {/* Background Full Cover Image */}
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={model.featuredImage}
                      alt={model.name}
                      className="house-card-bg w-full h-full object-cover object-center scale-[1.02] transform-gpu will-change-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/25 pointer-events-none" />
                  </div>

                  {/* Inner Content Area */}
                  <div className="house-card-content relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-12 pb-20 sm:pb-24 space-y-4 sm:space-y-6 will-change-transform">
                    
                    {/* Frosted Glass Spec Panel */}
                    <div className="glass-frost rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-white/20 shadow-2xl backdrop-blur-2xl space-y-5 w-full">
                      
                      {/* Top Bar: Model Name & Base Price */}
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-white/15 pb-4">
                        <div>
                          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-sand-300/80 block mb-1">
                            UNIT APARTEMEN #{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                          </span>
                          <h3 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                            {model.name}
                          </h3>
                        </div>

                        <div className="text-left sm:text-right">
                          <span className="text-[10px] font-mono uppercase text-sand-300/80 block">TARIF TRANSIT (3 JAM)</span>
                          <span className="font-heading text-2xl sm:text-3xl font-bold text-brand tracking-tight">
                            {displayRate.includes("Rp") ? displayRate : `Rp ${displayRate}`}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-sand-100/90 font-sans leading-relaxed line-clamp-2 sm:line-clamp-none">
                        {model.tagline}
                      </p>

                      {/* Specs Metrics Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                        
                        {/* Metric: Bedrooms */}
                        <div className="bg-white/10 backdrop-blur-md p-2.5 rounded-xl border border-white/15 flex flex-col gap-1">
                          <span className="text-[10px] font-mono uppercase text-sand-300/80 block">KAPASITAS</span>
                          <span className="font-bold text-white text-xs sm:text-sm flex items-center gap-1.5 font-sans">
                            <Icon icon="solar:bed-bold" className="w-4 h-4 text-brand shrink-0" />
                            <span>{model.beds} Kamar • {model.baths} Mandi</span>
                          </span>
                        </div>

                        {/* Metric: House Area */}
                        <div className="bg-white/10 backdrop-blur-md p-2.5 rounded-xl border border-white/15 flex flex-col gap-1">
                          <span className="text-[10px] font-mono uppercase text-sand-300/80 block">LUAS UNIT</span>
                          <span className="font-bold text-white text-xs sm:text-sm flex items-center gap-1.5 font-sans">
                            <Icon icon="solar:ruler-angular-bold" className="w-4 h-4 text-brand shrink-0" />
                            <span>{model.sqft} m²</span>
                          </span>
                        </div>

                        {/* Metric: Location */}
                        <div className="bg-white/10 backdrop-blur-md p-2.5 rounded-xl border border-white/15 flex flex-col gap-1">
                          <span className="text-[10px] font-mono uppercase text-sand-300/80 block">LOKASI LANTAI</span>
                          <span className="font-bold text-white text-xs sm:text-sm flex items-center gap-1.5 font-sans">
                            <Icon icon="solar:map-point-bold" className="w-4 h-4 text-brand shrink-0" />
                            <span>{model.garage}</span>
                          </span>
                        </div>

                        {/* Metric: Status */}
                        <div className="bg-white/10 backdrop-blur-md p-2.5 rounded-xl border border-white/15 flex flex-col gap-1">
                          <span className="text-[10px] font-mono uppercase text-sand-300/80 block">STATUS LIVE</span>
                          <span className="font-bold text-xs sm:text-sm flex items-center gap-1.5 font-sans">
                            <span className={`w-2 h-2 rounded-full ${isAvailable ? "bg-brand animate-pulse" : "bg-amber-400"}`} />
                            <span className={isAvailable ? "text-brand" : "text-amber-300"}>
                              {isAvailable ? "Siap Huni (Available)" : dbRoom?.status || "Booked"}
                            </span>
                          </span>
                        </div>

                      </div>

                      {/* Actions Row */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                        <Link
                          href={`/room/${model.id}`}
                          className="inline-flex items-center gap-2 text-xs font-semibold text-white hover:text-sand-200 transition-colors py-2"
                        >
                          <span>Lihat Rincian Foto & Fasilitas Kamar</span>
                          <Icon icon="solar:arrow-right-linear" className="w-4 h-4" />
                        </Link>

                        <div className="flex items-center gap-2">
                          <Link href={`/room/${model.id}`}>
                            <Button
                              variant="secondary"
                              size="md"
                              icon="solar:eye-bold"
                            >
                              Detail
                            </Button>
                          </Link>

                          <Button
                            onClick={() => openBooking(model.name, model.unitNumber)}
                            variant="primary"
                            size="md"
                            icon="solar:calendar-bold"
                          >
                            Booking Kamar
                          </Button>
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

      {/* Booking Modal */}
      <TourBookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialModelName={selectedRoomName}
        initialPlotNumber={selectedUnitNumber}
      />
    </>
  );
}
