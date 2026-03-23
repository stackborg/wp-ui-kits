/**
 * Alert — contextual banner with variant colors and optional dismiss.
 *
 * Usage:
 *   <Alert variant="warning">Missing dependencies</Alert>
 *   <Alert variant="success" dismissible onDismiss={fn}>Saved!</Alert>
 */

import React, { useState } from 'react';
import type { ReactNode } from 'react';

export type AlertVariant = 'info' | 'warning' | 'error' | 'success';

interface AlertProps {
  children: ReactNode;
  variant?: AlertVariant;
  dismissible?: boolean;
  onDismiss?: () => void;
  icon?: ReactNode;
  'data-testid'?: string;
}

const variantStyles: Record<AlertVariant, { bg: string; border: string; color: string; icon: string }> = {
  info: {
    bg: 'var(--sb-color-info-light, #eff6ff)',
    border: 'var(--sb-color-info, #3b82f6)',
    color: '#1e40af',
    icon: 'ℹ️',
  },
  warning: {
    bg: 'var(--sb-color-warning-light, #fffbeb)',
    border: '#fde68a',
    color: '#92400e',
    icon: '⚠',
  },
  error: {
    bg: 'var(--sb-color-error-light, #fef2f2)',
    border: 'var(--sb-color-error, #ef4444)',
    color: '#991b1b',
    icon: '✕',
  },
  success: {
    bg: 'var(--sb-color-success-light, #f0fdf4)',
    border: 'var(--sb-color-success, #22c55e)',
    color: '#166534',
    icon: '✓',
  },
};

export function Alert({
  children,
  variant = 'info',
  dismissible = false,
  onDismiss,
  icon,
  ...rest
}: AlertProps): React.ReactElement | null {
  const [dismissed, setDismissed] = useState(false);
  const style = variantStyles[variant];

  if (dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  return (
    <div
      {...rest}
      role="alert"
      style={{
        fontSize: 'var(--sb-font-size-xs, 12px)',
        padding: '8px 10px',
        borderRadius: 'var(--sb-radius-sm, 6px)',
        marginBottom: 'var(--sb-space-3, 12px)',
        backgroundColor: style.bg,
        border: `1px solid ${style.border}`,
        color: style.color,
        display: 'flex',
        alignItems: 'flex-start',
        gap: '8px',
      }}
    >
      {/* Icon */}
      <span style={{ flexShrink: 0, lineHeight: 1 }}>
        {icon ?? style.icon}
      </span>

      {/* Content */}
      <div style={{ flex: 1 }}>{children}</div>

      {/* Dismiss button */}
      {dismissible && (
        <button
          onClick={handleDismiss}
          aria-label="Dismiss"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: style.color,
            padding: 0,
            fontSize: '14px',
            lineHeight: 1,
            opacity: 0.6,
            flexShrink: 0,
          }}
        >
          ×
        </button>
      )}
    </div>
  );
}
