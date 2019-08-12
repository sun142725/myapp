var md5 = require('md5-base64')
function handRoomId(roomId){
    return md5(roomId)
}
var arrAllSocket = {};
var arrAllRoom = {

}
module.exports = function (io){
    io.on('connection', function(socket) {
        console.log(socket)
        //  保存用户socketid
        arrAllSocket[socket.handshake.query.mobile] = socket.id;
        //  Join Room
        socket.on('join', function (data) {
            console.log('接收到了joinRoom')
            let roomId
            roomId = data.mobile + new Date().getTime()
            console.log('roomId=' + roomId)
            let rooms = Object.keys(socket.rooms)
            console.log(rooms)
            //  如果没有该房间
            if(rooms.indexOf(roomId) === -1){
                console.log(1)
                socket.join(roomId, function () {
                    socket.emit('groupMsgNotify', {roomId: roomId, content: '房间创建成功，快来聊天吧！', type: 1})
                })
            } else {
                socket.join(roomId, function () {
                    socket.emit('groupMsgNotify', {roomId: roomId, content: '房间加入成功，快来聊天吧！', type: 1})
                })
            }
            console.log(rooms, '111')

        })
        socket.on('leave', function(data){
            socket.leave(data.roomId, function(){
                console.log('退群成功')
            })
        })
        socket.on('groupMsgNotify', function (data) {
            socket.to(data.roomId).emit('groupMsgNotify', {content: data.content}) //broadcast
        })
        //  C2C[toAccount]
        socket.on('c2cMsgNotify', function(data){
            console.log('接收到了')
            var target = arrAllSocket[to];
            console.log(target)
                if(target)
                {
                    console.log('emitting private message by ', data.from, ' say to ',data.to, data.msg);
                    socket.to(target).emit("c2cMsgNotify", data.from, data.to, data.msg);
                } else {
                    console.log('不在线')
                }
        
          });
    })
}