import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function Input({ size = 'md', icon, trailing, fullWidth = false, label, hint, error, className, id, required, ...rest }) {
    const inputId = id || `sb-input-${label?.replace(/\s+/g, '-').toLowerCase() || 'default'}`;
    const hasError = !!error;
    // Build class string for input element
    const inputClasses = [
        'sb-input',
        `sb-input--${size}`,
        hasError && 'sb-input--error',
        icon && 'sb-input--has-icon',
        trailing && 'sb-input--has-trailing',
        fullWidth && 'sb-input--full',
        className,
    ].filter(Boolean).join(' ');
    return (_jsxs("div", { className: `sb-input-wrap${fullWidth ? ' sb-input-wrap--full' : ''}`, children: [label && (_jsxs("label", { htmlFor: inputId, className: "sb-input__label", children: [label, required && _jsx("span", { className: "sb-input__required", children: "*" })] })), _jsxs("div", { className: "sb-input__field-wrap", children: [icon && _jsx("span", { className: "sb-input__icon", children: icon }), _jsx("input", { id: inputId, className: inputClasses, required: required, ...rest }), trailing && _jsx("span", { className: "sb-input__trailing", children: trailing })] }), (hint || error) && (_jsx("div", { className: `sb-input__hint${hasError ? ' sb-input__hint--error' : ''}`, children: error || hint }))] }));
}
