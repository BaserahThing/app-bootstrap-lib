import { defineConfig } from 'tsup';

export default defineConfig({
    entry: [
        'src/index.ts',
        'src/build-time.ts',
        'src/vite.ts',
        'src/react.ts',
        'src/cache.ts',
        'src/workbox.ts',
        'src/pwa.ts',
    ],
    format: ['cjs', 'esm'],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    external: ['react', 'fs', 'path'],
    outExtension({ format }) {
        return {
            js: format === 'esm' ? '.mjs' : '.js',
        };
    },
    treeshake: true,
    minify: true,
    target: 'es2020',
    platform: 'browser',
    onSuccess: 'echo "✅ Build completed successfully!"',
});
