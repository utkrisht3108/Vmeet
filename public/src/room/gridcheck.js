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
    gridsize.style.gridTemplateColumns = f;
  }
}
