const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
function showTime() {
  var date = new Date();
  var h = date.getHours();
  var m = date.getMinutes();
  var s = date.getSeconds();
  var day = date.getDay();

  var session = 'AM';
  if (h == 0) {
    h = 12;
  }
  if (h > 12) {
    h = h - 12;
    session = 'PM';
  }
  h = h < 10 ? '0' + h : h;
  m = m < 10 ? '0' + m : m;
  s = s < 10 ? '0' + s : s;
  var time =
    h +
    ':' +
    m +
    ':' +
    s +
    ' ' +
    session +
    ' • ' +
    days[day] +
    ', ' +
    months[date.getMonth()] +
    ' ' +
    date.getDate();
  document.getElementById('clock').innerText = time;
  document.getElementById('clock').textContent = time;
  setTimeout(showTime, 1000);
}
showTime();
