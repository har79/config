import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import TerserJSPlugin from 'terser-webpack-plugin'
import {merge} from 'webpack-merge'

import common from './webpack.common.js'

export default merge(common, {
  mode: 'production',
  optimization: {
    minimizer: [new TerserJSPlugin(), new CssMinimizerPlugin()],
    sideEffects: true,
  },
})
