const express = require('express')
const fs = require('fs')
const serialize = require('serialize-javascript')
const path = require('path')
const renderer = require('vue-server-renderer').createBundleRenderer(path.resolve(__dirname, './dist/vue-ssr-bundle.json'))
const app = express()

app.use(express.static('dist'))
app.use(express.static('public'))

/**
 * render to string
 * @param  {Object} context
 * @return {Promise}         return promise function
 */
const render = context => new Promise((resolve, reject) => {
  const layout = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8')

  renderer.renderToString(context, (error, html) => {
    if (error) {
      reject(error)
    } else {
      resolve(layout.replace('<div id="app"></div>', `<script>window.__INITIAL_STATE__=${serialize(context.initialState, {isJSON: true})}</script><div id="app">${html}</div>`))
    }
  })
})

/**
 * repo list
 */

/**
 * repo api
 */

/**
 * prepare data
 */

/**
 * GET /
 */

app.listen(3002, () => {
  console.log('Server is listening at: http://localhost:3002')
})
