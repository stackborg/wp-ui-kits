/**
 * StatusBadge — semantic colored label for status indicators.
 *
 * Provides 5 variants (success/error/warning/info/neutral) with
 * CSS token-based colors. For custom colors, use Badge instead.
 *
 * Usage:
 *   <StatusBadge label="Active" variant="success" />
 */

type BadgeVariant = 'success' | 'error' | 'danger' | 'warning' | 'info' | 'neutral';

interface StatusBadgeProps {
  label: string;
  variant?: BadgeVariant;
  pulse?: boolean;
  className?: string;
}

const variantStyles: Record<BadgeVariant, { bg: string; color: string }> = {
  success: { bg: 'var(--sb-color-success-light)', color: 'var(--sb-color-success)' },
  error: { bg: 'var(--sb-color-error-light)', color: 'var(--sb-color-error)' },
  danger: { bg: 'var(--sb-color-error-light)', color: 'var(--sb-color-error)' },
  warning: { bg: 'var(--sb-color-warning-light)', color: 'var(--sb-color-warning)' },
  info: { bg: 'var(--sb-color-info-light)', color: 'var(--sb-color-info)' },
  neutral: { bg: 'var(--sb-color-bg-muted)', color: 'var(--sb-color-text-secondary)' },
};

/**
 * StatusBadge — colored label for status display.
 */
export function StatusBadge({ label, variant = 'neutral', pulse = false, className }: StatusBadgeProps) {
  const style = variantStyles[variant];

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '0.125rem 0.625rem',
        borderRadius: 'var(--sb-radius-full)',
        fontSize: 'var(--sb-font-size-xs)',
        fontWeight: 'var(--sb-font-weight-medium)' as unknown as number,
        background: style.bg,
        color: style.color,
        lineHeight: 1.5,
      }}
    >
      {/* Status dot with optional pulse */}
      <span style={{ position: 'relative', display: 'inline-flex', width: '6px', height: '6px' }}>
        {pulse && (
          <span style={{
            position: 'absolute',
            inset: '-2px',
            borderRadius: '50%',
            background: style.color,
            opacity: 0.3,
            animation: 'sb-ping 1.5s cubic-bezier(0,0,0.2,1) infinite',
          }} />
        )}
        <span style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: style.color,
        }} />
      </span>
      {label}
    </span>
  );
}
