/**
 * Badge — inline label with variant colors or custom color.
 *
 * Usage:
 *   <Badge variant="success">Active</Badge>
 *   <Badge color="#8b5cf6">Pro</Badge>
 */
import React from 'react';
import type { ReactNode } from 'react';
export type BadgeVariant = 'success' | 'error' | 'danger' | 'warning' | 'info' | 'neutral';
interface BadgeProps {
    children: ReactNode;
    variant?: BadgeVariant;
    /** Custom color override — sets text + generates light background */
    color?: string;
    'data-testid'?: string;
}
export declare function Badge({ children, variant, color, ...rest }: BadgeProps): React.ReactElement;
export {};
