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
export declare function PageHeader({ title, description, icon, actions, className }: PageHeaderProps): import("react/jsx-runtime").JSX.Element;
export {};
