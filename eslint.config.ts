import eslintReact from '@eslint-react/eslint-plugin';
import eslintJs from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig({
  files: ['**/*.ts', '**/*.tsx'],

  extends: [
    eslintJs.configs.recommended,
    tseslint.configs.recommendedTypeChecked,
    eslintReact.configs['recommended-typescript'],
  ],

  languageOptions: {
    parser: tseslint.parser,

    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },

  rules: {
    /*
     * TypeScript
     */

    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],

    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
      },
    ],

    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-misused-promises': 'error',
    '@typescript-eslint/await-thenable': 'error',

    /*
     * React
     */

    '@eslint-react/no-missing-key': 'error',
    '@eslint-react/no-array-index-key': 'warn',

    /*
     * General JavaScript
     */

    eqeqeq: ['error', 'always'],
    curly: ['error', 'all'],

    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': 'error',

    'no-else-return': 'error',
    'no-unneeded-ternary': 'error',

    'prefer-const': 'error',
    'prefer-template': 'error',
    'object-shorthand': 'error',

    /*
     * Functions
     */

    'no-param-reassign': 'error',

    /*
     * Imports / modules
     */

    'no-duplicate-imports': 'error',

    /*
     * Code quality
     */

    'no-nested-ternary': 'error',
    'no-useless-return': 'error',

    'no-plusplus': 'error',
    'no-continue': 'error',

    /*
     * Switch statements
     */

    'default-case': 'error',
  },
});
