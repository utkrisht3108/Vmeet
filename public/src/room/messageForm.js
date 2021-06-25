socket.on('message', (message) => {
  // console.log(message + ' ' + name + ' ' + time);
  chatRoom.scrollTop = chatRoom.scrollHeight;
  chatRoom.innerHTML += `<div class="message">
            <div class="info">
              <div class="username">${message.username}</div>
              <div class="time">${message.time}</div>
            </div>
            <div class="content">${message.message}</div>
          </div>`;
});

//admin message
socket.on('Adminmessage', (message) => {
  // console.log(message + ' ' + name + ' ' + time);
  chatRoom.scrollTop = chatRoom.scrollHeight;
  chatRoom.innerHTML += `<div class="message adminmessage">
            <div class="info admininfo">
              <div class="username adminusername">${message.username}</div>
              <div class="time admintime">${message.time}</div>
            </div>
            <div class="content admincontent">${message.message}</div>
          </div>`;
});
