/**
 * Toggle — switch toggle with label and description.
 *
 * Premium-styled toggle for boolean settings. Uses CSS tokens
 * so each plugin can override the active color.
 *
 * Usage:
 *   <Toggle label="Enable feature" checked={on} onChange={setOn} />
 *   <Toggle label="Dark mode" description="Use dark theme" checked={dark} onChange={setDark} />
 */
import React from 'react';
interface ToggleProps {
    label?: string;
    description?: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    id?: string;
    className?: string;
}
export declare function Toggle({ label, description, checked, onChange, disabled, id, className, }: ToggleProps): React.ReactElement;
export {};
