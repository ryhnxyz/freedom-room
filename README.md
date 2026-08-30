# TUMBUH — Modern Cluster Housing Next.js Template

**TUMBUH** is a high-end, luxury cluster housing, masterplanned community discovery, and architectural enclave web template designed and built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS v4**, **GSAP**, **Framer Motion**, and **Lenis Scroll**.

It features an interactive 2D site plan map with Google Maps style zoom & 60fps drag-to-pan controls, architectural model specification modals (`/models/[id]`), sticky bento showcase grids, full-width photo galleries, private showing schedule modals, custom 404 & 500 error pages, and developer console log hints.

---

## ✨ Features

- **⚡ Next.js 15 App Router & Turbopack**: Blazing fast static page generation (`SSG`) and server-side rendering.
- **🎨 Warm Organic Minimalist Architecture**: Refined dark timber & warm sand color palette, Google Sans typography, rich contrast, and 60fps micro-interactions.
- **🗺️ Interactive 2D Vector Masterplan Canvas**: Real-time lot boundary selection, 60fps drag-to-pan, bounded drag limits, and Google Maps style vertical zoom controls (`+`, `-`, `Reset`).
- **🏡 Architectural Specification Models (`/models/[id]`)**: Full floorplan blueprints, ceiling heights, structural foundation specs, solar energy ratings, and layout variation tabs.
- **📜 Lenis 60FPS Stutter-Free Smooth Scroll**: Independent RAF-driven smooth scroll integration synchronized with GSAP ScrollTrigger.
- **📱 100% Mobile & Responsive Optimized**:
  - Curtain-drop animated mobile navigation drawer with scroll lock.
  - Strict 16:9 mobile aspect ratio site plan canvas.
  - Edge-to-edge responsive Bento grids (`CommunityOverview.tsx`).
- **🗓️ Private Showing & Tour Booking Modal**: Interactive calendar tour scheduler with pre-filled house model selection.
- **📰 Editorial Journal & Articles (`/journal`, `/journal/[id]`)**: Sustainability essays, passive cooling guides, and net-zero investment articles.
- **📍 Enclave Location & Neighborhood Map (`/location`)**: Interactive arterial commute times and Hill Country proximity guides.
- **🔔 Custom Error Pages & Developer Easter Egg**: Full-screen Dark Timber 404 & 500 pages, plus an ASCII flame console log on homepage load.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation**: [GSAP 3](https://gsap.com/) & [@gsap/react](https://gsap.com/docs/v3/React/)
- **Scroll Engine**: [Lenis React](https://lenis.darkroom.engineering/)
- **Micro-Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Iconify React](https://iconify.design/) & [Lucide React](https://lucide.dev/)
- **Toast Notifications**: [Sonner](https://sonner.emilkowal.ski/)

---

## 🚀 Quick Start Guide

### Prerequisites
Make sure you have **Node.js 18.x** or higher installed on your machine.

### 1. Installation
Install the project dependencies:
```bash
npm install
```

### 2. Run Development Server
Start the local development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the live app.

### 3. Production Build & Verification
Compile and export the production build:
```bash
npm run build
```
To preview the production build locally:
```bash
npm run start
```

---

## 📁 Project Structure

```
├── public/                # Static images, house models, video & site map assets
│   ├── images/            # House renders, floorplans, site map (map.webp)
│   ├── logo/              # SVG brand mark & vector logos
│   └── video/             # Hero background video
├── app/                   # Next.js App Router pages & routes
│   ├── about/             # Our Story & Masterplan Philosophy page
│   ├── amenities/         # Resident Pavilion & Greenbelt Amenities page
│   ├── contact/           # Sales Gallery & Tour Booking page
│   ├── journal/           # Architectural Journal & Articles ([id])
│   ├── location/          # Neighborhood & Hill Country Location page
│   ├── models/            # Architectural Model Blueprint pages ([id])
│   ├── error.tsx          # 500 Runtime Error Boundary
│   ├── layout.tsx         # Root layout with Lenis & BuyTemplateCTA
│   ├── not-found.tsx      # Custom Minimalist 404 Error page
│   └── page.tsx           # Main Landing Page
├── components/            # Reusable UI components
│   ├── Badge.tsx          # Architectural section badge
│   ├── BlogSection.tsx    # Journal articles grid
│   ├── Button.tsx         # Primary, secondary, outline & ghost buttons
│   ├── BuyTemplateCTA.tsx # Floating UI8 purchase callout CTA
│   ├── CommunityOverview.tsx # Masterplan Bento Grid
│   ├── Dropdown.tsx       # Custom dropdown menu
│   ├── FaqSection.tsx     # Frequently asked questions accordion
│   ├── Hero.tsx           # Fullscreen 60fps video hero header
│   ├── HouseDetailModal.tsx # Model specification modal
│   ├── HouseModels.tsx    # Filterable house models grid
│   ├── LocationSection.tsx # Neighborhood commute map section
│   ├── Masterplan.tsx     # Interactive 2D SVG site plan canvas
│   ├── Navbar.tsx         # Fixed navigation & mobile drawer
│   ├── Select.tsx         # Accessible select control
│   └── TourBookingModal.tsx # Private tour booking modal
├── data/                  # Static data models
│   ├── communityData.ts   # Masterplan plot numbers & coordinates
│   ├── houseModels.ts     # House specifications, beds, baths, sqft
│   └── journalArticles.ts # Journal articles & essay content
└── package.json
```

---

## ⚙️ Customization Guide

### 1. House Models & Architectural Specifications
Update house floorplans, prices, bed/bath counts, and gallery images in [`data/houseModels.ts`](file:///Users/hamzah/Document/Templates/tumbuh/data/houseModels.ts).

### 2. Masterplan Plot Data & Coordinates
Update 2D site plan plot numbers, lot sizes, availability status (`available`, `reserved`, `sold`), and SVG coordinates in [`data/communityData.ts`](file:///Users/hamzah/Document/Templates/tumbuh/data/communityData.ts).

### 3. Editorial Journal Articles
Update journal titles, publication dates, read times, and markdown content in [`data/journalArticles.ts`](file:///Users/hamzah/Document/Templates/tumbuh/data/journalArticles.ts).

---

## 📌 Note & Customization Services

> [!IMPORTANT]
> **This template was designed and developed by Onfire Studios.**  
> If you have a problem, encounter an issue, or want to customize this template even more, we can help you!

### Contact & Support
- **Studio Email**: [onfr.studio@gmail.com](mailto:onfr.studio@gmail.com)
- **Design Engineer**: **Alifia Hamzah**
- **Website**: [https://hamzah.design](https://hamzah.design)

---

© 2026 Onfire Studios. All Rights Reserved.
