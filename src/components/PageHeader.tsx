/**
 * PageHeader — page-level heading with optional description and actions.
 *
 * Provides a consistent header layout for dashboard pages with
 * title, subtitle, and action slot (buttons, links).
 *
 * Uses BEM CSS classes (PageHeader.css) instead of inline styles
 * so consumers can override any property via specificity.
 *
 * Usage:
 *   <PageHeader title="Settings" description="Manage plugin config" />
 */
import React from 'react';
import { createPortal } from 'react-dom';
import './PageHeader.css';

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  /** Optional additional CSS class for customization */
  className?: string;
}

/**
 * Page Header — consistent page title + action buttons.
 */
export function PageHeader({ title, description, icon, actions, className }: PageHeaderProps) {
  const portalTarget = typeof document !== 'undefined' ? document.getElementById('page-header-slot') : null;
  const isPortaled = !!portalTarget;

  const content = (
    <div className={`sb-page-header ${isPortaled ? 'sb-page-header--portaled' : 'sb-page-header--sticky'} ${className || ''}`}>
      <div className="sb-page-header__left">
        {icon && (
          <div className="sb-page-header__icon">
            {icon}
          </div>
        )}
        <div>
          <h1 className="sb-page-header__title">
            {title}
          </h1>
          {description && (
            <p className="sb-page-header__description">
              {description}
            </p>
          )}
        </div>
      </div>
      {actions && <div className="sb-page-header__actions">{actions}</div>}
    </div>
  );

  return isPortaled ? createPortal(content, portalTarget) : content;
}
