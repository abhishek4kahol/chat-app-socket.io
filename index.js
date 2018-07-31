const express = require('express');
const app = express();
const socket = require('socket.io')

const server = app.listen(4000, () => console.log('listening on port 4000'));
//static files
app.use(express.static('public'));

//socket setup
const io = socket(server);
io.on('connection',((socket) => {
    console.log('made socket connection.',socket.id);    
    
    socket.on('chat', ((data) => {
        io.sockets.emit('chat',data);
    }));
    socket.on('typing', ((data) => {
        socket.broadcast.emit('typing', data);
    }));
    })
);