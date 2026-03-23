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
      top: 'var(--sb-space-6)',
      right: 'var(--sb-space-6)',
      zIndex: 99999,
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--sb-space-2)',
      maxWidth: '24rem',
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
              boxShadow: 'var(--sb-shadow-lg)',
              animation: 'sb-slide-in 0.3s ease-out',
            }}
          >
            <Icon size={18} color={colorMap[toast.type]} style={{ flexShrink: 0, marginTop: 1 }} />
            <span style={{
              flex: 1,
              fontSize: 'var(--sb-font-size-sm)',
              color: 'var(--sb-color-text)',
              lineHeight: 1.5,
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
              }}
              aria-label="Dismiss"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
      <style>{`@keyframes sb-slide-in { from { opacity: 0; transform: translateX(1rem); } to { opacity: 1; transform: translateX(0); } }`}</style>
    </div>
  );
}
