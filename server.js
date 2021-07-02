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
let micSocket = {};
let videoSocket = {};
let roomBoard = {};

const admin = 'VMEET';

io.on('connect', (socket) => {
  socket.on('join room', (roomid, username) => {
    socket.join(roomid);
    socketroom[socket.id] = roomid;
    socketname[socket.id] = username;
    micSocket[socket.id] = 'on';
    videoSocket[socket.id] = 'on';

    socket.emit('Adminmessage', formatMessage('WELCOME TO THE CHAT', admin));

    if (rooms[roomid] && rooms[roomid].length > 0) {
      rooms[roomid].push(socket.id);
      socket.to(roomid).emit('Adminmessage', formatMessage(`${username} joined the room.`, admin));
      // console.log(rooms);
      io.to(socket.id).emit('join room', rooms[roomid], socketname, micSocket, videoSocket);
    } else {
      rooms[roomid] = [socket.id];
      io.to(socket.id).emit('join room', rooms[roomid], socketname, micSocket, videoSocket);
    }

    io.to(roomid).emit('user count', rooms[roomid].length);
  });

  socket.on('action', (msg) => {
    if (msg == 'mute') micSocket[socket.id] = 'off';
    else if (msg == 'unmute') micSocket[socket.id] = 'on';
    else if (msg == 'videoon') videoSocket[socket.id] = 'on';
    else if (msg == 'videooff') videoSocket[socket.id] = 'off';

    socket.to(socketroom[socket.id]).emit('action', msg, socket.id);
  });

  socket.on('video-offer', (offer, sid) => {
    socket
      .to(sid)
      .emit(
        'video-offer',
        offer,
        socket.id,
        socketname[socket.id],
        micSocket[socket.id],
        videoSocket[socket.id]
      );
  });

  socket.on('video-answer', (answer, sid) => {
    socket.to(sid).emit('video-answer', answer, socket.id);
  });

  socket.on('new icecandidate', (candidate, sid) => {
    socket.to(sid).emit('new icecandidate', candidate, socket.id);
  });

  socket.on('message', (msg, username, roomid) => {
    io.to(roomid).emit('message', formatMessage(msg, username));
  });

  //whiteboard
  socket.on('getCanvas', () => {
    if (roomBoard[socketroom[socket.id]]) {
      // console.log('ghus ' + socket.id);
      socket.emit('getCanvas', roomBoard[socketroom[socket.id]]);
    }
  });

  socket.on('draw', (newx, newy, prevx, prevy, color, size) => {
    // console.log('chalu kar');
    socket.to(socketroom[socket.id]).emit('draw', newx, newy, prevx, prevy, color, size);
  });

  socket.on('clearBoard', () => {
    socket.to(socketroom[socket.id]).emit('clearBoard');
  });

  socket.on('store canvas', (url) => {
    // console.log('save kar--' + socket.id);
    roomBoard[socketroom[socket.id]] = url;
  });

  ////
  socket.on('disconnect', () => {
    if (!socketroom[socket.id]) return;
    socket
      .to(socketroom[socket.id])
      .emit('Adminmessage', formatMessage(`${socketname[socket.id]} left the chat.`, admin));
    socket.to(socketroom[socket.id]).emit('remove peer', socket.id);
    var index = rooms[socketroom[socket.id]].indexOf(socket.id);
    rooms[socketroom[socket.id]].splice(index, 1);
    io.to(socketroom[socket.id]).emit('user count', rooms[socketroom[socket.id]].length);
    delete socketroom[socket.id];
  });
});

server.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`));
