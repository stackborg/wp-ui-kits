/**
 * Skeleton — shimmer loading placeholder block.
 *
 * Renders a pulsing placeholder used in loading states.
 * Customize dimensions and shape via style prop.
 *
 * Usage:
 *   <Skeleton style={{ height: '1rem', width: '8rem' }} />
 *   <Skeleton style={{ height: '2.5rem', width: '2.5rem', borderRadius: '50%' }} />
 */
import React from 'react';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Skeleton({ className, style, ...props }: SkeletonProps) {
  return (
    <div
      className={className}
      style={{
        background: 'var(--sb-color-bg-muted, #e5e7eb)',
        borderRadius: 'var(--sb-radius-sm, 6px)',
        animation: 'sb-pulse 1.5s ease-in-out infinite',
        ...style,
      }}
      {...props}
    />
  );
}
