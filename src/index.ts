/**
 * PWA Bootstrap Kit - Main Entry Point
 * Created: 2024-12-19
 * Purpose: Complete PWA Bootstrap Toolkit - Vite plugin, React hooks, cache management, and service worker generation
 *
 * This library provides everything needed to create seamless Progressive Web App experiences:
 * - Vite plugin for automatic asset manifest generation and loading optimization
 * - React hooks for easy integration with React applications
 * - Cache manager for loading screens and service worker management
 * - PWA module for service worker registration and install prompts
 * - Workbox integration for advanced service worker functionality
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

// Export PWA types
export type {
    PWAConfig
} from './pwa';

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

// Export Workbox functionality
export {
    generateWorkboxServiceWorker,
    generateServiceWorkerRegistration,
    generatePWAManifest,
    type WorkboxOptions
} from './workbox';

// Export PWA functionality
export {
    PWAManager,
    initializePWA,
    createPWAManifest
} from './pwa';

// Note: Asset manifest generator exports removed to prevent Node.js dependencies
// from being bundled for the browser. The asset manifest generator should only
// be used during the build process, not in the browser runtime.

// Note: Default export removed to avoid TypeScript issues with private properties
