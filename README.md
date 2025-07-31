# @basirah/app-bootstrap-lib

A unified Node.js library that combines Vite plugin, React hooks, and cache management for seamless PWA loading experiences.

## Installation

```bash
npm install @basirah/app-bootstrap-lib
```

## Features

- **Vite Plugin**: Automatically generates AppBootstrap.js and asset manifests
- **React Hooks**: Easy integration with React applications
- **Cache Manager**: Loading screens and service worker management
- **Asset Manifest Generator**: CLI tool for generating detailed asset manifests



## Quick Start

### 1. Vite Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import { appBootstrapPlugin } from '@basirah/app-bootstrap-lib';

export default defineConfig({
  plugins: [
    appBootstrapPlugin({
      appName: 'My App',
      loadingTheme: 'gradient',
      debugMode: true
    })
  ]
});
```

### 2. React Integration

```tsx
// App.tsx
import { useAppBootstrap } from '@basirah/app-bootstrap-lib';

function App() {
  const { loadingState, isReady, error, retry } = useAppBootstrap({
    enableDebug: true
  });

  if (!isReady) {
    return (
      <div>
        <p>Loading... {loadingState.progress}%</p>
        {error && <button onClick={retry}>Retry</button>}
      </div>
    );
  }

  return <div>App loaded successfully!</div>;
}
```

### 3. Cache Manager

```typescript
// main.ts
import { initializeCacheManager } from '@basirah/app-bootstrap-lib';

// Auto-initialize with custom config
const cacheManager = initializeCacheManager({
  cacheName: 'my-app-v1',
  loadingScreen: {
    theme: 'gradient'
  }
});
```

## API Reference

### Vite Plugin

```typescript
import { appBootstrapPlugin } from '@basirah/app-bootstrap-lib';

appBootstrapPlugin({
  appName: 'My App',              // App name for loading screen
  loadingTheme: 'gradient',       // 'gradient' | 'minimal' | 'custom'
  customTheme: '',                // Custom CSS for loading screen
  debugMode: false,               // Enable debug logging
  enableGzip: false,              // Enable gzip compression
  bootstrapFileName: 'AppBootstrap.js', // Output filename
  customChunks: {},               // Custom chunk configuration
  chunkPriorities: {}             // Chunk loading priorities
});
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
import { AppCacheManager } from '@basirah/app-bootstrap-lib';

const manager = new AppCacheManager({
  cacheName: 'app-v1',
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
```

### Asset Manifest Generator

```typescript
import { generateAssetManifest } from '@basirah/app-bootstrap-lib';

// Generate manifest from CLI
await generateAssetManifest('./dist', './dist/asset-manifest.js');

// Or use the class directly
import { AssetManifestGenerator } from '@basirah/app-bootstrap-lib';

const generator = new AssetManifestGenerator('./dist', './dist/asset-manifest.js');
await generator.generate();
```

## CLI Usage

### Generate Asset Manifest

```bash
# Using the library's CLI
npx @basirah/app-bootstrap-lib generate-manifest ./dist

# Or with custom output
npx @basirah/app-bootstrap-lib generate-manifest ./dist ./custom-manifest.js
```

## File Structure

```
app-bootstrap-lib/
├── src/
│   ├── index.ts           # Main entry point
│   ├── types.ts           # TypeScript types
│   ├── vite.ts            # Vite plugin
│   ├── react.ts           # React hooks
│   ├── cache.ts           # Cache manager
│   └── asset-manifest.ts  # Asset manifest generator
├── dist/                  # Built files
├── package.json
├── tsconfig.json
├── tsup.config.ts
└── README.md
```

## Examples

### Basic Vite Setup

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { appBootstrapPlugin } from '@basirah/app-bootstrap-lib';

export default defineConfig({
  plugins: [
    react(),
    appBootstrapPlugin({
      appName: 'My React App',
      loadingTheme: 'gradient',
      debugMode: true
    })
  ]
});
```

### React Component with Loading

```tsx
import { useAppBootstrap } from '@basirah/app-bootstrap-lib';

function LoadingScreen() {
  const { loadingState, error, retry } = useAppBootstrap();

  return (
    <div className="loading-screen">
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
```

### Custom Cache Manager

```typescript
import { AppCacheManager } from '@basirah/app-bootstrap-lib';

const customManager = new AppCacheManager({
  cacheName: 'my-app-cache',
  loadingScreen: {
    customHTML: `
      <div style="background: #000; color: #fff; padding: 20px;">
        <h1>Loading My App</h1>
        <div id="loading-text">Please wait...</div>
      </div>
    `
  }
});

customManager.init();
```

## Migration from Separate Libraries

### From app-bootstrap-support

```typescript
// Old
import { useAppBootstrap } from '@app-bootstrap/support';

// New
import { useAppBootstrap } from '@basirah/app-bootstrap-lib';
```

### From vite-plugin-app-bootstrap

```typescript
// Old
import appBootstrapPlugin from 'vite-plugin-app-bootstrap';

// New
import { appBootstrapPlugin } from '@basirah/app-bootstrap-lib';
```

### From cache-manager.js

```typescript
// Old
// Using standalone cache-manager.js

// New
import { initializeCacheManager } from '@basirah/app-bootstrap-lib';
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
