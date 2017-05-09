const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')
// pattern used to transform styles used by babel-plugin-react-css-modules
// see https://github.com/gajus/babel-plugin-react-css-modules
const localIdentName = '[path]___[name]__[local]___[hash:base64:5]'
const context = path.join(__dirname, '..', 'src')
module.exports = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: [{
      loader: 'babel-loader',
      options: {
        presets: [
          ['es2015', { modules: false }],
          'react'
        ],
        plugins: [
          ['react-css-modules', {
            filetypes: {
              '.scss': 'postcss-scss'
            },
            context,
            webpackHotModuleReloading: true
          }],
          'react-hot-loader/babel'
        ]
      }
    }]
  },
  {
    include: /rc-slider.*\.css/,
    use: ((env) => {
      if (env === 'production') {
        return ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader'
          }],
          fallback: 'style-loader'
        })
      } else {
        return [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }]
      }
    })(process.env.NODE_ENV)
  },
  {
    test: /\.css$/,
    exclude: /rc-slider.*\.css/,
    use: ((env) => {
      if (env === 'production') {
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
              plugins: [autoprefixer]
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
              plugins: [autoprefixer]
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    })(process.env.NODE_ENV)
  },
  {
    test: /\.(ttf|woff|woff2|jpeg|jpg|png|gif|svg)$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          // outputPath: path.join('assets', '/'),
          // publicPath: 'assets/',
          name: '[name]--[hash:base64:5].[ext]'
        }
      }
    ]
  }
]
