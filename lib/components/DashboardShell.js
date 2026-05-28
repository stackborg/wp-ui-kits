import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * DashboardShell — sidebar navigation layout for plugin admin pages.
 *
 * Provides a collapsible sidebar with navigation links and a main
 * content area. Integrates with React Router for route-based navigation.
 *
 * Usage:
 *   <DashboardShell pluginName="MailPress" navItems={navItems}>
 *     <Outlet />
 *   </DashboardShell>
 */
import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './DashboardShell.css';
/**
 * DashboardShell — sidebar navigation layout for plugin admin pages.
 *
 * Usage:
 *   <DashboardShell pluginName="MailPress" navItems={navItems}>
 *     <Outlet />
 *   </DashboardShell>
 */
export function DashboardShell({ pluginName, version, navItems, logo, children, }) {
    const [collapsed, setCollapsed] = useState(false);
    return (_jsxs("div", { className: `sb-shell ${collapsed ? 'sb-shell--collapsed' : ''}`, children: [_jsxs("aside", { className: "sb-shell__sidebar", children: [_jsxs("div", { className: "sb-shell__sidebar-header", children: [logo && _jsx("div", { className: "sb-shell__logo", children: logo }), !collapsed && _jsx("span", { className: "sb-shell__plugin-name", children: pluginName }), _jsx("button", { className: "sb-shell__toggle", onClick: () => setCollapsed(!collapsed), "aria-label": collapsed ? 'Expand sidebar' : 'Collapse sidebar', children: collapsed ? '▶' : '◀' })] }), _jsx("nav", { className: "sb-shell__nav", children: navItems.map((item) => (_jsxs(NavLink, { to: item.path, className: ({ isActive }) => `sb-shell__nav-item ${isActive ? 'sb-shell__nav-item--active' : ''}`, title: collapsed ? item.label : undefined, children: [item.icon && _jsx("span", { className: "sb-shell__nav-icon", children: item.icon }), !collapsed && _jsx("span", { className: "sb-shell__nav-label", children: item.label })] }, item.path))) }), version && !collapsed && (_jsxs("div", { className: "sb-shell__version", children: ["v", version] }))] }), _jsx("main", { className: "sb-shell__content", children: children || _jsx(Outlet, {}) })] }));
}
