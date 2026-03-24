/**
 * PageHeader — page-level heading with optional description and actions.
 *
 * Provides a consistent header layout for dashboard pages with
 * title, subtitle, and action slot (buttons, links).
 *
 * Usage:
 *   <PageHeader title="Settings" description="Manage plugin config" />
 */
import React from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
}

/**
 * Page Header — consistent page title + action buttons.
 */
export function PageHeader({ title, description, icon, actions }: PageHeaderProps) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 'var(--sb-space-6)',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--sb-space-3)' }}>
        {icon && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: 'var(--sb-radius-lg)',
            background: 'var(--sb-color-primary-light)',
            color: 'var(--sb-color-primary)',
            flexShrink: 0,
          }}>
            {icon}
          </div>
        )}
        <div>
          <h1 style={{
            fontSize: 'var(--sb-font-size-2xl)',
            fontWeight: 'var(--sb-font-weight-bold)' as unknown as number,
            color: 'var(--sb-color-text)',
            margin: 0,
          }}>
            {title}
          </h1>
          {description && (
            <p style={{
              fontSize: 'var(--sb-font-size-sm)',
              color: 'var(--sb-color-text-secondary)',
              marginTop: 'var(--sb-space-1)',
            }}>
              {description}
            </p>
          )}
        </div>
      </div>
      {actions && <div style={{ display: 'flex', gap: 'var(--sb-space-2)' }}>{actions}</div>}
    </div>
  );
}
