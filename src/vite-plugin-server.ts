/**
 * Vite Plugin Server-Side Code
 * Created: 2024-07-31
 * Purpose: Isolate Node.js-specific code for the Vite plugin
 */

import type { AppBootstrapOptions } from './types';
import { generateAppBootstrap } from './vite-plugin-utils';

export function generateDevModeFiles(opts: Required<AppBootstrapOptions>, publicDir: string = 'public'): void {
    const fs = require('fs');
    const path = require('path');

    // Create a minimal development asset manifest
    const devAssetManifest = {
        js: {
            'main.js': '/src/main.tsx',
        },
        css: {},
        loadingSequence: {
            js: ['main.js'],
            css: []
        },
        totalOriginalSize: 0,
        buildInfo: {
            timestamp: Date.now(),
            version: '1.0.0-dev',
            appName: opts.appName,
            compressionEnabled: false,
            chunksGenerated: 1,
            plugin: 'app-bootstrap-lib-dev'
        }
    };

    // Generate development AppBootstrap.js
    const devAppBootstrapContent = generateAppBootstrap(devAssetManifest, opts);

    // Write files to public directory
    const fullPublicDir = path.join(process.cwd(), publicDir);

    // Ensure public directory exists
    if (!fs.existsSync(fullPublicDir)) {
        fs.mkdirSync(fullPublicDir, { recursive: true });
    }

    // Write asset-manifest.js
    const assetManifestPath = path.join(fullPublicDir, 'asset-manifest.js');
    const assetManifestContent = `window.ASSET_MANIFEST = ${JSON.stringify(devAssetManifest, null, 2)};`;
    fs.writeFileSync(assetManifestPath, assetManifestContent);

    // Write AppBootstrap.js
    const appBootstrapPath = path.join(fullPublicDir, opts.bootstrapFileName);
    fs.writeFileSync(appBootstrapPath, devAppBootstrapContent);

    if (opts.debugMode) {
        console.log(`[app-bootstrap-lib] 📝 Generated development files:`);
        console.log(`[app-bootstrap-lib] ✅ ${opts.bootstrapFileName}`);
        console.log(`[app-bootstrap-lib] ✅ asset-manifest.js`);
    }
}
