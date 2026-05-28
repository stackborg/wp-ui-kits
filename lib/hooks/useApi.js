/**
 * useApi — React hook for data fetching from WordPress REST API.
 *
 * Handles loading state, error state, and data refetching.
 * Works with the ApiClient from @stackborg/wp-ui-kits.
 *
 * Usage:
 *   const { data, loading, error, refetch } = useApi<Stats>(api, '/stats');
 */
import { useState, useEffect, useCallback } from 'react';
import { ApiError } from '../api/client';
export function useApi(api, endpoint, deps = []) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [trigger, setTrigger] = useState(0);
    const refetch = useCallback(() => setTrigger((t) => t + 1), []);
    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        setError(null);
        api
            .get(endpoint)
            .then((result) => {
            if (!cancelled) {
                setData(result);
                setLoading(false);
            }
        })
            .catch((err) => {
            if (!cancelled) {
                setError(err instanceof ApiError ? err : new ApiError('Request failed', 0, err));
                setLoading(false);
            }
        });
        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [endpoint, trigger, ...deps]);
    return { data, loading, error, refetch };
}
