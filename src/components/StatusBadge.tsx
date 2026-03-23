/**
 * StatusBadge — semantic colored label for status indicators.
 *
 * Provides 5 variants (success/error/warning/info/neutral) with
 * CSS token-based colors. For custom colors, use Badge instead.
 *
 * Usage:
 *   <StatusBadge label="Active" variant="success" />
 */

type BadgeVariant = 'success' | 'error' | 'warning' | 'info' | 'neutral';

interface StatusBadgeProps {
  label: string;
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, { bg: string; color: string }> = {
  success: { bg: 'var(--sb-color-success-light)', color: 'var(--sb-color-success)' },
  error: { bg: 'var(--sb-color-error-light)', color: 'var(--sb-color-error)' },
  warning: { bg: 'var(--sb-color-warning-light)', color: 'var(--sb-color-warning)' },
  info: { bg: 'var(--sb-color-info-light)', color: 'var(--sb-color-info)' },
  neutral: { bg: 'var(--sb-color-bg-muted)', color: 'var(--sb-color-text-secondary)' },
};

/**
 * StatusBadge — colored label for status display.
 */
export function StatusBadge({ label, variant = 'neutral' }: StatusBadgeProps) {
  const style = variantStyles[variant];

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '0.125rem 0.625rem',
      borderRadius: 'var(--sb-radius-full)',
      fontSize: 'var(--sb-font-size-xs)',
      fontWeight: 'var(--sb-font-weight-medium)' as unknown as number,
      background: style.bg,
      color: style.color,
      lineHeight: 1.5,
    }}>
      {label}
    </span>
  );
}
