/**
 * Unified App Bootstrap Library Types
 * Created: 2024-12-19
 * Purpose: Shared types for app bootstrap functionality
 */

// Core types
export interface LoadingState {
    isLoaded: boolean;
    isLoading: boolean;
    progress: number;
    currentChunk: string;
    loadedChunks: string[];
    totalChunks: number;
    error: string | null;
    startTime: number;
    endTime?: number;
    duration?: number;
}

export interface AssetManifest {
    js: Record<string, string>;
    css: Record<string, string>;
    loadingSequence: {
        js: string[];
        css: string[];
    };
    totalOriginalSize: number;
    buildInfo: {
        timestamp: number;
        version: string;
        appName: string;
        compressionEnabled: boolean;
        chunksGenerated: number;
        plugin: string;
    };
}

export interface AppBootstrapConfig {
    enableDebug?: boolean;
    enableProgress?: boolean;
    enableFallback?: boolean;
    appName?: string;
    loadingTheme?: 'gradient' | 'minimal' | 'custom';
    customTheme?: string;
}

// Vite plugin types
export interface AppBootstrapOptions {
    enableGzip?: boolean;
    enableProgress?: boolean;
    enableFallback?: boolean;
    debugMode?: boolean;
    appName?: string;
    appIcon?: string;
    loadingTheme?: 'gradient' | 'minimal' | 'custom';
    customTheme?: string;
    enableCDNFallback?: boolean;
    compressionFirst?: boolean;
    customChunks?: Record<string, string[]>;
    chunkPriorities?: Record<string, number>;
    assetPrefix?: string;
    bootstrapFileName?: string;
    gzipLoaderConfig?: {
        debugMode?: boolean;
        useGzip?: boolean;
        fallbackToUncompressed?: boolean;
        timeout?: number;
        retries?: number;
    };
}

// React hook return types
export interface UseAppBootstrapReturn {
    loadingState: LoadingState;
    assetManifest: AssetManifest | null;
    isReady: boolean;
    error: string | null;
    retry: () => void;
    getChunkProgress: (chunkName: string) => number;
    getOverallProgress: () => number;
}

// Cache manager types
export interface CacheManagerConfig {
    cacheName?: string;
    appVersion?: string;
    enableServiceWorker?: boolean;
    loadingScreen?: {
        theme?: 'gradient' | 'minimal' | 'custom';
        customHTML?: string;
    };
}

export interface CacheManager {
    init(): Promise<void>;
    updateLoadingText(text: string): void;
    hideLoadingScreen(): void;
    showError(message: string): void;
    retry(): void;
}
