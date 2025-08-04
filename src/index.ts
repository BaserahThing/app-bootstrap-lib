/**
 * PWA Bootstrap Kit - Main Entry Point
 * Created: 2024-12-19
 * Purpose: Complete PWA Bootstrap Toolkit - Vite plugin, React hooks, cache management, and optimized loading
 *
 * This library provides everything needed to create seamless Progressive Web App experiences:
 * - Vite plugin for automatic asset manifest generation and loading optimization
 * - React hooks for easy integration with React applications
 * - Cache manager for loading screens and service worker management
 * - Enhanced PWA integration with official Vite PWA plugin
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

// Export Enhanced PWA Integration
export {
    enhancedPWABootstrapPlugin,
    type EnhancedPWAOptions
} from './vite-integration';

// Export runtime-free functions
export {
    getAssetManifest,
    getLoadingState,
    isAppReady,
    getSPAHandlerConfig,
    getPWAConfig,
    getBuildInfo,
    getCompressionStatus,
    getSystemFiles,
    isSystemFile,
    getAssetUrls,
    getSPAHandlerCompatibility,
    getCacheConfig,
    triggerAssetReload,
    getUnifiedManifest,
    onBootstrapEvent,
    onLoadingProgress,
    onLoadingComplete,
    onAppReady
} from './react';

// Export React hooks (for compatibility)
export {
    useAssetManifest,
    useLoadingState,
    useAppReady,
    useSPAHandlerConfig,
    usePWAConfig,
    useAssetReload,
    useBuildInfo,
    useCompressionStatus,
    useSystemFiles,
    useIsSystemFile,
    useAssetUrls,
    useUnifiedManifest,
    useSPAHandlerCompatibility,
    useCacheConfig
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
