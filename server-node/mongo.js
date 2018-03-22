var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/totoro')     //连接本地数据库totoro

var db = mongoose.connection;

module.exports = db;