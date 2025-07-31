# Workbox Integration - @basirah/app-bootstrap-lib

## Overview

The `@basirah/app-bootstrap-lib` now includes **built-in Workbox integration** for complete PWA functionality. This eliminates the need for external PWA plugins and provides a unified solution for app bootstrapping and offline capabilities.

## Features

### ✅ **Complete PWA Solution**
- **Service Worker Generation**: Automatic Workbox service worker creation
- **PWA Manifest**: Dynamic manifest generation with your app settings
- **Caching Strategies**: Optimized caching for different file types
- **Offline Support**: Full offline functionality
- **Installation Ready**: Chrome app installation support

### ✅ **Smart Caching Strategies**
- **JS/CSS**: Stale While Revalidate (fast loading + updates)
- **Images**: Cache First (instant loading)
- **HTML**: Network First (always fresh content)
- **API**: Network First (with fallback to cache)

### ✅ **ESP32 Optimized**
- **No External Dependencies**: Pure JavaScript, no Workbox library needed
- **Lightweight**: Minimal service worker overhead
- **Static File Serving**: Perfect for embedded devices
- **Offline Operation**: Works without internet connection

## Usage

### Basic Integration

```typescript
// vite.config.ts
import { appBootstrapPlugin } from '@basirah/app-bootstrap-lib';

export default defineConfig({
  plugins: [
    appBootstrapPlugin({
      appName: 'Celebrity Box PWA',
      loadingTheme: 'gradient',
      // Workbox is enabled by default
    })
  ]
});
```

### Advanced Workbox Configuration

```typescript
// vite.config.ts
import { appBootstrapPlugin } from '@basirah/app-bootstrap-lib';

export default defineConfig({
  plugins: [
    appBootstrapPlugin({
      appName: 'Celebrity Box PWA',
      loadingTheme: 'gradient',
      workbox: {
        enabled: true,
        cacheNamePrefix: 'celebrity-box',
        strategies: {
          js: 'stale-while-revalidate',
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
        backgroundSync: false
      }
    })
  ]
});
```

## Generated Files

When you build your application, the plugin automatically generates:

### 1. **Service Worker** (`sw.js`)
```javascript
// Complete Workbox service worker with:
// - Asset precaching
// - Smart caching strategies
// - Offline support
// - Background sync (optional)
// - Push notifications
```

### 2. **PWA Manifest** (`manifest.webmanifest`)
```json
{
  "name": "Celebrity Box PWA",
  "short_name": "CelebBox",
  "description": "PWA for Celebrity Box PWA with offline support",
  "theme_color": "#667eea",
  "background_color": "#ffffff",
  "display": "standalone",
  "start_url": "/",
  "icons": [...],
  "shortcuts": [...]
}
```

### 3. **Registration Script** (`registerSW.js`)
```javascript
// Automatic service worker registration
// Update detection and handling
// Background sync registration
```

## Caching Strategies

### **Stale While Revalidate** (JS/CSS)
- **Use Case**: JavaScript and CSS files
- **Behavior**: Show cached version immediately, update in background
- **Benefits**: Fast loading + automatic updates

### **Cache First** (Images)
- **Use Case**: Static assets like images
- **Behavior**: Use cache if available, fetch only if not cached
- **Benefits**: Instant loading for static content

### **Network First** (HTML/API)
- **Use Case**: HTML pages and API calls
- **Behavior**: Try network first, fallback to cache
- **Benefits**: Always fresh content when possible

## ESP32 Integration

### **Perfect for Embedded Devices**
```c
// Your spa_handler.c can serve these files:
GET /index.html          # Main entry point
GET /AppBootstrap.js     # Loading system
GET /asset-manifest.js   # Asset mapping
GET /sw.js              # Service worker
GET /manifest.webmanifest # PWA manifest
GET /registerSW.js      # Registration script
```

### **Offline Operation**
- **No Internet Required**: App works completely offline
- **Cached Assets**: All files cached for instant loading
- **Background Updates**: Updates when connection available
- **Smart Fallbacks**: Graceful degradation when offline

## Configuration Options

### **WorkboxOptions Interface**
```typescript
interface WorkboxOptions {
  enabled?: boolean;                    // Enable/disable Workbox
  cacheNamePrefix?: string;             // Cache name prefix
  strategies?: {                        // Caching strategies
    js?: 'cache-first' | 'stale-while-revalidate' | 'network-first';
    css?: 'cache-first' | 'stale-while-revalidate' | 'network-first';
    images?: 'cache-first' | 'stale-while-revalidate' | 'network-first';
    html?: 'cache-first' | 'stale-while-revalidate' | 'network-first';
    api?: 'cache-first' | 'stale-while-revalidate' | 'network-first';
  };
  expiration?: {                        // Cache expiration
    maxEntries?: number;                // Max cache entries
    maxAgeSeconds?: number;             // Max age in seconds
  };
  precache?: boolean;                   // Precache assets
  backgroundSync?: boolean;             // Enable background sync
}
```

## Benefits Over External PWA Plugins

### **Advantages**
- ✅ **No External Dependencies**: No Workbox library needed
- ✅ **Unified Solution**: Everything in one library
- ✅ **ESP32 Optimized**: Perfect for embedded devices
- ✅ **Lightweight**: Minimal overhead
- ✅ **Customizable**: Full control over caching strategies
- ✅ **Type Safe**: Full TypeScript support

### **Comparison**
| Feature | External PWA Plugin | @basirah/app-bootstrap-lib |
|---------|-------------------|---------------------------|
| **Dependencies** | Requires Workbox library | No external dependencies |
| **Bundle Size** | +100KB+ | Minimal overhead |
| **ESP32 Compatible** | ❌ Complex setup | ✅ Perfect fit |
| **Customization** | Limited | Full control |
| **Integration** | Separate plugin | Unified solution |

## Example: Complete ESP32 Setup

### **1. Build Your App**
```bash
npm run build
```

### **2. Generated Files**
```
dist/
├── index.html              # Main entry point
├── AppBootstrap.js         # Loading system
├── asset-manifest.js       # Asset mapping
├── sw.js                  # Service worker
├── manifest.webmanifest   # PWA manifest
├── registerSW.js          # Registration script
└── assets/                # Your app bundles
```

### **3. Deploy to ESP32**
```c
// Your spa_handler.c serves these files
// Users can install as Chrome app
// Works offline with full functionality
```

## Migration from External PWA Plugins

### **Before (External Plugin)**
```typescript
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },
      manifest: {
        name: 'My App',
        // ... complex configuration
      }
    })
  ]
});
```

### **After (Built-in Workbox)**
```typescript
import { appBootstrapPlugin } from '@basirah/app-bootstrap-lib';

export default defineConfig({
  plugins: [
    appBootstrapPlugin({
      appName: 'My App',
      workbox: {
        enabled: true
        // Simple, clean configuration
      }
    })
  ]
});
```

## Conclusion

The Workbox integration in `@basirah/app-bootstrap-lib` provides:

1. **🚀 Complete PWA Solution**: No external dependencies needed
2. **⚡ ESP32 Optimized**: Perfect for embedded devices
3. **🔧 Easy Configuration**: Simple, clean API
4. **📱 Installation Ready**: Chrome app installation support
5. **🔄 Offline Capable**: Full offline functionality
6. **🎯 Unified Experience**: Everything in one library

This makes your library a **complete solution** for modern web applications, especially those targeting embedded devices like the ESP32.
