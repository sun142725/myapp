var con = require('../../mysql')
function getChatHistory(room_id, callback){
    con.query('SELECT * FROM chat_room_history WHERE room_id = ?', [room_id], function(err, result){
        callback && callback(err, result)
    })
}
function insertHistory(room_id,type, content,describe, send_mobile, callback){
    con.query('INSERT INTO chat_room_history(id, room_id, type, content, `describe`, send_mobile, status) VALUES(0,?,?,?,?,?, 0)', [room_id,type, content,describe, send_mobile], function(err, result){
        callback && callback(err, result)
    })
}
function deleteHistory(room_id,id, callback){
    con.query('UPDATE chat_room_history SET status = 1 WHERE room_id = ? AND id = ?', [room_id, id], function(err, result){
        callback && callback(err, result)
    })
}
function getUnread(){
    con.query('SELECT * FROM chat_room_history WHERE status = 0 AND already_read = 0', [room_id, id], function(err, result){
        callback && callback(err, result)
    })
}
//  获取未读消息
function getUserUnread(mobile, callback){
    con.query('SELECT c.*,cr.mobile FROM chat_room_history c RIGHT JOIN chat_room cr on c.room_id = cr.room_id AND cr.mobile != c.send_mobile WHERE c.status = 0 AND c.already_read = 0 AND cr.mobile = ?', [mobile], function(err, result){
        callback && callback(err, result)
    })
}
module.exports = {
    getChatHistory,
    insertHistory,
    deleteHistory,
    getUserUnread
}