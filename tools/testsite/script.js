let framerate = null
let delta = 0;
update = (delta) => {
    clear()
    framerate+=1
    text(framerate+".",W/2,H/2-12,48)
}

function resetFPS(){
    framerate=0
    setTimeout(resetFPS, 1000)
}