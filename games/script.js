document.getElementsByTagName("h1")[0].style.fontSize = "10vw";
let clicks = 0
let clickstrength = 1
let upgradeprice = 1000
let idlemoney = 0
let mouseprice = 100

function updatedata() {
  document.getElementById("clicks").innerHTML = "YOU SUSSY HAVE TOUCHED SHREK " + Math.floor(clicks) + " TIMES!!";
  document.getElementById("upgradeprice").innerHTML = "Upgrade price:" + upgradeprice;
  document.getElementById("clickstrength").innerHTML = "Click strength:" + clickstrength;
  document.getElementById("idlemoney").innerHTML = "idlemoney:" + idlemoney;
  document.getElementById("idleprice").innerHTML = "donke price:" + mouseprice;
}
function clicked() {
  clicks = parseInt(clicks) + parseInt(clickstrength);
  document.title = Math.floor(clicks)
  updatedata()
}

function upgrade() {
  if (clicks > upgradeprice) {
    upgradeprice = parseInt(upgradeprice) * 2;
    clickstrength = parseInt(clickstrength) + 1;
    updatedata()
  }
}

function buymouse() {
  if (clicks > mouseprice) {
    mouseprice = Math.ceil(parseInt(mouseprice) * 1.4);
    idlemoney = parseInt(idlemoney) + 1;
    updatedata()
  }
}

function getidle() {
  document.getElementById("autoclikk").disabled = true;
  clicks = parseFloat(clicks) + (idlemoney / 10);
  document.title = clicks
  setTimeout("getidle()", 100)
  updatedata()
}

function savedata() {
  localStorage.setItem('clicks', clicks)
  localStorage.setItem('clickstrength', clickstrength)
  localStorage.setItem('idlemone', idlemoney)
  localStorage.setItem('upgradeprice', upgradeprice)
  localStorage.setItem('mouseprice', mouseprice)
  updatedata()
}

function loaddata() {
  clicks = localStorage.getItem('clicks')
  clickstrength = localStorage.getItem('clickstrength')
  idlemoney = localStorage.getItem('idlemone')
  upgradeprice = localStorage.getItem('upgradeprice')
  mouseprice = localStorage.getItem('mouseprice')
  if (parseInt(idlemoney) == 0) {
    localStorage.setItem('clicks', 0)
    clicks = localStorage.getItem('clicks')
  }
  updatedata()
}