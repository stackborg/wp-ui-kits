/**
 * useApi — React hook for data fetching from WordPress REST API.
 *
 * Handles loading state, error state, and data refetching.
 * Works with the ApiClient from @stackborg/wp-ui-kits.
 *
 * Usage:
 *   const { data, loading, error, refetch } = useApi<Stats>(api, '/stats');
 */
import type { ApiClient } from '../api/client';
import { ApiError } from '../api/client';
interface UseApiResult<T> {
    data: T | null;
    loading: boolean;
    error: ApiError | null;
    refetch: () => void;
}
export declare function useApi<T>(api: ApiClient, endpoint: string, deps?: unknown[]): UseApiResult<T>;
export {};
