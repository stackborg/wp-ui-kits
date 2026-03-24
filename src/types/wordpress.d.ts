/**
 * WordPress-specific type definitions for the dashboard kit.
 */

export interface WordPressPluginData {
  apiBase: string;
  nonce: string;
  pluginUrl: string;
  version: string;
  [key: string]: unknown;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T = unknown> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}
