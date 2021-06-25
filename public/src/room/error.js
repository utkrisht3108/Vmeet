function handleGetUserMediaError(e) {
  switch (e.name) {
    case 'NotFoundError':
      alert('Unable to open your call because no camera and/or microphone' + 'were found.');
      break;
    case 'SecurityError':
    case 'PermissionDeniedError':
      break;
    default:
      alert('Error opening your camera and/or microphone: ' + e.message);
      break;
  }
}

function reportError(e) {
  console.log(e);
  return;
}
