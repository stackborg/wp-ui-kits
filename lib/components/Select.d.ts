/**
 * Select — premium dropdown select with label, hint, and error.
 *
 * CSS-class driven like Input — plugins theme via their own CSS.
 * Component outputs: sb-select [sb-select--{size}] [sb-select--error] [sb-select--full]
 *
 * Usage:
 *   <Select label="Provider" options={[{value:'s3', label:'Amazon S3'}]} value={v} onChange={setV} />
 *   <Select options={opts} value={v} onChange={setV} hint="Choose wisely" />
 */
import React from 'react';
import type { ReactNode } from 'react';
export type SelectSize = 'sm' | 'md' | 'lg';
interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}
interface SelectProps {
    options: SelectOption[];
    value?: string;
    onChange: (value: string) => void;
    label?: string;
    hint?: ReactNode;
    error?: string;
    placeholder?: string;
    size?: SelectSize;
    fullWidth?: boolean;
    disabled?: boolean;
    required?: boolean;
    icon?: ReactNode;
    id?: string;
    className?: string;
}
export declare function Select({ options, value, onChange, label, hint, error, placeholder, size, fullWidth, disabled, required, icon, id, className, }: SelectProps): React.ReactElement;
export {};
