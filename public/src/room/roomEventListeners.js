document.addEventListener('keydown', function (event) {
  if (event.ctrlKey && event.key === '/') {
    event.preventDefault();
    messageField.focus();
    nameField.focus();
  }
});

document.addEventListener('keydown', function (event) {
  if (event.ctrlKey && event.key === 'c') {
    event.preventDefault();
    CopyClassText();
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

editButton.addEventListener('click', function (event) {
  overlayContainer.style.visibility = 'visible';
});

document.addEventListener('keyup', function (event) {
  if (event.key === 'Escape') {
    overlayContainer.style.visibility = 'hidden';
  }
});

backButton.addEventListener('click', function (event) {
  overlayContainer.style.visibility = 'hidden';
});

continueButt.addEventListener('click', () => {
  if (nameField.value.trim() === '') {
    nameField.classList.add('roomcode-error');
    return;
  }
  username = nameField.value;
  overlayContainer.style.visibility = 'hidden';
  document.querySelector('#myname').innerHTML = `${username} (You)`;
  //connect room
});

cutCall.addEventListener('click', () => {
  location.href = '/';
});
