/**
 * Card — versatile card component for stats, info, and content display.
 *
 * Supports title, value, description, icon, and custom children.
 * Uses CSS tokens for consistent theming across plugins.
 *
 * Usage:
 *   <Card title="Users" value={1234} description="+12% this week" />
 *   <Card><CustomContent /></Card>
 */
import type { ReactNode, CSSProperties } from 'react';

interface CardProps {
  /** Card heading — 'label' is an alias for 'title' */
  title?: string;
  label?: string;
  value?: string | number;
  description?: string;
  icon?: ReactNode;
  /** CSS class for the icon container (e.g. theme token class) */
  iconClass?: string;
  children?: ReactNode;
  className?: string;
  noPadding?: boolean;
  style?: CSSProperties;
  /** Stagger animation delay in ms */
  delay?: number;
}

/**
 * Card — versatile card component for stats, info, and content.
 */
export function Card({ title, label, value, description, icon, iconClass, children, className = '', noPadding = false, style: customStyle, delay }: CardProps) {
  // 'label' is an alias for 'title'
  const heading = title || label;
  return (
    <div
      className={className}
      style={{
        background: 'var(--sb-color-bg)',
        border: '1px solid var(--sb-color-border)',
        borderRadius: 'var(--sb-radius-lg)',
        padding: noPadding ? 0 : 'var(--sb-space-6)',
        boxShadow: 'var(--sb-shadow-sm)',
        transition: `box-shadow var(--sb-transition-normal)`,
        animationDelay: delay ? `${delay}ms` : undefined,
        ...customStyle,
      }}
    >
      {(heading || icon) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sb-space-3)', marginBottom: value ? 'var(--sb-space-3)' : 0 }}>
          {icon && (
            <div className={iconClass} style={{
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: 'var(--sb-radius-md)',
              background: 'var(--sb-color-primary-light)',
              color: 'var(--sb-color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {icon}
            </div>
          )}
          {heading && (
            <span style={{
              fontSize: 'var(--sb-font-size-sm)',
              color: 'var(--sb-color-text-secondary)',
              fontWeight: 'var(--sb-font-weight-medium)' as unknown as number,
            }}>
              {heading}
            </span>
          )}
        </div>
      )}
      {value !== undefined && (
        <div style={{
          fontSize: 'var(--sb-font-size-2xl)',
          fontWeight: 'var(--sb-font-weight-bold)' as unknown as number,
          color: 'var(--sb-color-text)',
        }}>
          {value}
        </div>
      )}
      {description && (
        <p style={{
          fontSize: 'var(--sb-font-size-xs)',
          color: 'var(--sb-color-text-muted)',
          marginTop: 'var(--sb-space-1)',
        }}>
          {description}
        </p>
      )}
      {children}
    </div>
  );
}
