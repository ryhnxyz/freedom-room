'use client';

import Image from 'next/image';
import Link from 'next/link';
import Badge from '@/components/Badge';
import Button from '@/components/Button';

export interface JournalArticle {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  summary: string;
  image: string;
}

export const FEATURED_ARTICLES: JournalArticle[] = [
  {
    id: 'panduan-transit-sentul',
    title: 'Panduan Sewa Transit di Sentul City: Istirahat Fleksibel Tanpa Ribet',
    category: 'PANDUAN',
    date: '28 Agustus 2026',
    readTime: '3 mnt baca',
    summary: 'Tips memilih durasi transit 3 jam hingga 8 jam untuk relaksasi atau menunggu jadwal perjalanan berikutnya di Sentul Tower.',
    image: '/img/freedom-room/one-bed-102-1.png',
  },
  {
    id: 'destinasi-kuliner-sentul',
    title: '5 Destinasi Wisata & Kuliner Hits Hanya 5 Menit dari Sentul Tower',
    category: 'WISATA',
    date: '24 Agustus 2026',
    readTime: '4 mnt baca',
    summary: 'Rekomendasi cafe hits, AEON Mall Sentul City, IKEA, dan pemandian air panas alami Gunung Pancar untuk akhir pekan seru.',
    image: '/img/freedom-room/project-1.jpg',
  },
  {
    id: 'keunggulan-sewa-apartemen',
    title: 'Keunggulan Sewa Apartemen Transit Dibandingkan Hotel Konvensional',
    category: 'TIPS HEMAT',
    date: '20 Agustus 2026',
    readTime: '3 mnt baca',
    summary: 'Fasilitas dapur mini, Smart TV streaming, privasi tinggi, dan tarif per jam yang jauh lebih hemat dan efisien.',
    image: '/img/freedom-room/type-2-luxury-1.png',
  },
];

export default function BlogSection() {
  return (
    <section id="blog-journal" className="py-16 sm:py-24 bg-canvas border-t border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-10 sm:space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <Badge>ARTIKEL & PANDUAN</Badge>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-primary">
              Informasi & Tips Menginap di Sentul
            </h2>
            <p className="text-sm sm:text-base text-secondary max-w-md leading-relaxed">
              Panduan sewa transit, rekomendasi tempat wisata di Sentul City, dan tips staycation hemat bersama FreedomRoom.
            </p>
          </div>

          <Link href="/journal" className="shrink-0">
            <Button
              variant="secondary"
              size="md"
              icon="akar-icons:arrow-right"
              iconPosition="right"
            >
              Lihat Semua Artikel
            </Button>
          </Link>
        </div>

        {/* 3 Columns Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {FEATURED_ARTICLES.map((article) => (
            <div key={article.id} className="block group">
              <article className="bg-surface rounded-2xl border border-border-subtle overflow-hidden shadow-sm space-y-4 p-4 flex flex-col justify-between h-full group-hover:border-brand-border transition-all">
                <div className="space-y-4">
                  <div className="relative w-full h-52 sm:h-56 rounded-xl overflow-hidden bg-sand-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-mono px-2.5 py-1 rounded-md border border-white/20">
                      {article.category}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[11px] text-secondary">
                      <span>{article.date}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>

                    <h3 className="font-heading font-bold text-lg sm:text-xl text-primary leading-snug group-hover:text-brand transition-colors">
                      {article.title}
                    </h3>

                    <p className="text-xs text-secondary leading-relaxed line-clamp-3">
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
                      className="!py-2 !text-xs group-hover:bg-brand group-hover:text-white group-hover:border-brand transition-colors"
                    >
                      Baca Selengkapnya
                    </Button>
                  </Link>
                </div>
              </article>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
