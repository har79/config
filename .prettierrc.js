module.exports = {
  arrowParens: 'avoid',
  bracketSpacing: false,
  plugins: ['prettier-plugin-jsdoc'],
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
