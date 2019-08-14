var user = require('./user/user')
var room = require('./room/room')
var friend = require('./friends/friend')
// var music = require('./client/music')

module.exports = function (app, fn) {
    [
        user,
        room,
        friend
    ].forEach((p)=>{
            p(app, fn)
        })
}