const common = require('./common.config.cjs')

module.exports = {
  presets: [
    ['@babel/env', {modules: 'auto'}],
    ['@babel/typescript'],
    ...(common.withReact ? [['@babel/react', {runtime: 'automatic'}]] : []),
  ],
  plugins: [
    '@babel/transform-runtime',
    ...(common.withLodash ? ['lodash'] : []),
    [
      'module-resolver',
      {
        root: ['.'],
        alias: common.alias,
      },
    ],
  ],
}
