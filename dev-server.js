const express = require('express')
const path = require('path')
const webpack = require('webpack')
const middleware = require('webpack-dev-middleware')

const config = require('./webpack.client.config.js')

config.entry.push('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000')
config.plugins.push(new webpack.HotModuleReplacementPlugin())

const compiler = webpack(config)

const app = express()

app.use(middleware(compiler, {
  publicPath: config.output.publicPath
}))

app.use(require('webpack-hot-middleware')(compiler, {
  log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
}))

app.use(express.static('public'))

app.use('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './index.html'))
})

app.listen(8080)
