document.addEventListener('keydown', function (event) {
  if (event.ctrlKey && event.key === 'd') {
    event.preventDefault();
    toggleMic();
  }
  if (event.ctrlKey && event.key === 'e') {
    event.preventDefault();
    toggleCam();
  }
  if (event.ctrlKey && event.key === '/') {
    codeCont.focus();
  }
});
