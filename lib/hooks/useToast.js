/**
 * useToast — lightweight toast notification system.
 *
 * Usage:
 *   const { toasts, addToast, removeToast } = useToast();
 *   addToast({ type: 'success', message: 'Settings saved!' });
 */
import { useState, useCallback } from 'react';
let toastId = 0;
export function useToast() {
    const [toasts, setToasts] = useState([]);
    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);
    const addToast = useCallback((toast) => {
        const id = `toast-${++toastId}`;
        const duration = toast.duration ?? 4000;
        setToasts((prev) => [...prev, { ...toast, id }]);
        // Auto-dismiss
        if (duration > 0) {
            setTimeout(() => removeToast(id), duration);
        }
    }, [removeToast]);
    const clearToasts = useCallback(() => setToasts([]), []);
    return { toasts, addToast, removeToast, clearToasts };
}
