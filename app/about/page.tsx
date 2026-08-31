'use client';

import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import { Icon } from '@iconify/react';

export default function AboutPage() {
  const TEAM_MEMBERS = [
    {
      name: "Dimas Faturahman",
      role: "Owner & Founder",
      bio: "Berpengalaman lebih dari 8 tahun dalam manajemen hospitality dan properti sewa apartemen di kawasan Sentul City dan Jabodetabek.",
      image: "/img/freedom-room/dimas-faturahman.jpg",
      initials: "DF",
      badge: "Founder",
    },
    {
      name: "Mochammad Reyhan Alfiana",
      role: "Co-Founder",
      bio: "Bersama founder mengembangkan strategi bisnis, operasional, dan pengalaman digital FreedomRoom agar layanan reservasi semakin praktis dan terpercaya.",
      image: null,
      initials: "MR",
      badge: "Co-Founder",
    },
    {
      name: "Arif Riyadi",
      role: "Housekeeping Leader",
      bio: "Memimpin standar kebersihan, sterilisasi, dan kesiapan setiap unit agar tamu selalu mendapatkan pengalaman menginap yang nyaman.",
      image: null,
      initials: "AR",
      badge: "Housekeeping Leader",
    },
  ];

  const MILESTONES = [
    {
      year: "2020",
      title: "Inisiasi FreedomRoom Sentul Tower",
      desc: "Memulai operasional sewa unit apartemen pertama di Sentul Tower dengan fokus pada fleksibilitas transit tamu bisnis dan liburan.",
      icon: "solar:home-bold",
    },
    {
      year: "2022",
      title: "Peningkatan Fasilitas & Interior Modern",
      desc: "Renovasi interior dengan konsep modern luxury, penambahan Smart TV Netflix, dan koneksi internet dedicated berkecepatan tinggi.",
      icon: "solar:structure-bold",
    },
    {
      year: "2024",
      title: "Ekspansi 9 Unit Pilihan di 5 Lantai",
      desc: "Menambah inventaris kamar premium di lantai 3, 6, 8, 10, dan 11 untuk mengakomodasi kebutuhan tamu perorangan maupun keluarga.",
      icon: "solar:map-point-bold",
    },
    {
      year: "2026",
      title: "Sistem Manajemen Digital Terintegrasi",
      desc: "Peluncuran sistem booking realtime dan dashboard terpusat untuk pengalaman reservasi tamu yang cepat, transparan, dan terpercaya.",
      icon: "solar:document-text-bold",
    },
  ];

  return (
    <main className="min-h-screen bg-canvas text-primary relative selection:bg-brand selection:text-white">
      <Navbar />

      {/* Standardized Dark Hero Section */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 bg-timber-950 text-white overflow-hidden border-b border-border-subtle">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/freedom-room/one-bed-102-1.png"
            alt="FreedomRoom Sentul Tower"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 space-y-5">
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-3xl leading-[1.1]">
            Menghadirkan kenyamanan booking apartemen, hotel & villa terbaik.
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl leading-relaxed">
            FreedomRoom adalah platform booking penginapan modern untuk sewa apartemen transit & harian, kamar hotel, dan villa staycation yang dirancang untuk kenyamanan, privasi, dan kepraktisan tamu.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 sm:py-24 bg-canvas border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-primary">
              Standar Bersih, Nyaman, dan Terpercaya
            </h2>
            <p className="text-sm sm:text-base text-secondary leading-relaxed font-sans">
              Kami percaya bahwa kebutuhan istirahat — baik transit 3 jam antar pertemuan bisnis maupun liburan akhir pekan bersama keluarga — harus didukung oleh ruangan yang bersih higienis, fasilitas modern yang berfungsi sempurna, dan proses check-in yang bebas ribet.
            </p>
            <p className="text-sm sm:text-base text-secondary leading-relaxed font-sans">
              Setiap unit di FreedomRoom melewati proses pembersihan dan sterilisasi ketat sebelum diserahkan kepada tamu, lengkap dengan sprei bersih, handuk steril, pengharum ruangan, dan Smart TV siap tonton.
            </p>
          </div>

          <div className="lg:col-span-6 rounded-3xl overflow-hidden shadow-xl border border-border-subtle bg-sand-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/freedom-room/type-2-luxury-1.png"
              alt="Interior Unit FreedomRoom"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* Milestones / Perjalanan */}
      <section className="py-16 sm:py-24 bg-surface border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-primary">
              Dedikasi Melayani Tamu Penginapan
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {MILESTONES.map((m) => (
              <div key={m.year} className="bg-canvas rounded-2xl p-5 border border-border-subtle space-y-3">
                <div className="w-10 h-10 rounded-xl bg-brand text-white flex items-center justify-center">
                  <Icon icon={m.icon} className="w-5 h-5" />
                </div>
                <span className="font-mono text-xs font-bold text-brand block">{m.year}</span>
                <h3 className="font-heading font-bold text-base text-primary">{m.title}</h3>
                <p className="text-xs text-secondary leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tim Pengelola */}
      <section className="py-16 sm:py-24 bg-canvas border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-primary">
              Pengelola Profesional & Siap Melayani
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TEAM_MEMBERS.map((t) => (
              <div key={t.name} className="bg-surface rounded-2xl p-5 border border-border-subtle space-y-4 shadow-sm">
                <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-brand/25 bg-gradient-to-br from-brand-light via-surface to-brand-border shadow-sm">
                  {t.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={t.image} alt={t.name} className="h-full w-full object-cover" />
                  ) : (
                    <span className="font-heading text-lg font-extrabold tracking-wide text-brand-hover" aria-label={`Avatar ${t.name}`}>
                      {t.initials}
                    </span>
                  )}
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-brand block mb-1">{t.badge}</span>
                  <h3 className="font-heading font-bold text-lg text-primary">{t.name}</h3>
                  <p className="text-xs font-semibold text-muted">{t.role}</p>
                </div>
                <p className="text-xs text-secondary leading-relaxed">{t.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
