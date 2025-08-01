// Test HTML Transformer - Direct Implementation
function transformIndexHtml(html, options, workboxOptions) {
    const bootstrapScript = `<script src="/${options.bootstrapFileName}"></script>`;
    const swRegistrationScript = workboxOptions?.enabled !== false ? `<script src="/registerSW.js"></script>` : '';

    console.log('Debug info:');
    console.log('- bootstrapScript:', bootstrapScript);
    console.log('- swRegistrationScript:', swRegistrationScript);
    console.log('- workboxOptions.enabled:', workboxOptions?.enabled);

    // Insert before closing head tag
    if (html.includes('</head>')) {
        const scriptsToAdd = [bootstrapScript];
        if (swRegistrationScript) {
            scriptsToAdd.push(swRegistrationScript);
        }
        const result = html.replace('</head>', `  ${scriptsToAdd.join('\n  ')}\n</head>`);
        console.log('✅ Found </head> tag, inserted scripts before it');
        return result;
    }

    // Insert at the beginning if no head tag
    const scriptsToAdd = [bootstrapScript];
    if (swRegistrationScript) {
        scriptsToAdd.push(swRegistrationScript);
    }
    const result = scriptsToAdd.join('\n') + '\n' + html;
    console.log('⚠️ No </head> tag found, inserted scripts at beginning');
    return result;
}

// Test HTML
const testHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test</title>
</head>
<body>
    <div id="root"></div>
</body>
</html>`;

// Test options
const options = {
    bootstrapFileName: 'AppBootstrap.js',
    appName: 'Test App',
    loadingTheme: 'gradient',
    enableGzip: false,
    enableProgress: true,
    enableFallback: true,
    debugMode: false,
    appIcon: '⚡',
    customTheme: '',
    enableCDNFallback: false,
    compressionFirst: false,
    customChunks: {},
    chunkPriorities: {},
    assetPrefix: '',
    gzipLoaderConfig: {
        debugMode: false,
        useGzip: false,
        fallbackToUncompressed: true,
        timeout: 10000,
        retries: 3
    }
};

const workboxOptions = {
    enabled: true
};

console.log('Testing HTML Transformer...');
console.log('Input HTML:');
console.log(testHtml);
console.log('\n---\n');

const result = transformIndexHtml(testHtml, options, workboxOptions);

console.log('Output HTML:');
console.log(result);
console.log('\n---\n');

// Check if registerSW.js was added
if (result.includes('registerSW.js')) {
    console.log('✅ registerSW.js script was added successfully');
} else {
    console.log('❌ registerSW.js script was NOT added');
}

// Check if AppBootstrap.js was added
if (result.includes('AppBootstrap.js')) {
    console.log('✅ AppBootstrap.js script was added successfully');
} else {
    console.log('❌ AppBootstrap.js script was NOT added');
}
