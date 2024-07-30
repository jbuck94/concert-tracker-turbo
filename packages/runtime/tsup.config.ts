import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  target: 'node18',
  format: ['cjs'],
  platform: 'node',
  clean: true,
  sourcemap: true,
  dts: true,
});
