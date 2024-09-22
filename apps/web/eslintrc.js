module.exports = {
  root: true,
  extends: ['eslint-config-custom/next-app'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  rules: {
    '@typescript-eslint/no-unsafe-assignment': 'warn',
  },
};
