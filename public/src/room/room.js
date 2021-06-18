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
