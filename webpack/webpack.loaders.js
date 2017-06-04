const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// pattern used to transform styles used by babel-plugin-react-css-modules
// see https://github.com/gajus/babel-plugin-react-css-modules
const localIdentName = '[path]___[name]__[local]___[hash:base64:5]'
const context = path.join(__dirname, '..', 'src')

module.exports = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'babel-loader?cacheDirectory',
        options: {
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
      }
      // {
      //   loader: 'eslint-loader'
      // }
    ]
  },
  {
    test: /\.css$/,
    // exclude: /rc-slider/,
    use: ((env) => {
      if (env === 'production') {
        return ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader',
            options: {
              modules: false,
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
            modules: false,
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
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [context]
            }
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
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [context]
            }
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
