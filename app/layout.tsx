import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import PageProgressBar from "@/components/PageProgressBar";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://freedomroom.id"),
  title: {
    default: "FreedomRoom — Booking Penginapan Apartemen, Hotel & Villa",
    template: "%s | FreedomRoom",
  },
  description:
    "Platform booking penginapan terpercaya untuk sewa apartemen harian & transit, hotel, villa, dan staycation. Fasilitas lengkap, harga bersahabat, konfirmasi instan 24 jam.",
  keywords: [
    "freedomroom",
    "booking penginapan",
    "sewa apartemen harian",
    "sewa apartemen transit",
    "sewa villa murah",
    "hotel transit terdekat",
    "penginapan murah terdekat",
    "staycation murah",
    "apartemen harian bogor sentul",
    "sewa villa keluarga",
    "booking kamar hotel",
    "penginapan transit 3 jam",
    "apartemen studio 1br 2br",
  ],
  authors: [{ name: "FreedomRoom Indonesia", url: "https://freedomroom.id" }],
  creator: "FreedomRoom Indonesia",
  publisher: "FreedomRoom Indonesia",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://freedomroom.id/",
  },
  openGraph: {
    title: "FreedomRoom — Booking Penginapan Apartemen, Hotel & Villa",
    description:
      "Platform booking penginapan terpercaya untuk sewa apartemen harian & transit, hotel, villa, dan staycation.",
    url: "https://freedomroom.id/",
    siteName: "FreedomRoom",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "https://freedomroom.id/logo/freedom-logo.jpeg",
        width: 800,
        height: 800,
        alt: "FreedomRoom Logo",
      },
      {
        url: "/img/freedom-room/one-bed-102-1.png",
        width: 1200,
        height: 630,
        alt: "Penginapan FreedomRoom",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FreedomRoom — Booking Penginapan Apartemen, Hotel & Villa",
    description:
      "Platform booking penginapan terpercaya untuk sewa apartemen harian & transit, hotel, villa, dan staycation.",
    images: ["https://freedomroom.id/logo/freedom-logo.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "geo.region": "ID-JB",
    "geo.placename": "Indonesia",
    "geo.position": "-6.575;106.862",
    ICBM: "-6.575, 106.862",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/logo/freedom-logo.jpeg", type: "image/jpeg" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LodgingBusiness",
      "@id": "https://freedomroom.id/#lodging",
      name: "FreedomRoom — Booking Penginapan Apartemen, Hotel & Villa",
      description:
        "Platform booking penginapan terpercaya untuk sewa apartemen harian & transit, kamar hotel, dan villa dengan fasilitas premium lengkap.",
      image: "https://freedomroom.id/logo/freedom-logo.jpeg",
      url: "https://freedomroom.id/",
      telephone: "+6287878906899",
      priceRange: "$$",
      currenciesAccepted: "IDR",
      paymentAccepted: "Cash, Credit Card, Bank Transfer, QRIS",
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "Ruko STA Shopping Arcade A7, Citaringgul, Kec. Babakan Madang, Kabupaten Bogor, Jawa Barat 16810",
        addressLocality: "Bogor",
        addressRegion: "Jawa Barat",
        postalCode: "16810",
        addressCountry: "ID",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -6.575,
        longitude: 106.862,
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
      amenityFeature: [
        { "@type": "LocationFeatureSpecification", name: "Smart TV (Netflix & YouTube)", value: true },
        { "@type": "LocationFeatureSpecification", name: "High-Speed Dedicated WiFi", value: true },
        { "@type": "LocationFeatureSpecification", name: "Swimming Pool", value: true },
        { "@type": "LocationFeatureSpecification", name: "Water Heater", value: true },
        { "@type": "LocationFeatureSpecification", name: "Kitchenette & Refrigerator", value: true },
        { "@type": "LocationFeatureSpecification", name: "24-Hour Security & Access Card", value: true },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "128",
        bestRating: "5",
        worstRating: "1",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://freedomroom.id/#website",
      url: "https://freedomroom.id/",
      name: "FreedomRoom",
      description: "Booking Penginapan Apartemen, Hotel & Villa",
      publisher: {
        "@id": "https://freedomroom.id/#lodging",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${plusJakarta.variable} ${inter.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="bg-canvas text-primary antialiased selection:bg-brand selection:text-white"
      >
        <PageProgressBar />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
