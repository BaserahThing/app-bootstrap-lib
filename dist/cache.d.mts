import { c as CacheManager, C as CacheManagerConfig } from './types-D8l6ur8u.mjs';

/**
 * Simplified Cache Manager
 * Created: 2024-12-19
 * Purpose: Unified cache management for app bootstrap
 */

declare class AppCacheManager implements CacheManager {
    private loadingElement;
    private config;
    constructor(config?: CacheManagerConfig);
    init(): Promise<void>;
    private setupLoadingScreen;
    private getDefaultLoadingHTML;
    updateLoadingText(text: string): void;
    private loadApp;
    hideLoadingScreen(): void;
    showError(message: string): void;
    retry(): void;
}
declare function initializeCacheManager(config?: CacheManagerConfig): AppCacheManager;

export { AppCacheManager, AppCacheManager as default, initializeCacheManager };
