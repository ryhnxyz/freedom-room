"use client";

import { useState, useEffect, useRef } from "react";
import { HOUSE_MODELS, formatRupiah, calculateRoomPrice } from "@/data/houseModels";
import { getCalendarRateInfo } from "@/lib/holidays";
import { api, RoomData, ReservationData } from "@/lib/api";
import { Icon } from "@iconify/react";
import Button from "@/components/Button";
import { useLenis } from "lenis/react";
import gsap from "gsap";

interface TourBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialModelName?: string;
  initialPlotNumber?: string;
}

const HOURS_DATA = [
  {
    category: "Pagi",
    icon: "solar:sun-2-bold",
    hours: ["06:00", "07:00", "08:00", "09:00", "10:00", "11:00"],
  },
  {
    category: "Siang",
    icon: "solar:sun-bold",
    hours: ["12:00", "13:00", "14:00", "15:00"],
  },
  {
    category: "Sore",
    icon: "solar:sunset-bold",
    hours: ["16:00", "17:00"],
  },
  {
    category: "Malam",
    icon: "solar:moon-bold",
    hours: ["18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
  },
  {
    category: "Dini Hari",
    icon: "solar:stars-bold",
    hours: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00"],
  },
];

export default function TourBookingModal({
  isOpen,
  onClose,
  initialModelName,
  initialPlotNumber,
}: TourBookingModalProps) {
  const [isRendered, setIsRendered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const lenis = useLenis();

  // Rooms Data
  const [rooms, setRooms] = useState<RoomData[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState<string>("");

  // Booking Form State
  const [packageType, setPackageType] = useState<"transit-3h" | "transit-6h" | "transit-8h" | "fullday">("transit-3h");
  const [checkInDate, setCheckInDate] = useState<string>("");
  const [checkInTime, setCheckInTime] = useState<string>("14:00");
  const [nights, setNights] = useState<number>(1);
  const [fullName, setFullName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("Transfer Bank BCA");
  const [notes, setNotes] = useState<string>("");

  // Time Picker Modal State
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);

  // Success Confirmation State
  const [confirmedReservation, setConfirmedReservation] = useState<ReservationData | null>(null);

  // Refs for animation
  const modalOverlayRef = useRef<HTMLDivElement>(null);
  const sheetContainerRef = useRef<HTMLDivElement>(null);
  const scrollableBodyRef = useRef<HTMLDivElement>(null);

  // Initialize Default Check-in datetime
  useEffect(() => {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, "0");
    const todayStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
    const nextHour = (now.getHours() + 1) % 24;
    setCheckInDate(todayStr);
    setCheckInTime(`${pad(nextHour)}:00`);
  }, []);

  // Fetch Live Rooms from VPS Database
  useEffect(() => {
    async function loadRooms() {
      try {
        const liveRooms = await api.getRooms();
        if (Array.isArray(liveRooms) && liveRooms.length > 0) {
          setRooms(liveRooms);
          if (initialPlotNumber) {
            const found = liveRooms.find((r) => r.unit_number === initialPlotNumber);
            if (found) setSelectedRoomId(found.id);
          } else if (initialModelName) {
            const found = liveRooms.find((r) => r.name.toLowerCase().includes(initialModelName.toLowerCase()));
            if (found) setSelectedRoomId(found.id);
          } else if (!selectedRoomId) {
            setSelectedRoomId(liveRooms[0].id);
          }
        }
      } catch (err) {
        console.warn("Fallback to local rooms schema:", err);
      }
    }
    loadRooms();
  }, [initialModelName, initialPlotNumber]);

  // Sync initial selection when modal opens
  useEffect(() => {
    if (initialPlotNumber) {
      const match = HOUSE_MODELS.find((m) => m.unitNumber === initialPlotNumber);
      if (match) setSelectedRoomId(match.databaseId);
    } else if (initialModelName) {
      const match = HOUSE_MODELS.find((m) => m.name.toLowerCase().includes(initialModelName.toLowerCase()));
      if (match) setSelectedRoomId(match.databaseId);
    } else if (!selectedRoomId) {
      setSelectedRoomId(HOUSE_MODELS[0].databaseId);
    }
  }, [isOpen, initialModelName, initialPlotNumber]);

  // Selected Room Data helper
  const selectedRoomDb = rooms.find((r) => r.id === selectedRoomId);
  const selectedRoomLocal = HOUSE_MODELS.find((m) => m.databaseId === selectedRoomId || m.id === selectedRoomId) || HOUSE_MODELS[0];
  const activeRoomObj = selectedRoomDb || selectedRoomLocal;

  // Calculate Price Dynamically based on date (Weekday/Weekend) and Unit Category
  const calendarRateInfo = getCalendarRateInfo(checkInDate);
  const isSelectedWeekend = calendarRateInfo.isWeekendRate;
  const isFullday = packageType === "fullday";
  const durationHours = packageType === "transit-3h" ? 3 : packageType === "transit-6h" ? 6 : packageType === "transit-8h" ? 8 : 24;
  const totalPrice = calculateRoomPrice(activeRoomObj, packageType, checkInDate, isFullday ? nights : 1);

  // Compute Check-out Time
  const calculateCheckOutDisplay = () => {
    if (isFullday) {
      return "Pkl 12:00 WIB (Besok Siang)";
    }
    const [h, m] = checkInTime.split(":").map(Number);
    const endH = (h + durationHours) % 24;
    const isNextDay = h + durationHours >= 24;
    return `Pkl ${endH.toString().padStart(2, "0")}:${(m || 0).toString().padStart(2, "0")} WIB${isNextDay ? " (+1 Hari)" : ""}`;
  };

  // Handle Lenis Scroll Lock and GSAP Modal Animations
  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      if (lenis) lenis.stop();
      document.body.style.overflow = "hidden";

      requestAnimationFrame(() => {
        if (modalOverlayRef.current && sheetContainerRef.current) {
          gsap.fromTo(
            modalOverlayRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.25, ease: "power2.out" }
          );
          gsap.fromTo(
            sheetContainerRef.current,
            { y: 30, opacity: 0, scale: 0.98 },
            { y: 0, opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.1)" }
          );
        }
      });
    } else if (isRendered) {
      if (modalOverlayRef.current && sheetContainerRef.current) {
        gsap.to(sheetContainerRef.current, {
          y: 20,
          opacity: 0,
          scale: 0.98,
          duration: 0.2,
          ease: "power2.in",
        });
        gsap.to(modalOverlayRef.current, {
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
          onComplete: () => {
            setIsRendered(false);
            if (lenis) lenis.start();
            document.body.style.overflow = "unset";
          },
        });
      } else {
        setIsRendered(false);
        if (lenis) lenis.start();
        document.body.style.overflow = "unset";
      }
      setConfirmedReservation(null);
      setErrorMsg(null);
      setIsTimePickerOpen(false);
    }
  }, [isOpen, isRendered, lenis]);

  const packageLabel =
    packageType === "transit-3h"
      ? "Transit 3 Jam"
      : packageType === "transit-6h"
      ? "Transit 6 Jam"
      : packageType === "transit-8h"
      ? "Transit 8 Jam"
      : `Full Day Menginap (${nights} Malam) [Start 13:00]`;

  // Form Submit Handler -> VPS Database
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !checkInDate) return;

    setLoading(true);
    setErrorMsg(null);

    try {
      const checkInDateTime = new Date(`${checkInDate}T${isFullday ? "13:00" : checkInTime}:00`);
      const checkOutDateTime = new Date(checkInDateTime.getTime());

      let checkOutTimeStr = "12:00";
      if (packageType === "transit-3h") {
        checkOutDateTime.setHours(checkOutDateTime.getHours() + 3);
        checkOutTimeStr = `${checkOutDateTime.getHours().toString().padStart(2, "0")}:${checkOutDateTime.getMinutes().toString().padStart(2, "0")}`;
      } else if (packageType === "transit-6h") {
        checkOutDateTime.setHours(checkOutDateTime.getHours() + 6);
        checkOutTimeStr = `${checkOutDateTime.getHours().toString().padStart(2, "0")}:${checkOutDateTime.getMinutes().toString().padStart(2, "0")}`;
      } else if (packageType === "transit-8h") {
        checkOutDateTime.setHours(checkOutDateTime.getHours() + 8);
        checkOutTimeStr = `${checkOutDateTime.getHours().toString().padStart(2, "0")}:${checkOutDateTime.getMinutes().toString().padStart(2, "0")}`;
      } else if (isFullday) {
        checkOutDateTime.setDate(checkOutDateTime.getDate() + Math.max(1, nights));
        checkOutTimeStr = "12:00";
      }

      const payload = {
        guest: fullName.trim(),
        phone: phone.trim(),
        email: `${fullName.toLowerCase().replace(/\s+/g, "")}@gmail.com`,
        package: `${packageLabel} [${isSelectedWeekend ? "Weekend" : "Weekday"}]`,
        type: `${packageLabel} [${isSelectedWeekend ? "Weekend" : "Weekday"}]`,
        unit_id: selectedRoomId || "one-bed-deluxe-lt-10-room102",
        unit_name: selectedRoomDb?.name || selectedRoomLocal.name,
        unit_code: selectedRoomDb?.unit_number || selectedRoomLocal.unitNumber,
        check_in: checkInDateTime.toISOString(),
        check_out: checkOutDateTime.toISOString(),
        check_in_time: isFullday ? "13:00" : checkInTime,
        check_out_time: checkOutTimeStr,
        guests: 2,
        status: "Active (In-Room)",
        source: "Website Tumbuh App",
        payment_method: paymentMethod,
        payment_status: "Lunas",
        total: totalPrice,
        notes: notes.trim(),
      };

      const res = await api.createReservation(payload);
      if (res && res.ref) {
        setConfirmedReservation(res);
      } else {
        throw new Error("Reservasi tidak mengembalikan data ref.");
      }
    } catch (err: any) {
      console.error("Booking error:", err);
      setErrorMsg(err.message || "Gagal menyimpan reservasi ke server database. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const handleSendWhatsApp = () => {
    if (!confirmedReservation) return;
    const phoneNo = "62895325608444";
    const text = `Halo Admin FreedomRoom, saya sudah booking kamar via website:%0A%0A*Kode Booking:* ${confirmedReservation.ref}%0A*Nama Tamu:* ${confirmedReservation.guest}%0A*Unit Kamar:* ${confirmedReservation.unit_code} - ${confirmedReservation.unit_name}%0A*Paket:* ${confirmedReservation.package}%0A*Jadwal Check-in:* ${checkInDate} (Pkl ${isFullday ? "13:00" : checkInTime} WIB)%0A*Total Bayar:* ${formatRupiah(confirmedReservation.total)}%0A*Metode Bayar:* ${confirmedReservation.payment_method}%0A%0AMohon info pengambilan akses kartu kunci & panduan check-in. Terima kasih!`;
    window.open(`https://wa.me/${phoneNo}?text=${text}`, "_blank");
  };

  if (!isRendered) return null;

  return (
    <div
      ref={modalOverlayRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-md overflow-hidden"
    >
      <div
        ref={sheetContainerRef}
        onClick={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        style={{ maxHeight: "92vh", height: "auto" }}
        className="bg-canvas w-full max-w-lg rounded-3xl border border-border-subtle shadow-2xl relative flex flex-col min-h-0 z-10 will-change-transform overflow-hidden my-auto"
      >
        {/* Header */}
        <div className="bg-surface px-5 sm:px-6 py-4 border-b border-border-subtle flex items-center justify-between sticky top-0 z-20 shrink-0 shadow-xs">
          <div className="space-y-0.5">
            <h2 id="booking-modal-title" className="font-heading text-base sm:text-lg font-bold text-primary">
              {confirmedReservation ? "Konfirmasi Booking Berhasil!" : "Pesan Kamar Sentul Tower"}
            </h2>
            <p className="text-[11px] text-muted">
              {confirmedReservation ? "Detail pemesanan tercatat di database" : "Layanan Booking Fleksibel 24 Jam"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-sand-200 hover:bg-sand-300 border border-border-subtle text-primary flex items-center justify-center transition-all cursor-pointer"
            aria-label="Tutup modal"
          >
            <Icon icon="solar:close-circle-bold" className="w-5 h-5 text-secondary" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div
          ref={scrollableBodyRef}
          data-lenis-prevent="true"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          style={{
            overflowY: "auto",
            flex: "1 1 auto",
            minHeight: 0,
            WebkitOverflowScrolling: "touch",
          }}
          className="modal-scrollbar p-5 sm:p-6 space-y-4 text-xs select-text overscroll-contain"
        >
          {confirmedReservation ? (
            /* Confirmation View */
            <div className="py-3 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-14 h-14 rounded-2xl bg-brand/15 text-brand flex items-center justify-center mx-auto shadow-md ring-4 ring-brand/30">
                <Icon icon="solar:check-circle-bold" className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-brand block">
                  RESERVASI TERCATAT SUKSES
                </span>
                <h3 className="font-heading text-xl font-bold text-primary">
                  Terima Kasih, {confirmedReservation.guest}!
                </h3>
                <p className="text-xs text-secondary max-w-sm mx-auto leading-relaxed">
                  Pemesanan kamar Anda telah tersimpan. Silakan konfirmasi via WhatsApp untuk pengambilan kartu akses & kunci kamar.
                </p>
              </div>

              {/* Receipt Summary */}
              <div className="bg-surface rounded-2xl p-4 border border-border-subtle text-left space-y-2 shadow-xs text-xs">
                <div className="flex justify-between pb-1.5 border-b border-border-subtle">
                  <span className="text-muted">Kode Booking</span>
                  <span className="font-mono font-bold text-brand text-sm">{confirmedReservation.ref}</span>
                </div>
                <div className="flex justify-between pb-1.5 border-b border-border-subtle">
                  <span className="text-muted">Unit Kamar</span>
                  <span className="font-semibold text-primary">{confirmedReservation.unit_code} - {confirmedReservation.unit_name}</span>
                </div>
                <div className="flex justify-between pb-1.5 border-b border-border-subtle">
                  <span className="text-muted">Paket Sewa</span>
                  <span className="font-semibold text-primary">{confirmedReservation.package}</span>
                </div>
                <div className="flex justify-between pt-1 font-bold text-sm">
                  <span className="text-primary">Total Biaya</span>
                  <span className="text-brand font-display">{formatRupiah(confirmedReservation.total)}</span>
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                fullWidth
                iconLeading="solar:chat-round-dots-bold"
                onClick={handleSendWhatsApp}
                className="bg-[#25D366] hover:bg-[#1EBE5D] border-transparent text-white font-bold"
              >
                Konfirmasi Booking ke WhatsApp CS
              </Button>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              
              {errorMsg && (
                <div className="p-3 bg-rose-50 text-rose-800 border border-rose-200 rounded-xl text-xs flex items-center gap-2">
                  <Icon icon="solar:danger-triangle-bold" className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* 1. Unit Info Terkunci (Per-Room Context) */}
              <div className="bg-surface p-3.5 rounded-2xl border border-border-subtle flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand/15 text-brand flex items-center justify-center font-bold font-mono text-xs shrink-0 border border-brand/30">
                    {selectedRoomLocal.unitNumber}
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-xs sm:text-sm text-primary leading-tight">
                      {selectedRoomDb?.name || selectedRoomLocal.name}
                    </h3>
                    <p className="text-[11px] text-muted mt-0.5">
                      {selectedRoomLocal.type} · {selectedRoomLocal.floor} · Sentul Tower
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  Unit Terpilih
                </span>
              </div>

              {/* 2. Pilih Paket Sewa (Pilihan Jelas & Simple) */}
              <div className="space-y-2">
                <label className="block font-semibold text-primary text-xs">
                  1. Pilih Paket Durasi Sewa
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    {
                      id: "transit-3h",
                      label: "Transit 3 Jam",
                      desc: "24 Jam Fleksibel",
                      price: calculateRoomPrice(activeRoomObj, "transit-3h", checkInDate),
                    },
                    {
                      id: "transit-6h",
                      label: "Transit 6 Jam",
                      desc: isSelectedWeekend ? "Weekend rate" : "Weekday rate",
                      price: calculateRoomPrice(activeRoomObj, "transit-6h", checkInDate),
                    },
                    {
                      id: "transit-8h",
                      label: "Transit 8 Jam",
                      desc: "Daypass Santai",
                      price: calculateRoomPrice(activeRoomObj, "transit-8h", checkInDate),
                    },
                    {
                      id: "fullday",
                      label: "Full Day (Menginap)",
                      desc: "Start Jam 13:00",
                      price: calculateRoomPrice(activeRoomObj, "fullday", checkInDate),
                    },
                  ].map((p) => {
                    const active = packageType === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPackageType(p.id as any)}
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-1.5 ${
                          active
                            ? "border-brand bg-brand-light font-bold ring-2 ring-brand/30 shadow-xs"
                            : "border-border-subtle bg-surface hover:bg-sand-100 text-secondary"
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="font-heading font-bold text-xs text-primary">{p.label}</span>
                          {active && <Icon icon="solar:check-circle-bold" className="w-4 h-4 text-brand" />}
                        </div>
                        <div className="flex items-baseline justify-between w-full pt-1 border-t border-border-subtle/60">
                          <span className="text-[10px] text-muted truncate">{p.desc}</span>
                          <span className="font-mono font-bold text-brand text-xs">
                            {formatRupiah(p.price)}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Tanggal & Jam (Jadwal Bersih & Tidak Bikin Pusing) */}
              <div className="space-y-2.5 bg-surface p-3.5 sm:p-4 rounded-2xl border border-border-subtle">
                <div className="flex items-center justify-between">
                  <label className="block font-semibold text-primary text-xs">
                    2. Jadwal Check-in & Tanggal
                  </label>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                    calendarRateInfo.badgeTone === "holiday"
                      ? "bg-rose-100 text-rose-800 border border-rose-300"
                      : calendarRateInfo.badgeTone === "weekend"
                      ? "bg-amber-100 text-amber-800 border border-amber-300"
                      : "bg-blue-50 text-blue-800 border border-blue-200"
                  }`}>
                    {calendarRateInfo.label}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {/* Tanggal Input */}
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-muted mb-1">Pilih Tanggal</label>
                    <input
                      required
                      type="date"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      className="w-full bg-canvas border border-border-subtle rounded-xl px-3 py-2 text-xs text-primary focus:outline-none focus:ring-2 focus:ring-brand/30 font-medium"
                    />
                  </div>

                  {/* Jam Selector: Khusus Transit pakai Modal Selector Jam, Full Day Otomatis  */}
                  <div>
                    {isFullday ? (
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-muted mb-1">Durasi Menginap</label>
                        <div className="flex items-center gap-2 bg-canvas border border-border-subtle rounded-xl p-1">
                          <button
                            type="button"
                            onClick={() => setNights(Math.max(1, nights - 1))}
                            className="w-7 h-7 rounded-lg bg-sand-200 hover:bg-sand-300 flex items-center justify-center font-bold text-primary cursor-pointer"
                          >
                            -
                          </button>
                          <span className="flex-1 text-center font-bold text-xs text-primary">
                            {nights} Malam
                          </span>
                          <button
                            type="button"
                            onClick={() => setNights(nights + 1)}
                            className="w-7 h-7 rounded-lg bg-sand-200 hover:bg-sand-300 flex items-center justify-center font-bold text-primary cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-muted mb-1">Jam Masuk (24 Jam)</label>
                        <button
                          type="button"
                          onClick={() => setIsTimePickerOpen(true)}
                          className="w-full bg-canvas border border-border-subtle hover:border-brand/50 rounded-xl px-3 py-2 text-xs text-primary flex items-center justify-between cursor-pointer transition-colors shadow-2xs"
                        >
                          <span className="font-mono font-bold flex items-center gap-1.5 text-brand">
                            <Icon icon="solar:clock-circle-bold" className="w-3.5 h-3.5" />
                            Pkl {checkInTime} WIB
                          </span>
                          <span className="text-[11px] font-semibold text-secondary flex items-center gap-0.5">
                            Ubah <Icon icon="solar:alt-arrow-down-linear" className="w-3 h-3" />
                          </span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Banner Rincian Jam Otomatis */}
                <div className="p-2.5 bg-sand-100 rounded-xl border border-border-subtle flex items-center justify-between text-[11px]">
                  <div className="space-y-0.5">
                    <span className="font-bold text-primary block">
                      {isFullday
                        ? "Check-in: Mulai 13:00 WIB"
                        : `Masuk: Pkl ${checkInTime} WIB ➔ Keluar: ${calculateCheckOutDisplay()}`}
                    </span>
                    <span className="text-muted block text-[10px]">
                      {isFullday
                        ? `Check-out: Besok Siang Pkl 12:00 WIB (${nights} Malam)`
                        : `Durasi Sewa ${durationHours} Jam Penuh (Sterilisasi Kamar Higienis)`}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] font-bold text-brand bg-brand/15 px-2 py-0.5 rounded-full shrink-0">
                    24 JAM AKTIF
                  </span>
                </div>
              </div>

              {/* 4. Data Tamu Sederhana (Hanya Nama & WhatsApp) */}
              <div className="space-y-2">
                <label className="block font-semibold text-primary text-xs">
                  3. Data Pemesan
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <input
                    required
                    type="text"
                    placeholder="Nama Lengkap Tamu"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-surface border border-border-subtle rounded-xl px-3.5 py-2 text-xs text-primary focus:outline-none focus:ring-2 focus:ring-brand/30"
                  />
                  <input
                    required
                    type="tel"
                    placeholder="No. WhatsApp (08xxxxxxxxxx)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-surface border border-border-subtle rounded-xl px-3.5 py-2 text-xs text-primary focus:outline-none focus:ring-2 focus:ring-brand/30"
                  />
                </div>
              </div>

              {/* 5. Total & Tombol Pesan Langsung */}
              <div className="pt-2 border-t border-border-subtle space-y-3">
                <div className="flex items-center justify-between bg-sand-100 p-3 rounded-2xl border border-border-subtle">
                  <div>
                    <span className="text-[10px] text-muted uppercase font-bold block">Total Pembayaran</span>
                    <span className="text-[11px] text-secondary">
                      {isFullday ? `Menginap ${nights} Malam` : `Paket ${durationHours} Jam`} · {isSelectedWeekend ? "Weekend/Libur" : "Weekday"}
                    </span>
                  </div>
                  <span className="font-display text-xl sm:text-2xl font-bold text-brand">
                    {formatRupiah(totalPrice)}
                  </span>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  disabled={loading}
                  isLoading={loading}
                  iconLeading="solar:calendar-mark-bold"
                  className="font-bold shadow-md"
                >
                  Konfirmasi & Booking Kamar
                </Button>
              </div>

            </form>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* VISUAL TIME PICKER MODAL (MODAL SELECTOR JAM 24 JAM) */}
      {/* ------------------------------------------------------------- */}
      {isTimePickerOpen && (
        <div
          onClick={() => setIsTimePickerOpen(false)}
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-surface w-full max-w-sm rounded-3xl border border-border-subtle shadow-2xl p-5 space-y-4 animate-in zoom-in-95 duration-200 max-h-[85vh] overflow-y-auto modal-scrollbar"
          >
            <div className="flex items-center justify-between border-b border-border-subtle pb-3">
              <div className="space-y-0.5">
                <h3 className="font-heading font-bold text-sm text-primary flex items-center gap-1.5">
                  <Icon icon="solar:clock-circle-bold" className="w-4 h-4 text-brand" />
                  <span>Pilih Jam Masuk Check-in</span>
                </h3>
                <p className="text-[10px] text-muted">Layanan check-in standby 24 jam penuh</p>
              </div>
              <button
                type="button"
                onClick={() => setIsTimePickerOpen(false)}
                className="w-7 h-7 rounded-full bg-sand-200 flex items-center justify-center text-secondary hover:text-primary cursor-pointer"
              >
                <Icon icon="solar:close-circle-bold" className="w-4 h-4" />
              </button>
            </div>

            {/* Time Slots Grid Grouped by Period */}
            <div className="space-y-3.5">
              {HOURS_DATA.map((grp) => (
                <div key={grp.category} className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted flex items-center gap-1">
                    <Icon icon={grp.icon} className="w-3.5 h-3.5 text-brand" />
                    <span>{grp.category}</span>
                  </span>
                  <div className="grid grid-cols-4 gap-1.5">
                    {grp.hours.map((h) => {
                      const isSelected = checkInTime === h;
                      return (
                        <button
                          key={h}
                          type="button"
                          onClick={() => {
                            setCheckInTime(h);
                            setIsTimePickerOpen(false);
                          }}
                          className={`py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                            isSelected
                              ? "bg-brand text-white shadow-xs ring-2 ring-brand/30"
                              : "bg-canvas border border-border-subtle text-primary hover:bg-sand-100"
                          }`}
                        >
                          {h}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              fullWidth
              onClick={() => setIsTimePickerOpen(false)}
            >
              Gunakan Jam Terpilih (Pkl {checkInTime} WIB)
            </Button>
          </div>
        </div>
      )}

    </div>
  );
}
