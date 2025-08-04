/**
 * Enhanced Bootstrap Plugin - Server-Side Manifest Integration
 * Created: 2024-12-19
 * Purpose: Provides enhanced bootstrap functionality with unified manifest generation
 *          Works seamlessly with SPA handler and PWA plugin without runtime dependencies
 */

import type { Plugin } from 'vite';
import type { AppBootstrapOptions, AssetManifest } from './types';
import { generateAppBootstrap } from './vite-plugin-utils';

/**
 * Enhanced plugin options for bootstrap functionality
 */
export interface EnhancedPWAOptions extends AppBootstrapOptions {
    /** Generate unified manifest for SPA handler integration */
    generateUnifiedManifest?: boolean;
    /** Manifest integration options */
    manifestIntegration?: {
        /** Include PWA manifest entries */
        includePWA?: boolean;
        /** Include service worker entries */
        includeSW?: boolean;
        /** Custom manifest entries */
        customEntries?: Array<{ url: string; revision?: string | null }>;
    };
}

/**
 * Enhanced PWA Bootstrap Plugin - Bootstrap only, no PWA integration
 */
export function enhancedPWABootstrapPlugin(options: EnhancedPWAOptions = {}): Plugin[] {
    return [createBootstrapPlugin(options)];
}

/**
 * Create the bootstrap plugin with enhanced functionality
 */
function createBootstrapPlugin(options: AppBootstrapOptions): Plugin {
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

    return {
        name: 'enhanced-pwa-bootstrap',

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

            if (opts.debugMode) {
                console.log('[enhanced-pwa-bootstrap] App name:', opts.appName);
                console.log('[enhanced-pwa-bootstrap] Theme:', opts.loadingTheme);
            }

            return config;
        },

        transformIndexHtml(html) {
            console.log('[enhanced-pwa-bootstrap] 🔍 Transforming index.html...');

            // Inject bootstrap script
            let result = html;
            if (!result.includes('AppBootstrap.js')) {
                result = result.replace(
                    '</head>',
                    `  <script src="/${opts.bootstrapFileName}"></script>\n  </head>`
                );
            }

            console.log('[enhanced-pwa-bootstrap] ✅ HTML transformation complete');
            return result;
        },

        generateBundle(_options: any, bundle: any) {
            // Analyze build output and create asset manifest
            buildAssets = analyzeBuildOutput(bundle, opts.assetPrefix);

            // Generate bootstrap script
            const bootstrapScript = generateAppBootstrap(buildAssets, opts);

            // Add bootstrap script to bundle
            bundle[opts.bootstrapFileName] = {
                type: 'chunk',
                fileName: opts.bootstrapFileName,
                code: bootstrapScript,
                isEntry: false
            };

            // Generate enhanced asset manifest with SPA handler integration
            const enhancedManifest = generateEnhancedManifest(buildAssets, opts, options);

            // Add asset manifest to bundle
            bundle['asset-manifest.js'] = {
                type: 'chunk',
                fileName: 'asset-manifest.js',
                code: `window.__ASSET_MANIFEST__ = ${JSON.stringify(enhancedManifest, null, 2)};`,
                isEntry: false
            };

            // Generate unified manifest for SPA handler
            const enhancedOptions = options as EnhancedPWAOptions;
            if (enhancedOptions.generateUnifiedManifest) {
                const unifiedManifest = generateUnifiedManifest(enhancedManifest, enhancedOptions);
                bundle['unified-manifest.json'] = {
                    type: 'asset',
                    fileName: 'unified-manifest.json',
                    source: JSON.stringify(unifiedManifest, null, 2)
                };
            }

            console.log('[enhanced-pwa-bootstrap] ✅ Bundle generation complete');
        }
    };
}

/**
 * Generate enhanced asset manifest with SPA handler integration
 */
function generateEnhancedManifest(assetManifest: AssetManifest, opts: Required<AppBootstrapOptions>, options: EnhancedPWAOptions): AssetManifest {
    const enhancedManifest = {
        ...assetManifest,
        buildInfo: {
            ...assetManifest.buildInfo,
            appName: opts.appName,
            compressionEnabled: opts.enableGzip,
            plugin: 'enhanced-pwa-bootstrap',
            spaHandlerCompatible: true,
            timestamp: Date.now()
        },
        // SPA Handler specific metadata
        spaHandler: {
            rootPath: '/',
            fallbackFile: 'index.html',
            enableCompression: opts.enableGzip,
            enableCaching: true,
            cacheMaxAge: 86400, // 24 hours
            systemFiles: [
                'AppBootstrap.js',
                'asset-manifest.js',
                'unified-manifest.json'
            ]
        },
        // PWA integration metadata
        pwa: {
            enabled: options.manifestIntegration?.includePWA || false,
            manifestFile: 'manifest.webmanifest',
            serviceWorkerFile: 'sw.js',
            workboxFile: 'workbox-*.js'
        }
    };

    return enhancedManifest;
}

/**
 * Generate unified manifest for SPA handler
 */
function generateUnifiedManifest(enhancedManifest: AssetManifest, options: EnhancedPWAOptions) {
    const entries: Array<{ url: string; revision?: string | null }> = [];

    // Add all JS and CSS files
    Object.keys(enhancedManifest.js).forEach(file => {
        entries.push({ url: enhancedManifest.js[file], revision: null });
    });

    Object.keys(enhancedManifest.css).forEach(file => {
        entries.push({ url: enhancedManifest.css[file], revision: null });
    });

    // Add system files
    entries.push(
        { url: '/AppBootstrap.js', revision: null },
        { url: '/asset-manifest.js', revision: null },
        { url: '/unified-manifest.json', revision: null }
    );

    // Add PWA files if enabled
    if (options.manifestIntegration?.includePWA) {
        entries.push(
            { url: '/manifest.webmanifest', revision: null },
            { url: '/sw.js', revision: null }
        );
    }

    // Add custom entries
    if (options.manifestIntegration?.customEntries) {
        entries.push(...options.manifestIntegration.customEntries);
    }

    return {
        version: '1.0.0',
        timestamp: Date.now(),
        entries,
        metadata: {
            totalFiles: entries.length,
            spaHandlerCompatible: true,
            pwaEnabled: options.manifestIntegration?.includePWA || false
        }
    };
}

/**
 * Analyze build output and create asset manifest
 */
function analyzeBuildOutput(bundle: any, assetPrefix: string = ''): AssetManifest {
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

    return {
        js,
        css,
        loadingSequence: {
            js: Object.keys(js),
            css: Object.keys(css)
        },
        totalOriginalSize,
        buildInfo: {
            timestamp: Date.now(),
            version: '1.2.0',
            appName: 'Enhanced PWA App',
            compressionEnabled: false,
            chunksGenerated: Object.keys(js).length,
            plugin: 'enhanced-pwa-bootstrap'
        }
    };
}

// Export the main plugin function
export default enhancedPWABootstrapPlugin;
