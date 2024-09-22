module.exports = {
  root: true,
  extends: ['eslint-config-custom/base'],
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
};
