var webpack = require('webpack');
var path = require('path');
// React v.16 uses some newer JS functionality, so to ensure everything
// works across all browsers, we're adding babel-polyfill here.
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
  devtool: 'source-map',
  devServer: {
    contentBase: './dist',
    hot: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        // suppresses warnings, usually from module minification
        warnings: false,
      },
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // Transfer Files
  ]
};
