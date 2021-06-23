const path = require('path');
const express = require('express');
const http = require('http');
const moment = require('moment');
const socketio = require('socket.io');
const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);

const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

let rooms = {};
let socketroom = {};
let socketname = {};

const admin = 'VMEET';

//when client connects
io.on('connection', (socket) => {
  socket.emit('Adminmessage', 'WELCOME TO THE CHAT', admin, moment().format('h:mm a'));
  socket.broadcast.emit(
    'Adminmessage',
    'A USER HAS JOIN THE CHAT',
    admin,
    moment().format('h:mm a')
  );

  socket.on('disconnect', () => {
    io.emit('Adminmessage', 'A USER HAS LEFT THE CHAT', admin, moment().format('h:mm a'));
  });

  //listen message
  socket.on('message', (message, username, roomid) => {
    io.emit('message', message, username, moment().format('h:mm a'));
  });

  //join room
});

server.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`));
