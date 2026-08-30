export interface CommunityStat {
  value: string;
  label: string;
  subtext: string;
}

export interface MasterplanPlot {
  id: string;
  plotNumber: string;
  status: 'available' | 'reserved' | 'sold';
  modelAssigned: string;
  modelId: string;
  lotSqft: number;
  price: string;
  orientation: string;
  coordinates: { x: number; y: number };
}

export interface NeighborhoodPerk {
  category: 'commute' | 'schools' | 'dining' | 'parks' | 'safety';
  title: string;
  distance: string;
  time: string;
  rating?: string;
  description: string;
}

export const COMMUNITY_STATS: CommunityStat[] = [
  {
    value: "9 Unit",
    label: "Kamar Apartemen Pilihan",
    subtext: "Lantai 3, 6, 8, 10, dan 11 Sentul Tower",
  },
  {
    value: "3-8 Jam",
    label: "Paket Sewa Transit Fleksibel",
    subtext: "Tersedia juga Sewa Harian & Bulanan",
  },
  {
    value: "100%",
    label: "Sterilisasi Pasca Tamu",
    subtext: "Linen Bersih & Kamar Mandi Higienis",
  },
  {
    value: "3 Menit",
    label: "Ke Pintu Tol Jagorawi & AEON",
    subtext: "Akses Super Cepat di Jantung Sentul City",
  },
];

export const MASTERPLAN_PLOTS: MasterplanPlot[] = [
  { id: "p01", plotNumber: "ST-0305", status: "available", modelAssigned: "One Bed Deluxe Lt 3", modelId: "willow", lotSqft: 32, price: "Rp 150.000 / 3 Jam", orientation: "Lantai 3 Pool Access", coordinates: { x: 15, y: 25 } },
  { id: "p02", plotNumber: "ST-0308", status: "available", modelAssigned: "One Bed Luxury Lt 3", modelId: "juniper", lotSqft: 35, price: "Rp 160.000 / 3 Jam", orientation: "Lantai 3 King Bed", coordinates: { x: 28, y: 22 } },
  { id: "p03", plotNumber: "ST-0610", status: "available", modelAssigned: "Wood Panel Lt 6", modelId: "sequoia", lotSqft: 34, price: "Rp 165.000 / 3 Jam", orientation: "Lantai 6 Wood Theme", coordinates: { x: 42, y: 20 } },
  { id: "p04", plotNumber: "ST-0812", status: "available", modelAssigned: "Studio Deluxe Lt 8", modelId: "willow", lotSqft: 28, price: "Rp 150.000 / 3 Jam", orientation: "Lantai 8 City View", coordinates: { x: 58, y: 22 } },
  { id: "p05", plotNumber: "ST-1002", status: "available", modelAssigned: "One Bed Deluxe Room 102", modelId: "aspen", lotSqft: 36, price: "Rp 175.000 / 3 Jam", orientation: "Lantai 10 Mountain View", coordinates: { x: 72, y: 26 } },
  { id: "p06", plotNumber: "ST-1008", status: "available", modelAssigned: "One Bed Deluxe Lt 10", modelId: "aspen", lotSqft: 34, price: "Rp 165.000 / 3 Jam", orientation: "Lantai 10 Work Desk", coordinates: { x: 85, y: 32 } },
  { id: "p07", plotNumber: "ST-1014", status: "available", modelAssigned: "One Bedroom Lt 10", modelId: "aspen", lotSqft: 32, price: "Rp 155.000 / 3 Jam", orientation: "Lantai 10 Sejuk", coordinates: { x: 18, y: 48 } },
  { id: "p08", plotNumber: "ST-1020", status: "available", modelAssigned: "Type 2BR Luxury Lt 10", modelId: "cypress", lotSqft: 56, price: "Rp 250.000 / 3 Jam", orientation: "Lantai 10 Corner Suite", coordinates: { x: 32, y: 45 } },
  { id: "p09", plotNumber: "ST-1102", status: "available", modelAssigned: "One Bed Skyline Lt 11", modelId: "birch", lotSqft: 36, price: "Rp 170.000 / 3 Jam", orientation: "Lantai 11 Top Floor", coordinates: { x: 48, y: 44 } },
];

export const NEIGHBORHOOD_PERKS: NeighborhoodPerk[] = [
  {
    category: "commute",
    title: "Gerbang Tol Sentul Selatan (Jagorawi)",
    distance: "1.2 km",
    time: "3 Menit",
    description: "Akses tol langsung ke Jakarta, Bogor, dan Ciawi tanpa macet perkotaan.",
  },
  {
    category: "dining",
    title: "AEON Mall Sentul City",
    distance: "800 meter",
    time: "2 Menit",
    description: "Pusat perbelanjaan terbesar, bioskop IMAX, restoran Jepang & kuliner nusantara.",
  },
  {
    category: "dining",
    title: "IKEA Sentul City",
    distance: "1.5 km",
    time: "4 Menit",
    description: "Destinasi perbelanjaan furnitur dan restoran kuliner khas Swedia.",
  },
  {
    category: "parks",
    title: "Taman Wisata Alam Gunung Pancar & Pemandian Air Panas",
    distance: "4.5 km",
    time: "10 Menit",
    description: "Hutan pinus asri, trekking alam, dan pemandian air panas alami pegunungan.",
  },
  {
    category: "schools",
    title: "SICC (Sentul International Convention Center)",
    distance: "2.0 km",
    time: "5 Menit",
    description: "Venue konser musik internasional, wisuda universitas, dan pameran akbar.",
  },
  {
    category: "safety",
    title: "Keamanan 24 Jam & Security Sentul City",
    distance: "0 Meter",
    time: "Standby 24/7",
    description: "Sistem pengawasan CCTV, pos keamanan lobby, dan kartu akses lift berteknologi tinggi.",
  },
];
