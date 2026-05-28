import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const variantStyles = {
    success: { bg: 'var(--sb-color-success-light)', color: 'var(--sb-color-success)' },
    error: { bg: 'var(--sb-color-error-light)', color: 'var(--sb-color-error)' },
    danger: { bg: 'var(--sb-color-error-light)', color: 'var(--sb-color-error)' },
    warning: { bg: 'var(--sb-color-warning-light)', color: 'var(--sb-color-warning)' },
    info: { bg: 'var(--sb-color-info-light)', color: 'var(--sb-color-info)' },
    neutral: { bg: 'var(--sb-color-bg-muted)', color: 'var(--sb-color-text-secondary)' },
};
/**
 * StatusBadge — colored label for status display.
 */
export function StatusBadge({ label, variant = 'neutral', pulse = false, className }) {
    const style = variantStyles[variant];
    return (_jsxs("span", { className: className, style: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '0.125rem 0.625rem',
            borderRadius: 'var(--sb-radius-full)',
            fontSize: 'var(--sb-font-size-xs)',
            fontWeight: 'var(--sb-font-weight-medium)',
            background: style.bg,
            color: style.color,
            lineHeight: 1.5,
        }, children: [_jsxs("span", { style: { position: 'relative', display: 'inline-flex', width: '6px', height: '6px' }, children: [pulse && (_jsx("span", { style: {
                            position: 'absolute',
                            inset: '-2px',
                            borderRadius: '50%',
                            background: style.color,
                            opacity: 0.3,
                            animation: 'sb-ping 1.5s cubic-bezier(0,0,0.2,1) infinite',
                        } })), _jsx("span", { style: {
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            background: style.color,
                        } })] }), label] }));
}
