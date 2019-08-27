/**
 * 用户信息store
 */
/* eslint-disable */
export default {
    state: {
        user: JSON.parse(localStorage.getItem('user')) || {}
    },
    mutations: {
        setUser (state, user) {
            state.user = Object.assign(state.user, user)
            localStorage.user = JSON.stringify(state.user)
        },
        clearMessage(state, message) {
            state.messages = []
        }
    },
    actions: {
        setUser({ commit, state }, param) {
            commit('setUser', param)
        }
    }
}
