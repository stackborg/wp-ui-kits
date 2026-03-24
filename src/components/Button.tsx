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

/**
 * Build CSS class string for the button.
 * Output: "sb-btn sb-btn--{variant} sb-btn--{size} [sb-btn--icon] [sb-btn--full] [className]"
 *
 * Plugin CSS maps these generic classes to its own design tokens, e.g.:
 *   .sbrsp-btn.sb-btn--primary { background: var(--sbrsp-teal-600); }
 */
function buildClassName(
  variant: ButtonVariant,
  size: ButtonSize,
  iconMode: boolean,
  fullWidth: boolean,
  className?: string,
): string {
  const parts = ['sb-btn', `sb-btn--${variant}`, `sb-btn--${size}`];
  if (iconMode) parts.push('sb-btn--icon');
  if (fullWidth) parts.push('sb-btn--full');
  if (className) parts.push(className);
  return parts.join(' ');
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  icon: iconMode = false,
  disabled,
  className,
  children,
  ...rest
}: ButtonProps): React.ReactElement {
  const isDisabled = disabled || loading;

  return (
    <button
      {...rest}
      disabled={isDisabled}
      className={buildClassName(variant, size, iconMode, fullWidth, className)}
      style={{ whiteSpace: 'nowrap', flexShrink: 0, ...rest.style }}
    >
      {loading && (
        <span className="sb-btn__spinner" />
      )}
      {children}
    </button>
  );
}
