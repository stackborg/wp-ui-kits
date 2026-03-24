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

export function Input({
  size = 'md',
  icon,
  trailing,
  fullWidth = false,
  label,
  hint,
  error,
  className,
  id,
  required,
  ...rest
}: InputProps): React.ReactElement {
  const inputId = id || `sb-input-${label?.replace(/\s+/g, '-').toLowerCase() || 'default'}`;
  const hasError = !!error;

  // Build class string for input element
  const inputClasses = [
    'sb-input',
    `sb-input--${size}`,
    hasError && 'sb-input--error',
    icon && 'sb-input--has-icon',
    trailing && 'sb-input--has-trailing',
    fullWidth && 'sb-input--full',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={`sb-input-wrap${fullWidth ? ' sb-input-wrap--full' : ''}`}>
      {/* Label */}
      {label && (
        <label htmlFor={inputId} className="sb-input__label">
          {label}
          {required && <span className="sb-input__required">*</span>}
        </label>
      )}

      {/* Input wrapper */}
      <div className="sb-input__field-wrap">
        {/* Leading icon */}
        {icon && <span className="sb-input__icon">{icon}</span>}

        <input
          id={inputId}
          className={inputClasses}
          required={required}
          {...rest}
        />

        {/* Trailing element */}
        {trailing && <span className="sb-input__trailing">{trailing}</span>}
      </div>

      {/* Hint or Error */}
      {(hint || error) && (
        <div className={`sb-input__hint${hasError ? ' sb-input__hint--error' : ''}`}>
          {error || hint}
        </div>
      )}
    </div>
  );
}
