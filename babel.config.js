import common from './common.config.cjs'

export default {
  presets: [
    ['@babel/env', {modules: 'auto'}],
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
}
