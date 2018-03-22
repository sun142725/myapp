var admin_login = require('./server/login')
var login = require('./client/login')

module.exports = function (app) {
    [admin_login, login].forEach((p)=>{
        p(app)
    })
}