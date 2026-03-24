/**
 * Badge — inline label with variant colors or custom color.
 *
 * Usage:
 *   <Badge variant="success">Active</Badge>
 *   <Badge color="#8b5cf6">Pro</Badge>
 */

import React from 'react';
import type { ReactNode } from 'react';

export type BadgeVariant = 'success' | 'error' | 'danger' | 'warning' | 'info' | 'neutral';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  /** Custom color override — sets text + generates light background */
  color?: string;
  'data-testid'?: string;
}

const variantStyles: Record<BadgeVariant, { bg: string; color: string }> = {
  success: { bg: 'var(--sb-color-success-light, #f0fdf4)', color: 'var(--sb-color-success, #22c55e)' },
  error:   { bg: 'var(--sb-color-error-light, #fef2f2)', color: 'var(--sb-color-error, #ef4444)' },
  danger:  { bg: 'var(--sb-color-error-light, #fef2f2)', color: 'var(--sb-color-error, #ef4444)' },
  warning: { bg: 'var(--sb-color-warning-light, #fffbeb)', color: 'var(--sb-color-warning, #f59e0b)' },
  info:    { bg: 'var(--sb-color-info-light, #eff6ff)', color: 'var(--sb-color-info, #3b82f6)' },
  neutral: { bg: 'var(--sb-color-bg-muted, #f3f4f6)', color: 'var(--sb-color-text-secondary, #6b7280)' },
};

export function Badge({
  children,
  variant = 'neutral',
  color,
  ...rest
}: BadgeProps): React.ReactElement {
  // Custom color: use the color directly and generate light bg with opacity
  const style = color
    ? { bg: color + '18', color } // 18 = ~10% opacity hex suffix
    : variantStyles[variant];

  return (
    <span
      {...rest}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '1px 6px',
        borderRadius: 'var(--sb-radius-sm, 4px)',
        fontSize: 'var(--sb-font-size-xs, 11px)',
        fontWeight: 'var(--sb-font-weight-semibold, 600)' as unknown as number,
        backgroundColor: style.bg,
        color: style.color,
        lineHeight: 1.5,
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  );
}
