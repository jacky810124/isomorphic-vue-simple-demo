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
const repoDB = require('./db/github-repo.json')

/**
 * repo api
 */
app.get('/api/repos/:page', (req, res) => {
  const page = Number.parseInt(req.params.page, 10)

  prepareData(page)
    .then(data => {
      res.json({ data })
    })
})

/**
 * prepare data
 */
const prepareData = (page) => {
  return new Promise((resolve, reject) => {
    const start = (page - 1) * 10
    const end = page * 10
    const data = repoDB.slice(start, end)

    resolve(data)
  })
}

/**
 * GET /
 */
app.get('/repos', (req, res) => {
  prepareData(1)
    .then(data => render({ initialState: data }))
    .then(html => {
      res.send(html)
    })
})

app.listen(3002, () => {
  console.log('Server is listening at: http://localhost:3002')
})
