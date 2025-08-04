import { Plugin } from 'vite';
import { b as AppBootstrapOptions } from './types-D8l6ur8u.mjs';

/**
 * PWA Bootstrap Kit - Vite Plugin
 * Created: 2024-12-19
 * Updated: 2024-12-19
 * Purpose: Vite plugin integration for PWA bootstrap functionality.
 *          Provides automatic asset manifest generation, loading optimization, and PWA configuration.
 *          Separated Node.js-specific code to prevent bundling in client builds.
 */

/**
 * Extended plugin options
 */
interface PWAAppBootstrapOptions extends AppBootstrapOptions {
}
/**
 * Main Vite plugin function
 */
declare function appBootstrapPlugin(options?: PWAAppBootstrapOptions): Plugin;

export { type PWAAppBootstrapOptions, appBootstrapPlugin, appBootstrapPlugin as default };
