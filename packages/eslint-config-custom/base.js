module.exports = {
  extends: [
    "turbo",
    "prettier",
    "plugin:import/recommended",
    "plugin:import/typescript",
  ],
  plugins: ["import", "unused-imports", "prettier", "@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  ignorePatterns: ["dist/**/*", "/coverage/"],
  rules: {
    "@typescript-eslint/no-unsafe-assignment": "error",
    "require-await": "warn",
    "no-console": "warn",
    "unused-imports/no-unused-imports": "error",
    "sort-imports": [
      "error",
      {
        ignoreCase: false,
        ignoreDeclarationSort: true, // don"t want to sort import lines, use eslint-plugin-import instead
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
        allowSeparatedGroups: true,
      },
    ],
    "import/no-cycle": "warn",
    "import/no-unresolved": "error",
    "import/no-named-as-default-member": "off",
    "import/no-anonymous-default-export": [
      "error",
      {
        allowArray: false,
        allowArrowFunction: false,
        allowAnonymousClass: false,
        allowAnonymousFunction: false,
        allowCallExpression: true,
        allowNew: false,
        allowLiteral: false,
        allowObject: true,
      },
    ],
    "no-restricted-imports": [
      "error",
      {
        patterns: [
          {
            group: [".*"],
            message: "Relative imports are not allowed.",
          },
        ],
      },
    ],
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          ["sibling", "parent"], // Relative imports
          "unknown", // <- unknown
        ],
        pathGroups: [
          {
            pattern: "react",
            group: "builtin",
          },
          {
            pattern: "react-dom",
            group: "builtin",
          },
          {
            pattern: "next/**",
            group: "builtin",
          },
          {
            pattern: "src/**",
            group: "internal",
          },
          {
            pattern: "test/**",
            group: "internal",
          },
          {
            pattern: "style/**",
            group: "unknown",
          },
        ],
        pathGroupsExcludedImportTypes: ["react", "react-dom", "next/**"],
        "newlines-between": "always",
        alphabetize: {
          /* sort in ascending order. Options: ["ignore", "asc", "desc"] */
          order: "asc",
          /* ignore case. Options: [true, false] */
          caseInsensitive: true,
        },
      },
    ],
    "prettier/prettier": [
      "error",
      {
        semi: true,
        singleQuote: true,
        tabWidth: 2,
        useTabs: false,
        trailingComma: "es5",
      },
    ],
    eqeqeq: ["error", "always"],
  },
  overrides: [
    {
      files: ["*.test.ts", "*.spec.ts"],
      rules: {
        "@typescript-eslint/no-unsafe-assignment": ["off"],
        "jest/no-disabled-tests": "warn",
        "jest/no-focused-tests": "error",
        "jest/no-identical-title": "error",
        "jest/prefer-to-have-length": "warn",
        "jest/valid-expect": "error",
      },
    },
  ],
  settings: {
    "import/resolver": {
      typescript: {
        project: "./tsconfig.json",
      },
    },
  },
};
