document.addEventListener('keydown', function (event) {
  event.preventDefault();
  if (event.ctrlKey && event.key === 'd') {
    toggleMic();
  }
  if (event.ctrlKey && event.key === 'e') {
    toggleCam();
  }
});
