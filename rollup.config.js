import common from './common.config.cjs'

import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'

export default {
  input: 'src/index.ts',
  plugins: [
    resolve({
      resolveOnly: [/^\.{0,2}\//],
      extensions: common.extensions,
    }),
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
      entryFileNames: '[name].es.js',
      format: 'es',
      preserveModules: true,
      sourcemap: true,
    },
  ],
}
