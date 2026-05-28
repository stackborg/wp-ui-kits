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
export declare function ConfirmDialog({ open, title, message, confirmLabel, cancelLabel, variant, loading, confirmPhrase, confirmInput, onConfirmInputChange, onConfirm, onCancel, }: ConfirmDialogProps): import("react/jsx-runtime").JSX.Element | null;
export {};
