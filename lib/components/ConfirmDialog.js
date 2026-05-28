import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
const variantColors = {
    danger: 'var(--sb-color-error, #dc2626)',
    warning: 'var(--sb-color-warning, #f59e0b)',
    default: 'var(--sb-color-primary, #6366f1)',
};
export function ConfirmDialog({ open, title, message, confirmLabel = 'Confirm', cancelLabel = 'Cancel', variant = 'default', loading = false, confirmPhrase, confirmInput, onConfirmInputChange, onConfirm, onCancel, }) {
    if (!open)
        return null;
    const confirmColor = variantColors[variant];
    const canConfirm = !confirmPhrase || confirmInput === confirmPhrase;
    const isDisabled = !canConfirm || loading;
    return (_jsxs(_Fragment, { children: [_jsx("div", { onClick: onCancel, style: {
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(0, 0, 0, 0.4)',
                    zIndex: 99998,
                    animation: 'sb-fade-in 0.15s ease',
                } }), _jsxs("div", { role: "dialog", "aria-modal": "true", "aria-labelledby": "sb-confirm-title", style: {
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
                }, children: [_jsx("h3", { id: "sb-confirm-title", style: {
                            fontSize: 'var(--sb-font-size-lg)',
                            fontWeight: 'var(--sb-font-weight-semibold)',
                            color: 'var(--sb-color-text)',
                            margin: 0,
                        }, children: title }), _jsx("p", { style: {
                            fontSize: 'var(--sb-font-size-sm)',
                            color: 'var(--sb-color-text-secondary)',
                            marginTop: 'var(--sb-space-2)',
                            lineHeight: 1.6,
                        }, children: message }), confirmPhrase && (_jsxs("div", { style: { marginTop: 'var(--sb-space-4)' }, children: [_jsxs("p", { style: {
                                    fontSize: 'var(--sb-font-size-xs, 12px)',
                                    color: 'var(--sb-color-text-muted)',
                                    marginBottom: 'var(--sb-space-2)',
                                }, children: ["Type ", _jsx("strong", { style: { color: 'var(--sb-color-text)', fontWeight: 600 }, children: confirmPhrase }), " to confirm:"] }), _jsx("input", { type: "text", value: confirmInput || '', onChange: (e) => onConfirmInputChange?.(e.target.value), placeholder: confirmPhrase, autoFocus: true, style: {
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
                                } })] })), _jsxs("div", { style: {
                            display: 'flex',
                            gap: 'var(--sb-space-3)',
                            justifyContent: 'flex-end',
                            marginTop: 'var(--sb-space-6)',
                        }, children: [_jsx("button", { onClick: onCancel, disabled: loading, style: {
                                    padding: '0.5rem 1rem',
                                    borderRadius: 'var(--sb-radius-md)',
                                    border: '1px solid var(--sb-color-border)',
                                    background: 'var(--sb-color-bg)',
                                    color: 'var(--sb-color-text)',
                                    fontSize: 'var(--sb-font-size-sm)',
                                    fontWeight: 500,
                                    cursor: loading ? 'not-allowed' : 'pointer',
                                    transition: `background var(--sb-transition-fast)`,
                                }, children: cancelLabel }), _jsxs("button", { onClick: onConfirm, disabled: isDisabled, style: {
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
                                }, children: [loading && (_jsx("span", { style: {
                                            width: '14px',
                                            height: '14px',
                                            border: '2px solid currentColor',
                                            borderRightColor: 'transparent',
                                            borderRadius: '50%',
                                            display: 'inline-block',
                                            animation: 'sb-spin 0.6s linear infinite',
                                        } })), confirmLabel] })] })] }), _jsx("style", { children: `
        @keyframes sb-fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes sb-scale-in { from { opacity: 0; transform: translate(-50%, -50%) scale(0.95); } to { opacity: 1; transform: translate(-50%, -50%) scale(1); } }
      ` })] }));
}
