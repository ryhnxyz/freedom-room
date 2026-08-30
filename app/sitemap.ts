import { MetadataRoute } from "next";
import { HOUSE_MODELS } from "@/data/houseModels";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://freedomroom.id";
  const lastModified = new Date();

  // Static main pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/booking`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/cek-booking`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/location`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.75,
    },
  ];

  // Dynamic Room pages
  const roomPages: MetadataRoute.Sitemap = HOUSE_MODELS.map((room) => ({
    url: `${baseUrl}/models/${room.id}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [...staticPages, ...roomPages];
}
