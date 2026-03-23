/**
 * WordPress Data type definitions.
 *
 * Base interface for the WordPress-injected plugin data
 * that is available on window.sb{Plugin}Data.
 */
export interface WordPressPluginData {
  apiUrl: string;
  nonce: string;
  version: string;
  adminUrl?: string;
  siteTitle?: string;
  siteUrl?: string;
}

/**
 * Standard REST API response wrapper.
 */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

/**
 * Paginated API response.
 */
export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  meta: {
    total: number;
    page: number;
    per_page: number;
    pages: number;
  };
}

/**
 * Extend the global window interface per plugin
 * using module augmentation:
 *
 *   declare global {
 *     interface Window {
 *       sbMailPressData: WordPressPluginData & { customField: string };
 *     }
 *   }
 */
