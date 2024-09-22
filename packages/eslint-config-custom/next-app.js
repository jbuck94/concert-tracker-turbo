module.exports = {
  extends: ['next', './base.js'],
  plugins: ['react', 'react-hooks'],
  parser: '@typescript-eslint/parser',
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
    'react/jsx-key': 'off',
    'react-hooks/exhaustive-deps': 'error',
  },
};
