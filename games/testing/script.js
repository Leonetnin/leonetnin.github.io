const canvas = document.getElementById("_canvas")
let ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let t=0

const img = ctx.createImageData(canvas.width, canvas.height)

let time = 0

function loop() {
    let date = new Date
    ctx.clearRect(0,0,canvas.width,canvas.height)
    draw()
    text(1000/(date.getTime()-time))
    time=date.getTime()
    requestAnimationFrame(loop)
}
requestAnimationFrame(loop)

function draw(){
    for (let i=0; i<img.data.length; i+=4) {
        const _x = i/4%canvas.width
        const _y = Math.floor(i/4/canvas.height)
        let _rgb = ((_x+_y)%2)?[255,0,0,255]:[0,0,255,255]
        img.data[i+0] = _rgb[0]
        img.data[i+1] = _rgb[1]
        img.data[i+2] = _rgb[2]
        img.data[i+3] = _rgb[3]
    }
    ctx.putImageData(img, 0, 0)
}

function text(input) {
    ctx.fillStyle="black"
    ctx.font="40px verdana"
    ctx.fillText(input,100,100)
}

                                   