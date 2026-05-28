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
export declare function LoadingState({ rows, spinner, message }: LoadingStateProps): import("react/jsx-runtime").JSX.Element;
export {};
