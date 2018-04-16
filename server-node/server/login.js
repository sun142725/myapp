// const model = require('../models/indexs');
// var User = model.users
var resfn = require('../public/function.js')

module.exports = function(app){
    //  登录
    app.post('/admin_login', function (req, res) {
        // var postData = {
        //     username: req.body.username,
        //     password: req.body.password
        // };
        // User.findOne({
        //     username: postData.username,
        //     password: postData.password
        // }, function (err, data) {
        //     if(err) throw err;
        //     if(data){
        //         res.send(resfn(1, data, '登陆成功'));
        //     }else{
        //         res.send(resfn(0, {}, '账号或密码错误'));
        //     }
        // } )
    });
}