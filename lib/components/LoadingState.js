import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * LoadingState — skeleton or spinner loading indicator.
 */
export function LoadingState({ rows = 3, spinner = false, message }) {
    if (spinner) {
        return (_jsxs("div", { style: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 'var(--sb-space-12)',
                gap: 'var(--sb-space-3)',
            }, children: [_jsx("div", { style: {
                        width: '2rem',
                        height: '2rem',
                        border: '3px solid var(--sb-color-border)',
                        borderTopColor: 'var(--sb-color-primary)',
                        borderRadius: '50%',
                        animation: 'sb-spin 0.8s linear infinite',
                    } }), message && (_jsx("span", { style: { fontSize: 'var(--sb-font-size-sm)', color: 'var(--sb-color-text-secondary)' }, children: message })), _jsx("style", { children: `@keyframes sb-spin { to { transform: rotate(360deg); } }` })] }));
    }
    return (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: 'var(--sb-space-3)' }, children: [Array.from({ length: rows }, (_, i) => (_jsx("div", { style: {
                    height: '1rem',
                    borderRadius: 'var(--sb-radius-sm)',
                    background: 'var(--sb-color-bg-muted)',
                    width: `${85 - i * 15}%`,
                    animation: 'sb-pulse 1.5s ease-in-out infinite',
                } }, i))), _jsx("style", { children: `@keyframes sb-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }` })] }));
}
