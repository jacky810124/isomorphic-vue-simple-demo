import fetch from 'universal-fetch'

import { SET_LIST } from './mutation-types'

export default {
  namespaced: true,
  state: {
    posts: []
  },
  mutations: {
    [SET_LIST] (state, data) {
      data.forEach(item => {
        state.posts.push(item)
      })
    }
  },
  actions: {
    getList ({ commit }) {
      return new Promise((resolve, reject) => {
        fetch('/api/mediums')
          .then(response => response.json())
          .then(result => {
            commit(SET_LIST, result.data)
            resolve()
          })
          .catch(error => {
            console.error(error)
            reject(error)
          })
      })
    }
  }
}
