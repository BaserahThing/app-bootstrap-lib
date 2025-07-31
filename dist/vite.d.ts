import { Plugin } from 'vite';
import { b as AppBootstrapOptions } from './types-D8l6ur8u.js';
import { WorkboxOptions } from './workbox.js';

/**
 * Simplified Vite Plugin for App Bootstrap
 * Created: 2024-12-19
 * Updated: 2024-07-31
 * Purpose: Vite plugin integration for app bootstrap functionality.
 *          Separated Node.js-specific code to prevent bundling in client builds.
 */

/**
 * Main Vite plugin function
 */
declare function appBootstrapPlugin(options?: AppBootstrapOptions & {
    workbox?: WorkboxOptions;
}): Plugin;

export { appBootstrapPlugin, appBootstrapPlugin as default };
