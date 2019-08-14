var con = require('../../mysql')
const ERROR_CODE = require('../../public/error-code')
const return7000 = require('../com_return_err').return7000
/**
 * 
 * @param {*} room_id 
 * @param {*} mobile 
 * @param {*} friend_mobile 
 * @param {*} status 
 * @param {*} callback 
 */
function createTemporaryF(room_id, mobile, friend_mobile, status = 1, callback){
    con.query('INSERT INTO friend(id, room_id,mobile, friend_mobile, status, is_invitation) VALUES(0, ?,?,?,?, 1),(0, ?,?,?,?, 0)', [room_id, mobile, friend_mobile, status, room_id, friend_mobile, mobile, status], function(err, result){
        callback && callback(err, result)
    })
}
/**
 * 
 * @param {*} mobile 
 * @param {*} friend_mobile 
 * @param {*} callback 
 */
function queryTemporaryF(mobile, friend_mobile, callback){
    con.query('SELECT * FROM friend WHERE mobile = ? AND friend_mobile = ?', [mobile, friend_mobile], function(err, result){
        callback && callback(err, result)
    })
}
/**
 * 
 * @param { Int } status 0 同意 1 审核中 2 删除
 * @param {* String } room_id  
 * @param {* Function } callback 
 */
function acceptOrDeleteFriend(status, room_id, callback){
    con.query('UPDATE friend SET status = ? WHERE room_id = ?', [status, room_id], function(err, result){
        callback && callback(err, result)
    })
}

/**
 * 获取我的好友列表
 * @param {*} mobile 
 * @param {*} callback 
 */
function getMyFriend(mobile, callback){
    con.query('SELECT friend.*,user.name,user.nickName FROM friend friend RIGHT JOIN user user on friend.friend_mobile = user.mobile WHERE friend.mobile = ? AND friend.status = 0', [mobile], function(err, result){
        callback && callback(err, result)
    })
}
module.exports =  function (app, fn) {
    app.get('/requestFriend', function(req, res){
        const {mobile, friend_mobile} = req.query
        queryTemporaryF(mobile, friend_mobile, function(err, result){
            if(err){
                return7000(res, err)
            } else {
                if(result.length){ //  已在friend表中
                    if(result[0].status == 0){
                        // 对方已经是您的好友
                        return res.status(200).json({
                            code: '100004',
                            body: null,
                            describe: ERROR_CODE['100004'],
                        })
                    } else {
                        //  对方已在审核列表中
                        return res.status(200).json({
                            code: '100005',
                            body: null,
                            describe: ERROR_CODE['100005'],
                        })
                    }
                } else {
                    var room_id = mobile + new Date().getTime()
                    createTemporaryF(room_id,mobile,friend_mobile, 1, function(err, result){
                        if(err){
                            return7000(res, err)
                        } else {
                            return res.status(200).json({
                                code: 0,
                                body: null,
                                describe: '提交申请成功',
                            })
                        }
                    })
                }
            }
        })
    })
    app.get('/acceptFriend', function(req, res){
        const { room_id } = req.query
        acceptOrDeleteFriend(0, room_id, function(err, result){
            if(err){
                return7000(res, err)
            } else {
                return res.status(200).json({
                    code: 0,
                    body: null,
                    describe: '提交申请成功',
                })
            }
        })
    })
    app.get('/getMyFriend', function(req, res){
        const { mobile } = req.query
        getMyFriend(mobile, function(err, result){
            if(err){
                return7000(res, err)
            } else {
                return res.status(200).json({
                    code: 0,
                    body: result,
                    describe: '查询成功',
                })
            }
        })
    })
    app.get('/deleteFriend', function(req, res){
        const { room_id } = req.query
        acceptOrDeleteFriend(2, room_id, function(err, result){
            if(err){
                return7000(res, err)
            } else {
                return res.status(200).json({
                    code: 0,
                    body: null,
                    describe: '删除好友成功',
                })
            }
        })
    })
}