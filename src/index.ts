/**
 * App Bootstrap Library - Main Entry Point
 * Created: 2024-12-19
 * Purpose: Unified library combining Vite plugin, React hooks, and cache management
 */

// Export all types
export type {
    LoadingState,
    AssetManifest,
    AppBootstrapConfig,
    AppBootstrapOptions,
    UseAppBootstrapReturn,
    CacheManagerConfig,
    CacheManager
} from './types';

// Re-export all modules

// Export Vite plugin
export { default as appBootstrapPlugin } from './vite';
export { default as vitePlugin } from './vite';

// Export React hooks
export {
    useAppBootstrap,
    useAppBootstrapStatus,
    useAppBootstrapWithConfig,
    appBootstrapEvents
} from './react';

// Export cache manager
export {
    AppCacheManager,
    initializeCacheManager
} from './cache';

// Note: Asset manifest generator exports removed to prevent Node.js dependencies
// from being bundled for the browser. The asset manifest generator should only
// be used during the build process, not in the browser runtime.

// Note: Default export removed to avoid TypeScript issues with private properties
