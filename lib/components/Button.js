import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Build CSS class string for the button.
 * Output: "sb-btn sb-btn--{variant} sb-btn--{size} [sb-btn--icon] [sb-btn--full] [className]"
 *
 * Plugin CSS maps these generic classes to its own design tokens, e.g.:
 *   .sbrsp-btn.sb-btn--primary { background: var(--sbrsp-teal-600); }
 */
function buildClassName(variant, size, iconMode, fullWidth, className) {
    const parts = ['sb-btn', `sb-btn--${variant}`, `sb-btn--${size}`];
    if (iconMode)
        parts.push('sb-btn--icon');
    if (fullWidth)
        parts.push('sb-btn--full');
    if (className)
        parts.push(className);
    return parts.join(' ');
}
export function Button({ variant = 'primary', size = 'md', loading = false, fullWidth = false, icon: iconMode = false, disabled, className, children, ...rest }) {
    const isDisabled = disabled || loading;
    return (_jsxs("button", { ...rest, disabled: isDisabled, className: buildClassName(variant, size, iconMode, fullWidth, className), style: { whiteSpace: 'nowrap', ...rest.style }, children: [loading && (_jsx("span", { className: "sb-btn__spinner" })), children] }));
}
