# Changelog

All notable changes to the `@basirah/app-bootstrap-lib` project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.4] - 2024-12-19

### Fixed
- **Script Type Issue**: Fixed the `loadJS` function to properly handle both module and non-module scripts
  - Now detects `.mjs` files and sets `type="module"` appropriately
  - Defaults to `type="text/javascript"` for regular `.js` files
  - Prevents loading issues with non-module scripts

- **Total Chunks Calculation**: Fixed the `totalChunks` calculation in the loading state
  - Now correctly includes both JS and CSS files in the total count
  - Provides more accurate progress tracking

- **Error Handling**: Improved error handling in the `loadAssets` function
  - Added comprehensive error collection and reporting
  - Better error messages with file-specific information
  - Enhanced loading state with duration tracking

### Added
- **Enhanced Loading State**: Added `endTime` and `duration` properties to track loading performance
- **Better Error Reporting**: Errors are now collected and reported with detailed information
- **Prepublish Script**: Added `prepublishOnly` script to ensure builds are up-to-date before publishing

### Changed
- **Version Bump**: Updated from 1.0.3 to 1.0.4
- **Build Improvements**: Enhanced build process with better error handling

## [1.0.3] - 2024-12-19

### Added
- Initial release of the unified app bootstrap library
- Vite plugin for automatic AppBootstrap.js generation
- React hooks for easy integration
- Cache manager for loading screens and service worker management
- Asset manifest generator for detailed build information

### Features
- **Vite Plugin**: Automatically generates AppBootstrap.js and asset manifests
- **React Hooks**: Easy integration with React applications
- **Cache Manager**: Loading screens and service worker management
- **Asset Manifest Generator**: CLI tool for generating detailed asset manifests
- **Multiple Themes**: Support for gradient, minimal, and custom loading themes
- **Debug Mode**: Comprehensive debugging and logging capabilities 