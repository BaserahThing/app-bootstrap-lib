/**
 * Build-time exports for App Bootstrap Library
 * Created: 2024-12-19
 * Purpose: Exports for build-time tools that should not be bundled for browser
 */

// Export asset manifest generator for build-time use only
export {
    AssetManifestGenerator,
    generateAssetManifest,
    type AssetInfo,
    type AssetManifestData
} from './asset-manifest';
