import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jurnal & Tips Menginap di Sentul",
  description:
    "Panduan menginap, rekomendasi wisata, dan informasi sewa apartemen transit serta harian di Sentul City dari FreedomRoom.",
  alternates: {
    canonical: "https://freedomroom.id/journal",
  },
  openGraph: {
    title: "Jurnal & Tips Menginap di Sentul | FreedomRoom",
    description:
      "Panduan menginap dan informasi wisata Sentul City dari FreedomRoom.",
    url: "https://freedomroom.id/journal",
    type: "website",
  },
};

export default function JournalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
