/**
 * 好友信息
 */
/* eslint-disable */
export default {
    state: {
        friendList: [], //  好友列表
    },
    mutations: {
        getFriend(state, data) {
            state.friendList = data
        },
        addFriend(state, message) {
            state.friendList.push(message)
        },
        clearMessage(state, message) {
            state.messages = []
        }
    },
    actions: {
        addMessage({ commit, state }, param) {
        }
    }
}