# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2024-12-19

### 🚀 Added
- **New PWA Module**: Complete PWA functionality with service worker registration and install prompts
- **Disableable PWA**: PWA functionality can now be disabled from project vite config
- **Enhanced Vite Plugin**: Support for PWA configuration and better asset optimization
- **Improved Documentation**: Comprehensive README with examples and API reference
- **GitHub Actions**: Automated CI/CD workflows for testing and publishing
- **Better TypeScript Support**: Enhanced type definitions and interfaces

### 🔧 Changed
- **Package Rename**: Renamed from `@basirah/pwa-bootstrap-kit` to `@basirah/vite-pwa-bootstrap`
- **Enhanced Build Process**: Improved tsup configuration with minification and better targeting
- **Updated Dependencies**: Latest versions of all dependencies
- **Better Error Handling**: Improved error messages and debugging information

### 🐛 Fixed
- **TypeScript Issues**: Fixed type definitions and interface compatibility
- **Build Output**: Ensured all required files are generated correctly
- **Documentation**: Updated all examples and usage instructions

### 📚 Documentation
- **Complete API Reference**: Detailed documentation for all modules and functions
- **Migration Guide**: Step-by-step migration from previous versions
- **Examples**: Comprehensive examples for different use cases
- **Themes**: Documentation for all available loading themes

## [1.1.5] - 2024-12-19

### 🔧 Changed
- **Build Optimization**: Improved build process and output optimization
- **Type Definitions**: Enhanced TypeScript type definitions

### 🐛 Fixed
- **Asset Manifest**: Fixed asset manifest generation issues
- **Service Worker**: Improved service worker registration

## [1.1.0] - 2024-12-19

### 🚀 Added
- **Workbox Integration**: Advanced service worker functionality
- **Asset Manifest Generator**: CLI tool for generating detailed asset manifests
- **React Hooks**: Easy integration with React applications

### 🔧 Changed
- **Vite Plugin**: Enhanced Vite plugin with better configuration options
- **Cache Manager**: Improved cache management functionality

## [1.0.0] - 2024-12-19

### 🚀 Added
- **Initial Release**: Basic Vite plugin and cache management
- **React Integration**: Basic React hooks for app bootstrap
- **Loading Screens**: Multiple loading screen themes
- **Asset Optimization**: Basic asset loading optimization

---

## Migration Guide

### From 1.1.x to 1.2.0

1. **Update Package Name**:
   ```bash
   npm uninstall @basirah/pwa-bootstrap-kit
   npm install @basirah/vite-pwa-bootstrap
   ```

2. **Update Imports**:
   ```typescript
   // Old
   import { appBootstrapPlugin } from '@basirah/pwa-bootstrap-kit';

   // New
   import { appBootstrapPlugin } from '@basirah/vite-pwa-bootstrap';
   ```

3. **Add PWA Configuration** (Optional):
   ```typescript
   appBootstrapPlugin({
     appName: 'My App',
     pwa: {
       enablePWA: true, // Can be disabled
       manifest: {
         name: 'My App',
         theme_color: '#667eea'
       }
     }
   })
   ```

### From 1.0.x to 1.1.x

1. **Update Dependencies**:
   ```bash
   npm update @basirah/pwa-bootstrap-kit
   ```

2. **Add Workbox Configuration** (Optional):
   ```typescript
   appBootstrapPlugin({
     appName: 'My App',
     workbox: {
       enabled: true,
       strategies: {
         js: 'cache-first',
         css: 'stale-while-revalidate'
       }
     }
   })
   ```

---

## Support

- 📧 Email: support@basirah.com
- 🐛 Issues: [GitHub Issues](https://github.com/BaserahThing/vite-pwa-bootstrap/issues)
- 📖 Documentation: [GitHub Wiki](https://github.com/BaserahThing/vite-pwa-bootstrap/wiki)
