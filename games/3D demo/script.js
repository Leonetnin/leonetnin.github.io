let canvas = document.getElementById("3Dcanvas")
let ctx = canvas.getContext("2d")

let width;
let height;

let projectionCenterX;
let projectionCenterY;

onResize()

function onResize() {
    width = window.innerWidth
    height = window.innerHeight

    canvas.width = width
    canvas.height = height

    projectionCenterX = width / 2
    projectionCenterY = height / 2
}

document.addEventListener("resize", onResize)

ctx.fillStyle = "black"

for (let i=0; i<100; i++){
    
}