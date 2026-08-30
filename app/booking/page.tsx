"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import Badge from "@/components/Badge";
import { HOUSE_MODELS, formatRupiah } from "@/data/houseModels";
import { api, RoomData } from "@/lib/api";
import { Icon } from "@iconify/react";

const TourBookingModal = dynamic(() => import("@/components/TourBookingModal"), { ssr: false });

export default function BookingCatalogPage() {
  const router = useRouter();
  const [rooms, setRooms] = useState<RoomData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filterType, setFilterType] = useState<string>("all");
  const [selectedDuration, setSelectedDuration] = useState<"3h" | "6h" | "8h" | "daily">("3h");

  // Booking Modal State
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedRoomName, setSelectedRoomName] = useState<string | undefined>(undefined);
  const [selectedUnitNumber, setSelectedUnitNumber] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function fetchLiveRooms() {
      try {
        const data = await api.getRooms();
        if (Array.isArray(data) && data.length > 0) {
          setRooms(data);
        }
      } catch (err) {
        console.warn("Using local fallback models:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchLiveRooms();
  }, []);

  const openBookingFor = (roomName: string, unitNumber: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedRoomName(roomName);
    setSelectedUnitNumber(unitNumber);
    setIsBookingModalOpen(true);
  };

  // Merge Live VPS Rooms with Local Model details
  const displayItems = HOUSE_MODELS.map((local) => {
    const live = rooms.find((r) => r.id === local.databaseId || r.unit_number === local.unitNumber);
    return {
      id: local.id,
      databaseId: local.databaseId,
      name: live?.name || local.name,
      unitNumber: live?.unit_number || local.unitNumber,
      floor: live?.floor || local.floor,
      status: live?.status || local.status,
      type: live?.type || (local.beds === 2 ? "2 Bedroom" : local.sqft <= 28 ? "Studio" : "1 Bedroom"),
      size: live?.size || `${local.sqft} m²`,
      image: live?.image || local.featuredImage,
      amenities: live?.amenities || local.highlights,
      rate3h: live?.rate_transit_3h || local.rateTransit3h,
      rate6h: live?.rate_transit_6h || local.rateTransit6h,
      rate8h: live?.rate_transit_8h || local.rateTransit8h,
      rateDaily: live?.rate_full_day || local.rateFullDay,
      tagline: local.tagline,
      beds: local.beds,
      baths: local.baths,
      garage: local.garage,
    };
  });

  const filteredItems = displayItems.filter((item) => {
    if (filterType === "apt") return item.type.toLowerCase().includes("studio") || item.type.toLowerCase().includes("1");
    if (filterType === "villa") return item.type.toLowerCase().includes("2") || item.type.toLowerCase().includes("luxury");
    if (filterType === "hotel") return item.type.toLowerCase().includes("deluxe") || item.type.toLowerCase().includes("room");
    return true;
  });

  return (
    <main className="min-h-screen bg-canvas text-primary relative selection:bg-brand selection:text-white">
      <Navbar onOpenScheduleTour={() => openBookingFor("", "")} />

      {/* Hero Header */}
      <section className="relative pt-28 pb-12 sm:pt-36 sm:pb-20 bg-timber-950 text-white overflow-hidden border-b border-border-subtle">
        <div className="absolute inset-0 opacity-25 pointer-events-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/freedom-room/one-bed-102-1.png"
            alt="FreedomRoom Sentul Tower"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-timber-950 via-timber-950/80 to-timber-950/50" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 space-y-3 sm:space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-white/10 px-4 py-1.5 text-xs font-semibold text-brand uppercase backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-brand/15 animate-pulse" />
            Pilihan Penginapan Apartemen, Hotel & Villa
          </div>

          <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
            Pilih Penginapan, Kamar & Durasi Sewa
          </h1>
          <p className="text-xs sm:text-base text-gray-300 max-w-xl mx-auto leading-relaxed">
            Jelajahi unit apartemen, kamar hotel, dan villa berfasilitas lengkap dengan opsi sewa transit 3-8 jam maupun harian.
          </p>
        </div>
      </section>

      {/* Catalog & Filter Section */}
      <section className="py-8 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-6 sm:space-y-8">
        
        {/* Controls Bar: Type Filters & Duration Selector */}
        <div className="bg-surface p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl border border-border-subtle shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4">
          
          {/* Unit Type Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 md:pb-0">
            {[
              { id: "all", label: "Semua Penginapan (9)" },
              { id: "apt", label: "Apartemen (Studio & 1BR)" },
              { id: "villa", label: "Villa & Family Suite (2BR)" },
              { id: "hotel", label: "Hotel Room & Deluxe" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setFilterType(t.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  filterType === t.id
                    ? "bg-timber-900 text-white shadow-xs font-bold ring-2 ring-bottle/20"
                    : "bg-sand-100 text-secondary hover:text-primary hover:bg-sand-200 border border-border-subtle"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Pricing Duration Switcher */}
          <div className="flex items-center gap-1 bg-sand-200 p-1 rounded-xl overflow-x-auto no-scrollbar">
            {[
              { id: "3h", label: "Transit 3 Jam" },
              { id: "6h", label: "Transit 6 Jam" },
              { id: "8h", label: "Transit 8 Jam" },
              { id: "daily", label: "Sewa Harian" },
            ].map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedDuration(d.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedDuration === d.id
                    ? "bg-surface text-primary shadow-xs font-bold text-brand"
                    : "text-secondary hover:text-primary"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>

        </div>

        {/* Room Grid: Ultra UX-friendly Clickable Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredItems.map((room) => {
            const currentRate =
              selectedDuration === "3h"
                ? room.rate3h
                : selectedDuration === "6h"
                ? room.rate6h
                : selectedDuration === "8h"
                ? room.rate8h
                : room.rateDaily;

            const durationSuffix = selectedDuration === "daily" ? "/ Malam" : "/ 3 Jam";
            const isAvailable = room.status === "Available";

            return (
              <div
                key={room.id}
                onClick={() => router.push(`/room/${room.id}`)}
                className="bg-surface rounded-3xl border border-border-subtle overflow-hidden shadow-sm flex flex-col justify-between group hover:border-brand/50 hover:shadow-xl transition-all duration-300 cursor-pointer transform-gpu hover:-translate-y-1"
              >
                <div>
                  {/* Image Container with Badges */}
                  <div className="relative h-56 sm:h-60 w-full bg-sand-200 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Status Badge */}
                    <div className={`absolute top-3.5 left-3.5 flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold shadow-md ${
                      isAvailable ? "bg-emerald-600 text-white" : "bg-amber-600 text-white"
                    }`}>
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      <span>{isAvailable ? "Siap Huni (Available)" : room.status || "Booked"}</span>
                    </div>

                    {/* Floor Badge */}
                    <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full bg-surface/95 backdrop-blur-md text-primary text-[11px] font-mono font-bold shadow-xs border border-border-subtle">
                      {room.unitNumber} · {room.floor}
                    </div>

                    {/* Hint overlay on hover */}
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg backdrop-blur-md flex items-center gap-1">
                      <span>Lihat Detail</span>
                      <Icon icon="solar:arrow-right-linear" className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 sm:p-6 space-y-3">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-muted uppercase tracking-wider block">
                        {room.type} · {room.size} · {room.garage}
                      </span>
                      <h3 className="font-heading font-bold text-xl sm:text-2xl text-primary leading-snug group-hover:text-brand transition-colors">
                        {room.name}
                      </h3>
                    </div>

                    <p className="text-xs text-secondary leading-relaxed line-clamp-2 font-sans">
                      {room.tagline}
                    </p>

                    {/* Quick Specs Icons */}
                    <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
                      <div className="bg-sand-100 p-2 rounded-xl border border-border-subtle flex flex-col items-center justify-center">
                        <Icon icon="solar:bed-bold" className="w-4 h-4 text-brand mb-0.5" />
                        <span className="font-bold text-primary text-[11px]">{room.beds} Kamar</span>
                      </div>
                      <div className="bg-sand-100 p-2 rounded-xl border border-border-subtle flex flex-col items-center justify-center">
                        <Icon icon="solar:bath-bold" className="w-4 h-4 text-brand mb-0.5" />
                        <span className="font-bold text-primary text-[11px]">{room.baths} Mandi</span>
                      </div>
                      <div className="bg-sand-100 p-2 rounded-xl border border-border-subtle flex flex-col items-center justify-center">
                        <Icon icon="solar:ruler-angular-bold" className="w-4 h-4 text-brand mb-0.5" />
                        <span className="font-bold text-primary text-[11px]">{room.size}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pricing & Booking Action */}
                <div className="p-5 sm:p-6 pt-0">
                  <div className="pt-3.5 border-t border-border-subtle flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-mono text-muted uppercase block">
                        Tarif {selectedDuration.toUpperCase()}
                      </span>
                      <span className="font-heading font-bold text-lg sm:text-xl text-brand">
                        {formatRupiah(currentRate)} <span className="text-xs font-normal text-secondary">{durationSuffix}</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <Link
                        href={`/room/${room.id}`}
                        className="p-2.5 rounded-xl border border-border-subtle text-secondary hover:text-primary hover:bg-sand-100 transition-colors"
                        title="Lihat Detail Kamar"
                      >
                        <Icon icon="solar:eye-bold" className="w-4 h-4" />
                      </Link>

                      <Button
                        onClick={() => openBookingFor(room.name, room.unitNumber)}
                        variant="primary"
                        size="sm"
                        icon="solar:calendar-bold"
                      >
                        Booking
                      </Button>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </section>

      <Footer />

      {/* Booking Modal */}
      <TourBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        initialModelName={selectedRoomName}
        initialPlotNumber={selectedUnitNumber}
      />
    </main>
  );
}
