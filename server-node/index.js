var express = require('express')
var app = express()
var server = require('http').Server(app)
var io = require('socket.io')(server, {
    pingInterval: 1000
})
const bodyParser = require('body-parser');
const cookie = require('cookie');
var resfn = require('./public/function')
// var router = require('./router')
var router = require('./router/index')
var socket = require('./socket')
var jwt = require('jsonwebtoken')
// var request = require('request')




// app.use(express.static('./public'));
app.use('/public', express.static(__dirname + '/public'))
//  获取post请求数据
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    if(req.method === 'OPTIONS') {
        res.sendStatus(200)
    } else {
        next();
    }
});
const PERSONAL = 'personal_center'
app.use(function(req, res, next){
    console.log(req.method)
    //  路由拦截验证token
    if(req.url.split('/')[1] === PERSONAL){
        jwt.verify(req.headers.token, 'token', function(err, decoded){
            console.log(err, decoded)
            if(err){
                return res.status(200).json({
                    code: '700001',
                    body: null,
                    describe: ERROR_CODE['700001'],
                })
            } else {
                if(req.method == 'POST'){
                    
                }
                console.log(decoded.mobile)
                next()
            }
        })
    } else {
        next()
    }
})
app.get('/', function(req, res){
    res.header("Content-Type", "text/html");
    res.sendFile(__dirname+'/index.html')
})
router(app, resfn)
socket(io)

// function downloadlyric(song){
//     request.post({
//         url:'http://music.163.com/api/search/pc',
//         form:{s:song,type:1}
//     },(err,res,body)=>{
//         // https://music.163.com/api/song/luric?id=1231&lv=-1&kv=-1
//         let data =JSON.parse(body).result.songs[0];
//         let id=data.id;
//         let name = data.name;
//         request.get(`https://music.163.com/api/song/lyric?id=${id}&lv=-1&kv=-1`,(err,res,body)=>{
//             if(err){
//                 console.log(err.Message)
//             }
//             fs.writeFile(`./${name}.json`,body,()=>{
//                 console.log(`${name}.json文件下载成功`)
//             })
//         })
//     });
// }
// downloadlyric('纸短情长')
server.listen(666, function(){
    console.log('服务器在666端口启动')
})