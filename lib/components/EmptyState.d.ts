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
export declare function EmptyState({ title, description, icon, action }: EmptyStateProps): import("react/jsx-runtime").JSX.Element;
export {};
