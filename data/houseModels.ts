export interface HouseModel {
  id: string;
  databaseId: string;
  unitNumber: string;
  name: string;
  tagline: string;
  startingPrice: number;
  priceFormatted: string;
  rateTransit3h: number;
  rateTransit6h: number;
  rateTransit8h: number;
  rateFullDay: number;
  rateMonthly: number;
  rateWeekday3h: number;
  rateWeekday6h: number;
  rateWeekday8h: number;
  rateWeekdayFullday21: number;
  rateWeekdayFullday13: number;
  rateWeekend3h: number;
  rateWeekend6h: number;
  rateWeekend8h: number;
  rateWeekendFullday21: number;
  rateWeekendFullday13: number;
  beds: number;
  baths: number;
  sqft: number;
  lotSizeSqft: number;
  garage: string;
  floor: string;
  type: string;
  status: "Available" | "Occupied" | "Cleaning" | "Maintenance";
  ceilingHeight: {
    main: string;
    upper: string;
  };
  foundation: string;
  roofType: string;
  energyRating: string;
  featuredImage: string;
  gallery: { url: string; caption: string }[];
  variants: {
    name: string;
    typeId: string;
    description: string;
    sqftDiff: string;
    priceDelta: string;
    priceAmount: number;
    highlights: string[];
  }[];
  floorPlanSvg: string;
  availablePlots: string[];
  description: string;
  highlights: string[];
}

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function isWeekend(dateStr?: string): boolean {
  if (!dateStr) {
    const day = new Date().getDay();
    return day === 0 || day === 5 || day === 6; // Friday, Saturday, Sunday
  }
  const d = new Date(dateStr);
  const day = d.getDay();
  return day === 0 || day === 5 || day === 6; // Friday, Saturday, Sunday
}

export function calculateRoomPrice(
  room: any,
  packageType: string,
  checkInDateStr?: string,
  nights: number = 1
): number {
  const weekend = isWeekend(checkInDateStr);
  const is2BR = room?.type?.toLowerCase().includes("2 bedroom") || room?.name?.toLowerCase().includes("2 bedroom") || room?.id === "type-2-bedroom-luxury-lt-10";
  const isDeluxe = !is2BR && (room?.type?.toLowerCase().includes("deluxe") || room?.name?.toLowerCase().includes("deluxe"));

  if (is2BR) {
    if (packageType === "transit-3h") return 300000;
    if (packageType === "transit-6h") return weekend ? 450000 : 400000;
    if (packageType === "transit-8h") return weekend ? 550000 : 500000;
    if (packageType === "fullday-21") return (weekend ? 700000 : 600000) * Math.max(1, nights);
    if (packageType === "fullday-13" || packageType === "fullday") return (weekend ? 800000 : 700000) * Math.max(1, nights);
    return 300000;
  }

  if (isDeluxe) {
    if (packageType === "transit-3h") return 150000;
    if (packageType === "transit-6h") return weekend ? 250000 : 200000;
    if (packageType === "transit-8h") return weekend ? 300000 : 250000;
    if (packageType === "fullday-21") return (weekend ? 350000 : 300000) * Math.max(1, nights);
    if (packageType === "fullday-13" || packageType === "fullday") return (weekend ? 500000 : 400000) * Math.max(1, nights);
    return 150000;
  }

  // Standard 1BR & Studio
  if (packageType === "transit-3h") return 150000;
  if (packageType === "transit-6h") return weekend ? 250000 : 200000;
  if (packageType === "transit-8h") return weekend ? 300000 : 250000;
  if (packageType === "fullday-21") return (weekend ? 300000 : 250000) * Math.max(1, nights);
  if (packageType === "fullday-13" || packageType === "fullday") return (weekend ? 450000 : 350000) * Math.max(1, nights);

  return 150000;
}

export const HOUSE_MODELS: HouseModel[] = [
  {
    id: "one-bed-deluxe-lt-10-room102",
    databaseId: "one-bed-deluxe-lt-10-room102",
    unitNumber: "ST-1002",
    name: "One Bedroom Deluxe Lantai 10 (Room 102)",
    tagline: "Unit 1 Bedroom eksklusif Room 102 di lantai 10 Sentul Tower dengan interior mewah.",
    startingPrice: 150000,
    priceFormatted: "Rp 150.000 / 3 Jam",
    rateTransit3h: 150000,
    rateTransit6h: 200000,
    rateTransit8h: 250000,
    rateFullDay: 400000,
    rateMonthly: 5800000,
    rateWeekday3h: 150000,
    rateWeekday6h: 200000,
    rateWeekday8h: 250000,
    rateWeekdayFullday21: 300000,
    rateWeekdayFullday13: 400000,
    rateWeekend3h: 150000,
    rateWeekend6h: 250000,
    rateWeekend8h: 300000,
    rateWeekendFullday21: 350000,
    rateWeekendFullday13: 500000,
    beds: 1,
    baths: 1,
    sqft: 36,
    lotSizeSqft: 36,
    garage: "Lantai 10 · ST-1002",
    floor: "Lantai 10",
    type: "1 Bedroom Deluxe",
    status: "Available",
    ceilingHeight: { main: "3.2 meter", upper: "Balkon asri" },
    foundation: "Sentul Tower",
    roofType: "Full AC",
    energyRating: "Smart TV 50 Inch + High-Speed WiFi",
    featuredImage: "/img/freedom-room/one-bed-102-1.png",
    gallery: [
      { url: "/img/freedom-room/one-bed-102-1.png", caption: "Kamar Tidur Utama King Bed & Smart TV" },
      { url: "/img/freedom-room/one-bed-102-2.png", caption: "Ruang Bersantai & Meja Kerja" },
      { url: "/img/freedom-room/one-bed-102-3.png", caption: "Kitchenette Lengkap & Kulkas" },
      { url: "/img/freedom-room/one-bed-102-4.png", caption: "Kamar Mandi Bersih dengan Water Heater" },
    ],
    variants: [
      { name: "Transit 3 Jam", typeId: "transit-3h", description: "Sesi transit 3 jam", sqftDiff: "36 m²", priceDelta: "Rp 150.000", priceAmount: 150000, highlights: ["Queen Bed", "Smart TV"] },
      { name: "Transit 6 Jam", typeId: "transit-6h", description: "Sesi transit 6 jam santai", sqftDiff: "36 m²", priceDelta: "Rp 200.000 (Wkday) / Rp 250.000 (Wkend)", priceAmount: 200000, highlights: ["Water Heater", "WiFi"] },
      { name: "Transit 8 Jam", typeId: "transit-8h", description: "Transit 8 jam daypass", sqftDiff: "36 m²", priceDelta: "Rp 250.000 (Wkday) / Rp 300.000 (Wkend)", priceAmount: 250000, highlights: ["Smart TV", "Kulkas"] },
      { name: "Full Day (Mulai Jam 13:00)", typeId: "fullday-13", description: "Menginap 24 jam check-in siang", sqftDiff: "36 m²", priceDelta: "Rp 400.000 (Wkday) / Rp 500.000 (Wkend)", priceAmount: 400000, highlights: ["Check-in 13:00", "Access Card"] },
      { name: "Full Day (Mulai Jam 21:00)", typeId: "fullday-21", description: "Menginap malam hemat", sqftDiff: "36 m²", priceDelta: "Rp 300.000 (Wkday) / Rp 350.000 (Wkend)", priceAmount: 300000, highlights: ["Check-in 21:00", "Hemat"] },
    ],
    floorPlanSvg: "/images/floorplan-lt1.webp",
    availablePlots: ["ST-1002"],
    description: "Unit favorit di lantai 10 Sentul Tower dengan fasilitas lengkap dan pemandangan asri Sentul City.",
    highlights: ["Smart TV Netflix & YouTube", "High-Speed WiFi Dedicated", "Kitchenette & Kulkas Pribadi", "Balkon Udara Segar"],
  },
  {
    id: "one-bed-deluxe-lt-10",
    databaseId: "one-bed-deluxe-lt-10",
    unitNumber: "ST-1008",
    name: "One Bedroom Deluxe Lantai 10",
    tagline: "Kenyamanan 1 bedroom di lantai 10 dengan meja kerja dan balkon panorama.",
    startingPrice: 150000,
    priceFormatted: "Rp 150.000 / 3 Jam",
    rateTransit3h: 150000,
    rateTransit6h: 200000,
    rateTransit8h: 250000,
    rateFullDay: 400000,
    rateMonthly: 5500000,
    rateWeekday3h: 150000,
    rateWeekday6h: 200000,
    rateWeekday8h: 250000,
    rateWeekdayFullday21: 300000,
    rateWeekdayFullday13: 400000,
    rateWeekend3h: 150000,
    rateWeekend6h: 250000,
    rateWeekend8h: 300000,
    rateWeekendFullday21: 350000,
    rateWeekendFullday13: 500000,
    beds: 1,
    baths: 1,
    sqft: 34,
    lotSizeSqft: 34,
    garage: "Lantai 10 · ST-1008",
    floor: "Lantai 10",
    type: "1 Bedroom Deluxe",
    status: "Available",
    ceilingHeight: { main: "3.2 meter", upper: "Balkon asri" },
    foundation: "Sentul Tower",
    roofType: "Full AC",
    energyRating: "Dedicated WiFi + Smart TV",
    featuredImage: "/img/freedom-room/one-deluxe-10-1.png",
    gallery: [
      { url: "/img/freedom-room/one-deluxe-10-1.png", caption: "Kasur Queen & Meja Kerja" },
      { url: "/img/freedom-room/one-deluxe-10-2.png", caption: "Smart TV Streaming" },
      { url: "/img/freedom-room/one-deluxe-10-3.png", caption: "Kamar Mandi Higienis" },
    ],
    variants: [
      { name: "Transit 3 Jam", typeId: "transit-3h", description: "Transit 3 jam express", sqftDiff: "34 m²", priceDelta: "Rp 150.000", priceAmount: 150000, highlights: ["Work Desk", "WiFi"] },
      { name: "Transit 6 Jam", typeId: "transit-6h", description: "Transit 6 jam santai", sqftDiff: "34 m²", priceDelta: "Rp 200.000 (Wkday) / Rp 250.000 (Wkend)", priceAmount: 200000, highlights: ["Smart TV", "AC Dingin"] },
      { name: "Full Day (Mulai Jam 13:00)", typeId: "fullday-13", description: "Sewa harian 24 jam", sqftDiff: "34 m²", priceDelta: "Rp 400.000 (Wkday) / Rp 500.000 (Wkend)", priceAmount: 400000, highlights: ["View Lantai 10"] },
    ],
    floorPlanSvg: "/images/floorplan-lt1.webp",
    availablePlots: ["ST-1008"],
    description: "Kamar 1 Bedroom di lantai 10 dengan area kerja nyaman dan koneksi internet stabil.",
    highlights: ["Meja Kerja Nyaman", "Pemandangan Kota Lantai 10", "Water Heater & AC"],
  },
  {
    id: "one-bed-deluxe-lt-3",
    databaseId: "one-bed-deluxe-lt-3",
    unitNumber: "ST-0305",
    name: "One Bed Deluxe Lantai 3",
    tagline: "Akses cepat dan praktis di lantai 3 dekat fasilitas kolam renang dan lobby.",
    startingPrice: 150000,
    priceFormatted: "Rp 150.000 / 3 Jam",
    rateTransit3h: 150000,
    rateTransit6h: 200000,
    rateTransit8h: 250000,
    rateFullDay: 400000,
    rateMonthly: 5200000,
    rateWeekday3h: 150000,
    rateWeekday6h: 200000,
    rateWeekday8h: 250000,
    rateWeekdayFullday21: 300000,
    rateWeekdayFullday13: 400000,
    rateWeekend3h: 150000,
    rateWeekend6h: 250000,
    rateWeekend8h: 300000,
    rateWeekendFullday21: 350000,
    rateWeekendFullday13: 500000,
    beds: 1,
    baths: 1,
    sqft: 32,
    lotSizeSqft: 32,
    garage: "Lantai 3 · ST-0305",
    floor: "Lantai 3",
    type: "1 Bedroom Deluxe",
    status: "Available",
    ceilingHeight: { main: "3.0 meter", upper: "Balkon sejuk" },
    foundation: "Sentul Tower",
    roofType: "Full AC",
    energyRating: "WiFi + Access Card",
    featuredImage: "/img/freedom-room/one-bed-deluxe-1.png",
    gallery: [
      { url: "/img/freedom-room/one-bed-deluxe-1.png", caption: "Kasur Queen & Interior Bersih" },
      { url: "/img/freedom-room/one-bed-deluxe-2.png", caption: "Smart TV & Dapur Mini" },
      { url: "/img/freedom-room/one-bed-deluxe-3.png", caption: "Kamar Mandi Water Heater" },
    ],
    variants: [
      { name: "Transit 3 Jam", typeId: "transit-3h", description: "Transit 3 jam express", sqftDiff: "32 m²", priceDelta: "Rp 150.000", priceAmount: 150000, highlights: ["Queen Bed", "AC Dingin"] },
      { name: "Transit 6 Jam", typeId: "transit-6h", description: "Transit 6 jam santai", sqftDiff: "32 m²", priceDelta: "Rp 200.000 (Wkday) / Rp 250.000 (Wkend)", priceAmount: 200000, highlights: ["Smart TV", "WiFi"] },
      { name: "Full Day (Mulai Jam 13:00)", typeId: "fullday-13", description: "Sewa harian 24 jam", sqftDiff: "32 m²", priceDelta: "Rp 400.000 (Wkday) / Rp 500.000 (Wkend)", priceAmount: 400000, highlights: ["Lantai 3 Cepat"] },
    ],
    floorPlanSvg: "/images/floorplan-lt1.webp",
    availablePlots: ["ST-0305"],
    description: "Kamar 1 Bedroom di lantai 3 dengan akses terdekat ke fasilitas kolam renang Sentul Tower.",
    highlights: ["Dekat Kolam Renang Lantai 3", "Smart TV & WiFi Kencang", "Kamar Mandi Water Heater"],
  },
  {
    id: "type-2-bedroom-luxury-lt-10",
    databaseId: "type-2-bedroom-luxury-lt-10",
    unitNumber: "ST-1020",
    name: "Type 2 Bedroom Luxury Lantai 10",
    tagline: "Pilihan ideal untuk keluarga dengan 2 kamar tidur terpisah dan view pegunungan Sentul.",
    startingPrice: 300000,
    priceFormatted: "Rp 300.000 / 3 Jam",
    rateTransit3h: 300000,
    rateTransit6h: 400000,
    rateTransit8h: 500000,
    rateFullDay: 700000,
    rateMonthly: 8500000,
    rateWeekday3h: 300000,
    rateWeekday6h: 400000,
    rateWeekday8h: 500000,
    rateWeekdayFullday21: 600000,
    rateWeekdayFullday13: 700000,
    rateWeekend3h: 300000,
    rateWeekend6h: 450000,
    rateWeekend8h: 550000,
    rateWeekendFullday21: 700000,
    rateWeekendFullday13: 800000,
    beds: 2,
    baths: 1,
    sqft: 56,
    lotSizeSqft: 56,
    garage: "Lantai 10 · ST-1020",
    floor: "Lantai 10",
    type: "2 Bedroom (2BR)",
    status: "Available",
    ceilingHeight: { main: "3.2 meter", upper: "Balkon ganda" },
    foundation: "Sentul Tower",
    roofType: "Full AC Multi-Split",
    energyRating: "Smart TV 55 Inch + Dining Table",
    featuredImage: "/img/freedom-room/type-2-luxury-1.png",
    gallery: [
      { url: "/img/freedom-room/type-2-luxury-1.png", caption: "Living Room Luas & Smart TV 55 Inch" },
      { url: "/img/freedom-room/type-2-luxury-3.png", caption: "Kamar Tidur Utama & Kamar Anak" },
      { url: "/img/freedom-room/type-2-luxury-4.png", caption: "Dapur Lengkap & Meja Makan" },
    ],
    variants: [
      { name: "Transit 3 Jam", typeId: "transit-3h", description: "Transit 3 jam 2 kamar", sqftDiff: "56 m²", priceDelta: "Rp 300.000", priceAmount: 300000, highlights: ["2 Kamar Tidur", "Living Room"] },
      { name: "Transit 6 Jam", typeId: "transit-6h", description: "Transit 6 jam keluarga", sqftDiff: "56 m²", priceDelta: "Rp 400.000 (Wkday) / Rp 450.000 (Wkend)", priceAmount: 400000, highlights: ["Smart TV 55 Inch", "Dapur"] },
      { name: "Transit 8 Jam", typeId: "transit-8h", description: "Transit 8 jam gathering", sqftDiff: "56 m²", priceDelta: "Rp 500.000 (Wkday) / Rp 550.000 (Wkend)", priceAmount: 500000, highlights: ["Kapasitas 4 Tamu"] },
      { name: "Full Day (Mulai Jam 13:00)", typeId: "fullday-13", description: "Sewa harian 24 jam", sqftDiff: "56 m²", priceDelta: "Rp 700.000 (Wkday) / Rp 800.000 (Wkend)", priceAmount: 700000, highlights: ["View Gunung Pancar", "Dapur Lengkap"] },
      { name: "Full Day (Mulai Jam 21:00)", typeId: "fullday-21", description: "Menginap malam hemat", sqftDiff: "56 m²", priceDelta: "Rp 600.000 (Wkday) / Rp 700.000 (Wkend)", priceAmount: 600000, highlights: ["Check-in 21:00"] },
    ],
    floorPlanSvg: "/images/floorplan-lt1.webp",
    availablePlots: ["ST-1020"],
    description: "Unit 2 Bedroom terluas di Sentul Tower dengan kapasitas hingga 4 orang dewasa.",
    highlights: ["2 Kamar Tidur Terpisah", "Living Room & Meja Makan", "View Spektakuler Gunung Pancar"],
  },
  {
    id: "studio-deluxe-lt-8",
    databaseId: "studio-deluxe-lt-8",
    unitNumber: "ST-0812",
    name: "Studio Deluxe Lantai 8",
    tagline: "Dirancang untuk kenyamanan maksimal saat transit bisnis maupun relaksasi akhir pekan di Sentul City.",
    startingPrice: 150000,
    priceFormatted: "Rp 150.000 / 3 Jam",
    rateTransit3h: 150000,
    rateTransit6h: 200000,
    rateTransit8h: 250000,
    rateFullDay: 350000,
    rateMonthly: 4800000,
    rateWeekday3h: 150000,
    rateWeekday6h: 200000,
    rateWeekday8h: 250000,
    rateWeekdayFullday21: 250000,
    rateWeekdayFullday13: 350000,
    rateWeekend3h: 150000,
    rateWeekend6h: 250000,
    rateWeekend8h: 300000,
    rateWeekendFullday21: 300000,
    rateWeekendFullday13: 450000,
    beds: 1,
    baths: 1,
    sqft: 28,
    lotSizeSqft: 28,
    garage: "Lantai 8 · ST-0812",
    floor: "Lantai 8",
    type: "Studio",
    status: "Available",
    ceilingHeight: { main: "3.0 meter", upper: "Balkon city view" },
    foundation: "Sentul Tower",
    roofType: "Full AC",
    energyRating: "Smart TV Netflix + High-Speed WiFi",
    featuredImage: "/img/freedom-room/studio-8-1.png",
    gallery: [
      { url: "/img/freedom-room/studio-8-1.png", caption: "Kamar Studio Nyaman & Modern" },
      { url: "/img/freedom-room/studio-8-2.png", caption: "Smart TV & Meja Santai" },
      { url: "/img/freedom-room/studio-8-3.png", caption: "Kamar Mandi Higienis Water Heater" },
    ],
    variants: [
      { name: "Transit 3 Jam", typeId: "transit-3h", description: "Transit 3 jam hemat", sqftDiff: "28 m²", priceDelta: "Rp 150.000", priceAmount: 150000, highlights: ["Double Bed", "Smart TV"] },
      { name: "Transit 6 Jam", typeId: "transit-6h", description: "Transit 6 jam santai", sqftDiff: "28 m²", priceDelta: "Rp 200.000 (Wkday) / Rp 250.000 (Wkend)", priceAmount: 200000, highlights: ["WiFi Kencang", "AC"] },
      { name: "Transit 8 Jam", typeId: "transit-8h", description: "Transit 8 jam daypass", sqftDiff: "28 m²", priceDelta: "Rp 250.000 (Wkday) / Rp 300.000 (Wkend)", priceAmount: 250000, highlights: ["Balkon City View"] },
      { name: "Full Day (Mulai Jam 13:00)", typeId: "fullday-13", description: "Menginap 24 jam", sqftDiff: "28 m²", priceDelta: "Rp 350.000 (Wkday) / Rp 450.000 (Wkend)", priceAmount: 350000, highlights: ["Check-in 13:00", "Access Card"] },
      { name: "Full Day (Mulai Jam 21:00)", typeId: "fullday-21", description: "Menginap malam hemat", sqftDiff: "28 m²", priceDelta: "Rp 250.000 (Wkday) / Rp 300.000 (Wkend)", priceAmount: 250000, highlights: ["Check-in 21:00", "Hemat"] },
    ],
    floorPlanSvg: "/images/floorplan-lt1.webp",
    availablePlots: ["ST-0812"],
    description: "Tipe Studio praktis dengan view lepas kota Sentul dan fasilitas hiburan Smart TV Netflix.",
    highlights: ["Smart TV Netflix & YouTube", "High-Speed WiFi Dedicated", "Balkon View Lepas Kota Sentul"],
  },
  {
    id: "one-bedroom-lt-6",
    databaseId: "one-bedroom-lt-6",
    unitNumber: "ST-0610",
    name: "One Bedroom Wood Panel Lantai 6",
    tagline: "Desain panel kayu estetik yang memberikan nuansa hangat ala villa modern di Sentul Tower.",
    startingPrice: 150000,
    priceFormatted: "Rp 150.000 / 3 Jam",
    rateTransit3h: 150000,
    rateTransit6h: 200000,
    rateTransit8h: 250000,
    rateFullDay: 350000,
    rateMonthly: 5600000,
    rateWeekday3h: 150000,
    rateWeekday6h: 200000,
    rateWeekday8h: 250000,
    rateWeekdayFullday21: 250000,
    rateWeekdayFullday13: 350000,
    rateWeekend3h: 150000,
    rateWeekend6h: 250000,
    rateWeekend8h: 300000,
    rateWeekendFullday21: 300000,
    rateWeekendFullday13: 450000,
    beds: 1,
    baths: 1,
    sqft: 34,
    lotSizeSqft: 34,
    garage: "Lantai 6 · ST-0610",
    floor: "Lantai 6",
    type: "1 Bedroom (1BR)",
    status: "Available",
    ceilingHeight: { main: "3.2 meter", upper: "Balkon hijau" },
    foundation: "Sentul Tower",
    roofType: "Full AC",
    energyRating: "Wood Panel Aesthetic + Smart TV 50 Inch",
    featuredImage: "/img/freedom-room/one-bed-6-1.png",
    gallery: [
      { url: "/img/freedom-room/one-bed-6-1.png", caption: "Interior Panel Kayu Estetik & Queen Bed" },
      { url: "/img/freedom-room/one-bed-6-2.png", caption: "Smart TV & Meja Kerja" },
      { url: "/img/freedom-room/one-bed-6-3.png", caption: "Kamar Mandi Modern & Bersih" },
    ],
    variants: [
      { name: "Transit 3 Jam", typeId: "transit-3h", description: "Transit 3 jam express", sqftDiff: "34 m²", priceDelta: "Rp 150.000", priceAmount: 150000, highlights: ["Queen Bed", "Wood Interior"] },
      { name: "Transit 6 Jam", typeId: "transit-6h", description: "Transit 6 jam santai", sqftDiff: "34 m²", priceDelta: "Rp 200.000 (Wkday) / Rp 250.000 (Wkend)", priceAmount: 200000, highlights: ["Smart TV 50 Inch"] },
      { name: "Full Day (Mulai Jam 13:00)", typeId: "fullday-13", description: "Sewa harian 24 jam", sqftDiff: "34 m²", priceDelta: "Rp 350.000 (Wkday) / Rp 450.000 (Wkend)", priceAmount: 350000, highlights: ["Nuansa Villa Modern"] },
    ],
    floorPlanSvg: "/images/floorplan-lt1.webp",
    availablePlots: ["ST-0610"],
    description: "Kamar 1 Bedroom bernuansa hangat dengan aksen wood panel estetik dan pencahayaan lembut.",
    highlights: ["Interior Wood Panel Estetik", "Smart TV 50 Inch Netflix", "Water Heater & Dapur Mini"],
  },
  {
    id: "one-bedroom-lt-11",
    databaseId: "one-bedroom-lt-11",
    unitNumber: "ST-1102",
    name: "One Bedroom Skyline Lantai 11",
    tagline: "Unit lantai 11 dengan view lepas ke perbukitan dan kota Sentul.",
    startingPrice: 150000,
    priceFormatted: "Rp 150.000 / 3 Jam",
    rateTransit3h: 150000,
    rateTransit6h: 200000,
    rateTransit8h: 250000,
    rateFullDay: 350000,
    rateMonthly: 5700000,
    rateWeekday3h: 150000,
    rateWeekday6h: 200000,
    rateWeekday8h: 250000,
    rateWeekdayFullday21: 250000,
    rateWeekdayFullday13: 350000,
    rateWeekend3h: 150000,
    rateWeekend6h: 250000,
    rateWeekend8h: 300000,
    rateWeekendFullday21: 300000,
    rateWeekendFullday13: 450000,
    beds: 1,
    baths: 1,
    sqft: 36,
    lotSizeSqft: 36,
    garage: "Lantai 11 · ST-1102",
    floor: "Lantai 11",
    type: "1 Bedroom (1BR)",
    status: "Available",
    ceilingHeight: { main: "3.2 meter", upper: "Balkon skyline view" },
    foundation: "Sentul Tower",
    roofType: "Full AC",
    energyRating: "Top Floor Panorama + Smart TV 50 Inch",
    featuredImage: "/img/freedom-room/one-bed-l11-1.png",
    gallery: [
      { url: "/img/freedom-room/one-bed-l11-1.png", caption: "Kamar Lantai 11 dengan View Panorama" },
      { url: "/img/freedom-room/one-bed-l11-2.png", caption: "Smart TV Streaming & AC Dingin" },
      { url: "/img/freedom-room/one-bed-l11-3.png", caption: "Kamar Mandi Water Heater" },
    ],
    variants: [
      { name: "Transit 3 Jam", typeId: "transit-3h", description: "Transit 3 jam skyline", sqftDiff: "36 m²", priceDelta: "Rp 150.000", priceAmount: 150000, highlights: ["Top Floor View"] },
      { name: "Transit 6 Jam", typeId: "transit-6h", description: "Transit 6 jam", sqftDiff: "36 m²", priceDelta: "Rp 200.000 (Wkday) / Rp 250.000 (Wkend)", priceAmount: 200000, highlights: ["Smart TV 50 Inch"] },
      { name: "Full Day (Mulai Jam 13:00)", typeId: "fullday-13", description: "Sewa harian 24 jam", sqftDiff: "36 m²", priceDelta: "Rp 350.000 (Wkday) / Rp 450.000 (Wkend)", priceAmount: 350000, highlights: ["Skyline View"] },
    ],
    floorPlanSvg: "/images/floorplan-lt1.webp",
    availablePlots: ["ST-1102"],
    description: "Kamar lantai 11 tertinggi dengan pemandangan bukit Sentul City yang memanjakan mata.",
    highlights: ["Top Floor Skyline View", "Smart TV 50 Inch Netflix", "Water Heater & Balkon"],
  },
  {
    id: "one-bed-luxury-lt-3",
    databaseId: "one-bed-luxury-lt-3",
    unitNumber: "ST-0308",
    name: "One Bed Luxury Lantai 3",
    tagline: "Sentuhan interior luxury di lantai 3 dengan pencahayaan warm ambient dan kasur King-size.",
    startingPrice: 150000,
    priceFormatted: "Rp 150.000 / 3 Jam",
    rateTransit3h: 150000,
    rateTransit6h: 200000,
    rateTransit8h: 250000,
    rateFullDay: 350000,
    rateMonthly: 5400000,
    rateWeekday3h: 150000,
    rateWeekday6h: 200000,
    rateWeekday8h: 250000,
    rateWeekdayFullday21: 250000,
    rateWeekdayFullday13: 350000,
    rateWeekend3h: 150000,
    rateWeekend6h: 250000,
    rateWeekend8h: 300000,
    rateWeekendFullday21: 300000,
    rateWeekendFullday13: 450000,
    beds: 1,
    baths: 1,
    sqft: 35,
    lotSizeSqft: 35,
    garage: "Lantai 3 · ST-0308",
    floor: "Lantai 3",
    type: "1 Bedroom (1BR)",
    status: "Available",
    ceilingHeight: { main: "3.0 meter", upper: "Balkon kolam renang" },
    foundation: "Sentul Tower",
    roofType: "Full AC",
    energyRating: "Smart TV 50 Inch + Smart Lock",
    featuredImage: "/img/freedom-room/one-bed-luxury-1.png",
    gallery: [
      { url: "/img/freedom-room/one-bed-luxury-1.png", caption: "King-Size Bed Mewah & Warm Lighting" },
      { url: "/img/freedom-room/one-bed-luxury-2.png", caption: "Area Duduk & TV Streaming" },
      { url: "/img/freedom-room/one-bed-luxury-3.png", caption: "Kamar Mandi Higienis" },
    ],
    variants: [
      { name: "Transit 3 Jam", typeId: "transit-3h", description: "Transit 3 jam express", sqftDiff: "35 m²", priceDelta: "Rp 150.000", priceAmount: 150000, highlights: ["King Bed", "Dekat Pool"] },
      { name: "Transit 6 Jam", typeId: "transit-6h", description: "Transit 6 jam santai", sqftDiff: "35 m²", priceDelta: "Rp 200.000 (Wkday) / Rp 250.000 (Wkend)", priceAmount: 200000, highlights: ["Smart TV 50 Inch"] },
      { name: "Full Day (Mulai Jam 13:00)", typeId: "fullday-13", description: "Sewa harian 24 jam", sqftDiff: "35 m²", priceDelta: "Rp 350.000 (Wkday) / Rp 450.000 (Wkend)", priceAmount: 350000, highlights: ["Akses Cepat Lantai 3"] },
    ],
    floorPlanSvg: "/images/floorplan-lt1.webp",
    availablePlots: ["ST-0308"],
    description: "Kemudahan akses lantai 3 dekat fasilitas kolam renang outdoor Sentul Tower.",
    highlights: ["Akses Tercepat Dekat Kolam Renang", "Kasur King-Size Empuk", "Pencahayaan Warm Ambient"],
  },
  {
    id: "one-bedroom-lt-10",
    databaseId: "one-bedroom-lt-10",
    unitNumber: "ST-1014",
    name: "One Bedroom Lantai 10",
    tagline: "Unit 1 Bedroom di lantai 10 dengan sirkulasi udara sejuk dan privasi penuh.",
    startingPrice: 150000,
    priceFormatted: "Rp 150.000 / 3 Jam",
    rateTransit3h: 150000,
    rateTransit6h: 200000,
    rateTransit8h: 250000,
    rateFullDay: 350000,
    rateMonthly: 5300000,
    rateWeekday3h: 150000,
    rateWeekday6h: 200000,
    rateWeekday8h: 250000,
    rateWeekdayFullday21: 250000,
    rateWeekdayFullday13: 350000,
    rateWeekend3h: 150000,
    rateWeekend6h: 250000,
    rateWeekend8h: 300000,
    rateWeekendFullday21: 300000,
    rateWeekendFullday13: 450000,
    beds: 1,
    baths: 1,
    sqft: 32,
    lotSizeSqft: 32,
    garage: "Lantai 10 · ST-1014",
    floor: "Lantai 10",
    type: "1 Bedroom (1BR)",
    status: "Available",
    ceilingHeight: { main: "3.0 meter", upper: "Balkon asri" },
    foundation: "Sentul Tower",
    roofType: "Full AC",
    energyRating: "Dedicated WiFi",
    featuredImage: "/img/freedom-room/one-bed-1.png",
    gallery: [
      { url: "/img/freedom-room/one-bed-1.png", caption: "Kamar 1BR Nyaman" },
      { url: "/img/freedom-room/one-bed-2.png", caption: "Smart TV & AC Dingin" },
      { url: "/img/freedom-room/one-bed-3.png", caption: "Kamar Mandi Bersih" },
    ],
    variants: [
      { name: "Transit 3 Jam", typeId: "transit-3h", description: "Transit 3 jam express", sqftDiff: "32 m²", priceDelta: "Rp 150.000", priceAmount: 150000, highlights: ["Queen Bed", "AC Dingin"] },
      { name: "Transit 6 Jam", typeId: "transit-6h", description: "Transit 6 jam santai", sqftDiff: "32 m²", priceDelta: "Rp 200.000 (Wkday) / Rp 250.000 (Wkend)", priceAmount: 200000, highlights: ["WiFi Kencang"] },
      { name: "Full Day (Mulai Jam 13:00)", typeId: "fullday-13", description: "Sewa harian 24 jam", sqftDiff: "32 m²", priceDelta: "Rp 350.000 (Wkday) / Rp 450.000 (Wkend)", priceAmount: 350000, highlights: ["Privasi Penuh"] },
    ],
    floorPlanSvg: "/images/floorplan-lt1.webp",
    availablePlots: ["ST-1014"],
    description: "Kamar 1 Bedroom privat dan tenang di lantai 10 Sentul Tower.",
    highlights: ["Sirkulasi Udara Segar", "Smart TV Netflix", "Water Heater Instant"],
  },
];

export function getModelById(id: string): HouseModel | undefined {
  const clean = (id || "").toLowerCase().trim();
  const legacyAliases: Record<string, string> = {
    aspen: "one-bed-deluxe-lt-10-room102",
    willow: "one-bed-deluxe-lt-10",
    cypress: "one-bed-deluxe-lt-3",
    sequoia: "type-2-bedroom-luxury-lt-10",
    birch: "studio-deluxe-lt-8",
    juniper: "one-bedroom-lt-6",
  };
  const targetId = legacyAliases[clean] || clean;

  return (
    HOUSE_MODELS.find(
      (m) =>
        m.id.toLowerCase() === targetId ||
        m.databaseId.toLowerCase() === targetId ||
        m.unitNumber.toLowerCase() === targetId ||
        m.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").includes(targetId)
    ) || HOUSE_MODELS[0]
  );
}

export function getAllModelIds(): string[] {
  return HOUSE_MODELS.map((m) => m.id);
}
