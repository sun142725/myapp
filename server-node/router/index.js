var user = require('./user/user')
// var music = require('./client/music')

module.exports = function (app, fn) {
    [user].forEach((p)=>{
        p(app, fn)
    })
}