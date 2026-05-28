import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
/**
 * Error Boundary — catches React rendering errors.
 *
 * Prevents the entire dashboard from crashing when
 * a single component throws.
 */
export class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    componentDidCatch(error, errorInfo) {
        console.error('[wp-ui-kits] ErrorBoundary caught:', error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }
            return (_jsxs("div", { style: {
                    padding: 'var(--sb-space-6)',
                    background: 'var(--sb-color-error-light)',
                    borderRadius: 'var(--sb-radius-md)',
                    border: '1px solid var(--sb-color-error)',
                    color: 'var(--sb-color-error)',
                }, children: [_jsx("h3", { style: { margin: '0 0 var(--sb-space-2)', fontWeight: 600 }, children: "Something went wrong" }), _jsx("p", { style: { margin: 0, fontSize: 'var(--sb-font-size-sm)' }, children: this.state.error?.message || 'An unexpected error occurred.' })] }));
        }
        return this.props.children;
    }
}
