import { useLenis } from 'lenis/react';
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { HouseModel } from '@/data/houseModels';
import { X, Calendar, Check, ChevronLeft, ChevronRight, Building, Sun, Layers } from 'lucide-react';

interface HouseDetailModalProps {
  model: HouseModel | null;
  onClose: () => void;
  onOpenScheduleTour: (modelName?: string) => void;
}

export default function HouseDetailModal({ model, onClose, onOpenScheduleTour }: HouseDetailModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const lenis = useLenis();

  // Keyboard Escape listener & Body scroll lock
  useEffect(() => {
    if (!model) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    if (lenis) lenis.stop();
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (lenis) lenis.start();
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, [model, onClose]);

  if (!model) return null;

  const currentVariant = model.variants[selectedVariantIndex] || model.variants[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-model-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-300"
    >
      
      {/* Backdrop Click */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Container */}
      <div className="bg-canvas w-full max-w-5xl rounded-3xl border border-border-subtle shadow-2xl overflow-hidden relative max-h-[92vh] flex flex-col z-10">
        
        {/* Sticky Modal Header Bar */}
        <div className="bg-surface/90 backdrop-blur-md px-6 py-4 border-b border-border-subtle flex items-center justify-between sticky top-0 z-20">
          <div>
            <span className="text-[10px] uppercase tracking-widest font-semibold text-brand bg-brand-light px-2.5 py-0.5 rounded-full border border-brand-border/40">
              ARCHITECTURAL SPECIFICATION MODEL
            </span>
            <h2 id="modal-model-title" className="font-heading text-2xl font-bold text-primary mt-0.5">
              {model.name}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onOpenScheduleTour(model.name)}
              className="hidden sm:inline-flex items-center gap-2 bg-timber-900 text-white px-4 py-2 rounded-full text-xs font-semibold hover:bg-timber-950 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand/30"
            >
              <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Book Private Tour</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full hover:bg-sand-200 text-primary transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-brand/30"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div data-lenis-prevent="true" className="modal-scrollbar overflow-y-auto p-6 sm:p-8 space-y-8 flex-1 overscroll-contain">
          
          {/* Main Gallery Carousel */}
          <div className="space-y-4">
            <div className="relative h-[320px] sm:h-[460px] w-full rounded-2xl overflow-hidden border border-border-subtle">
              <Image
                src={model.gallery[activeImageIndex]?.url || model.featuredImage}
                alt={model.gallery[activeImageIndex]?.caption || model.name}
                fill
                sizes="(max-width: 768px) 100vw, 960px"
                className="object-cover transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              
              {/* Image Navigation Controls */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                <span className="text-xs bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                  {model.gallery[activeImageIndex]?.caption || model.name}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveImageIndex((prev) =>
                        prev === 0 ? model.gallery.length - 1 : prev - 1
                      )
                    }
                    className="p-2 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white transition-colors cursor-pointer"
                    aria-label="Previous gallery image"
                  >
                    <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <span className="text-xs font-mono">
                    {activeImageIndex + 1} / {model.gallery.length}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveImageIndex((prev) =>
                        prev === model.gallery.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="p-2 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white transition-colors cursor-pointer"
                    aria-label="Next gallery image"
                  >
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>

            {/* Gallery Thumbnails */}
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1" role="tablist" aria-label="Image gallery thumbnails">
              {model.gallery.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  role="tab"
                  aria-selected={activeImageIndex === idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    activeImageIndex === idx
                      ? 'border-brand ring-2 ring-brand/30 opacity-100 scale-105'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                  aria-label={`View ${img.caption}`}
                >
                  <Image src={img.url} alt={img.caption} fill sizes="96px" className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Model Description & Quick Stats Bar */}
          <div className="bg-surface p-6 rounded-2xl border border-border-subtle space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-4">
              <div>
                <span className="text-xs text-secondary font-medium uppercase tracking-wider block">
                  ARCHITECTURAL MODEL BLUEPRINT
                </span>
                <p className="text-base text-primary font-medium mt-1 leading-relaxed">
                  {model.description}
                </p>
              </div>

              <div className="shrink-0 bg-canvas p-4 rounded-xl border border-border-subtle text-right">
                <span className="text-[10px] text-secondary uppercase font-semibold block">STARTING PRICE</span>
                <span className="font-heading text-2xl font-bold text-brand">{model.priceFormatted}</span>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <div>
                <span className="text-[11px] text-secondary uppercase font-semibold block">BEDROOMS</span>
                <span className="font-heading font-semibold text-lg text-primary">{model.beds} Beds</span>
              </div>
              <div>
                <span className="text-[11px] text-secondary uppercase font-semibold block">BATHROOMS</span>
                <span className="font-heading font-semibold text-lg text-primary">{model.baths} Baths</span>
              </div>
              <div>
                <span className="text-[11px] text-secondary uppercase font-semibold block">BUILD AREA</span>
                <span className="font-heading font-semibold text-lg text-primary">{model.sqft.toLocaleString()} Sq Ft</span>
              </div>
              <div>
                <span className="text-[11px] text-secondary uppercase font-semibold block">LOT AREA</span>
                <span className="font-heading font-semibold text-lg text-primary">{model.lotSizeSqft.toLocaleString()} Sq Ft</span>
              </div>
            </div>
          </div>

          {/* Architectural & Engineering Specification Grid */}
          <div className="space-y-4">
            <h3 className="font-heading text-xl font-bold text-primary flex items-center gap-2">
              <Building className="w-5 h-5 text-brand" aria-hidden="true" />
              <span>Architectural Specifications & Structural Grid</span>
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-surface p-5 rounded-2xl border border-border-subtle space-y-1">
                <span className="text-[11px] text-secondary uppercase font-semibold tracking-wider block">
                  CEILING HEIGHT (MAIN LEVEL)
                </span>
                <span className="font-heading font-semibold text-base text-primary">
                  {model.ceilingHeight.main}
                </span>
              </div>

              <div className="bg-surface p-5 rounded-2xl border border-border-subtle space-y-1">
                <span className="text-[11px] text-secondary uppercase font-semibold tracking-wider block">
                  CEILING HEIGHT (UPPER LEVEL)
                </span>
                <span className="font-heading font-semibold text-base text-primary">
                  {model.ceilingHeight.upper}
                </span>
              </div>

              <div className="bg-surface p-5 rounded-2xl border border-border-subtle space-y-1">
                <span className="text-[11px] text-secondary uppercase font-semibold tracking-wider block">
                  FOUNDATION SYSTEM
                </span>
                <span className="font-heading font-semibold text-base text-primary">
                  {model.foundation}
                </span>
              </div>

              <div className="bg-surface p-5 rounded-2xl border border-border-subtle space-y-1">
                <span className="text-[11px] text-secondary uppercase font-semibold tracking-wider block">
                  ROOF STRUCTURE & MATERIAL
                </span>
                <span className="font-heading font-semibold text-base text-primary">
                  {model.roofType}
                </span>
              </div>

              <div className="bg-surface p-5 rounded-2xl border border-border-subtle space-y-1">
                <span className="text-[11px] text-secondary uppercase font-semibold tracking-wider block">
                  ENERGY & SOLAR INFRASTRUCTURE
                </span>
                <span className="font-heading font-semibold text-base text-brand flex items-center gap-1.5">
                  <Sun className="w-4 h-4 text-amber-500" aria-hidden="true" />
                  {model.energyRating}
                </span>
              </div>

              <div className="bg-surface p-5 rounded-2xl border border-border-subtle space-y-1">
                <span className="text-[11px] text-secondary uppercase font-semibold tracking-wider block">
                  GARAGE & EV READY
                </span>
                <span className="font-heading font-semibold text-base text-primary">
                  {model.garage}
                </span>
              </div>
            </div>
          </div>

          {/* Layout Variants Selector */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-xl font-bold text-primary flex items-center gap-2">
                <Layers className="w-5 h-5 text-brand" aria-hidden="true" />
                <span>Layout Variations Offered</span>
              </h3>
              <span className="text-xs text-secondary">Select variation tab below</span>
            </div>

            {/* Variant Selector Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1" role="tablist" aria-label="Layout variants">
              {model.variants.map((varItem, idx) => (
                <button
                  key={idx}
                  type="button"
                  role="tab"
                  aria-selected={selectedVariantIndex === idx}
                  onClick={() => setSelectedVariantIndex(idx)}
                  className={`px-5 py-3 rounded-full text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                    selectedVariantIndex === idx
                      ? 'bg-timber-900 text-white shadow-md'
                      : 'bg-surface text-secondary border border-border-subtle hover:bg-sand-200'
                  }`}
                >
                  {varItem.name} ({varItem.priceDelta})
                </button>
              ))}
            </div>

            {/* Active Variant Detail Card */}
            <div className="bg-surface p-6 rounded-2xl border border-border-subtle space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border-subtle pb-4">
                <div>
                  <h4 className="font-heading text-lg font-bold text-primary">
                    {currentVariant.name}
                  </h4>
                  <p className="text-xs text-secondary mt-0.5">
                    {currentVariant.description}
                  </p>
                </div>
                <div className="bg-sand-200 text-brand px-3.5 py-1.5 rounded-full text-xs font-bold self-start sm:self-auto">
                  Total SqFt: {currentVariant.sqftDiff}
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-secondary">
                  VARIANT HIGHLIGHT FEATURES:
                </span>
                <div className="grid sm:grid-cols-3 gap-3">
                  {currentVariant.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-medium text-primary bg-canvas p-2.5 rounded-xl border border-border-subtle">
                      <Check className="w-4 h-4 text-brand" aria-hidden="true" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Direct Sales Tour Booking Callout Banner */}
          <div className="bg-timber-900 text-white p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-xs uppercase tracking-widest font-semibold text-brand-light">
                SCHEDULE A PRIVATE SHOWING
              </span>
              <h4 className="font-heading text-2xl font-bold">
                Experience {model.name} in Person
              </h4>
              <p className="text-xs text-sand-200 max-w-md">
                Schedule a walkthrough with our sales consultant to inspect full architectural floor plan blueprints and tour available plots.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenScheduleTour(model.name);
              }}
              className="bg-surface hover:bg-sand-200 text-brand px-7 py-3.5 rounded-full text-sm font-bold transition-all hover:scale-105 shadow-lg shrink-0 cursor-pointer focus-visible:ring-2 focus-visible:ring-white"
            >
              Book Private Tour Now
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
