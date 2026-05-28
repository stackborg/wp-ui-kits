import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createPortal } from 'react-dom';
import './PageHeader.css';
/**
 * Page Header — consistent page title + action buttons.
 */
export function PageHeader({ title, description, icon, actions, className }) {
    const portalTarget = typeof document !== 'undefined' ? document.getElementById('page-header-slot') : null;
    const isPortaled = !!portalTarget;
    const content = (_jsxs("div", { className: `sb-page-header ${isPortaled ? 'sb-page-header--portaled' : 'sb-page-header--sticky'} ${className || ''}`, children: [_jsxs("div", { className: "sb-page-header__left", children: [icon && (_jsx("div", { className: "sb-page-header__icon", children: icon })), _jsxs("div", { children: [_jsx("h1", { className: "sb-page-header__title", children: title }), description && (_jsx("p", { className: "sb-page-header__description", children: description }))] })] }), actions && _jsx("div", { className: "sb-page-header__actions", children: actions })] }));
    return isPortaled ? createPortal(content, portalTarget) : content;
}
