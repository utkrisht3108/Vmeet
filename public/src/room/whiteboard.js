let boardVisisble = false;

whiteboardCont.style.visibility = 'hidden';

let isDrawing = 0;
let x = 0;
let y = 0;
let color = 'black';
let drawsize = 3;
let colorRemote = 'black';
let drawsizeRemote = 3;
function fitToContainer(cansize) {
  cansize.style.width = '101%';
  cansize.style.height = '105%';
  cansize.width = canvas.offsetWidth;
  cansize.height = canvas.offsetHeight;
  socket.emit('getCanvas');
}

function reportWindowSize() {
  fitToContainer(canvas);
}

window.onresize = reportWindowSize;
fitToContainer(canvas);

socket.on('getCanvas', (url) => {
  let img = new Image();
  img.onload = start;
  img.src = url;

  function start() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
  }

  // console.log('got canvas');
});

function setColor(newcolor) {
  color = newcolor;
  document.querySelector('.plusSize').style.backgroundColor = color;
  document.querySelector('.minusSize').style.backgroundColor = color;
}

function plusSize() {
  drawsize = drawsize + 1;
}

function minusSize() {
  drawsize = drawsize - 1;
  if (drawsize < 2) drawsize = 1;
}

function setEraser() {
  color = 'white';
}

function clearBoard() {
  if (window.confirm('Are you sure you want to clear board? This cannot be undone')) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //store isliye agar baadme join kiya toh khaali hona chahiye
    socket.emit('store canvas', canvas.toDataURL());
    socket.emit('clearBoard');
  } else return;
}

socket.on('clearBoard', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

//apne mai draw karra phir 'store canvas' mai save karra phir
//vaha vo roomBoard assing kar diya
function draw(newx, newy, oldx, oldy) {
  ctx.strokeStyle = color;
  ctx.lineWidth = drawsize;
  ctx.beginPath();
  ctx.moveTo(oldx, oldy);
  ctx.lineTo(newx, newy);
  ctx.stroke();
  ctx.closePath();

  socket.emit('store canvas', canvas.toDataURL());
}

function drawRemote(newx, newy, oldx, oldy) {
  ctx.strokeStyle = colorRemote;
  ctx.lineWidth = drawsizeRemote;
  ctx.beginPath();
  ctx.moveTo(oldx, oldy);
  ctx.lineTo(newx, newy);
  ctx.stroke();
  ctx.closePath();
}

canvas.addEventListener('mousedown', (e) => {
  //console.log('1');
  x = e.offsetX;
  y = e.offsetY;
  isDrawing = 1;
});

canvas.addEventListener('mousemove', (e) => {
  if (isDrawing) {
    //console.log('2');
    draw(e.offsetX, e.offsetY, x, y);
    socket.emit('draw', e.offsetX, e.offsetY, x, y, color, drawsize);
    x = e.offsetX;
    y = e.offsetY;
  }
});

window.addEventListener('mouseup', (e) => {
  if (isDrawing) {
    //console.log('3');
    isDrawing = 0;
  }
});
canvas.addEventListener('touchstart', (e) => {
  // console.log('1');
  touch = e.touches[0];
  x = touch.clientX;
  y = touch.clientY;
  isDrawing = 1;
});

canvas.addEventListener('touchmove', (e) => {
  e.preventDefault();
  if (isDrawing) {
    // console.log(x + ' ' + y);
    touch = e.touches[0];
    draw(touch.clientX, touch.clientY, x, y);
    socket.emit('draw', touch.clientX, touch.clientY, x, y, color, drawsize);
    x = touch.clientX;
    y = touch.clientY;
  }
});

window.addEventListener('touchend', (e) => {
  if (isDrawing) {
    // console.log('3');
    isDrawing = 0;
  }
});
//dusra draw karega toh isse tere yaha ayega
socket.on('draw', (newX, newY, prevX, prevY, color, size) => {
  //console.log('4');
  colorRemote = color;
  drawsizeRemote = size;
  drawRemote(newX, newY, prevX, prevY);
});

//dowload
function downloadCanvas() {
  image = canvas.toDataURL('image/jpg').replace('image/jpg', 'image/octet-stream');
  var link = document.createElement('a');
  link.download = `${roomid} - whiteboard.jpg`;
  link.href = image;
  link.click();
}
