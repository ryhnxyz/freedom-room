import { notFound } from "next/navigation";
import { HOUSE_MODELS, getModelById } from "@/data/houseModels";
import ModelDetailClient from "./ModelDetailClient";
import type { Metadata } from "next";

export function generateStaticParams() {
  const ids = new Set<string>();
  HOUSE_MODELS.forEach((m) => {
    ids.add(m.id);
    if (m.databaseId) ids.add(m.databaseId);
  });
  return Array.from(ids).map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const model = getModelById(id);
  if (!model) {
    return {
      title: "Unit Tidak Ditemukan — FreedomRoom Sentul Tower",
    };
  }

  const title = `${model.name} (${model.garage}) — Sewa Apartemen Transit & Harian Sentul Tower`;
  const description = `${model.tagline} Tarif transit mulai ${model.priceFormatted}. Dilengkapi ${model.beds} Kamar, ${model.baths} Kamar Mandi, ${model.sqft} m², Smart TV, WiFi kencang, dan kolam renang.`;

  return {
    title,
    description,
    keywords: [
      `sewa ${model.name.toLowerCase()}`,
      `apartemen ${model.unitNumber.toLowerCase()}`,
      "sewa apartemen sentul tower",
      "transit sentul tower",
      "sewa harian sentul",
      "penginapan murah sentul city",
    ],
    alternates: {
      canonical: `https://freedomroom.id/room/${model.id}`,
    },
    openGraph: {
      title,
      description,
      url: `https://freedomroom.id/room/${model.id}`,
      type: "article",
      images: [
        {
          url: model.featuredImage,
          width: 1200,
          height: 630,
          alt: `${model.name} FreedomRoom Sentul Tower`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [model.featuredImage],
    },
  };
}

export default async function ModelDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const model = getModelById(id);

  if (!model) {
    notFound();
  }

  const roomJsonLd = {
    "@context": "https://schema.org",
    "@type": "HotelRoom",
    name: `${model.name} — Apartemen Sentul Tower`,
    description: model.tagline,
    image: model.featuredImage,
    bed: {
      "@type": "BedDetails",
      numberOfBeds: model.beds,
      typeOfBed: "Queen/King Bed",
    },
    occupancy: {
      "@type": "QuantitativeValue",
      maxValue: model.beds * 2,
    },
    floorSize: {
      "@type": "QuantitativeValue",
      value: model.sqft,
      unitCode: "MTK",
    },
    offers: {
      "@type": "Offer",
      price: model.startingPrice,
      priceCurrency: "IDR",
      availability: "https://schema.org/InStock",
      url: `https://freedomroom.id/room/${model.id}`,
    },
    containedInPlace: {
      "@type": "LodgingBusiness",
      name: "FreedomRoom - Sewa Apartemen Sentul Tower",
      url: "https://freedomroom.id/",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(roomJsonLd) }}
      />
      <ModelDetailClient model={model} />
    </>
  );
}
