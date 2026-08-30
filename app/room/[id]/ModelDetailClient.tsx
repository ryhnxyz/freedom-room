"use client";

import { useState, useEffect } from "react";
import { HouseModel, formatRupiah } from "@/data/houseModels";
import { api, RoomData, ReviewData, ReservationData } from "@/lib/api";
import { computeUnitAvailability } from "@/lib/availability";
import { getCalendarRateInfo } from "@/lib/holidays";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import { ReviewItemSkeleton } from "@/components/Skeleton";
import TourBookingModal from "@/components/TourBookingModal";

interface ModelDetailClientProps {
  model: HouseModel;
}

export default function ModelDetailClient({ model }: ModelDetailClientProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);

  // Live Database Room State
  const [liveRoom, setLiveRoom] = useState<RoomData | null>(null);
  const [allReservations, setAllReservations] = useState<ReservationData[]>([]);
  const [selectedScheduleDate, setSelectedScheduleDate] = useState<string>(new Date().toISOString().split("T")[0]);

  // Live Database Reviews State (100% From VPS Database)
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [loadingReviews, setLoadingReviews] = useState<boolean>(true);

  // New Review Form State
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newRating, setNewRating] = useState<number>(5);
  const [newGuestName, setNewGuestName] = useState<string>("");
  const [newStayType, setNewStayType] = useState<string>("Transit 6 Jam");
  const [newComment, setNewComment] = useState<string>("");
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewSuccessMsg, setReviewSuccessMsg] = useState<string | null>(null);

  // Load Realtime Room Status from VPS
  useEffect(() => {
    async function loadLiveRoom() {
      try {
        const room = await api.getRoomById(model.databaseId);
        if (room) setLiveRoom(room);
      } catch (err) {
        console.warn("Could not fetch live room status:", err);
      }
    }
    loadLiveRoom();
  }, [model.databaseId]);

  // Load Realtime Reviews from VPS (Zero Mock Data)
  useEffect(() => {
    async function loadReviews() {
      setLoadingReviews(true);
      try {
        const liveReviews = await api.getReviews(model.databaseId || model.id);
        if (Array.isArray(liveReviews)) {
          setReviews(liveReviews);
        } else {
          setReviews([]);
        }
      } catch (err) {
        console.warn("Error loading reviews:", err);
        setReviews([]);
      } finally {
        setLoadingReviews(false);
      }
    }
    loadReviews();
  }, [model.databaseId, model.id]);

  // Handle Submit New Review -> VPS PostgreSQL Database
  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuestName.trim() || !newComment.trim()) return;

    setSubmittingReview(true);
    setReviewSuccessMsg(null);

    try {
      const res = await api.createReview({
        room_id: model.databaseId || model.id,
        guest_name: newGuestName.trim(),
        rating: newRating,
        comment: newComment.trim(),
        stay_type: newStayType,
      });

      if (res) {
        setReviews((prev) => [res, ...prev]);
        setNewGuestName("");
        setNewComment("");
        setShowReviewForm(false);
        setReviewSuccessMsg("Ulasan Anda berhasil disimpan ke database VPS. Terima kasih atas feedback Anda!");
        setTimeout(() => setReviewSuccessMsg(null), 6000);
      }
    } catch (err) {
      console.error("Error submitting review:", err);
      alert("Gagal mengirim ulasan ke server. Silakan coba kembali.");
    } finally {
      setSubmittingReview(false);
    }
  };

  const currentVariant = model.variants[selectedVariantIndex] || model.variants[0];
  const activeImage = model.gallery[activeImageIndex] || { url: model.featuredImage, caption: model.name };

  const availabilityInfo = computeUnitAvailability(model.unitNumber, model.name, allReservations, selectedScheduleDate);
  const isAvailable = availabilityInfo.isAvailableNow;

  const displayRate3h = Number(liveRoom?.rate_3h || liveRoom?.rate_transit_3h || model.rateTransit3h || 150000);
  const displayRate6h = Number(liveRoom?.rate_6h || liveRoom?.rate_transit_6h || model.rateTransit6h || 200000);
  const displayRate8h = Number(liveRoom?.rate_8h || liveRoom?.rate_transit_8h || model.rateTransit8h || 250000);
  const displayRateDaily = Number(liveRoom?.rate_daily || liveRoom?.rate_full_day || model.rateFullDay || 350000);

  const currentVariantPrice =
    currentVariant.typeId === "transit-3h"
      ? formatRupiah(displayRate3h)
      : currentVariant.typeId === "transit-6h"
      ? formatRupiah(displayRate6h)
      : currentVariant.typeId === "transit-8h"
      ? formatRupiah(displayRate8h)
      : `${formatRupiah(displayRateDaily)} / Malam`;

  // Average Rating calculation (Real from VPS only)
  const totalReviewsCount = reviews.length;
  const avgRatingNum = totalReviewsCount > 0
    ? (reviews.reduce((acc, r) => acc + Number(r.rating || 5), 0) / totalReviewsCount).toFixed(1)
    : "5.0";

  return (
    <main className="min-h-screen bg-canvas text-primary relative selection:bg-brand selection:text-white pb-24 lg:pb-12">
      <Navbar onOpenScheduleTour={() => setIsTourModalOpen(true)} />

      {/* Breadcrumb & Quick Actions Header */}
      <div className="pt-24 sm:pt-28 pb-4 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto border-b border-border-subtle">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-secondary">
            <Link href="/" className="hover:text-brand transition-colors">Beranda</Link>
            <span>/</span>
            <Link href="/booking" className="hover:text-brand transition-colors">Pilihan Unit</Link>
            <span>/</span>
            <span className="text-primary font-semibold truncate max-w-[200px] sm:max-w-none">{model.name}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: `${model.name} — FreedomRoom Sentul Tower`,
                    url: window.location.href,
                  }).catch(() => {});
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link kamar berhasil disalin ke clipboard!");
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border-subtle bg-surface hover:bg-sand-200 text-xs font-semibold text-secondary transition-all cursor-pointer"
            >
              <Icon icon="solar:share-bold" className="w-3.5 h-3.5 text-brand" />
              <span>Bagikan</span>
            </button>

            <Link
              href="/booking"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border-subtle bg-surface hover:bg-sand-200 text-xs font-semibold text-secondary transition-all"
            >
              <Icon icon="solar:arrow-left-linear" className="w-3.5 h-3.5" />
              <span>Lihat Unit Lain</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-6 sm:pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Gallery & Details (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Gallery Viewport */}
            <div className="space-y-3">
              <div className="relative w-full h-[280px] sm:h-[440px] md:h-[480px] rounded-3xl overflow-hidden border border-border-subtle shadow-lg bg-timber-950">
                <Image
                  src={activeImage.url}
                  alt={activeImage.caption}
                  fill
                  priority
                  className="object-cover transition-all duration-300"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Floating Status & Unit Info */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-brand text-white shadow-md">
                    {model.garage}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-md flex items-center gap-1.5 ${
                    isAvailable ? "bg-emerald-600 text-white" : "bg-amber-600 text-white"
                  }`}>
                    <span className="w-2 h-2 rounded-full bg-white" />
                    <span>{isAvailable ? "Siap Huni (Available)" : liveRoom?.status || "Sedang Disewa"}</span>
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white flex items-end justify-between">
                  <div>
                    <h1 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold drop-shadow-md">
                      {model.name}
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-200 mt-0.5 line-clamp-1 drop-shadow-sm">
                      {activeImage.caption}
                    </p>
                  </div>
                  <span className="text-xs font-mono bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full text-gray-300 border border-white/10 shrink-0">
                    {activeImageIndex + 1} / {model.gallery.length}
                  </span>
                </div>
              </div>

              {/* Gallery Thumbnails */}
              <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-1">
                {model.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-14 sm:w-24 sm:h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? "border-brand ring-2 ring-brand/30 opacity-100 scale-105"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image src={img.url} alt={img.caption} fill className="object-cover" sizes="100px" />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-sand-100 p-2.5 rounded-xl border border-border-subtle">
                <span className="text-[10px] font-mono uppercase text-muted block">Tipe Unit</span>
                <span className="font-bold text-primary text-xs sm:text-sm flex items-center gap-1.5 mt-0.5">
                  <Icon icon="solar:bed-bold" className="w-4 h-4 text-brand" />
                  <span>{model.type}</span>
                </span>
              </div>
              <div className="bg-sand-100 p-2.5 rounded-xl border border-border-subtle">
                <span className="text-[10px] font-mono uppercase text-muted block">Luas Kamar</span>
                <span className="font-bold text-primary text-xs sm:text-sm flex items-center gap-1.5 mt-0.5">
                  <Icon icon="solar:ruler-angular-bold" className="w-4 h-4 text-brand" />
                  <span>{model.sqft} m²</span>
                </span>
              </div>
              <div className="bg-sand-100 p-2.5 rounded-xl border border-border-subtle">
                <span className="text-[10px] font-mono uppercase text-muted block">Lantai Apartemen</span>
                <span className="font-bold text-primary text-xs sm:text-sm flex items-center gap-1.5 mt-0.5">
                  <Icon icon="solar:map-point-bold" className="w-4 h-4 text-brand" />
                  <span>{model.garage}</span>
                </span>
              </div>
              <div className="bg-sand-100 p-2.5 rounded-xl border border-border-subtle">
                <span className="text-[10px] font-mono uppercase text-muted block">Status Server Live</span>
                <span className="font-bold text-xs sm:text-sm flex items-center gap-1 mt-0.5">
                  <span className={`w-2 h-2 rounded-full ${isAvailable ? "bg-brand" : "bg-amber-500"}`} />
                  <span className={isAvailable ? "text-[#b39229]" : "text-amber-800"}>
                    {isAvailable ? "Siap Huni (Available)" : liveRoom?.status || "Booked"}
                  </span>
                </span>
              </div>
            </div>

            {/* Pilihan Paket Sewa */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-primary">Pilihan Durasi Sewa</h2>
                <span className="text-xs text-muted font-medium">Pilih paket untuk kalkulasi</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {model.variants.map((v, idx) => {
                  const active = selectedVariantIndex === idx;
                  const priceStr =
                    v.typeId === "transit-3h"
                      ? formatRupiah(displayRate3h)
                      : v.typeId === "transit-6h"
                      ? formatRupiah(displayRate6h)
                      : v.typeId === "transit-8h"
                      ? formatRupiah(displayRate8h)
                      : `${formatRupiah(displayRateDaily)} / Malam`;

                  return (
                    <div
                      key={v.name}
                      onClick={() => setSelectedVariantIndex(idx)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        active
                          ? "border-brand bg-brand-light shadow-md ring-2 ring-brand/30"
                          : "border-border-subtle bg-surface hover:border-brand/40 hover:bg-sand-100"
                      }`}
                    >
                      <span className="font-heading font-bold text-sm text-primary block">{v.name}</span>
                      <span className="font-mono text-base font-bold text-brand block mt-1">{priceStr}</span>
                      <p className="text-xs text-secondary mt-2 leading-relaxed font-sans">{v.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-primary">Deskripsi Unit & Fasilitas</h2>
              <p className="text-xs sm:text-sm text-secondary leading-relaxed font-sans">
                {model.description}
              </p>
            </div>

            {/* Amenities Checklist */}
            <div className="space-y-3">
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-primary">Fasilitas Termasuk dalam Kamar</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {model.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2.5 p-3 bg-surface rounded-xl border border-border-subtle shadow-xs">
                    <div className="w-5 h-5 rounded-full bg-brand/15 text-brand flex items-center justify-center shrink-0">
                      <Icon icon="solar:check-bold" className="w-3 h-3" />
                    </div>
                    <span className="text-xs font-medium text-primary">{h}</span>
                  </div>
                ))}
              </div>
            </div>

                        {/* ------------------------------------------------------------- */}
            {/* REAL CALENDAR & LIVE SCHEDULE SLOT TRACKER (24 JAM & TANGGAL MERAH) */}
            {/* ------------------------------------------------------------- */}
            <div className="bg-surface rounded-3xl p-6 sm:p-8 border border-border-subtle shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border-subtle pb-4">
                <div>
                  <h3 className="font-heading text-xl font-bold text-primary flex items-center gap-2">
                    <Icon icon="solar:calendar-date-bold" className="w-5 h-5 text-brand" />
                    <span>Jadwal & Ketersediaan Real Kalender</span>
                  </h3>
                  <p className="text-xs text-secondary mt-0.5">
                    Tarif Weekend berlaku khusus Sabtu & Minggu serta Hari Libur Nasional (Tanggal Merah).
                  </p>
                </div>

                <div className={`px-3 py-1 rounded-full text-xs font-semibold w-fit flex items-center gap-1.5 ${
                  availabilityInfo.statusBadgeColor === "emerald"
                    ? "bg-emerald-100 text-emerald-800"
                    : availabilityInfo.statusBadgeColor === "amber"
                    ? "bg-amber-100 text-amber-800"
                    : "bg-rose-100 text-rose-800"
                }`}>
                  <span className={`w-2 h-2 rounded-full ${
                    availabilityInfo.statusBadgeColor === "emerald" ? "bg-emerald-600" : "bg-amber-600"
                  }`} />
                  <span>{availabilityInfo.statusText}</span>
                </div>
              </div>

              {/* Date Selector with Real Calendar Tanggal Merah Indicators */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted block">
                    PILIH TANGGAL (REALTIME KALENDER INDONESIA):
                  </span>
                  {(() => {
                    const cal = getCalendarRateInfo(selectedScheduleDate);
                    return (
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                        cal.badgeTone === "holiday"
                          ? "bg-rose-100 text-rose-800 border border-rose-300"
                          : cal.badgeTone === "weekend"
                          ? "bg-amber-100 text-amber-800 border border-amber-300"
                          : "bg-blue-50 text-blue-800 border border-blue-200"
                      }`}>
                        {cal.label}
                      </span>
                    );
                  })()}
                </div>

                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                  {[0, 1, 2, 3, 4, 5, 6].map((offset) => {
                    const d = new Date();
                    d.setDate(d.getDate() + offset);
                    const ymd = d.toISOString().split("T")[0];
                    const cal = getCalendarRateInfo(ymd);

                    const label =
                      offset === 0
                        ? "Hari Ini"
                        : offset === 1
                        ? "Besok"
                        : `${cal.dayName}`;

                    const isSelected = selectedScheduleDate === ymd;

                    return (
                      <button
                        key={ymd}
                        type="button"
                        onClick={() => setSelectedScheduleDate(ymd)}
                        className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex flex-col items-center gap-0.5 ${
                          isSelected
                            ? "bg-brand text-white shadow-sm ring-2 ring-brand/30"
                            : "bg-canvas border border-border-subtle text-secondary hover:text-primary hover:bg-sand-100"
                        }`}
                      >
                        <span className="font-bold">{label}</span>
                        <span className={`text-[10px] ${
                          isSelected ? "text-white/80" : cal.isHoliday ? "text-rose-600 font-bold" : cal.isSaturdayOrSunday ? "text-amber-700 font-semibold" : "text-muted"
                        }`}>
                          {d.toLocaleDateString("id-ID", { day: "numeric", month: "short" })}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {availabilityInfo.todaySlots.map((slot) => (
                  <div
                    key={slot.id}
                    className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between space-y-2.5 ${
                      slot.isAvailable
                        ? "bg-canvas border-border-subtle hover:border-brand/40"
                        : "bg-sand-200/60 border-border-subtle/80 opacity-75"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-xs text-primary">{slot.timeRange}</span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        slot.isAvailable
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}>
                        {slot.isAvailable ? "Tersedia" : "Terisi"}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-heading font-bold text-xs text-primary">{slot.label}</h4>
                      <p className="text-[11px] text-muted mt-0.5">
                        {slot.isAvailable
                          ? "Slot terbuka untuk booking instan"
                          : slot.reason || "Sedang digunakan tamu"}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-border-subtle flex justify-end">
                      {slot.isAvailable ? (
                        <button
                          type="button"
                          onClick={() => setIsTourModalOpen(true)}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-brand hover:underline cursor-pointer"
                        >
                          <span>Pesan Slot Ini</span>
                          <Icon icon="solar:arrow-right-linear" className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <span className="text-[10px] font-mono text-muted">Slot Terisi</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-sand-100 rounded-2xl border border-border-subtle flex items-center justify-between text-xs">
                <span className="text-secondary flex items-center gap-1.5">
                  <Icon icon="solar:info-circle-bold" className="w-4 h-4 text-brand shrink-0" />
                  <span>Kalkulasi tarif weekend otomatis aktif pada Sabtu, Minggu & Tanggal Merah resmi.</span>
                </span>
                <span className="font-mono text-[10px] text-muted shrink-0 font-bold">24 JAM STANDBY</span>
              </div>
            </div>

            {/* REALTIME GUEST REVIEWS SECTION (100% REAL FROM VPS DATABASE) */}
            <div className="pt-6 border-t border-border-subtle space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand" />
                    <span className="text-[10px] font-mono font-bold tracking-widest text-brand uppercase">
                      SISTEM REVIEW REALTIME (VPS DATABASE)
                    </span>
                  </div>
                  <h2 className="font-heading text-2xl font-bold text-primary">
                    Ulasan & Pengalaman Tamu
                  </h2>
                </div>

                <Button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  variant="primary"
                  size="sm"
                  icon="solar:pen-bold"
                >
                  {showReviewForm ? "Tutup Form Ulasan" : "Tulis Ulasan Tamu"}
                </Button>
              </div>

              {/* Review Success Alert */}
              {reviewSuccessMsg && (
                <div className="p-4 rounded-2xl bg-brand-light border border-brand text-primary text-xs flex items-center gap-3 animate-in fade-in duration-300">
                  <Icon icon="solar:check-circle-bold" className="w-5 h-5 text-brand shrink-0" />
                  <span className="font-semibold">{reviewSuccessMsg}</span>
                </div>
              )}

              {/* Form Tulis Ulasan (Collapsible) */}
              {showReviewForm && (
                <form
                  onSubmit={handleReviewSubmit}
                  className="bg-surface p-5 sm:p-6 rounded-3xl border border-brand/40 shadow-md space-y-4 animate-in fade-in duration-300"
                >
                  <div className="space-y-1">
                    <h3 className="font-heading text-lg font-bold text-primary">Tulis Ulasan Tamu</h3>
                    <p className="text-xs text-secondary">Bagikan testimoni pengalaman menginap Anda di unit {model.name}.</p>
                  </div>

                  {/* Rating Selector */}
                  <div className="space-y-1">
                    <label className="block font-semibold text-primary text-xs">Rating Bintang</label>
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          className="p-1 text-2xl transition-transform hover:scale-125 cursor-pointer"
                        >
                          <Icon
                            icon="solar:star-bold"
                            className={`w-6 h-6 ${star <= newRating ? "text-amber-500" : "text-gray-300"}`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-bold text-brand ml-2">{newRating}.0 / 5.0</span>
                    </div>
                  </div>

                  {/* Guest Name & Stay Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-primary text-xs mb-1">Nama Lengkap Anda</label>
                      <input
                        required
                        type="text"
                        placeholder="Contoh: Rian Pratama"
                        value={newGuestName}
                        onChange={(e) => setNewGuestName(e.target.value)}
                        className="w-full bg-canvas border border-border-subtle rounded-xl px-3.5 py-2 text-xs text-primary focus:outline-none focus:ring-2 focus:ring-brand/30"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-primary text-xs mb-1">Paket yang Disewa</label>
                      <select
                        value={newStayType}
                        onChange={(e) => setNewStayType(e.target.value)}
                        className="w-full bg-canvas border border-border-subtle rounded-xl px-3.5 py-2 text-xs text-primary focus:outline-none focus:ring-2 focus:ring-brand/30"
                      >
                        <option value="Transit 3 Jam">Transit 3 Jam</option>
                        <option value="Transit 6 Jam">Transit 6 Jam</option>
                        <option value="Transit 8 Jam">Transit 8 Jam</option>
                        <option value="Full Day (Check-in 13:00)">Full Day (Check-in 13:00)</option>
                        <option value="Full Day (Check-in 21:00)">Full Day (Check-in 21:00)</option>
                      </select>
                    </div>
                  </div>

                  {/* Comment Textarea */}
                  <div>
                    <label className="block font-semibold text-primary text-xs mb-1">Ulasan / Testimoni Lengkap</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Ceritakan kenyamanan kasur, kebersihan kamar, kecepatan WiFi, atau respon CS..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="w-full bg-canvas border border-border-subtle rounded-xl px-3.5 py-2 text-xs text-primary focus:outline-none focus:ring-2 focus:ring-brand/30 resize-none"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(false)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-secondary hover:text-primary transition-colors cursor-pointer"
                    >
                      Batal
                    </button>
                    <Button
                      type="submit"
                      variant="primary"
                      size="sm"
                      disabled={submittingReview}
                      icon="solar:plain-bold"
                    >
                      {submittingReview ? "Menyimpan ke Server..." : "Kirim Ulasan Sekarang"}
                    </Button>
                  </div>
                </form>
              )}

              {/* Reviews List from VPS */}
              <div className="space-y-3.5">
                {loadingReviews ? (
                  <div className="py-8 text-center text-xs text-secondary">
                    <Icon icon="solar:refresh-circle-bold" className="w-6 h-6 animate-spin mx-auto text-brand mb-1" />
                    <span>Memuat ulasan live dari database VPS...</span>
                  </div>
                ) : reviews.length === 0 ? (
                  <div className="p-8 text-center bg-surface rounded-3xl border border-border-subtle space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-sand-200 text-brand flex items-center justify-center mx-auto">
                      <Icon icon="solar:chat-line-linear" className="w-6 h-6 text-secondary" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-heading font-bold text-sm text-primary">Belum Ada Ulasan untuk Kamar Ini</h4>
                      <p className="text-xs text-secondary max-w-sm mx-auto leading-relaxed">
                        Jadilah tamu pertama yang membagikan pengalaman menginap di unit {model.name}!
                      </p>
                    </div>
                    <Button
                      onClick={() => setShowReviewForm(true)}
                      variant="primary"
                      size="sm"
                      icon="solar:pen-bold"
                    >
                      Tulis Ulasan Pertama
                    </Button>
                  </div>
                ) : (
                  reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-5 bg-surface rounded-2xl border border-border-subtle shadow-xs space-y-2.5 transition-all hover:border-brand/30"
                    >
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-brand text-white font-bold flex items-center justify-center text-xs shadow-xs uppercase">
                            {rev.guest_name.slice(0, 2)}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h4 className="font-heading font-bold text-sm text-primary">{rev.guest_name}</h4>
                              {rev.is_verified && (
                                <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded-full">
                                  <Icon icon="solar:verified-check-bold" className="w-3 h-3 text-emerald-600" />
                                  <span>Tamu Terverifikasi</span>
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-[11px] text-muted">
                              <span>{rev.stay_type || "Tamu Menginap"}</span>
                              <span>•</span>
                              <span>{rev.date}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                          <Icon icon="solar:star-bold" className="w-3.5 h-3.5 text-amber-500" />
                          <span className="font-bold text-amber-900 text-xs">{Number(rev.rating).toFixed(1)}</span>
                        </div>
                      </div>

                      <p className="text-xs text-secondary leading-relaxed font-sans pl-12">
                        &ldquo;{rev.comment}&rdquo;
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

          {/* Right Sidebar: Booking Card (Desktop) */}
          <div className="hidden lg:block lg:col-span-4 bg-surface rounded-3xl p-6 border border-border-subtle shadow-xl space-y-5 sticky top-28">
            <div className="border-b border-border-subtle pb-4 space-y-1">
              <span className="text-[10px] font-mono uppercase text-muted block">PAKET DIPILIH</span>
              <h3 className="font-heading font-bold text-lg text-primary">{currentVariant.name}</h3>
              <p className="font-display text-3xl font-bold text-brand mt-1">{currentVariantPrice}</p>
              <p className="text-xs text-secondary">Unit {model.garage} · Sentul Tower</p>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1.5 border-b border-border-subtle">
                <span className="text-secondary">Status Ketersediaan</span>
                <span className={`font-bold ${isAvailable ? "text-brand" : "text-amber-700"}`}>
                  {isAvailable ? "Siap Dipesan (Available)" : "Unit Terisi (Booked)"}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-border-subtle">
                <span className="text-secondary">Rating Kamar</span>
                <span className="font-bold text-primary flex items-center gap-1">
                  {totalReviewsCount > 0 ? (
                    <>
                      <Icon icon="solar:star-bold" className="w-3.5 h-3.5 text-amber-500" />
                      <span>{avgRatingNum} ({totalReviewsCount} Ulasan)</span>
                    </>
                  ) : (
                    <span className="text-muted font-normal">Belum ada ulasan</span>
                  )}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-border-subtle">
                <span className="text-secondary">Layanan Check-in</span>
                <span className="font-semibold text-primary">Standby 24 Jam</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-border-subtle">
                <span className="text-secondary">Fasilitas</span>
                <span className="font-semibold text-primary">Smart TV, WiFi, AC, Water Heater</span>
              </div>
            </div>

            <Button
              onClick={() => setIsTourModalOpen(true)}
              variant="primary"
              size="lg"
              className="w-full justify-center"
              icon="solar:calendar-bold"
            >
              Booking Kamar Ini Sekarang
            </Button>

            <a
              href={`https://wa.me/6287878906899?text=${encodeURIComponent(
                `Halo Admin FreedomRoom, saya ingin reservasi unit ${model.name} (${model.garage}) untuk paket ${currentVariant.name}. Apakah kamar tersedia?`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-xs font-semibold text-secondary hover:text-primary transition-colors py-1.5"
            >
              <Icon icon="solar:chat-round-call-bold" className="w-4 h-4 text-[#25D366]" />
              <span>Tanya Ketersediaan via WhatsApp</span>
            </a>
          </div>

        </div>
      </div>

      {/* Mobile Sticky Booking Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 p-3.5 bg-surface/95 backdrop-blur-xl border-t border-border-subtle flex items-center justify-between shadow-2xl">
        <div>
          <span className="text-[10px] font-mono text-muted uppercase block">{currentVariant.name}</span>
          <span className="font-heading font-bold text-base text-brand">{currentVariantPrice}</span>
        </div>

        <Button
          onClick={() => setIsTourModalOpen(true)}
          variant="primary"
          size="md"
          icon="solar:calendar-bold"
        >
          Booking Sekarang
        </Button>
      </div>

      <Footer />

      {/* Unified Booking Modal */}
      <TourBookingModal
        isOpen={isTourModalOpen}
        onClose={() => setIsTourModalOpen(false)}
        initialModelName={model.name}
        initialPlotNumber={model.unitNumber}
      />
    </main>
  );
}
