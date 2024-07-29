import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/main.ts'],
  outDir: 'dist',
  format: ['cjs'],
  target: 'node14',
  sourcemap: true,
  minify: true,
  clean: true,
});
