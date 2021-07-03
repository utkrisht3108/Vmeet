function gridcheck() {
  let pcount = participants.length;
  let check = parseInt(Math.sqrt(pcount));
  let divs = check;
  if (check * check < pcount) {
    divs = divs + 1;
  }
  let s = '1fr ';
  let f = '';
  for (let i = 0; i < divs; i++) f += s;
  if (divs != 1) {
    if (pcount == 2) {
      sizeCheck(f);
      $(window).resize(() => {
        if (pcount == 2) sizeCheck(f);
      });
    } else {
      gridsize.style.gridTemplateColumns = f;
      gridsize.style.gridTemplateRows = '';
    }
  }
}

function sizeCheck(f) {
  if ($(window).width() > 600) {
    gridsize.style.gridTemplateColumns = f;
    gridsize.style.gridTemplateRows = '';
  } else {
    gridsize.style.gridTemplateRows = f;
    gridsize.style.gridTemplateColumns = '';
  }
}
