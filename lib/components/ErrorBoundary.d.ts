/**
 * ErrorBoundary — catches React render errors and displays fallback UI.
 *
 * Wraps components to prevent full-page crashes. Logs errors and
 * shows a recovery message instead of a blank screen.
 *
 * Usage:
 *   <ErrorBoundary><App /></ErrorBoundary>
 */
import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}
interface State {
    hasError: boolean;
    error: Error | null;
}
/**
 * Error Boundary — catches React rendering errors.
 *
 * Prevents the entire dashboard from crashing when
 * a single component throws.
 */
export declare class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props);
    static getDerivedStateFromError(error: Error): State;
    componentDidCatch(error: Error, errorInfo: ErrorInfo): void;
    render(): ReactNode;
}
export {};
