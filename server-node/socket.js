var md5 = require('md5-base64')
const { getUserRooms, updateRoom } = require('./router/room/sql')
const { insertHistory } = require('./router/chat_history/sql')
function handRoomId(roomId){
    return md5(roomId)
}
var arrAllSocket = {};
function sendToRoom(socket, data){
    const { room_id, type, content, describe = '', send_mobile } = data
    insertHistory(room_id, type, content, describe, send_mobile, function(err, result){
        console.log(err, result)
        if(!err){
            socket.to(room_id).emit('groupMsgNotify', {
                room_id: room_id,
                content: content,
                describe: describe,
                send_mobile: send_mobile,
                type: type,
                time: new Date().getTime()/1000,
                id: result.insertId
            })
        }
    })
}
//  socket加入用户已加入的群聊
function joinUserRooms(socket,  mobile){
    getUserRooms(mobile, function(err, result){
        if(err){
        } else {
            socket.join(result.map(v=>v.room_id), function(){
                console.log('加入群聊成功')
            }, function(){
                console.log('加入失败')
            })
        }
    })
}
function leaveRoom(socket, data){
    const { room_id, mobile } = data
    updateRoom(2, room_id, mobile, function(err, result){
        if(!err){
            socket.leave(room_id, function(){
                console.log('退群成功')
            })
        }
    })
}
module.exports = function (io){
    io.on('connection', function(socket) {
        //  保存用户socketid
        arrAllSocket[socket.handshake.query.mobile] = socket.id;
        joinUserRooms(socket, socket.handshake.query.mobile)
        //  Join Room
        socket.on('join', function (data) {
            const { room_id } = data
            let rooms = Object.keys(socket.rooms)
            //  如果没有该房间
            if(rooms.indexOf(room_id) === -1){
                socket.join(room_id, function (result) {
                    socket.emit('groupMsgNotify', {room_id: room_id, content: '房间创建成功，快来聊天吧！', describe: '', type: 'system'})
                })
            } else { //  需要获取房间类型 判断是否可加入
                socket.join(room_id, function () {
                    socket.emit('groupMsgNotify', {room_id: room_id, content: '房间加入成功，快来聊天吧！', type: 'system', name: data.name})
                })
            }
        })
        socket.on('leave', function(data){
            leaveRoom(socket, data)
            socket.emit('groupMsgNotify', {room_id: room_id, content: data.name+ '离开了房间', type: 'system', name: data.name})
        })
        socket.on('groupMsgNotify-c', function (data) {
            sendToRoom(socket, data)
            socket.emit('groupMsgNotify', data)
        })
        //  C2C[toAccount]
        socket.on('c2cMsgNotify', function(data){
            console.log('接收到了', data)
            var target = arrAllSocket[data[to]];
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
    io.on('disconnection', function(socket){
        //  断开链接
    })
}