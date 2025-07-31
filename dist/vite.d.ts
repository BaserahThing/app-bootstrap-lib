import { Plugin } from 'vite';
import { b as AppBootstrapOptions } from './types-D8l6ur8u.js';

/**
 * Simplified Vite Plugin for App Bootstrap
 * Created: 2024-12-19
 * Purpose: Vite plugin integration for app bootstrap functionality
 */

/**
 * Main Vite plugin function
 */
declare function appBootstrapPlugin(options?: AppBootstrapOptions): Plugin;

export { appBootstrapPlugin, appBootstrapPlugin as default };
