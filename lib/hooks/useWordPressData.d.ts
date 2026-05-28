/**
 * useWordPressData — typed access to WordPress-injected data.
 *
 * Usage:
 *   const wp = useWordPressData<MyPluginData>('sbMailPressData');
 *   console.log(wp.apiUrl, wp.nonce, wp.version);
 */
import type { WordPressData } from '../api/client';
export declare function useWordPressData<T extends WordPressData = WordPressData>(dataKey: string): T;
