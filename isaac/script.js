let canvas = document.getElementsByTagName("canvas")[0];
let ctx = canvas.getContext("2d")
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let lines = []
// for (let i=0; i<100; i++){
//     lines.push([Math.random()*canvas.width,0])
// }
let texts = ["Isaac", "18 år", "GRATTIS",]
let titleRot = 0
let started = false
let drapperi = 0
let video = document.getElementsByTagName("video")[0]

update = () => {
    titleRot+=0.05
    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.fillStyle="white"
    ctx.font="60px comic sans ms"
    ctx.translate(canvas.width/2, 100)
    ctx.rotate(Math.sin(titleRot)/6)
    ctx.shadowColor="black"
    ctx.shadowOffsetX=5
    ctx.shadowOffsetY=5
    ctx.fillText("ISAAC 18 ÅR!",-ctx.measureText("ISAAC 18 ÅR!").width/2,0)
    ctx.font="30px comic sans ms"
    ctx.fillText("お誕生日おめでとう",-ctx.measureText("お誕生日おめでとう").width/2,50)
    ctx.resetTransform()
    if (mouse.down) {
        lines.push([mouse.x,mouse.y,(Math.random()-0.5)*5,(Math.random()-0.5)*5,texts[Math.floor(Math.random()*texts.length)],"rgb("+Math.random()*255+","+Math.random()*255+","+Math.random()*255+")"])
    }
    for (let i=0; i<lines.length; i++){
        ctx.fillStyle=lines[i][5]
        ctx.font="19px comic sans ms"
        ctx.fillText(lines[i][4],lines[i][0],lines[i][1])
        lines[i][2]+=0.1
        lines[i][1]+=lines[i][2]
        lines[i][0]+=lines[i][3]
        if (lines[i][1]>canvas.height) {
            // lines[i][1]=0
            lines.splice(i,1)
        }
    }
    if (started) {
        ctx.fillStyle="black"
        ctx.shadowColor="transparent"
        ctx.beginPath()
        ctx.arc(canvas.width/2,canvas.height/2,drapperi*(drapperi/Math.abs(drapperi)+1)/2,0,Math.PI*2)
        ctx.rect(canvas.width,0,-canvas.width,canvas.height)
        ctx.closePath()
        ctx.fill()
        // ctx.fillRect(0,0,canvas.width,drapperi)
        drapperi-=10
        if (drapperi<0) {
            video.classList.add("show")
        }
    }
    requestAnimationFrame(update)
}
requestAnimationFrame(update)

let playSFX = new Audio('play.mp3')
function start() {
    playSFX.play()
    started = true
    drapperi=Math.sqrt((canvas.width/2)**2+(canvas.height/2)**2)
    document.getElementById("butt").disabled=true
}

document.addEventListener("mousedown", _mouse)
document.addEventListener("mousemove", _mouse)
document.addEventListener("mouseup", _mouse)

const mouse = {
    x:0,
    y:0,
    down: false,
    click:false
}
function _mouse(e) {
    switch (e.type) {
        case "mousedown":
            mouse.down = true
            mouse.click = true
            break;
        case "mouseup":
            mouse.down = false
            break;
        case "mousemove":
            mouse.x = e.x
            mouse.y = e.y
            break;
    }
}

document.addEventListener("animationend", (e)=>{
    if (e.animationName=="shows") {
        video.play()
    }
})

video.addEventListener("ended", (e)=>{
    location.href="https://www.urbandictionary.com/define.php?term=Unc%20Status"
})