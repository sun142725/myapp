import Vuex from 'vuex'
import Vue from 'vue'
import user from './user'
import login from './login'
import chatStore from './chatStore'
import friends from './friends'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    login,
    chatStore,
    friends,
    user
  }
})
