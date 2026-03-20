let drags = document.getElementsByClassName("drag")
let dragTarget = []
let follow = false
let mousex, mousey = 0
let targetmouse = [window.innerWidth/2,window.innerHeight/2]

let speed = 0.15

for (let i=0; i<drags.length; i++) {
    drags[i].onmousedown = () => {follow=drags.indexOf(this)}
    dragTarget[i]=[drags[i].style.left]
}
window.onmouseup = () => {follow=-1}

function update() {
    if (follow) {
        targetmouse=[mousex-plane.width/2,mousey-plane.height/2]
    }
    let positionx = +plane.style.left.split("px")[0]
    let positiony = +plane.style.top.split("px")[0]
    if (positionx!=targetmouse[0]) {
        plane.style.left=(positionx+(targetmouse[0]-positionx)*speed)+"px"
    }
    if (positiony!=targetmouse[1]) {
        plane.style.top=(positiony+(targetmouse[1]-positiony)*speed)+"px"
    }
    requestAnimationFrame(update)
}
requestAnimationFrame(update)

document.addEventListener("mousemove", (e)=>{mousex=e.x; mousey=e.y})