var user = require('./user/user')
var upload = require('./user/upload')
var room = require('./room/room')
var friend = require('./friends/friend')
var chartHistory = require('./chat_history/chat_room_history')
// var music = require('./client/music')

module.exports = function (app, fn) {
    [
        user,
        upload,
        room,
        friend,
        chartHistory
    ].forEach((p)=>{
            p(app, fn)
        })
}