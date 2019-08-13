var con = require('../../mysql')
const jwt = require("jsonwebtoken");
const ERROR_CODE = require('../../public/error-code')

module.exports = function (app, fn) {
    // app.use(require("./jwtMiddleware")());
    //  登陆
    app.post('/login', function (req, res) {
            const {mobile, password} = req.body
            console.log(mobile, password)
            con.query('SELECT * FROM user WHERE mobile = ' + mobile, function(err, result){
                console.log(err, result)
                if(err){
                    console.log('查询异常');
                    return res.status(500).json({
                        code: '700000',
                        body: null,
                        describe: ERROR_CODE['700000'],
                    })
                } else {
                    if(result.length == 0){
                        return res.status(200).json({
                            code: '000003',
                            body: null,
                            describe: ERROR_CODE['000003'],
                        })
                    }else if(password == result[0].password){
                        const token = jwt.sign({ mobile: result[0].mobile }, 'token', {
                            expiresIn: 60 * 60 * 24 * 7
                        });
                        return res.status(200).json({
                            code: 0,
                            body: result[0],
                            describe: '登陆成功',
                            token: token
                        })
                    } else {
                        return res.status(200).json({
                            code: '000002',
                            body: null,
                            describe: ERROR_CODE['000002']
                        })
                    }
                   
                }
            })
        });
        //  注册账号
        app.post('/register', function (req, res) {
            const {mobile, password} = req.body
            con.query('SELECT * FROM user WHERE mobile = ' + mobile, function(err, result){
                if(err){
                    console.log('sql语句出错');
                    return res.status(500).json({
                        code: '700000',
                        body: null,
                        describe: ERROR_CODE['700000'],
                    })
                } else {
                    // 已存在的账号
                    if(result.length > 0){
                        return res.status(200).json({
                            code: '000001',
                            body: null,
                            describe: ERROR_CODE['000001']
                        })
                    } else {
                        con.query('INSERT INTO user(id, mobile,password) VALUES(0,?,?)', [mobile, password], function(err, result){
                            if(err){
                                console.log('sql语句出错', err);
                                return res.status(500).json({
                                    code: '700000',
                                    body: null,
                                    describe: ERROR_CODE['700000'],
                                })
                            } else {
                                console.log(result)
                                const token = jwt.sign({ mobile: result[0].mobile }, 'token', {
                                    expiresIn: 60 * 60 * 24 * 7
                                });
                                // 注册成功，返回登陆信息
                                return res.status(200).json({
                                    code: 0,
                                    body: result[0],
                                    describe: '注册成功',
                                    token: token
                                })
                            }
                        }) 
                    }
                }
            })
        });
        //  修改密码
        app.post('/modify', function(req, res){
            const {mobile, password, newPassword, newPasswordAlign} = req.body
            if(newPasswordAlign != newPassword){
                return res.status(200).json({
                    code: '000005',
                    body: null,
                    describe: ERROR_CODE['000005'],
                })
            }
            con.query('SELECT * FROM user WHERE mobile = ' + mobile, function(err, result){
                if(err){
                    console.log('sql语句出错', err);
                    return res.status(500).json({
                        code: '700000',
                        body: null,
                        describe: ERROR_CODE['700000'],
                    })
                } else {
                    if(result.length > 0) {
                        if(result[0].password != password){
                            return res.status(200).json({
                                code: '000004',
                                body: null,
                                describe: ERROR_CODE['000004'],
                            })
                        }
                        con.query('UPDATE user SET password = ? WHERE mobile = ?', [password, mobile], function(err, result){
                            if(err){
                                return res.status(500).json({
                                    code: '700000',
                                    body: null,
                                    describe: ERROR_CODE['700000'],
                                })
                            } else {
                                return res.status(500).json({
                                    code: 0,
                                    body: null,
                                    describe: '密码修改成功',
                                })
                            }
                        })
                    } else {
                        //  用户不存在
                        return res.status(200).json({
                            code: '000003',
                            body: null,
                            describe: ERROR_CODE['000003'],
                        })
                    }
                }
            })
        })

        //  忘记密码
        app.post('/forget', function(req, res){
            const {mobile, password} = req.body
            con.query('SELECT * FROM user WHERE mobile = ' + mobile, function(err, result){
                if(err){
                    console.log('sql语句出错', err);
                    return res.status(500).json({
                        code: '700000',
                        body: null,
                        describe: ERROR_CODE['700000'],
                    })
                } else {
                    if(result.length > 0) {
                        con.query('UPDATE user SET password = ? WHERE mobile = ?', [password, mobile], function(err, result){
                            if(err){
                                return res.status(500).json({
                                    code: '700000',
                                    body: null,
                                    describe: ERROR_CODE['700000'],
                                })
                            } else {
                                return res.status(200).json({
                                    code: 0,
                                    body: null,
                                    describe: '密码修改成功',
                                })
                            }
                        })
                    } else {
                        //  用户不存在
                        return res.status(200).json({
                            code: '000003',
                            body: null,
                            describe: ERROR_CODE['000003'],
                        })
                    }
                }
            })
        })
        //  修改用户信息
        app.post('/modifyUserInfo', function(req, res){
            const { mobile, nickName, age } = req.body
            con.query('SELECT * FROM user WHERE mobile = ' + mobile, function(err, result){
                if(err){
                    console.log('sql语句出错', err);
                    return res.status(500).json({
                        code: '700000',
                        body: null,
                        describe: ERROR_CODE['700000'],
                    })
                } else {
                    if(result.length > 0) {
                        con.query('UPDATE user SET nickName  = ?, age = ? WHERE mobile = ?', [nickName || result[0].nickName, age || result[0].age, mobile], function(err, result){
                            if(err){
                                console.log(err)
                                return res.status(500).json({
                                    code: '700000',
                                    body: null,
                                    describe: ERROR_CODE['700000'],
                                })
                            } else {
                                return res.status(200).json({
                                    code: 0,
                                    body: null,
                                    describe: '用户信息修改成功',
                                })
                            }
                        })
                    } else {
                        //  用户不存在
                        return res.status(200).json({
                            code: '000003',
                            body: null,
                            describe: ERROR_CODE['000003'],
                        })
                    }
                }
            })
        })
         //  修改用户实名认证
         app.post('/modifyUserVerify', function(req, res){
            const { mobile, name, idCardNo } = req.body
            con.query('SELECT * FROM user WHERE mobile = ' + mobile, function(err, result){
                if(err){
                    console.log('sql语句出错', err);
                    return res.status(500).json({
                        code: '700000',
                        body: null,
                        describe: ERROR_CODE['700000'],
                    })
                } else {
                    if(result.length > 0) {
                        con.query('UPDATE user SET name  = ?, idCardNo = ?, status = ? WHERE mobile = ?', [name, idCardNo, 1, mobile], function(err, result){
                            if(err){
                                console.log(err)
                                return res.status(500).json({
                                    code: '700000',
                                    body: null,
                                    describe: ERROR_CODE['700000'],
                                })
                            } else {
                                return res.status(200).json({
                                    code: 0,
                                    body: null,
                                    describe: '实名认证成功',
                                })
                            }
                        })
                    } else {
                        //  用户不存在
                        return res.status(200).json({
                            code: '000003',
                            body: null,
                            describe: ERROR_CODE['000003'],
                        })
                    }
                }
            })
        })
        //  获取用户信息
        app.get('/getUserInfo', function(req, res){
            const {mobile} = req.query
            console.log(mobile)
            con.query('SELECT * FROM user WHERE mobile = ' + mobile, function(err, result){
                if(err){
                    console.log('sql语句出错', err);
                    return res.status(500).json({
                        code: '700000',
                        body: null,
                        describe: ERROR_CODE['700000'],
                    })
                } else {
                    if(result.length > 0) {
                        return res.status(200).json({
                            code: 0,
                            body: result[0],
                            describe: '获取用户信息成功',
                        })
                    } else {
                        //  用户不存在
                        return res.status(200).json({
                            code: '000003',
                            body: null,
                            describe: ERROR_CODE['000003'],
                        })
                    }
                }
            })
        })
}