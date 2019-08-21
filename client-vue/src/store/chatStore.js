/**
 * 聊天室store
 */
/* eslint-disable */
export default {
    state: {
        messages: [{"content":"https://oss-dx-uat.oss-cn-shanghai.aliyuncs.com/sysFile/public/default/20190814/b366a4febd5c41ed99cc52b367fdbf7b.pdf","type":"file","id":"b2fa9fad6ebf4e3fa468e015a716b935","time":1565851983,"isSend":true},{"content":"11111","type":"text","id":"566061223884449b9b31cdea1153baaa","time":1565858224,"isSend":true},{"content":"213123","type":"text","id":"32c865e952ea4be6bf39b2da33e661bf","time":1565933519,"isSend":true},{"content":"31231231233","type":"text","id":"0d3b3d54eda846f9bcb86cbc5d85d8a9","time":1565933522,"isSend":true}], //  聊天记录
        chatHistory: {

        },
        chatList: [
            {
                room_id: '123',
                type: 1,
                room_name: '213',
                last_news: {"content":"31231231233","type":"text","id":"0d3b3d54eda846f9bcb86cbc5d85d8a9","time":1565933522,"isSend":true}
            },
            {
                room_id: '123123',
                type: 0,
                friend_name: '好友',
                last_news: {"content":"31231231233","type":"text","id":"0d3b3d54eda846f9bcb86cbc5d85d8a9","time":1565933522,"isSend":true}
            }
        ]
    },
    mutations: {
        addMessage(state, message) {
            state.messages.push(message)
        },
        addChatHistory(state, param){
            var arr = state.chatHistory[param.room_id] || new Array()
            state.chatHistory[param.room_id] = arr.concat([param.chatNews])
        },
        deleteChatList(state, index){
            var obj = state.chatList.splice(index, 1)
            return obj
        },
        unshiftChatList(state, obj){
            state.chatList.unshift(obj)
        },
        clearMessage(state, message) {
            state.messages = []
        }
    },
    actions: {
        addMessage({ commit, state }, param) {

        },
        async addChatHistory({  commit, state }, param) {
            commit('addChatHistory', param)
            var index = state.chatList.findIndex(v=>v.room_id == param.room_id)
            var obj = state.chatList[index] || Object.create(null);
            if(index == -1){
                obj.room_id = param.room_id
                obj.last_news = param.chatNews
                commit('unshiftChatList', obj)
            } else {
                obj.last_news = param.chatNews
                if(index > 0){
                    commit('deleteChatList', index)
                    commit('unshiftChatList', obj)
                }
            }
        }
    }
}