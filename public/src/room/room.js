const socket = io();
const myvideo = document.querySelector('#vd1');
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
const attendies = document.querySelector('.attendies');
const gridsize = document.querySelector('.gridsize');

let username = 'GUEST';
const roomid = params.get('room');

let videoAllowed = 1;
let audioAllowed = 1;

let micInfo = {};
let videoInfo = {};

let videoTrackReceived = {};

let mymuteicon = document.querySelector('#mymuteicon');
mymuteicon.style.visibility = 'hidden';

let myvideooff = document.querySelector('#myvideooff');
myvideooff.style.visibility = 'hidden';

const mediaConstraints = {
  video: true,
  audio: true,
};

let connections = {};
let cName = {};
let audioTrackSent = {};
let videoTrackSent = {};
let participants = [];

let mystream;

document.querySelector('.roomcode').innerHTML = `${roomid}`;

socket.on('user count', (count) => {
  if (count > 1) {
    videoContainer.className = 'video-cont';
    // videoContainer.classList.add('gridsize');
  } else {
    videoContainer.className = 'video-cont-single';
    // videoContainer.classList.remove('gridsize');
  }
});

const configuration = {
  iceServers: [
    {
      urls: 'stun:stun.stunprotocol.org',
    },
  ],
};

function startCall() {
  navigator.mediaDevices
    .getUserMedia(mediaConstraints)
    .then((localStream) => {
      myvideo.srcObject = localStream;
      myvideo.muted = true;

      localStream.getTracks().forEach((track) => {
        for (let key in connections) {
          connections[key].addTrack(track, localStream);
          if (track.kind === 'audio') audioTrackSent[key] = track;
          else videoTrackSent[key] = track;
        }
      });
    })
    .catch(handleGetUserMediaError);
}

function handleVideoOffer(offer, sid, cname, micinf, vidinf) {
  cName[sid] = cname;
  participants.push(cname);
  gridcheck();
  console.log('video offered recevied');
  micInfo[sid] = micinf;
  videoInfo[sid] = vidinf;
  connections[sid] = new RTCPeerConnection(configuration);

  connections[sid].onicecandidate = function (event) {
    if (event.candidate) {
      console.log('icecandidate fired ababababa');
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
      console.log('removed track');
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

  let desc = new RTCSessionDescription(offer);

  connections[sid]
    .setRemoteDescription(desc)
    .then(() => {
      return navigator.mediaDevices.getUserMedia(mediaConstraints);
    })
    .then((localStream) => {
      localStream.getTracks().forEach((track) => {
        connections[sid].addTrack(track, localStream);
        console.log('added local stream to peer');
        if (track.kind === 'audio') {
          audioTrackSent[sid] = track;
          if (!audioAllowed) {
            audioTrackSent[sid].enabled = false;
          }
        } else {
          videoTrackSent[sid] = track;
          if (!videoAllowed) {
            videoTrackSent[sid].enabled = false;
          }
        }
      });
    })
    .then(() => {
      return connections[sid].createAnswer();
    })
    .then((answer) => {
      return connections[sid].setLocalDescription(answer);
    })
    .then(() => {
      socket.emit('video-answer', connections[sid].localDescription, sid);
    })
    .catch(handleGetUserMediaError);
}

function handleNewIceCandidate(candidate, sid) {
  console.log('new candidate recieved');
  var newcandidate = new RTCIceCandidate(candidate);

  connections[sid].addIceCandidate(newcandidate).catch(reportError);
}

function handleVideoAnswer(answer, sid) {
  console.log('answered the offer');
  const ans = new RTCSessionDescription(answer);
  connections[sid].setRemoteDescription(ans);
}

//1
socket.on('video-offer', handleVideoOffer);

//2
socket.on('new icecandidate', handleNewIceCandidate);

//3
socket.on('video-answer', handleVideoAnswer);

socket.on('remove peer', (sid) => {
  // participants.
  const pindex = participants.indexOf(cName[sid]);
  participants.splice(pindex, 1);
  if (document.getElementById(sid)) {
    document.getElementById(sid).remove();
  }
  delete connections[sid];
});

//////TODO -tom//////
//remove participants daalna hai and then overlay mai add karna hai
//click to download excel file
