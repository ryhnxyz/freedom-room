'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import Button from '@/components/Button';
import Badge from '@/components/Badge';
import { Select, SelectItem } from '@/components/Select';

interface DocSection {
  id: string;
  title: string;
  category: string;
  categoryIcon: string;
  badge?: string;
  description: string;
  breadcrumbs: string[];
}

const DOC_SECTIONS: DocSection[] = [
  // Getting Started
  {
    id: 'introduction',
    title: 'Introduction',
    category: 'Getting Started',
    categoryIcon: 'solar:compass-bold',
    description: 'Overview of the Tumbuh real estate discovery template, technology stack, and architectural vision.',
    breadcrumbs: ['Getting Started', 'Introduction'],
  },
  {
    id: 'installation',
    title: 'Installation & Setup',
    category: 'Getting Started',
    categoryIcon: 'solar:compass-bold',
    description: 'Step-by-step walkthrough to clone, install dependencies, and run the project locally.',
    breadcrumbs: ['Getting Started', 'Installation'],
  },
  {
    id: 'project-structure',
    title: 'Project Structure',
    category: 'Getting Started',
    categoryIcon: 'solar:compass-bold',
    description: 'Detailed explanation of the Next.js 15 App Router directory layout, data layers, and assets.',
    breadcrumbs: ['Getting Started', 'Project Structure'],
  },

  // Design System
  {
    id: 'color-system',
    title: 'Color Palette & Tokens',
    category: 'Design System',
    categoryIcon: 'solar:pallete-2-bold',
    description: 'Biophilic timber greens, warm canvas sands, and semantic Tailwind CSS v4 variables.',
    breadcrumbs: ['Design System', 'Color System'],
  },
  {
    id: 'typography',
    title: 'Typography System',
    category: 'Design System',
    categoryIcon: 'solar:pallete-2-bold',
    description: 'Plus Jakarta Sans for architectural headings, Inter for technical specifications and copy.',
    breadcrumbs: ['Design System', 'Typography'],
  },
  {
    id: 'radius-spacing',
    title: 'Standardized Border Radius',
    category: 'Design System',
    categoryIcon: 'solar:pallete-2-bold',
    description: 'Unified border radius rules across inputs (rounded-xl), cards (rounded-2xl), and modals.',
    breadcrumbs: ['Design System', 'Radius & Spacing'],
  },

  // Basic Components
  {
    id: 'component-button',
    title: 'Button',
    category: 'Basic Components',
    categoryIcon: 'solar:widget-2-bold',
    badge: 'Core',
    description: 'Interactive button component supporting 5 visual variants, 5 sizes, icons, and loading states.',
    breadcrumbs: ['Basic Components', 'Button'],
  },
  {
    id: 'component-select',
    title: 'Select & Dropdown',
    category: 'Basic Components',
    categoryIcon: 'solar:widget-2-bold',
    description: 'Accessible, animated custom dropdown select powered by React Aria Components.',
    breadcrumbs: ['Basic Components', 'Select & Dropdown'],
  },
  {
    id: 'component-form',
    title: 'Form Inputs & Textarea',
    category: 'Basic Components',
    categoryIcon: 'solar:widget-2-bold',
    description: 'Standardized rounded-xl form fields, icon prefixes, and subtle focus rings.',
    breadcrumbs: ['Basic Components', 'Form Controls'],
  },
  {
    id: 'component-badge',
    title: 'Badge & Status Tags',
    category: 'Basic Components',
    categoryIcon: 'solar:widget-2-bold',
    description: 'Single-word uppercase category pills with subtle borders and brand highlights.',
    breadcrumbs: ['Basic Components', 'Badge'],
  },

  // Advanced Features
  {
    id: 'feature-tour-modal',
    title: 'Tour Booking Drawer',
    category: 'Advanced Features',
    categoryIcon: 'solar:magic-stick-3-bold',
    badge: 'Interactive',
    description: '5-step responsive modal drawer for private walkthrough and Zoom video showing bookings.',
    breadcrumbs: ['Advanced Features', 'Tour Booking Drawer'],
  },
  {
    id: 'feature-masterplan',
    title: 'Interactive Masterplan',
    category: 'Advanced Features',
    categoryIcon: 'solar:magic-stick-3-bold',
    description: '2D SVG site plan with clickable parcels, live availability states, and filter chips.',
    breadcrumbs: ['Advanced Features', 'Interactive Masterplan'],
  },
  {
    id: 'feature-house-grid',
    title: 'House Grid & Stacking Cards',
    category: 'Advanced Features',
    categoryIcon: 'solar:magic-stick-3-bold',
    description: 'ScrollTrigger-powered 100vh sticky stacking residence cards with zoom scrub effects.',
    breadcrumbs: ['Advanced Features', 'House Grid Stacking'],
  },
  {
    id: 'feature-smooth-scroll',
    title: 'Lenis Smooth Scroll',
    category: 'Advanced Features',
    categoryIcon: 'solar:magic-stick-3-bold',
    description: 'Root layout Lenis wrapper ensuring 60fps scrolling and error-free route transitions.',
    breadcrumbs: ['Advanced Features', 'Smooth Scroll'],
  },

  // Deployment & Content
  {
    id: 'data-customization',
    title: 'Updating Data & Content',
    category: 'Deployment & Content',
    categoryIcon: 'solar:server-square-bold',
    description: 'How to easily replace house models, pricing, amenities, and journal articles in TypeScript.',
    breadcrumbs: ['Deployment & Content', 'Customizing Data'],
  },
  {
    id: 'deployment',
    title: 'Vercel Deployment & SEO',
    category: 'Deployment & Content',
    categoryIcon: 'solar:server-square-bold',
    badge: 'Guide',
    description: 'Zero-configuration production deployment on Vercel with automated SSL and edge caching.',
    breadcrumbs: ['Deployment & Content', 'Deployment'],
  },
];

function CodeSnippet({ code, language = 'bash' }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-4 rounded-xl overflow-hidden border border-border-subtle bg-[#112019] text-sand-100 shadow-sm max-w-full">
      <div className="flex items-center justify-between px-3.5 sm:px-4 py-2 bg-[#0C1712] border-b border-white/10 text-[11px] font-mono text-sand-400">
        <span className="uppercase tracking-wider font-semibold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-brand/80 shrink-0" />
          <span>{language}</span>
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer text-xs shrink-0 active:scale-95"
          title="Copy code"
        >
          <Icon icon={copied ? 'solar:check-circle-bold' : 'solar:copy-bold'} className="w-3.5 h-3.5 text-brand" />
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <pre className="p-3.5 sm:p-4 text-xs font-mono overflow-x-auto leading-relaxed text-sand-100/90 selection:bg-brand selection:text-white max-w-full">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default function DocsPage() {
  const [activeTopic, setActiveTopic] = useState<string>('introduction');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  
  // Interactive Button playground state
  const [btnVariant, setBtnVariant] = useState<'primary' | 'secondary' | 'secondary-gray' | 'tertiary'>('primary');
  const [btnSize, setBtnSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
  const [btnIcon, setBtnIcon] = useState(true);
  const [selectedDemoModel, setSelectedDemoModel] = useState<string>('aspen');

  // Interactive Form Playground state
  const [formDemoName, setFormDemoName] = useState('Eleanor Vance');
  const [formDemoEmail, setFormDemoEmail] = useState('eleanor@architect.com');
  const [formDemoPhone, setFormDemoPhone] = useState('+1 (512) 890-2341');
  const [formDemoMessage, setFormDemoMessage] = useState('Inquiring regarding Phase II lot reservations for The Aspen model.');
  const [formDemoHasError, setFormDemoHasError] = useState(false);

  // Group sections by category
  const categories = useMemo(() => {
    const map = new Map<string, DocSection[]>();
    DOC_SECTIONS.forEach((sec) => {
      if (
        searchQuery &&
        !sec.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !sec.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !sec.category.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return;
      }
      const list = map.get(sec.category) || [];
      list.push(sec);
      map.set(sec.category, list);
    });
    return Array.from(map.entries());
  }, [searchQuery]);

  const currentSection = useMemo(() => {
    return DOC_SECTIONS.find((s) => s.id === activeTopic) || DOC_SECTIONS[0];
  }, [activeTopic]);

  const currentIndex = useMemo(() => {
    return DOC_SECTIONS.findIndex((s) => s.id === activeTopic);
  }, [activeTopic]);

  const prevSection = currentIndex > 0 ? DOC_SECTIONS[currentIndex - 1] : null;
  const nextSection = currentIndex < DOC_SECTIONS.length - 1 ? DOC_SECTIONS[currentIndex + 1] : null;

  // Lock body scroll when mobile sidebar drawer is open
  useEffect(() => {
    if (mobileSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileSidebarOpen]);

  // Global search shortcut ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setSearchModalOpen(false);
        setMobileSidebarOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-canvas text-primary flex flex-col selection:bg-brand selection:text-white antialiased">
      
      {/* =========================================================================
          TOP HEADER (Mobile Optimized)
         ========================================================================= */}
      <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-md border-b border-border-subtle h-16 flex items-center px-3.5 sm:px-8 justify-between shadow-xs">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          {/* Mobile Sidebar Toggle */}
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="lg:hidden p-2 rounded-xl text-primary hover:bg-sand-200 active:scale-95 transition-all cursor-pointer shrink-0"
            aria-label="Toggle navigation menu"
          >
            <Icon icon="solar:hamburger-menu-linear" className="w-5 h-5" />
          </button>
          
          {/* Authentic Tumbuh Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-lg p-0.5 min-w-0">
            <div className="w-7 sm:w-8 h-7 sm:h-8 shrink-0 flex items-center justify-center">
              <Image
                src="/logo/tumbuh-logo-green.svg"
                alt="Tumbuh Logo"
                width={32}
                height={30}
                priority
                className="w-6 sm:w-7 h-auto object-contain group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="font-heading font-bold text-lg sm:text-xl text-primary tracking-tight truncate">
                Tumbuh
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono font-bold px-1.5 sm:px-2 py-0.5 rounded-full bg-sand-200 text-secondary border border-border-subtle shrink-0">
                Docs
              </span>
            </div>
          </Link>
        </div>

        {/* Global Search & Nav Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* ⌘K Search Trigger Button (Icon button on mobile, full input on sm:) */}
          <button
            onClick={() => setSearchModalOpen(true)}
            className="flex items-center justify-center sm:justify-between h-9 w-9 sm:w-60 lg:w-64 px-0 sm:px-3.5 bg-canvas hover:bg-sand-200/70 border border-border-subtle rounded-xl text-xs text-secondary hover:text-primary transition-all shadow-xs cursor-pointer active:scale-95"
            aria-label="Search documentation"
          >
            <div className="flex items-center gap-2 min-w-0">
              <Icon icon="solar:magnifer-linear" className="w-4 h-4 text-secondary shrink-0" />
              <span className="hidden sm:inline truncate text-gray-500">Search docs...</span>
            </div>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 text-[10px] font-mono px-1.5 py-0.5 rounded bg-surface border border-border-subtle text-secondary shadow-xs">
              ⌘K
            </kbd>
          </button>

          <Link
            href="/"
            className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold text-secondary hover:text-primary px-3 py-2 rounded-xl hover:bg-sand-200 transition-colors"
          >
            <Icon icon="solar:arrow-left-linear" className="w-4 h-4" />
            <span>Main Template</span>
          </Link>

          <Link href="/">
            <Button
              variant="primary"
              size="sm"
              icon="solar:home-2-bold"
              className="text-xs px-2.5 sm:px-3"
            >
              <span className="hidden xs:inline">Live Demo</span>
              <span className="xs:hidden">Demo</span>
            </Button>
          </Link>
        </div>
      </header>

      {/* =========================================================================
          MAIN DOCUMENTATION WRAPPER
         ========================================================================= */}
      <div className="flex-1 w-full flex relative">
        
        {/* =========================================================================
            LEFT SIDEBAR NAVIGATION (Mobile Drawer + Sticky Desktop)
           ========================================================================= */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-72 bg-surface lg:bg-surface/50 lg:backdrop-blur-xs border-r border-border-subtle transform transition-transform duration-200 ease-in-out lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:translate-x-0 lg:z-0 lg:w-64 xl:w-72 lg:shrink-0 overflow-y-auto p-4 sm:p-6 space-y-6 shadow-2xl lg:shadow-none ${
            mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Mobile Header Inside Drawer */}
          <div className="flex items-center justify-between lg:hidden pb-4 border-b border-border-subtle">
            <div className="flex items-center gap-2">
              <Image
                src="/logo/tumbuh-logo-green.svg"
                alt="Tumbuh Logo"
                width={24}
                height={22}
                className="w-6 h-auto object-contain"
              />
              <span className="font-heading font-bold text-sm text-primary">Documentation</span>
            </div>
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="p-1.5 rounded-lg hover:bg-sand-200 text-secondary cursor-pointer active:scale-95"
              aria-label="Close navigation menu"
            >
              <Icon icon="solar:close-circle-bold" className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Categories */}
          <nav className="space-y-6">
            {categories.map(([category, items]) => (
              <div key={category} className="space-y-1">
                <div className="text-[11px] font-bold uppercase tracking-wider text-secondary/80 px-2.5 pb-0.5">
                  {category}
                </div>

                <div className="space-y-0.5">
                  {items.map((item) => {
                    const isActive = activeTopic === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTopic(item.id);
                          setMobileSidebarOpen(false);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`w-full text-left px-2.5 py-2 sm:py-1.5 rounded-lg text-xs transition-all flex items-center justify-between cursor-pointer group active:scale-[0.98] ${
                          isActive
                            ? 'text-brand font-bold translate-x-1'
                            : 'text-secondary hover:text-primary hover:translate-x-0.5 font-medium'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0 animate-in fade-in zoom-in-50 duration-150" />
                          )}
                          <span className="truncate">{item.title}</span>
                        </div>
                        {item.badge && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-brand-light text-brand border border-brand-border shrink-0 ml-1">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </aside>

        {/* Mobile Backdrop */}
        {mobileSidebarOpen && (
          <div
            onClick={() => setMobileSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden animate-in fade-in duration-150"
          />
        )}

        {/* =========================================================================
            CENTER CONTENT AREA (Full width parent with centered max-w-[1200px] body)
           ========================================================================= */}
        <main className="flex-1 min-w-0 flex justify-center">
          <div className="w-full max-w-[1200px] p-4 sm:p-8 lg:p-12 space-y-8 sm:space-y-10 min-w-0">
          
          {/* Breadcrumbs */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs text-secondary font-medium">
            <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
              <Icon icon="solar:home-2-linear" className="w-3.5 h-3.5 text-secondary shrink-0" />
              <span>Tumbuh</span>
            </Link>
            <span>/</span>
            <button onClick={() => setActiveTopic('introduction')} className="hover:text-primary transition-colors cursor-pointer">
              Docs
            </button>
            {currentSection.breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5 sm:gap-2">
                <span>/</span>
                <span className={i === currentSection.breadcrumbs.length - 1 ? 'text-brand font-bold truncate max-w-[140px] sm:max-w-none' : ''}>
                  {crumb}
                </span>
              </span>
            ))}
          </div>

          {/* Section Heading */}
          <div className="space-y-3 pb-6 border-b border-border-subtle">
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-primary">
                {currentSection.title}
              </h1>
              {currentSection.badge && (
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-brand-light text-brand border border-brand-border shrink-0">
                  {currentSection.badge}
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm lg:text-base text-secondary leading-relaxed">
              {currentSection.description}
            </p>
          </div>

          {/* =========================================================================
              TOPIC: INTRODUCTION
             ========================================================================= */}
          {activeTopic === 'introduction' && (
            <div className="space-y-8">
              <div className="bg-surface rounded-2xl p-5 sm:p-8 border border-border-subtle shadow-sm space-y-4">
                <h3 className="font-heading font-bold text-lg sm:text-xl text-primary">
                  Architectural Discovery Meets Modern Web Performance
                </h3>
                <p className="text-xs sm:text-sm text-secondary leading-relaxed font-sans">
                  <strong>Tumbuh</strong> is an ultra-premium, production-grade Next.js template crafted for modern masterplanned communities, luxury cluster housing developers, and architectural studios. It pairs transparent physical specifications with fluid 60fps micro-interactions.
                </p>
                <p className="text-xs sm:text-sm text-secondary leading-relaxed font-sans">
                  Built natively on the latest <strong>Next.js 15 App Router</strong>, <strong>React 19</strong>, and <strong>Tailwind CSS v4</strong>, Tumbuh prioritizes flawless Core Web Vitals (sub-1s LCP, 0 CLS, minimal TBT) without sacrificing high-end aesthetics.
                </p>
              </div>

              {/* Technology Stack Grid */}
              <div className="space-y-4">
                <h3 className="font-heading font-bold text-base sm:text-lg text-primary">Technology Stack</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <div className="bg-surface p-4 sm:p-5 rounded-2xl border border-border-subtle shadow-xs space-y-2">
                    <div className="flex items-center gap-2 text-brand font-bold text-xs sm:text-sm">
                      <Icon icon="solar:layers-minimalistic-bold" className="w-5 h-5 text-brand shrink-0" />
                      <span>Next.js 15 App Router</span>
                    </div>
                    <p className="text-xs text-secondary leading-relaxed">
                      Static Page Generation (SSG) with <code className="font-mono text-brand">generateStaticParams</code>, code-split dynamic imports, and optimal font loading.
                    </p>
                  </div>

                  <div className="bg-surface p-4 sm:p-5 rounded-2xl border border-border-subtle shadow-xs space-y-2">
                    <div className="flex items-center gap-2 text-brand font-bold text-xs sm:text-sm">
                      <Icon icon="solar:pallete-2-bold" className="w-5 h-5 text-brand shrink-0" />
                      <span>Tailwind CSS v4 @theme</span>
                    </div>
                    <p className="text-xs text-secondary leading-relaxed">
                      Custom CSS variable design tokens for timber greens, warm canvas sands, and standardized radius scales.
                    </p>
                  </div>

                  <div className="bg-surface p-4 sm:p-5 rounded-2xl border border-border-subtle shadow-xs space-y-2">
                    <div className="flex items-center gap-2 text-brand font-bold text-xs sm:text-sm">
                      <Icon icon="solar:magic-stick-3-bold" className="w-5 h-5 text-brand shrink-0" />
                      <span>GSAP ScrollTrigger & Lenis</span>
                    </div>
                    <p className="text-xs text-secondary leading-relaxed">
                      Butter-smooth inertial scrolling coupled with scrub-based sticky stacking card animations and lifecycle guards.
                    </p>
                  </div>

                  <div className="bg-surface p-4 sm:p-5 rounded-2xl border border-border-subtle shadow-xs space-y-2">
                    <div className="flex items-center gap-2 text-brand font-bold text-xs sm:text-sm">
                      <Icon icon="solar:shield-check-bold" className="w-5 h-5 text-brand shrink-0" />
                      <span>React Aria Accessibility</span>
                    </div>
                    <p className="text-xs text-secondary leading-relaxed">
                      Keyboard-navigable dropdowns, ARIA combobox semantics, focus trap management, and high-contrast color ratios.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              TOPIC: INSTALLATION
             ========================================================================= */}
          {activeTopic === 'installation' && (
            <div className="space-y-8">
              <div className="space-y-3">
                <h3 className="font-heading font-bold text-base sm:text-lg text-primary">Prerequisites</h3>
                <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                  Make sure you have <strong>Node.js 18.18+</strong> or <strong>Node.js 20+</strong> and <strong>npm</strong> (or pnpm/yarn/bun) installed on your system.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-heading font-bold text-base sm:text-lg text-primary">1. Install Dependencies</h3>
                <CodeSnippet
                  language="bash"
                  code={`# Navigate into extracted project directory
cd tumbuh

# Install all project dependencies
npm install`}
                />
              </div>

              <div className="space-y-3">
                <h3 className="font-heading font-bold text-base sm:text-lg text-primary">2. Launch Development Server</h3>
                <CodeSnippet
                  language="bash"
                  code={`npm run dev`}
                />
                <p className="text-xs text-secondary">
                  Open <code className="font-mono text-brand font-bold">http://localhost:3000</code> in your browser to inspect hot-reloading in real-time.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-heading font-bold text-base sm:text-lg text-primary">3. Test Production Build</h3>
                <CodeSnippet
                  language="bash"
                  code={`# Create static production export & server bundle
npm run build

# Preview the production server locally
npm run start`}
                />
              </div>
            </div>
          )}

          {/* =========================================================================
              TOPIC: PROJECT STRUCTURE
             ========================================================================= */}
          {activeTopic === 'project-structure' && (
            <div className="space-y-8">
              <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                Tumbuh separates concerns cleanly: all content data lives in pure TypeScript modules under <code className="font-mono text-brand">data/</code>, UI controls live in <code className="font-mono text-brand">components/</code>, and page routes reside in <code className="font-mono text-brand">app/</code>.
              </p>

              <div>
                <CodeSnippet
                  language="tree"
                  code={`tumbuh/
├── app/                              # Next.js 15 App Router routes & layouts
│   ├── layout.tsx                    # Root Layout (SmoothScroll, Fonts, Progress)
│   ├── page.tsx                      # Landing page (Hero, Overview, Masterplan)
│   ├── globals.css                   # Tailwind v4 theme definitions & design tokens
│   ├── about/page.tsx                # Architectural philosophy & bio
│   ├── amenities/page.tsx            # Community amenities tabbed showcase
│   ├── contact/page.tsx              # Showing inquiry & brochure request form
│   ├── docs/page.tsx                 # Documentation portal route
│   ├── journal/page.tsx              # Architectural editorial journal list
│   ├── journal/[id]/page.tsx         # Dynamic article detail with SSG
│   ├── location/page.tsx             # Strategic neighborhood connectivity map
│   ├── models/[id]/page.tsx          # Dynamic house model blueprint & specs
│   ├── not-found.tsx                 # Custom 404 error page
│   └── error.tsx                     # Custom error boundary
├── components/                       # Modular design system & feature components
│   ├── Button.tsx                    # Multi-variant button component
│   ├── Select.tsx                    # React Aria accessible custom select
│   ├── Badge.tsx                     # Minimalist tag/badge component
│   ├── Tabs.tsx                      # Category tab filter component
│   ├── Navbar.tsx                    # Responsive navigation & GSAP mobile sheet
│   ├── Footer.tsx                    # Master footer with newsletter signup
│   ├── Hero.tsx                      # Ambient video background hero
│   ├── HouseGrid.tsx                 # ScrollTrigger sticky stacking cards
│   ├── Masterplan.tsx                # Interactive 2D SVG site plan selector
│   ├── TourBookingModal.tsx          # 5-step private tour booking modal drawer
│   ├── HouseDetailModal.tsx          # Model gallery and specification modal
│   ├── SmoothScroll.tsx              # ReactLenis root scroll container
│   └── PageProgressBar.tsx           # Route transition progress bar
├── data/                             # Centralized data sources
│   ├── houseModels.ts                # Specifications, blueprints & pricing data
│   ├── communityData.ts              # Masterplan plots, team members & FAQ
│   ├── amenitiesData.ts              # Amenities categories & photography
│   └── journalData.ts                # Architectural journal articles
├── public/                           # Static media assets
│   ├── images/                       # Floorplans, maps & house graphics
│   ├── video/                        # Ambient hero webm video
│   ├── logo/                         # Official Tumbuh brand marks
│   └── favicon.svg                   # Brand favicon
└── next.config.mjs                   # AVIF/WebP image & performance optimizations`}
                />
              </div>

              {/* Explanation List */}
              <div className="space-y-3">
                <h3 className="font-heading font-bold text-base sm:text-lg text-primary">Folder Breakdown</h3>
                <div className="overflow-x-auto rounded-xl border border-border-subtle bg-surface">
                  <table className="w-full text-left text-xs min-w-[500px]">
                    <thead className="bg-sand-100 border-b border-border-subtle text-primary font-bold uppercase tracking-wider">
                      <tr>
                        <th className="p-3 sm:p-4">Directory</th>
                        <th className="p-3 sm:p-4">Purpose</th>
                        <th className="p-3 sm:p-4">Key Content</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-subtle text-secondary">
                      <tr>
                        <td className="p-3 sm:p-4 font-mono font-bold text-brand">app/</td>
                        <td className="p-3 sm:p-4">Next.js App Router endpoints</td>
                        <td className="p-3 sm:p-4">Layouts, pages, route handlers, error boundaries</td>
                      </tr>
                      <tr>
                        <td className="p-3 sm:p-4 font-mono font-bold text-brand">components/</td>
                        <td className="p-3 sm:p-4">Reusable UI & animated sections</td>
                        <td className="p-3 sm:p-4">Buttons, Selects, Modals, Masterplan, Navigation</td>
                      </tr>
                      <tr>
                        <td className="p-3 sm:p-4 font-mono font-bold text-brand">data/</td>
                        <td className="p-3 sm:p-4">TypeScript content datasets</td>
                        <td className="p-3 sm:p-4">House models, Masterplan plots, FAQ, Journal posts</td>
                      </tr>
                      <tr>
                        <td className="p-3 sm:p-4 font-mono font-bold text-brand">public/</td>
                        <td className="p-3 sm:p-4">Static media assets</td>
                        <td className="p-3 sm:p-4">High-res floorplans, SVG logos, ambient hero video</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              TOPIC: COLOR SYSTEM
             ========================================================================= */}
          {activeTopic === 'color-system' && (
            <div className="space-y-8">
              <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                Tumbuh's palette connects architectural restraint with forest ecology. All colors are defined in <code className="font-mono text-brand">app/globals.css</code> with semantic aliases for background surfaces, borders, and typography.
              </p>

              {/* Palette Grid */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="font-heading font-bold text-sm sm:text-base text-primary">Timber Green Primitive Scale</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 text-xs">
                    <div className="p-3 sm:p-3.5 rounded-xl bg-[#D4A72C] text-white space-y-1 shadow-xs">
                      <span className="font-bold block">Timber 900</span>
                      <span className="font-mono text-[10px] text-sand-200 block truncate">#D4A72C (Brand)</span>
                    </div>
                    <div className="p-3 sm:p-3.5 rounded-xl bg-[#0A0A0A] text-white space-y-1 shadow-xs">
                      <span className="font-bold block">Timber 950</span>
                      <span className="font-mono text-[10px] text-sand-200 block truncate">#0A0A0A (Dark)</span>
                    </div>
                    <div className="p-3 sm:p-3.5 rounded-xl bg-[#FFF6D9] text-timber-900 border border-timber-200 space-y-1 shadow-xs">
                      <span className="font-bold block">Timber 100</span>
                      <span className="font-mono text-[10px] text-timber-800 block truncate">#FFF6D9 (Light)</span>
                    </div>
                    <div className="p-3 sm:p-3.5 rounded-xl bg-[#E9D184] text-timber-950 border border-timber-300 space-y-1 shadow-xs">
                      <span className="font-bold block">Timber 200</span>
                      <span className="font-mono text-[10px] text-timber-800 block truncate">#E9D184 (Border)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-heading font-bold text-sm sm:text-base text-primary">Warm Sand & Canvas Scale</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 text-xs">
                    <div className="p-3 sm:p-3.5 rounded-xl bg-[#FBF9F5] text-primary border border-border-subtle space-y-1 shadow-xs">
                      <span className="font-bold block">Canvas</span>
                      <span className="font-mono text-[10px] text-secondary block truncate">#FBF9F5</span>
                    </div>
                    <div className="p-3 sm:p-3.5 rounded-xl bg-[#F5F0E8] text-primary border border-border-subtle space-y-1 shadow-xs">
                      <span className="font-bold block">Sand 200</span>
                      <span className="font-mono text-[10px] text-secondary block truncate">#F5F0E8</span>
                    </div>
                    <div className="p-3 sm:p-3.5 rounded-xl bg-[#F0EBE1] text-primary border border-border-subtle space-y-1 shadow-xs">
                      <span className="font-bold block">Sand 300</span>
                      <span className="font-mono text-[10px] text-secondary block truncate">#F0EBE1</span>
                    </div>
                    <div className="p-3 sm:p-3.5 rounded-xl bg-[#EAE5DC] text-primary border border-border-subtle space-y-1 shadow-xs">
                      <span className="font-bold block">Border Subtle</span>
                      <span className="font-mono text-[10px] text-secondary block truncate">#EAE5DC</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <CodeSnippet
                  language="css"
                  code={`/* app/globals.css */
@theme {
  --color-canvas: #FBF9F5;
  --color-surface: #FFFFFF;
  --color-brand: #D4A72C;
  --color-brand-hover: #0A0A0A;
  --color-brand-light: #FFF6D9;
  --color-brand-border: #E9D184;
  --color-border-subtle: #EAE5DC;
}`}
                />
              </div>
            </div>
          )}

          {/* =========================================================================
              TOPIC: TYPOGRAPHY SYSTEM
             ========================================================================= */}
          {activeTopic === 'typography' && (
            <div className="space-y-8">
              <div className="bg-surface rounded-2xl p-5 sm:p-8 border border-border-subtle shadow-sm space-y-4">
                <h3 className="font-heading font-bold text-lg sm:text-xl text-primary">
                  Architectural Typographic Hierarchy
                </h3>
                <p className="text-xs sm:text-sm text-secondary leading-relaxed font-sans">
                  The design system pairs <strong>Plus Jakarta Sans</strong> for geometric architectural headlines and brand statements, with <strong>Inter</strong> for legibility across specifications, floor plans, and dense data cards. Numbers and code tokens utilize <strong>JetBrains Mono</strong>.
                </p>
              </div>

              {/* Type Scale Showcase */}
              <div className="space-y-4">
                <h3 className="font-heading font-bold text-base sm:text-lg text-primary">Live Type Scale</h3>
                <div className="bg-surface rounded-2xl p-4 sm:p-6 border border-border-subtle space-y-6">
                  
                  <div className="space-y-1 pb-4 border-b border-border-subtle">
                    <div className="flex flex-wrap items-center justify-between gap-1 text-[11px] sm:text-xs text-secondary font-mono">
                      <span>Display / Hero Title (48px)</span>
                      <span>text-3xl sm:text-5xl font-bold</span>
                    </div>
                    <div className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-primary leading-tight">
                      Living in Canopy Harmony
                    </div>
                  </div>

                  <div className="space-y-1 pb-4 border-b border-border-subtle">
                    <div className="flex flex-wrap items-center justify-between gap-1 text-[11px] sm:text-xs text-secondary font-mono">
                      <span>Section Heading (32px)</span>
                      <span>text-2xl sm:text-3xl font-bold</span>
                    </div>
                    <div className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-primary">
                      Architectural Residences & Blueprints
                    </div>
                  </div>

                  <div className="space-y-1 pb-4 border-b border-border-subtle">
                    <div className="flex flex-wrap items-center justify-between gap-1 text-[11px] sm:text-xs text-secondary font-mono">
                      <span>Card / Subheading (20px)</span>
                      <span>text-lg sm:text-xl font-bold</span>
                    </div>
                    <div className="font-heading text-lg sm:text-xl font-bold text-primary">
                      The Aspen — 2,850 sq ft • 4 Bed • 3.5 Bath
                    </div>
                  </div>

                  <div className="space-y-1 pb-4 border-b border-border-subtle">
                    <div className="flex flex-wrap items-center justify-between gap-1 text-[11px] sm:text-xs text-secondary font-mono">
                      <span>Body Regular (14px)</span>
                      <span>font-sans text-xs sm:text-sm</span>
                    </div>
                    <p className="text-xs sm:text-sm text-secondary leading-relaxed font-sans max-w-2xl">
                      Each residence integrates floor-to-ceiling double-glazed thermal glass, passive solar orientation, and FSC-certified timber framing to maximize natural air currents.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center justify-between gap-1 text-[11px] sm:text-xs text-secondary font-mono">
                      <span>Technical Specification (12px)</span>
                      <span>font-mono text-xs text-brand</span>
                    </div>
                    <div className="font-mono text-xs text-brand font-semibold break-words">
                      LOT #402 • 0.42 ACRES • NET-ZERO SOLAR RATED • $1,450,000
                    </div>
                  </div>

                </div>
              </div>

              <div>
                <CodeSnippet
                  language="tsx"
                  code={`// app/layout.tsx
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={\`\${plusJakarta.variable} \${inter.variable}\`}>
      <body className="font-sans antialiased bg-canvas text-primary">
        {children}
      </body>
    </html>
  );
}`}
                />
              </div>
            </div>
          )}

          {/* =========================================================================
              TOPIC: STANDARDIZED BORDER RADIUS
             ========================================================================= */}
          {activeTopic === 'radius-spacing' && (
            <div className="space-y-8">
              <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                Consistency in curvature is essential for an architectural aesthetic. Tumbuh enforces a 4-tier border radius rule:
              </p>

              <div className="overflow-x-auto rounded-xl border border-border-subtle bg-surface">
                <table className="w-full text-left text-xs min-w-[500px]">
                  <thead className="bg-sand-100 border-b border-border-subtle text-primary font-bold uppercase tracking-wider">
                    <tr>
                      <th className="p-3 sm:p-4">Element Category</th>
                      <th className="p-3 sm:p-4">Tailwind Class</th>
                      <th className="p-3 sm:p-4">Value</th>
                      <th className="p-3 sm:p-4">Implementation Scope</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-subtle text-secondary">
                    <tr>
                      <td className="p-3 sm:p-4 font-semibold text-primary">Form Controls & Inputs</td>
                      <td className="p-3 sm:p-4 font-mono text-brand font-bold">rounded-xl</td>
                      <td className="p-3 sm:p-4 font-mono">12px</td>
                      <td className="p-3 sm:p-4">Text inputs, Select triggers, Date/Time chips, Dropdown popovers</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-semibold text-primary">Content Cards & Bento Panels</td>
                      <td className="p-3 sm:p-4 font-mono text-brand font-bold">rounded-2xl</td>
                      <td className="p-3 sm:p-4 font-mono">16px</td>
                      <td className="p-3 sm:p-4">Bento grid features, Blog cards, Testimonial cards</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-semibold text-primary">Large Modals & Heroes</td>
                      <td className="p-3 sm:p-4 font-mono text-brand font-bold">rounded-3xl</td>
                      <td className="p-3 sm:p-4 font-mono">24px</td>
                      <td className="p-3 sm:p-4">Tour Booking Modal container, House detail blueprint modal</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-semibold text-primary">Badges, Pills & Icon Discs</td>
                      <td className="p-3 sm:p-4 font-mono text-brand font-bold">rounded-full</td>
                      <td className="p-3 sm:p-4 font-mono">9999px</td>
                      <td className="p-3 sm:p-4">Category badges, filter chips, circular avatar frames</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* =========================================================================
              TOPIC: BUTTON COMPONENT
             ========================================================================= */}
          {activeTopic === 'component-button' && (
            <div className="space-y-8">
              {/* Interactive Live Playground */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-bold text-base sm:text-lg text-primary">Interactive Component Playground</h3>
                  <span className="text-xs text-secondary hidden sm:inline">Click & customize live</span>
                </div>

                <div className="bg-surface p-4 sm:p-8 rounded-2xl border border-border-subtle shadow-sm space-y-6">
                  {/* Controls using custom Select component (Mobile Responsive Stack) */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end text-xs">
                    <div className="w-full">
                      <Select
                        label="Button Variant"
                        size="sm"
                        selectedKey={btnVariant}
                        onSelectionChange={(key) => setBtnVariant(String(key) as any)}
                      >
                        <SelectItem id="primary" label="primary" />
                        <SelectItem id="secondary" label="secondary" />
                        <SelectItem id="secondary-gray" label="secondary-gray" />
                        <SelectItem id="tertiary" label="tertiary" />
                      </Select>
                    </div>

                    <div className="w-full">
                      <Select
                        label="Button Size"
                        size="sm"
                        selectedKey={btnSize}
                        onSelectionChange={(key) => setBtnSize(String(key) as any)}
                      >
                        <SelectItem id="sm" label="sm (36px)" />
                        <SelectItem id="md" label="md (40px)" />
                        <SelectItem id="lg" label="lg (44px)" />
                        <SelectItem id="xl" label="xl (48px)" />
                      </Select>
                    </div>

                    <div className="flex items-center pb-2.5">
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={btnIcon}
                          onChange={(e) => setBtnIcon(e.target.checked)}
                          className="rounded border-border-subtle text-brand focus:ring-brand w-4 h-4"
                        />
                        <span className="font-semibold text-secondary text-xs">Include Icon</span>
                      </label>
                    </div>
                  </div>

                  {/* Rendered Live Button */}
                  <div className="p-4 sm:p-6 rounded-xl bg-canvas border border-border-subtle flex items-center justify-center min-h-[100px] overflow-x-auto">
                    <Button
                      variant={btnVariant}
                      size={btnSize}
                      icon={btnIcon ? 'solar:calendar-bold' : undefined}
                    >
                      Schedule Private Showing
                    </Button>
                  </div>
                </div>
              </div>

              {/* Variants Table */}
              <div className="space-y-4">
                <h3 className="font-heading font-bold text-base sm:text-lg text-primary flex items-center gap-2">
                  <span>🎨 Variants</span>
                </h3>
                <div className="overflow-x-auto rounded-xl border border-border-subtle bg-surface">
                  <table className="w-full text-left text-xs min-w-[500px]">
                    <thead className="bg-sand-100 border-b border-border-subtle text-primary font-bold uppercase tracking-wider">
                      <tr>
                        <th className="p-3 sm:p-4">Variant</th>
                        <th className="p-3 sm:p-4">Description</th>
                        <th className="p-3 sm:p-4">Appearance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-subtle text-secondary">
                      <tr>
                        <td className="p-3 sm:p-4 font-mono font-bold text-brand bg-sand-50/50">primary</td>
                        <td className="p-3 sm:p-4">Main call-to-action button</td>
                        <td className="p-3 sm:p-4 font-sans">Dark timber background with white text & inner highlight</td>
                      </tr>
                      <tr>
                        <td className="p-3 sm:p-4 font-mono font-bold text-brand bg-sand-50/50">secondary</td>
                        <td className="p-3 sm:p-4">Alternate inverted button</td>
                        <td className="p-3 sm:p-4 font-sans">Warm sand background with dark text and subtle hover shadow</td>
                      </tr>
                      <tr>
                        <td className="p-3 sm:p-4 font-mono font-bold text-brand bg-sand-50/50">secondary-gray</td>
                        <td className="p-3 sm:p-4">White outlined action button</td>
                        <td className="p-3 sm:p-4 font-sans">White background with subtle gray border outline</td>
                      </tr>
                      <tr>
                        <td className="p-3 sm:p-4 font-mono font-bold text-brand bg-sand-50/50">tertiary</td>
                        <td className="p-3 sm:p-4">Ghost / Text button</td>
                        <td className="p-3 sm:p-4 font-sans">Transparent background with background highlight on hover</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Props Table */}
              <div className="space-y-4">
                <h3 className="font-heading font-bold text-base sm:text-lg text-primary flex items-center gap-2">
                  <span>⚙️ Props</span>
                </h3>
                <div className="overflow-x-auto rounded-xl border border-border-subtle bg-surface">
                  <table className="w-full text-left text-xs min-w-[500px]">
                    <thead className="bg-sand-100 border-b border-border-subtle text-primary font-bold uppercase tracking-wider">
                      <tr>
                        <th className="p-3 sm:p-4">Prop</th>
                        <th className="p-3 sm:p-4">Type</th>
                        <th className="p-3 sm:p-4">Default</th>
                        <th className="p-3 sm:p-4">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-subtle text-secondary">
                      <tr>
                        <td className="p-3 sm:p-4 font-mono font-bold text-brand">variant</td>
                        <td className="p-3 sm:p-4 font-mono text-[11px]">'primary' | 'secondary' | 'secondary-gray' | 'tertiary'</td>
                        <td className="p-3 sm:p-4 font-mono font-semibold text-primary">'primary'</td>
                        <td className="p-3 sm:p-4">Defines which visual button variant to use.</td>
                      </tr>
                      <tr>
                        <td className="p-3 sm:p-4 font-mono font-bold text-brand">size</td>
                        <td className="p-3 sm:p-4 font-mono text-[11px]">'sm' | 'md' | 'lg' | 'xl' | '2xl'</td>
                        <td className="p-3 sm:p-4 font-mono font-semibold text-primary">'md'</td>
                        <td className="p-3 sm:p-4">Sets button height, internal padding, and font size.</td>
                      </tr>
                      <tr>
                        <td className="p-3 sm:p-4 font-mono font-bold text-brand">icon</td>
                        <td className="p-3 sm:p-4 font-mono text-[11px]">string | ReactNode</td>
                        <td className="p-3 sm:p-4 font-mono">—</td>
                        <td className="p-3 sm:p-4">Iconify icon string (e.g. 'solar:calendar-bold') or SVG node.</td>
                      </tr>
                      <tr>
                        <td className="p-3 sm:p-4 font-mono font-bold text-brand">isLoading</td>
                        <td className="p-3 sm:p-4 font-mono text-[11px]">boolean</td>
                        <td className="p-3 sm:p-4 font-mono font-semibold text-primary">false</td>
                        <td className="p-3 sm:p-4">Displays an animated spinner indicator.</td>
                      </tr>
                      <tr>
                        <td className="p-3 sm:p-4 font-mono font-bold text-brand">fullWidth</td>
                        <td className="p-3 sm:p-4 font-mono text-[11px]">boolean</td>
                        <td className="p-3 sm:p-4 font-mono font-semibold text-primary">false</td>
                        <td className="p-3 sm:p-4">Expands button width to 100% of parent container.</td>
                      </tr>
                      <tr>
                        <td className="p-3 sm:p-4 font-mono font-bold text-brand">disabled</td>
                        <td className="p-3 sm:p-4 font-mono text-[11px]">boolean</td>
                        <td className="p-3 sm:p-4 font-mono font-semibold text-primary">false</td>
                        <td className="p-3 sm:p-4">Disables button clicks and applies muted styling.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Code Examples */}
              <div className="space-y-3">
                <h3 className="font-heading font-bold text-base sm:text-lg text-primary">Usage Example</h3>
                <CodeSnippet
                  language="tsx"
                  code={`import Button from '@/components/Button';

export default function ShowingCTA() {
  return (
    <Button
      variant="primary"
      size="lg"
      icon="solar:calendar-bold"
      onClick={() => alert('Tour scheduled!')}
    >
      Schedule Private Showing
    </Button>
  );
}`}
                />
              </div>
            </div>
          )}

          {/* =========================================================================
              TOPIC: SELECT COMPONENT
             ========================================================================= */}
          {activeTopic === 'component-select' && (
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="font-heading font-bold text-base sm:text-lg text-primary">Interactive Component Playground</h3>
                <div className="bg-surface p-4 sm:p-8 rounded-2xl border border-border-subtle shadow-sm max-w-md">
                  <Select
                    label="Select House Model"
                    placeholder="Choose an architectural model..."
                    size="md"
                    icon="solar:home-2-bold"
                    selectedKey={selectedDemoModel}
                    onSelectionChange={(key) => setSelectedDemoModel(String(key))}
                  >
                    <SelectItem id="aspen" label="The Aspen (2,850 sq ft • 4 Bed)" />
                    <SelectItem id="willow" label="The Willow (2,240 sq ft • 3 Bed)" />
                    <SelectItem id="cypress" label="The Cypress (3,850 sq ft • 5 Bed)" />
                    <SelectItem id="sequoia" label="The Sequoia (3,200 sq ft • 4 Bed)" />
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-heading font-bold text-base sm:text-lg text-primary">Select Props Specification</h3>
                <div className="overflow-x-auto rounded-xl border border-border-subtle bg-surface">
                  <table className="w-full text-left text-xs min-w-[500px]">
                    <thead className="bg-sand-100 border-b border-border-subtle text-primary font-bold uppercase tracking-wider">
                      <tr>
                        <th className="p-3 sm:p-4">Prop</th>
                        <th className="p-3 sm:p-4">Type</th>
                        <th className="p-3 sm:p-4">Default</th>
                        <th className="p-3 sm:p-4">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-subtle text-secondary">
                      <tr>
                        <td className="p-3 sm:p-4 font-mono font-bold text-brand">label</td>
                        <td className="p-3 sm:p-4 font-mono text-[11px]">string</td>
                        <td className="p-3 sm:p-4 font-mono">—</td>
                        <td className="p-3 sm:p-4">Accessible label rendered above the select trigger.</td>
                      </tr>
                      <tr>
                        <td className="p-3 sm:p-4 font-mono font-bold text-brand">placeholder</td>
                        <td className="p-3 sm:p-4 font-mono text-[11px]">string</td>
                        <td className="p-3 sm:p-4 font-mono font-semibold text-primary">'Select an option'</td>
                        <td className="p-3 sm:p-4">Placeholder text shown when no item is selected.</td>
                      </tr>
                      <tr>
                        <td className="p-3 sm:p-4 font-mono font-bold text-brand">size</td>
                        <td className="p-3 sm:p-4 font-mono text-[11px]">'sm' | 'md' | 'lg'</td>
                        <td className="p-3 sm:p-4 font-mono font-semibold text-primary">'md'</td>
                        <td className="p-3 sm:p-4">Trigger height ('md' corresponds to h-10).</td>
                      </tr>
                      <tr>
                        <td className="p-3 sm:p-4 font-mono font-bold text-brand">icon</td>
                        <td className="p-3 sm:p-4 font-mono text-[11px]">string | ReactNode</td>
                        <td className="p-3 sm:p-4 font-mono">—</td>
                        <td className="p-3 sm:p-4">Iconify icon string rendered on the trigger.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-heading font-bold text-base sm:text-lg text-primary">Usage Example</h3>
                <CodeSnippet
                  language="tsx"
                  code={`import { Select, SelectItem } from '@/components/Select';

<Select
  label="Model Preference"
  placeholder="Select an architectural model"
  size="md"
  icon="solar:home-2-bold"
  selectedKey={selectedModel}
  onSelectionChange={(key) => setSelectedModel(String(key))}
>
  <SelectItem id="aspen" label="The Aspen" />
  <SelectItem id="willow" label="The Willow" />
</Select>`}
                />
              </div>
            </div>
          )}

          {/* =========================================================================
              TOPIC: FORM INPUTS & TEXTAREA
             ========================================================================= */}
          {activeTopic === 'component-form' && (
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-heading font-bold text-base sm:text-lg text-primary">Live Interactive Form Controls</h3>
                  <label className="flex items-center gap-2 text-xs font-semibold text-secondary cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formDemoHasError}
                      onChange={(e) => setFormDemoHasError(e.target.checked)}
                      className="rounded border-border-subtle text-red-600 focus:ring-red-500 w-4 h-4"
                    />
                    <span>Toggle Error State</span>
                  </label>
                </div>

                <div className="bg-surface p-4 sm:p-8 rounded-2xl border border-border-subtle shadow-sm max-w-xl space-y-5">
                  {/* Full Name Field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-secondary flex items-center justify-between">
                      <span>Full Name <span className="text-amber-700">*</span></span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-secondary">
                        <Icon icon="solar:user-linear" className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={formDemoName}
                        onChange={(e) => setFormDemoName(e.target.value)}
                        className={`w-full pl-10 pr-4 h-10 rounded-xl bg-surface border text-base sm:text-xs font-medium text-primary shadow-xs transition-all outline-none ${
                          formDemoHasError
                            ? 'border-red-500 ring-4 ring-red-100'
                            : 'border-border-subtle hover:border-sand-500/60 focus:border-brand focus:ring-4 focus:ring-brand/30/50'
                        }`}
                        placeholder="e.g. Eleanor Vance"
                      />
                    </div>
                    {formDemoHasError && (
                      <p className="text-[11px] font-medium text-red-600 flex items-center gap-1">
                        <Icon icon="solar:danger-triangle-bold" className="w-3.5 h-3.5 shrink-0" />
                        <span>Please enter a valid legal full name.</span>
                      </p>
                    )}
                  </div>

                  {/* Email & Phone 2-Col Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-secondary">Email Address</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-secondary">
                          <Icon icon="solar:letter-linear" className="w-4 h-4" />
                        </div>
                        <input
                          type="email"
                          value={formDemoEmail}
                          onChange={(e) => setFormDemoEmail(e.target.value)}
                          className="w-full pl-10 pr-4 h-10 rounded-xl bg-surface border border-border-subtle text-base sm:text-xs font-medium text-primary shadow-xs transition-all outline-none hover:border-sand-500/60 focus:border-brand focus:ring-4 focus:ring-brand/30/50"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-secondary">Phone Number</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-secondary">
                          <Icon icon="solar:phone-linear" className="w-4 h-4" />
                        </div>
                        <input
                          type="tel"
                          value={formDemoPhone}
                          onChange={(e) => setFormDemoPhone(e.target.value)}
                          className="w-full pl-10 pr-4 h-10 rounded-xl bg-surface border border-border-subtle text-base sm:text-xs font-medium text-primary shadow-xs transition-all outline-none hover:border-sand-500/60 focus:border-brand focus:ring-4 focus:ring-brand/30/50"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Textarea Field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-secondary">Inquiry Details</label>
                    <textarea
                      rows={3}
                      value={formDemoMessage}
                      onChange={(e) => setFormDemoMessage(e.target.value)}
                      className="w-full p-3.5 rounded-xl bg-surface border border-border-subtle text-base sm:text-xs font-medium text-primary shadow-xs transition-all outline-none hover:border-sand-500/60 focus:border-brand focus:ring-4 focus:ring-brand/30/50 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Form Design Specifications */}
              <div className="space-y-4">
                <h3 className="font-heading font-bold text-base sm:text-lg text-primary">Standardized Form Styling Classes</h3>
                <div className="overflow-x-auto rounded-xl border border-border-subtle bg-surface">
                  <table className="w-full text-left text-xs min-w-[500px]">
                    <thead className="bg-sand-100 border-b border-border-subtle text-primary font-bold uppercase tracking-wider">
                      <tr>
                        <th className="p-3 sm:p-4">Element / State</th>
                        <th className="p-3 sm:p-4">Tailwind CSS Classes</th>
                        <th className="p-3 sm:p-4">Visual Rationale</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-subtle text-secondary">
                      <tr>
                        <td className="p-3 sm:p-4 font-semibold text-primary">Base Input Height & Radius</td>
                        <td className="p-3 sm:p-4 font-mono text-brand font-bold">h-10 rounded-xl px-4</td>
                        <td className="p-3 sm:p-4">40px height standard paired with unified 12px curvature.</td>
                      </tr>
                      <tr>
                        <td className="p-3 sm:p-4 font-semibold text-primary">Icon Prefix Slot</td>
                        <td className="p-3 sm:p-4 font-mono text-brand font-bold">pl-10 text-secondary pointer-events-none</td>
                        <td className="p-3 sm:p-4">Positions vector icon with 40px left padding buffer.</td>
                      </tr>
                      <tr>
                        <td className="p-3 sm:p-4 font-semibold text-primary">Focus State Ring</td>
                        <td className="p-3 sm:p-4 font-mono text-brand font-bold">focus:border-brand focus:ring-4 focus:ring-brand/30/50</td>
                        <td className="p-3 sm:p-4">4px soft timber aura for keyboard and touch navigation.</td>
                      </tr>
                      <tr>
                        <td className="p-3 sm:p-4 font-semibold text-primary">Validation Error Ring</td>
                        <td className="p-3 sm:p-4 font-mono text-brand font-bold">border-red-500 ring-4 ring-red-100</td>
                        <td className="p-3 sm:p-4">High-contrast accessibility alert state for invalid inputs.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* TSX Code Snippet */}
              <div className="space-y-3">
                <h3 className="font-heading font-bold text-base sm:text-lg text-primary">Form Implementation Snippet</h3>
                <CodeSnippet
                  language="tsx"
                  code={`<div className="relative">
  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-secondary">
    <Icon icon="solar:letter-linear" className="w-4 h-4" />
  </div>
  <input
    type="email"
    required
    placeholder="you@domain.com"
    className="w-full pl-10 pr-4 h-10 rounded-xl bg-surface border border-border-subtle text-xs font-medium text-primary shadow-xs transition-all outline-none hover:border-sand-500/60 focus:border-brand focus:ring-4 focus:ring-brand/30/50"
  />
</div>`}
                />
              </div>
            </div>
          )}

          {/* =========================================================================
              TOPIC: BADGE & STATUS TAGS
             ========================================================================= */}
          {activeTopic === 'component-badge' && (
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="font-heading font-bold text-base sm:text-lg text-primary">Live Badge & Status Tags</h3>
                <div className="bg-surface p-4 sm:p-8 rounded-2xl border border-border-subtle shadow-sm space-y-6">
                  
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-secondary uppercase tracking-wider block">1. Category Badges</span>
                    <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                      <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-light text-brand border border-brand-border">
                        Masterplan
                      </span>
                      <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-sand-200 text-secondary border border-border-subtle">
                        Biophilic
                      </span>
                      <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                        Net-Zero Solar
                      </span>
                      <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                        Architecture
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-border-subtle">
                    <span className="text-xs font-semibold text-secondary uppercase tracking-wider block">2. Lot Availability Status Indicators</span>
                    <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-brand-light text-brand border border-brand-border">
                        <span className="w-2 h-2 rounded-full bg-brand shrink-0" />
                        Available (Phase I)
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                        <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                        Under Contract
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                        <span className="w-2 h-2 rounded-full bg-slate-400 shrink-0" />
                        Sold Out
                      </span>
                    </div>
                  </div>

                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-heading font-bold text-base sm:text-lg text-primary">Badge Implementation</h3>
                <CodeSnippet
                  language="tsx"
                  code={`// Standard Category Pill
<span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-light text-brand border border-brand-border">
  Masterplan
</span>

// Pulsing Live Availability Status
<span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-brand-light text-brand border border-brand-border">
  <span className="w-2 h-2 rounded-full bg-brand" />
  Available
</span>`}
                />
              </div>
            </div>
          )}

          {/* =========================================================================
              TOPIC: TOUR BOOKING DRAWER
             ========================================================================= */}
          {activeTopic === 'feature-tour-modal' && (
            <div className="space-y-8">
              <div className="bg-surface rounded-2xl p-5 sm:p-8 border border-border-subtle shadow-sm space-y-4">
                <h3 className="font-heading font-bold text-lg sm:text-xl text-primary">
                  5-Step Private Tour Booking Flow
                </h3>
                <p className="text-xs sm:text-sm text-secondary leading-relaxed font-sans">
                  The <code className="font-mono text-brand font-bold">TourBookingModal.tsx</code> component provides an interactive booking drawer supporting both in-person Hill Country walkthroughs and 4K remote live video showings with sales architects.
                </p>
              </div>

              {/* Step Sequence Table */}
              <div className="overflow-x-auto rounded-xl border border-border-subtle bg-surface">
                <table className="w-full text-left text-xs min-w-[500px]">
                  <thead className="bg-sand-100 border-b border-border-subtle text-primary font-bold uppercase tracking-wider">
                    <tr>
                      <th className="p-3 sm:p-4">Step</th>
                      <th className="p-3 sm:p-4">Step Name</th>
                      <th className="p-3 sm:p-4">User Action & Features</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-subtle text-secondary">
                    <tr>
                      <td className="p-3 sm:p-4 font-mono font-bold text-brand">01</td>
                      <td className="p-3 sm:p-4 font-semibold text-primary">Tour Format</td>
                      <td className="p-3 sm:p-4">Choose between Guided Hill Country On-site Walkthrough or 1-on-1 Zoom Video Tour.</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-mono font-bold text-brand">02</td>
                      <td className="p-3 sm:p-4 font-semibold text-primary">Residence Model</td>
                      <td className="p-3 sm:p-4">Select preferred model (The Aspen, The Willow, The Cypress, The Sequoia) or Entire Masterplan.</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-mono font-bold text-brand">03</td>
                      <td className="p-3 sm:p-4 font-semibold text-primary">Date & Time Slot</td>
                      <td className="p-3 sm:p-4">Select date chip and choose from 45-minute architectural consultant time slots.</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-mono font-bold text-brand">04</td>
                      <td className="p-3 sm:p-4 font-semibold text-primary">Guest Information</td>
                      <td className="p-3 sm:p-4">Provide legal name, contact email, mobile number, and optional financing preferences.</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-mono font-bold text-brand">05</td>
                      <td className="p-3 sm:p-4 font-semibold text-primary">Confirmation</td>
                      <td className="p-3 sm:p-4">Displays calendar invitation payload, map coordinates, and sales desk concierge contact.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <CodeSnippet
                  language="tsx"
                  code={`import TourBookingModal from '@/components/TourBookingModal';

const [isTourOpen, setIsTourOpen] = useState(false);

<TourBookingModal
  isOpen={isTourOpen}
  onClose={() => setIsTourOpen(false)}
  initialModel="The Aspen"
/>`}
                />
              </div>
            </div>
          )}

          {/* =========================================================================
              TOPIC: INTERACTIVE MASTERPLAN
             ========================================================================= */}
          {activeTopic === 'feature-masterplan' && (
            <div className="space-y-8">
              <div className="bg-surface rounded-2xl p-5 sm:p-8 border border-border-subtle shadow-sm space-y-4">
                <h3 className="font-heading font-bold text-lg sm:text-xl text-primary">
                  Interactive 2D Vector Masterplan Canvas
                </h3>
                <p className="text-xs sm:text-sm text-secondary leading-relaxed font-sans">
                  The <code className="font-mono text-brand font-bold">Masterplan.tsx</code> section renders a high-precision 2D vector site plan where potential buyers can inspect lot parcels, filter by availability, and view dynamic pricing popovers with direct tour scheduling triggers.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-heading font-bold text-base sm:text-lg text-primary">Adding or Modifying Parcels</h3>
                <p className="text-xs text-secondary">
                  Parcels are defined in <code className="font-mono text-brand font-bold">data/communityData.ts</code> with SVG path coordinates and status attributes:
                </p>
                <CodeSnippet
                  language="typescript"
                  code={`// data/communityData.ts
export interface MasterplanPlot {
  id: string;
  lotNumber: string;
  model: string;
  sqft: number;
  lotAcreage: string;
  price: string;
  status: 'available' | 'reserved' | 'sold';
  phase: number;
  coordinates: { x: number; y: number; width: number; height: number };
}`}
                />
              </div>
            </div>
          )}

          {/* =========================================================================
              TOPIC: HOUSE GRID & STACKING CARDS
             ========================================================================= */}
          {activeTopic === 'feature-house-grid' && (
            <div className="space-y-8">
              <div className="bg-surface rounded-2xl p-5 sm:p-8 border border-border-subtle shadow-sm space-y-4">
                <h3 className="font-heading font-bold text-lg sm:text-xl text-primary">
                  ScrollTrigger Sticky Stacking Residences
                </h3>
                <p className="text-xs sm:text-sm text-secondary leading-relaxed font-sans">
                  <code className="font-mono text-brand font-bold">HouseGrid.tsx</code> implements 100vh full-bleed sticky card pinning with scrubbed zoom scaling (<code className="font-mono text-brand">scale: 1.08</code>) and smooth text parallax, synchronized with Lenis smooth scroll.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-heading font-bold text-base sm:text-lg text-primary">GSAP Lifecycle Guard Implementation</h3>
                <CodeSnippet
                  language="tsx"
                  code={`// components/HouseGrid.tsx
useGSAP(() => {
  const cards = gsap.utils.toArray<HTMLElement>('.house-stack-card');
  if (!cards || cards.length === 0) return;

  cards.forEach((card, i) => {
    ScrollTrigger.create({
      trigger: card,
      start: 'top top',
      pin: true,
      pinSpacing: false,
      scrub: true,
      invalidateOnRefresh: true,
    });
  });
}, { scope: containerRef });`}
                />
              </div>
            </div>
          )}

          {/* =========================================================================
              TOPIC: SMOOTH SCROLL (LENIS)
             ========================================================================= */}
          {activeTopic === 'feature-smooth-scroll' && (
            <div className="space-y-8">
              <div className="bg-surface rounded-2xl p-5 sm:p-8 border border-border-subtle shadow-sm space-y-4">
                <h3 className="font-heading font-bold text-lg sm:text-xl text-primary">
                  Root-Mounted Lenis Scroll Engine
                </h3>
                <p className="text-xs sm:text-sm text-secondary leading-relaxed font-sans">
                  In Tumbuh, <code className="font-mono text-brand font-bold">ReactLenis</code> is mounted strictly in <code className="font-mono text-brand font-bold">app/layout.tsx</code> wrapped around <code className="font-mono text-brand">children</code>. This prevents DOM reconciliation crashes and ensures uninterrupted 60fps scrolling across dynamic route changes.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-heading font-bold text-base sm:text-lg text-primary">Root Layout Wrapper Pattern</h3>
                <CodeSnippet
                  language="tsx"
                  code={`// components/SmoothScroll.tsx
'use client';
import { ReactLenis } from 'lenis/react';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1.0,
      }}
    >
      {children}
    </ReactLenis>
  );
}`}
                />
              </div>
            </div>
          )}

          {/* =========================================================================
              TOPIC: UPDATING DATA & CONTENT
             ========================================================================= */}
          {activeTopic === 'data-customization' && (
            <div className="space-y-8">
              <div className="bg-surface rounded-2xl p-5 sm:p-8 border border-border-subtle shadow-sm space-y-4">
                <h3 className="font-heading font-bold text-lg sm:text-xl text-primary">
                  Zero-Code Content Customization
                </h3>
                <p className="text-xs sm:text-sm text-secondary leading-relaxed font-sans">
                  All property models, architectural blueprints, pricing, team bios, amenities, and journal articles are stored in pure TypeScript datasets under the <code className="font-mono text-brand font-bold">data/</code> folder. You can completely replace all copy and media without touching UI component files.
                </p>
              </div>

              <div className="overflow-x-auto rounded-xl border border-border-subtle bg-surface">
                <table className="w-full text-left text-xs min-w-[500px]">
                  <thead className="bg-sand-100 border-b border-border-subtle text-primary font-bold uppercase tracking-wider">
                    <tr>
                      <th className="p-3 sm:p-4">Dataset File</th>
                      <th className="p-3 sm:p-4">Exported Symbols</th>
                      <th className="p-3 sm:p-4">Customization Scope</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-subtle text-secondary">
                    <tr>
                      <td className="p-3 sm:p-4 font-mono font-bold text-brand">data/houseModels.ts</td>
                      <td className="p-3 sm:p-4 font-mono">HOUSE_MODELS</td>
                      <td className="p-3 sm:p-4">Bedrooms, baths, square footage, solar ratings, blueprint SVGs, and pricing.</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-mono font-bold text-brand">data/communityData.ts</td>
                      <td className="p-3 sm:p-4 font-mono">MASTERPLAN_PLOTS, FAQ_ITEMS</td>
                      <td className="p-3 sm:p-4">Site plan parcel lot availability, developer team members, and FAQ items.</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-mono font-bold text-brand">data/amenitiesData.ts</td>
                      <td className="p-3 sm:p-4 font-mono">AMENITIES_CATEGORIES</td>
                      <td className="p-3 sm:p-4">Clubhouse, nature trails, infinity pool, and wellness center photography.</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-4 font-mono font-bold text-brand">data/journalData.ts</td>
                      <td className="p-3 sm:p-4 font-mono">JOURNAL_POSTS</td>
                      <td className="p-3 sm:p-4">Architectural essays and sustainability articles (auto-generates SSG pages).</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* =========================================================================
              TOPIC: VERCEL DEPLOYMENT & SEO
             ========================================================================= */}
          {activeTopic === 'deployment' && (
            <div className="space-y-8">
              <div className="bg-surface rounded-2xl p-5 sm:p-8 border border-border-subtle shadow-sm space-y-4">
                <h3 className="font-heading font-bold text-lg sm:text-xl text-primary">
                  1-Click Production Deployment
                </h3>
                <p className="text-xs sm:text-sm text-secondary leading-relaxed font-sans">
                  Tumbuh is pre-configured with modern image format transforms (AVIF/WebP), static page prerendering (SSG), and code splitting out of the box for instantaneous deployment on <strong>Vercel</strong>, <strong>Netlify</strong>, or <strong>AWS Amplify</strong>.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-heading font-bold text-base sm:text-lg text-primary">Deployment Steps</h3>
                <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-secondary leading-relaxed">
                  <li>Push your customized project to your preferred Git repository (GitHub, GitLab, Bitbucket).</li>
                  <li>Log in to <strong className="text-primary">vercel.com</strong> and click <strong>"Add New Project"</strong>.</li>
                  <li>Select your repository — Vercel will automatically detect Next.js and populate the build command (<code className="font-mono text-brand">npm run build</code>).</li>
                  <li>Click <strong>Deploy</strong>. In under 60 seconds, your site will be live with automated SSL and Edge CDN caching.</li>
                </ol>
              </div>

              <div className="space-y-3">
                <h3 className="font-heading font-bold text-base sm:text-lg text-primary">SEO & OpenGraph Configuration</h3>
                <CodeSnippet
                  language="tsx"
                  code={`// app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://yourdomain.com'),
  title: 'Tumbuh — Modern Cluster Housing Discovery & Masterplanned Community',
  description: 'Immersive discovery platform for modern suburban cluster housing.',
  openGraph: {
    title: 'Tumbuh — Modern Cluster Housing Discovery',
    description: 'Transparent architectural specifications, floor plans, and interactive masterplan.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};`}
                />
              </div>
            </div>
          )}

          {/* Topic Pagination Navigation Cards (Mobile Friendly) */}
          <div className="pt-6 sm:pt-8 border-t border-border-subtle grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {prevSection ? (
              <button
                onClick={() => {
                  setActiveTopic(prevSection.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="p-3.5 sm:p-4 rounded-2xl border border-border-subtle hover:border-brand-border bg-surface hover:bg-sand-50/80 transition-all text-left group cursor-pointer space-y-1 sm:space-y-1.5 shadow-xs active:scale-[0.98]"
              >
                <span className="text-[10px] font-mono uppercase tracking-wider text-secondary flex items-center gap-1.5">
                  <Icon icon="solar:arrow-left-linear" className="w-3.5 h-3.5 text-brand group-hover:-translate-x-0.5 transition-transform shrink-0" />
                  <span>Previous Topic</span>
                </span>
                <div className="font-heading font-bold text-xs sm:text-sm text-primary group-hover:text-brand transition-colors truncate">
                  {prevSection.title}
                </div>
              </button>
            ) : <div />}

            {nextSection ? (
              <button
                onClick={() => {
                  setActiveTopic(nextSection.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="p-3.5 sm:p-4 rounded-2xl border border-border-subtle hover:border-brand-border bg-surface hover:bg-sand-50/80 transition-all text-right group cursor-pointer space-y-1 sm:space-y-1.5 sm:col-start-2 shadow-xs active:scale-[0.98]"
              >
                <span className="text-[10px] font-mono uppercase tracking-wider text-secondary flex items-center justify-end gap-1.5">
                  <span>Next Topic</span>
                  <Icon icon="solar:arrow-right-linear" className="w-3.5 h-3.5 text-brand group-hover:translate-x-0.5 transition-transform shrink-0" />
                </span>
                <div className="font-heading font-bold text-xs sm:text-sm text-primary group-hover:text-brand transition-colors truncate">
                  {nextSection.title}
                </div>
              </button>
            ) : null}
          </div>

          {/* Bottom Documentation Footer */}
          <div className="pt-4 sm:pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-secondary text-center sm:text-left">
            <div className="flex items-center justify-center gap-2">
              <Image
                src="/logo/tumbuh-logo-green.svg"
                alt="Tumbuh Logo"
                width={18}
                height={16}
                className="w-4.5 h-auto object-contain shrink-0"
              />
              <span className="text-[11px] sm:text-xs">Tumbuh Design System & Next.js Template &copy; {new Date().getFullYear()}</span>
            </div>
            <div className="flex items-center gap-4 font-semibold text-[11px] sm:text-xs">
              <Link href="/" className="hover:text-primary transition-colors">Main Site</Link>
              <Link href="/contact" className="hover:text-primary transition-colors">Inquiries</Link>
            </div>
          </div>

          </div>
        </main>
      </div>

      {/* =========================================================================
          COMMAND PALETTE / QUICK SEARCH MODAL (⌘K - Mobile Responsive)
         ========================================================================= */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-28 px-3 sm:px-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl bg-surface rounded-2xl border border-border-subtle shadow-2xl overflow-hidden flex flex-col max-h-[85vh] sm:max-h-[75vh]"
          >
            {/* Modal Search Input */}
            <div className="flex items-center px-3.5 sm:px-4 border-b border-border-subtle h-13 sm:h-14 bg-canvas/50">
              <Icon icon="solar:magnifer-linear" className="w-5 h-5 text-secondary mr-2.5 sm:mr-3 shrink-0" />
              <input
                autoFocus
                type="text"
                placeholder="Search components, design tokens, props..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm text-primary placeholder-gray-400 focus:outline-none"
              />
              <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-sand-200 border border-border-subtle text-secondary shrink-0 ml-2">
                ESC
              </kbd>
            </div>

            {/* Search Results List */}
            <div className="overflow-y-auto p-2 space-y-1 flex-1">
              {DOC_SECTIONS.filter((s) => {
                if (!searchQuery) return true;
                return (
                  s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  s.category.toLowerCase().includes(searchQuery.toLowerCase())
                );
              }).map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => {
                    setActiveTopic(sec.id);
                    setSearchModalOpen(false);
                    setSearchQuery('');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full text-left p-3 rounded-xl hover:bg-sand-100 transition-colors flex items-center justify-between group cursor-pointer active:scale-[0.98]"
                >
                  <div className="space-y-0.5 min-w-0 pr-2">
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-bold text-xs sm:text-sm text-primary group-hover:text-brand transition-colors truncate">
                        {sec.title}
                      </span>
                      <span className="text-[10px] font-mono text-secondary bg-sand-200 px-1.5 py-0.2 rounded shrink-0">
                        {sec.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-secondary truncate">
                      {sec.description}
                    </p>
                  </div>
                  <Icon icon="solar:arrow-right-linear" className="w-4 h-4 text-secondary group-hover:text-brand transition-transform group-hover:translate-x-1 shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
