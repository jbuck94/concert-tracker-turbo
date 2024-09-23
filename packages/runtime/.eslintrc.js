module.exports = {
  root: true,
  extends: ['eslint-config-custom/base'],
  parserOptions: {
    tsconfigRootDir: './',
    project: ['./tsconfig.json'],
  },
};
