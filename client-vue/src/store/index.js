import Vuex from 'vuex'
import Vue from 'vue'
import login from './login'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    login
  }
})
