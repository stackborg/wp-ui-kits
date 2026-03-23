/**
 * LoadingState — animated spinner indicator for async operations.
 *
 * Displays a centered loading message with optional custom text.
 *
 * Usage:
 *   <LoadingState />
 *   <LoadingState message="Fetching data..." />
 */

interface LoadingStateProps {
  /** Number of skeleton rows to show. Default: 3 */
  rows?: number;
  /** Show spinner instead of skeleton. Default: false */
  spinner?: boolean;
  /** Loading message */
  message?: string;
}

/**
 * LoadingState — skeleton or spinner loading indicator.
 */
export function LoadingState({ rows = 3, spinner = false, message }: LoadingStateProps) {
  if (spinner) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--sb-space-12)',
        gap: 'var(--sb-space-3)',
      }}>
        <div style={{
          width: '2rem',
          height: '2rem',
          border: '3px solid var(--sb-color-border)',
          borderTopColor: 'var(--sb-color-primary)',
          borderRadius: '50%',
          animation: 'sb-spin 0.8s linear infinite',
        }} />
        {message && (
          <span style={{ fontSize: 'var(--sb-font-size-sm)', color: 'var(--sb-color-text-secondary)' }}>
            {message}
          </span>
        )}
        <style>{`@keyframes sb-spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sb-space-3)' }}>
      {Array.from({ length: rows }, (_, i) => (
        <div
          key={i}
          style={{
            height: '1rem',
            borderRadius: 'var(--sb-radius-sm)',
            background: 'var(--sb-color-bg-muted)',
            width: `${85 - i * 15}%`,
            animation: 'sb-pulse 1.5s ease-in-out infinite',
          }}
        />
      ))}
      <style>{`@keyframes sb-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }`}</style>
    </div>
  );
}
