/**
 * Alert — contextual banner with variant colors and optional dismiss.
 *
 * Usage:
 *   <Alert variant="warning">Missing dependencies</Alert>
 *   <Alert variant="success" dismissible onDismiss={fn}>Saved!</Alert>
 */
import React from 'react';
import type { ReactNode } from 'react';
export type AlertVariant = 'info' | 'warning' | 'error' | 'success';
interface AlertProps {
    children: ReactNode;
    variant?: AlertVariant;
    dismissible?: boolean;
    onDismiss?: () => void;
    icon?: ReactNode;
    'data-testid'?: string;
}
export declare function Alert({ children, variant, dismissible, onDismiss, icon, ...rest }: AlertProps): React.ReactElement | null;
export {};
