/**
 * EmptyState — placeholder display for empty data states.
 *
 * Shows a centered message with optional icon and action button
 * when there is no data to display.
 *
 * Usage:
 *   <EmptyState title="No items" description="Create your first item" />
 */
import type { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

/**
 * EmptyState — shown when there's no data to display.
 */
export function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--sb-space-12)',
      textAlign: 'center',
    }}>
      {icon && (
        <div style={{
          width: '3rem',
          height: '3rem',
          borderRadius: 'var(--sb-radius-full)',
          background: 'var(--sb-color-bg-muted)',
          color: 'var(--sb-color-text-muted)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 'var(--sb-space-4)',
        }}>
          {icon}
        </div>
      )}
      <h3 style={{
        fontSize: 'var(--sb-font-size-lg)',
        fontWeight: 'var(--sb-font-weight-semibold)' as unknown as number,
        color: 'var(--sb-color-text)',
        margin: 0,
      }}>
        {title}
      </h3>
      {description && (
        <p style={{
          fontSize: 'var(--sb-font-size-sm)',
          color: 'var(--sb-color-text-secondary)',
          marginTop: 'var(--sb-space-2)',
          maxWidth: '24rem',
        }}>
          {description}
        </p>
      )}
      {action && <div style={{ marginTop: 'var(--sb-space-4)' }}>{action}</div>}
    </div>
  );
}
