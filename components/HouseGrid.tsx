"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HOUSE_MODELS, formatRupiah } from "@/data/houseModels";
import { api, RoomData } from "@/lib/api";
import TourBookingModal from "@/components/TourBookingModal";
import Button from "@/components/Button";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HouseGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoomName, setSelectedRoomName] = useState<string | undefined>(undefined);
  const [selectedUnitNumber, setSelectedUnitNumber] = useState<string | undefined>(undefined);
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

  const openBooking = (name: string, unit: string) => {
    setSelectedRoomName(name);
    setSelectedUnitNumber(unit);
    setIsModalOpen(true);
  };

  return (
    <>
      <section
        ref={containerRef}
        id="models"
        aria-labelledby="models-section-title"
        className="relative w-full bg-canvas border-b border-border-subtle"
      >
        {/* Section Header */}
        <div className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-mono font-bold tracking-widest text-brand uppercase block">
              KATALOG RESMI PENGINAPAN
            </span>
            <h2
              id="models-section-title"
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-primary leading-[1.15]"
            >
              Pilihan Kamar Transit & Harian Eksklusif.
            </h2>
            <p className="text-xs sm:text-sm text-secondary leading-relaxed">
              Setiap unit apartemen dilengkapi tempat tidur premium, Smart TV dengan streaming Netflix/YouTube, AC dingin terawat, WiFi kencang, dan kamar mandi water heater.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link href="/booking">
              <Button variant="primary" size="md" icon="solar:grid-bold">
                Lihat Semua 9 Unit Kamar
              </Button>
            </Link>
          </div>
        </div>

        {/* Room Cards Stack (Fluid on Mobile, Parallax on Desktop) */}
        <div className="relative w-full px-4 sm:px-6 lg:px-0 max-w-7xl lg:max-w-none mx-auto pb-12 lg:pb-0 space-y-8 lg:space-y-0">
          {HOUSE_MODELS.map((model, idx) => {
            const dbRoom = liveRooms.find((r) => r.id === model.databaseId || r.unit_number === model.unitNumber);
            const isAvailable = (dbRoom?.status || model.status) === "Available";
            const rateVal = dbRoom ? (dbRoom.rate_3h || dbRoom.rate_transit_3h || model.rateTransit3h || model.startingPrice) : (model.rateTransit3h || model.startingPrice);
            const displayRate = formatRupiah(rateVal);

            return (
              <div
                key={model.id}
                style={{ zIndex: idx + 10 }}
                className="house-card-track relative lg:h-[140vh] w-full"
              >
                {/* Responsive Viewport Article */}
                <article className="lg:sticky lg:top-0 w-full min-h-[540px] sm:min-h-[600px] lg:h-screen lg:min-h-[660px] flex flex-col justify-end overflow-hidden bg-black text-white rounded-3xl lg:rounded-none selection:bg-white selection:text-black shadow-xl lg:shadow-none relative">
                  
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
                  <div className="house-card-content relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-12 py-6 sm:py-10 lg:pb-24 space-y-4 will-change-transform">
                    
                    {/* Frosted Glass Spec Panel */}
                    <div className="glass-frost rounded-2xl sm:rounded-3xl p-4 sm:p-7 border border-white/20 shadow-2xl backdrop-blur-2xl space-y-4 w-full">
                      
                      {/* Top Bar: Model Name & Base Price */}
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-white/15 pb-3 sm:pb-4">
                        <div>
                          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-sand-300/80 block mb-1">
                            UNIT APARTEMEN #{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                          </span>
                          <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
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
                        <Link
                          href={`/room/${model.id}`}
                          className="inline-flex items-center gap-2 text-xs font-semibold text-white hover:text-sand-200 transition-colors py-1"
                        >
                          <span>Lihat Rincian Foto & Fasilitas Kamar</span>
                          <Icon icon="solar:arrow-right-linear" className="w-4 h-4" />
                        </Link>

                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <Link href={`/room/${model.id}`} className="flex-1 sm:flex-initial">
                            <Button
                              variant="secondary"
                              size="md"
                              fullWidth
                              icon="solar:eye-bold"
                            >
                              Detail
                            </Button>
                          </Link>

                          <Button
                            onClick={() => openBooking(model.name, model.unitNumber)}
                            variant="primary"
                            size="md"
                            fullWidth
                            className="flex-1 sm:flex-initial"
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
