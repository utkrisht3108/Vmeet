document.addEventListener('keydown', function (event) {
  if (event.ctrlKey && event.key === '/') {
    event.preventDefault();
    messageField.focus();
    nameField.focus();
  }
});

document.addEventListener('keydown', function (event) {
  if (event.ctrlKey && event.key === 'b') {
    event.preventDefault();
    CopyClassText();
  }
});

document.addEventListener('keydown', function (event) {
  if (event.ctrlKey && event.key === 'd') {
    event.preventDefault();
    audioButt.click();
  }
  if (event.ctrlKey && event.key === 'e') {
    event.preventDefault();
    videoButt.click();
  }
  if (event.ctrlKey && event.key === 'l') {
    event.preventDefault();
    if (partOverlay.style.visibility === 'hidden') {
      attendies.click();
    } else {
      partOverlay.style.visibility = 'hidden';
    }
  }
  if (event.ctrlKey && event.key === 'y') {
    event.preventDefault();
    whiteboardButt.click();
  }
});

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    partOverlay.style.visibility = 'hidden';
  }
});
nameField.addEventListener('keyup', function (event) {
  if (nameField.value.trim() !== '') {
    nameField.classList.remove('roomcode-error');
  }
  if (nameField.value.trim() === '') {
    nameField.classList.add('roomcode-error');
    return;
  }
  if (nameField.value.trim().length > 20) {
    nameField.classList.add('roomcode-error');
    errormsg.style.visibility = 'visible';
    return;
  }
  if (nameField.value.trim().length <= 20) {
    nameField.classList.remove('roomcode-error');
    errormsg.style.visibility = 'hidden';
  }
  if (event.keyCode === 13) {
    event.preventDefault();
    continueButt.click();
  }
});

messageField.addEventListener('keyup', function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    sendButton.click();
  }
});

sendButton.addEventListener('click', () => {
  const msg = messageField.value;
  if (msg.trim() === '') return;
  messageField.value = '';
  // console.log(msg + ' ' + username + ' ' + roomid + ' ' + socket.id);
  socket.emit('message', msg, username, roomid);
});

// editButton.addEventListener('click', function (event) {
//   overlayContainer.style.visibility = 'visible';
// });

backButton.addEventListener('click', function (event) {
  partOverlay.style.visibility = 'hidden';
});

continueButt.addEventListener('click', () => {
  // socket.emit('remove peer', roomid, username);
  if (nameField.value.trim() === '') {
    nameField.classList.add('roomcode-error');
    return;
  }

  if (nameField.value.trim().length > 20) {
    nameField.classList.add('roomcode-error');
    errormsg.style.visibility = 'visible';
    return;
  }
  username = nameField.value;
  overlayContainer.style.visibility = 'hidden';
  document.querySelector('#myname').innerHTML = `${username} (You)`;

  //connect room
  socket.emit('join room', roomid, username);
  //edit bug fix later
});

//media

videoButt.addEventListener('click', () => {
  if (videoAllowed) {
    for (let key in videoTrackSent) {
      videoTrackSent[key].enabled = false;
    }
    videoButt.innerHTML = `<i class="fas fa-video-slash"></i>`;
    videoAllowed = 0;
    videoButt.style.backgroundColor = '#393e46';

    if (mystream) {
      mystream.getTracks().forEach((track) => {
        if (track.kind === 'video') {
          track.enabled = false;
        }
      });
    }

    myvideooff.style.visibility = 'visible';

    socket.emit('action', 'videooff');
  } else {
    for (let key in videoTrackSent) {
      videoTrackSent[key].enabled = true;
    }
    videoButt.innerHTML = `<i class="fas fa-video"></i>`;
    videoAllowed = 1;
    videoButt.style.backgroundColor = '#3498db';
    if (mystream) {
      mystream.getTracks().forEach((track) => {
        if (track.kind === 'video') track.enabled = true;
      });
    }

    myvideooff.style.visibility = 'hidden';

    socket.emit('action', 'videoon');
  }
});

audioButt.addEventListener('click', () => {
  if (audioAllowed) {
    for (let key in audioTrackSent) {
      audioTrackSent[key].enabled = false;
    }
    audioButt.innerHTML = `<i class="fas fa-microphone-slash"></i>`;
    audioAllowed = 0;
    audioButt.style.backgroundColor = '#393e46';
    if (mystream) {
      mystream.getTracks().forEach((track) => {
        if (track.kind === 'audio') track.enabled = false;
      });
    }

    mymuteicon.style.visibility = 'visible';

    socket.emit('action', 'mute');
  } else {
    for (let key in audioTrackSent) {
      audioTrackSent[key].enabled = true;
    }
    audioButt.innerHTML = `<i class="fas fa-microphone"></i>`;
    audioAllowed = 1;
    audioButt.style.backgroundColor = '#3498db';
    if (mystream) {
      mystream.getTracks().forEach((track) => {
        if (track.kind === 'audio') track.enabled = true;
      });
    }

    mymuteicon.style.visibility = 'hidden';

    socket.emit('action', 'unmute');
  }
});

cutCall.addEventListener('click', () => {
  location.href = '/';
});

downloadBtn.addEventListener('click', () => {
  var csv = 'Name\n';

  participants.forEach(function (row) {
    csv += row;
    csv += '\n';
  });

  var hiddenElement = document.createElement('a');
  hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
  hiddenElement.target = '_blank';

  hiddenElement.download = `${roomid}-Attendies.csv`;
  hiddenElement.click();
});

whiteboardButt.addEventListener('click', () => {
  if (boardVisisble) {
    whiteboardCont.style.visibility = 'hidden';
    boardVisisble = false;
  } else {
    whiteboardCont.style.visibility = 'visible';
    boardVisisble = true;
  }
});

copyLink.addEventListener('click', () => {
  CopyLinkText();
});

chatIcon.addEventListener('click', () => {
  document.querySelector('.container-room .right-cont').style.display = 'block';
  document.querySelector('.container-room .left-cont').style.display = 'none';
});

backIcon.addEventListener('click', () => {
  document.querySelector('.container-room .right-cont').style.display = 'none';
  document.querySelector('.container-room .left-cont').style.display = 'block';
});
