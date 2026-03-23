/**
 * Button — shared button primitive with variants, sizes, and loading state.
 *
 * All Stackborg plugins use this component for consistent button styling.
 * Colors are controlled via CSS tokens so plugins can override branding.
 *
 * Usage:
 *   <Button variant="primary" size="sm" onClick={fn}>Save</Button>
 *   <Button variant="danger" loading>Deleting...</Button>
 */

import React from 'react';
import type { ReactNode, ButtonHTMLAttributes } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'warning' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'style'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  children: ReactNode;
}

// CSS token-based variant styles
const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    backgroundColor: 'var(--sb-color-primary, #6366f1)',
    color: '#fff',
    border: 'none',
  },
  secondary: {
    backgroundColor: 'var(--sb-color-bg-muted, #f3f4f6)',
    color: 'var(--sb-color-text, #374151)',
    border: '1px solid var(--sb-color-border, #e5e7eb)',
  },
  danger: {
    backgroundColor: 'var(--sb-color-error-light, #fee2e2)',
    color: 'var(--sb-color-error, #dc2626)',
    border: 'none',
  },
  warning: {
    backgroundColor: 'var(--sb-color-warning, #f59e0b)',
    color: '#fff',
    border: 'none',
  },
  ghost: {
    backgroundColor: 'transparent',
    color: 'var(--sb-color-text-secondary, #6b7280)',
    border: 'none',
  },
};

const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
  sm: { padding: '4px 12px', fontSize: 'var(--sb-font-size-xs, 12px)' },
  md: { padding: '6px 14px', fontSize: 'var(--sb-font-size-sm, 13px)' },
  lg: { padding: '8px 18px', fontSize: 'var(--sb-font-size-base, 14px)' },
};

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  disabled,
  children,
  ...rest
}: ButtonProps): React.ReactElement {
  const isDisabled = disabled || loading;

  return (
    <button
      {...rest}
      disabled={isDisabled}
      style={{
        ...variantStyles[variant],
        ...sizeStyles[size],
        borderRadius: 'var(--sb-radius-sm, 6px)',
        fontWeight: 'var(--sb-font-weight-medium, 500)' as unknown as number,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        opacity: isDisabled ? 0.6 : 1,
        transition: `all var(--sb-transition-fast, 150ms)`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        width: fullWidth ? '100%' : undefined,
        lineHeight: 1.4,
      }}
    >
      {loading && (
        <span
          style={{
            width: '14px',
            height: '14px',
            border: '2px solid currentColor',
            borderRightColor: 'transparent',
            borderRadius: '50%',
            display: 'inline-block',
            animation: 'sb-spin 0.6s linear infinite',
          }}
        />
      )}
      {children}
    </button>
  );
}
