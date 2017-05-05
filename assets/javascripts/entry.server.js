import { app } from './app'

export default context => new Promise((resolve, reject) => {
  if (context.initialState) {
    app.repos = context.initialState
  }
  resolve(app)
})
