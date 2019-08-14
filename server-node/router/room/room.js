var con = require('../../mysql')
const jwt = require("jsonwebtoken");
const ERROR_CODE = require('../../public/error-code')
const return7000 = require('../com_return_err').return7000
/**
 * 创建加入房间
 * @param { String } room_id 房间号 
 * @param {* Int } type 0=>好友房间/1=>多人房间
 * @param {* Int } mobile 手机号
 * @param {* Int } member_pos 0=>成员/1=>群主
 */
function createAndJoinRoom (room_id, type=0, mobile, member_pos, callback){
    con.query('INSERT INTO chat_room(id, room_id, type, mobile, member_pos) VALUES(0,?,?,?,?)', [room_id, type, mobile, member_pos], function(err, result){
        callback && callback(err, result)
    })
}
function queryRoom(room_id, callback){
    con.query('SELECT * FROM chat_room WHERE room_id = ? AND status = ?', [room_id, 0], function(err, result){
        callback && callback(err, result)
    })
}
/**
 *  status 0 : 正常  1 : 冻结  2 : 离开 5:解散
 * @param {*} room_id 
 * @param {*} mobile 
 * @param {*} callback 
 */
function deleteRoom(room_id, mobile, callback){
    con.query('DELETE FROM chat_room WHERE room_id = ?, mobile = ?', [room_id, mobile], function(err, result){
        callback && callback(err, result)
    })
}
function updateRoom(status, room_id, mobile,callback){
    con.query('UPDATE chat_room SET status = ? WHERE room_id = ? AND mobile = ?', [status, room_id, mobile], function(){

    })
}


module.exports = function (app, fn) {
    app.post('/joinRoom', function (req, res) {
        const {room_id, mobile, type} = req.body
        var member_pos = 0
        if(room_id){
            queryRoom(room_id, function(err, result){
                if(err){
                    return7000(res)
                } else {
                    var newResult = result.filter(v => v.mobile == mobile)
                    if(newResult.length > 0) {
                        return res.status(200).json({
                            code: (!type || type == 0) ? '100000' : '100001',
                            body: null,
                            describe: (!type || type == 0) ? ERROR_CODE['100000'] : ERROR_CODE['100001'],
                        })
                    } else {
                        createAndJoinRoom(room_id,type,mobile,member_pos, function(err, result){
                            if(err){
                                return7000(res)
                            } else {
                                return res.status(200).json({
                                    code: 0,
                                    body: null,
                                    describe: '加入房间成功',
                                })
                            }
                        })
                    }
                }
            })
        } else {
            room_id = mobile + new Date().getTime()
            member_pos = 1
            createAndJoinRoom(room_id,type,mobile,member_pos, function(err, result){
                if(err){
                    return7000(res)
                } else {
                    return res.status(200).json({
                        code: 0,
                        body: null,
                        describe: '加入房间成功',
                    })
                }
            })
        }
        
    })
    app.post('/leaveRoom', function (req, res) {
        const {room_id, mobile, type} = req.body
        queryRoom(room_id, function(err, result){
            if(err){
                console.log('', err)
                return7000(res)
            } else {
                var newResult = result.filter(v => v.mobile == mobile)
                if(newResult.length <= 0) {
                    return res.status(200).json({
                        code: (!type || type == 0) ? '100002' : '100003',
                        body: null,
                        describe: (!type || type == 0) ? ERROR_CODE['100002'] : ERROR_CODE['100003'],
                    })
                }else{
                    console.log('likai')
                    updateRoom(2,room_id, mobile, function(err, result){
                        if(err){
                            return7000(res)
                        } else {
                            return res.status(200).json({
                                code: 0,
                                body: null,
                                describe: '离开房间成功',
                            })
                        }
                    })
                }
            }
        })
    })
}