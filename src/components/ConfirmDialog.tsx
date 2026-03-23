/**
 * ConfirmDialog — modal confirmation dialog for destructive actions.
 *
 * Displays a centered overlay with configurable title, message,
 * confirm/cancel buttons. Uses CSS tokens for theming.
 *
 * Usage:
 *   <ConfirmDialog title="Delete?" message="This cannot be undone"
 *     onConfirm={handleDelete} onCancel={close} />
 */

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'default';
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * ConfirmDialog — modal for destructive action confirmation.
 *
 * Usage:
 *   <ConfirmDialog
 *     open={showDialog}
 *     title="Delete Item?"
 *     message="This action cannot be undone."
 *     variant="danger"
 *     onConfirm={handleDelete}
 *     onCancel={() => setShowDialog(false)}
 *   />
 */
export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'default',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) return null;

  const confirmColor = variant === 'danger' ? 'var(--sb-color-error)' : 'var(--sb-color-primary)';

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
        <div style={{
          display: 'flex',
          gap: 'var(--sb-space-3)',
          justifyContent: 'flex-end',
          marginTop: 'var(--sb-space-6)',
        }}>
          <button
            onClick={onCancel}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: 'var(--sb-radius-md)',
              border: '1px solid var(--sb-color-border)',
              background: 'var(--sb-color-bg)',
              color: 'var(--sb-color-text)',
              fontSize: 'var(--sb-font-size-sm)',
              fontWeight: 500,
              transition: `background var(--sb-transition-fast)`,
            }}
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: 'var(--sb-radius-md)',
              border: 'none',
              background: confirmColor,
              color: '#fff',
              fontSize: 'var(--sb-font-size-sm)',
              fontWeight: 500,
              transition: `opacity var(--sb-transition-fast)`,
            }}
          >
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
