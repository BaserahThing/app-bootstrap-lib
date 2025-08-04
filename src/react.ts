/**
 * Runtime-Free Manifest Access System
 * Created: 2024-12-19
 * Purpose: Provides manifest access without React dependencies
 *          Works with any framework or vanilla JavaScript
 */

// Types for the enhanced manifest
interface EnhancedAssetManifest {
    js: Record<string, string>;
    css: Record<string, string>;
    loadingSequence: {
        js: string[];
        css: string[];
    };
    buildInfo: {
        appName: string;
        compressionEnabled: boolean;
        spaHandlerCompatible: boolean;
        timestamp: number;
    };
    spaHandler: {
        rootPath: string;
        fallbackFile: string;
        enableCompression: boolean;
        enableCaching: boolean;
        cacheMaxAge: number;
        systemFiles: string[];
    };
    pwa: {
        enabled: boolean;
        manifestFile: string;
        serviceWorkerFile: string;
        workboxFile: string;
    };
}

interface LoadingState {
    isLoaded: boolean;
    isLoading: boolean;
    progress: number;
    currentChunk: string;
    loadedChunks: string[];
    totalChunks: number;
    error: string | null;
    startTime: number;
}

interface BootstrapEvents {
    on: (event: string, callback: (data: any) => void) => void;
    emit: (event: string, data: any) => void;
}

// Global types for the bootstrap system
declare global {
    interface Window {
        ASSET_MANIFEST: EnhancedAssetManifest;
        APP_BOOTSTRAP_LOADING_STATE: LoadingState;
        APP_BOOTSTRAP_EVENTS: BootstrapEvents;
        APP_BOOTSTRAP_READY: boolean;
    }
}

// Runtime-free manifest access functions
export function getAssetManifest(): EnhancedAssetManifest | null {
    return window.ASSET_MANIFEST || null;
}

export function getLoadingState(): LoadingState | null {
    return window.APP_BOOTSTRAP_LOADING_STATE || null;
}

export function isAppReady(): boolean {
    return window.APP_BOOTSTRAP_READY === true;
}

export function getSPAHandlerConfig() {
    const manifest = getAssetManifest();
    return manifest?.spaHandler || null;
}

export function getPWAConfig() {
    const manifest = getAssetManifest();
    return manifest?.pwa || null;
}

export function getBuildInfo() {
    const manifest = getAssetManifest();
    return manifest?.buildInfo || null;
}

export function getCompressionStatus() {
    const manifest = getAssetManifest();
    return {
        enabled: manifest?.buildInfo.compressionEnabled || false,
        spaHandlerEnabled: manifest?.spaHandler.enableCompression || false
    };
}

export function getSystemFiles() {
    const manifest = getAssetManifest();
    return manifest?.spaHandler.systemFiles || [];
}

export function isSystemFile(filename: string): boolean {
    const systemFiles = getSystemFiles();
    return systemFiles.includes(filename);
}

export function getAssetUrls() {
    const manifest = getAssetManifest();
    return {
        js: manifest?.js || {},
        css: manifest?.css || {},
        loadingSequence: manifest?.loadingSequence || { js: [], css: [] }
    };
}

export function getSPAHandlerCompatibility() {
    const manifest = getAssetManifest();
    return {
        compatible: manifest?.buildInfo.spaHandlerCompatible || false,
        rootPath: manifest?.spaHandler.rootPath || '/',
        fallbackFile: manifest?.spaHandler.fallbackFile || 'index.html'
    };
}

export function getCacheConfig() {
    const manifest = getAssetManifest();
    return {
        enabled: manifest?.spaHandler.enableCaching || false,
        maxAge: manifest?.spaHandler.cacheMaxAge || 86400
    };
}

export function triggerAssetReload() {
    if (window.APP_BOOTSTRAP_EVENTS) {
        window.APP_BOOTSTRAP_EVENTS.emit('reload:requested', { timestamp: Date.now() });
    }
}

export async function getUnifiedManifest() {
    try {
        const response = await fetch('/unified-manifest.json');
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        console.warn('Failed to fetch unified manifest:', error);
    }
    return null;
}

// Event listener utilities for framework integration
export function onBootstrapEvent(event: string, callback: (data: any) => void) {
    if (window.APP_BOOTSTRAP_EVENTS) {
        window.APP_BOOTSTRAP_EVENTS.on(event, callback);
    }
}

export function onLoadingProgress(callback: (data: { progress: number }) => void) {
    onBootstrapEvent('loading:progress', callback);
}

export function onLoadingComplete(callback: () => void) {
    onBootstrapEvent('loading:complete', callback);
}

export function onAppReady(callback: () => void) {
    if (isAppReady()) {
        callback();
    } else {
        onLoadingComplete(callback);
    }
}

// React-like hooks for framework compatibility
// These are just wrappers around the runtime-free functions
export function useAssetManifest(): EnhancedAssetManifest | null {
    return getAssetManifest();
}

export function useLoadingState(): LoadingState | null {
    return getLoadingState();
}

export function useAppReady(): boolean {
    return isAppReady();
}

export function useSPAHandlerConfig() {
    return getSPAHandlerConfig();
}

export function usePWAConfig() {
    return getPWAConfig();
}

export function useAssetReload() {
    return triggerAssetReload;
}

export function useBuildInfo() {
    return getBuildInfo();
}

export function useCompressionStatus() {
    return getCompressionStatus();
}

export function useSystemFiles() {
    return getSystemFiles();
}

export function useIsSystemFile() {
    return isSystemFile;
}

export function useAssetUrls() {
    return getAssetUrls();
}

export function useUnifiedManifest() {
    // This would need to be implemented with React's useState/useEffect
    // For now, return a promise-based approach
    return getUnifiedManifest();
}

export function useSPAHandlerCompatibility() {
    return getSPAHandlerCompatibility();
}

export function useCacheConfig() {
    return getCacheConfig();
}

// Default export with all functions
export default {
    // Runtime-free functions
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

    // Event utilities
    onBootstrapEvent,
    onLoadingProgress,
    onLoadingComplete,
    onAppReady,

    // React-like hooks (for compatibility)
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
};
