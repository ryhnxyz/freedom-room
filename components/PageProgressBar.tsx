'use client';

import { useEffect, useState, useRef, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

function PageProgressBarInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const completeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const prevPathRef = useRef(pathname);

  // When route finishes changing, complete the progress bar
  useEffect(() => {
    if (prevPathRef.current !== pathname) {
      prevPathRef.current = pathname;
      if (timerRef.current) clearInterval(timerRef.current);
      
      setProgress(100);
      completeTimerRef.current = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          setProgress(0);
        }, 250);
      }, 300);
    }
  }, [pathname, searchParams]);

  // Intercept link clicks to start progress bar instantly
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      // Ignore modified clicks (cmd, ctrl, shift, middle click, etc.)
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.altKey ||
        e.shiftKey
      ) {
        return;
      }

      const target = (e.target as HTMLElement)?.closest('a');
      if (!target || !target.href) return;

      try {
        const targetUrl = new URL(target.href, window.location.href);
        const currentUrl = new URL(window.location.href);

        // Only handle same-origin internal navigations
        if (targetUrl.origin !== currentUrl.origin) return;

        // Don't trigger for downloads or new tabs
        if (target.hasAttribute('download') || target.target === '_blank') return;

        // If it's just a hash jump on the same page (e.g. /#models on /), don't trigger progress bar
        if (
          targetUrl.pathname === currentUrl.pathname &&
          targetUrl.search === currentUrl.search &&
          targetUrl.hash !== currentUrl.hash
        ) {
          return;
        }

        // If navigating to different page
        if (
          targetUrl.pathname !== currentUrl.pathname ||
          targetUrl.search !== currentUrl.search
        ) {
          if (completeTimerRef.current) clearTimeout(completeTimerRef.current);
          if (timerRef.current) clearInterval(timerRef.current);

          setIsVisible(true);
          setProgress(25);

          // Progressively advance while waiting for the next page
          timerRef.current = setInterval(() => {
            setProgress((prev) => {
              if (prev >= 85) {
                if (timerRef.current) clearInterval(timerRef.current);
                return 85;
              }
              const step = (90 - prev) * 0.2;
              return Math.min(prev + Math.max(step, 2), 85);
            });
          }, 120);
        }
      } catch {
        // Ignore URL parsing errors
      }
    };

    const handlePopState = () => {
      setIsVisible(true);
      setProgress(30);
    };

    document.addEventListener('click', handleAnchorClick, { capture: true });
    window.addEventListener('popstate', handlePopState);

    return () => {
      document.removeEventListener('click', handleAnchorClick, { capture: true });
      window.removeEventListener('popstate', handlePopState);
      if (timerRef.current) clearInterval(timerRef.current);
      if (completeTimerRef.current) clearTimeout(completeTimerRef.current);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      className={`fixed top-0 left-0 right-0 z-[99999] h-[3px] pointer-events-none transition-opacity duration-200 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Solid Green Progress Bar Track */}
      <div
        style={{
          transform: `scaleX(${progress / 100})`,
          transformOrigin: 'left center',
          transition: progress === 100 ? 'transform 180ms ease-out' : 'transform 200ms ease-out',
        }}
        className="relative h-full w-full bg-brand shadow-sm"
      />
    </div>
  );
}

export default function PageProgressBar() {
  return (
    <Suspense fallback={null}>
      <PageProgressBarInner />
    </Suspense>
  );
}
