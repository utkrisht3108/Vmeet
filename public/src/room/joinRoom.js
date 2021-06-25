socket.on('join room', async (conc, cnames, micinfo, videoinfo) => {
  //   console.log(conc);
  //   console.log(cnames);
  //   console.log(micinfo);
  //   console.log(videoinfo);

  if (cnames) cName = cnames;

  if (micinfo) micInfo = micinfo;

  if (videoinfo) videoInfo = videoinfo;
  if (conc) {
    await conc.forEach((sid) => {
      participants.push(cName[sid]);
      gridcheck();
      connections[sid] = new RTCPeerConnection(configuration);

      connections[sid].onicecandidate = function (event) {
        if (event.candidate) {
          console.log('icecandidate fired');
          socket.emit('new icecandidate', event.candidate, sid);
        }
      };
      connections[sid].ontrack = function (event) {
        if (!document.getElementById(sid)) {
          console.log('track event fired');
          let vidCont = document.createElement('div');
          let newvideo = document.createElement('video');
          let name = document.createElement('div');
          let muteIcon = document.createElement('div');
          let videoOff = document.createElement('div');
          videoOff.classList.add('video-off');
          muteIcon.classList.add('mute-icon');
          name.classList.add('nametag');
          name.innerHTML = `${cName[sid]}`;
          vidCont.id = sid;
          muteIcon.id = `mute${sid}`;
          videoOff.id = `vidoff${sid}`;
          muteIcon.innerHTML = `<i class="fas fa-microphone-slash"></i>`;
          videoOff.innerHTML = 'Video Off';
          vidCont.classList.add('video-box');
          newvideo.classList.add('video-frame');
          newvideo.autoplay = true;
          newvideo.playsinline = true;
          newvideo.id = `video${sid}`;
          newvideo.srcObject = event.streams[0];

          if (micInfo[sid] == 'on') {
            muteIcon.style.visibility = 'hidden';
          } else {
            muteIcon.style.visibility = 'visible';
          }

          if (videoInfo[sid] == 'on') {
            videoOff.style.visibility = 'hidden';
          } else {
            videoOff.style.visibility = 'visible';
          }

          vidCont.appendChild(newvideo);
          vidCont.appendChild(name);
          vidCont.appendChild(muteIcon);
          vidCont.appendChild(videoOff);

          videoContainer.appendChild(vidCont);
        }
      };

      connections[sid].onremovetrack = function (event) {
        if (document.getElementById(sid)) {
          document.getElementById(sid).remove();
        }
      };

      connections[sid].onnegotiationneeded = function () {
        connections[sid]
          .createOffer()
          .then(function (offer) {
            return connections[sid].setLocalDescription(offer);
          })
          .then(function () {
            socket.emit('video-offer', connections[sid].localDescription, sid);
          })
          .catch(reportError);
      };
    });

    console.log('added all sockets to connections');
    startCall();
  } else {
    // noo need now
    console.log('waiting for someone to join');
    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then((localStream) => {
        myvideo.srcObject = localStream;
        myvideo.muted = true;
        mystream = localStream;
      })
      .catch(handleGetUserMediaError);
  }
});
