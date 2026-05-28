import { jsx as _jsx } from "react/jsx-runtime";
const variantStyles = {
    success: { bg: 'var(--sb-color-success-light, #f0fdf4)', color: 'var(--sb-color-success, #22c55e)' },
    error: { bg: 'var(--sb-color-error-light, #fef2f2)', color: 'var(--sb-color-error, #ef4444)' },
    danger: { bg: 'var(--sb-color-error-light, #fef2f2)', color: 'var(--sb-color-error, #ef4444)' },
    warning: { bg: 'var(--sb-color-warning-light, #fffbeb)', color: 'var(--sb-color-warning, #f59e0b)' },
    info: { bg: 'var(--sb-color-info-light, #eff6ff)', color: 'var(--sb-color-info, #3b82f6)' },
    neutral: { bg: 'var(--sb-color-bg-muted, #f3f4f6)', color: 'var(--sb-color-text-secondary, #6b7280)' },
};
export function Badge({ children, variant = 'neutral', color, ...rest }) {
    // Custom color: use the color directly and generate light bg with opacity
    const style = color
        ? { bg: color + '18', color } // 18 = ~10% opacity hex suffix
        : variantStyles[variant];
    return (_jsx("span", { ...rest, style: {
            display: 'inline-flex',
            alignItems: 'center',
            padding: '1px 6px',
            borderRadius: 'var(--sb-radius-sm, 4px)',
            fontSize: 'var(--sb-font-size-xs, 11px)',
            fontWeight: 'var(--sb-font-weight-semibold, 600)',
            backgroundColor: style.bg,
            color: style.color,
            lineHeight: 1.5,
            whiteSpace: 'nowrap',
        }, children: children }));
}
