var express = require('express');
var socket = require('socket.io');
const host = '0.0.0.0';
const port = process.env.PORT || 3000;


var app = express();
var server = app.listen(port, host, function(){
    console.log('listening for requests on port 5000,');
});


app.use(express.static('public'));


var io = socket(server);
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);


    socket.on('commands', function(data){

        io.sockets.emit('commands', data);
    });

});
