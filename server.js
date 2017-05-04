const express = require('express')
const fs = require('fs')
const cookieParser = require('cookie-parser')
const serialize = require('serialize-javascript')
const path = require('path')
const renderer = require('vue-server-renderer').createBundleRenderer(path.resolve(__dirname, './dist/vue-ssr-bundle.json'))
const app = express()

app.use(cookieParser())
app.use(express.static('dist'))
app.use(express.static('public'))

/**
 * repo list
 */
const repoDB = require('./db/github-repo.json')

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
 * repo api
 */
// app.use('/api/repos', (req, res) => {
//   const p = Number.parseInt(req.query.page, 10)
//   const start = (p - 1) * 10
//   const end = p * 10
//   const data = repoDB.slice(start, end)
//
//   res.status(200).json({ data })
// })

/**
 * prepare data
 */
const preFetchData = (req, res, next) => new Promise((resolve, reject) => {
  resolve({
    initialState: repoDB.slice(0, 10)
  })
})

/**
 * GET /
 */
// app.get('/', (req, res, next) => {
//   preFetchData(req, res, next)
//     .then(context => render(context))
//     .then(result => {
//       res.status(200).send(result)
//     })
//     .catch(error => {
//       console.error(error)
//       res.status(500).send(error)
//     })
// })

app.listen(3002, () => {
  console.log('Server is listening at: http://localhost:3002')
})
