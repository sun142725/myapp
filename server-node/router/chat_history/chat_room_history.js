var con = require('../../mysql')
const jwt = require("jsonwebtoken");
const ERROR_CODE = require('../../public/error-code')
const return7000 = require('../com_return_err').return7000

function getChatHistory(room_id, callback){
    con.query('SELECT * FROM chat_room_history WHERE room_id = ?', [room_id], function(err, result){
        callback && callback(err, result)
    })
}
/**
 * 
 * @param {*} room_id 
 * @param {*} type 
 * @param {*} content 
 * @param {*} describe   mysql关键字  加 `describe`
 * @param {*} send_mobile 
 * @param {*} callback 
 */
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

module.exports =  function (app, fn) {
    app.get('/getChatHistory', function(req, res){
        const { room_id } = req.query
        getChatHistory(room_id, function(err, result){
            if(err){
                return7000(res, err)
            } else {
                return res.status(200).json({
                    code: 0,
                    body: result,
                    describe: '新增聊天记录成功',
                })
            }
        })
    })
    app.post('/saveChatRecord', function(req, res){
        const { room_id,type, content,describe, send_mobile } = req.body
        insertHistory(room_id,type, content,describe, send_mobile, function(err, result){
            if(err){
                return7000(res, err) 
            } else {
                return res.status(200).json({
                    code: 0,
                    body: null,
                    describe: '新增聊天记录成功',
                })
            }
        })
    })
    app.post('/deleteChatRecord', function(req, res){
        const { room_id, id } = req.body
        deleteHistory(room_id, id , function(err, result){
            if(err){
                return7000(res, err)
            } else {
                return res.status(200).json({
                    code: 0,
                    body: null,
                    describe: '删除聊天记录成功',
                })
            }
        })
    })
}
// module.exports = {
//     insertHistory,
// }