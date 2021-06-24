const path = require('path');
const express = require('express');
const http = require('http');
const moment = require('moment');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
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
  socket.emit('Adminmessage', formatMessage('WELCOME TO THE CHAT', admin));
  socket.broadcast.emit('Adminmessage', formatMessage('A USER HAS JOIN THE CHAT', admin));

  socket.on('disconnect', () => {
    io.emit('Adminmessage', formatMessage('A USER HAS LEFT THE CHAT', admin));
  });

  //join room

  //listen message
  socket.on('message', (message, username, roomid) => {
    // console.log(message + ' ' + username + '___' + roomid);
    io.emit('message', formatMessage(message, username));
  });
});

server.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`));
