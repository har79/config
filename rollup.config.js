const common = require('./common.config')

import autoExternal from 'rollup-plugin-auto-external'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'

module.exports = {
  input: 'src/index.ts',
  external: id => id.includes('@babel/runtime'),
  plugins: [
    autoExternal(),
    resolve({extensions: common.extensions}),
    babel({
      include: ['src/**/*'],
      extensions: common.extensions,
      babelHelpers: 'runtime',
    }),
    commonjs(),
  ],
  output: [
    {
      dir: 'lib',
      format: 'cjs',
      preserveModules: true,
      sourcemap: true,
    },
    {
      dir: 'lib',
      entryFileNames: '[name].mjs',
      format: 'es',
      preserveModules: true,
      sourcemap: true,
    },
  ],
}
