import { Plugin } from 'vite';
import { b as AppBootstrapOptions } from './types-D8l6ur8u.js';

/**
 * Enhanced Bootstrap Plugin - Server-Side Manifest Integration
 * Created: 2024-12-19
 * Purpose: Provides enhanced bootstrap functionality with unified manifest generation
 *          Works seamlessly with SPA handler and PWA plugin without runtime dependencies
 */

/**
 * Enhanced plugin options for bootstrap functionality
 */
interface EnhancedPWAOptions extends AppBootstrapOptions {
    /** Generate unified manifest for SPA handler integration */
    generateUnifiedManifest?: boolean;
    /** Manifest integration options */
    manifestIntegration?: {
        /** Include PWA manifest entries */
        includePWA?: boolean;
        /** Include service worker entries */
        includeSW?: boolean;
        /** Custom manifest entries */
        customEntries?: Array<{
            url: string;
            revision?: string | null;
        }>;
    };
}
/**
 * Enhanced PWA Bootstrap Plugin - Bootstrap only, no PWA integration
 */
declare function enhancedPWABootstrapPlugin(options?: EnhancedPWAOptions): Plugin[];

export { type EnhancedPWAOptions, enhancedPWABootstrapPlugin as default, enhancedPWABootstrapPlugin };
