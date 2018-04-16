var User = require('../model').user
module.exports = function (app, fn) {
        app.post('/login', function (req, res) {
            const {username, password} = req.body
            User.findOne({username, password}, function(err, data){
                if(err) throw err
                if(!data) {
                    return res.status(200).json({ code: 0, msg: "账号密码不般配" });
                } else {
                    // 登陆成功，返回登陆信息
                    return res.status(200).json(fn(1, data, '登录成功'))
                }
            })
        });
        app.post('/register', function (req, res) {
            const {username, password} = req.body
            User.findOne({ username }, function (err, data) {
                if(err) throw err
                console.log(data)
                if(data) {
                    return res.status(200).json({ code: 0, msg: "已存在该用户" });
                }
                const user = new User({username, password})
                user.save(function (err,data) {
                    console.log(err)
                    if(err || !data) {
                        return res.status(500).json({ code: 0, msg: "后端错误" });
                    }
                    return res.status(200).json(fn(1, data, '注册成功'))
                })
            })
        });
}