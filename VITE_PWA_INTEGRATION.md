# Vite PWA Integration

This document explains how to integrate the official Vite PWA plugin with the `@basirah/vite-pwa-bootstrap` library for enhanced Progressive Web App functionality.

## Overview

The enhanced PWA integration combines:
- **Custom Bootstrap Plugin**: Optimized loading sequences and asset management
- **Official Vite PWA Plugin**: Full PWA functionality with service workers
- **No Conflicts**: Removed custom PWA module to avoid conflicts with official Vite PWA plugin

## Installation

The `vite-plugin-pwa` dependency is automatically included when you install `@basirah/vite-pwa-bootstrap`:

```bash
npm install @basirah/vite-pwa-bootstrap
```

## Usage

### Basic Integration

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { enhancedPWABootstrapPlugin } from '@basirah/vite-pwa-bootstrap';

export default defineConfig({
  plugins: [
    react(),
    // Spread the enhanced plugin array into the plugins array
    ...enhancedPWABootstrapPlugin({
      // Bootstrap options
      appName: 'My PWA App',
      appIcon: '🚀',
      loadingTheme: 'gradient',

      // PWA options
      useOfficialPlugin: true, // Enable official Vite PWA plugin
      vitePWA: {
        // Customize Vite PWA configuration
        manifest: {
          name: 'My PWA App',
          short_name: 'MyApp',
          theme_color: '#ffffff',
          background_color: '#000000',
          display: 'standalone',
          start_url: '/',
          icons: [
            {
              src: 'icon-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'icon-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        }
      }
    })
  ]
});
```

### Advanced Configuration

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createEnhancedPWAPlugins } from '@basirah/vite-pwa-bootstrap';

export default defineConfig({
  plugins: [
    react(),
    ...createEnhancedPWAPlugins({
      // Bootstrap Configuration
      enableGzip: true,
      enableProgress: true,
      enableFallback: true,
      debugMode: false,
      appName: 'Advanced PWA App',
      appIcon: '⚡',
      loadingTheme: 'gradient',
      customTheme: '',
      enableCDNFallback: false,
      compressionFirst: true,
      assetPrefix: '',
      bootstrapFileName: 'AppBootstrap.js',
      gzipLoaderConfig: {
        debugMode: false,
        useGzip: true,
        fallbackToUncompressed: true,
        timeout: 10000,
        retries: 3
      },



      // Vite PWA Configuration
      useOfficialPlugin: true,
      vitePWA: {
        registerType: 'autoUpdate',
        injectRegister: 'auto',
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,js.gz,css.gz}'],
          additionalManifestEntries: [
            { url: 'AppBootstrap.js', revision: null },
            { url: 'asset-manifest.js', revision: null }
          ],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/.*\.(js|css|png|jpg|jpeg|svg|gif|webp)$/,
              handler: 'CacheFirst',
              options: {
                cacheName: 'external-assets',
                expiration: {
                  maxEntries: 100,
                  maxAgeSeconds: 86400 * 30 // 30 days
                }
              }
            },
            {
              urlPattern: /^https:\/\/.*\/api\/.*$/,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'api-cache',
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 3600 // 1 hour
                }
              }
            }
          ]
        },
        manifest: {
          name: 'Advanced PWA App',
          short_name: 'AdvancedApp',
          description: 'A PWA with advanced features',
          theme_color: '#ffffff',
          background_color: '#000000',
          display: 'standalone',
          start_url: '/',
          icons: [
            {
              src: 'icon-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'icon-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        }
      }
    })
  ]
});
```

## Configuration Options

### EnhancedPWAOptions

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `useOfficialPlugin` | `boolean` | `true` | Whether to use the official Vite PWA plugin |

| `vitePWA` | `VitePWAOptions` | `{}` | Configuration for the official Vite PWA plugin |



### Default Vite PWA Configuration

The integration provides sensible defaults for the Vite PWA plugin:

```typescript
const DEFAULT_VITE_PWA_CONFIG = {
  registerType: 'autoUpdate',
  injectRegister: 'auto',
  workbox: {
    globPatterns: ['**/*.{js,css,html,ico,png,svg,js.gz,css.gz}'],
    additionalManifestEntries: [
      { url: 'AppBootstrap.js', revision: null },
      { url: 'asset-manifest.js', revision: null }
    ],
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/.*\.(js|css|png|jpg|jpeg|svg|gif|webp)$/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'external-assets',
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 86400 * 30 // 30 days
          }
        }
      },
      {
        urlPattern: /^https:\/\/.*\/api\/.*$/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'api-cache',
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 3600 // 1 hour
          }
        }
      }
    ]
  },
  manifest: {
    name: 'Celebrity Box PWA',
    short_name: 'CelebrityBox',
    description: 'A PWA with optimized loading experience',
    theme_color: '#ffffff',
    background_color: '#000000',
    display: 'standalone',
    start_url: '/',
    icons: [
      {
        src: 'icon-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: 'icon-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  }
};
```

## Benefits

### 1. **Optimized Loading**
- Custom bootstrap script provides fast initial loading
- Asset manifest ensures efficient resource loading
- Progress indicators and loading screens

### 2. **Full PWA Features**
- Service worker with official Vite PWA plugin for offline functionality
- App manifest for installability
- Background sync and push notifications support

### 3. **No Conflicts**
- Removed custom PWA module to avoid conflicts
- Automatic asset caching including compressed files
- Predictable file naming for reliable caching

### 4. **Flexible Configuration**
- Use both plugins or just the bootstrap plugin
- Customize Vite PWA settings while keeping defaults
- Easy migration from existing setups

## Migration from Existing Setup

If you're already using the bootstrap plugin, you can easily upgrade:

```typescript
// Before
import { appBootstrapPlugin } from '@basirah/vite-pwa-bootstrap';

export default defineConfig({
  plugins: [
    react(),
    appBootstrapPlugin({
      appName: 'My App',
      // ... other options
    })
  ]
});

// After
import { enhancedPWABootstrapPlugin } from '@basirah/vite-pwa-bootstrap';

export default defineConfig({
  plugins: [
    react(),
    ...enhancedPWABootstrapPlugin({
      appName: 'My App',
      // ... other options
      useOfficialPlugin: true, // Enable PWA features
    })
  ]
});
```

## Troubleshooting

### Plugin Not Found
If you see an error about `vite-plugin-pwa` not being found:
```bash
npm install vite-plugin-pwa
```

### TypeScript Errors
If you encounter TypeScript errors, make sure you're using the spread operator:
```typescript
// Correct
...enhancedPWABootstrapPlugin(options)

// Incorrect
enhancedPWABootstrapPlugin(options)
```

### Build Issues
If the build fails, try:
1. Clear node_modules and reinstall: `rm -rf node_modules && npm install`
2. Clear build cache: `rm -rf dist`
3. Rebuild: `npm run build`

## Examples

See the `celebrity-box-pwa` project for a complete working example of the enhanced PWA integration.
