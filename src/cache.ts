/**
 * Simplified Cache Manager
 * Created: 2024-12-19
 * Purpose: Unified cache management for app bootstrap
 */

import type { CacheManagerConfig, CacheManager } from './types';

export class AppCacheManager implements CacheManager {
    private loadingElement: HTMLElement | null;
    private config: CacheManagerConfig;

    constructor(config: CacheManagerConfig = {}) {
        this.config = {
            cacheName: 'app-bootstrap-v1',
            appVersion: '1.0.0',
            enableServiceWorker: true,
            loadingScreen: {
                theme: 'gradient'
            },
            ...config
        };

        this.loadingElement = null;
    }

    async init(): Promise<void> {
        console.log('App Cache Manager initializing...');

        // Check if loading screen already exists to prevent duplicates
        const existingLoadingScreen = document.getElementById('loading-screen');
        if (!existingLoadingScreen) {
            this.setupLoadingScreen();
        } else {
            this.loadingElement = existingLoadingScreen;
        }

        await this.loadApp();
    }

    private setupLoadingScreen(): void {
        const theme = this.config.loadingScreen?.theme || 'gradient';
        const customHTML = this.config.loadingScreen?.customHTML;

        const loadingHTML = customHTML || this.getDefaultLoadingHTML(theme);
        document.body.insertAdjacentHTML('afterbegin', loadingHTML);
        this.loadingElement = document.getElementById('loading-screen');
    }

    private getDefaultLoadingHTML(theme: string): string {
        const baseStyles = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: white;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      z-index: 9999;
    `;

        const background = theme === 'gradient'
            ? 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);'
            : 'background: #2c3e50;';

        return `
      <div id="loading-screen" style="${baseStyles} ${background}">
        <div style="
          width: 40px;
          height: 40px;
          border: 4px solid rgba(255, 255, 255, 0.3);
          border-top: 4px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 20px;
        "></div>
        <p id="loading-text">Loading Application...</p>
        <style>
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        </style>
      </div>
    `;
    }

    updateLoadingText(text: string): void {
        const loadingText = document.getElementById('loading-text');
        if (loadingText) {
            loadingText.textContent = text;
        }
    }

    private async loadApp(): Promise<void> {
        this.updateLoadingText('Loading application...');

        // Wait for React app to be ready, then hide loading screen
        const checkAppReady = () => {
            const rootElement = document.getElementById('root');
            if (rootElement && rootElement.children.length > 0) {
                // Check if React app has rendered content
                const appContent = rootElement.querySelector('.app, .home-page, .system-config-page, .video-player-page');
                if (appContent) {
                    console.log('[CacheManager] App content detected, hiding loading screen');
                    this.hideLoadingScreen();
                    return true;
                }
            }
            return false;
        };

        // Try immediately
        if (checkAppReady()) return;

        // Poll for app content
        const pollInterval = setInterval(() => {
            if (checkAppReady()) {
                clearInterval(pollInterval);
            }
        }, 100);

        // Fallback timeout
        setTimeout(() => {
            clearInterval(pollInterval);
            console.log('[CacheManager] Fallback timeout, hiding loading screen');
            this.hideLoadingScreen();
        }, 3000);
    }

    hideLoadingScreen(): void {
        if (this.loadingElement) {
            this.loadingElement.style.opacity = '0';
            this.loadingElement.style.transition = 'opacity 0.3s ease-out';
            setTimeout(() => {
                if (this.loadingElement && this.loadingElement.parentNode) {
                    this.loadingElement.parentNode.removeChild(this.loadingElement);
                }
            }, 300);
        }
    }

    showError(message: string): void {
        if (this.loadingElement) {
            this.loadingElement.innerHTML = `
        <div style="text-align: center;">
          <h3>Error</h3>
          <p>${message}</p>
          <button onclick="location.reload()" style="
            background: white;
            color: #667eea;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 10px;
          ">Retry</button>
        </div>
      `;
        }
    }

    retry(): void {
        location.reload();
    }

    // Service Worker registration - removed to simplify
}

// Auto-initialize when DOM is ready
export function initializeCacheManager(config?: CacheManagerConfig): AppCacheManager {
    const manager = new AppCacheManager(config);

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            manager.init();
        });
    } else {
        manager.init();
    }

    return manager;
}

// Default export
export default AppCacheManager;
