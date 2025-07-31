import { defineConfig } from 'tsup';

export default defineConfig({
    entry: {
        index: 'src/index.ts',
        'build-time': 'src/build-time.ts',
        vite: 'src/vite.ts',
        react: 'src/react.ts',
        cache: 'src/cache.ts'
    },
    format: ['cjs', 'esm'],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    treeshake: true,
    external: ['react', 'vite']
});
