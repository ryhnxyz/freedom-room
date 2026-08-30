'use client';

import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/Button';
import Badge from '@/components/Badge';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-timber-950 text-white relative selection:bg-brand selection:text-white flex items-center justify-center overflow-hidden">
      
      {/* Ambient Background Image & Gradient Overlay */}
      <div className="absolute inset-0 opacity-25 pointer-events-none">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop"
          alt="404 Background Architecture"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-timber-950 via-timber-950/85 to-timber-950" />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 text-center space-y-6 sm:space-y-8 py-16">
        
        <div className="inline-flex justify-center">
          <Badge>404 NOT FOUND</Badge>
        </div>

        <div className="space-y-3">
          <span className="font-mono text-6xl sm:text-8xl lg:text-9xl font-bold text-brand-light block tracking-tight">
            404
          </span>
          <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Blueprint Uncharted.
          </h1>
        </div>

        <p className="text-sm sm:text-base text-sand-200/90 max-w-lg mx-auto font-sans leading-relaxed">
          The architectural parcel or page you are looking for does not exist or has been relocated within our masterplan.
        </p>

        <div className="pt-2 flex justify-center">
          <Link href="/">
            <Button variant="primary" size="lg" icon="solar:home-2-bold">
              Return to Homepage
            </Button>
          </Link>
        </div>

      </div>
    </main>
  );
}
