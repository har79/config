const common = require('./common.config.cjs')

module.exports = {
  presets: [
    ['@babel/env', {modules: 'auto'}],
    ['@babel/typescript'],
    ...(common.withReact ? [['@babel/react', {runtime: 'automatic'}]] : []),
  ],
  plugins: [
    '@babel/transform-runtime',
    [
      'module-resolver',
      {
        root: ['.'],
        alias: common.alias,
      },
    ],
  ],
}
