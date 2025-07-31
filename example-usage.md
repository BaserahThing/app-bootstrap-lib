# App Bootstrap Library - Example Usage

This document shows how to use the unified app bootstrap library that combines Vite plugin, React hooks, and cache management.

## Installation

```bash
npm install app-bootstrap-lib
```

## 1. Vite Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { appBootstrapPlugin } from 'app-bootstrap-lib';

export default defineConfig({
  plugins: [
    react(),
    appBootstrapPlugin({
      appName: 'My App',
      loadingTheme: 'gradient',
      debugMode: true,
      bootstrapFileName: 'AppBootstrap.js'
    })
  ]
});
```

## 2. React Component Usage

```tsx
// App.tsx
import { useAppBootstrap } from 'app-bootstrap-lib';

function App() {
  const { loadingState, isReady, error, retry } = useAppBootstrap({
    enableDebug: true
  });

  if (!isReady) {
    return (
      <div className="loading-container">
        <div className="spinner" />
        <p>Loading... {loadingState.progress}%</p>
        {error && (
          <div>
            <p>Error: {error}</p>
            <button onClick={retry}>Retry</button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <h1>App Loaded Successfully!</h1>
      <p>Loading took: {loadingState.duration}ms</p>
    </div>
  );
}
```

## 3. Cache Manager Usage

```typescript
// main.ts
import { initializeCacheManager } from 'app-bootstrap-lib';

// Auto-initialize with custom config
const cacheManager = initializeCacheManager({
  cacheName: 'my-app-v1',
  loadingScreen: {
    theme: 'gradient'
  }
});

// Or use the class directly
import { AppCacheManager } from 'app-bootstrap-lib';

const manager = new AppCacheManager({
  cacheName: 'app-v1',
  loadingScreen: {
    customHTML: `
      <div style="background: #000; color: #fff; padding: 20px;">
        <h1>Loading My App</h1>
        <div id="loading-text">Please wait...</div>
      </div>
    `
  }
});

await manager.init();
```

## 4. Asset Manifest Generation

```typescript
// build script
import { generateAssetManifest } from 'app-bootstrap-lib';

// Generate manifest from CLI
await generateAssetManifest('./dist', './dist/asset-manifest.js');

// Or use the class directly
import { AssetManifestGenerator } from 'app-bootstrap-lib';

const generator = new AssetManifestGenerator('./dist', './dist/asset-manifest.js');
await generator.generate();
```

## 5. CLI Usage

```bash
# Generate asset manifest
npx app-bootstrap-lib generate-manifest ./dist

# With custom output
npx app-bootstrap-lib generate-manifest ./dist ./custom-manifest.js
```

## 6. Event System

```typescript
import { appBootstrapEvents } from 'app-bootstrap-lib';

// Listen to loading events
appBootstrapEvents.on('loading:start', (event) => {
  console.log('Loading started');
});

appBootstrapEvents.on('loading:progress', (event) => {
  console.log('Progress:', event.progress);
});

appBootstrapEvents.on('loading:complete', (event) => {
  console.log('Loading completed');
});

appBootstrapEvents.on('loading:error', (event) => {
  console.error('Loading error:', event.error);
});
```

## 7. Complete Example

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import { appBootstrapPlugin } from 'app-bootstrap-lib';

export default defineConfig({
  plugins: [
    appBootstrapPlugin({
      appName: 'Celebrity Box PWA',
      loadingTheme: 'gradient',
      debugMode: true,
      enableGzip: false,
      customChunks: {
        vendor: ['react', 'react-dom'],
        utils: ['lodash', 'moment']
      }
    })
  ]
});
```

```tsx
// App.tsx
import { useAppBootstrap, appBootstrapEvents } from 'app-bootstrap-lib';

function App() {
  const { loadingState, isReady, error, retry } = useAppBootstrap({
    enableDebug: true
  });

  useEffect(() => {
    // Listen to loading events
    const unsubscribe = appBootstrapEvents.on('loading:complete', () => {
      console.log('App bootstrap completed!');
    });

    return unsubscribe;
  }, []);

  if (!isReady) {
    return (
      <div className="loading-screen">
        <div className="spinner" />
        <p>Loading Celebrity Box... {loadingState.progress}%</p>
        {error && (
          <div>
            <p>Error: {error}</p>
            <button onClick={retry}>Retry</button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <h1>Celebrity Box PWA</h1>
      <p>App loaded successfully!</p>
    </div>
  );
}
```

```typescript
// main.ts
import { initializeCacheManager } from 'app-bootstrap-lib';

// Initialize cache manager
const cacheManager = initializeCacheManager({
  cacheName: 'celebrity-box-v1',
  loadingScreen: {
    theme: 'gradient'
  }
});

// Start the app
import('./App').then(({ default: App }) => {
  // App is now loaded and ready
});
```

## Migration from Separate Libraries

### From app-bootstrap-support
```typescript
// Old
import { useAppBootstrap } from '@app-bootstrap/support';

// New
import { useAppBootstrap } from 'app-bootstrap-lib';
```

### From vite-plugin-app-bootstrap
```typescript
// Old
import appBootstrapPlugin from 'vite-plugin-app-bootstrap';

// New
import { appBootstrapPlugin } from 'app-bootstrap-lib';
```

### From cache-manager.js
```typescript
// Old
// Using standalone cache-manager.js

// New
import { initializeCacheManager } from 'app-bootstrap-lib';
```

This unified library provides a clean, simple interface for all app bootstrap functionality while maintaining the power and flexibility of the original separate libraries.
