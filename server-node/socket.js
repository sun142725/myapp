module.exports = function (io){
    io.on('connection', function(socket) {
        socket.on('sendMsg', function (data) {
            console.log(data)
            socket.broadcast.emit('message', {content: data})
        })
    })
}