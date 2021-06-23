const socket = io();
let params = new URL(document.location).searchParams;
const chatRoom = document.querySelector('.chat-cont');
const sendButton = document.querySelector('.chat-send');
const messageField = document.querySelector('.chat-input');
const videoContainer = document.querySelector('#vcont');
const overlayContainer = document.querySelector('#overlay');
const continueButt = document.querySelector('.continue-name');
const nameField = document.querySelector('#name-field');
const editButton = document.querySelector('.edit-icon');
const videoButt = document.querySelector('.novideo');
const audioButt = document.querySelector('.audio');
const cutCall = document.querySelector('.cutcall');
const backButton = document.querySelector('.backButton');
const screenShareButt = document.querySelector('.screenshare');
const whiteboardButt = document.querySelector('.board-icon');
let username = 'GUEST';
const roomid = params.get('room');
overlayContainer.style.visibility = 'hidden';

// copy
document.querySelector('.roomcode').innerHTML = `${roomid}`;

function CopyClassText() {
  var textToCopy = document.querySelector('.roomcode');
  var range = document.createRange();
  range.selectNode(textToCopy);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  document.execCommand('copy');
  window.getSelection().removeAllRanges();

  document.querySelector('.copycode-button').textContent = 'Copied!';
  setTimeout(() => {
    document.querySelector('.copycode-button').textContent = 'Copy Code';
  }, 5000);
}

let mymuteicon = document.querySelector('#mymuteicon');
mymuteicon.style.visibility = 'hidden';

let myvideooff = document.querySelector('#myvideooff');
myvideooff.style.visibility = 'hidden';

socket.on('message', (message, name, time) => {
  // console.log(message + ' ' + name + ' ' + time);
  chatRoom.scrollTop = chatRoom.scrollHeight;
  chatRoom.innerHTML += `<div class="message">
            <div class="info">
              <div class="username">${name}</div>
              <div class="time">${time}</div>
            </div>
            <div class="content">${message}</div>
          </div>`;
});

//admin message
socket.on('Adminmessage', (message, name, time) => {
  chatRoom.scrollTop = chatRoom.scrollHeight;
  chatRoom.innerHTML += `<div class="message adminmessage">
            <div class="info admininfo">
              <div class="username adminusername">${name}</div>
              <div class="time admintime">${time}</div>
            </div>
            <div class="content admincontent">${message}</div>
          </div>`;
});


//Join room