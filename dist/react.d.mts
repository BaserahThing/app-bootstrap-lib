/**
 * Runtime-Free Manifest Access System
 * Created: 2024-12-19
 * Purpose: Provides manifest access without React dependencies
 *          Works with any framework or vanilla JavaScript
 */
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
declare global {
    interface Window {
        ASSET_MANIFEST: EnhancedAssetManifest;
        APP_BOOTSTRAP_LOADING_STATE: LoadingState;
        APP_BOOTSTRAP_EVENTS: BootstrapEvents;
        APP_BOOTSTRAP_READY: boolean;
    }
}
declare function getAssetManifest(): EnhancedAssetManifest | null;
declare function getLoadingState(): LoadingState | null;
declare function isAppReady(): boolean;
declare function getSPAHandlerConfig(): {
    rootPath: string;
    fallbackFile: string;
    enableCompression: boolean;
    enableCaching: boolean;
    cacheMaxAge: number;
    systemFiles: string[];
} | null;
declare function getPWAConfig(): {
    enabled: boolean;
    manifestFile: string;
    serviceWorkerFile: string;
    workboxFile: string;
} | null;
declare function getBuildInfo(): {
    appName: string;
    compressionEnabled: boolean;
    spaHandlerCompatible: boolean;
    timestamp: number;
} | null;
declare function getCompressionStatus(): {
    enabled: boolean;
    spaHandlerEnabled: boolean;
};
declare function getSystemFiles(): string[];
declare function isSystemFile(filename: string): boolean;
declare function getAssetUrls(): {
    js: Record<string, string>;
    css: Record<string, string>;
    loadingSequence: {
        js: string[];
        css: string[];
    };
};
declare function getSPAHandlerCompatibility(): {
    compatible: boolean;
    rootPath: string;
    fallbackFile: string;
};
declare function getCacheConfig(): {
    enabled: boolean;
    maxAge: number;
};
declare function triggerAssetReload(): void;
declare function getUnifiedManifest(): Promise<any>;
declare function onBootstrapEvent(event: string, callback: (data: any) => void): void;
declare function onLoadingProgress(callback: (data: {
    progress: number;
}) => void): void;
declare function onLoadingComplete(callback: () => void): void;
declare function onAppReady(callback: () => void): void;
declare function useAssetManifest(): EnhancedAssetManifest | null;
declare function useLoadingState(): LoadingState | null;
declare function useAppReady(): boolean;
declare function useSPAHandlerConfig(): {
    rootPath: string;
    fallbackFile: string;
    enableCompression: boolean;
    enableCaching: boolean;
    cacheMaxAge: number;
    systemFiles: string[];
} | null;
declare function usePWAConfig(): {
    enabled: boolean;
    manifestFile: string;
    serviceWorkerFile: string;
    workboxFile: string;
} | null;
declare function useAssetReload(): typeof triggerAssetReload;
declare function useBuildInfo(): {
    appName: string;
    compressionEnabled: boolean;
    spaHandlerCompatible: boolean;
    timestamp: number;
} | null;
declare function useCompressionStatus(): {
    enabled: boolean;
    spaHandlerEnabled: boolean;
};
declare function useSystemFiles(): string[];
declare function useIsSystemFile(): typeof isSystemFile;
declare function useAssetUrls(): {
    js: Record<string, string>;
    css: Record<string, string>;
    loadingSequence: {
        js: string[];
        css: string[];
    };
};
declare function useUnifiedManifest(): Promise<any>;
declare function useSPAHandlerCompatibility(): {
    compatible: boolean;
    rootPath: string;
    fallbackFile: string;
};
declare function useCacheConfig(): {
    enabled: boolean;
    maxAge: number;
};
declare const _default: {
    getAssetManifest: typeof getAssetManifest;
    getLoadingState: typeof getLoadingState;
    isAppReady: typeof isAppReady;
    getSPAHandlerConfig: typeof getSPAHandlerConfig;
    getPWAConfig: typeof getPWAConfig;
    getBuildInfo: typeof getBuildInfo;
    getCompressionStatus: typeof getCompressionStatus;
    getSystemFiles: typeof getSystemFiles;
    isSystemFile: typeof isSystemFile;
    getAssetUrls: typeof getAssetUrls;
    getSPAHandlerCompatibility: typeof getSPAHandlerCompatibility;
    getCacheConfig: typeof getCacheConfig;
    triggerAssetReload: typeof triggerAssetReload;
    getUnifiedManifest: typeof getUnifiedManifest;
    onBootstrapEvent: typeof onBootstrapEvent;
    onLoadingProgress: typeof onLoadingProgress;
    onLoadingComplete: typeof onLoadingComplete;
    onAppReady: typeof onAppReady;
    useAssetManifest: typeof useAssetManifest;
    useLoadingState: typeof useLoadingState;
    useAppReady: typeof useAppReady;
    useSPAHandlerConfig: typeof useSPAHandlerConfig;
    usePWAConfig: typeof usePWAConfig;
    useAssetReload: typeof useAssetReload;
    useBuildInfo: typeof useBuildInfo;
    useCompressionStatus: typeof useCompressionStatus;
    useSystemFiles: typeof useSystemFiles;
    useIsSystemFile: typeof useIsSystemFile;
    useAssetUrls: typeof useAssetUrls;
    useUnifiedManifest: typeof useUnifiedManifest;
    useSPAHandlerCompatibility: typeof useSPAHandlerCompatibility;
    useCacheConfig: typeof useCacheConfig;
};

export { _default as default, getAssetManifest, getAssetUrls, getBuildInfo, getCacheConfig, getCompressionStatus, getLoadingState, getPWAConfig, getSPAHandlerCompatibility, getSPAHandlerConfig, getSystemFiles, getUnifiedManifest, isAppReady, isSystemFile, onAppReady, onBootstrapEvent, onLoadingComplete, onLoadingProgress, triggerAssetReload, useAppReady, useAssetManifest, useAssetReload, useAssetUrls, useBuildInfo, useCacheConfig, useCompressionStatus, useIsSystemFile, useLoadingState, usePWAConfig, useSPAHandlerCompatibility, useSPAHandlerConfig, useSystemFiles, useUnifiedManifest };
