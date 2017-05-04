import { SET_ROLE } from './mutation-types'

export default {
  namespaced: true,
  state: {
    role: null
  },
  getters: {
    isLogin: state => {
      return ['user', 'admin'].indexOf(state.role) >= 0
    }
  },
  mutations: {
    [SET_ROLE] (state, data) {
      state.role = data
    }
  },
  actions: {
    setUserRole ({ commit }, { role }) {
      commit(SET_ROLE, role)
    }
  }
}
