'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import FaqSection from '@/components/FaqSection';
import { HOUSE_MODELS } from '@/data/houseModels';
import { Icon } from '@iconify/react';

const TourBookingModal = dynamic(() => import('@/components/TourBookingModal'), { ssr: false });

export default function ContactPage() {
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [selectedModel, setSelectedModel] = useState(HOUSE_MODELS[0].name);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const waUrl = `https://wa.me/6287878906899?text=${encodeURIComponent(
    `Halo FreedomRoom Sentul Tower, saya ${fullName} (${phone}).\nUnit yang diminati: ${selectedModel}\nPesan: ${message || 'Ingin menanyakan ketersediaan kamar.'}`
  )}`;

  return (
    <main className="min-h-screen bg-canvas text-primary relative selection:bg-brand selection:text-white">
      <Navbar onOpenScheduleTour={() => setIsTourModalOpen(true)} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 bg-timber-950 text-white overflow-hidden border-b border-border-subtle">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/freedom-room/contact-vector.svg"
            alt="FreedomRoom Contact Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-timber-950 via-timber-950/80 to-canvas" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 space-y-4">
          <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white w-full leading-[1.1]">
            Konsultasi & Reservasi Kamar.
          </h1>
          <p className="text-base sm:text-lg text-sand-200/90 max-w-2xl font-sans leading-relaxed">
            Customer service kami siap membantu Anda 24 jam untuk reservasi sewa transit, info ketersediaan unit, maupun permintaan khusus saat menginap.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* Left: Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-primary">
                Lokasi & Front Desk Sentul Tower
              </h2>
              <p className="text-sm text-secondary leading-relaxed font-sans">
                Kunjungi unit kami di Apartemen Sentul Tower, Sentul City, Bogor. Pengambilan kartu akses dan kunci kamar dilayani secara ramah dan profesional.
              </p>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-surface border border-border-subtle shadow-sm">
                <Icon icon="solar:map-point-bold" className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-primary font-bold">Alamat Apartemen</strong>
                  <span className="text-secondary">Ruko STA Shopping Arcade A7, Citaringgul, Kec. Babakan Madang, Kabupaten Bogor, Jawa Barat 16810</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-surface border border-border-subtle shadow-sm">
                <Icon icon="solar:chat-round-call-bold" className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-primary font-bold">WhatsApp Resmi</strong>
                  <span className="text-secondary font-mono">+62 878 7890 6899 (Chat 24 Jam)</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-surface border border-border-subtle shadow-sm">
                <Icon icon="solar:letter-bold" className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-primary font-bold">Email Layanan</strong>
                  <span className="text-secondary">admin@freedomroom.id</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-surface border border-border-subtle shadow-sm">
                <Icon icon="solar:clock-circle-bold" className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-primary font-bold">Jam Layanan Check-in</strong>
                  <span className="text-secondary">Standby 24 Jam (Check-in fleksibel)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Interactive Message Form */}
          <div className="lg:col-span-7 bg-surface rounded-2xl p-6 sm:p-10 border border-border-subtle shadow-sm space-y-6">
            <div className="space-y-2">
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-primary">
                Kirim Pesan ke Customer Service
              </h3>
              <p className="text-xs sm:text-sm text-secondary font-sans leading-relaxed">
                Isi form di bawah untuk terhubung langsung dengan tim kami via WhatsApp.
              </p>
            </div>

            {formSubmitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-brand/15 text-[#b39229] flex items-center justify-center mx-auto">
                  <Icon icon="solar:check-circle-bold" className="w-6 h-6" />
                </div>
                <h4 className="font-heading font-bold text-xl text-primary">Pesan Siap Dikirim</h4>
                <p className="text-xs text-secondary max-w-md mx-auto">
                  Klik tombol di bawah untuk membuka obrolan langsung di WhatsApp CS FreedomRoom.
                </p>
                <div className="pt-2">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-solid inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-semibold text-xs uppercase tracking-wider"
                  >
                    <Icon icon="solar:chat-round-call-bold" className="w-4 h-4" />
                    Lanjut Chat WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-primary mb-1">Nama Lengkap</label>
                    <input
                      required
                      type="text"
                      placeholder="Contoh: Rian Pratama"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-canvas border border-border-subtle rounded-xl px-3.5 py-2.5 text-xs text-primary focus:outline-none focus:ring-2 focus:ring-brand/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-primary mb-1">Nomor WhatsApp</label>
                    <input
                      required
                      type="tel"
                      placeholder="Contoh: 081288990011"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-canvas border border-border-subtle rounded-xl px-3.5 py-2.5 text-xs text-primary focus:outline-none focus:ring-2 focus:ring-brand/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-primary mb-1">Unit Kamar yang Diminati</label>
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full bg-canvas border border-border-subtle rounded-xl px-3.5 py-2.5 text-xs text-primary focus:outline-none focus:ring-2 focus:ring-brand/20"
                  >
                    {HOUSE_MODELS.map((m) => (
                      <option key={m.id} value={m.name}>
                        {m.name} ({m.priceFormatted})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-primary mb-1">Pertanyaan / Pesan</label>
                  <textarea
                    rows={3}
                    placeholder="Contoh: Apakah unit tersedia untuk transit 3 jam nanti malam jam 20:00?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-canvas border border-border-subtle rounded-xl px-3.5 py-2 text-xs text-primary focus:outline-none focus:ring-2 focus:ring-brand/20 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full justify-center"
                  icon="solar:chat-round-call-bold"
                >
                  Hubungi via WhatsApp
                </Button>
              </form>
            )}
          </div>

        </div>
      </section>

      <Footer />
      <TourBookingModal isOpen={isTourModalOpen} onClose={() => setIsTourModalOpen(false)} />
    </main>
  );
}
