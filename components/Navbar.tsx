"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import gsap from "gsap";
import Button from "@/components/Button";

interface NavbarProps {
  onOpenScheduleTour?: () => void;
  theme?: "dark" | "light";
}

export default function Navbar({ onOpenScheduleTour, theme = "dark" }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const pathname = usePathname();

  const isLight = theme === "light" || scrolled;

  const menuOverlayRef = useRef<HTMLDivElement>(null);
  const menuLinksRef = useRef<HTMLDivElement>(null);
  const menuFooterRef = useRef<HTMLDivElement>(null);

  const closeMobileMenu = () => {
    document.body.style.overflow = "unset";
    setMobileMenuOpen(false);
    setIsRendered(false);
  };

  useEffect(() => {
    closeMobileMenu();
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = "unset";
    };
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      if (!isRendered) {
        setIsRendered(true);
        return;
      }
      document.body.style.overflow = "hidden";

      if (!menuOverlayRef.current) return;

      const ctx = gsap.context(() => {
        if (menuOverlayRef.current) {
          gsap.fromTo(
            menuOverlayRef.current,
            { x: "100%", opacity: 0.8 },
            { x: "0%", opacity: 1, duration: 0.45, ease: "power3.out" }
          );
        }

        if (menuLinksRef.current && menuLinksRef.current.children.length > 0) {
          gsap.fromTo(
            menuLinksRef.current.children,
            { opacity: 0, x: 30 },
            { opacity: 1, x: 0, duration: 0.35, stagger: 0.05, ease: "power2.out", delay: 0.15 }
          );
        }

        if (menuFooterRef.current) {
          gsap.fromTo(
            menuFooterRef.current,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.35, ease: "power2.out", delay: 0.3 }
          );
        }
      });

      return () => ctx.revert();
    } else {
      document.body.style.overflow = "unset";
      if (menuOverlayRef.current && isRendered) {
        gsap.to(menuOverlayRef.current, {
          x: "100%",
          opacity: 0.8,
          duration: 0.3,
          ease: "power3.in",
          onComplete: () => {
            setIsRendered(false);
          },
        });
      } else {
        setIsRendered(false);
      }
    }
  }, [mobileMenuOpen, isRendered]);

  return (
    <>
      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 py-3 sm:py-4 ${
          isLight
            ? "bg-surface/95 backdrop-blur-md shadow-sm border-b border-border-subtle"
            : "bg-black/40 backdrop-blur-sm border-b border-white/10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between">
            
            {/* FreedomRoom Brand Logo from repo */}
            <Link
              href="/"
              className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-md p-1 group"
              aria-label="FreedomRoom - Beranda"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-full overflow-hidden border border-brand/40 shadow-sm relative">
                <Image
                  src="/logo/freedom-logo.jpeg"
                  alt="FreedomRoom Logo"
                  fill
                  sizes="40px"
                  priority
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col">
                <span className={`font-heading font-bold text-xl sm:text-2xl tracking-tight leading-none transition-colors duration-300 ${
                  isLight ? "text-primary" : "text-white drop-shadow-sm"
                }`}>
                  Freedom<span className="text-brand">Room</span>
                </span>
                <span className="text-[9px] font-mono tracking-widest uppercase text-muted leading-tight mt-0.5">
                  Apartment, Hotel & Villa
                </span>
              </div>
            </Link>

            {/* Navigation Links */}
            <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-7 text-xs font-semibold uppercase tracking-wider">
              <Link
                href="/booking"
                className={`transition-colors py-1 cursor-pointer whitespace-nowrap ${
                  pathname === "/booking"
                    ? "text-brand font-bold border-b-2 border-brand pb-0.5"
                    : isLight
                    ? "text-primary hover:text-brand"
                    : "text-white/90 hover:text-brand drop-shadow-sm"
                }`}
              >
                Pilihan Penginapan
              </Link>
              <Link
                href="/cek-booking"
                className={`transition-colors py-1 cursor-pointer whitespace-nowrap ${
                  pathname === "/cek-booking"
                    ? "text-brand font-bold border-b-2 border-brand pb-0.5"
                    : isLight
                    ? "text-primary hover:text-brand"
                    : "text-white/90 hover:text-brand drop-shadow-sm"
                }`}
              >
                Cek Booking
              </Link>
              <Link
                href="/location"
                className={`transition-colors py-1 cursor-pointer whitespace-nowrap ${
                  pathname === "/location"
                    ? "text-brand font-bold border-b-2 border-brand pb-0.5"
                    : isLight
                    ? "text-primary hover:text-brand"
                    : "text-white/90 hover:text-brand drop-shadow-sm"
                }`}
              >
                Lokasi & Properti
              </Link>
              <Link
                href="/about"
                className={`transition-colors py-1 cursor-pointer whitespace-nowrap ${
                  pathname === "/about"
                    ? "text-brand font-bold border-b-2 border-brand pb-0.5"
                    : isLight
                    ? "text-primary hover:text-brand"
                    : "text-white/90 hover:text-brand drop-shadow-sm"
                }`}
              >
                Tentang Kami
              </Link>
              <Link
                href="/contact"
                className={`transition-colors py-1 cursor-pointer whitespace-nowrap ${
                  pathname === "/contact"
                    ? "text-brand font-bold border-b-2 border-brand pb-0.5"
                    : isLight
                    ? "text-primary hover:text-brand"
                    : "text-white/90 hover:text-brand drop-shadow-sm"
                }`}
              >
                Kontak WA
              </Link>
            </nav>

            {/* Right Action Button: Daftar (Placeholder) */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href="http://localhost:3005"
                className="inline-flex items-center justify-center gap-1.5 px-4.5 py-2 rounded-xl text-xs font-bold bg-brand text-white hover:bg-[#0A0A0A] transition-all cursor-pointer shadow-sm active:scale-95 border border-brand"
              >
                <Icon icon="solar:user-plus-bold" className="w-4 h-4" />
                <span>Daftar / Portal App</span>
              </a>
            </div>

            {/* Mobile Menu Trigger Button */}
            <button
              type="button"
              onClick={() => {
                setIsRendered(true);
                setMobileMenuOpen(true);
              }}
              className={`md:hidden p-2 rounded-xl border transition-colors cursor-pointer ${
                isLight
                  ? "border-border-subtle bg-surface text-primary hover:bg-sand-200"
                  : "border-white/20 bg-black/50 text-white backdrop-blur-md hover:bg-black/70"
              }`}
              aria-label="Buka Menu"
            >
              <Icon icon="solar:hamburger-menu-linear" className="w-6 h-6" />
            </button>

          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isRendered && (
        <div
          ref={menuOverlayRef}
          className="fixed inset-0 z-50 bg-timber-950/98 backdrop-blur-2xl text-white flex flex-col justify-between p-6 sm:p-10 md:hidden"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-brand/50 relative">
                <Image
                  src="/logo/freedom-logo.jpeg"
                  alt="FreedomRoom Logo"
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div>
                <span className="font-heading font-bold text-xl tracking-tight text-white block leading-none">
                  Freedom<span className="text-brand">Room</span>
                </span>
                <span className="text-[9px] font-mono tracking-widest uppercase text-gray-400">
                  Apartment, Hotel & Villa
                </span>
              </div>
            </div>
            <button
              onClick={closeMobileMenu}
              className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
              aria-label="Tutup Menu"
            >
              <Icon icon="solar:close-circle-linear" className="w-6 h-6" />
            </button>
          </div>

          <div ref={menuLinksRef} className="flex flex-col gap-5 text-xl font-heading font-medium my-auto">
            <Link href="/" onClick={closeMobileMenu} className="hover:text-brand transition-colors">
              Beranda
            </Link>
            <Link href="/booking" onClick={closeMobileMenu} className="hover:text-brand transition-colors text-brand font-bold">
              Pilihan Penginapan & Booking
            </Link>
            <Link href="/cek-booking" onClick={closeMobileMenu} className="hover:text-brand transition-colors">
              Cek Status Booking
            </Link>
            <Link href="/location" onClick={closeMobileMenu} className="hover:text-brand transition-colors">
              Lokasi & Akses
            </Link>
            <Link href="/about" onClick={closeMobileMenu} className="hover:text-brand transition-colors">
              Tentang Kami
            </Link>
            <Link href="/contact" onClick={closeMobileMenu} className="hover:text-brand transition-colors">
              Kontak WhatsApp CS
            </Link>
          </div>

          <div ref={menuFooterRef} className="pt-6 border-t border-white/10 space-y-3">
            <a
              href="http://localhost:3005"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold bg-brand text-white hover:bg-[#0A0A0A] transition-all cursor-pointer shadow-md border border-brand"
            >
              <Icon icon="solar:user-plus-bold" className="w-5 h-5" />
              <span>Buka Portal Member App</span>
            </a>
            <p className="text-center text-xs text-white/50">
              Layanan Booking Apartemen, Hotel & Villa 24 Jam
            </p>
          </div>
        </div>
      )}
    </>
  );
}
