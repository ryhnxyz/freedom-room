import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cek Status Reservasi Tamu",
  description:
    "Lacak status reservasi kamar apartemen Sentul Tower Anda secara realtime menggunakan Kode Booking (RL-XXXX) atau nomor WhatsApp.",
  keywords: [
    "cek booking freedomroom",
    "lacak reservasi apartemen sentul",
    "status booking sentul tower",
  ],
  alternates: {
    canonical: "https://freedomroom.id/cek-booking",
  },
  openGraph: {
    title: "Cek Status Reservasi Tamu | FreedomRoom Sentul Tower",
    description: "Lacak status reservasi dan jadwal check-in kamar Anda di FreedomRoom Sentul Tower.",
    url: "https://freedomroom.id/cek-booking",
  },
  robots: {
    index: false,
    follow: false,
    noarchive: true,
  },
};

export default function CekBookingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
