var con = require('../../mysql')

function getUserRooms(mobile, callback){
    con.query('SELECT room_id FROM chat_room WHERE mobile = ?', [mobile], function(err, result){
        callback && callback(err, result)
    })
}
function updateRoom(status, room_id, mobile,callback){
    con.query('UPDATE chat_room SET status = ? WHERE room_id = ? AND mobile = ?', [status, room_id, mobile], function(err, result){
        callback && callback(err, result)
    })
}
module.exports = {
    getUserRooms,
    updateRoom
}