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

export function Select({
  options,
  value,
  onChange,
  label,
  hint,
  error,
  placeholder,
  size = 'md',
  fullWidth = false,
  disabled = false,
  required = false,
  icon,
  id,
  className,
}: SelectProps): React.ReactElement {
  const selectId = id || `sb-select-${label?.replace(/\s+/g, '-').toLowerCase() || 'default'}`;
  const hasError = !!error;

  // Build class string for select element — mirrors Input pattern
  const selectClasses = [
    'sb-select',
    `sb-select--${size}`,
    hasError && 'sb-select--error',
    icon && 'sb-select--has-icon',
    fullWidth && 'sb-select--full',
    disabled && 'sb-select--disabled',
  ].filter(Boolean).join(' ');

  const wrapClasses = [
    'sb-select-wrap',
    fullWidth && 'sb-select-wrap--full',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapClasses}>
      {/* Label */}
      {label && (
        <label htmlFor={selectId} className="sb-select__label">
          {label}
          {required && <span className="sb-select__required">*</span>}
        </label>
      )}

      {/* Select wrapper */}
      <div className="sb-select__field-wrap">
        {/* Leading icon */}
        {icon && <span className="sb-select__icon">{icon}</span>}

        <select
          id={selectId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={selectClasses}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Hint or Error */}
      {(hint || error) && (
        <div className={`sb-select__hint${hasError ? ' sb-select__hint--error' : ''}`}>
          {error || hint}
        </div>
      )}
    </div>
  );
}
