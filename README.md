# @basirah/vite-pwa-bootstrap

🚀 **Vite PWA Bootstrap Toolkit** - Everything you need to create seamless Progressive Web App experiences with Vite, React, and advanced caching strategies.

[![npm version](https://img.shields.io/npm/v/@basirah/vite-pwa-bootstrap.svg)](https://www.npmjs.com/package/@basirah/vite-pwa-bootstrap)
[![GitHub stars](https://img.shields.io/github/stars/BaserahThing/vite-pwa-bootstrap.svg)](https://github.com/BaserahThing/vite-pwa-bootstrap)
[![CI](https://github.com/BaserahThing/vite-pwa-bootstrap/actions/workflows/ci.yml/badge.svg)](https://github.com/BaserahThing/vite-pwa-bootstrap/actions/workflows/ci.yml)

## ✨ Features

- **🎯 Vite Plugin**: Automatic asset manifest generation and loading optimization
- **⚛️ React Hooks**: Easy integration with React applications
- **💾 Cache Manager**: Intelligent loading screens and service worker management
- **📱 PWA Module**: Service worker registration, install prompts, and manifest generation
- **🔧 Workbox Integration**: Advanced service worker functionality with caching strategies
- **🎨 Customizable**: Multiple themes and extensive configuration options
- **🚫 Disableable**: PWA functionality can be disabled from project config

## 📦 Installation

```bash
npm install @basirah/vite-pwa-bootstrap
```

## 🚀 Quick Start

### 1. Basic Vite Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { appBootstrapPlugin } from '@basirah/vite-pwa-bootstrap';

export default defineConfig({
  plugins: [
    react(),
    appBootstrapPlugin({
      appName: 'My Amazing PWA',
      loadingTheme: 'gradient',
      debugMode: true,
      // PWA configuration
      pwa: {
        enablePWA: true, // Can be disabled from project config
        manifest: {
          name: 'My Amazing PWA',
          short_name: 'MyPWA',
          description: 'An amazing Progressive Web App',
          theme_color: '#667eea',
          background_color: '#ffffff',
          icons: [
            {
              src: '/icon-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            }
          ]
        },
        serviceWorker: {
          enabled: true,
          src: '/sw.js',
          scope: '/'
        },
        installPrompt: {
          enabled: true,
          text: 'Install this app for a better experience',
          buttonText: 'Install',
          position: 'bottom'
        }
      }
    })
  ]
});
```

### 2. React Integration

```tsx
// App.tsx
import { useAppBootstrap } from '@basirah/vite-pwa-bootstrap';

function App() {
  const { loadingState, isReady, error, retry } = useAppBootstrap({
    enableDebug: true
  });

  if (!isReady) {
    return (
      <div className="loading-screen">
        <div className="spinner" />
        <p>Loading... {loadingState.progress}%</p>
        {error && (
          <div className="error">
            <p>Error: {error}</p>
            <button onClick={retry}>Retry</button>
          </div>
        )}
      </div>
    );
  }

  return <div>Your app is ready! 🎉</div>;
}
```

### 3. PWA Initialization

```typescript
// main.ts
import { initializePWA } from '@basirah/vite-pwa-bootstrap';

// Initialize PWA functionality
const pwaManager = initializePWA({
  enablePWA: true,
  manifest: {
    name: 'My PWA',
    theme_color: '#667eea'
  },
  serviceWorker: {
    enabled: true,
    src: '/sw.js'
  },
  installPrompt: {
    enabled: true,
    text: 'Install this app for a better experience'
  }
});

// Check PWA status
const status = pwaManager.getStatus();
console.log('PWA Status:', status);
```

## 📚 API Reference

### Vite Plugin Configuration

```typescript
interface PWAAppBootstrapOptions {
  // Basic configuration
  appName?: string;
  loadingTheme?: 'gradient' | 'minimal' | 'custom';
  customTheme?: string;
  debugMode?: boolean;

  // Asset optimization
  enableGzip?: boolean;
  enableProgress?: boolean;
  enableFallback?: boolean;
  assetPrefix?: string;
  bootstrapFileName?: string;

  // Chunk configuration
  customChunks?: Record<string, string[]>;
  chunkPriorities?: Record<string, number>;

  // PWA configuration
  pwa?: PWAConfig;

  // Workbox configuration
  workbox?: WorkboxOptions;
}
```

### PWA Configuration

```typescript
interface PWAConfig {
  /** Enable/disable PWA functionality */
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
    enabled?: boolean;
    src?: string;
    scope?: string;
    updateStrategy?: 'all' | 'hierarchical' | 'minimal';
    skipWaiting?: boolean;
    clientsClaim?: boolean;
  };

  /** Install prompt configuration */
  installPrompt?: {
    enabled?: boolean;
    text?: string;
    buttonText?: string;
    position?: 'top' | 'bottom' | 'center';
  };
}
```

### React Hooks

#### useAppBootstrap

```typescript
const {
  loadingState,      // Current loading state
  assetManifest,     // Asset manifest data
  isReady,          // Whether app is ready
  error,            // Loading error if any
  retry,            // Retry function
  getChunkProgress, // Get progress for specific chunk
  getOverallProgress // Get overall progress
} = useAppBootstrap({
  enableDebug: true  // Enable debug logging
});
```

#### useAppBootstrapStatus

```typescript
const {
  isReady,
  isLoading,
  isLoaded,
  progress,
  error,
  currentChunk
} = useAppBootstrapStatus();
```

### Cache Manager

```typescript
import { AppCacheManager } from '@basirah/vite-pwa-bootstrap';

const manager = new AppCacheManager({
  cacheName: 'my-pwa-v1',
  appVersion: '1.0.0',
  enableServiceWorker: true,
  loadingScreen: {
    theme: 'gradient',
    customHTML: '<div>Custom loading...</div>'
  }
});

await manager.init();
manager.updateLoadingText('Loading...');
manager.hideLoadingScreen();
manager.showError('Something went wrong');
manager.retry();
```

### PWA Manager

```typescript
import { PWAManager } from '@basirah/vite-pwa-bootstrap';

const pwaManager = new PWAManager({
  enablePWA: true,
  manifest: {
    name: 'My PWA',
    theme_color: '#667eea'
  },
  serviceWorker: {
    enabled: true,
    src: '/sw.js'
  },
  installPrompt: {
    enabled: true,
    text: 'Install this app for a better experience'
  }
});

await pwaManager.init();

// Check if app is installed
const isInstalled = pwaManager.isInstalled();

// Get PWA status
const status = pwaManager.getStatus();
```

## 🎨 Themes

### Gradient Theme (Default)
```typescript
appBootstrapPlugin({
  loadingTheme: 'gradient',
  appName: 'My App'
})
```

### Minimal Theme
```typescript
appBootstrapPlugin({
  loadingTheme: 'minimal',
  appName: 'My App'
})
```

### Custom Theme
```typescript
appBootstrapPlugin({
  loadingTheme: 'custom',
  customTheme: `
    .loading-screen {
      background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
      color: white;
      font-family: 'Arial', sans-serif;
    }
    .spinner {
      border: 3px solid rgba(255,255,255,0.3);
      border-top: 3px solid white;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      animation: spin 1s linear infinite;
    }
  `
})
```

## 🔧 Advanced Configuration

### Disable PWA Functionality

```typescript
// Disable PWA from project config
appBootstrapPlugin({
  appName: 'My App',
  pwa: {
    enablePWA: false // This disables all PWA functionality
  }
})
```

### Custom Chunk Priorities

```typescript
appBootstrapPlugin({
  appName: 'My App',
  chunkPriorities: {
    'vendor': 1,
    'main': 2,
    'app': 3,
    'chunk': 4
  }
})
```

### Workbox Integration

```typescript
appBootstrapPlugin({
  appName: 'My App',
  workbox: {
    enabled: true,
    cacheNamePrefix: 'my-app',
    strategies: {
      js: 'cache-first',
      css: 'stale-while-revalidate',
      images: 'cache-first',
      html: 'network-first',
      api: 'network-first'
    },
    expiration: {
      maxEntries: 100,
      maxAgeSeconds: 86400 // 24 hours
    },
    precache: true,
    backgroundSync: true
  }
})
```

## 📁 File Structure

```
pwa-bootstrap-kit/
├── src/
│   ├── index.ts           # Main entry point
│   ├── types.ts           # TypeScript types
│   ├── vite.ts            # Vite plugin
│   ├── react.ts           # React hooks
│   ├── cache.ts           # Cache manager
│   ├── pwa.ts             # PWA functionality
│   ├── workbox.ts         # Workbox integration
│   ├── asset-manifest.ts  # Asset manifest generator
│   └── build-time.ts      # Build-time utilities
├── dist/                  # Built files
├── package.json
├── tsconfig.json
├── tsup.config.ts
└── README.md
```

## 🔄 Migration Guide

### From @basirah/app-bootstrap-lib

```typescript
// Old
import { appBootstrapPlugin } from '@basirah/app-bootstrap-lib';

// New
import { appBootstrapPlugin } from '@basirah/vite-pwa-bootstrap';
```

### From vite-plugin-app-bootstrap

```typescript
// Old
import appBootstrapPlugin from 'vite-plugin-app-bootstrap';

// New
import { appBootstrapPlugin } from '@basirah/vite-pwa-bootstrap';
```

## 🧪 Examples

### Complete PWA Setup

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { appBootstrapPlugin } from '@basirah/vite-pwa-bootstrap';

export default defineConfig({
  plugins: [
    react(),
    appBootstrapPlugin({
      appName: 'My Complete PWA',
      loadingTheme: 'gradient',
      debugMode: true,
      enableGzip: true,
      pwa: {
        enablePWA: true,
        manifest: {
          name: 'My Complete PWA',
          short_name: 'MyPWA',
          description: 'A complete Progressive Web App example',
          theme_color: '#667eea',
          background_color: '#ffffff',
          display: 'standalone',
          icons: [
            {
              src: '/icon-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: '/icon-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable'
            }
          ]
        },
        serviceWorker: {
          enabled: true,
          src: '/sw.js',
          scope: '/',
          updateStrategy: 'all'
        },
        installPrompt: {
          enabled: true,
          text: 'Install this app for a better experience',
          buttonText: 'Install',
          position: 'bottom'
        }
      },
      workbox: {
        enabled: true,
        cacheNamePrefix: 'my-pwa',
        strategies: {
          js: 'cache-first',
          css: 'stale-while-revalidate',
          images: 'cache-first',
          html: 'network-first',
          api: 'network-first'
        },
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 86400
        },
        precache: true,
        backgroundSync: true
      }
    })
  ]
});
```

### React Component with Loading

```tsx
import React from 'react';
import { useAppBootstrap } from '@basirah/vite-pwa-bootstrap';

function LoadingScreen() {
  const { loadingState, error, retry } = useAppBootstrap();

  return (
    <div className="loading-screen">
      <div className="spinner" />
      <div className="loading-content">
        <h2>Loading Your App</h2>
        <p>Progress: {loadingState.progress}%</p>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${loadingState.progress}%` }}
          />
        </div>
        {error && (
          <div className="error-message">
            <p>Error: {error}</p>
            <button onClick={retry} className="retry-button">
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoadingScreen;
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📧 Email: support@basirah.com
- 🐛 Issues: [GitHub Issues](https://github.com/BaserahThing/vite-pwa-bootstrap/issues)
- 📖 Documentation: [GitHub Wiki](https://github.com/BaserahThing/vite-pwa-bootstrap/wiki)

---

Made with ❤️ by the Basirah Team
