import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hubungi Customer Service 24 Jam",
  description:
    "Kontak layanan Customer Service dan Front Desk FreedomRoom Sentul Tower 24 jam via WhatsApp +62 878 7890 6899 untuk booking & informasi.",
  keywords: [
    "kontak freedomroom",
    "whatsapp freedomroom sentul",
    "customer service sentul tower",
    "nomor telepon freedomroom",
  ],
  alternates: {
    canonical: "https://freedomroom.id/contact",
  },
  openGraph: {
    title: "Hubungi FreedomRoom Sentul Tower | CS 24 Jam",
    description: "Layanan informasi dan reservasi kamar apartemen Sentul Tower 24 jam nonstop via WhatsApp.",
    url: "https://freedomroom.id/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
