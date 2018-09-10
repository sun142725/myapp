export const LOGIN_IN = 'LOGIN_IN'

export default {
  state: JSON.parse(localStorage.getItem('user')) || {},
  mutations: {
    [LOGIN_IN] (state, data) {
      state = data
      localStorage.setItem('user', JSON.stringify(data))
    }
  },
  actions: {
    [LOGIN_IN] ({ commit }, data) {
      console.log('我来了')
      commit(LOGIN_IN, data)
    }
  }
}
