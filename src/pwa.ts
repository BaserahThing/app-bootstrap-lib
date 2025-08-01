/**
 * PWA Bootstrap Kit - PWA Module
 * Created: 2024-12-19
 * Purpose: PWA-specific functionality including service worker registration, manifest generation, and install prompts
 *
 * This module can be disabled from project vite config by setting enablePWA: false
 */

// PWA-specific types and functionality

/**
 * PWA Configuration Options
 */
export interface PWAConfig {
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
export class PWAManager {
    private config: PWAConfig;
    private deferredPrompt: any = null;
    private installPromptElement: HTMLElement | null = null;

    constructor(config: PWAConfig = {}) {
        this.config = {
            enablePWA: true,
            manifest: {
                name: 'Progressive Web App',
                display: 'standalone',
                theme_color: '#000000',
                background_color: '#ffffff'
            },
            serviceWorker: {
                enabled: true,
                src: '/sw.js',
                scope: '/',
                updateStrategy: 'all',
                skipWaiting: true,
                clientsClaim: true
            },
            installPrompt: {
                enabled: true,
                text: 'Install this app for a better experience',
                buttonText: 'Install',
                position: 'bottom'
            },
            ...config
        };
    }

    /**
     * Initialize PWA functionality
     */
    async init(): Promise<void> {
        if (!this.config.enablePWA) {
            console.log('PWA functionality is disabled');
            return;
        }

        try {
            // Register service worker if enabled
            if (this.config.serviceWorker?.enabled) {
                await this.registerServiceWorker();
            }

            // Set up install prompt if enabled
            if (this.config.installPrompt?.enabled) {
                this.setupInstallPrompt();
            }

            console.log('PWA functionality initialized successfully');
        } catch (error) {
            console.error('Failed to initialize PWA functionality:', error);
        }
    }

    /**
     * Register service worker
     */
    private async registerServiceWorker(): Promise<void> {
        if (!('serviceWorker' in navigator)) {
            console.warn('Service Worker not supported');
            return;
        }

        try {
            const registration = await navigator.serviceWorker.register(
                this.config.serviceWorker!.src!,
                { scope: this.config.serviceWorker!.scope! }
            );

            console.log('Service Worker registered:', registration);

            // Handle service worker updates
            registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing;
                if (newWorker) {
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            // New service worker available
                            this.showUpdatePrompt();
                        }
                    });
                }
            });
        } catch (error) {
            console.error('Service Worker registration failed:', error);
        }
    }

    /**
     * Set up install prompt
     */
    private setupInstallPrompt(): void {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            this.showInstallPrompt();
        });

        window.addEventListener('appinstalled', () => {
            console.log('App was installed');
            this.hideInstallPrompt();
        });
    }

    /**
     * Show install prompt
     */
    private showInstallPrompt(): void {
        if (!this.deferredPrompt || !this.config.installPrompt?.enabled) {
            return;
        }

        // Create install prompt element
        this.installPromptElement = document.createElement('div');
        this.installPromptElement.className = 'pwa-install-prompt';
        this.installPromptElement.innerHTML = `
      <div class="pwa-install-content">
        <p>${this.config.installPrompt.text}</p>
        <button class="pwa-install-button">${this.config.installPrompt.buttonText}</button>
        <button class="pwa-install-dismiss">Dismiss</button>
      </div>
    `;

        // Add styles
        this.installPromptElement.style.cssText = `
      position: fixed;
      ${this.config.installPrompt.position}: 20px;
      left: 20px;
      right: 20px;
      background: white;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 10000;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    `;

        // Add event listeners
        const installButton = this.installPromptElement.querySelector('.pwa-install-button');
        const dismissButton = this.installPromptElement.querySelector('.pwa-install-dismiss');

        installButton?.addEventListener('click', () => this.installApp());
        dismissButton?.addEventListener('click', () => this.hideInstallPrompt());

        document.body.appendChild(this.installPromptElement);
    }

    /**
     * Hide install prompt
     */
    private hideInstallPrompt(): void {
        if (this.installPromptElement) {
            this.installPromptElement.remove();
            this.installPromptElement = null;
        }
    }

    /**
     * Install app
     */
    private async installApp(): Promise<void> {
        if (!this.deferredPrompt) {
            return;
        }

        this.deferredPrompt.prompt();
        const { outcome } = await this.deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            console.log('User accepted the install prompt');
        } else {
            console.log('User dismissed the install prompt');
        }

        this.deferredPrompt = null;
        this.hideInstallPrompt();
    }

    /**
     * Show update prompt
     */
    private showUpdatePrompt(): void {
        const updatePrompt = document.createElement('div');
        updatePrompt.className = 'pwa-update-prompt';
        updatePrompt.innerHTML = `
      <div class="pwa-update-content">
        <p>A new version is available!</p>
        <button class="pwa-update-button">Update Now</button>
        <button class="pwa-update-dismiss">Later</button>
      </div>
    `;

        updatePrompt.style.cssText = `
      position: fixed;
      top: 20px;
      left: 20px;
      right: 20px;
      background: #4CAF50;
      color: white;
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 10000;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    `;

        const updateButton = updatePrompt.querySelector('.pwa-update-button');
        const dismissButton = updatePrompt.querySelector('.pwa-update-dismiss');

        updateButton?.addEventListener('click', () => {
            window.location.reload();
        });

        dismissButton?.addEventListener('click', () => {
            updatePrompt.remove();
        });

        document.body.appendChild(updatePrompt);
    }

    /**
     * Check if app is installed
     */
    isInstalled(): boolean {
        return window.matchMedia('(display-mode: standalone)').matches ||
            (window.navigator as any).standalone === true;
    }

    /**
     * Get PWA status
     */
    getStatus(): {
        isInstalled: boolean;
        isOnline: boolean;
        hasServiceWorker: boolean;
    } {
        return {
            isInstalled: this.isInstalled(),
            isOnline: navigator.onLine,
            hasServiceWorker: 'serviceWorker' in navigator
        };
    }
}

/**
 * Initialize PWA functionality
 * @param config PWA configuration options
 */
export function initializePWA(config?: PWAConfig): PWAManager {
    const pwaManager = new PWAManager(config);
    pwaManager.init();
    return pwaManager;
}

/**
 * Create PWA manifest
 * @param config PWA configuration
 */
export function createPWAManifest(config: PWAConfig): any {
    if (!config.manifest) {
        return null;
    }

    return {
        name: config.manifest.name,
        short_name: config.manifest.short_name || config.manifest.name,
        description: config.manifest.description,
        theme_color: config.manifest.theme_color,
        background_color: config.manifest.background_color,
        display: config.manifest.display,
        orientation: config.manifest.orientation,
        scope: config.manifest.scope || '/',
        start_url: config.manifest.start_url || '/',
        icons: config.manifest.icons || []
    };
}

// Default export
export default {
    PWAManager,
    initializePWA,
    createPWAManifest
};
