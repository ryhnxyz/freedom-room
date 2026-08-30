"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { HOUSE_MODELS, formatRupiah } from "@/data/houseModels";
import Button from "@/components/Button";
import Badge from "@/components/Badge";

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
  coordinates: { x: number; y: number };
}

export const MASTERPLAN_PLOTS: MasterplanPlot[] = [
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
    coordinates: { x: 50, y: 14 },
  },
];

interface MasterplanProps {
  onOpenTourForPlot?: (plotNumber: string) => void;
}

export default function Masterplan({ onOpenTourForPlot }: MasterplanProps) {
  const [viewMode, setViewMode] = useState<"realmap" | "floorplan">("realmap");
  const [selectedFloor, setSelectedFloor] = useState<string>("all");
  const [selectedPlot, setSelectedPlot] = useState<MasterplanPlot>(MASTERPLAN_PLOTS[4]); // Default to ST-1002 Room 102

  const filteredPlots = useMemo(() => {
    if (selectedFloor === "all") return MASTERPLAN_PLOTS;
    return MASTERPLAN_PLOTS.filter((p) => p.floorLevel.toLowerCase() === selectedFloor.toLowerCase());
  }, [selectedFloor]);

  const linkedModel = useMemo(() => {
    return HOUSE_MODELS.find(
      (m) =>
        m.unitNumber === selectedPlot.plotNumber ||
        m.name.toLowerCase().includes(selectedPlot.modelAssigned.toLowerCase())
    ) || HOUSE_MODELS[0];
  }, [selectedPlot]);

  return (
    <section id="masterplan" className="py-16 sm:py-24 bg-surface border-b border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-8 sm:space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <Badge addon="PETA SATELIT & DENAH">REALMAP & DENAH VISUAL</Badge>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-primary">
              Denah Visual Lantai & Peta Satelit Real
            </h2>
          </div>

          {/* View Mode Toggle Buttons */}
          <div className="flex items-center p-1 bg-sand-200 rounded-xl border border-border-subtle shrink-0">
            <button
              type="button"
              onClick={() => setViewMode("realmap")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === "realmap"
                  ? "bg-brand text-white shadow-xs"
                  : "text-secondary hover:text-primary"
              }`}
            >
              <Icon icon="solar:map-bold" className="w-4 h-4" />
              <span>Peta Satelit Real</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode("floorplan")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === "floorplan"
                  ? "bg-brand text-white shadow-xs"
                  : "text-secondary hover:text-primary"
              }`}
            >
              <Icon icon="solar:buildings-3-bold" className="w-4 h-4" />
              <span>Denah Lantai Tower</span>
            </button>
          </div>
        </div>

        {/* Main Grid: Interactive Map & Detail Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column: Interactive Map Display (8 Cols) */}
          <div className="lg:col-span-8 bg-canvas border border-border-subtle rounded-3xl p-4 sm:p-6 shadow-sm flex flex-col justify-between space-y-4">
            
            {viewMode === "realmap" ? (
              /* MODE 1: SATELLITE REALMAP (GOOGLE MAPS SATELIT EMBED) */
              <div className="space-y-3 flex-1 flex flex-col">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand animate-pulse" />
                    <span className="text-xs font-mono font-bold text-primary">
                      Ruko STA Shopping Arcade A7, Citaringgul, Babakan Madang, Bogor 16810
                    </span>
                  </div>
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=-6.575,106.862"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand hover:underline"
                  >
                    <Icon icon="solar:map-arrow-square-bold" className="w-4 h-4" />
                    <span>Petunjuk Arah Google Maps</span>
                  </a>
                </div>

                {/* Real Map Container */}
                <div className="relative w-full h-[360px] sm:h-[440px] rounded-2xl overflow-hidden border border-border-subtle shadow-inner bg-timber-950 flex-1">
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

                  {/* Floating Location Overlay Info */}
                  <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-xs bg-surface/95 backdrop-blur-md p-3.5 rounded-2xl border border-border-subtle shadow-xl text-xs space-y-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-brand text-white flex items-center justify-center shrink-0 font-bold text-[10px]">
                        FR
                      </div>
                      <div>
                        <strong className="block text-primary font-bold">FreedomRoom Sentul Tower</strong>
                        <span className="text-[11px] text-muted block">Ruko STA Shopping Arcade A7</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-secondary leading-relaxed">
                      3 Menit dari Tol Sentul Selatan • 800m ke AEON Mall Sentul City & IKEA.
                    </p>
                  </div>
                </div>

                {/* Point of Interest Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  {[
                    { label: "Pintu Tol Sentul Selatan", dist: "3 Menit", icon: "solar:car-bold" },
                    { label: "AEON Mall Sentul City", dist: "800 Meter", icon: "solar:bag-bold" },
                    { label: "Kolam Renang Sentul", dist: "Lantai 3", icon: "solar:water-sun-bold" },
                    { label: "Gunung Pancar", dist: "10 Menit", icon: "solar:mountains-bold" },
                  ].map((poi, idx) => (
                    <div key={idx} className="bg-sand-100 p-2 rounded-xl border border-border-subtle flex items-center gap-2 text-xs">
                      <Icon icon={poi.icon} className="w-4 h-4 text-brand shrink-0" />
                      <div className="truncate">
                        <span className="font-bold text-primary block truncate">{poi.label}</span>
                        <span className="text-[10px] text-muted block">{poi.dist}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* MODE 2: DENAH LANTAI TOWER (INTERACTIVE BLUEPRINT & FLOOR PLAN) */
              <div className="space-y-4 flex-1 flex flex-col">
                {/* Floor Filter Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                  {[
                    { id: "all", label: "Semua Unit (9)" },
                    { id: "Lantai 3", label: "Lantai 3 (2 Unit)" },
                    { id: "Lantai 6", label: "Lantai 6 (1 Unit)" },
                    { id: "Lantai 8", label: "Lantai 8 (1 Unit)" },
                    { id: "Lantai 10", label: "Lantai 10 (4 Unit)" },
                    { id: "Lantai 11", label: "Lantai 11 (1 Unit)" },
                  ].map((fl) => (
                    <button
                      key={fl.id}
                      type="button"
                      onClick={() => setSelectedFloor(fl.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                        selectedFloor === fl.id
                          ? "bg-brand text-white shadow-xs"
                          : "bg-surface border border-border-subtle text-secondary hover:text-primary"
                      }`}
                    >
                      {fl.label}
                    </button>
                  ))}
                </div>

                {/* Floor Layout Card Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 flex-1 overflow-y-auto max-h-[380px] p-1">
                  {filteredPlots.map((plot) => {
                    const isSelected = selectedPlot.id === plot.id;
                    const model = HOUSE_MODELS.find((m) => m.unitNumber === plot.plotNumber) || HOUSE_MODELS[0];

                    return (
                      <div
                        key={plot.id}
                        onClick={() => setSelectedPlot(plot)}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-2.5 ${
                          isSelected
                            ? "border-brand bg-brand-light shadow-md ring-2 ring-brand/30"
                            : "border-border-subtle bg-surface hover:border-brand/40 hover:bg-sand-100"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-xs bg-timber-900 text-white px-2.5 py-0.5 rounded-md">
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
              </div>
            )}

            <div className="flex items-center justify-between text-xs text-secondary border-t border-border-subtle pt-3">
              <span className="flex items-center gap-1.5">
                <Icon icon="solar:info-circle-bold" className="w-4 h-4 text-brand" />
                <span>Pilih unit kamar untuk melihat spesifikasi & kalkulasi tarif</span>
              </span>
              <span className="font-semibold text-primary">9 Unit Apartemen Sentul Tower</span>
            </div>
          </div>

          {/* Right Column: Selected Unit Detail Panel (4 Cols) */}
          <div className="lg:col-span-4 bg-surface border border-border-subtle rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-border-subtle pb-3">
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-muted block">
                    UNIT TERPILIH
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-primary">
                    {selectedPlot.plotNumber}
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-brand-light text-brand text-xs font-bold border border-brand-border">
                  Siap Huni (Available)
                </span>
              </div>

              <div className="relative h-44 rounded-2xl overflow-hidden bg-sand-200 border border-border-subtle shadow-inner">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={linkedModel?.featuredImage || "/img/freedom-room/one-bed-102-1.png"}
                  alt={selectedPlot.modelAssigned}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-[10px] font-mono text-white">
                  {selectedPlot.floorLevel} · {selectedPlot.size}
                </div>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-heading font-bold text-lg text-primary leading-snug">
                  {selectedPlot.modelAssigned}
                </h4>
                <p className="text-xs text-secondary leading-relaxed font-sans">
                  {selectedPlot.viewDescription}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div className="bg-sand-100 p-2.5 rounded-xl border border-border-subtle">
                  <span className="text-[10px] font-mono text-muted uppercase block">Tipe & Posisi</span>
                  <span className="font-semibold text-primary block truncate mt-0.5">{selectedPlot.type}</span>
                </div>
                <div className="bg-sand-100 p-2.5 rounded-xl border border-border-subtle">
                  <span className="text-[10px] font-mono text-muted uppercase block">Tarif Transit 3 Jam</span>
                  <span className="font-bold text-brand block mt-0.5">{selectedPlot.price}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border-subtle space-y-2">
              <Link href={`/room/${linkedModel?.id || "one-bed-deluxe-lt-10-room102"}`} className="block">
                <Button variant="primary" size="md" className="w-full justify-center">
                  Lihat Foto & Detail Kamar
                </Button>
              </Link>

              {onOpenTourForPlot && (
                <button
                  type="button"
                  onClick={() => onOpenTourForPlot(selectedPlot.plotNumber)}
                  className="w-full py-2 text-xs font-semibold text-secondary hover:text-brand transition-colors cursor-pointer text-center"
                >
                  Booking Cepat Unit Ini →
                </button>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
