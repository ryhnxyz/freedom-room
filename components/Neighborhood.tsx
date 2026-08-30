'use client';

import Badge from '@/components/Badge';

export default function Neighborhood() {
  const neighborhoodHighlights = [
    {
      label: 'Gerbang Tol Sentul Selatan (Tol Jagorawi)',
      distance: '1.2 km',
      time: '3 Menit',
      svg: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 stroke-brand shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
          <circle cx="7" cy="17" r="2" />
          <path d="M9 17h6" />
          <circle cx="17" cy="17" r="2" />
        </svg>
      ),
    },
    {
      label: 'AEON Mall Sentul City',
      distance: '800 meter',
      time: '2 Menit',
      svg: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 stroke-brand shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
          <path d="M3 6h18" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      ),
    },
    {
      label: 'IKEA Sentul City',
      distance: '1.5 km',
      time: '4 Menit',
      svg: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 stroke-brand shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      label: 'Hutan Pinus & Pemandian Air Panas Gunung Pancar',
      distance: '4.5 km',
      time: '10 Menit',
      svg: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 stroke-brand shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 10a6 6 0 0 0-6-6H3v2a6 6 0 0 0 6 6h3" />
          <path d="M7 14a6 6 0 0 0 6 6h3v-2a6 6 0 0 0-6-6H7" />
          <path d="M14 4v16" />
        </svg>
      ),
    },
    {
      label: 'SICC (Sentul International Convention Center)',
      distance: '2.0 km',
      time: '5 Menit',
      svg: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 stroke-brand shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21h18" />
          <path d="M5 21V7l8-4v18" />
          <path d="M19 21V11l-6-4" />
        </svg>
      ),
    },
    {
      label: 'Lobby Utama, Smart Card & Security 24 Jam',
      distance: '0 Meter',
      time: 'Standby 24/7',
      svg: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 stroke-brand shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      ),
    },
  ];

  return (
    <section id="location" aria-labelledby="neighborhood-title" className="py-16 sm:py-24 bg-canvas border-b border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <Badge>LOKASI & SEKITAR</Badge>
            <h2 id="neighborhood-title" className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-primary">
              Akses cepat ke pusat gaya hidup & hiburan.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-secondary max-w-md leading-relaxed">
            Berada di lokasi paling strategis Sentul City, memudahkan mobilitas Anda saat transit, liburan akhir pekan, maupun perjalanan bisnis.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {neighborhoodHighlights.map((item) => (
            <div
              key={item.label}
              className="bg-surface rounded-2xl p-5 border border-border-subtle shadow-sm flex flex-col justify-between space-y-4 transition-all hover:border-brand/40 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="p-2.5 rounded-xl bg-sand-100 border border-border-subtle">
                  {item.svg}
                </div>
                <div className="text-right">
                  <span className="font-mono text-xs font-bold text-brand block">{item.time}</span>
                  <span className="text-[11px] text-muted">{item.distance}</span>
                </div>
              </div>

              <div>
                <h3 className="font-heading text-base font-bold text-primary leading-snug">
                  {item.label}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
