let r = Math.floor(Math.random()*254)+1
let g = Math.floor(Math.random()*254)+1
let b = Math.floor(Math.random()*254)+1

function draw() {
    r = Math.floor(Math.random()*254)+1
    g = Math.floor(Math.random()*254)+1
    b = Math.floor(Math.random()*254)+1
    document.body.style.backgroundColor= "rgb("+r+","+g+","+b+")";
    requestAnimationFrame(draw)
}

requestAnimationFrame(draw);
