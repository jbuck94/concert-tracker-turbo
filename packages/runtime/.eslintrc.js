module.exports = {
  root: true,
  extends: ['eslint-config-custom/base'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
}