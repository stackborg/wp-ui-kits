/**
 * Input — shared input primitive with label, hint, error, and trailing element.
 *
 * All Stackborg plugins use this component for consistent input structure.
 * Styling is controlled via CSS classes so each plugin's CSS can theme it.
 *
 * The component outputs: sb-input [sb-input--{size}] [sb-input--error]
 * Plugins override these via their own CSS.
 *
 * Usage:
 *   <Input label="Email" value={v} onChange={fn} required />
 *   <Input label="API Key" hint="Found in settings" error={err} value={v} onChange={fn} />
 */
import React from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
export type InputSize = 'sm' | 'md' | 'lg';
interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    size?: InputSize;
    icon?: ReactNode;
    trailing?: ReactNode;
    fullWidth?: boolean;
    label?: string;
    hint?: ReactNode;
    error?: string;
}
export declare function Input({ size, icon, trailing, fullWidth, label, hint, error, className, id, required, ...rest }: InputProps): React.ReactElement;
export {};
