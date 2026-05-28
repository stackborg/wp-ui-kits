/**
 * useToast — lightweight toast notification system.
 *
 * Usage:
 *   const { toasts, addToast, removeToast } = useToast();
 *   addToast({ type: 'success', message: 'Settings saved!' });
 */
export interface Toast {
    id: string;
    type: 'success' | 'error' | 'info' | 'warning';
    message: string;
    duration?: number;
}
interface UseToastResult {
    toasts: Toast[];
    addToast: (toast: Omit<Toast, 'id'>) => void;
    removeToast: (id: string) => void;
    clearToasts: () => void;
}
export declare function useToast(): UseToastResult;
export {};
