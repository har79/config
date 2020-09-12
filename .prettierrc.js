module.exports = {
  arrowParens: 'avoid',
  bracketSpacing: false,
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
