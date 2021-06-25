function CopyClassText() {
  var textToCopy = document.querySelector('.roomcode');
  var range = document.createRange();
  range.selectNode(textToCopy);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  document.execCommand('copy');
  window.getSelection().removeAllRanges();

  document.querySelector('.copycode-button').textContent = 'Copied!';
  document.querySelector('.copycode-button').style.backgroundColor = '#66DE93';
  document.querySelector('.roomcode').style.borderColor = '#66DE93';
  setTimeout(() => {
    document.querySelector('.copycode-button').textContent = 'Copy Code';
    document.querySelector('.copycode-button').style.backgroundColor = '#3498db';
    document.querySelector('.roomcode').style.borderColor = '#3498db';
  }, 2500);
}
