socket.on('action', (msg, sid) => {
  if (msg == 'mute') {
    // console.log(cName[sid] + ' muted themself');
    document.querySelector(`#mute${sid}`).style.visibility = 'visible';
    micInfo[sid] = 'off';
  } else if (msg == 'unmute') {
    // console.log(cName[sid] + ' unmuted themself');
    document.querySelector(`#mute${sid}`).style.visibility = 'hidden';
    micInfo[sid] = 'on';
  } else if (msg == 'videooff') {
    // console.log(cName[sid] + 'turned video off');
    document.querySelector(`#vidoff${sid}`).style.visibility = 'visible';
    videoInfo[sid] = 'off';
  } else if (msg == 'videoon') {
    // console.log(cName[sid] + 'turned video on');
    document.querySelector(`#vidoff${sid}`).style.visibility = 'hidden';
    videoInfo[sid] = 'on';
  }
});
