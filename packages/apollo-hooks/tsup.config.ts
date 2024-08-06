import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['generated/index.ts'],
  outDir: 'dist',
  format: ['cjs'],
  target: 'es2020',
  sourcemap: true,
  minify: true,
  clean: true,
});
