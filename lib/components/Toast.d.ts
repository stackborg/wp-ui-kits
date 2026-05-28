/**
 * ToastContainer — stacked notification toasts with auto-dismiss.
 *
 * Renders toast messages from useToast() hook. Supports
 * success/error/warning/info variants with icons and dismiss.
 *
 * Usage:
 *   <ToastContainer toasts={toasts} onDismiss={dismiss} />
 */
import type { Toast as ToastType } from '../hooks/useToast';
interface ToastContainerProps {
    toasts: ToastType[];
    onDismiss: (id: string) => void;
}
/**
 * Toast Container — renders all active toast notifications.
 */
export declare function ToastContainer({ toasts, onDismiss }: ToastContainerProps): import("react/jsx-runtime").JSX.Element | null;
export {};
