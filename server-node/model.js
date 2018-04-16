require('./mongo')
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var user = new Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    constellation: {
        type: String
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
},{ collection: 'user'})

module.exports = {
    user: mongoose.model('user', user)
}