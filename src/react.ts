/**
 * Simplified React Hooks for App Bootstrap
 * Created: 2024-12-19
 * Purpose: React integration for app bootstrap functionality
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import type { UseAppBootstrapReturn, LoadingState, AssetManifest, AppBootstrapConfig } from './types';

// Simple event emitter for app bootstrap events
class AppBootstrapEvents {
    private listeners: Record<string, Function[]> = {};

    on(event: string, callback: Function): () => void {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);

        return () => {
            this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
        };
    }

    emit(event: string, data?: any): void {
        if (this.listeners[event]) {
            this.listeners[event].forEach(callback => callback(data));
        }
    }
}

// Global event emitter instance
export const appBootstrapEvents = new AppBootstrapEvents();

// Utility functions
function getAssetManifest(): AssetManifest | null {
    return (window as any).ASSET_MANIFEST || null;
}

function isAppBootstrapReady(): boolean {
    return (window as any).APP_BOOTSTRAP_READY === true;
}

function getCurrentLoadingState(): LoadingState | null {
    return (window as any).APP_BOOTSTRAP_LOADING_STATE || null;
}

/**
 * Main hook for app bootstrap integration
 */
export function useAppBootstrap(config: AppBootstrapConfig = {}): UseAppBootstrapReturn {
    const [loadingState, setLoadingState] = useState<LoadingState>({
        isLoaded: false,
        isLoading: false,
        progress: 0,
        currentChunk: '',
        loadedChunks: [],
        totalChunks: 0,
        error: null,
        startTime: Date.now()
    });

    const [assetManifest, setAssetManifest] = useState<AssetManifest | null>(null);
    const [error, setError] = useState<string | null>(null);
    const isReady = useRef(false);

    // Initialize loading state
    useEffect(() => {
        const currentState = getCurrentLoadingState();
        const currentManifest = getAssetManifest();

        if (currentState) {
            setLoadingState(currentState);
        }

        if (currentManifest) {
            setAssetManifest(currentManifest);
        }

        // Check if already ready
        if (isAppBootstrapReady()) {
            isReady.current = true;
            setLoadingState(prev => ({
                ...prev,
                isLoaded: true,
                isLoading: false,
                progress: 100
            }));
        }
    }, []);

    // Set up event listeners
    useEffect(() => {
        const unsubscribeStart = appBootstrapEvents.on('loading:start', (_event: any) => {
            setLoadingState(prev => ({
                ...prev,
                isLoading: true,
                isLoaded: false,
                startTime: Date.now(),
                error: null
            }));
            setError(null);
        });

        const unsubscribeProgress = appBootstrapEvents.on('loading:progress', (event: any) => {
            setLoadingState(prev => ({
                ...prev,
                progress: event.data?.progress || prev.progress
            }));
        });

        const unsubscribeComplete = appBootstrapEvents.on('loading:complete', (_event: any) => {
            isReady.current = true;
            setLoadingState(prev => ({
                ...prev,
                isLoaded: true,
                isLoading: false,
                progress: 100,
                endTime: Date.now(),
                duration: Date.now() - prev.startTime
            }));
        });

        const unsubscribeError = appBootstrapEvents.on('loading:error', (event: any) => {
            const errorMessage = event.data?.error || 'Unknown loading error';
            setError(errorMessage);
            setLoadingState(prev => ({
                ...prev,
                isLoading: false,
                error: errorMessage
            }));
        });

        const unsubscribeManifestLoaded = appBootstrapEvents.on('manifest:loaded', (event: any) => {
            setAssetManifest(event.data?.manifest);
        });

        // Cleanup function
        return () => {
            unsubscribeStart();
            unsubscribeProgress();
            unsubscribeComplete();
            unsubscribeError();
            unsubscribeManifestLoaded();
        };
    }, []);

    // Poll for asset manifest if not available
    useEffect(() => {
        if (assetManifest || !config.enableDebug) return;

        const pollInterval = setInterval(() => {
            const manifest = getAssetManifest();
            if (manifest) {
                setAssetManifest(manifest);
                clearInterval(pollInterval);
            }
        }, 100);

        return () => clearInterval(pollInterval);
    }, [assetManifest, config.enableDebug]);

    // Development mode detection and ready state
    useEffect(() => {
        if (isReady.current) return;

        // In development mode, detect when React app is mounted and ready
        const checkDevReady = () => {
            // Check if React app is mounted and DOM is ready
            const rootElement = document.getElementById('root');
            if (rootElement && rootElement.children.length > 0) {
                // Check if the app content is actually rendered
                const appContent = rootElement.querySelector('.app, .home-page, .system-config-page, .video-player-page');
                if (appContent) {
                    console.log('[useAppBootstrap] Development mode: App content detected, marking as ready');
                    isReady.current = true;
                    setLoadingState(prev => ({
                        ...prev,
                        isLoaded: true,
                        isLoading: false,
                        progress: 100,
                        endTime: Date.now(),
                        duration: Date.now() - prev.startTime
                    }));
                    return true;
                }
            }
            return false;
        };

        // Try immediately
        if (checkDevReady()) return;

        // Poll for app content in development mode
        const pollInterval = setInterval(() => {
            if (checkDevReady()) {
                clearInterval(pollInterval);
            }
        }, 100);

        // Fallback timeout
        const timeout = setTimeout(() => {
            clearInterval(pollInterval);
            if (!isReady.current) {
                console.log('[useAppBootstrap] Development mode: Fallback timeout, marking as ready');
                isReady.current = true;
                setLoadingState(prev => ({
                    ...prev,
                    isLoaded: true,
                    isLoading: false,
                    progress: 100,
                    endTime: Date.now(),
                    duration: Date.now() - prev.startTime
                }));
            }
        }, 3000); // 3 second timeout

        return () => {
            clearInterval(pollInterval);
            clearTimeout(timeout);
        };
    }, []);

    // Retry function
    const retry = useCallback(() => {
        setError(null);
        setLoadingState(prev => ({
            ...prev,
            error: null,
            isLoading: true,
            isLoaded: false,
            startTime: Date.now()
        }));

        appBootstrapEvents.emit('loading:retry', { timestamp: Date.now() });
    }, []);

    // Get chunk progress
    const getChunkProgress = useCallback((chunkName: string): number => {
        if (!assetManifest) return 0;
        const chunk = assetManifest.js[chunkName];
        return chunk ? 100 : 0;
    }, [assetManifest]);

    // Get overall progress
    const getOverallProgress = useCallback((): number => {
        return loadingState.progress;
    }, [loadingState.progress]);

    // Debug logging
    useEffect(() => {
        if (config.enableDebug) {
            console.log('[useAppBootstrap] Loading state:', loadingState);
            console.log('[useAppBootstrap] Asset manifest:', assetManifest);
            console.log('[useAppBootstrap] Error:', error);
        }
    }, [loadingState, assetManifest, error, config.enableDebug]);

    return {
        loadingState,
        assetManifest,
        isReady: isReady.current,
        error,
        retry,
        getChunkProgress,
        getOverallProgress
    };
}

/**
 * Simplified hook for basic app bootstrap status
 */
export function useAppBootstrapStatus() {
    const { loadingState, isReady, error } = useAppBootstrap();

    return {
        isReady,
        isLoading: loadingState.isLoading,
        isLoaded: loadingState.isLoaded,
        progress: loadingState.progress,
        error,
        currentChunk: loadingState.currentChunk
    };
}

/**
 * Hook for app bootstrap with custom configuration
 */
export function useAppBootstrapWithConfig(config: AppBootstrapConfig) {
    return useAppBootstrap(config);
}

// Export event emitter for external use
// Note: appBootstrapEvents is already exported above
