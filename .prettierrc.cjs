const common = require('./common.config.cjs')

module.exports = {
  arrowParens: 'avoid',
  bracketSpacing: false,
  plugins: [
    ...(common.useGoTemplate ? ['prettier-plugin-go-template'], []),
    'prettier-plugin-jsdoc',
    'prettier-plugin-sh',
    '@ianvs/prettier-plugin-sort-imports',
  ],
  importOrder: [
    'react',
    '<THIRD_PARTY_MODULES>',
    '',
    '^src/.*$',
    '^[.](?!.*[.]css$).*$',
    '[.]css$',
  ],
  importOrderTypeScriptVersion: '5.1.0',
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
    ...(common.useGoTemplate ? [{
      files: '*.html',
      options: {
        parse: 'go-template',
      },
    }], [])
  ],
}
