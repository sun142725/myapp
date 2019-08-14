var con = require('../../mysql')
const jwt = require("jsonwebtoken");
const ERROR_CODE = require('../../public/error-code')
const return7000 = require('../com_return_err').return7000

function getChatHistory(room_id, callback){
    con.query('SELECT * FROM chat_room_history WHERE room_id = ?', [room_id], function(err, result){
        callback && callback(err, result)
    })
}
module.exports =  function (app, fn) {
    app.get('/getChatHistory', function(req, res){
        const { room_id } = req.query
        getChatHistory()
    })
}