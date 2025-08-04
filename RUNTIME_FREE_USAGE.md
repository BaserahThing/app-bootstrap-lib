# Runtime-Free Usage Guide

## Overview

The `vite-pwa-bootstrap` now provides truly runtime-free manifest access functions that work with any framework or vanilla JavaScript. No React dependencies required!

## Key Benefits

### ✅ **Zero Runtime Dependencies**
- No React imports required
- Works with any framework (React, Vue, Angular, vanilla JS)
- No module externalization issues
- Pure JavaScript functions

### ✅ **Framework Agnostic**
- Use in React components
- Use in Vue components
- Use in vanilla JavaScript
- Use in any other framework

### ✅ **Immediate Access**
- No hooks, no state management
- Direct function calls
- Synchronous access to manifest data
- Event-driven updates

## Usage Examples

### 1. Vanilla JavaScript

```javascript
import {
    getAssetManifest,
    getLoadingState,
    isAppReady,
    onAppReady
} from '@basirah/vite-pwa-bootstrap';

// Check if app is ready
if (isAppReady()) {
    console.log('App is ready!');
} else {
    // Wait for app to be ready
    onAppReady(() => {
        console.log('App just became ready!');
    });
}

// Get manifest data
const manifest = getAssetManifest();
if (manifest) {
    console.log('App name:', manifest.buildInfo.appName);
    console.log('Compression enabled:', manifest.buildInfo.compressionEnabled);
}

// Get loading state
const loadingState = getLoadingState();
if (loadingState) {
    console.log('Loading progress:', loadingState.progress + '%');
}
```

### 2. React Components (No React Dependencies)

```tsx
import React, { useState, useEffect } from 'react';
import {
    getAssetManifest,
    getLoadingState,
    isAppReady,
    onAppReady,
    onLoadingProgress
} from '@basirah/vite-pwa-bootstrap';

function AppStatus() {
    const [manifest, setManifest] = useState(getAssetManifest());
    const [loadingState, setLoadingState] = useState(getLoadingState());
    const [isReady, setIsReady] = useState(isAppReady());

    useEffect(() => {
        // Listen for app ready
        onAppReady(() => {
            setIsReady(true);
            setManifest(getAssetManifest());
        });

        // Listen for loading progress
        onLoadingProgress((data) => {
            setLoadingState(getLoadingState());
        });
    }, []);

    if (!isReady) {
        return (
            <div>
                <h2>Loading {manifest?.buildInfo.appName}...</h2>
                <p>Progress: {loadingState?.progress || 0}%</p>
            </div>
        );
    }

    return (
        <div>
            <h1>App Ready!</h1>
            <p>SPA Handler: {manifest?.spaHandler.enableCompression ? 'Compression Enabled' : 'Compression Disabled'}</p>
            <p>PWA: {manifest?.pwa.enabled ? 'Enabled' : 'Disabled'}</p>
        </div>
    );
}
```

### 3. Config App Integration

```tsx
// In your config app component
import React from 'react';
import {
    getAssetManifest,
    getSPAHandlerConfig,
    getPWAConfig,
    getCompressionStatus
} from '@basirah/vite-pwa-bootstrap';

function SystemConfig() {
    const manifest = getAssetManifest();
    const spaConfig = getSPAHandlerConfig();
    const pwaConfig = getPWAConfig();
    const compression = getCompressionStatus();

    return (
        <div className="system-config">
            <h2>System Configuration</h2>

            <div className="config-section">
                <h3>Build Information</h3>
                <p>App Name: {manifest?.buildInfo.appName}</p>
                <p>Compression: {compression.enabled ? 'Enabled' : 'Disabled'}</p>
                <p>SPA Handler: {compression.spaHandlerEnabled ? 'Enabled' : 'Disabled'}</p>
            </div>

            <div className="config-section">
                <h3>SPA Handler Settings</h3>
                <p>Root Path: {spaConfig?.rootPath}</p>
                <p>Fallback File: {spaConfig?.fallbackFile}</p>
                <p>Cache Enabled: {spaConfig?.enableCaching ? 'Yes' : 'No'}</p>
                <p>Cache Max Age: {spaConfig?.cacheMaxAge}s</p>
            </div>

            <div className="config-section">
                <h3>PWA Configuration</h3>
                <p>PWA Enabled: {pwaConfig?.enabled ? 'Yes' : 'No'}</p>
                <p>Manifest File: {pwaConfig?.manifestFile}</p>
                <p>Service Worker: {pwaConfig?.serviceWorkerFile}</p>
            </div>
        </div>
    );
}
```

### 4. Event-Driven Updates

```javascript
import {
    onBootstrapEvent,
    onLoadingProgress,
    onLoadingComplete,
    onAppReady
} from '@basirah/vite-pwa-bootstrap';

// Listen for any bootstrap event
onBootstrapEvent('loading:progress', (data) => {
    console.log('Loading progress:', data.progress);
});

// Listen for specific events
onLoadingProgress((data) => {
    updateProgressBar(data.progress);
});

onLoadingComplete(() => {
    hideLoadingScreen();
    showApp();
});

onAppReady(() => {
    initializeApp();
});
```

### 5. Asset Management

```javascript
import {
    getAssetUrls,
    getSystemFiles,
    isSystemFile,
    getUnifiedManifest
} from '@basirah/vite-pwa-bootstrap';

// Get all asset URLs
const assetUrls = getAssetUrls();
console.log('JS files:', Object.keys(assetUrls.js));
console.log('CSS files:', Object.keys(assetUrls.css));

// Check if a file is a system file
const systemFiles = getSystemFiles();
console.log('System files:', systemFiles);

if (isSystemFile('AppBootstrap.js')) {
    console.log('AppBootstrap.js is a system file');
}

// Get unified manifest (async)
getUnifiedManifest().then(manifest => {
    if (manifest) {
        console.log('Total files:', manifest.metadata.totalFiles);
        console.log('PWA enabled:', manifest.metadata.pwaEnabled);
    }
});
```

### 6. Cache and Compression Status

```javascript
import {
    getCacheConfig,
    getCompressionStatus,
    getSPAHandlerCompatibility
} from '@basirah/vite-pwa-bootstrap';

// Check cache configuration
const cacheConfig = getCacheConfig();
console.log('Cache enabled:', cacheConfig.enabled);
console.log('Cache max age:', cacheConfig.maxAge);

// Check compression status
const compression = getCompressionStatus();
console.log('Compression enabled:', compression.enabled);
console.log('SPA handler compression:', compression.spaHandlerEnabled);

// Check SPA handler compatibility
const spaCompatibility = getSPAHandlerCompatibility();
console.log('SPA handler compatible:', spaCompatibility.compatible);
console.log('Root path:', spaCompatibility.rootPath);
```

## Migration from React Hooks

If you were using the React hooks before, here's how to migrate:

### Before (React Hooks)
```tsx
import { useAssetManifest, useLoadingState, useAppReady } from '@basirah/vite-pwa-bootstrap';

function MyComponent() {
    const manifest = useAssetManifest();
    const loadingState = useLoadingState();
    const isReady = useAppReady();

    // Component logic...
}
```

### After (Runtime-Free Functions)
```tsx
import { getAssetManifest, getLoadingState, isAppReady, onAppReady } from '@basirah/vite-pwa-bootstrap';

function MyComponent() {
    const [manifest, setManifest] = useState(getAssetManifest());
    const [loadingState, setLoadingState] = useState(getLoadingState());
    const [isReady, setIsReady] = useState(isAppReady());

    useEffect(() => {
        onAppReady(() => {
            setIsReady(true);
            setManifest(getAssetManifest());
        });
    }, []);

    // Component logic...
}
```

## Benefits for Config App

### ✅ **No Style Issues**
- No React dependency conflicts
- No CSS-in-JS runtime issues
- Pure JavaScript functions
- Works with any styling approach

### ✅ **Better Performance**
- No hook overhead
- Direct function calls
- No re-renders from hook state changes
- Immediate access to data

### ✅ **Framework Independence**
- Works in any React setup
- Works in Vue, Angular, etc.
- Works in vanilla JavaScript
- No framework-specific dependencies

## Available Functions

### Core Functions
- `getAssetManifest()` - Get the enhanced asset manifest
- `getLoadingState()` - Get current loading state
- `isAppReady()` - Check if app is ready
- `getSPAHandlerConfig()` - Get SPA handler configuration
- `getPWAConfig()` - Get PWA configuration

### Utility Functions
- `getBuildInfo()` - Get build information
- `getCompressionStatus()` - Get compression status
- `getSystemFiles()` - Get list of system files
- `isSystemFile(filename)` - Check if file is a system file
- `getAssetUrls()` - Get asset URLs by type
- `getSPAHandlerCompatibility()` - Get SPA handler compatibility
- `getCacheConfig()` - Get cache configuration

### Event Functions
- `onBootstrapEvent(event, callback)` - Listen for any bootstrap event
- `onLoadingProgress(callback)` - Listen for loading progress
- `onLoadingComplete(callback)` - Listen for loading completion
- `onAppReady(callback)` - Listen for app ready state

### Async Functions
- `getUnifiedManifest()` - Get unified manifest (async)
- `triggerAssetReload()` - Trigger asset reload

This approach provides true runtime-free access to manifest data while maintaining compatibility with React and other frameworks! 🚀
