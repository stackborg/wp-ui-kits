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
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('[wp-ui-kits] ErrorBoundary caught:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div style={{
          padding: 'var(--sb-space-6)',
          background: 'var(--sb-color-error-light)',
          borderRadius: 'var(--sb-radius-md)',
          border: '1px solid var(--sb-color-error)',
          color: 'var(--sb-color-error)',
        }}>
          <h3 style={{ margin: '0 0 var(--sb-space-2)', fontWeight: 600 }}>
            Something went wrong
          </h3>
          <p style={{ margin: 0, fontSize: 'var(--sb-font-size-sm)' }}>
            {this.state.error?.message || 'An unexpected error occurred.'}
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
