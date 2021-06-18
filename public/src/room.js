const chatRoom = document.querySelector('.chat-cont');
const sendButton = document.querySelector('.chat-send');
const messageField = document.querySelector('.chat-input');
const videoContainer = document.querySelector('#vcont');
const overlayContainer = document.querySelector('#overlay');
const continueButt = document.querySelector('.continue-name');
const nameField = document.querySelector('#name-field');
const videoButt = document.querySelector('.novideo');
const audioButt = document.querySelector('.audio');
const cutCall = document.querySelector('.cutcall');
const screenShareButt = document.querySelector('.screenshare');
const whiteboardButt = document.querySelector('.board-icon');

let username = 'GUEST';
// const roomid = params.get('room');
continueButt.addEventListener('click', () => {
  if (nameField.value == '') return;
  username = nameField.value;
  overlayContainer.style.visibility = 'hidden';
  document.querySelector('#myname').innerHTML = `${username} (You)`;
});

nameField.addEventListener('keyup', function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    continueButt.click();
  }
});

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
