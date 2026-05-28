/**
 * Card — versatile card component for stats, info, and content display.
 *
 * Supports title, value, description, icon, and custom children.
 * Uses CSS tokens for consistent theming across plugins.
 *
 * Usage:
 *   <Card title="Users" value={1234} description="+12% this week" />
 *   <Card><CustomContent /></Card>
 */
import type { ReactNode, CSSProperties } from 'react';
interface CardProps {
    /** Card heading — 'label' is an alias for 'title' */
    title?: string;
    label?: string;
    value?: string | number;
    description?: string;
    icon?: ReactNode;
    /** CSS class for the icon container (e.g. theme token class) */
    iconClass?: string;
    children?: ReactNode;
    className?: string;
    noPadding?: boolean;
    style?: CSSProperties;
    /** Stagger animation delay in ms */
    delay?: number;
}
/**
 * Card — versatile card component for stats, info, and content.
 */
export declare function Card({ title, label, value, description, icon, iconClass, children, className, noPadding, style: customStyle, delay }: CardProps): import("react/jsx-runtime").JSX.Element;
export {};
