var md5 = require('md5-base64')
function handRoomId(roomId){
    return md5(roomId)
}
module.exports = function (io){
    io.on('connection', function(socket) {
        socket.on('joinRoom', function (data) {
            console.log('接收到了')
            let roomId
            roomId = data.mobile > data.to_mobile ? handRoomId(data.to_mobile + data.mobile) : handRoomId(data.mobile + data.to_mobile)
            console.log('roomId=' + roomId)
            let rooms = Object.keys(socket.rooms)
            console.log(rooms)
            //  如果没有该房间
            if(rooms.indexOf(roomId) === -1){
                console.log(1)
                socket.join(roomId, function () {
                    socket.emit('joinRes', {roomId: roomId, content: '房间创建成功，快来聊天吧！', type: 1})
                })
            } else {
                socket.to(roomId).emit('joinRes', {roomId: roomId, content: '房间创建成功，快来聊天吧！', type: 2})
            }
            console.log(rooms, '111')

        })
        socket.on('sendMsg', function (data) {
            socket.to(data.roomId).emit('message', {content: data.content}) //broadcast
        })
    })
}