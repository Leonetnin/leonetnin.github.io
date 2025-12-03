let r = [Math.floor(Math.random()*254)+1, 1]
let g = [Math.floor(Math.random()*254)+1, 1]
let b = [Math.floor(Math.random()*254)+1, 1]
rgbrand(500)
function draw() {
    document.body.style.backgroundColor= "rgb("+r[0]+","+g[0]+","+b[0]+")";
    requestAnimationFrame(draw)
}

function rgbgrad(){
    r = (r[0]<256) ? ([r[0]+r[1], r[1]]) : ([r[0]-r[1], r[1]*-1])
    g = (g[0]<256) ? ([g[0]+g[1], g[1]]) : ([g[0]-g[1], g[1]*-1])
    b = (b[0]<256 && b[0]) ? ([b[0]+b[1], b[1]]) : ([b[0]-b[1], b[1]*-1])
}

function rgbrand(delay){
        setTimeout(function(){
            r = [Math.floor(Math.random()*254)+1, 1]
            g = [Math.floor(Math.random()*254)+1, 1]
            b = [Math.floor(Math.random()*254)+1, 1]
            rgbrand(delay)
        }, delay)
}

requestAnimationFrame(draw);
