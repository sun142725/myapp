import Vue from 'vue'
// 缓存消息id  去重用
var msgId
/**
 * 聊天室store
 */
/* eslint-disable */
export default {
    state: {
        messages: [
            {"content":"https://oss-dx-uat.oss-cn-shanghai.aliyuncs.com/sysFile/public/default/20190814/b366a4febd5c41ed99cc52b367fdbf7b.pdf","type":"file","id":"b2fa9fad6ebf4e3fa468e015a716b935","time":1565851983,"isSend":true},
            {"content":"11111","type":"text","id":"566061223884449b9b31cdea1153baaa","time":1565858224,"isSend":true},
            {"content":"213123","type":"text","id":"32c865e952ea4be6bf39b2da33e661bf","time":1565933519,"isSend":true},
            {"content":"31231231233","type":"text","id":"0d3b3d54eda846f9bcb86cbc5d85d8a9","time":1565933522,"isSend":false}
        ], //  聊天记录
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
            var arr
            if(state.chatHistory.hasOwnProperty(param.room_id)){
                arr = state.chatHistory[param.room_id]
            } else {
                Vue.set(state.chatHistory, param.room_id, state.messages)
                arr = new Array(...state.messages)
            }
            state.chatHistory[param.room_id] = arr.concat([param])
            console.log(state.chatHistory[param.room_id])
        },
        deleteChatList(state, index){
            var obj = state.chatList.splice(index, 1)
            return obj
        },
        unshiftChatList(state, obj){
            console.log('obj', obj)
            state.chatList.unshift(obj)
        },
        clearMessage(state, message) {
            state.messages = []
        }
    },
    actions: {
        addMessage({ commit, state }, param) {

        },
        async addChatHistory({  dispatch, commit, state }, param) {
            if(param.id == msgId) return console.log(param.id, 'xusnhsuy')
            msgId = param.id
            commit('addChatHistory', param)
            dispatch('changeChatLocation', param)
        },
        changeChatLocation({ commit, state }, param){
            var index = state.chatList.findIndex(v=>v.room_id == param.room_id)
            var obj = state.chatList[index] || Object.create(null);
            console.log(param)
            obj.last_news = param || obj.last_news || {}
            obj.type = param.type
            param.type == 0 ? (obj.friend_name = param.friend_name || param.nickName) : (obj.room_name = param.room_name)
            
            if(index == -1){
                obj.room_id = param.room_id
                commit('unshiftChatList', obj)
            } else {
                if(index > 0){
                    commit('deleteChatList', index)
                    commit('unshiftChatList', obj)
                }
            }
        }
    }
}