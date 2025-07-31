import { a as AppBootstrapConfig, U as UseAppBootstrapReturn } from './types-D8l6ur8u.js';

/**
 * Simplified React Hooks for App Bootstrap
 * Created: 2024-12-19
 * Purpose: React integration for app bootstrap functionality
 */

declare class AppBootstrapEvents {
    private listeners;
    on(event: string, callback: Function): () => void;
    emit(event: string, data?: any): void;
}
declare const appBootstrapEvents: AppBootstrapEvents;
/**
 * Main hook for app bootstrap integration
 */
declare function useAppBootstrap(config?: AppBootstrapConfig): UseAppBootstrapReturn;
/**
 * Simplified hook for basic app bootstrap status
 */
declare function useAppBootstrapStatus(): {
    isReady: boolean;
    isLoading: boolean;
    isLoaded: boolean;
    progress: number;
    error: string | null;
    currentChunk: string;
};
/**
 * Hook for app bootstrap with custom configuration
 */
declare function useAppBootstrapWithConfig(config: AppBootstrapConfig): UseAppBootstrapReturn;

export { appBootstrapEvents, useAppBootstrap, useAppBootstrapStatus, useAppBootstrapWithConfig };
