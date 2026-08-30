'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';

const TourBookingModal = dynamic(() => import('@/components/TourBookingModal'), { ssr: false });

export interface ArticleData {
  id: string;
  title: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
  summary: string;
  image: string;
  content: string[];
}

const ALL_ARTICLES: ArticleData[] = [
  {
    id: 'passive-cooling',
    title: 'Designing for Passive Cooling in Texas Hill Country Architecture',
    category: 'ARCHITECTURE',
    date: 'August 18, 2026',
    author: 'Soren Kjaergaard',
    readTime: '5 min read',
    summary: 'How solar orientation vectors and deep overhangs slash residential HVAC energy requirements by 42% without sacrificing natural light.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    content: [],
  },
  {
    id: 'net-zero-investment',
    title: 'Why Net-Zero Solar Integration Boosts Long-Term Home Valuation',
    category: 'INVESTMENT',
    date: 'August 10, 2026',
    author: 'Evelyn Vance',
    readTime: '7 min read',
    summary: 'An analysis of luxury estate resale data in Austin showing a 14.2% price premium for homes equipped with integrated microgrids.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop',
    content: [],
  },
  {
    id: 'biophilic-interiors',
    title: 'Biophilic Interior Design: Bringing the Texas Oak Forest Indoors',
    category: 'INTERIORS',
    date: 'July 29, 2026',
    author: 'Marcus Thorne',
    readTime: '4 min read',
    summary: 'Selecting native limestone, rift-cut white oak, and pocketing glass walls to create seamless indoor-outdoor living volumes.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop',
    content: [],
  },
];

export default function JournalDetailClient({ article }: { article: ArticleData }) {
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);
  const suggestedArticles = ALL_ARTICLES.filter((a) => a.id !== article.id);

  return (
    <main className="min-h-screen bg-canvas text-primary relative selection:bg-brand selection:text-white">
        <Navbar theme="light" onOpenScheduleTour={() => setIsTourModalOpen(true)} />

        {/* Article Header */}
        <section className="pt-32 pb-12 bg-surface border-b border-border-subtle">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
            
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <Link href="/journal">
                <Button variant="outline" size="sm" icon="akar-icons:arrow-left">
                  Back to Journal
                </Button>
              </Link>
            </div>

            <h1 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-primary leading-tight">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-xs text-secondary border-t border-border-subtle pt-4">
              <span className="font-bold text-primary">By {article.author}</span>
              <span>•</span>
              <span>{article.date}</span>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>

          </div>
        </section>

        {/* Article Body Content */}
        <section className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          
          {/* Main Hero Image */}
          <div className="relative w-full h-[360px] sm:h-[480px] rounded-2xl overflow-hidden border border-border-subtle shadow-md">
            <Image src={article.image} alt={article.title} fill priority className="object-cover" />
          </div>

          {/* Abstract / Summary Callout */}
          <div className="p-5 sm:p-6 bg-surface rounded-2xl border-l-4 border-l-brand border border-border-subtle shadow-xs text-sm sm:text-base font-medium text-primary italic leading-relaxed">
            &ldquo;{article.summary}&rdquo;
          </div>

          {/* Article Text Paragraphs */}
          <div className="space-y-6 text-sm sm:text-base text-primary font-sans leading-relaxed">
            {article.content.map((paragraph, idx) => (
              <p key={idx} className="text-secondary leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Navigation CTA Footer */}
          <div className="pt-8 border-t border-border-subtle flex justify-end">
            <Button onClick={() => setIsTourModalOpen(true)} variant="primary" size="md">
              Schedule Showing
            </Button>
          </div>

        </section>

        {/* Suggested / Related Blog Articles Section */}
        <section className="py-12 bg-surface border-t border-border-subtle">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
            <div className="space-y-2">
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-primary">
                Explore More Journal Articles
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {suggestedArticles.map((item) => (
                <Link key={item.id} href={`/journal/${item.id}`} className="block group">
                  <article className="bg-canvas rounded-2xl border border-border-subtle overflow-hidden shadow-sm p-4 space-y-4 flex flex-col justify-between h-full group-hover:border-brand-border transition-all">
                    <div className="space-y-3">
                      <div className="relative w-full h-44 rounded-xl overflow-hidden">
                        <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                        <span className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-mono px-2 py-0.5 rounded border border-white/20">
                          {item.category}
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        <div className="text-[11px] text-secondary">
                          {item.date} • {item.readTime}
                        </div>
                        <h4 className="font-heading font-bold text-base text-primary leading-snug group-hover:text-brand transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-xs text-secondary leading-relaxed line-clamp-2">
                          {item.summary}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-border-subtle">
                      <Button
                        variant="secondary"
                        size="sm"
                        fullWidth
                        icon="akar-icons:arrow-right"
                        iconPosition="right"
                        className="!py-2 !text-xs pointer-events-none group-hover:bg-brand group-hover:text-white group-hover:border-brand transition-colors"
                      >
                        Read Article
                      </Button>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Footer />
        <TourBookingModal
          isOpen={isTourModalOpen}
          onClose={() => setIsTourModalOpen(false)}
          initialModelName="The Aspen"
        />
      </main>
    );
}
