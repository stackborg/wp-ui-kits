/**
 * ToastContainer — stacked notification toasts with auto-dismiss.
 *
 * Renders toast messages from useToast() hook. Supports
 * success/error/warning/info variants with icons and dismiss.
 *
 * Usage:
 *   <ToastContainer toasts={toasts} onDismiss={dismiss} />
 */
import type { Toast as ToastType } from '@/hooks/useToast';
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

interface ToastContainerProps {
  toasts: ToastType[];
  onDismiss: (id: string) => void;
}

const iconMap = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle,
};

const colorMap = {
  success: 'var(--sb-color-success)',
  error: 'var(--sb-color-error)',
  info: 'var(--sb-color-info)',
  warning: 'var(--sb-color-warning)',
};

const bgMap = {
  success: 'var(--sb-color-success-light)',
  error: 'var(--sb-color-error-light)',
  info: 'var(--sb-color-info-light)',
  warning: 'var(--sb-color-warning-light)',
};

/**
 * Toast Container — renders all active toast notifications.
 */
export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 'var(--sb-space-6)',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 99999,
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--sb-space-2)',
      maxWidth: '24rem',
      alignItems: 'center',
    }}>
      {toasts.map((toast) => {
        const Icon = iconMap[toast.type];
        return (
          <div
            key={toast.id}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 'var(--sb-space-3)',
              padding: 'var(--sb-space-4)',
              borderRadius: 'var(--sb-radius-lg)',
              background: bgMap[toast.type],
              border: `1px solid ${colorMap[toast.type]}`,
              boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
              animation: 'sb-slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              width: '100%',
              minWidth: '20rem',
            }}
          >
            <Icon size={18} color={colorMap[toast.type]} style={{ flexShrink: 0, marginTop: 1 }} />
            <span style={{
              flex: 1,
              fontSize: 'var(--sb-font-size-sm)',
              color: 'var(--sb-color-text)',
              lineHeight: 1.5,
              fontWeight: 500,
            }}>
              {toast.message}
            </span>
            <button
              onClick={() => onDismiss(toast.id)}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                color: 'var(--sb-color-text-muted)',
                flexShrink: 0,
                cursor: 'pointer',
              }}
              aria-label="Dismiss"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
      <style>{`@keyframes sb-slide-up { from { opacity: 0; transform: translateY(1.5rem); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
}
