"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import Button from "@/components/Button";

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-timber-950 text-white pt-16 sm:pt-24 pb-12 border-t border-timber-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-14 sm:space-y-20">
        
        {/* Top Row: Brand Statement & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start border-b border-white/10 pb-12 sm:pb-16">
          
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-full overflow-hidden border border-brand/50 shadow-md relative">
                <Image
                  src="/logo/freedom-logo.jpeg"
                  alt="FreedomRoom Logo"
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-2xl sm:text-3xl text-white tracking-tight leading-none">
                  Freedom<span className="text-brand">Room</span>
                </span>
                <span className="text-[10px] font-mono tracking-widest uppercase text-gray-400 mt-0.5">
                  Platform Booking Apartemen, Hotel & Villa
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-lg">
              Platform booking penginapan terpercaya untuk sewa unit apartemen transit & harian, hotel, dan villa staycation. Menghadirkan kenyamanan menginap privat, bersih, dan berfasilitas lengkap.
            </p>

            <div className="flex items-center gap-2.5 sm:gap-3 text-xs text-brand">
              <Icon icon="solar:shield-check-bold" className="w-4 h-4 shrink-0" />
              <span>Unit Terverifikasi · Sterilisasi 100% Pasca Tamu</span>
            </div>
          </div>

          <div className="lg:col-span-6 lg:pl-8 space-y-3 sm:space-y-4">
            <h3 className="font-heading text-base sm:text-lg font-bold text-white">
              Dapatkan Promo Transit & Diskon Spesial
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Daftarkan email atau no WhatsApp Anda untuk mendapatkan info promo potongan harga weekend, paket transit hemat, dan voucher menginap.
            </p>

            {subscribed ? (
              <div className="bg-timber-900 p-3.5 rounded-lg text-xs font-semibold text-brand flex items-center gap-2 border border-brand/30">
                <Icon icon="solar:check-circle-bold" className="w-4 h-4 text-brand shrink-0" />
                <span>Terima kasih! Anda telah terdaftar untuk menerima promo spesial FreedomRoom.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md">
                <input
                  type="email"
                  placeholder="Masukkan alamat email Anda..."
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 bg-white/10 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all shadow-xs"
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  icon="solar:plane-bold"
                  className="w-full sm:w-auto justify-center"
                >
                  Daftar
                </Button>
              </form>
            )}
          </div>

        </div>

        {/* Middle Row: Directory Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 text-xs">
          
          <div className="space-y-3 sm:space-y-4">
            <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-brand">
              Navigasi Cepat
            </h4>
            <ul className="space-y-2.5 text-gray-400">
              <li><Link href="/booking" className="hover:text-white transition-colors">Pilihan Penginapan</Link></li>
              <li><Link href="/cek-booking" className="hover:text-white transition-colors">Cek Status Reservasi</Link></li>
              <li><Link href="/location" className="hover:text-white transition-colors">Akses Lokasi & Sekitar</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Tentang FreedomRoom</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Hubungi Customer Service</Link></li>
            </ul>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-brand">
              Pilihan Penginapan
            </h4>
            <ul className="space-y-2.5 text-gray-400">
              <li><Link href="/models/aspen" className="hover:text-white transition-colors">One Bed Deluxe Room 102 (Lt 10)</Link></li>
              <li><Link href="/models/willow" className="hover:text-white transition-colors">Studio Deluxe (Lt 8)</Link></li>
              <li><Link href="/models/cypress" className="hover:text-white transition-colors">Type 2 Bedroom Luxury (Lt 10)</Link></li>
              <li><Link href="/models/sequoia" className="hover:text-white transition-colors">One Bed Wood Panel (Lt 6)</Link></li>
              <li><Link href="/models/birch" className="hover:text-white transition-colors">One Bed Skyline (Lt 11)</Link></li>
              <li><Link href="/models/juniper" className="hover:text-white transition-colors">One Bed Luxury (Lt 3)</Link></li>
            </ul>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-brand">
              Lokasi & Reservasi
            </h4>
            <div className="space-y-2 text-gray-400">
              <p className="text-white font-medium">FreedomRoom Sentul Tower</p>
              <p>Ruko STA Shopping Arcade A7</p>
              <p>Citaringgul, Kec. Babakan Madang</p>
              <p>Kabupaten Bogor, Jawa Barat 16810</p>
              <p className="text-brand font-semibold pt-1">WhatsApp: +62 878 7890 6899</p>
              <p>Layanan Check-in 24 Jam</p>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-brand">
              Fasilitas Kamar
            </h4>
            <div className="space-y-2 text-gray-400">
              <p>Smart TV (Netflix & YouTube)</p>
              <p>High-Speed Dedicated WiFi</p>
              <p>Water Heater & Handuk Steril</p>
              <p>Kolam Renang Outdoor & Gym</p>
              <p>Keamanan 24 Jam & Smart Card</p>
            </div>
          </div>

        </div>

        {/* Bottom Disclaimers & Copyright */}
        <div className="border-t border-white/10 pt-6 sm:pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            © {new Date().getFullYear()} FreedomRoom Indonesia. Seluruh hak cipta dilindungi.
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Link href="/about" className="hover:text-gray-300 transition-colors">Kebijakan Privasi</Link>
            <Link href="/about" className="hover:text-gray-300 transition-colors">Syarat & Ketentuan Sewa</Link>
            <Link href="/contact" className="hover:text-gray-300 transition-colors">Bantuan & FAQ</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
