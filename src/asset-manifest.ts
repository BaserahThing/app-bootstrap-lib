/**
 * Asset Manifest Generator
 * Created: 2024-12-19
 * Purpose: Generate asset manifests with file sizes and compression info
 */

import * as fs from 'fs';
import * as path from 'path';

export interface AssetInfo {
    original: string;
    logical: string;
    gzipped: string | null;
    size: number;
    gzipSize: number;
    compressionRatio: number;
}

export interface AssetManifestData {
    css: Record<string, AssetInfo>;
    js: Record<string, AssetInfo>;
    assets: Record<string, AssetInfo>;
    buildInfo: {
        timestamp: number;
        version: string;
        compressionRatio: number;
        totalOriginalSize: number;
        totalCompressedSize: number;
    };
}

export class AssetManifestGenerator {
    private distDir: string;
    private outputFile: string;
    private manifest: AssetManifestData;

    constructor(distDir: string, outputFile: string) {
        this.distDir = distDir;
        this.outputFile = outputFile;
        this.manifest = {
            css: {},
            js: {},
            assets: {},
            buildInfo: {
                timestamp: Date.now(),
                version: "1.0.0",
                compressionRatio: 0,
                totalOriginalSize: 0,
                totalCompressedSize: 0
            }
        };
    }

    /**
     * Generate the complete asset manifest
     */
    async generate(): Promise<void> {
        console.log('🔍 Scanning build directory:', this.distDir);

        if (!fs.existsSync(this.distDir)) {
            throw new Error(`Build directory not found: ${this.distDir}`);
        }

        // Scan all files in the dist directory
        await this.scanDirectory(this.distDir);

        // Calculate compression statistics
        this.calculateCompressionStats();

        // Generate the manifest file
        this.writeManifest();

        console.log('✅ Asset manifest generated successfully!');
        this.printStats();
    }

    /**
     * Recursively scan directory for assets
     */
    private async scanDirectory(dir: string, relativePath: string = ''): Promise<void> {
        const items = fs.readdirSync(dir);

        for (const item of items) {
            const fullPath = path.join(dir, item);
            const relativeFilePath = path.join(relativePath, item).replace(/\\/g, '/');
            const webPath = '/' + relativeFilePath;

            if (fs.statSync(fullPath).isDirectory()) {
                await this.scanDirectory(fullPath, relativeFilePath);
            } else {
                await this.processFile(fullPath, webPath);
            }
        }
    }

    /**
     * Extract logical name from hashed filename
     * e.g., "vendor-l0sNRNKZ.js" -> "vendor.js"
     */
    private getLogicalName(fileName: string): string {
        // Remove hash pattern (e.g., -l0sNRNKZ) from filename
        const hashPattern = /-[a-zA-Z0-9]{8,}/;
        return fileName.replace(hashPattern, '');
    }

    /**
     * Process individual file
     */
    private async processFile(filePath: string, webPath: string): Promise<void> {
        const ext = path.extname(filePath).toLowerCase();
        const fileName = path.basename(filePath);

        // Skip .gz files (we'll handle them separately)
        if (ext === '.gz') {
            return;
        }

        const stats = fs.statSync(filePath);
        const gzipPath = filePath + '.gz';
        const hasGzip = fs.existsSync(gzipPath);

        let gzipSize = 0;
        if (hasGzip) {
            gzipSize = fs.statSync(gzipPath).size;
        }

        // For hashed files, create logical name mapping
        let logicalPath = webPath;
        if ((webPath.includes('/assets/') || webPath.startsWith('/workbox')) && (ext === '.js' || ext === '.css')) {
            const logicalFileName = this.getLogicalName(fileName);
            logicalPath = webPath.replace(fileName, logicalFileName);
        }

        const assetInfo: AssetInfo = {
            original: webPath,  // The actual hashed filename
            logical: logicalPath, // The logical name clients will request
            gzipped: hasGzip ? webPath + '.gz' : null,
            size: stats.size,
            gzipSize: gzipSize,
            compressionRatio: hasGzip ? Number(((stats.size - gzipSize) / stats.size * 100).toFixed(1)) : 0
        };

        // Categorize the file using logical path as key
        if (ext === '.css') {
            this.manifest.css[logicalPath] = assetInfo;
            console.log(`📄 CSS: ${logicalPath} → ${webPath} (${this.formatSize(stats.size)} → ${this.formatSize(gzipSize)})`);
        } else if (ext === '.js') {
            this.manifest.js[logicalPath] = assetInfo;
            console.log(`📜 JS: ${logicalPath} → ${webPath} (${this.formatSize(stats.size)} → ${this.formatSize(gzipSize)})`);
        } else if (this.isAssetFile(ext)) {
            this.manifest.assets[logicalPath] = assetInfo;
            console.log(`🖼️ Asset: ${logicalPath} (${this.formatSize(stats.size)})`);
        }

        // Add to totals
        this.manifest.buildInfo.totalOriginalSize += stats.size;
        this.manifest.buildInfo.totalCompressedSize += gzipSize || stats.size;
    }

    /**
     * Check if file is an asset (image, font, etc.)
     */
    private isAssetFile(ext: string): boolean {
        const assetExtensions = [
            '.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp',
            '.ico', '.woff', '.woff2', '.ttf', '.eot',
            '.json', '.webmanifest', '.txt', '.html'
        ];
        return assetExtensions.includes(ext);
    }

    /**
     * Calculate overall compression statistics
     */
    private calculateCompressionStats(): void {
        const { totalOriginalSize, totalCompressedSize } = this.manifest.buildInfo;

        if (totalOriginalSize > 0) {
            this.manifest.buildInfo.compressionRatio =
                Number(((totalOriginalSize - totalCompressedSize) / totalOriginalSize * 100).toFixed(1));
        }
    }

    /**
     * Write the manifest file
     */
    private writeManifest(): void {
        const manifestContent = `/**
 * Asset Manifest - Dynamic Asset Mapping
 * This file is populated during the build process with actual hashed filenames
 * DO NOT EDIT MANUALLY - Generated by app-bootstrap-lib
 * Generated: ${new Date().toISOString()}
 */

// Dynamic asset mappings with actual hashed filenames
window.ASSET_MANIFEST = ${JSON.stringify(this.manifest, null, 4)};

// Helper function to get asset info by logical path
window.getAssetInfo = function(path) {
  const categories = ['css', 'js', 'assets'];

  for (const category of categories) {
    if (window.ASSET_MANIFEST[category] && window.ASSET_MANIFEST[category][path]) {
      return window.ASSET_MANIFEST[category][path];
    }
  }

  return null;
};

// Helper function to get actual file path (handles logical->actual mapping)
window.getActualPath = function(path) {
  const assetInfo = window.getAssetInfo(path);
  return assetInfo ? assetInfo.original : path;
};

// Helper function to get gzipped path
window.getGzippedPath = function(path) {
  const assetInfo = window.getAssetInfo(path);
  return assetInfo && assetInfo.gzipped ? assetInfo.gzipped : null;
};

// Helper function to check if gzip is available
window.hasGzipVersion = function(path) {
  const assetInfo = window.getAssetInfo(path);
  return assetInfo && assetInfo.gzipped !== null;
};

console.log('Asset manifest loaded:', window.ASSET_MANIFEST.buildInfo);
`;

        fs.writeFileSync(this.outputFile, manifestContent, 'utf8');
        console.log('💾 Manifest written to:', this.outputFile);
    }

    /**
     * Format file size for display
     */
    private formatSize(bytes: number): string {
        if (bytes === 0) return '0 B';

        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }

    /**
     * Print compression statistics
     */
    private printStats(): void {
        const { totalOriginalSize, totalCompressedSize, compressionRatio } = this.manifest.buildInfo;

        console.log('\n📊 Compression Statistics:');
        console.log(`   Original Size: ${this.formatSize(totalOriginalSize)}`);
        console.log(`   Compressed Size: ${this.formatSize(totalCompressedSize)}`);
        console.log(`   Compression Ratio: ${compressionRatio}%`);
        console.log(`   Space Saved: ${this.formatSize(totalOriginalSize - totalCompressedSize)}`);

        // Count files by type
        const cssCount = Object.keys(this.manifest.css).length;
        const jsCount = Object.keys(this.manifest.js).length;
        const assetCount = Object.keys(this.manifest.assets).length;

        console.log('\n📁 File Counts:');
        console.log(`   CSS Files: ${cssCount}`);
        console.log(`   JS Files: ${jsCount}`);
        console.log(`   Other Assets: ${assetCount}`);
        console.log(`   Total Files: ${cssCount + jsCount + assetCount}`);
    }

    /**
     * Get the generated manifest
     */
    getManifest(): AssetManifestData {
        return this.manifest;
    }
}

/**
 * Generate asset manifest from command line
 */
export async function generateAssetManifest(distDir: string = './dist', outputFile?: string): Promise<void> {
    const defaultOutputFile = path.join(distDir, 'asset-manifest.js');
    const finalOutputFile = outputFile || defaultOutputFile;

    console.log('🚀 Starting Asset Manifest Generation...');
    console.log(`   Build Directory: ${distDir}`);
    console.log(`   Output File: ${finalOutputFile}`);

    const generator = new AssetManifestGenerator(distDir, finalOutputFile);
    await generator.generate();
}

// CLI support - only run if this file is executed directly
// Check if we're in a Node.js environment and this is the main module
if (typeof process !== 'undefined' && process.argv && process.argv[1] && process.argv[1].includes('asset-manifest')) {
    const args = process.argv.slice(2);
    const distDir = args[0] || './dist';
    const outputFile = args[1];

    generateAssetManifest(distDir, outputFile).catch(error => {
        console.error('❌ Error generating asset manifest:', error);
        process.exit(1);
    });
}
