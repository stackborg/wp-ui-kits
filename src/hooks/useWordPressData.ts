/**
 * useWordPressData — typed access to WordPress-injected data.
 *
 * Usage:
 *   const wp = useWordPressData<MyPluginData>('sbMailPressData');
 *   console.log(wp.apiUrl, wp.nonce, wp.version);
 */

import { useMemo } from 'react';
import type { WordPressData } from '@/api/client';

export function useWordPressData<T extends WordPressData = WordPressData>(
  dataKey: string
): T {
  return useMemo(() => {
    const data = (window as unknown as Record<string, unknown>)[dataKey] as T | undefined;
    if (!data) {
      throw new Error(`WordPress data not found: window.${dataKey}`);
    }
    return data;
  }, [dataKey]);
}
