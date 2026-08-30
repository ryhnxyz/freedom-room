"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { HOUSE_MODELS } from "@/data/houseModels";
import Button from "@/components/Button";

export interface MasterplanPlot {
  id: string;
  plotNumber: string;
  floorLevel: string;
  modelAssigned: string;
  status: "Available" | "Booked" | "Cleaning";
  type: string;
  size: string;
  price: string;
  orientation: string;
  viewDescription: string;
  image: string;
  coordinates: { x: number; y: number };
}

export const SENTUL_PLOTS: MasterplanPlot[] = [
  {
    id: "ST-0305",
    plotNumber: "ST-0305",
    floorLevel: "Lantai 3",
    modelAssigned: "One Bed Deluxe Lantai 3",
    status: "Available",
    type: "1 Bedroom (1BR)",
    size: "32 m²",
    price: "Rp 150.000 / 3 Jam",
    orientation: "Lantai 3 · Dekat Kolam Renang",
    viewDescription: "Akses cepat ke lobby utama dan area kolam renang outdoor tanpa antre lift.",
    image: "/img/freedom-room/one-bed-deluxe-1.png",
    coordinates: { x: 28, y: 72 },
  },
  {
    id: "ST-0308",
    plotNumber: "ST-0308",
    floorLevel: "Lantai 3",
    modelAssigned: "One Bed Luxury Lantai 3",
    status: "Available",
    type: "1 Bedroom Luxury",
    size: "35 m²",
    price: "Rp 150.000 / 3 Jam",
    orientation: "Lantai 3 · King-Size Bed",
    viewDescription: "Sentuhan luxury di lantai 3 dengan pencahayaan warm ambient.",
    image: "/img/freedom-room/one-bed-luxury-1.png",
    coordinates: { x: 42, y: 72 },
  },
  {
    id: "ST-0610",
    plotNumber: "ST-0610",
    floorLevel: "Lantai 6",
    modelAssigned: "One Bedroom Wood Panel Lantai 6",
    status: "Available",
    type: "1 Bedroom (1BR)",
    size: "34 m²",
    price: "Rp 150.000 / 3 Jam",
    orientation: "Lantai 6 · Balkon Hijau",
    viewDescription: "Interior panel kayu estetik bernuansa hangat ala villa modern.",
    image: "/img/freedom-room/one-bed-6-1.png",
    coordinates: { x: 55, y: 55 },
  },
  {
    id: "ST-0812",
    plotNumber: "ST-0812",
    floorLevel: "Lantai 8",
    modelAssigned: "Studio Deluxe Lantai 8",
    status: "Available",
    type: "Studio",
    size: "28 m²",
    price: "Rp 150.000 / 3 Jam",
    orientation: "Lantai 8 · City View",
    viewDescription: "Tipe Studio praktis dengan view lepas kota Sentul dan Smart TV Netflix.",
    image: "/img/freedom-room/studio-8-1.png",
    coordinates: { x: 68, y: 44 },
  },
  {
    id: "ST-1002",
    plotNumber: "ST-1002",
    floorLevel: "Lantai 10",
    modelAssigned: "One Bedroom Deluxe Lantai 10 (Room 102)",
    status: "Available",
    type: "1 Bedroom Deluxe",
    size: "36 m²",
    price: "Rp 150.000 / 3 Jam",
    orientation: "Lantai 10 · Room 102 Exclusive",
    viewDescription: "Unit 1BR favorit dengan Smart TV 50 inch, kitchenette, kulkas, dan balkon asri.",
    image: "/img/freedom-room/one-bed-102-1.png",
    coordinates: { x: 30, y: 28 },
  },
  {
    id: "ST-1008",
    plotNumber: "ST-1008",
    floorLevel: "Lantai 10",
    modelAssigned: "One Bedroom Deluxe Lantai 10",
    status: "Available",
    type: "1 Bedroom Deluxe",
    size: "34 m²",
    price: "Rp 150.000 / 3 Jam",
    orientation: "Lantai 10 · Work Desk",
    viewDescription: "Dilengkapi meja kerja nyaman, WiFi stabil, dan panorama kota Sentul.",
    image: "/img/freedom-room/one-bed-deluxe-4.png",
    coordinates: { x: 45, y: 28 },
  },
  {
    id: "ST-1014",
    plotNumber: "ST-1014",
    floorLevel: "Lantai 10",
    modelAssigned: "One Bedroom Lantai 10",
    status: "Available",
    type: "1 Bedroom (1BR)",
    size: "32 m²",
    price: "Rp 150.000 / 3 Jam",
    orientation: "Lantai 10 · Privat & Tenang",
    viewDescription: "Sirkulasi udara sejuk lantai 10 dengan privasi penuh dan tenang.",
    image: "/img/freedom-room/one-deluxe-10-1.png",
    coordinates: { x: 60, y: 28 },
  },
  {
    id: "ST-1020",
    plotNumber: "ST-1020",
    floorLevel: "Lantai 10",
    modelAssigned: "Type 2 Bedroom Luxury Lantai 10",
    status: "Available",
    type: "2 Bedroom (2BR)",
    size: "56 m²",
    price: "Rp 300.000 / 3 Jam",
    orientation: "Lantai 10 · View Gunung Pancar",
    viewDescription: "2 kamar tidur terpisah, ruang keluarga luas, dan balkon pemandangan pegunungan.",
    image: "/img/freedom-room/type-2-luxury-1.png",
    coordinates: { x: 75, y: 28 },
  },
  {
    id: "ST-1102",
    plotNumber: "ST-1102",
    floorLevel: "Lantai 11",
    modelAssigned: "One Bedroom Skyline Lantai 11",
    status: "Available",
    type: "1 Bedroom (1BR)",
    size: "36 m²",
    price: "Rp 150.000 / 3 Jam",
    orientation: "Lantai 11 · Top Floor Skyline",
    viewDescription: "Lantai tertinggi dengan pemandangan perbukitan dan gemerlap malam kota Sentul.",
    image: "/img/freedom-room/one-bed-l11-1.png",
    coordinates: { x: 50, y: 14 },
  },
];

const FLOOR_FILTERS = [
  { id: "all", label: "Semua (9)" },
  { id: "Lantai 3", label: "Lt 3 (2)" },
  { id: "Lantai 6", label: "Lt 6 (1)" },
  { id: "Lantai 8", label: "Lt 8 (1)" },
  { id: "Lantai 10", label: "Lt 10 (4)" },
  { id: "Lantai 11", label: "Lt 11 (1)" },
];

interface MasterplanProps {
  onOpenTourForPlot?: (plotNumber: string) => void;
}

export default function Masterplan({ onOpenTourForPlot }: MasterplanProps) {
  const [viewMode, setViewMode] = useState<"realmap" | "floorplan">("realmap");
  const [selectedFloor, setSelectedFloor] = useState<string>("all");
  const [selectedPlot, setSelectedPlot] = useState<MasterplanPlot>(SENTUL_PLOTS[4]); // Default to ST-1002

  const filteredPlots = useMemo(() => {
    if (selectedFloor === "all") return SENTUL_PLOTS;
    return SENTUL_PLOTS.filter((p) => p.floorLevel.toLowerCase() === selectedFloor.toLowerCase());
  }, [selectedFloor]);

  const linkedModel = useMemo(() => {
    return (
      HOUSE_MODELS.find(
        (m) =>
          m.unitNumber === selectedPlot.plotNumber ||
          m.name.toLowerCase().includes(selectedPlot.modelAssigned.toLowerCase())
      ) || HOUSE_MODELS[0]
    );
  }, [selectedPlot]);

  return (
    <section id="masterplan" className="overflow-hidden bg-canvas py-12 sm:py-16">
      <div className="mx-auto max-w-[1440px] space-y-8 px-4 sm:px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
          <div className="max-w-2xl space-y-3">
            <span className="eyebrow block text-muted">Explore the address</span>
            <h2 className="font-display text-4xl leading-[1.02] tracking-tight text-primary sm:text-5xl lg:text-6xl">
              Discover the residence and its surroundings.
            </h2>
            <p className="text-xs sm:text-sm text-secondary leading-relaxed">
              Jelajahi denah unit aktif di Sentul Tower dan koordinat peta satelit real-time dengan akses cepat ke pusat perbelanjaan & jalan tol.
            </p>
          </div>

          {/* View Mode Toggle Buttons (Full-width on mobile, shrink-0 on desktop) */}
          <div className="grid w-full shrink-0 grid-cols-2 border-b border-black/15 sm:inline-grid sm:w-auto">
            <button
              type="button"
              onClick={() => setViewMode("realmap")}
              className={`inline-flex min-h-12 items-center justify-center gap-2 border-b-2 px-3 text-xs font-bold uppercase tracking-[0.08em] transition-colors sm:px-5 ${
                viewMode === "realmap"
                  ? "border-brand text-primary"
                  : "border-transparent text-secondary hover:text-primary"
              }`}
            >
              <Icon icon="solar:map-bold" className="w-4 h-4 shrink-0" />
              <span>Peta Satelit</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode("floorplan")}
              className={`inline-flex min-h-12 items-center justify-center gap-2 border-b-2 px-3 text-xs font-bold uppercase tracking-[0.08em] transition-colors sm:px-5 ${
                viewMode === "floorplan"
                  ? "border-brand text-primary"
                  : "border-transparent text-secondary hover:text-primary"
              }`}
            >
              <Icon icon="solar:structure-bold" className="w-4 h-4 shrink-0" />
              <span>Denah Lantai</span>
            </button>
          </div>
        </div>

        {/* Master Content Layout: 12-Column Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column: Interactive Map / Floorplan View (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col justify-between space-y-4 min-w-0">
            
            {viewMode === "realmap" ? (
              /* MODE 1: PETA SATELIT REAL */
              <div className="space-y-4 flex-1 flex flex-col min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-sand-100 p-3 sm:p-4 rounded-2xl border border-border-subtle text-xs">
                  <div className="flex items-center gap-2">
                    <Icon icon="solar:map-point-wave-bold" className="w-4 h-4 text-brand shrink-0" />
                    <span className="font-semibold text-primary">
                      Sentul City, Babakan Madang, Bogor • 9 Unit Pilihan (Lantai 3, 6, 8, 10, 11)
                    </span>
                  </div>
                  <a
                    href="https://maps.google.com/?q=Sentul+Tower+Apartment"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand hover:underline shrink-0"
                  >
                    <Icon icon="solar:map-arrow-square-bold" className="w-4 h-4" />
                    <span>Buka Google Maps</span>
                  </a>
                </div>

                {/* Real Map Container */}
                <div className="relative h-[320px] w-full flex-1 overflow-hidden rounded-[24px] border border-border-subtle bg-timber-950 shadow-inner sm:h-[440px] sm:rounded-[32px]">
                  <iframe
                    title="Realmap Lokasi Apartemen Sentul Tower"
                    src="https://maps.google.com/maps?q=-6.575,106.862&t=k&z=17&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full object-cover"
                  />

                  {/* Location Overlay Info */}
                  <div className="hidden sm:block absolute bottom-3 left-3 bg-surface/95 backdrop-blur-md p-3 rounded-2xl border border-border-subtle shadow-xl text-xs space-y-1 max-w-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-brand text-white flex items-center justify-center shrink-0 font-bold text-[9px]">
                        FR
                      </div>
                      <div>
                        <strong className="block text-primary font-bold text-[11px]">FreedomRoom Sentul Tower</strong>
                        <span className="text-[10px] text-muted block">Ruko STA Shopping Arcade A7</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-secondary leading-relaxed">
                      3 Menit dari Tol Sentul Selatan • 800m ke AEON Mall & IKEA.
                    </p>
                  </div>
                </div>

                {/* Point of Interest Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  {[
                    { label: "Pintu Tol Sentul", dist: "3 Menit", icon: "solar:car-bold" },
                    { label: "AEON Mall & IKEA", dist: "800 Meter", icon: "solar:bag-bold" },
                    { label: "Kolam Renang", dist: "Lantai 3", icon: "solar:water-sun-bold" },
                    { label: "Gunung Pancar", dist: "10 Menit", icon: "solar:mountains-bold" },
                  ].map((poi, idx) => (
                    <div key={idx} className="bg-sand-100 p-2.5 rounded-xl border border-border-subtle flex items-center gap-2 text-xs min-w-0">
                      <Icon icon={poi.icon} className="w-4 h-4 text-brand shrink-0" />
                      <div className="truncate min-w-0">
                        <span className="font-bold text-primary block truncate">{poi.label}</span>
                        <span className="text-[10px] text-muted block">{poi.dist}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* MODE 2: DENAH LANTAI UNIT */
              <div className="space-y-4 flex-1 flex flex-col min-w-0">
                {/* Floor Filter Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                  {FLOOR_FILTERS.map((fl) => (
                    <button
                      key={fl.id}
                      type="button"
                      onClick={() => setSelectedFloor(fl.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                        selectedFloor === fl.id
                          ? "bg-brand text-white shadow-xs"
                          : "bg-surface border border-border-subtle text-secondary hover:text-primary hover:bg-sand-100"
                      }`}
                    >
                      {fl.label}
                    </button>
                  ))}
                </div>

                {/* Floor Layout Card Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 flex-1 overflow-y-auto max-h-[380px] p-1">
                  {filteredPlots.map((plot) => {
                    const isSelected = selectedPlot.id === plot.id;

                    return (
                      <div
                        key={plot.id}
                        onClick={() => setSelectedPlot(plot)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                          isSelected
                            ? "border-brand bg-brand-light shadow-md ring-2 ring-brand/30"
                            : "border-border-subtle bg-surface hover:border-brand/40 hover:bg-sand-100"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-xs bg-timber-900 text-white px-2 py-0.5 rounded-md">
                            {plot.plotNumber}
                          </span>
                          <span className="text-[10px] font-semibold text-brand bg-brand/15 px-2 py-0.5 rounded-full">
                            {plot.floorLevel}
                          </span>
                        </div>

                        <div>
                          <h4 className="font-heading font-bold text-xs text-primary line-clamp-1">
                            {plot.modelAssigned}
                          </h4>
                          <span className="text-[11px] font-semibold text-brand block mt-0.5">
                            {plot.price}
                          </span>
                        </div>

                        <div className="text-[10px] text-secondary border-t border-border-subtle pt-1.5 flex items-center justify-between">
                          <span>{plot.type}</span>
                          <span>{plot.size}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Notice */}
                <div className="p-2.5 sm:p-3 rounded-2xl bg-sand-100 border border-border-subtle flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Icon icon="solar:compass-bold" className="w-4 h-4 text-brand shrink-0" />
                    <span className="text-secondary text-[11px]">
                      Klik kartu kamar untuk melihat spesifikasi detail & memesan.
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Selected Unit Detail Specification (4 Cols) */}
          <div className="app-panel flex min-w-0 flex-col justify-between space-y-5 p-4 sm:p-6 lg:col-span-4">
            
            <div className="space-y-4">
              {/* Unit Badge & Status */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-brand bg-brand/15 px-2.5 py-1 rounded-md">
                  {selectedPlot.plotNumber}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  <Icon icon="solar:check-circle-bold" className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Siap Huni (Available)</span>
                </span>
              </div>

              {/* Unit Image Preview */}
              <div className="relative h-56 w-full overflow-hidden rounded-[24px] border border-border-subtle bg-sand-200 sm:h-64">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedPlot.image}
                  alt={selectedPlot.modelAssigned}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-[10px] font-mono font-bold">
                  {selectedPlot.floorLevel}
                </div>
              </div>

              {/* Specs & Description */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-muted tracking-wider block">
                  {selectedPlot.type} • {selectedPlot.size}
                </span>
                <h3 className="font-display text-3xl leading-tight text-primary">
                  {selectedPlot.modelAssigned}
                </h3>
                <p className="text-xs text-secondary leading-relaxed line-clamp-2 font-sans">
                  {selectedPlot.viewDescription}
                </p>
              </div>

              {/* Price Callout */}
              <div className="bg-sand-100 p-3 rounded-2xl border border-border-subtle flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-muted block">TARIF TRANSIT MULAI</span>
                  <span className="font-heading font-bold text-base text-brand">
                    {selectedPlot.price}
                  </span>
                </div>
                <span className="text-[10px] text-muted">24 Jam Standby</span>
              </div>
            </div>

            {/* Actions: View Details & Instant Booking */}
            <div className="space-y-2 pt-2 border-t border-border-subtle">
              <Button
                onClick={() => onOpenTourForPlot && onOpenTourForPlot(selectedPlot.plotNumber)}
                variant="primary"
                size="md"
                fullWidth
                icon="solar:calendar-bold"
                className="font-bold shadow-sm"
              >
                Pesan Unit {selectedPlot.plotNumber}
              </Button>

              <Link href={`/room/${linkedModel.id}`} className="block">
                <Button
                  variant="outline"
                  size="md"
                  fullWidth
                  icon="solar:eye-bold"
                >
                  Rincian Kamar
                </Button>
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
