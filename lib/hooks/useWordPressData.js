/**
 * useWordPressData — typed access to WordPress-injected data.
 *
 * Usage:
 *   const wp = useWordPressData<MyPluginData>('sbMailPressData');
 *   console.log(wp.apiUrl, wp.nonce, wp.version);
 */
import { useMemo } from 'react';
export function useWordPressData(dataKey) {
    return useMemo(() => {
        const data = window[dataKey];
        if (!data) {
            throw new Error(`WordPress data not found: window.${dataKey}`);
        }
        return data;
    }, [dataKey]);
}
