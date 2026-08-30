'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';

export const FAQS = [
  {
    q: "Bagaimana cara melakukan reservasi kamar di FreedomRoom?",
    a: "Anda dapat memilih tipe unit kamar di website ini lalu klik 'Booking Kamar' atau langsung menghubungi Customer Service kami via WhatsApp resmi di +62 878 7890 6899 untuk konfirmasi instan.",
  },
  {
    q: "Apa saja pilihan durasi sewa yang tersedia?",
    a: "Kami menyediakan paket transit fleksibel mulai dari 3 Jam, 6 Jam, 8 Jam (Daypass), serta Sewa Harian (Full Day 24 Jam) dan Sewa Bulanan dengan tarif hemat.",
  },
  {
    q: "Fasilitas apa saja yang sudah termasuk di dalam kamar?",
    a: "Setiap kamar dilengkapi Smart TV 50\" dengan aplikasi Netflix & YouTube, AC dingin, WiFi dedicated, kamar mandi dengan shower air hangat (water heater), handuk bersih steril, peralatan mandi, serta akses kolam renang outdoor Sentul Tower.",
  },
  {
    q: "Bagaimana prosedur check-in dan serah terima kunci?",
    a: "Tim customer service kami standby 24 jam untuk menyambut dan menyerahkan kartu akses lift beserta kunci kamar kepada Anda dengan proses cepat, aman, dan privat.",
  },
];

export default function FaqSection() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-canvas py-12 sm:py-16">
      <div className="mx-auto max-w-[1100px] space-y-8 px-4 sm:px-6">
        <div className="space-y-3 text-center max-w-2xl mx-auto">
          <span className="eyebrow block text-muted">Guest information</span>
          <h2 className="font-display text-4xl leading-tight text-primary sm:text-5xl">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-sm sm:text-base text-secondary">
            Informasi lengkap seputar prosedur booking, paket transit, fasilitas kamar, dan check-in di FreedomRoom.
          </p>
        </div>

        <div className="w-full space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                onClick={() => setActiveFaq(isOpen ? null : idx)}
                className="cursor-pointer space-y-2 border-b border-black/15 py-5 transition-colors hover:border-brand sm:py-6"
              >
                <div className="flex items-center justify-between gap-4">
                  <h4 className="font-display text-xl text-primary sm:text-2xl">
                    {faq.q}
                  </h4>
                  <Icon
                    icon="solar:alt-arrow-down-bold"
                    className={`w-4 h-4 text-brand shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </div>
                {isOpen && (
                  <p className="text-xs sm:text-sm text-secondary leading-relaxed pt-3 border-t border-border-subtle">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
