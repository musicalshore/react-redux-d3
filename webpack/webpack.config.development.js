var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
  devtool: 'source-map',
  context: path.join(__dirname, '..', 'src'),
  entry: {
    main: [
      'babel-polyfill',
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?reload=true',
      'index.js'
    ]
  },
  output: {
    path: path.join(__dirname, '..', 'dist'),
    // filename: 'bundle.js',
    filename: '[name].[hash].js',
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
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor'],
      minChunks: function (module) {
        return module.context && module.context.indexOf('node_modules') !== -1
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['manifest']
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
