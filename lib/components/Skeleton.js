import { jsx as _jsx } from "react/jsx-runtime";
export function Skeleton({ className, style, ...props }) {
    return (_jsx("div", { className: className, style: {
            background: 'var(--sb-color-bg-muted, #e5e7eb)',
            borderRadius: 'var(--sb-radius-sm, 6px)',
            animation: 'sb-pulse 1.5s ease-in-out infinite',
            ...style,
        }, ...props }));
}
