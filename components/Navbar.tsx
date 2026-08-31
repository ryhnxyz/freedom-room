"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";

interface NavbarProps {
  theme?: "dark" | "light";
}

const navLinks = [
  { href: "https://app.freedomroom.id", label: "Unit", icon: "solar:buildings-2-bold", external: true },
  { href: "/location", label: "Lokasi", icon: "solar:map-point-bold" },
  { href: "/about", label: "Tentang Kami", icon: "solar:info-circle-bold" },
  { href: "/journal", label: "Jurnal", icon: "solar:book-2-bold" },
];

export default function Navbar({ theme: _theme }: NavbarProps) {
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
      <header className="fixed inset-x-0 top-0 z-40 border-b border-black/5 bg-canvas/90 shadow-sm backdrop-blur-2xl">
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center gap-3 px-4 sm:px-6 lg:px-10">
          <Link href="/" aria-label="FreedomRoom - Beranda" className="flex shrink-0 items-center gap-3 rounded-2xl">
            <span className="relative h-11 w-14 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-brand/15">
              <Image src="/logo/freedom-logo.png" alt="FreedomRoom" fill sizes="56px" priority className="object-contain p-0.5" />
            </span>
            <span className="hidden leading-none sm:block">
              <strong className="block font-heading text-lg font-extrabold tracking-tight text-primary">FreedomRoom</strong>
              <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.16em] text-muted">Stay your way</span>
            </span>
          </Link>

          <nav className="mx-auto hidden items-center gap-7 md:flex lg:gap-10" aria-label="Navigasi utama">
            {navLinks.map((item) => {
              const active = pathname === item.href;
              return (
                <Link key={item.href} href={item.href} target={item.external ? "_blank" : undefined} rel={item.external ? "noopener noreferrer" : undefined} className={`border-b py-2 text-[11px] font-bold uppercase tracking-[0.12em] transition-colors ${active ? "border-brand text-primary" : "border-transparent text-secondary hover:border-black/20 hover:text-primary"}`}>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-2 md:ml-0">
            <a href="https://app.freedomroom.id" target="_blank" rel="noopener noreferrer" className="hidden min-h-10 items-center gap-2 border border-primary bg-primary px-5 text-[11px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:border-brand hover:bg-brand sm:flex">
              Reservasi
            </a>
            <a href="https://app.freedomroom.id" target="_blank" rel="noopener noreferrer" aria-label="Buka portal member" className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
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
              <Link href="/" className="flex items-center justify-between border-b border-white/10 px-1 py-4 font-display text-2xl">Beranda<Icon icon="solar:arrow-right-up-linear" className="h-5 w-5 text-brand" /></Link>
              {navLinks.map((item) => (
                <Link key={item.href} href={item.href} target={item.external ? "_blank" : undefined} rel={item.external ? "noopener noreferrer" : undefined} className="flex items-center justify-between border-b border-white/10 px-1 py-4 font-display text-2xl text-white/75 hover:text-white">{item.label}<Icon icon="solar:arrow-right-linear" className="h-5 w-5 text-brand" /></Link>
              ))}
              <Link href="/contact" className="flex items-center justify-between border-b border-white/10 px-1 py-4 font-display text-2xl text-white/75 hover:text-white">Kontak<Icon icon="solar:arrow-right-linear" className="h-5 w-5 text-brand" /></Link>
            </nav>
            <a href="https://app.freedomroom.id" target="_blank" rel="noopener noreferrer" className="flex min-h-13 items-center justify-center gap-2 rounded-2xl bg-brand px-5 text-sm font-extrabold text-white">
              <Icon icon="solar:calendar-add-bold" className="h-5 w-5" />
              Booking sekarang
            </a>
          </div>
        </div>
      )}
    </>
  );
}
