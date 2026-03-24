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
      className={`sbrsp-card ${className}`.trim()}
      style={{
        padding: noPadding ? 0 : undefined,
        animationDelay: delay ? `${delay}ms` : undefined,
        ...customStyle,
      }}
    >
      {(heading || icon) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: value ? '1rem' : 0 }}>
          {icon && (
            <div className={iconClass} style={{
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: '0.625rem',
              background: 'var(--sb-color-primary-light)',
              color: 'var(--sb-color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.5)',
            }}>
              {icon}
            </div>
          )}
          {heading && (
            <span style={{
              fontSize: '0.875rem',
              color: '#334155',
              fontWeight: 600,
              letterSpacing: '-0.01em',
            }}>
              {heading}
            </span>
          )}
        </div>
      )}
      {value !== undefined && (
        <div style={{
          fontSize: '2rem',
          fontWeight: 800,
          color: '#0f172a',
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          marginTop: heading || icon ? '0.25rem' : '0.5rem',
          marginBottom: description ? '0.25rem' : '0',
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
