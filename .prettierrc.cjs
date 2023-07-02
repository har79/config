module.exports = {
  arrowParens: 'avoid',
  bracketSpacing: false,
  plugins: ['prettier-plugin-jsdoc', 'prettier-plugin-sh'],
  printWidth: 100,
  proseWrap: 'always',
  semi: false,
  singleQuote: true,
  trailingComma: 'es5',
  overrides: [
    {
      files: '*.ts',
      options: {
        parser: 'jsdoc-parser',
      },
    },
  ],
}
