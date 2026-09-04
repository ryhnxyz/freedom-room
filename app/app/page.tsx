"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Badge from "@/components/Badge";
import { Icon } from "@iconify/react";
import { HOUSE_MODELS, formatRupiah } from "@/data/houseModels";

const APP_URL = "https://app.freedomroom.id";

export default function AppPage() {
  const [selectedDuration, setSelectedDuration] = useState<"3h" | "6h" | "8h" | "daily">("6h");
  const [pwaTab, setPwaTab] = useState<"ios" | "android">("ios");

  const DURATION_DATA = {
    "3h": {
      label: "Transit 3 Jam",
      tagline: "Rehat singkat & istirahat cepat",
      priceEst: "Mulai Rp 100.000",
      desc: "Cocok untuk menunggu jadwal penerbangan, istirahat sejenak antar meeting, atau refreshing singkat.",
      badge: "Paling Hemat",
    },
    "6h": {
      label: "Transit 6 Jam",
      tagline: "Durasi paling favorit tamu transit",
      priceEst: "Mulai Rp 150.000",
      desc: "Waktu ideal untuk tidur siang nyenyak, mandi segar, streaming Smart TV, dan recharge energi.",
      badge: "Paling Populer",
    },
    "8h": {
      label: "Transit 8 Jam",
      tagline: "Work from room & relaksasi total",
      priceEst: "Mulai Rp 200.000",
      desc: "Kenyamanan kerja tenang dengan high-speed WiFi, coffee & tea spot, serta kasur premium.",
      badge: "Work & Relax",
    },
    "daily": {
      label: "Full Day / Harian",
      tagline: "Staycation penuh 24 jam",
      priceEst: "Mulai Rp 280.000",
      desc: "Nikmati seluruh fasilitas kamar apartemen mewah Sentul Tower dengan pilihan check-in fleksibel.",
      badge: "Best Value",
    },
  };

  const APP_FEATURES = [
    {
      icon: "solar:clock-circle-bold",
      title: "Pilihan Transit Fleksibel",
      desc: "Sewa per 3 jam, 6 jam, 8 jam, hingga menginap harian. Bebas tentukan waktu istirahat tanpa perlu bayar tarif harian penuh.",
      badge: "Fleksibel 24/7",
    },
    {
      icon: "solar:qr-code-bold",
      title: "Pembayaran QRIS SakuRupiah",
      desc: "Scan langsung dari BCA, Mandiri, BRI, BNI, GoPay, OVO, atau ShopeePay. Terverifikasi otomatis detik itu juga tanpa kirim bukti transfer.",
      badge: "Instan & Otomatis",
    },
    {
      icon: "solar:ticket-bold",
      title: "Kupon Diskon & Promo Member",
      desc: "Gunakan kode kupon promo eksklusif untuk mendapatkan potongan harga sewa kamar langsung di halaman checkout.",
      badge: "Hemat Spesial",
    },
    {
      icon: "solar:map-point-bold",
      title: "Peta & Titik Presisi Google Maps",
      desc: "Integrasi peta interaktif dan petunjuk arah langsung ke Sentul Tower Apartment. Navigasi rute mudah sampai ke lobby.",
      badge: "Akurasi Titik",
    },
    {
      icon: "solar:key-minimalistic-bold",
      title: "Akses Check-in Bebas Ribet",
      desc: "Rincian nomor pintu, nomor unit, tower, dan lantai langsung tampil di layar smartphone begitu reservasi lunas.",
      badge: "Privasi Terjaga",
    },
    {
      icon: "solar:star-bold",
      title: "Ulasan Tamu Nyata & Terverifikasi",
      desc: "Semua review dan rating berasal langsung dari database tamu yang telah menginap. Transparan dan terpercaya.",
      badge: "Rating 5.0",
    },
  ];

  const featuredRooms = HOUSE_MODELS.slice(0, 3);

  return (
    <main className="min-h-screen bg-canvas text-primary relative selection:bg-brand selection:text-white pb-16 md:pb-0">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-32 bg-timber-950 text-white overflow-hidden border-b border-border-subtle">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gold-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Col: Headline & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-500/10 px-3.5 py-1.5 text-xs font-bold text-brand backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
                </span>
                <span>APLIKASI MEMBER RESMI FREEDOMROOM</span>
              </div>

              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                Sewa Apartemen Transit & Staycation, <span className="text-brand">Langsung dari HP Anda.</span>
              </h1>

              <p className="text-base sm:text-lg text-gray-300 max-w-xl leading-relaxed font-sans">
                Pesan unit apartemen Sentul Tower secara instan di <b>app.freedomroom.id</b>. Pilih paket transit 3 jam, 6 jam, 8 jam atau harian, bayar otomatis via QRIS SakuRupiah, dan nikmati potongan kupon promo langsung di genggaman Anda.
              </p>

              {/* Action Buttons & Domain Link */}
              <div className="pt-2 space-y-3">
                <div className="flex flex-wrap items-center gap-3.5">
                  <a
                    href={APP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 rounded-2xl bg-brand px-6 py-4 text-sm font-black text-primary shadow-xl hover:bg-brand-hover hover:scale-[1.02] active:scale-95 transition-all group"
                  >
                    <Icon icon="solar:smartphone-bold" className="w-5 h-5 text-primary" />
                    <span>Akses Web App (app.freedomroom.id)</span>
                    <Icon icon="solar:arrow-right-up-linear" className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>

                  <a
                    href="#fitur-unggulan"
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-sm font-bold text-white hover:bg-white/15 transition-all backdrop-blur-sm"
                  >
                    <Icon icon="solar:info-circle-bold" className="w-4 h-4 text-brand" />
                    <span>Jelajahi Fitur</span>
                  </a>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
                  <span>Domain Resmi:</span>
                  <a
                    href={APP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono font-bold text-brand hover:underline flex items-center gap-1"
                  >
                    https://app.freedomroom.id
                    <Icon icon="solar:arrow-right-up-linear" className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Trust Micro-Metrics */}
              <div className="pt-4 grid grid-cols-3 gap-4 border-t border-white/10 max-w-lg">
                <div>
                  <p className="font-heading text-xl sm:text-2xl font-black text-white">100%</p>
                  <p className="text-[11px] text-gray-400 font-medium">Auto QRIS SakuRupiah</p>
                </div>
                <div>
                  <p className="font-heading text-xl sm:text-2xl font-black text-brand">3j - 24j</p>
                  <p className="text-[11px] text-gray-400 font-medium">Transit Fleksibel</p>
                </div>
                <div>
                  <p className="font-heading text-xl sm:text-2xl font-black text-white">5.0 ★</p>
                  <p className="text-[11px] text-gray-400 font-medium">Verified Guest Reviews</p>
                </div>
              </div>
            </div>

            {/* Right Col: Interactive Smartphone Mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[340px] sm:max-w-[360px]">
                
                {/* Floating Badge Left */}
                <div className="absolute -top-4 -left-6 z-20 hidden sm:flex items-center gap-2.5 rounded-2xl border border-white/15 bg-timber-900/90 p-3 text-xs font-bold text-white shadow-2xl backdrop-blur-xl">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Icon icon="solar:check-circle-bold" className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-gray-400">QRIS Verified</p>
                    <p className="text-xs font-extrabold text-white">Lunas Otomatis</p>
                  </div>
                </div>

                {/* Floating Badge Right */}
                <div className="absolute bottom-16 -right-6 z-20 hidden sm:flex items-center gap-2.5 rounded-2xl border border-white/15 bg-timber-900/90 p-3 text-xs font-bold text-white shadow-2xl backdrop-blur-xl">
                  <div className="w-8 h-8 rounded-xl bg-gold/20 text-gold flex items-center justify-center">
                    <Icon icon="solar:ticket-bold" className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-gray-400">Kupon Promo</p>
                    <p className="text-xs font-extrabold text-brand">Hemat s.d. 20%</p>
                  </div>
                </div>

                {/* Smartphone Device Frame */}
                <div className="relative rounded-[48px] border-[8px] border-timber-800 bg-[#0A0805] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] ring-1 ring-white/20 overflow-hidden">
                  
                  {/* Phone Speaker & Dynamic Island */}
                  <div className="mx-auto h-4 w-28 rounded-full bg-timber-900 mb-2 flex items-center justify-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-white/20 mr-2" />
                    <div className="h-1 w-8 rounded-full bg-white/10" />
                  </div>

                  {/* App Screen Container */}
                  <div className="rounded-[36px] bg-[#EDF0F6] overflow-hidden text-primary border border-black/5 shadow-inner">
                    
                    {/* Mock App Header */}
                    <div className="bg-primary text-white p-4 pt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-white p-0.5 relative">
                          <Image src="/logo/freedom-logo.png" alt="Logo" fill className="object-contain" />
                        </div>
                        <span className="font-heading font-black text-xs text-white">Freedom<span className="text-brand">Room</span></span>
                      </div>
                      <span className="rounded-full bg-brand/20 px-2 py-0.5 text-[9px] font-bold text-brand border border-brand/30">
                        app.freedomroom.id
                      </span>
                    </div>

                    {/* Mock Duration Selector */}
                    <div className="p-3 bg-white border-b border-black/5">
                      <p className="text-[10px] font-bold text-secondary uppercase tracking-wider mb-1.5">Pilih Durasi Transit:</p>
                      <div className="grid grid-cols-4 gap-1 text-[10px] font-bold">
                        <span className="bg-brand text-primary text-center py-1.5 rounded-lg shadow-xs">3 Jam</span>
                        <span className="bg-canvas text-secondary text-center py-1.5 rounded-lg">6 Jam</span>
                        <span className="bg-canvas text-secondary text-center py-1.5 rounded-lg">8 Jam</span>
                        <span className="bg-canvas text-secondary text-center py-1.5 rounded-lg">Harian</span>
                      </div>
                    </div>

                    {/* Mock Room Card Preview */}
                    <div className="p-3 space-y-2.5">
                      <div className="rounded-2xl bg-white p-3 shadow-xs border border-black/5 space-y-2">
                        <div className="relative h-28 w-full rounded-xl overflow-hidden bg-slate-200">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src="/img/freedom-room/one-bed-102-1.png"
                            alt="Preview Room"
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute top-2 left-2 rounded-full bg-emerald-600 px-2 py-0.5 text-[9px] font-extrabold text-white shadow-sm">
                            ● Available
                          </span>
                          <span className="absolute bottom-2 right-2 rounded-lg bg-black/70 px-2 py-0.5 text-[10px] font-black text-gold backdrop-blur-sm">
                            Rp 150.000 / 3j
                          </span>
                        </div>
                        <div>
                          <p className="text-xs font-black text-primary truncate">One Bedroom Skyline</p>
                          <p className="text-[10px] text-secondary">Tower B · Lantai 11 · Smart TV</p>
                        </div>
                        <a
                          href={APP_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full block text-center rounded-xl bg-brand py-2 text-[11px] font-extrabold text-primary hover:bg-brand-hover transition-colors shadow-xs"
                        >
                          Booking di app.freedomroom.id
                        </a>
                      </div>

                      {/* Mock Promo Banner */}
                      <div className="rounded-xl bg-amber-50 p-2.5 border border-amber-200 flex items-center justify-between text-[10px]">
                        <div className="flex items-center gap-2">
                          <Icon icon="solar:tag-bold" className="w-4 h-4 text-amber-600 shrink-0" />
                          <span className="font-semibold text-amber-900">Kupon <b>FREEDOM10</b> Hemat 10%</span>
                        </div>
                        <span className="text-[9px] font-bold text-amber-800 bg-amber-200/60 px-1.5 py-0.5 rounded">Tersedia</span>
                      </div>
                    </div>

                    {/* Mock App Bottom Bar */}
                    <div className="bg-white border-t border-black/5 p-2 px-4 flex items-center justify-between text-[9px] font-bold text-secondary">
                      <div className="flex flex-col items-center text-brand">
                        <Icon icon="solar:home-2-bold" className="w-4 h-4" />
                        <span>Katalog</span>
                      </div>
                      <div className="flex flex-col items-center text-secondary">
                        <Icon icon="solar:tag-linear" className="w-4 h-4" />
                        <span>Promo</span>
                      </div>
                      <div className="flex flex-col items-center text-secondary">
                        <Icon icon="solar:calendar-linear" className="w-4 h-4" />
                        <span>Pesanan</span>
                      </div>
                      <div className="flex flex-col items-center text-secondary">
                        <Icon icon="solar:user-linear" className="w-4 h-4" />
                        <span>Profil</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Shadow Accent */}
                <div className="mx-auto mt-4 h-3 w-4/5 rounded-full bg-brand/20 blur-md" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* DURATION SELECTOR INTERACTIVE PREVIEW */}
      <section className="py-16 sm:py-24 bg-surface border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <Badge addon="FLEKSIBEL">PILIHAN DURASI SEWA</Badge>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-primary">
              Bayar Hanya untuk Waktu yang Anda Butuhkan
            </h2>
            <p className="text-sm sm:text-base text-secondary font-sans">
              Tak perlu sewa full day jika hanya butuh transit 3 jam. Tentukan durasi menginap Anda secara instan di aplikasi.
            </p>
          </div>

          {/* Duration Tabs */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {(["3h", "6h", "8h", "daily"] as const).map((key) => {
              const item = DURATION_DATA[key];
              const isSelected = selectedDuration === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedDuration(key)}
                  className={`rounded-2xl px-5 py-3 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    isSelected
                      ? "bg-primary text-white shadow-md ring-2 ring-brand"
                      : "bg-canvas text-secondary hover:bg-sand-200 hover:text-primary"
                  }`}
                >
                  <span className="block">{item.label}</span>
                  <span className={`text-[10px] block font-normal mt-0.5 ${isSelected ? "text-brand" : "text-muted"}`}>
                    {item.priceEst}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Duration Card Highlight */}
          <div className="max-w-3xl mx-auto rounded-3xl bg-canvas border border-border-subtle p-6 sm:p-8 shadow-card space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="inline-block rounded-full bg-brand/20 px-3 py-1 text-[11px] font-black text-brand mb-2">
                  {DURATION_DATA[selectedDuration].badge}
                </span>
                <h3 className="font-heading text-2xl font-black text-primary">
                  {DURATION_DATA[selectedDuration].label}
                </h3>
                <p className="text-xs text-brand font-bold mt-0.5">
                  {DURATION_DATA[selectedDuration].tagline}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-secondary font-medium">Estimasi Tarif:</p>
                <p className="text-2xl font-black text-primary font-heading">
                  {DURATION_DATA[selectedDuration].priceEst}
                </p>
              </div>
            </div>

            <p className="text-sm text-secondary leading-relaxed font-sans pt-2 border-t border-border-subtle">
              {DURATION_DATA[selectedDuration].desc}
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-secondary">
                <Icon icon="solar:check-circle-bold" className="w-4 h-4 text-emerald-600" />
                <span>Termasuk akses Smart TV, AC dingin, sprei steril & air mineral</span>
              </div>
              <a
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-xs font-black text-primary hover:bg-brand-hover transition-colors shadow-sm"
              >
                <span>Cari Kamar di app.freedomroom.id</span>
                <Icon icon="solar:arrow-right-linear" className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* BENTO GRID: FITUR UTAMA APP */}
      <section id="fitur-unggulan" className="py-16 sm:py-24 bg-canvas border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <Badge addon="FITUR">MENGAPA PAKAI FREEDOMROOM APP</Badge>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-primary">
              Semua Kebutuhan Menginap dalam Satu Aplikasi
            </h2>
            <p className="text-sm sm:text-base text-secondary font-sans">
              Pengalaman pemesanan yang dirancang khusus untuk kecepatan, privasi, dan kepraktisan tamu.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {APP_FEATURES.map((item, idx) => (
              <div
                key={idx}
                className="rounded-3xl bg-surface p-6 sm:p-7 border border-border-subtle shadow-sm space-y-4 hover:border-brand/50 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-brand/15 text-primary flex items-center justify-center">
                    <Icon icon={item.icon} className="w-6 h-6 text-brand" />
                  </div>
                  <span className="rounded-full bg-sand-200 px-2.5 py-1 text-[10px] font-bold text-secondary">
                    {item.badge}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-heading text-lg font-extrabold text-primary">
                    {item.title}
                  </h3>
                  <p className="text-xs text-secondary leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED ROOMS FROM DATABASE */}
      <section className="py-16 sm:py-24 bg-surface border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-2">
              <Badge addon="UNIT PILIHAN">SENTUL TOWER APARTMENT</Badge>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-primary">
                Kamar Siap Huni di Sentul City
              </h2>
              <p className="text-xs sm:text-sm text-secondary font-sans max-w-xl">
                Setiap unit telah dilengkapi tempat tidur empuk, Smart TV Netflix, AC dingin, kamar mandi bersih, dan pemandangan Gunung Pancar / Kota Sentul.
              </p>
            </div>

            <a
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-extrabold text-brand hover:underline"
            >
              <span>Buka Seluruh Kamar di app.freedomroom.id</span>
              <Icon icon="solar:arrow-right-up-linear" className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredRooms.map((room) => (
              <article
                key={room.id}
                className="rounded-3xl bg-canvas border border-border-subtle overflow-hidden shadow-sm flex flex-col hover:shadow-lg transition-all"
              >
                {/* Room Image */}
                <div className="relative h-56 w-full bg-slate-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={room.featuredImage || room.gallery[0]?.url || "/img/freedom-room/one-bed-102-1.png"}
                    alt={room.name}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-black text-primary shadow-xs">
                    {room.type}
                  </span>
                  <span className="absolute bottom-3 right-3 rounded-xl bg-primary/85 px-3 py-1 text-xs font-black text-gold backdrop-blur-sm">
                    {formatRupiah(room.rateTransit3h || 150000)} / 3j
                  </span>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <h3 className="font-heading text-lg font-black text-primary truncate">{room.name}</h3>
                      <span className="text-xs font-extrabold text-brand flex items-center gap-0.5">
                        <Icon icon="solar:star-bold" className="w-3.5 h-3.5" /> 5.0
                      </span>
                    </div>
                    <p className="text-xs text-secondary line-clamp-2 leading-relaxed">
                      {room.tagline || "Unit apartemen modern Sentul Tower dengan kenyamanan maksimal dan privasi terjaga."}
                    </p>
                    <div className="flex items-center gap-3 text-[11px] text-muted pt-1">
                      <span>Tower {room.garage || "B"}</span>
                      <span>•</span>
                      <span>Lantai {room.floor || "11"}</span>
                      <span>•</span>
                      <span>{room.sqft} m²</span>
                    </div>
                  </div>

                  <a
                    href={`${APP_URL}/room/${room.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-brand py-2.5 text-xs font-black text-primary hover:bg-brand-hover transition-colors shadow-xs"
                  >
                    <span>Booking di app.freedomroom.id</span>
                    <Icon icon="solar:arrow-right-up-linear" className="w-3.5 h-3.5" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* HOW TO USE & INSTALL PWA */}
      <section className="py-16 sm:py-24 bg-canvas border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <Badge addon="PANDUAN">CARA AKSES & INSTALL PWA</Badge>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-primary">
              Akses Instan Tanpa Perlu Download dari App Store
            </h2>
            <p className="text-sm sm:text-base text-secondary font-sans">
              FreedomRoom Web App berbasis Progressive Web App (PWA). Cepat, hemat memori ponsel, dan bisa ditambahkan langsung ke layar utama HP Anda.
            </p>
          </div>

          {/* 3 Step Flow */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-3xl bg-surface p-6 sm:p-7 border border-border-subtle space-y-3 relative">
              <span className="w-8 h-8 rounded-full bg-brand text-primary font-black text-xs flex items-center justify-center">
                1
              </span>
              <h3 className="font-heading text-lg font-bold text-primary">Buka app.freedomroom.id</h3>
              <p className="text-xs text-secondary leading-relaxed">
                Ketik <b>app.freedomroom.id</b> di browser Safari (iPhone) atau Google Chrome (Android). Aplikasi akan langsung terbuka tanpa registrasi rumit.
              </p>
            </div>

            <div className="rounded-3xl bg-surface p-6 sm:p-7 border border-border-subtle space-y-3 relative">
              <span className="w-8 h-8 rounded-full bg-brand text-primary font-black text-xs flex items-center justify-center">
                2
              </span>
              <h3 className="font-heading text-lg font-bold text-primary">Pilih Kamar & Durasi</h3>
              <p className="text-xs text-secondary leading-relaxed">
                Pilih unit kamar yang tersedia secara live, tentukan paket transit (3j, 6j, 8j, atau harian), dan masukkan kode promo jika ada.
              </p>
            </div>

            <div className="rounded-3xl bg-surface p-6 sm:p-7 border border-border-subtle space-y-3 relative">
              <span className="w-8 h-8 rounded-full bg-brand text-primary font-black text-xs flex items-center justify-center">
                3
              </span>
              <h3 className="font-heading text-lg font-bold text-primary">Scan QRIS & Check-in</h3>
              <p className="text-xs text-secondary leading-relaxed">
                Selesaikan pembayaran via QRIS SakuRupiah. Rincian nomor pintu kamar dan instruksi akses langsung terbit di layar HP Anda.
              </p>
            </div>
          </div>

          {/* Add to Homescreen Card */}
          <div className="max-w-2xl mx-auto rounded-3xl bg-surface border border-border-subtle p-6 sm:p-7 space-y-4">
            <h4 className="font-heading text-base font-bold text-primary flex items-center gap-2">
              <Icon icon="solar:smartphone-bold" className="w-5 h-5 text-brand" />
              Tip: Tambahkan ke Layar Utama (Homescreen)
            </h4>

            <div className="flex gap-2 border-b border-border-subtle pb-2">
              <button
                type="button"
                onClick={() => setPwaTab("ios")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  pwaTab === "ios" ? "bg-primary text-white" : "text-secondary hover:text-primary"
                }`}
              >
                Pengguna iPhone (iOS)
              </button>
              <button
                type="button"
                onClick={() => setPwaTab("android")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  pwaTab === "android" ? "bg-primary text-white" : "text-secondary hover:text-primary"
                }`}
              >
                Pengguna Android (Chrome)
              </button>
            </div>

            {pwaTab === "ios" ? (
              <ol className="text-xs text-secondary space-y-2 list-decimal list-inside leading-relaxed">
                <li>Buka <b>app.freedomroom.id</b> di browser Safari.</li>
                <li>Tap tombol <b>Share</b> (ikon kotak dengan panah ke atas) di bagian bawah browser.</li>
                <li>Scroll ke bawah lalu pilih menu <b>&quot;Add to Home Screen&quot;</b> (Tambah ke Layar Utama).</li>
                <li>Tap <b>Add</b>. Ikon FreedomRoom kini siap dibuka layaknya aplikasi native!</li>
              </ol>
            ) : (
              <ol className="text-xs text-secondary space-y-2 list-decimal list-inside leading-relaxed">
                <li>Buka <b>app.freedomroom.id</b> di browser Google Chrome.</li>
                <li>Tap ikon <b>menu titik tiga</b> di pojok kanan atas.</li>
                <li>Pilih <b>&quot;Install App&quot;</b> atau <b>&quot;Tambahkan ke Layar Utama&quot;</b>.</li>
                <li>Tap <b>Install</b>. Aplikasi FreedomRoom akan terpasang di menu smartphone Anda.</li>
              </ol>
            )}
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="py-20 sm:py-28 bg-gradient-to-br from-timber-950 via-primary to-timber-900 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <Badge addon="AKSES INSTAN" className="!bg-white/10 !text-brand !border-white/20">
            SIAP UNTUK TRANSIT ATAU STAYCATION?
          </Badge>
          
          <h2 className="font-heading text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Istirahat Nyaman, Privasi Terjaga di Sentul Tower Apartment.
          </h2>

          <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto leading-relaxed font-sans">
            Akses <b>app.freedomroom.id</b> sekarang, pilih unit kamar impian Anda, dan nikmati kemudahan check-in bebas antre.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-3.5">
            <a
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-2xl bg-brand px-7 py-4 text-sm font-black text-primary shadow-2xl hover:bg-brand-hover hover:scale-105 active:scale-95 transition-all group"
            >
              <Icon icon="solar:smartphone-bold" className="w-5 h-5 text-primary" />
              <span>Buka app.freedomroom.id</span>
              <Icon icon="solar:arrow-right-up-linear" className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <Link
              href="/location"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-6 py-4 text-sm font-bold text-white hover:bg-white/20 transition-all backdrop-blur-sm"
            >
              <Icon icon="solar:map-point-bold" className="w-4 h-4 text-brand" />
              <span>Lihat Lokasi Apartemen</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Sticky Mobile CTA Bar */}
      <aside className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md p-3 px-4 border-t border-black/10 shadow-2xl flex items-center justify-between md:hidden">
        <div className="min-w-0">
          <p className="font-heading text-xs font-black text-primary truncate">FreedomRoom App</p>
          <p className="text-[10px] text-brand font-bold font-mono">app.freedomroom.id</p>
        </div>
        <a
          href={APP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-xl bg-brand px-4 py-2 text-xs font-black text-primary shadow-sm hover:bg-brand-hover transition-colors"
        >
          <span>Buka Web App</span>
          <Icon icon="solar:arrow-right-up-linear" className="w-3.5 h-3.5" />
        </a>
      </aside>

      <Footer />
    </main>
  );
}
