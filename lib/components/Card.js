import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Card — versatile card component for stats, info, and content.
 */
export function Card({ title, label, value, description, icon, iconClass, children, className = '', noPadding = false, style: customStyle, delay }) {
    // 'label' is an alias for 'title'
    const heading = title || label;
    return (_jsxs("div", { className: `sbrsp-card ${className}`.trim(), style: {
            padding: noPadding ? 0 : undefined,
            animationDelay: delay ? `${delay}ms` : undefined,
            ...customStyle,
        }, children: [(heading || icon) && (_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: value ? '1rem' : 0 }, children: [icon && (_jsx("div", { className: iconClass, style: {
                            width: '2.5rem',
                            height: '2.5rem',
                            borderRadius: '0.625rem',
                            background: 'var(--sb-color-primary-light)',
                            color: 'var(--sb-color-primary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.5)',
                        }, children: icon })), heading && (_jsx("span", { style: {
                            fontSize: '0.875rem',
                            color: '#334155',
                            fontWeight: 600,
                            letterSpacing: '-0.01em',
                        }, children: heading }))] })), value !== undefined && (_jsx("div", { style: {
                    fontSize: '2rem',
                    fontWeight: 800,
                    color: '#0f172a',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.1,
                    marginTop: heading || icon ? '0.25rem' : '0.5rem',
                    marginBottom: description ? '0.25rem' : '0',
                }, children: value })), description && (_jsx("p", { style: {
                    fontSize: 'var(--sb-font-size-xs)',
                    color: 'var(--sb-color-text-muted)',
                    marginTop: 'var(--sb-space-1)',
                }, children: description })), children] }));
}
