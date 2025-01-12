const common = require('./common.config.cjs')

const globals = require('globals')
const google = require('eslint-config-google')
const js = require('@eslint/js')
const prettier = require('eslint-config-prettier')
const react = common.withReact ? require('eslint-plugin-react') : undefined
const tseslint = require('typescript-eslint')
const unusedImports = require('eslint-plugin-unused-imports')

module.exports = tseslint.config(
  js.configs.recommended,
  ...(common.withReact ? [react.configs.flat.recommended] : []),
  google,
  prettier,
  {
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: common.withReact,
        },
      },
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es6,
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
      },
    },
    plugins: {
      ...(common.withReact ? [react] : []),
      'unused-imports': unusedImports,
    },
    rules: {
      curly: ['error', 'multi-line'],
      eqeqeq: ['error', 'always'],
      'no-constant-condition': ['error', {checkLoops: false}],
      'no-invalid-this': 'off',
      'no-multi-str': 'off',
      'require-jsdoc': 'off',
      'valid-jsdoc': 'off',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'no-unuseds-vars': 'off',
      'unused-imports/no-unused-imports': 'warn',
      // Redundant with no-unused-vars
      'unused-imports/no-unused-vars': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    extends: [
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      // Redundant with @typescript-eslint/no-unused-vars
      'unused-imports/no-unused-vars': 'off',
      '@typescript-eslint/no-unnecessary-condition': [
        'error',
        {
          allowConstantLoopConditions: true,
        },
      ],
    },
  }
)
