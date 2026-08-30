"use client";

import { useState, useEffect, useRef } from "react";
import { HOUSE_MODELS, formatRupiah, calculateRoomPrice, isWeekend } from "@/data/houseModels";
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
  const [packageType, setPackageType] = useState<"transit-3h" | "transit-6h" | "transit-8h" | "fullday-13" | "fullday-21">("transit-3h");
  const [checkInDate, setCheckInDate] = useState<string>("");
  const [checkInTime, setCheckInTime] = useState<string>("14:00");
  const [nights, setNights] = useState<number>(1);
  const [fullName, setFullName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [adults, setAdults] = useState<number>(2);
  const [paymentMethod, setPaymentMethod] = useState<string>("Transfer Bank BCA");
  const [notes, setNotes] = useState<string>("");

  // Success Confirmation State
  const [confirmedReservation, setConfirmedReservation] = useState<ReservationData | null>(null);

  // Refs for animation & touch dismiss
  const modalOverlayRef = useRef<HTMLDivElement>(null);
  const sheetContainerRef = useRef<HTMLDivElement>(null);
  const scrollableBodyRef = useRef<HTMLDivElement>(null);

  // Initialize Default Check-in datetime
  useEffect(() => {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, "0");
    const todayStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
    const timeStr = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
    setCheckInDate(todayStr);
    setCheckInTime(timeStr);
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

  // Auto-adjust default check-in time when package is selected
  useEffect(() => {
    if (packageType === "fullday-13") {
      setCheckInTime("13:00");
    } else if (packageType === "fullday-21") {
      setCheckInTime("21:00");
    }
  }, [packageType]);

  // Calculate Price Dynamically based on date (Weekday/Weekend) and Unit Category
  const isSelectedWeekend = isWeekend(checkInDate);
  const isFullday = packageType === "fullday-13" || packageType === "fullday-21";
  const totalPrice = calculateRoomPrice(activeRoomObj, packageType, checkInDate, isFullday ? nights : 1);

  // Handle Lenis Scroll Lock and GSAP Modal Animations
  useEffect(() => {
    if (isOpen) {
      if (!isRendered) {
        setIsRendered(true);
        return;
      }
      
      // Stop Lenis and Lock Body Scroll
      if (lenis) lenis.stop();
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      const ctx = gsap.context(() => {
        if (modalOverlayRef.current) {
          gsap.fromTo(modalOverlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: "power2.out" });
        }
        if (sheetContainerRef.current) {
          gsap.fromTo(sheetContainerRef.current, { scale: 0.95, opacity: 0, y: 15 }, { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: "power3.out" });
        }
      });
      return () => {
        ctx.revert();
        if (lenis) lenis.start();
        document.body.style.overflow = "unset";
        document.documentElement.style.overflow = "unset";
      };
    } else {
      if (lenis) lenis.start();
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
      setIsRendered(false);
      setConfirmedReservation(null);
      setErrorMsg(null);
    }
  }, [isOpen, isRendered, lenis]);

  const packageLabel =
    packageType === "transit-3h"
      ? "Transit 3 Jam"
      : packageType === "transit-6h"
      ? "Transit 6 Jam"
      : packageType === "transit-8h"
      ? "Transit 8 Jam"
      : packageType === "fullday-21"
      ? `Full Day Check-in 21:00 (${nights} Malam)`
      : `Full Day Check-in 13:00 (${nights} Malam)`;

  // Form Submit Handler -> VPS Database
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !checkInDate) return;

    setLoading(true);
    setErrorMsg(null);

    try {
      const checkInDateTime = new Date(`${checkInDate}T${checkInTime || "14:00"}:00`);
      const checkOutDateTime = new Date(checkInDateTime.getTime());

      let checkOutTimeStr = "17:00";
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
        check_in_time: checkInTime || "14:00",
        check_out_time: checkOutTimeStr,
        guests: adults || 2,
        status: "Active (In-Room)",
        source: "Website Tumbuh App",
        payment_method: paymentMethod,
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
      setErrorMsg("Gagal menyimpan ke database server. Silakan hubungi CS langsung atau coba kembali.");
    } finally {
      setLoading(false);
    }
  };

  if (!isRendered) return null;

  const roomDisplayTitle = selectedRoomDb ? `${selectedRoomDb.unit_number} - ${selectedRoomDb.name}` : `${selectedRoomLocal.unitNumber} - ${selectedRoomLocal.name}`;

  const whatsappMessageUrl = confirmedReservation
    ? `https://wa.me/6287878906899?text=${encodeURIComponent(
        `Halo Admin FreedomRoom Sentul Tower, saya telah melakukan reservasi online:

` +
          `• Kode Booking: *${confirmedReservation.ref}*
` +
          `• Nama Tamu: *${confirmedReservation.guest}*
` +
          `• No WhatsApp: *${confirmedReservation.phone}*
` +
          `• Unit: *${confirmedReservation.unit_code} - ${confirmedReservation.unit_name}*
` +
          `• Paket: *${confirmedReservation.package}*
` +
          `• Check-In: *${new Date(confirmedReservation.check_in).toLocaleDateString("id-ID", { dateStyle: "medium" })} jam ${confirmedReservation.check_in_time || "14:00"}*
` +
          `• Total Biaya: *${formatRupiah(confirmedReservation.total)}*
` +
          `• Metode Bayar: *${confirmedReservation.payment_method}*

` +
          `Mohon informasi ketersediaan kunci kamar dan nomor rekening pembayaran. Terima kasih!`
      )}`
    : "#";

  return (
    <div
      role="dialog"
      aria-modal="true"
      data-lenis-prevent="true"
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden"
    >
      {/* Backdrop */}
      <div
        ref={modalOverlayRef}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity cursor-pointer"
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div
        ref={sheetContainerRef}
        data-lenis-prevent="true"
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        style={{ maxHeight: "88vh", height: "auto" }}
        className="bg-canvas w-full max-w-xl rounded-3xl border border-border-subtle shadow-2xl relative flex flex-col min-h-0 z-10 will-change-transform overflow-hidden my-auto"
      >
        {/* Sticky Header */}
        <div className="bg-surface px-5 sm:px-6 py-4 border-b border-border-subtle flex items-center justify-between sticky top-0 z-20 shrink-0 shadow-xs">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
              <span className="text-[10px] font-mono font-bold tracking-widest text-brand uppercase">
                PRICELIST RESMI FREEDOMROOM
              </span>
            </div>
            <h2 className="font-heading text-base sm:text-lg font-bold text-primary">
              {confirmedReservation ? "Konfirmasi Booking Berhasil!" : "Form Reservasi Sentul Tower"}
            </h2>
          </div>

          <button
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
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-brand/15 text-brand flex items-center justify-center mx-auto shadow-md ring-4 ring-brand/30">
                <Icon icon="solar:check-circle-bold" className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-widest text-brand block">
                  RESERVASI TERSIMPAN DI DATABASE
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-primary">
                  Terima Kasih, {confirmedReservation.guest}!
                </h3>
                <p className="text-xs text-secondary max-w-md mx-auto leading-relaxed">
                  Pesanan kamar Anda telah berhasil dicatat di sistem FreedomRoom. Silakan konfirmasi melalui WhatsApp untuk pengambilan kartu akses lift & kunci kamar.
                </p>
              </div>

              {/* Receipt Card */}
              <div className="bg-surface rounded-2xl p-4 sm:p-5 border border-border-subtle text-left space-y-2.5 shadow-xs max-w-md mx-auto text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-border-subtle">
                  <span className="text-secondary font-medium">Kode Booking</span>
                  <span className="font-mono font-bold text-brand text-sm sm:text-base tracking-wider">
                    {confirmedReservation.ref}
                  </span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-border-subtle">
                  <span className="text-secondary font-medium">Unit Kamar</span>
                  <span className="font-semibold text-primary text-right">
                    {confirmedReservation.unit_code} - {confirmedReservation.unit_name}
                  </span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-border-subtle">
                  <span className="text-secondary font-medium">Paket Sewa</span>
                  <span className="font-semibold text-primary">{confirmedReservation.package}</span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-border-subtle">
                  <span className="text-secondary font-medium">Waktu Check-In</span>
                  <span className="font-semibold text-primary">
                    {new Date(confirmedReservation.check_in).toLocaleDateString("id-ID", { dateStyle: "medium" })} jam {confirmedReservation.check_in_time || "14:00"}
                  </span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-border-subtle">
                  <span className="text-secondary font-medium">Metode Pembayaran</span>
                  <span className="font-semibold text-primary">{confirmedReservation.payment_method}</span>
                </div>

                <div className="flex items-center justify-between pt-1 text-sm">
                  <span className="text-primary font-bold">Total Pembayaran</span>
                  <span className="font-bold font-display text-brand text-base sm:text-lg">
                    {formatRupiah(confirmedReservation.total)}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-1 space-y-2 max-w-md mx-auto">
                <a
                  href={whatsappMessageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-md"
                >
                  <Icon icon="solar:chat-round-call-bold" className="w-4 h-4" />
                  Konfirmasi ke WhatsApp CS
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2 text-xs font-semibold text-secondary hover:text-primary transition-colors cursor-pointer"
                >
                  Selesai & Tutup
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-50 text-red-700 border border-red-200 text-xs flex items-center gap-2">
                  <Icon icon="solar:danger-triangle-bold" className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Tanggal Check-in & Indikator Hari */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block font-semibold text-primary text-xs">
                    Pilih Tanggal Check-In
                  </label>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                    isSelectedWeekend ? "bg-amber-100 text-amber-800 border border-amber-300" : "bg-blue-50 text-blue-800 border border-blue-200"
                  }`}>
                    {isSelectedWeekend ? "Tarif Weekend (Jum-Min)" : "Tarif Weekday (Sen-Kam)"}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      required
                      type="date"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      className="w-full bg-surface border border-border-subtle rounded-xl px-3.5 py-2 text-xs text-primary focus:outline-none focus:ring-2 focus:ring-brand/30 font-medium"
                    />
                  </div>
                  <div>
                    <input
                      required
                      type="time"
                      value={checkInTime}
                      onChange={(e) => setCheckInTime(e.target.value)}
                      className="w-full bg-surface border border-border-subtle rounded-xl px-3.5 py-2 text-xs text-primary focus:outline-none focus:ring-2 focus:ring-brand/30 font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Unit Kamar */}
              <div className="space-y-1.5">
                <label className="block font-semibold text-primary text-xs">
                  Pilih Unit Kamar Apartemen
                </label>
                <select
                  value={selectedRoomId}
                  onChange={(e) => setSelectedRoomId(e.target.value)}
                  className="w-full bg-surface border border-border-subtle rounded-xl px-3.5 py-2.5 text-xs text-primary focus:outline-none focus:ring-2 focus:ring-brand/30 font-medium"
                >
                  {(rooms.length > 0 ? rooms : HOUSE_MODELS.map((h) => ({
                    id: h.databaseId,
                    name: h.name,
                    unit_number: h.unitNumber,
                    floor: h.floor,
                    type: h.type,
                  }))).map((r: any) => (
                    <option key={r.id} value={r.id}>
                      {r.unit_number} — {r.name} ({r.type || r.floor})
                    </option>
                  ))}
                </select>
              </div>

              {/* Paket & Durasi Sewa Sesuai Pricelist */}
              <div className="space-y-1.5">
                <label className="block font-semibold text-primary text-xs">
                  Pilih Paket & Durasi Sewa
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    {
                      id: "transit-3h",
                      label: "Transit 3 Jam",
                      price: calculateRoomPrice(activeRoomObj, "transit-3h", checkInDate),
                      desc: "Check-in fleksibel 3 jam",
                    },
                    {
                      id: "transit-6h",
                      label: "Transit 6 Jam",
                      price: calculateRoomPrice(activeRoomObj, "transit-6h", checkInDate),
                      desc: isSelectedWeekend ? "Weekend rate" : "Weekday rate",
                    },
                    {
                      id: "transit-8h",
                      label: "Transit 8 Jam",
                      price: calculateRoomPrice(activeRoomObj, "transit-8h", checkInDate),
                      desc: "Daypass santai 8 jam",
                    },
                    {
                      id: "fullday-13",
                      label: "Full Day (Jam 13:00)",
                      price: calculateRoomPrice(activeRoomObj, "fullday-13", checkInDate),
                      desc: "Check-in siang jam 13:00",
                    },
                    {
                      id: "fullday-21",
                      label: "Full Day (Jam 21:00)",
                      price: calculateRoomPrice(activeRoomObj, "fullday-21", checkInDate),
                      desc: "Check-in malam hemat",
                    },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPackageType(p.id as any)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                        packageType === p.id
                          ? "border-brand bg-brand-light font-bold ring-2 ring-brand/30 text-primary"
                          : "border-border-subtle bg-surface hover:bg-sand-100 text-secondary"
                      }`}
                    >
                      <div>
                        <span className="font-bold block text-primary text-xs">{p.label}</span>
                        <span className="text-[10px] text-muted block mt-0.5">{p.desc}</span>
                      </div>
                      <span className="font-mono font-bold text-brand text-xs sm:text-sm">
                        {formatRupiah(p.price)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Durasi Menginap jika Harian */}
              {isFullday && (
                <div className="grid grid-cols-2 gap-3 bg-sand-100 p-3 rounded-xl border border-border-subtle">
                  <div>
                    <label className="block font-semibold text-primary mb-1">Durasi Malam</label>
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={nights}
                      onChange={(e) => setNights(Number(e.target.value))}
                      className="w-full bg-surface border border-border-subtle rounded-lg px-3 py-1.5 text-xs text-primary font-bold"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-[10px] text-muted uppercase">Total Menginap</span>
                    <span className="font-bold text-primary">{nights} Malam ({formatRupiah(totalPrice)})</span>
                  </div>
                </div>
              )}

              {/* Data Tamu */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-primary mb-1">Nama Lengkap Tamu</label>
                  <input
                    required
                    type="text"
                    placeholder="Contoh: Rian Pratama"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-surface border border-border-subtle rounded-xl px-3.5 py-2 text-xs text-primary focus:outline-none focus:ring-2 focus:ring-brand/30"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-primary mb-1">Nomor WhatsApp Aktif</label>
                  <input
                    required
                    type="tel"
                    placeholder="Contoh: 081288990011"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-surface border border-border-subtle rounded-xl px-3.5 py-2 text-xs text-primary focus:outline-none focus:ring-2 focus:ring-brand/30"
                  />
                </div>
              </div>

              {/* Metode Bayar & Catatan */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-primary mb-1">Metode Pembayaran</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full bg-surface border border-border-subtle rounded-xl px-3.5 py-2 text-xs text-primary focus:outline-none focus:ring-2 focus:ring-brand/30"
                  >
                    <option value="Transfer Bank BCA">Transfer Bank BCA</option>
                    <option value="QRIS Instan">QRIS (Semua E-Wallet/Bank)</option>
                    <option value="Cash saat Check-in">Bayar Tunai di Tempat (Check-in)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-primary mb-1">Jumlah Tamu</label>
                  <input
                    type="number"
                    min="1"
                    max="6"
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="w-full bg-surface border border-border-subtle rounded-xl px-3.5 py-2 text-xs text-primary focus:outline-none focus:ring-2 focus:ring-brand/30"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-primary mb-1">Catatan Tambahan (Opsional)</label>
                <textarea
                  rows={2}
                  placeholder="Contoh: Request handuk tambahan / late check-in."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-surface border border-border-subtle rounded-xl px-3.5 py-1.5 text-xs text-primary focus:outline-none focus:ring-2 focus:ring-brand/30 resize-none"
                />
              </div>

              {/* Price Summary Banner */}
              <div className="p-3.5 rounded-2xl bg-surface border border-border-subtle flex items-center justify-between shadow-xs">
                <div>
                  <span className="text-[10px] font-mono text-muted uppercase block">
                    Total Biaya ({isSelectedWeekend ? "Weekend" : "Weekday"})
                  </span>
                  <span className="font-heading font-bold text-base sm:text-lg text-brand">
                    {formatRupiah(totalPrice)}
                  </span>
                </div>
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-brand-light text-brand font-semibold border border-brand-border">
                  Tanpa Biaya Tersembunyi
                </span>
              </div>

              {/* Submit Button */}
              <div className="pt-1 pb-1">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={loading}
                  className="w-full justify-center"
                  icon="solar:calendar-bold"
                >
                  {loading ? "Menghubungkan ke Server..." : "Konfirmasi Reservasi Sekarang"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
