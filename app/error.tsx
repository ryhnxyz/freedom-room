'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import Badge from '@/components/Badge';

const TourBookingModal = dynamic(() => import('@/components/TourBookingModal'), { ssr: false });

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);

  useEffect(() => {
    console.error('Runtime Application Error:', error);
  }, [error]);

  return (
    <main className="min-h-screen bg-canvas text-primary relative selection:bg-brand selection:text-white flex flex-col justify-between">
      <Navbar onOpenScheduleTour={() => setIsTourModalOpen(true)} />

      {/* 500 Error Section */}
      <section className="relative pt-36 pb-24 sm:pt-48 sm:pb-36 bg-timber-950 text-white overflow-hidden my-auto flex-1 flex items-center">
        
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop"
            alt="Error Background Architecture"
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-timber-950 via-timber-950/85 to-timber-950" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 text-center space-y-6 sm:space-y-8">
          
          <div className="inline-flex justify-center">
            <Badge>SYSTEM EXCEPTION</Badge>
          </div>

          <div className="space-y-3">
            <span className="font-mono text-5xl sm:text-7xl lg:text-8xl font-bold text-amber-400 block tracking-tight">
              500
            </span>
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Architectural System Exception.
            </h1>
          </div>

          <p className="text-sm sm:text-base text-sand-200/90 max-w-lg mx-auto font-sans leading-relaxed">
            An unexpected system exception occurred while processing this request. Our technical team has been notified.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Button onClick={() => reset()} variant="primary" size="lg" icon="solar:restart-bold">
              Reload & Try Again
            </Button>

            <Link href="/">
              <Button variant="secondary" size="lg" icon="solar:home-2-bold">
                Return to Homepage
              </Button>
            </Link>
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
