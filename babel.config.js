const common = require('./common.config')

module.exports = {
  presets: [
    ['@babel/env', {modules: false}],
    ['@babel/typescript', {jsxPragma: 'h'}],
    ...(common.withPreact ? ['@babel/react'] : []),
  ],
  plugins: [
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread',
    ...(common.withPreact
      ? [['@babel/transform-react-jsx', {pragma: 'h'}]]
      : []),
    '@babel/transform-runtime',
    [
      'module-resolver',
      {
        root: ['.'],
        alias: common.alias,
      },
    ],
  ],
  env: {
    test: {
      plugins: ['@babel/transform-modules-commonjs'],
    },
  },
}
