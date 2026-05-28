import type { ReactNode } from 'react';
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
export declare function DashboardShell({ pluginName, version, navItems, logo, children, }: DashboardShellProps): import("react/jsx-runtime").JSX.Element;
export {};
