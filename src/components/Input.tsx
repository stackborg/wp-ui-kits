/**
 * Input — shared input primitive with sizes and optional icon.
 *
 * Usage:
 *   <Input placeholder="Search..." size="md" onChange={fn} />
 *   <Input icon={<SearchIcon />} value={q} onChange={fn} />
 */

import React from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';

export type InputSize = 'sm' | 'md' | 'lg';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'style'> {
  size?: InputSize;
  icon?: ReactNode;
  fullWidth?: boolean;
}

const sizeStyles: Record<InputSize, React.CSSProperties> = {
  sm: { padding: '4px 10px', fontSize: 'var(--sb-font-size-xs, 12px)' },
  md: { padding: '8px 14px', fontSize: 'var(--sb-font-size-sm, 13px)' },
  lg: { padding: '10px 16px', fontSize: 'var(--sb-font-size-base, 14px)' },
};

export function Input({
  size = 'md',
  icon,
  fullWidth = false,
  className,
  ...rest
}: InputProps): React.ReactElement {
  const inputStyle: React.CSSProperties = {
    ...sizeStyles[size],
    borderRadius: 'var(--sb-radius-md, 8px)',
    border: '1px solid var(--sb-color-border, #d1d5db)',
    backgroundColor: 'var(--sb-color-bg, #fff)',
    color: 'var(--sb-color-text, #111827)',
    outline: 'none',
    transition: `border-color var(--sb-transition-fast, 150ms)`,
    width: fullWidth ? '100%' : undefined,
    fontFamily: 'inherit',
  };

  if (!icon) {
    return <input className={className} style={inputStyle} {...rest} />;
  }

  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        width: fullWidth ? '100%' : undefined,
      }}
    >
      <span
        style={{
          position: 'absolute',
          left: '10px',
          display: 'flex',
          color: 'var(--sb-color-text-muted, #9ca3af)',
          pointerEvents: 'none',
        }}
      >
        {icon}
      </span>
      <input
        className={className}
        style={{ ...inputStyle, paddingLeft: '32px' }}
        {...rest}
      />
    </div>
  );
}
