var admin_login = require('./server/login')
var login = require('./client/login')

module.exports = function (app, fn) {
    [admin_login, login].forEach((p)=>{
        p(app, fn)
    })
}