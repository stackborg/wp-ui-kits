import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function Toggle({ label, description, checked, onChange, disabled = false, id, className, }) {
    const toggleId = id || `sb-toggle-${label?.replace(/\s+/g, '-').toLowerCase() || 'default'}`;
    return (_jsxs("div", { className: className, style: { display: 'flex', alignItems: 'flex-start', gap: 'var(--sb-space-3, 12px)' }, children: [_jsx("button", { id: toggleId, role: "switch", type: "button", "aria-checked": checked, disabled: disabled, onClick: () => !disabled && onChange(!checked), style: {
                    position: 'relative',
                    flexShrink: 0,
                    width: '2.25rem',
                    height: '1.25rem',
                    borderRadius: '9999px',
                    border: 'none',
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    background: checked
                        ? 'var(--sb-color-primary, #6366f1)'
                        : 'var(--sb-color-bg-muted, #d1d5db)',
                    opacity: disabled ? 0.5 : 1,
                    transition: 'background var(--sb-transition-fast, 150ms)',
                    padding: 0,
                }, children: _jsx("span", { style: {
                        position: 'absolute',
                        top: '2px',
                        left: checked ? '16px' : '2px',
                        width: '1rem',
                        height: '1rem',
                        borderRadius: '50%',
                        background: '#fff',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                        transition: 'left var(--sb-transition-fast, 150ms)',
                    } }) }), (label || description) && (_jsxs("label", { htmlFor: toggleId, style: {
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    opacity: disabled ? 0.5 : 1,
                }, children: [label && (_jsx("div", { style: {
                            fontSize: 'var(--sb-font-size-sm, 13px)',
                            fontWeight: 'var(--sb-font-weight-medium, 500)',
                            color: 'var(--sb-color-text, #111827)',
                            lineHeight: 1.3,
                        }, children: label })), description && (_jsx("div", { style: {
                            fontSize: 'var(--sb-font-size-xs, 12px)',
                            color: 'var(--sb-color-text-muted, #6b7280)',
                            marginTop: '2px',
                            lineHeight: 1.4,
                        }, children: description }))] }))] }));
}
