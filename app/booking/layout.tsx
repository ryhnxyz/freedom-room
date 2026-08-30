import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pilihan Unit Apartemen Sentul Tower (Transit & Harian)",
  description:
    "Pilihan sewa unit apartemen Sentul Tower Studio, 1BR, dan 2BR. Tarif transit 3 jam, 6 jam, 8 jam, dan harian. Booking cepat harga terjangkau di Bogor!",
  keywords: [
    "sewa apartemen sentul tower",
    "katalog kamar sentul tower",
    "sewa studio sentul",
    "sewa 1 bedroom sentul",
    "transit sentul city",
    "booking apartemen sentul",
  ],
  alternates: {
    canonical: "https://freedomroom.id/booking",
  },
  openGraph: {
    title: "Pilihan Unit Apartemen Sentul Tower | FreedomRoom",
    description:
      "Daftar lengkap 9 unit apartemen Sentul Tower siap huni dengan fasilitas Smart TV, WiFi, dan Kolam Renang.",
    url: "https://freedomroom.id/booking",
  },
};

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
