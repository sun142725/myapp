var md5 = require('md5-base64')
function handRoomId(roomId){
    return md5(roomId)
}
module.exports = function (io){
    io.on('connection', function(socket) {
        socket.on('joinRoom', function (data) {
            let roomId
            roomId = data.user_id > data.to_id ? handRoomId(data.to_id + data.user_id) : handRoomId(data.user_id + data.to_id)
            let rooms = Object.keys(socket.rooms)
            //  如果没有该房间
            if(rooms.indexOf(roomId) < 0){
                socket.join(roomId, function () {
                    socket.to(roomId).emit('joinRes', {roomId: roomId, content: '房间创建成功，快来聊天吧！'})
                })
            } else {
                socket.emit('joinRes', {roomId: roomId, content: '房间创建成功，快来聊天吧！'})
            }
        })
        socket.on('sendMsg', function (data) {
            socket.join('1', function () {
                console.log(socket)
                let rooms = Object.keys(socket.rooms)
                console.log(rooms)
                console.log(data)
            })
            socket.to(data.roomId).emit('message', {content: data}) //broadcast
        })
    })
}