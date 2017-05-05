import { app } from './app'

if (window.__INITIAL_STATE__) {
  app.repos = window.__INITIAL_STATE__
}

app.$mount('#app')
