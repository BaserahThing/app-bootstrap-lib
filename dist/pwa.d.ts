/**
 * PWA Bootstrap Kit - PWA Module
 * Created: 2024-12-19
 * Purpose: PWA-specific functionality including service worker registration, manifest generation, and install prompts
 *
 * This module can be disabled from project vite config by setting enablePWA: false
 */
/**
 * PWA Configuration Options
 */
interface PWAConfig {
    /** Enable PWA functionality (can be disabled from project config) */
    enablePWA?: boolean;
    /** PWA manifest configuration */
    manifest?: {
        name: string;
        short_name?: string;
        description?: string;
        theme_color?: string;
        background_color?: string;
        display?: 'standalone' | 'fullscreen' | 'minimal-ui' | 'browser';
        orientation?: 'portrait' | 'landscape' | 'any';
        scope?: string;
        start_url?: string;
        icons?: Array<{
            src: string;
            sizes: string;
            type?: string;
            purpose?: string;
        }>;
    };
    /** Service worker configuration */
    serviceWorker?: {
        /** Enable service worker registration */
        enabled?: boolean;
        /** Service worker file path */
        src?: string;
        /** Service worker scope */
        scope?: string;
        /** Update strategy */
        updateStrategy?: 'all' | 'hierarchical' | 'minimal';
        /** Skip waiting for service worker updates */
        skipWaiting?: boolean;
        /** Clients claim strategy */
        clientsClaim?: boolean;
    };
    /** Install prompt configuration */
    installPrompt?: {
        /** Enable install prompt */
        enabled?: boolean;
        /** Custom install prompt text */
        text?: string;
        /** Install prompt button text */
        buttonText?: string;
        /** Install prompt position */
        position?: 'top' | 'bottom' | 'center';
    };
}
/**
 * PWA Manager Class
 * Handles PWA-specific functionality including service worker registration and install prompts
 */
declare class PWAManager {
    private config;
    private deferredPrompt;
    private installPromptElement;
    constructor(config?: PWAConfig);
    /**
     * Initialize PWA functionality
     */
    init(): Promise<void>;
    /**
     * Register service worker
     */
    private registerServiceWorker;
    /**
     * Set up install prompt
     */
    private setupInstallPrompt;
    /**
     * Show install prompt
     */
    private showInstallPrompt;
    /**
     * Hide install prompt
     */
    private hideInstallPrompt;
    /**
     * Install app
     */
    private installApp;
    /**
     * Show update prompt
     */
    private showUpdatePrompt;
    /**
     * Check if app is installed
     */
    isInstalled(): boolean;
    /**
     * Get PWA status
     */
    getStatus(): {
        isInstalled: boolean;
        isOnline: boolean;
        hasServiceWorker: boolean;
    };
}
/**
 * Initialize PWA functionality
 * @param config PWA configuration options
 */
declare function initializePWA(config?: PWAConfig): PWAManager;
/**
 * Create PWA manifest
 * @param config PWA configuration
 */
declare function createPWAManifest(config: PWAConfig): any;
declare const _default: {
    PWAManager: typeof PWAManager;
    initializePWA: typeof initializePWA;
    createPWAManifest: typeof createPWAManifest;
};

export { type PWAConfig, PWAManager, createPWAManifest, _default as default, initializePWA };
