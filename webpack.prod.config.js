var webpack = require('webpack');
var path = require('path');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
require('babel-polyfill');

module.exports = {
  entry: [
    './src/index.js'
  ],
  module: {
    loaders: [
      { test: /\.js?$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.s?css$/, loader: 'style-loader!css-loader!sass-loader' },
    ]
  },
  resolve: {
    modules: [
      path.resolve('./'),
      path.resolve('./node_modules'),
    ],
    extensions: ['.js','.scss'],
  },
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devtool: 'hidden-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ]
};
