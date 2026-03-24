/**
 * Spinner — inline loading spinner with size variants.
 *
 * Usage:
 *   <Spinner />
 *   <Spinner size="lg" />
 *   <Button><Spinner size="sm" /> Loading...</Button>
 */
import React from 'react';

export type SpinnerSize = 'sm' | 'md' | 'lg';

interface SpinnerProps {
  size?: SpinnerSize;
  className?: string;
}

const sizePx: Record<SpinnerSize, number> = {
  sm: 14,
  md: 20,
  lg: 28,
};

export function Spinner({ size = 'md', className }: SpinnerProps): React.ReactElement {
  const px = sizePx[size];

  return (
    <span
      className={className}
      style={{
        display: 'inline-block',
        width: `${px}px`,
        height: `${px}px`,
        border: '2px solid currentColor',
        borderRightColor: 'transparent',
        borderRadius: '50%',
        animation: 'sb-spin 0.6s linear infinite',
      }}
    />
  );
}
