var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
  devtool: 'source-map',
  context: path.join(__dirname, '..', 'src'),
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?reload=true',
    'index.js'
  ],
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: require('./webpack.loaders.js')
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
    new webpack.DefinePlugin({
      'environment': '\'development\'',
      NODE_ENV: JSON.stringify('development')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({template: path.join(__dirname, '..', 'src', 'templates', 'index.ejs')}),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ],
  resolve: {
    modules: ['node_modules', 'src'],
    plugins: [
      new DirectoryNamedWebpackPlugin()
    ]
  }
}
