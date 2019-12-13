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
var request = require('request')




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
    console.log('111', req.baseUrl)
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
var base64Image = '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'
function imageToText(){
    request.post({
        url: '',
        data: {}
    })
}
// imageToText(base64Image)
server.listen(666, function(){
    console.log('服务器在666端口启动')
})