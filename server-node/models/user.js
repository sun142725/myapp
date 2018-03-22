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
        ddefault: Date.now()
    }
})
module.exports = mongoose.model('user', user)