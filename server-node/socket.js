module.exports = function (io){
    io.on('connection', function(socket) {
        socket.on('content', function (data) {
            console.log(data)
            socket.broadcast.emit('news', {hello: data})
        })
    })
}