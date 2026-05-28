/**
 * useAddons — React hook for addon management.
 *
 * Provides addon listing, installation, activation, and all
 * lifecycle operations through the REST API.
 *
 * Usage:
 *   const { addons, loading, install, activate, deactivate, uninstall } = useAddons(api);
 */
import { useReducer, useEffect, useCallback } from 'react';
function addonReducer(state, action) {
    switch (action.type) {
        case 'FETCH_START':
            return { ...state, loading: true, error: null };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, addons: action.addons };
        case 'FETCH_ERROR':
            return { ...state, loading: false, error: action.message };
        case 'REFETCH':
            return { ...state, trigger: state.trigger + 1 };
    }
}
const initialState = {
    addons: [],
    loading: true,
    error: null,
    trigger: 0,
};
export function useAddons(api) {
    const [state, dispatch] = useReducer(addonReducer, initialState);
    const refetch = useCallback(() => dispatch({ type: 'REFETCH' }), []);
    // Fetch addon list on mount and when trigger changes
    useEffect(() => {
        dispatch({ type: 'FETCH_START' });
        api
            .get('/addons')
            .then((result) => {
            dispatch({ type: 'FETCH_SUCCESS', addons: result.addons });
        })
            .catch((err) => {
            dispatch({ type: 'FETCH_ERROR', message: err.message || 'Failed to load addons' });
        });
    }, [api, state.trigger]);
    // Action helpers — perform action then refetch
    const postAction = useCallback(async (endpoint, body) => {
        const result = await api.post(endpoint, body);
        refetch();
        return result;
    }, [api, refetch]);
    const deleteAction = useCallback(async (endpoint) => {
        const result = await api.del(endpoint);
        refetch();
        return result;
    }, [api, refetch]);
    const install = useCallback((slug, zipUrl, checksum) => postAction(`/addons/${slug}/install`, { zip_url: zipUrl, checksum }), [postAction]);
    const uninstall = useCallback((slug) => deleteAction(`/addons/${slug}`), [deleteAction]);
    const activate = useCallback((slug) => postAction(`/addons/${slug}/activate`), [postAction]);
    const deactivate = useCallback((slug) => postAction(`/addons/${slug}/deactivate`), [postAction]);
    const update = useCallback((slug, zipUrl, checksum) => postAction(`/addons/${slug}/update`, { zip_url: zipUrl, checksum }), [postAction]);
    const { addons, loading, error } = state;
    return { addons, loading, error, refetch, install, uninstall, activate, deactivate, update };
}
