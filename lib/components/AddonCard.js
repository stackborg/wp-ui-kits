import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * AddonCard — individual addon display card.
 *
 * Shows addon info (name, description, type, version),
 * state-aware action buttons, license status, and version warnings.
 *
 * Uses shared primitives: Button, Badge, Alert.
 */
import { useState } from 'react';
import { Button } from './Button';
import { Badge } from './Badge';
import { Alert } from './Alert';
const TYPE_COLORS = {
    free: 'var(--sb-addon-badge-free, #10b981)',
    paid: 'var(--sb-addon-badge-pro, #8b5cf6)',
    freemium: 'var(--sb-addon-badge-freemium, #3b82f6)',
};
const TYPE_LABELS = {
    free: 'Free',
    paid: 'Pro',
    freemium: 'Freemium',
};
export function AddonCard({ slug, name, description, version, type, icon, iconType, active, installed, license, updateAvailable, dependencyErrors, priceDisplay, priceUrl, onActivate, onDeactivate, onInstall, onUninstall, onUpdate, onLicense, }) {
    const [loading, setLoading] = useState(false);
    const hasDependencyIssues = dependencyErrors && dependencyErrors.length > 0;
    const handleAction = async (action) => {
        if (!action)
            return;
        setLoading(true);
        try {
            await action(slug);
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: "sb-addon-card", "data-testid": `addon-card-${slug}`, style: {
            border: '1px solid var(--sb-addon-card-border, #e5e7eb)',
            borderRadius: 'var(--sb-addon-card-radius, 12px)',
            padding: '20px',
            backgroundColor: 'var(--sb-addon-card-bg, #fff)',
            position: 'relative',
            opacity: loading ? 0.7 : 1,
            transition: 'opacity var(--sb-transition-normal, 0.2s), box-shadow var(--sb-transition-normal, 0.2s)',
        }, children: [updateAvailable && (_jsxs("div", { "data-testid": `update-badge-${slug}`, style: {
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    backgroundColor: 'var(--sb-addon-update-bg, #f59e0b)',
                    color: '#fff',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: 600,
                }, children: ["v", updateAvailable.version, " available"] })), _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }, children: [_jsx("div", { style: {
                            width: '40px',
                            height: '40px',
                            borderRadius: '10px',
                            backgroundColor: active ? 'var(--sb-addon-icon-bg-active, #ede9fe)' : 'var(--sb-addon-icon-bg-inactive, #f3f4f6)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '18px',
                            overflow: 'hidden',
                        }, children: iconType === 'url' && icon ? (_jsx("img", { src: icon, alt: name, style: { width: '24px', height: '24px', objectFit: 'contain' } })) : iconType === 'svg' && icon ? (_jsx("span", { style: { width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }, dangerouslySetInnerHTML: { __html: icon } })) : icon && iconType === 'emoji' ? (_jsx("span", { children: icon })) : (_jsx("span", { children: active ? '⚡' : '📦' })) }), _jsxs("div", { children: [_jsx("h3", { style: { margin: 0, fontSize: '16px', fontWeight: 600, color: 'var(--sb-color-text, #111827)' }, children: name }), _jsxs("div", { style: { display: 'flex', gap: '8px', alignItems: 'center', marginTop: '2px' }, children: [_jsxs("span", { style: { fontSize: '12px', color: 'var(--sb-color-text-secondary, #6b7280)' }, children: ["v", version] }), _jsx(Badge, { "data-testid": `type-badge-${slug}`, color: TYPE_COLORS[type], children: TYPE_LABELS[type] || 'Free' })] })] })] }), _jsx("p", { style: { margin: '0 0 16px', fontSize: '13px', color: 'var(--sb-color-text-secondary, #6b7280)', lineHeight: 1.4 }, children: description }), type !== 'free' && priceDisplay && (_jsxs("div", { "data-testid": `price-display-${slug}`, style: {
                    fontSize: '12px',
                    padding: '6px 10px',
                    borderRadius: '6px',
                    marginBottom: '12px',
                    backgroundColor: 'var(--sb-addon-price-bg, #f5f3ff)',
                    color: 'var(--sb-addon-price-color, #6d28d9)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }, children: [_jsx("span", { style: { fontWeight: 600 }, children: priceDisplay }), priceUrl && (_jsx("a", { href: priceUrl, target: "_blank", rel: "noopener noreferrer", style: { color: '#7c3aed', textDecoration: 'none', fontSize: '11px' }, children: "View Plans \u2192" }))] })), type !== 'free' && license.status !== 'none' && (_jsxs(Alert, { "data-testid": `license-status-${slug}`, variant: license.status === 'active' ? 'success' : 'error', icon: license.status === 'active' ? '✓' : '✕', children: ["License: ", license.status, license.expiry && ` · Expires ${license.expiry}`] })), hasDependencyIssues && (_jsxs(Alert, { "data-testid": `dependency-errors-${slug}`, variant: "warning", icon: "\u26A0", children: [_jsx("div", { style: { fontWeight: 600, marginBottom: '4px' }, children: "Missing Dependencies:" }), dependencyErrors.map((err, i) => (_jsxs("div", { style: { marginLeft: '8px' }, children: ["\u2022 ", err] }, i)))] })), _jsxs("div", { style: { display: 'flex', gap: '8px', flexWrap: 'wrap' }, children: [!installed && (_jsx(Button, { "data-testid": `install-btn-${slug}`, variant: "primary", size: "md", loading: loading, onClick: () => handleAction(onInstall), children: "Install" })), installed && !active && (_jsxs(_Fragment, { children: [_jsx(Button, { "data-testid": `activate-btn-${slug}`, variant: "primary", size: "md", loading: loading, disabled: !!hasDependencyIssues, onClick: () => handleAction(onActivate), children: "Activate" }), onUninstall && (_jsx(Button, { "data-testid": `uninstall-btn-${slug}`, variant: "danger", size: "md", loading: loading, onClick: () => handleAction(onUninstall), children: "Uninstall" }))] })), installed && active && (_jsx(Button, { "data-testid": `deactivate-btn-${slug}`, variant: "secondary", size: "md", loading: loading, onClick: () => handleAction(onDeactivate), children: "Deactivate" })), updateAvailable && (_jsx(Button, { "data-testid": `update-btn-${slug}`, variant: "warning", size: "md", loading: loading, onClick: () => handleAction(onUpdate), children: "Update" })), type !== 'free' && license.status !== 'active' && installed && (_jsx(Button, { "data-testid": `license-btn-${slug}`, variant: "primary", size: "md", loading: loading, onClick: () => onLicense?.(slug), children: "Activate License" }))] })] }));
}
