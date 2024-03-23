module.exports = {
  extends: ['prettier'],
  ignorePatterns: ['node_modules', 'dist'],
  plugins: ['@typescript-eslint', 'unused-imports', 'prettier'],
  settings: {
    next: {
      rootDir: ['apps/*/', 'packages/*/'],
      react: {
        version: 'detect',
      },
      'import/ignore': ['node_modules'],
    },
  },
  rules: {
    '@typescript-eslint/no-unused-vars': ['warn'],
    'unused-imports/no-unused-imports': 'error',
    'sort-imports': [
      'error',
      {
        ignoreCase: false,
        ignoreDeclarationSort: true, // don"t want to sort import lines, use eslint-plugin-import instead
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        allowSeparatedGroups: true,
      },
    ],
  },
};
