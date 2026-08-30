'use client';

import React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  variant?: 'rectangular' | 'rounded' | 'circle' | 'text';
  width?: string | number;
  height?: string | number;
}

export function Skeleton({
  className = '',
  variant = 'rounded',
  width,
  height,
  style,
  ...props
}: SkeletonProps) {
  const variantClasses = {
    rectangular: 'rounded-none',
    rounded: 'rounded-xl',
    circle: 'rounded-full',
    text: 'rounded-md h-4 w-full',
  };

  const dynamicStyle = {
    width,
    height,
    ...style,
  };

  return (
    <div
      aria-hidden="true"
      style={dynamicStyle}
      className={`animate-pulse bg-gradient-to-r from-sand-200 via-sand-100 to-sand-200 bg-[length:200%_100%] ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
}

/**
 * Room Card Skeleton: Exact layout match for /booking room grid
 */
export function RoomCardSkeleton() {
  return (
    <div className="bg-surface rounded-3xl border border-border-subtle overflow-hidden flex flex-col justify-between shadow-xs">
      {/* Thumbnail Skeleton */}
      <div className="relative h-60 w-full bg-sand-200 animate-pulse">
        <div className="absolute top-4 left-4 h-6 w-24 bg-white/40 backdrop-blur-md rounded-full" />
        <div className="absolute top-4 right-4 h-6 w-20 bg-white/40 backdrop-blur-md rounded-full" />
      </div>

      {/* Content Skeleton */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-5">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-16" />
          </div>

          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-4/5" />

          {/* Specs Skeleton */}
          <div className="grid grid-cols-3 gap-2 pt-2">
            <Skeleton className="h-10 rounded-xl" />
            <Skeleton className="h-10 rounded-xl" />
            <Skeleton className="h-10 rounded-xl" />
          </div>
        </div>

        {/* Price & Action Button Skeleton */}
        <div className="pt-4 border-t border-border-subtle flex items-center justify-between gap-3">
          <div className="space-y-1.5 flex-1">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-5 w-28" />
          </div>
          <Skeleton className="h-10 w-28 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

/**
 * Review Item Skeleton: Exact layout match for /room/[id] review items
 */
export function ReviewItemSkeleton() {
  return (
    <div className="bg-surface rounded-2xl p-4 sm:p-5 border border-border-subtle space-y-3 shadow-xs animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-sand-200" />
          <div className="space-y-1.5">
            <div className="h-4 w-28 bg-sand-200 rounded" />
            <div className="h-3 w-20 bg-sand-200 rounded" />
          </div>
        </div>
        <div className="h-4 w-16 bg-sand-200 rounded-full" />
      </div>
      <div className="space-y-1.5 pt-1">
        <div className="h-3.5 w-full bg-sand-200 rounded" />
        <div className="h-3.5 w-3/4 bg-sand-200 rounded" />
      </div>
    </div>
  );
}

/**
 * Reservation Lookup Skeleton: Match for /cek-booking result card
 */
export function ReservationResultSkeleton() {
  return (
    <div className="bg-surface rounded-3xl border border-border-subtle p-6 sm:p-8 space-y-6 shadow-sm animate-pulse">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-6">
        <div className="space-y-2">
          <div className="h-4 w-28 bg-sand-200 rounded" />
          <div className="h-7 w-44 bg-sand-200 rounded" />
        </div>
        <div className="h-8 w-32 bg-sand-200 rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-canvas p-4 rounded-2xl border border-border-subtle space-y-2">
          <div className="h-3 w-20 bg-sand-200 rounded" />
          <div className="h-5 w-36 bg-sand-200 rounded" />
        </div>
        <div className="bg-canvas p-4 rounded-2xl border border-border-subtle space-y-2">
          <div className="h-3 w-20 bg-sand-200 rounded" />
          <div className="h-5 w-36 bg-sand-200 rounded" />
        </div>
        <div className="bg-canvas p-4 rounded-2xl border border-border-subtle space-y-2">
          <div className="h-3 w-20 bg-sand-200 rounded" />
          <div className="h-5 w-36 bg-sand-200 rounded" />
        </div>
      </div>

      <div className="h-16 bg-sand-100 rounded-2xl" />
    </div>
  );
}

export default Skeleton;
