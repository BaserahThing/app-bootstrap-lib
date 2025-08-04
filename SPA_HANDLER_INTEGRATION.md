# SPA Handler Integration Guide

## Overview

The enhanced PWA bootstrap plugin now provides seamless integration with the ESP32 SPA handler, eliminating the need for any runtime dependencies. The SPA handler can handle everything at the server level, including:

- Asset serving with proper MIME types
- Client-side GZIP compression support
- SPA fallback routing
- Cache control headers
- CORS headers
- Unified manifest generation

## Key Features

### 🚀 **No Runtime Dependencies**
- Vite plugin generates manifests at build time
- SPA handler serves assets without client-side processing
- React hooks provide access to manifest data
- Zero runtime conflicts or module externalization issues

### 📦 **Unified Manifest Generation**
- Generates `unified-manifest.json` for SPA handler
- Includes all assets, PWA files, and custom entries
- Compatible with Workbox service worker precaching
- Provides metadata for SPA handler configuration

### 🔧 **Enhanced Asset Manifest**
- Includes SPA handler configuration metadata
- PWA integration metadata
- Build information and compatibility flags
- System files identification

## Configuration

### Vite Configuration

```typescript
import { enhancedPWABootstrapPlugin } from '@basirah/vite-pwa-bootstrap';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    // Enhanced Bootstrap plugin with SPA handler integration
    ...enhancedPWABootstrapPlugin({
      // Core Settings
      enableGzip: !isDev,
      enableProgress: true,
      enableFallback: true,
      debugMode: isDev,

      // UI Customization
      appName: 'My PWA App',
      appIcon: '⚡',
      loadingTheme: 'gradient',

      // Asset Configuration
      assetPrefix: '',
      bootstrapFileName: 'AppBootstrap.js',

      // Manifest Integration
      generateUnifiedManifest: true,
      manifestIntegration: {
        includePWA: !isDev,
        includeSW: !isDev,
        customEntries: [
          { url: '/favicon.ico', revision: null },
          { url: '/icon-192x192.png', revision: null },
          { url: '/icon-512x512.png', revision: null }
        ]
      }
    }),

    // Official Vite PWA plugin (separate)
    ...(isDev ? [] : [
      VitePWA({
        registerType: 'autoUpdate',
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,js.gz,css.gz}'],
          additionalManifestEntries: [
            { url: 'AppBootstrap.js', revision: null },
            { url: 'asset-manifest.js', revision: null }
          ]
        }
      })
    ])
  ]
});
```

## React Hooks

### Basic Usage

```tsx
import React from 'react';
import {
  useAssetManifest,
  useLoadingState,
  useAppReady,
  useSPAHandlerConfig,
  usePWAConfig
} from '@basirah/vite-pwa-bootstrap';

function App() {
  const manifest = useAssetManifest();
  const loadingState = useLoadingState();
  const isReady = useAppReady();
  const spaConfig = useSPAHandlerConfig();
  const pwaConfig = usePWAConfig();

  if (!isReady) {
    return (
      <div>
        <h2>Loading {manifest?.buildInfo.appName}...</h2>
        <p>Progress: {loadingState?.progress}%</p>
      </div>
    );
  }

  return (
    <div>
      <h1>App Ready!</h1>
      <p>SPA Handler: {spaConfig?.enableCompression ? 'Compression Enabled' : 'Compression Disabled'}</p>
      <p>PWA: {pwaConfig?.enabled ? 'Enabled' : 'Disabled'}</p>
    </div>
  );
}
```

### Advanced Hooks

```tsx
import React from 'react';
import {
  useCompressionStatus,
  useSystemFiles,
  useIsSystemFile,
  useAssetUrls,
  useUnifiedManifest,
  useSPAHandlerCompatibility,
  useCacheConfig
} from '@basirah/vite-pwa-bootstrap';

function SystemInfo() {
  const compression = useCompressionStatus();
  const systemFiles = useSystemFiles();
  const isSystemFile = useIsSystemFile();
  const assetUrls = useAssetUrls();
  const unifiedManifest = useUnifiedManifest();
  const spaCompatibility = useSPAHandlerCompatibility();
  const cacheConfig = useCacheConfig();

  return (
    <div>
      <h2>System Information</h2>

      <h3>Compression</h3>
      <p>Enabled: {compression.enabled ? 'Yes' : 'No'}</p>
      <p>SPA Handler: {compression.spaHandlerEnabled ? 'Yes' : 'No'}</p>

      <h3>System Files</h3>
      <ul>
        {systemFiles.map(file => (
          <li key={file}>{file}</li>
        ))}
      </ul>

      <h3>SPA Handler Compatibility</h3>
      <p>Compatible: {spaCompatibility.compatible ? 'Yes' : 'No'}</p>
      <p>Root Path: {spaCompatibility.rootPath}</p>
      <p>Fallback File: {spaCompatibility.fallbackFile}</p>

      <h3>Cache Configuration</h3>
      <p>Enabled: {cacheConfig.enabled ? 'Yes' : 'No'}</p>
      <p>Max Age: {cacheConfig.maxAge}s</p>

      <h3>Asset URLs</h3>
      <p>JS Files: {Object.keys(assetUrls.js).length}</p>
      <p>CSS Files: {Object.keys(assetUrls.css).length}</p>

      <h3>Unified Manifest</h3>
      <p>Total Files: {unifiedManifest?.metadata.totalFiles}</p>
      <p>PWA Enabled: {unifiedManifest?.metadata.pwaEnabled ? 'Yes' : 'No'}</p>
    </div>
  );
}
```

## Generated Files

### Asset Manifest (`asset-manifest.js`)
```javascript
window.__ASSET_MANIFEST__ = {
  js: { "index.js": "/index.js", "index2.js": "/index2.js" },
  css: { "index.css": "/assets/index.css", "index2.css": "/assets/index2.css" },
  loadingSequence: { js: ["index.js", "index2.js"], css: ["index.css", "index2.css"] },
  buildInfo: {
    appName: "My PWA App",
    compressionEnabled: true,
    spaHandlerCompatible: true,
    timestamp: 1754129492962
  },
  spaHandler: {
    rootPath: "/",
    fallbackFile: "index.html",
    enableCompression: true,
    enableCaching: true,
    cacheMaxAge: 86400,
    systemFiles: ["AppBootstrap.js", "asset-manifest.js", "unified-manifest.json"]
  },
  pwa: {
    enabled: true,
    manifestFile: "manifest.webmanifest",
    serviceWorkerFile: "sw.js",
    workboxFile: "workbox-*.js"
  }
};
```

### Unified Manifest (`unified-manifest.json`)
```json
{
  "version": "1.0.0",
  "timestamp": 1754129492962,
  "entries": [
    { "url": "/index.js", "revision": null },
    { "url": "/index2.js", "revision": null },
    { "url": "/assets/index.css", "revision": null },
    { "url": "/assets/index2.css", "revision": null },
    { "url": "/AppBootstrap.js", "revision": null },
    { "url": "/asset-manifest.js", "revision": null },
    { "url": "/unified-manifest.json", "revision": null },
    { "url": "/manifest.webmanifest", "revision": null },
    { "url": "/sw.js", "revision": null },
    { "url": "/favicon.ico", "revision": null },
    { "url": "/icon-192x192.png", "revision": null },
    { "url": "/icon-512x512.png", "revision": null }
  ],
  "metadata": {
    "totalFiles": 12,
    "spaHandlerCompatible": true,
    "pwaEnabled": true
  }
}
```

## SPA Handler Integration

The SPA handler can use the generated manifests to:

1. **Serve Assets**: Use the unified manifest to know which files to serve
2. **Cache Control**: Use the SPA handler metadata for cache headers
3. **Compression**: Use the compression settings for GZIP handling
4. **System Files**: Identify and handle system files differently
5. **PWA Integration**: Know which files are PWA-related

### Example SPA Handler Usage

```c
// The SPA handler can read unified-manifest.json to:
// - Know which files exist
// - Apply appropriate cache headers
// - Handle compression for .gz files
// - Serve system files with special handling
// - Integrate with PWA service worker

// The asset-manifest.js provides:
// - Loading sequence information
// - Build metadata
// - SPA handler configuration
// - PWA integration metadata
```

## Benefits

### ✅ **No Runtime Dependencies**
- Vite plugin generates everything at build time
- SPA handler handles all serving logic
- No client-side module resolution issues
- Zero runtime conflicts

### ✅ **Seamless Integration**
- Works with official Vite PWA plugin
- Compatible with Workbox service workers
- Integrates with ESP32 SPA handler
- Provides React hooks for easy access

### ✅ **Performance Optimized**
- Server-side compression handling
- Optimized cache headers
- Efficient asset loading
- Minimal client-side processing

### ✅ **Development Friendly**
- Hot reload support
- Debug mode for development
- Progress tracking
- Error handling

## Migration from Previous Version

If you're migrating from the previous version:

1. **Update Vite Config**: Add manifest integration options
2. **Update React Components**: Use new hooks instead of old ones
3. **Remove Runtime Dependencies**: No need for client-side PWA handling
4. **Update SPA Handler**: Use unified manifest for better integration

The new system provides better performance, cleaner architecture, and zero runtime dependencies while maintaining full PWA functionality through the official Vite PWA plugin.
