/**
 * 聊天室store
 */
/* eslint-disable */
export default {
    state: {
        messages: [{"content":"https://oss-dx-uat.oss-cn-shanghai.aliyuncs.com/sysFile/public/default/20190814/b366a4febd5c41ed99cc52b367fdbf7b.pdf","type":"file","id":"b2fa9fad6ebf4e3fa468e015a716b935","time":1565851983,"isSend":true},{"content":"11111","type":"text","id":"566061223884449b9b31cdea1153baaa","time":1565858224,"isSend":true},{"content":"213123","type":"text","id":"32c865e952ea4be6bf39b2da33e661bf","time":1565933519,"isSend":true},{"content":"31231231233","type":"text","id":"0d3b3d54eda846f9bcb86cbc5d85d8a9","time":1565933522,"isSend":true}], //  聊天记录
    },
    mutations: {
        addMessage(state, message) {
            state.messages.push(message)
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