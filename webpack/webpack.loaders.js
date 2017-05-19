const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')
const postcssInputRange = require('postcss-input-range') // lets you style input ranges with unprefixed selectors.

// pattern used to transform styles used by babel-plugin-react-css-modules
// see https://github.com/gajus/babel-plugin-react-css-modules
const localIdentName = '[path]___[name]__[local]___[hash:base64:5]'
const context = path.join(__dirname, '..', 'src')

module.exports = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: [{
      loader: 'babel-loader?cacheDirectory',
      options: {
        presets: [
          ['env', { modules: false }],
          'react'
        ],
        plugins: [
          ['react-css-modules', {
            filetypes: {
              '.scss': 'postcss-scss'
            },
            context,
            exclude: 'node_modules',
            webpackHotModuleReloading: true
          }]
        ]
      }
    }]
  },
  {
    test: /\.css$/,
    use: ((env) => {
      if (env === true) {
        return ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName
            }
          }],
          fallback: 'style-loader'
        })
      } else {
        return [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName
          }
        }]
      }
    })(process.env.NODE_ENV)
  },
  {
    test: /\.scss$/,
    // exclude: /global.scss/,
    use: ((env) => {
      if (env === 'production') {
        return ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer, postcssInputRange]
            }
          },
          {
            loader: 'sass-loader'
          }],
          fallback: 'style-loader'
        })
      } else {
        return [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer, postcssInputRange]
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    })(process.env.NODE_ENV)
  },
  // {
  //   test: /global.scss/,
  //   use: [
  //     {
  //       loader: 'style-loader'
  //     },
  //     {
  //       loader: 'css-loader',
  //       options: {
  //         modules: false,
  //         importLoaders: 1,
  //         localIdentName
  //       }
  //     },
  //     {
  //       loader: 'postcss-loader',
  //       options: {
  //         plugins: [autoprefixer]
  //       }
  //     },
  //     {
  //       loader: 'sass-loader'
  //     }
  //   ]
  // },
  {
    test: /\.(ttf|woff|woff2|jpeg|jpg|png|gif|svg)$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          outputPath: path.join('assets', 'images', '/'),
          // publicPath: 'assets/images/',
          name: '[name]--[hash:base64:5].[ext]'
        }
      }
    ]
  },
  {
    test: /\.json$/,
    use: 'json-loader'
  }
]
