"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import { ReservationResultSkeleton } from "@/components/Skeleton";
import { api, ReservationData } from "@/lib/api";
import { formatRupiah } from "@/data/houseModels";
import { Icon } from "@iconify/react";

export default function CheckBookingPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [searched, setSearched] = useState<boolean>(false);
  const [reservation, setReservation] = useState<ReservationData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setErrorMsg(null);
    setSearched(true);

    try {
      const res = await api.getReservationByRef(searchQuery.trim());
      setReservation(res);
      if (!res) {
        setErrorMsg("Data reservasi tidak ditemukan. Pastikan kode booking (misal: RL-XXXX) atau nomor WhatsApp sudah benar.");
      }
    } catch (err: any) {
      console.error("Search error:", err);
      setErrorMsg("Gagal mencari reservasi dari database server. Silakan coba sesaat lagi.");
      setReservation(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-canvas text-primary relative selection:bg-brand selection:text-white">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 bg-timber-950 text-white overflow-hidden border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 space-y-4 text-center max-w-3xl mx-auto">
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
            Cek Status Reservasi Tamu
          </h1>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-xl mx-auto">
            Masukkan Kode Booking (contoh: <strong className="text-brand font-mono">RL-5965</strong>) atau nomor WhatsApp yang Anda gunakan saat pemesanan kamar.
          </p>

          {/* Search Box */}
          <form onSubmit={handleSearch} className="pt-4 max-w-xl mx-auto flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <Icon
                icon="solar:magnifer-linear"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              />
              <input
                required
                type="text"
                placeholder="Masukkan Kode Booking / No. WhatsApp..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-2xl pl-12 pr-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-brand-light focus:ring-2 focus:ring-brand-light/20 backdrop-blur-md transition-all shadow-md"
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={loading}
              icon="solar:magnifer-bold"
              className="w-full sm:w-auto justify-center"
            >
              {loading ? "Mencari..." : "Cek Booking"}
            </Button>
          </form>
        </div>
      </section>

      {/* Result Section */}
      <section className="py-12 sm:py-20 max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
        {loading && <ReservationResultSkeleton />}

        {errorMsg && !loading && (
          <div className="p-4 rounded-2xl bg-amber-50 text-amber-800 border border-amber-200 text-sm flex items-start gap-3 shadow-xs">
            <Icon icon="solar:danger-triangle-bold" className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="block font-semibold">Reservasi Tidak Ditemukan</strong>
              <p className="text-xs text-amber-700 leading-relaxed">{errorMsg}</p>
            </div>
          </div>
        )}

        {reservation && !loading && (
          <div className="bg-surface rounded-3xl p-6 sm:p-8 border border-border-subtle shadow-xl space-y-6 animate-in fade-in zoom-in-95 duration-300">
            
            {/* Header Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border-subtle pb-5">
              <div>
                <span className="text-[10px] font-mono text-muted uppercase tracking-wider block">
                  KODE REFERENSI RESERVASI
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand tracking-wider">
                  {reservation.ref}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  reservation.status.includes("Active") || reservation.status.includes("Confirmed")
                    ? "bg-brand-light text-brand border border-brand-border"
                    : reservation.status.includes("Checked")
                    ? "bg-gray-100 text-gray-700"
                    : "bg-red-50 text-red-600"
                }`}>
                  Status: {reservation.status}
                </span>

                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  reservation.payment_status === "Lunas" || reservation.payment_status === "Paid"
                    ? "bg-brand-light text-brand"
                    : "bg-amber-100 text-amber-800"
                }`}>
                  {reservation.payment_status === "Lunas" || reservation.payment_status === "Paid"
                    ? "Lunas (Paid)"
                    : "Menunggu Pembayaran"}
                </span>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-canvas p-3.5 rounded-xl border border-border-subtle space-y-1">
                <span className="text-muted block uppercase text-[10px] font-mono">Nama Tamu</span>
                <span className="font-bold text-primary text-sm">{reservation.guest}</span>
                <span className="text-secondary block">{reservation.phone}</span>
              </div>

              <div className="bg-canvas p-3.5 rounded-xl border border-border-subtle space-y-1">
                <span className="text-muted block uppercase text-[10px] font-mono">Unit Apartemen</span>
                <span className="font-bold text-primary text-sm">
                  {reservation.unit_code} - {reservation.unit_name}
                </span>
                <span className="text-secondary block">Paket: {reservation.package}</span>
              </div>

              <div className="bg-canvas p-3.5 rounded-xl border border-border-subtle space-y-1">
                <span className="text-muted block uppercase text-[10px] font-mono">Jadwal Check-In</span>
                <span className="font-bold text-primary text-sm">
                  {new Date(reservation.check_in).toLocaleDateString("id-ID", { dateStyle: "medium" })} jam {reservation.check_in_time || "14:00"}
                </span>
              </div>

              <div className="bg-canvas p-3.5 rounded-xl border border-border-subtle space-y-1">
                <span className="text-muted block uppercase text-[10px] font-mono">Jadwal Check-Out</span>
                <span className="font-bold text-primary text-sm">
                  {new Date(reservation.check_out).toLocaleDateString("id-ID", { dateStyle: "medium" })} jam {reservation.check_out_time || "12:00"}
                </span>
              </div>
            </div>

            {/* Price & Payment Summary */}
            <div className="p-4 rounded-2xl bg-sand-100 border border-border-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono text-muted uppercase block">Metode Pembayaran</span>
                <span className="font-semibold text-primary text-xs">{reservation.payment_method || "Transfer Bank BCA"}</span>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-[10px] font-mono text-muted uppercase block">Total Tagihan</span>
                <span className="font-display text-2xl font-bold text-brand">
                  {formatRupiah(reservation.total)}
                </span>
              </div>
            </div>

            {/* Assistance Action */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-secondary text-center sm:text-left">
                Butuh perpanjangan transit atau bantuan check-in?
              </span>

              <a
                href={`https://wa.me/6287878906899?text=${encodeURIComponent(
                  `Halo CS FreedomRoom, saya ingin menanyakan reservasi ${reservation.ref} atas nama ${reservation.guest}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-solid inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-semibold text-xs uppercase tracking-wider shadow-sm"
              >
                <Icon icon="solar:chat-round-call-bold" className="w-4 h-4" />
                Chat CS di WhatsApp
              </a>
            </div>

          </div>
        )}

        {!searched && (
          <div className="bg-surface rounded-2xl p-6 border border-border-subtle text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-sand-200 text-brand flex items-center justify-center mx-auto">
              <Icon icon="solar:info-circle-bold" className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-base text-primary">
              Informasi Pengambilan Kunci Kamar
            </h3>
            <p className="text-xs text-secondary max-w-md mx-auto leading-relaxed">
              Setelah reservasi terkonfirmasi, Anda dapat langsung menuju Lobby Apartemen Sentul Tower untuk serah terima kartu akses lift dan kunci kamar 24 jam.
            </p>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
