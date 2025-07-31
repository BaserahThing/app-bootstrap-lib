/**
 * Asset Manifest Generator
 * Created: 2024-12-19
 * Purpose: Generate asset manifests with file sizes and compression info
 */
interface AssetInfo {
    original: string;
    logical: string;
    gzipped: string | null;
    size: number;
    gzipSize: number;
    compressionRatio: number;
}
interface AssetManifestData {
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
declare class AssetManifestGenerator {
    private distDir;
    private outputFile;
    private manifest;
    constructor(distDir: string, outputFile: string);
    /**
     * Generate the complete asset manifest
     */
    generate(): Promise<void>;
    /**
     * Recursively scan directory for assets
     */
    private scanDirectory;
    /**
     * Extract logical name from hashed filename
     * e.g., "vendor-l0sNRNKZ.js" -> "vendor.js"
     */
    private getLogicalName;
    /**
     * Process individual file
     */
    private processFile;
    /**
     * Check if file is an asset (image, font, etc.)
     */
    private isAssetFile;
    /**
     * Calculate overall compression statistics
     */
    private calculateCompressionStats;
    /**
     * Write the manifest file
     */
    private writeManifest;
    /**
     * Format file size for display
     */
    private formatSize;
    /**
     * Print compression statistics
     */
    private printStats;
    /**
     * Get the generated manifest
     */
    getManifest(): AssetManifestData;
}
/**
 * Generate asset manifest from command line
 */
declare function generateAssetManifest(distDir?: string, outputFile?: string): Promise<void>;

export { type AssetInfo, type AssetManifestData, AssetManifestGenerator, generateAssetManifest };
