const TerserPlugin = require("terser-webpack-plugin");
const path = require('path');

module.exports = {
  target: 'node',
  entry: './src/index.js',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: 'js-duration-parser',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['*', '.js'],
  },
  module: {
    rules: [
      {
        test: /(\\.js)$/,
        loader: 'babel',
        exclude: /node_modules/
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  mode: 'production'
};