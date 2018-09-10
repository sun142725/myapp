var User = require('../model').user
const jwt = require("jsonwebtoken");

module.exports = function (app, fn) {
    // app.use(require("./jwtMiddleware")());
    app.post('/login', function (req, res) {
            const {username, password} = req.body
            User.findOne({username, password}, function(err, data){
                if(err) throw err
                if(!data) {
                    return res.status(200).json({ code: 0, msg: "账号密码不般配" });
                } else {
                    const token = jwt.sign({ id: data._id }, 'token', {
                        expiresIn: 60 * 60 * 24 * 7
                    });
                    // 登陆成功，返回登陆信息
                    return res.status(200).json(fn('000000', data, '登陆成功'), token)
                }
            })
        });
        app.post('/register', function (req, res) {
            const {username, password} = req.body
            console.log(1)
            User.findOne({ username }, function (err, data) {
                if(err) throw err
                if(data) {
                    return res.status(200).json({ code: 0, msg: "已存在该用户" });
                }
                const user = new User({username, password})
                user.save(function (err,data) {
                    console.log(err)
                    if(err || !data) {
                        return res.status(500).json({ code: 0, msg: "后端错误" });
                    }
                    const token = jwt.sign({ id: data._id }, 'token', {
                        expiresIn: 60 * 60 * 24 * 7
                    });
                    return res.status(200).json({ code: '000000', token, body: data })
                })
            })
        });
        app.post('/forget', function(req, res){
            const {username, password} = req.body
            User.findOne({ username }, function (err, data) {
                if(err) throw err
                console.log(data)
                if(!data) {
                    return res.status(200).json({ code: 0, msg: "该用户不存在" });
                } else {
                    User.update({username}, {password}, function(err, data){
                        console.log(err)
                        if(err) {
                            return res.status(500).json({ code: 0, msg: "异常" });
                        }
                        return res.status(200).json(fn('000000', data, '密码修改成功'))
                    })
                }
            })
        })
}