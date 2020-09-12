module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'preact', 'google', 'prettier'],
  plugins: ['react', '@typescript-eslint'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'prettier/@typescript-eslint',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 2018,
        project: './tsconfig.json',
        sourceType: 'module',
        tsconfigRootDir: __dirname,
      },
      rules: {
        curly: ['error', 'multi-line'],
        eqeqeq: ['error', 'always'],
        'no-constant-condition': ['error', {checkLoops: false}],
        'no-invalid-this': 'off',
        'require-jsdoc': 'off',
        'valid-jsdoc': 'off',
      },
    },
  ],
}
