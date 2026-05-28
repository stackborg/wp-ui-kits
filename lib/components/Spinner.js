import { jsx as _jsx } from "react/jsx-runtime";
const sizePx = {
    sm: 14,
    md: 20,
    lg: 28,
};
export function Spinner({ size = 'md', className }) {
    const px = sizePx[size];
    return (_jsx("span", { className: className, style: {
            display: 'inline-block',
            width: `${px}px`,
            height: `${px}px`,
            border: '2px solid currentColor',
            borderRightColor: 'transparent',
            borderRadius: '50%',
            animation: 'sb-spin 0.6s linear infinite',
        } }));
}
