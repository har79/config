import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

import common from './common.config.cjs'

export default {
  context: path.resolve(process.cwd(), 'src'),
  entry: common.withReact ? 'index.tsx' : 'index.ts',
  mode: 'none',
  output: {
    filename: 'app.js',
    path: path.resolve(process.cwd(), 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(c|sa|sc)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    extensions: common.extensions,
    modules: common.modules,
  },
  plugins: [
    ...(common.withLodash ? new LodashModuleReplacementPlugin() : []),
    new HtmlWebpackPlugin({
      title: 'mallet',
      template: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
}
