import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  clean: true,
  dts: true,
  platform: 'node',
  sourcemap: true,
  target: 'node20',
  format: ['cjs'],
});
