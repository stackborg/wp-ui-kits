/**
 * createDashboard — mount helper for WordPress plugin dashboards.
 *
 * Replaces the ~15 lines of boilerplate each plugin has in main.tsx
 * with a single function call.
 *
 * Usage:
 *   import { createDashboard } from '@stackborg/wp-ui-kits';
 *   import App from './App';
 *   createDashboard('sb-mailpress-root', App);
 */
import React from 'react';
type AppComponent = React.ComponentType;
/**
 * Mount a React dashboard into a WordPress admin container.
 *
 * @param rootId - The DOM element ID to mount into
 * @param App - The root React component
 * @param options - Optional configuration
 */
export declare function createDashboard(rootId: string, App: AppComponent, options?: {
    /** Import CSS before mounting. Default: none. */
    styles?: string[];
    /** Disable React.StrictMode. Default: false. */
    disableStrictMode?: boolean;
}): void;
export {};
