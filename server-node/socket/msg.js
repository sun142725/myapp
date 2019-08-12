import { chatType } from './config'
function MsgElm(senderAccount, receiveAccount) {
    this.senderAccount = senderAccount
    this.receiveAccount = receiveAccount
    this.read = 0
    this.time = time
    this.type = chatType.c2c
}
MsgElm.prototype = {
    getTime: function(){
        return this.time
    },
    getSenderAccount: function(){
        return this.senderAccount
    },
    getIsSend: function(){
        // return this.senderAccount == this.fromAccount
    }
}

module.exports = {
    MsgElm
}