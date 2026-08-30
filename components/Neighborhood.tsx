'use client';

import { Icon } from '@iconify/react';

export default function Neighborhood() {
  const neighborhoodHighlights = [
    {
      label: 'Gerbang Tol Sentul Selatan (Tol Jagorawi)',
      distance: '1.2 km',
      time: '3 Menit',
      icon: 'solar:car-bold',
      desc: 'Akses kilat dari dan menuju Jakarta/Bogor tanpa terjebak titik kemacetan pusat kota.',
    },
    {
      label: 'AEON Mall & IKEA Sentul City',
      distance: '800 meter',
      time: '2 Menit',
      icon: 'solar:bag-bold',
      desc: 'Pusat perbelanjaan terbesar, bioskop IMAX, supermarket internasional, dan kuliner lengkap.',
    },
    {
      label: 'Hutan Pinus & Pemandian Air Panas Gunung Pancar',
      distance: '4.5 km',
      time: '10 Menit',
      icon: 'solar:mountains-bold',
      desc: 'Destinasi wisata alam asri, pemandian air panas alami, dan udara sejuk pegunungan.',
    },
    {
      label: 'SICC (Sentul International Convention Center)',
      distance: '2.0 km',
      time: '5 Menit',
      icon: 'solar:structure-bold',
      desc: 'Lokasi strategis transit bagi pengunjung konser musik internasional, wisuda, dan pameran.',
    },
    {
      label: 'RS EMC Sentul & Universitas Trisakti Sentul',
      distance: '1.5 km',
      time: '4 Menit',
      icon: 'solar:heart-pulse-2-bold',
      desc: 'Fasilitas kesehatan bertaraf internasional dan institusi pendidikan tinggi terdekat.',
    },
    {
      label: 'Lobby Utama, Smart Card & Security 24 Jam',
      distance: '0 Meter',
      time: 'Standby 24/7',
      icon: 'solar:shield-check-bold',
      desc: 'Sistem pengamanan terintegrasi, CCTV aktif 24 jam, dan privasi penuh penghuni.',
    },
  ];

  return (
    <section id="location" aria-labelledby="neighborhood-title" className="bg-canvas py-12 sm:py-16">
      <div className="mx-auto max-w-[1440px] space-y-8 px-4 sm:px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="block text-[10px] font-extrabold uppercase tracking-[0.18em] text-muted">Around your stay</span>
            <h2 id="neighborhood-title" className="font-display text-4xl leading-[1.02] tracking-tight text-primary sm:text-5xl lg:text-6xl">
              Lokasi & Sekitar Properti
            </h2>
            <p className="text-xs sm:text-base text-secondary leading-relaxed">
              Apartemen Sentul Tower berlokasi di titik paling strategis Sentul City dengan akses langsung jalan tol Jagorawi, mall terkemuka, dan destinasi wisata favorit.
            </p>
          </div>

          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-light px-4 py-2 text-xs font-bold text-brand">
            <span className="w-2 h-2 rounded-full bg-brand" />
            3 Menit dari Pintu Tol Sentul Selatan
          </span>
        </div>

        {/* POI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {neighborhoodHighlights.map((poi, idx) => (
            <div
              key={idx}
               className="app-panel flex flex-col justify-between space-y-4 p-5 transition-transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                 <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-light text-brand">
                  <Icon icon={poi.icon} className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-brand bg-brand/10 px-2.5 py-1 rounded-md">
                  <Icon icon="solar:clock-circle-bold" className="w-3.5 h-3.5" />
                  <span>{poi.time}</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-heading font-bold text-sm sm:text-base text-primary leading-snug">
                  {poi.label}
                </h3>
                <p className="text-xs text-secondary leading-relaxed">
                  {poi.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-border-subtle flex items-center justify-between text-xs text-muted">
                <span>Jarak Tempuh</span>
                <span className="font-semibold text-primary">{poi.distance}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
