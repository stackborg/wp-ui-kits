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
import type { ReactNode } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './DashboardShell.css';

export interface NavItem {
  label: string;
  path: string;
  icon?: ReactNode;
}

interface DashboardShellProps {
  /** Plugin display name shown in sidebar header */
  pluginName: string;
  /** Plugin version shown in sidebar footer */
  version?: string;
  /** Navigation items for sidebar */
  navItems: NavItem[];
  /** Optional logo/icon for the sidebar header */
  logo?: ReactNode;
  /** Content to render (uses React Router <Outlet /> if not provided) */
  children?: ReactNode;
}

/**
 * DashboardShell — sidebar navigation layout for plugin admin pages.
 *
 * Usage:
 *   <DashboardShell pluginName="MailPress" navItems={navItems}>
 *     <Outlet />
 *   </DashboardShell>
 */
export function DashboardShell({
  pluginName,
  version,
  navItems,
  logo,
  children,
}: DashboardShellProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`sb-shell ${collapsed ? 'sb-shell--collapsed' : ''}`}>
      {/* Sidebar */}
      <aside className="sb-shell__sidebar">
        <div className="sb-shell__sidebar-header">
          {logo && <div className="sb-shell__logo">{logo}</div>}
          {!collapsed && <span className="sb-shell__plugin-name">{pluginName}</span>}
          <button
            className="sb-shell__toggle"
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? '▶' : '◀'}
          </button>
        </div>

        <nav className="sb-shell__nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sb-shell__nav-item ${isActive ? 'sb-shell__nav-item--active' : ''}`
              }
              title={collapsed ? item.label : undefined}
            >
              {item.icon && <span className="sb-shell__nav-icon">{item.icon}</span>}
              {!collapsed && <span className="sb-shell__nav-label">{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {version && !collapsed && (
          <div className="sb-shell__version">v{version}</div>
        )}
      </aside>

      {/* Main content */}
      <main className="sb-shell__content">
        {children || <Outlet />}
      </main>
    </div>
  );
}
