/**
 * PWA Bootstrap Kit - Vite Plugin
 * Created: 2024-12-19
 * Updated: 2024-12-19
 * Purpose: Vite plugin integration for PWA bootstrap functionality.
 *          Provides automatic asset manifest generation, loading optimization, and PWA configuration.
 *          Separated Node.js-specific code to prevent bundling in client builds.
 */

import type { Plugin } from 'vite';
import type { AppBootstrapOptions, AssetManifest } from './types';

import { generateAppBootstrap } from './vite-plugin-utils';


// Default chunk priorities
const DEFAULT_PRIORITIES = {
    'vendor': 1,
    'main': 2,
    'app': 3,
    'chunk': 4
};

/**
 * Extended plugin options
 */
export interface PWAAppBootstrapOptions extends AppBootstrapOptions {
}

/**
 * Generate chunk configuration
 */
function generateChunkConfiguration(customChunks: Record<string, string[]> = {}): Record<string, string[]> {
    const chunks: Record<string, string[]> = {
        vendor: ['react', 'react-dom'],
        ...customChunks
    };

    return chunks;
}

/**
 * Analyze build output and create asset manifest
 */
function analyzeBuildOutput(bundle: any, priorities: Record<string, number>, assetPrefix: string = ''): AssetManifest {
    const js: Record<string, string> = {};
    const css: Record<string, string> = {};
    let totalOriginalSize = 0;

    // Process bundle files
    for (const [fileName, file] of Object.entries(bundle)) {
        const fileInfo = file as any;
        const filePath = assetPrefix ? `${assetPrefix}/${fileName}` : `/${fileName}`;

        if (fileName.endsWith('.js')) {
            js[fileName] = filePath;
            totalOriginalSize += fileInfo.code?.length || 0;
        } else if (fileName.endsWith('.css')) {
            css[fileName] = filePath;
            totalOriginalSize += fileInfo.source?.length || 0;
        }
    }

    // Create loading sequence based on priorities
    const loadingSequence = {
        js: Object.keys(js).sort((a, b) => {
            const priorityA = priorities[a] || 999;
            const priorityB = priorities[b] || 999;
            return priorityA - priorityB;
        }),
        css: Object.keys(css)
    };

    return {
        js,
        css,
        loadingSequence,
        totalOriginalSize,
        buildInfo: {
            timestamp: Date.now(),
            version: '1.2.0',
            appName: 'PWA App',
            compressionEnabled: false,
            chunksGenerated: Object.keys(js).length,
            plugin: 'pwa-bootstrap-kit'
        }
    };
}

/**
 * Transform index.html to include bootstrap script and service worker registration
 */
function transformIndexHtml(html: string, options: Required<AppBootstrapOptions>): string {
    const bootstrapScript = `<script src="/${options.bootstrapFileName}"></script>`;

    let result = html;

    // Remove development-specific scripts and main.tsx script
    result = result.replace(/<script type="module" src="\/src\/main\.tsx"><\/script>/g, '');
    result = result.replace(/<!-- Main Application Entry Point.*?-->/g, '');

    // Remove development-specific script blocks
    result = result.replace(/<!-- Development-specific scripts -->[\s\S]*?<\/script>/g, '');

    // Remove asset manifest script from body (it should be in head)
    result = result.replace(/<!-- Asset Manifest.*?-->\s*<script src="\/asset-manifest\.js"><\/script>/g, '');

    // Insert before closing head tag
    if (result.includes('</head>')) {
        result = result.replace('</head>', `  ${bootstrapScript}\n</head>`);
    } else {
        // Insert at the beginning if no head tag
        result = bootstrapScript + '\n' + result;
    }

    return result;
}

/**
 * Main Vite plugin function
 */
export default function appBootstrapPlugin(options: PWAAppBootstrapOptions = {}): Plugin {
    let buildAssets: AssetManifest;

    // Set defaults
    const opts: Required<AppBootstrapOptions> = {
        enableGzip: false,
        enableProgress: true,
        enableFallback: true,
        debugMode: false,
        appName: 'Application',
        appIcon: '⚡',
        loadingTheme: 'gradient',
        customTheme: '',
        enableCDNFallback: false,
        compressionFirst: false,
        customChunks: {},
        chunkPriorities: {},
        assetPrefix: '',
        bootstrapFileName: 'AppBootstrap.js',
        gzipLoaderConfig: {
            debugMode: false,
            useGzip: false,
            fallbackToUncompressed: true,
            timeout: 10000,
            retries: 3
        },
        ...options
    };

    // Merge priorities
    const priorities = { ...DEFAULT_PRIORITIES, ...opts.chunkPriorities };

    return {
        name: 'app-bootstrap-lib',



        config(config) {
            // Configure build options
            if (!config.build) config.build = {};
            config.build.cssCodeSplit = true;

            // Configure rollup options
            if (!config.build.rollupOptions) config.build.rollupOptions = {};
            if (!config.build.rollupOptions.output) config.build.rollupOptions.output = {};

            // Set predictable asset names
            const output = config.build.rollupOptions.output as any;
            output.entryFileNames = '[name].js';
            output.chunkFileNames = '[name].js';
            output.assetFileNames = (assetInfo: any) => {
                if (!assetInfo.name) return '[name].[ext]';
                const info = assetInfo.name.split('.');
                const ext = info[info.length - 1];
                if (/\.(css)$/.test(assetInfo.name)) {
                    return `assets/[name].${ext}`;
                }
                return '[name].[ext]';
            };

            // Generate chunks
            const chunks = generateChunkConfiguration(opts.customChunks);
            output.manualChunks = chunks;

            if (opts.debugMode) {
                console.log('[app-bootstrap-lib] App name:', opts.appName);
                console.log('[app-bootstrap-lib] Theme:', opts.loadingTheme);
            }

            return config;
        },

        transformIndexHtml(html) {
            console.log('[app-bootstrap-lib] 🔍 Transforming index.html...');
            console.log('[app-bootstrap-lib] 📄 HTML length:', html.length);

            const result = transformIndexHtml(html, opts);

            console.log('[app-bootstrap-lib] ✅ HTML transformation complete');
            console.log('[app-bootstrap-lib] 📄 Result length:', result.length);
            console.log('[app-bootstrap-lib] 🔍 Contains AppBootstrap.js:', result.includes('AppBootstrap.js'));

            return result;
        },

        generateBundle(_options: any, bundle: any) {
            // Analyze build output
            buildAssets = analyzeBuildOutput(bundle, priorities, opts.assetPrefix);

            // Generate asset manifest
            const assetManifest = {
                ...buildAssets,
                buildInfo: {
                    ...buildAssets.buildInfo,
                    appName: opts.appName,
                    compressionEnabled: opts.enableGzip,
                    plugin: 'pwa-bootstrap-kit'
                }
            };

            // Add asset manifest to bundle
            this.emitFile({
                type: 'asset',
                fileName: 'asset-manifest.js',
                source: `window.ASSET_MANIFEST = ${JSON.stringify(assetManifest, null, 2)};`
            });

            // Generate AppBootstrap.js
            const appBootstrapContent = generateAppBootstrap(assetManifest, opts);

            this.emitFile({
                type: 'asset',
                fileName: opts.bootstrapFileName,
                source: appBootstrapContent
            });



            if (opts.debugMode) {
                console.log(`[pwa-bootstrap-kit] ✅ Generated ${opts.bootstrapFileName}`);
                console.log(`[pwa-bootstrap-kit] 📦 Assets: ${Object.keys(buildAssets.js).length} JS, ${Object.keys(buildAssets.css).length} CSS`);
            }
        }
    };
}

// Named exports
export { appBootstrapPlugin };
