const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Key fixes for Windows cross-platform
config.resolver.unstable_enablePackageExports = false;
config.resolver.sourceExts.push('css');

// Normalize project root for Windows ESM loaders
config.projectRoot = path.resolve(__dirname);
config.watchFolders = [config.projectRoot];

module.exports = withNativeWind(config, { input: './global.css' });