/**
 * WordPress-specific type definitions for the dashboard kit.
 */

export interface WordPressPluginData {
  apiUrl: string;
  nonce: string;
  version: string;
  adminUrl?: string;
  siteTitle?: string;
  siteUrl?: string;
  [key: string]: unknown;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T = unknown> {
  success: boolean;
  data: T[];
  meta: {
    total: number;
    page: number;
    per_page: number;
    pages: number;
  };
}
