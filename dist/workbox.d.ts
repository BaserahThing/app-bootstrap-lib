import { A as AssetManifest, b as AppBootstrapOptions } from './types-D8l6ur8u.js';

/**
 * Workbox Integration for App Bootstrap Library
 * Created: 2024-07-31
 * Purpose: Provides PWA functionality with service worker generation and caching strategies
 */

interface WorkboxOptions {
    /** Enable/disable Workbox integration */
    enabled?: boolean;
    /** Cache name prefix */
    cacheNamePrefix?: string;
    /** Cache strategies for different file types */
    strategies?: {
        /** Strategy for JavaScript files */
        js?: 'cache-first' | 'stale-while-revalidate' | 'network-first';
        /** Strategy for CSS files */
        css?: 'cache-first' | 'stale-while-revalidate' | 'network-first';
        /** Strategy for images */
        images?: 'cache-first' | 'stale-while-revalidate' | 'network-first';
        /** Strategy for HTML files */
        html?: 'cache-first' | 'stale-while-revalidate' | 'network-first';
        /** Strategy for API calls */
        api?: 'cache-first' | 'stale-while-revalidate' | 'network-first';
    };
    /** Cache expiration settings */
    expiration?: {
        /** Maximum number of entries in cache */
        maxEntries?: number;
        /** Maximum age in seconds */
        maxAgeSeconds?: number;
    };
    /** Precache assets */
    precache?: boolean;
    /** Background sync for offline actions */
    backgroundSync?: boolean;
}
/**
 * Generate Workbox service worker content
 */
declare function generateWorkboxServiceWorker(assetManifest: AssetManifest, options: AppBootstrapOptions, workboxOptions?: WorkboxOptions): string;
/**
 * Generate service worker registration script
 */
declare function generateServiceWorkerRegistration(options: AppBootstrapOptions, workboxOptions?: WorkboxOptions): string;
/**
 * Generate PWA manifest with Workbox integration
 */
declare function generatePWAManifest(options: AppBootstrapOptions, _workboxOptions?: WorkboxOptions): string;

export { type WorkboxOptions, generatePWAManifest, generateServiceWorkerRegistration, generateWorkboxServiceWorker };
