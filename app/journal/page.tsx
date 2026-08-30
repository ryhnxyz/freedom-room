'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import Badge from '@/components/Badge';

const TourBookingModal = dynamic(() => import('@/components/TourBookingModal'), { ssr: false });

export interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
  summary: string;
  image: string;
}

const ARTICLES_LIST: Article[] = [
  {
    id: 'panduan-transit-sentul',
    title: 'Panduan Sewa Transit di Sentul City: Istirahat Fleksibel Tanpa Ribet',
    category: 'PANDUAN',
    date: '28 Agustus 2026',
    author: 'Dimas Faturahman',
    readTime: '3 mnt baca',
    summary: 'Tips memilih durasi transit 3 jam hingga 8 jam untuk relaksasi atau menunggu jadwal perjalanan berikutnya di Sentul Tower.',
    image: '/img/freedom-room/one-bed-102-1.png',
  },
  {
    id: 'destinasi-kuliner-sentul',
    title: '5 Destinasi Wisata & Kuliner Hits Hanya 5 Menit dari Sentul Tower',
    category: 'WISATA',
    date: '24 Agustus 2026',
    author: 'Sari Wulandari',
    readTime: '4 mnt baca',
    summary: 'Rekomendasi cafe hits, AEON Mall Sentul City, IKEA, dan pemandian air panas alami Gunung Pancar untuk akhir pekan seru.',
    image: '/img/freedom-room/project-1.jpg',
  },
  {
    id: 'keunggulan-sewa-apartemen',
    title: 'Keunggulan Sewa Apartemen Transit Dibandingkan Hotel Konvensional',
    category: 'TIPS STAYCATION',
    date: '20 Agustus 2026',
    author: 'Arif Subekti',
    readTime: '3 mnt baca',
    summary: 'Fasilitas dapur mini, Smart TV streaming, privasi tinggi, dan tarif per jam yang jauh lebih hemat dan efisien.',
    image: '/img/freedom-room/type-2-luxury-1.png',
  },
];

export default function JournalPage() {
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-canvas text-primary relative selection:bg-brand selection:text-white">
      <Navbar onOpenScheduleTour={() => setIsTourModalOpen(true)} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 bg-timber-950 text-white overflow-hidden border-b border-border-subtle">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/freedom-room/project-1.jpg"
            alt="FreedomRoom Journal Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-timber-950 via-timber-950/80 to-canvas" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 space-y-4">
          <Badge>PANDUAN & ARTIKEL</Badge>
          <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white w-full leading-[1.1]">
            Jurnal & Tips Menginap Sentul
          </h1>
          <p className="text-base sm:text-lg text-sand-200/90 max-w-2xl font-sans leading-relaxed">
            Kumpulan artikel panduan sewa transit, rekomendasi wisata alam Sentul City, dan tips staycation hemat di Sentul Tower.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ARTICLES_LIST.map((article) => (
            <div key={article.id} className="bg-surface rounded-2xl border border-border-subtle overflow-hidden shadow-sm flex flex-col justify-between p-4 space-y-4">
              <div className="space-y-4">
                <div className="relative w-full h-52 rounded-xl overflow-hidden bg-sand-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-mono px-2.5 py-1 rounded-md border border-white/20">
                    {article.category}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-secondary">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.author}</span>
                  </div>

                  <h2 className="font-heading font-bold text-lg text-primary leading-snug">
                    {article.title}
                  </h2>

                  <p className="text-xs text-secondary leading-relaxed">
                    {article.summary}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-border-subtle">
                <Link href="/contact">
                  <Button
                    variant="secondary"
                    size="sm"
                    fullWidth
                    icon="akar-icons:arrow-right"
                    iconPosition="right"
                    className="!py-2 !text-xs"
                  >
                    Hubungi untuk Reservasi
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
      <TourBookingModal isOpen={isTourModalOpen} onClose={() => setIsTourModalOpen(false)} />
    </main>
  );
}
