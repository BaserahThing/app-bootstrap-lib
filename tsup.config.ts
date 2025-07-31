import { defineConfig } from 'tsup';

export default defineConfig({
    entry: [
        'src/index.ts',
        'src/build-time.ts',
        'src/vite.ts',
        'src/react.ts',
        'src/cache.ts',
    ],
    format: ['cjs', 'esm'],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    external: ['react'],
    outExtension({ format }) {
        return {
            js: format === 'esm' ? '.mjs' : '.js',
        };
    },
    treeshake: true,
});
