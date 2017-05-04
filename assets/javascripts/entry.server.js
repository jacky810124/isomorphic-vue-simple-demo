import { app } from './app'

export default context => new Promise((resolve, reject) => {
  // app.repos = context.initialState
  resolve(app)
})
