/**
 * StatusBadge — semantic colored label for status indicators.
 *
 * Provides 5 variants (success/error/warning/info/neutral) with
 * CSS token-based colors. For custom colors, use Badge instead.
 *
 * Usage:
 *   <StatusBadge label="Active" variant="success" />
 */
type BadgeVariant = 'success' | 'error' | 'danger' | 'warning' | 'info' | 'neutral';
interface StatusBadgeProps {
    label: string;
    variant?: BadgeVariant;
    pulse?: boolean;
    className?: string;
}
/**
 * StatusBadge — colored label for status display.
 */
export declare function StatusBadge({ label, variant, pulse, className }: StatusBadgeProps): import("react/jsx-runtime").JSX.Element;
export {};
