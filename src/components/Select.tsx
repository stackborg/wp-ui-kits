/**
 * Select — premium dropdown select with label, hint, and error.
 *
 * Styled select element that matches the Input component design.
 * Uses CSS tokens for consistent theming across plugins.
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

const sizeStyles: Record<SelectSize, React.CSSProperties> = {
  sm: { padding: '4px 28px 4px 10px', fontSize: 'var(--sb-font-size-xs, 12px)' },
  md: { padding: '8px 32px 8px 14px', fontSize: 'var(--sb-font-size-sm, 13px)' },
  lg: { padding: '10px 36px 10px 16px', fontSize: 'var(--sb-font-size-base, 14px)' },
};

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

  return (
    <div className={className} style={{ width: fullWidth ? '100%' : undefined }}>
      {/* Label */}
      {label && (
        <label
          htmlFor={selectId}
          style={{
            display: 'block',
            fontSize: 'var(--sb-font-size-sm, 13px)',
            fontWeight: 'var(--sb-font-weight-medium, 500)' as unknown as number,
            color: 'var(--sb-color-text, #111827)',
            marginBottom: 'var(--sb-space-1, 4px)',
          }}
        >
          {label}
          {required && <span style={{ color: 'var(--sb-color-error, #dc2626)', marginLeft: '2px' }}>*</span>}
        </label>
      )}

      {/* Select wrapper */}
      <div style={{ position: 'relative', display: 'inline-flex', width: fullWidth ? '100%' : undefined }}>
        {/* Leading icon */}
        {icon && (
          <span style={{
            position: 'absolute',
            left: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            color: 'var(--sb-color-text-muted, #9ca3af)',
            pointerEvents: 'none',
            zIndex: 1,
          }}>
            {icon}
          </span>
        )}

        <select
          id={selectId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          style={{
            ...sizeStyles[size],
            ...(icon ? { paddingLeft: '32px' } : {}),
            width: fullWidth ? '100%' : undefined,
            borderRadius: 'var(--sb-radius-md, 8px)',
            border: `1px solid ${hasError ? 'var(--sb-color-error, #dc2626)' : 'var(--sb-color-border, #d1d5db)'}`,
            backgroundColor: disabled ? 'var(--sb-color-bg-muted, #f3f4f6)' : 'var(--sb-color-bg, #fff)',
            color: value ? 'var(--sb-color-text, #111827)' : 'var(--sb-color-text-muted, #9ca3af)',
            outline: 'none',
            transition: 'border-color var(--sb-transition-fast, 150ms)',
            fontFamily: 'inherit',
            cursor: disabled ? 'not-allowed' : 'pointer',
            appearance: 'none',
            // Custom dropdown arrow via background image
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 10px center',
          }}
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
        <div style={{
          fontSize: 'var(--sb-font-size-xs, 12px)',
          color: hasError ? 'var(--sb-color-error, #dc2626)' : 'var(--sb-color-text-muted, #6b7280)',
          marginTop: 'var(--sb-space-1, 4px)',
        }}>
          {error || hint}
        </div>
      )}
    </div>
  );
}
