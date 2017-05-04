import fetch from 'universal-fetch'

import { SET_LIST, PAGE_CHANGE } from './mutation-types'

export default {
  namespaced: true,
  state: {
    repos: [],
    page: 1
  },
  getters: {
    isLogin: state => {
      return ['user', 'admin'].indexOf(state.role) >= 0
    }
  },
  mutations: {
    [PAGE_CHANGE] (state, data) {
      state.page = data
    },
    [SET_LIST] (state, data) {
      if (data.length !== 0) {
        data.forEach(item => {
          state.repos.push(item)
        })
      }
    }
  },
  actions: {
    setList ({ commit }, { list }) {
      commit(SET_LIST, list)
    },
    pageChange ({ commit }, { page }) {
      commit(PAGE_CHANGE, page)
    },
    getList ({ commit, state }) {
      return new Promise((resolve, reject) => {
        fetch(`/api/repos?page=${state.page}`)
          .then(response => response.json())
          .then(result => {
            commit(SET_LIST, result.data)
            resolve()
          })
          .catch(error => reject(error))
      })
    }
  }
}
