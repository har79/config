const common = require('./common.config.cjs')

module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    ...(common.withReact ? ['plugin:react/recommended'] : []),
    'google',
    'prettier',
  ],
  plugins: [...(common.withReact ? ['react'] : []), '@typescript-eslint'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    curly: ['error', 'multi-line'],
    eqeqeq: ['error', 'always'],
    'no-constant-condition': ['error', {checkLoops: false}],
    'no-invalid-this': 'off',
    'require-jsdoc': 'off',
    'valid-jsdoc': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'prettier',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaFeatures: {jsx: common.withReact},
        ecmaVersion: 2018,
        project: `${common.configPath}/tsconfig.json`,
        sourceType: 'module',
        tsconfigRootDir: __dirname,
      },
    },
  ],
}
