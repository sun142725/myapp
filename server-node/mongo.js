var mongoose = require('mongoose');


mongoose.Promise = require("bluebird");

var db = mongoose.connection;

// 连接成功
db.on('open', function(){
    console.log('MongoDB Connection Successed');
});
// 连接失败
db.on('error', function(){
    console.log('MongoDB Connection Error');
});
// mongoose.connect('mongodb://140.143.245.128:27017/totoro')     //连接本地数据库totoro