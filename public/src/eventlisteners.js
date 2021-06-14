function toggleMic() {
  if (micAllowed) {
    mediaConstraints = { video: camAllowed ? true : false, audio: false };
    navigator.mediaDevices.getUserMedia(mediaConstraints).then((stream) => {
      videoCont.srcObject = stream;
    });
    mic.classList = 'nodevice';
    mic.classList.remove('mic1');
    mic.classList.add('mic2');

    mic.innerHTML = `<i class="fas fa-microphone-slash"></i>`;
    micAllowed = 0;
  } else {
    mediaConstraints = { video: camAllowed ? true : false, audio: true };
    navigator.mediaDevices.getUserMedia(mediaConstraints).then((stream) => {
      videoCont.srcObject = stream;
    });

    mic.innerHTML = `<i class="fas fa-microphone"></i>`;
    mic.classList = 'device';
    mic.classList.remove('mic2');
    mic.classList.add('mic1');
    micAllowed = 1;
  }
}
function toggleCam() {
  if (camAllowed) {
    mediaConstraints = { video: false, audio: micAllowed ? true : false };
    navigator.mediaDevices.getUserMedia(mediaConstraints).then((stream) => {
      videoCont.srcObject = stream;
    });

    cam.classList = 'nodevice';
    cam.classList.remove('cam1');
    cam.classList.add('cam2');
    cam.innerHTML = `<i class="fas fa-video-slash"></i>`;
    camAllowed = 0;
  } else {
    mediaConstraints = { video: true, audio: micAllowed ? true : false };
    navigator.mediaDevices.getUserMedia(mediaConstraints).then((stream) => {
      videoCont.srcObject = stream;
    });

    cam.classList = 'device';
    cam.classList.remove('cam2');
    cam.classList.add('cam1');
    cam.innerHTML = `<i class="fas fa-video"></i>`;
    camAllowed = 1;
  }
}
