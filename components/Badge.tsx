'use client';

import React from 'react';

export interface BadgeProps {
  addon?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Badge({
  addon,
  children,
  className = '',
}: BadgeProps) {
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold tracking-wider text-brand bg-brand-light border border-brand-border select-none ${className}`}
    >
      {addon && (
        <span className="opacity-75 font-bold after:content-['•'] after:ml-1.5">
          {addon}
        </span>
      )}
      <span>{children}</span>
    </div>
  );
}
