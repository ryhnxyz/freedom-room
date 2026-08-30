import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lokasi Strategis Sentul City & Akses Tol",
  description:
    "Lokasi prima Apartemen Sentul Tower di pusat Sentul City Bogor. 3 menit dari Tol Sentul Selatan, 800m AEON Mall Sentul, IKEA, dan Gunung Pancar.",
  keywords: [
    "lokasi apartemen sentul tower",
    "apartemen dekat aeon mall sentul",
    "apartemen sentul city",
    "tol sentul selatan",
    "penginapan sentul bogor",
  ],
  alternates: {
    canonical: "https://freedomroom.id/location",
  },
  openGraph: {
    title: "Lokasi Strategis Apartemen Sentul Tower | FreedomRoom",
    description:
      "Akses prima hanya 3 menit dari Pintu Tol Sentul Selatan dan 800 meter dari AEON Mall Sentul City Bogor.",
    url: "https://freedomroom.id/location",
  },
};

export default function LocationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
