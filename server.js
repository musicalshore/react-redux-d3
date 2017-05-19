const path = require('path')
const express = require('express')

const app = express()

const webpack = require('webpack')
const config = require('./webpack/webpack.config.development.js')
const isDevelopment = process.env.NODE_ENV !== 'production'
const DIST_DIR = path.join(__dirname, 'dist')
const HTML_FILE = path.join(DIST_DIR, 'index.html')

if (isDevelopment) {
  const compiler = webpack(config)
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    stats: {
      colors: true
    }
  }))

  app.use(require('webpack-hot-middleware')(compiler))

  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'src', 'templates', 'index.ejs'))
  })
} else {
  app.use(express.static(DIST_DIR))

  app.get('*', (req, res) => res.sendFile(HTML_FILE))
}
const server = app.listen(process.env.PORT || 3333, 'localhost', (err) => {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:%d', server.address().port)
})