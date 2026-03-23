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
import type { ReactNode } from 'react';

interface CardProps {
  title?: string;
  value?: string | number;
  description?: string;
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
}

/**
 * Card — versatile card component for stats, info, and content.
 */
export function Card({ title, value, description, icon, children, className = '' }: CardProps) {
  return (
    <div
      className={className}
      style={{
        background: 'var(--sb-color-bg)',
        border: '1px solid var(--sb-color-border)',
        borderRadius: 'var(--sb-radius-lg)',
        padding: 'var(--sb-space-6)',
        boxShadow: 'var(--sb-shadow-sm)',
        transition: `box-shadow var(--sb-transition-normal)`,
      }}
    >
      {(title || icon) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sb-space-3)', marginBottom: value ? 'var(--sb-space-3)' : 0 }}>
          {icon && (
            <div style={{
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
          {title && (
            <span style={{
              fontSize: 'var(--sb-font-size-sm)',
              color: 'var(--sb-color-text-secondary)',
              fontWeight: 'var(--sb-font-weight-medium)' as unknown as number,
            }}>
              {title}
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
