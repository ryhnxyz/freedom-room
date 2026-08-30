import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang FreedomRoom Indonesia",
  description:
    "Mengenal FreedomRoom, penyedia layanan sewa apartemen harian dan transit profesional nomor 1 di Sentul Tower Sentul City Bogor.",
  keywords: [
    "tentang freedomroom",
    "profil freedomroom sentul",
    "layanan sewa apartemen bogor",
    "manajemen apartemen sentul",
  ],
  alternates: {
    canonical: "https://freedomroom.id/about",
  },
  openGraph: {
    title: "Tentang FreedomRoom Indonesia | Layanan Sewa Apartemen Sentul Tower",
    description: "Penyedia layanan sewa unit apartemen transit dan harian eksklusif di Sentul Tower Bogor.",
    url: "https://freedomroom.id/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
