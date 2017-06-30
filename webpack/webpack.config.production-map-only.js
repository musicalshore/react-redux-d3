const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const rimraf = require('rimraf')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  context: path.join(__dirname, '..', 'src'),
  entry: ['babel-polyfill', 'index.js'],
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: '[name].[hash].js',
    publicPath: ''
  },
  node: {
    fs: 'empty',
    child_process: 'empty'
  },
  module: {
    rules: require('./webpack.loaders.js')
  },
  plugins: [
    function () {
      console.log('Clearing /dist directory')
      rimraf.sync(path.join(__dirname, '..', 'dist'), require('fs'), (er) => {
        if (er) console.log('Clearing of /dist directory failed', er)
      })
    },
    // new StyleLintPlugin({customSyntax: 'postcss-scss'}),
    new ExtractTextPlugin('[name].[hash].css'),
    new webpack.DefinePlugin({
      'environment': '"production"',
      NODE_ENV: JSON.stringify('production')
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: ['vendor'],
    //   minChunks: 2
    // }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: ['manifest']
    // }),
    // new webpack.optimize.ModuleConcatenationPlugin(),
    new (webpack.optimize.UglifyJsPlugin)(),
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
