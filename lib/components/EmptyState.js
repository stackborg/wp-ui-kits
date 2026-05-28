import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * EmptyState — shown when there's no data to display.
 */
export function EmptyState({ title, description, icon, action }) {
    return (_jsxs("div", { style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'var(--sb-space-12)',
            textAlign: 'center',
        }, children: [icon && (_jsx("div", { style: {
                    width: '3rem',
                    height: '3rem',
                    borderRadius: 'var(--sb-radius-full)',
                    background: 'var(--sb-color-bg-muted)',
                    color: 'var(--sb-color-text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 'var(--sb-space-4)',
                }, children: icon })), _jsx("h3", { style: {
                    fontSize: 'var(--sb-font-size-lg)',
                    fontWeight: 'var(--sb-font-weight-semibold)',
                    color: 'var(--sb-color-text)',
                    margin: 0,
                }, children: title }), description && (_jsx("p", { style: {
                    fontSize: 'var(--sb-font-size-sm)',
                    color: 'var(--sb-color-text-secondary)',
                    marginTop: 'var(--sb-space-2)',
                    maxWidth: '24rem',
                }, children: description })), action && _jsx("div", { style: { marginTop: 'var(--sb-space-4)' }, children: action })] }));
}
