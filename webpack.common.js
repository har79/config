const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const common = require('./common.config')

module.exports = {
  context: path.resolve(process.cwd(), 'src'),
  entry: common.withPreact ? 'bootstrap.tsx' : 'index.ts',
  mode: 'none',
  output: {
    filename: 'app.js',
    path: path.resolve(process.cwd(), 'dist'),
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
    alias: Object.fromEntries(
      Object.entries(common.alias).map(([k, v]) => [k, v[0]])
    ),
    extensions: common.extensions,
    modules: common.modules,
  },
  plugins: [
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
