import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    loginstate: null
  },
  mutations: {
    login: (state, data) => {
      state.loginstate = data
      if (data) { localStorage.loginstate = data } else { localStorage.removeItem('loginstate') }
    }
  }
})
