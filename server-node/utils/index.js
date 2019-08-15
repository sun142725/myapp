var calculator = require('./calculator')
var file = require('./file')
module.exports = {
    ...calculator,
    ...file
}