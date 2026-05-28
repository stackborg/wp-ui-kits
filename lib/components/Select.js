import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function Select({ options, value, onChange, label, hint, error, placeholder, size = 'md', fullWidth = false, disabled = false, required = false, icon, id, className, }) {
    const selectId = id || `sb-select-${label?.replace(/\s+/g, '-').toLowerCase() || 'default'}`;
    const hasError = !!error;
    // Build class string for select element — mirrors Input pattern
    const selectClasses = [
        'sb-select',
        `sb-select--${size}`,
        hasError && 'sb-select--error',
        icon && 'sb-select--has-icon',
        fullWidth && 'sb-select--full',
        disabled && 'sb-select--disabled',
    ].filter(Boolean).join(' ');
    const wrapClasses = [
        'sb-select-wrap',
        fullWidth && 'sb-select-wrap--full',
        className,
    ].filter(Boolean).join(' ');
    return (_jsxs("div", { className: wrapClasses, children: [label && (_jsxs("label", { htmlFor: selectId, className: "sb-select__label", children: [label, required && _jsx("span", { className: "sb-select__required", children: "*" })] })), _jsxs("div", { className: "sb-select__field-wrap", children: [icon && _jsx("span", { className: "sb-select__icon", children: icon }), _jsxs("select", { id: selectId, value: value, onChange: (e) => onChange(e.target.value), disabled: disabled, className: selectClasses, children: [placeholder && (_jsx("option", { value: "", disabled: true, children: placeholder })), options.map((opt) => (_jsx("option", { value: opt.value, disabled: opt.disabled, children: opt.label }, opt.value)))] })] }), (hint || error) && (_jsx("div", { className: `sb-select__hint${hasError ? ' sb-select__hint--error' : ''}`, children: error || hint }))] }));
}
