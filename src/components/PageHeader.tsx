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
    <div className="sbrsp-page-header" style={{
      position: 'sticky',
      top: '-2rem',
      background: 'var(--sb-color-bg)',
      zIndex: 10,
      padding: '2rem 3rem 1.25rem 3rem',
      margin: '0 -3rem var(--sb-space-6) -3rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid rgba(229, 231, 235, 0.5)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        {icon && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '3.25rem',
            height: '3.25rem',
            borderRadius: 'var(--sb-radius-xl)',
            background: 'linear-gradient(135deg, var(--sb-color-primary) 0%, var(--sb-color-primary-hover) 100%)',
            boxShadow: '0 4px 14px rgba(13, 148, 136, 0.25), inset 0 1px 0 rgba(255,255,255,0.2)',
            color: '#fff',
            flexShrink: 0,
          }}>
            {icon}
          </div>
        )}
        <div>
          <h1 style={{
            fontSize: 'var(--sb-font-size-xl)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: '#0f172a',
            margin: 0,
            lineHeight: 1.2,
          }}>
            {title}
          </h1>
          {description && (
            <p style={{
              fontSize: 'var(--sb-font-size-sm)',
              color: '#64748b',
              marginTop: '0.25rem',
              fontWeight: 500,
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
