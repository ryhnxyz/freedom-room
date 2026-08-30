"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";

interface NavbarProps {
  onOpenScheduleTour?: () => void;
  theme?: "dark" | "light";
}

const navLinks = [
  { href: "/booking", label: "Penginapan", icon: "solar:buildings-2-bold" },
  { href: "/cek-booking", label: "Reservasi", icon: "solar:calendar-mark-bold" },
  { href: "/location", label: "Lokasi", icon: "solar:map-point-bold" },
  { href: "/about", label: "Tentang", icon: "solar:info-circle-bold" },
];

export default function Navbar({ onOpenScheduleTour }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-5 sm:pt-4">
        <div className="mx-auto flex h-[68px] max-w-[1400px] items-center gap-3 rounded-[22px] border border-black/5 bg-canvas/90 px-3 shadow-[0_10px_40px_rgba(17,17,17,0.08)] backdrop-blur-2xl sm:px-4">
          <Link href="/" aria-label="FreedomRoom - Beranda" className="flex shrink-0 items-center gap-3 rounded-2xl">
            <span className="relative h-10 w-10 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
              <Image src="/logo/freedom-logo.jpeg" alt="FreedomRoom" fill sizes="40px" priority className="object-cover" />
            </span>
            <span className="hidden leading-none sm:block">
              <strong className="block font-heading text-lg font-extrabold tracking-tight text-primary">FreedomRoom</strong>
              <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.16em] text-muted">Stay your way</span>
            </span>
          </Link>

          <nav className="mx-auto hidden items-center gap-1 rounded-2xl bg-white p-1.5 shadow-sm ring-1 ring-black/5 md:flex" aria-label="Navigasi utama">
            {navLinks.map((item) => {
              const active = pathname === item.href;
              return (
                <Link key={item.href} href={item.href} className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-bold transition-colors lg:px-4 ${active ? "bg-primary text-white" : "text-secondary hover:bg-canvas hover:text-primary"}`}>
                  <Icon icon={item.icon} className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-2 md:ml-0">
            <button type="button" onClick={onOpenScheduleTour} className="hidden min-h-10 items-center gap-2 rounded-xl bg-brand px-4 text-xs font-extrabold text-white transition-colors hover:bg-brand-hover sm:flex">
              <Icon icon="solar:calendar-add-bold" className="h-4 w-4" />
              Booking
            </button>
            <a href="http://localhost:3005" aria-label="Buka portal member" className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
              <Icon icon="solar:user-bold" className="h-4 w-4" />
            </a>
            <button type="button" onClick={() => setMobileMenuOpen(true)} aria-label="Buka menu" className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-primary ring-1 ring-black/5 md:hidden">
              <Icon icon="solar:hamburger-menu-linear" className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-primary p-4 text-white md:hidden">
          <div className="flex h-full flex-col rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
            <div className="flex items-center justify-between">
              <span className="font-heading text-xl font-extrabold">Freedom<span className="text-brand">Room</span></span>
              <button type="button" onClick={() => setMobileMenuOpen(false)} aria-label="Tutup menu" className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                <Icon icon="solar:close-circle-linear" className="h-5 w-5" />
              </button>
            </div>
            <nav className="my-auto grid gap-2" aria-label="Navigasi mobile">
              <Link href="/" className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-4 text-base font-bold">Beranda<Icon icon="solar:arrow-right-up-linear" className="h-5 w-5 text-brand" /></Link>
              {navLinks.map((item) => (
                <Link key={item.href} href={item.href} className="flex items-center justify-between rounded-2xl px-4 py-4 text-base font-bold text-white/70 hover:bg-white/10 hover:text-white">{item.label}<Icon icon={item.icon} className="h-5 w-5 text-brand" /></Link>
              ))}
              <Link href="/contact" className="flex items-center justify-between rounded-2xl px-4 py-4 text-base font-bold text-white/70 hover:bg-white/10 hover:text-white">Kontak<Icon icon="solar:chat-round-call-bold" className="h-5 w-5 text-brand" /></Link>
            </nav>
            <button type="button" onClick={onOpenScheduleTour} className="flex min-h-13 items-center justify-center gap-2 rounded-2xl bg-brand px-5 text-sm font-extrabold text-white">
              <Icon icon="solar:calendar-add-bold" className="h-5 w-5" />
              Booking sekarang
            </button>
          </div>
        </div>
      )}
    </>
  );
}
