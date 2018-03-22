var express = require('express')
var app = express()
var server = require('http').Server(app)
var io = require('socket.io')(server, {
    pingInterval: 1000
})
var db = require('./mongo')
const bodyParser = require('body-parser');
const cookie = require('cookie');
var router = require('./router')
var socket = require('./socket')

// 连接成功
db.on('open', function(){
    console.log('MongoDB Connection Successed');
});
// 连接失败
db.on('error', function(){
    console.log('MongoDB Connection Error');
});


app.use(express.static('./public'));
//  获取post请求数据
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.get('/', function(req, res){
    res.sendFile(__dirname+'/index.html')
})
router(app)
socket(io)

server.listen(666, function(){
    console.log('服务器在666端口启动')
})