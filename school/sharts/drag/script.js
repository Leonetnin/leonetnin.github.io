let drags = [].slice.call(document.getElementsByClassName("drag"))
let dragTarget = []
let follow = -1
let mousex, mousey = 0
let targetmouse = [window.innerWidth/2,window.innerHeight/2]

let speed = 0.15
for (let i=0; i<drags.length; i++) {
    let style =window.getComputedStyle(drags[i])
    drags[i].onmousedown = () => {follow=i}
    dragTarget[i]=[pxToInt(style.getPropertyValue('left')),pxToInt(style.getPropertyValue('top'))]
}
window.onmouseup = () => {follow=-1}

function update() {
    if (follow!=-1) {
        dragTarget[follow]=[mousex-drags[follow].offsetWidth/2,mousey-drags[follow].offsetHeight/2]
        console.log(drags[follow].offsetWidth)
    }
    for (let i=0; i<drags.length; i++) {
        let positionx = pxToInt(drags[i].style.left)
        let positiony = pxToInt(drags[i].style.top)
        if (positionx!=targetmouse[0]) {
            drags[i].style.left=(positionx+(dragTarget[i][0]-positionx)*speed)+"px"
        }
        if (positiony!=targetmouse[1]) {
            drags[i].style.top=(positiony+(dragTarget[i][1]-positiony)*speed)+"px"
        }
    }
    requestAnimationFrame(update)
}
requestAnimationFrame(update)

document.addEventListener("mousemove", (e)=>{mousex=e.x; mousey=e.y})

function pxToInt(input) {
    return +input.split("px")[0]
}