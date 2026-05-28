/**
 * Button — shared button primitive with variants, sizes, and loading state.
 *
 * All Stackborg plugins use this component for consistent button structure.
 * Styling is controlled via CSS classes so each plugin's CSS can theme it.
 *
 * The component outputs: sb-btn sb-btn--{variant} sb-btn--{size}
 * Plugins override these via their own CSS (e.g. .sbrsp-btn--primary).
 *
 * Usage:
 *   <Button variant="primary" size="sm" onClick={fn}>Save</Button>
 *   <Button variant="danger" loading>Deleting...</Button>
 *   <Button variant="outline" onClick={fn}>Cancel</Button>
 *   <Button variant="link" onClick={fn}>Clear all</Button>
 *   <Button variant="ghost" icon onClick={fn}><TrashIcon /></Button>
 */
import React from 'react';
import type { ReactNode, ButtonHTMLAttributes } from 'react';
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'warning' | 'ghost' | 'outline' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
    fullWidth?: boolean;
    /** Icon-only mode — compact square button */
    icon?: boolean;
    className?: string;
    children: ReactNode;
}
export declare function Button({ variant, size, loading, fullWidth, icon: iconMode, disabled, className, children, ...rest }: ButtonProps): React.ReactElement;
export {};
