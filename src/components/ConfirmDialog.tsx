/**
 * ConfirmDialog — modal confirmation dialog for destructive actions.
 *
 * Supports type-to-confirm pattern, loading state, and variant colors.
 * Uses CSS tokens for consistent theming across plugins.
 *
 * Usage:
 *   <ConfirmDialog open={show} title="Delete?" message="Cannot undo"
 *     variant="danger" onConfirm={del} onCancel={close} />
 *
 *   <ConfirmDialog open={show} title="Nuclear Reset"
 *     message="This will erase everything"
 *     confirmPhrase="RESET" confirmInput={input}
 *     onConfirmInputChange={setInput}
 *     loading={isResetting} variant="danger"
 *     onConfirm={reset} onCancel={close} />
 */

import type { ReactNode } from 'react';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'default';
  loading?: boolean;
  /** If set, user must type this exact phrase to enable confirm button */
  confirmPhrase?: string;
  confirmInput?: string;
  onConfirmInputChange?: (value: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

const variantColors = {
  danger: 'var(--sb-color-error, #dc2626)',
  warning: 'var(--sb-color-warning, #f59e0b)',
  default: 'var(--sb-color-primary, #6366f1)',
};

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'default',
  loading = false,
  confirmPhrase,
  confirmInput,
  onConfirmInputChange,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) return null;

  const confirmColor = variantColors[variant];
  const canConfirm = !confirmPhrase || confirmInput === confirmPhrase;
  const isDisabled = !canConfirm || loading;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onCancel}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.4)',
          zIndex: 99998,
          animation: 'sb-fade-in 0.15s ease',
        }}
      />
      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="sb-confirm-title"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'var(--sb-color-bg)',
          borderRadius: 'var(--sb-radius-xl)',
          padding: 'var(--sb-space-6)',
          boxShadow: 'var(--sb-shadow-lg)',
          zIndex: 99999,
          width: '100%',
          maxWidth: '24rem',
          animation: 'sb-scale-in 0.2s ease',
        }}
      >
        <h3
          id="sb-confirm-title"
          style={{
            fontSize: 'var(--sb-font-size-lg)',
            fontWeight: 'var(--sb-font-weight-semibold)' as unknown as number,
            color: 'var(--sb-color-text)',
            margin: 0,
          }}
        >
          {title}
        </h3>
        <p style={{
          fontSize: 'var(--sb-font-size-sm)',
          color: 'var(--sb-color-text-secondary)',
          marginTop: 'var(--sb-space-2)',
          lineHeight: 1.6,
        }}>
          {message}
        </p>

        {/* Type-to-confirm input */}
        {confirmPhrase && (
          <div style={{ marginTop: 'var(--sb-space-4)' }}>
            <p style={{
              fontSize: 'var(--sb-font-size-xs, 12px)',
              color: 'var(--sb-color-text-muted)',
              marginBottom: 'var(--sb-space-2)',
            }}>
              Type <strong style={{ color: 'var(--sb-color-text)', fontWeight: 600 }}>{confirmPhrase}</strong> to confirm:
            </p>
            <input
              type="text"
              value={confirmInput || ''}
              onChange={(e) => onConfirmInputChange?.(e.target.value)}
              placeholder={confirmPhrase}
              autoFocus
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: 'var(--sb-radius-md, 8px)',
                border: '1px solid var(--sb-color-border, #d1d5db)',
                backgroundColor: 'var(--sb-color-bg, #fff)',
                color: 'var(--sb-color-text, #111827)',
                fontSize: 'var(--sb-font-size-sm, 13px)',
                outline: 'none',
                fontFamily: 'inherit',
                boxSizing: 'border-box',
              }}
            />
          </div>
        )}

        {/* Action buttons */}
        <div style={{
          display: 'flex',
          gap: 'var(--sb-space-3)',
          justifyContent: 'flex-end',
          marginTop: 'var(--sb-space-6)',
        }}>
          <button
            onClick={onCancel}
            disabled={loading}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: 'var(--sb-radius-md)',
              border: '1px solid var(--sb-color-border)',
              background: 'var(--sb-color-bg)',
              color: 'var(--sb-color-text)',
              fontSize: 'var(--sb-font-size-sm)',
              fontWeight: 500,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: `background var(--sb-transition-fast)`,
            }}
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            disabled={isDisabled}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: 'var(--sb-radius-md)',
              border: 'none',
              background: confirmColor,
              color: '#fff',
              fontSize: 'var(--sb-font-size-sm)',
              fontWeight: 500,
              cursor: isDisabled ? 'not-allowed' : 'pointer',
              opacity: isDisabled ? 0.6 : 1,
              transition: `opacity var(--sb-transition-fast)`,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            {loading && (
              <span style={{
                width: '14px',
                height: '14px',
                border: '2px solid currentColor',
                borderRightColor: 'transparent',
                borderRadius: '50%',
                display: 'inline-block',
                animation: 'sb-spin 0.6s linear infinite',
              }} />
            )}
            {confirmLabel}
          </button>
        </div>
      </div>
      <style>{`
        @keyframes sb-fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes sb-scale-in { from { opacity: 0; transform: translate(-50%, -50%) scale(0.95); } to { opacity: 1; transform: translate(-50%, -50%) scale(1); } }
      `}</style>
    </>
  );
}
