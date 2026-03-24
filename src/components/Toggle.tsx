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

export function Toggle({
  label,
  description,
  checked,
  onChange,
  disabled = false,
  id,
  className,
}: ToggleProps): React.ReactElement {
  const toggleId = id || `sb-toggle-${label?.replace(/\s+/g, '-').toLowerCase() || 'default'}`;

  return (
    <div className={className} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--sb-space-3, 12px)' }}>
      <button
        id={toggleId}
        role="switch"
        type="button"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        style={{
          position: 'relative',
          flexShrink: 0,
          width: '2.25rem',
          height: '1.25rem',
          borderRadius: '9999px',
          border: 'none',
          cursor: disabled ? 'not-allowed' : 'pointer',
          background: checked
            ? 'var(--sb-color-primary, #6366f1)'
            : 'var(--sb-color-bg-muted, #d1d5db)',
          opacity: disabled ? 0.5 : 1,
          transition: 'background var(--sb-transition-fast, 150ms)',
          padding: 0,
        }}
      >
        {/* Knob */}
        <span
          style={{
            position: 'absolute',
            top: '2px',
            left: checked ? '16px' : '2px',
            width: '1rem',
            height: '1rem',
            borderRadius: '50%',
            background: '#fff',
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
            transition: 'left var(--sb-transition-fast, 150ms)',
          }}
        />
      </button>

      {(label || description) && (
        <label
          htmlFor={toggleId}
          style={{
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.5 : 1,
          }}
        >
          {label && (
            <div style={{
              fontSize: 'var(--sb-font-size-sm, 13px)',
              fontWeight: 'var(--sb-font-weight-medium, 500)' as unknown as number,
              color: 'var(--sb-color-text, #111827)',
              lineHeight: 1.3,
            }}>
              {label}
            </div>
          )}
          {description && (
            <div style={{
              fontSize: 'var(--sb-font-size-xs, 12px)',
              color: 'var(--sb-color-text-muted, #6b7280)',
              marginTop: '2px',
              lineHeight: 1.4,
            }}>
              {description}
            </div>
          )}
        </label>
      )}
    </div>
  );
}
