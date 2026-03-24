let searchparams = new URLSearchParams(window.location.search)
if (searchparams.has("dev")){
    const element = document.createElement("div")
    element.id = "dev"
    element.innerHTML="<label>Dev Console</label><textarea id='console' readonly></textarea><input id='consoleinput' onkeypress='function key(e){if(e.key==`Enter`){document.getElementById(`console`).innerText += document.getElementById(`consoleinput`).value; eval(document.getElementById(`consoleinput`).value)}}; key(event)'>"
    document.body.appendChild(element)
}

let canvas = document.getElementById("_canvas")
canvas.width = 240
canvas.height = 160
const ctx = canvas.getContext("2d")
ctx.imageSmoothingEnabled = false

let pressedKeys = []

let cameraoffset = {x:canvas.width/2-8, y:canvas.height/2-8}

// class Spritesheet{
//     constructor(texture, columns, rows){
//         this.texture = new Image()
//         this.texture.src=texture
//         this.columns=columns
//         this.rows=rows
//     }
//     draw(column,row,x,y,scale,direction){
//         let spriteWidth=this.texture.width/this.columns
//         let spriteHeight=this.texture.height/this.rows
//         ctx.drawImage(this.texture, spriteWidth*(column-1), spriteHeight*(row-1), spriteWidth, spriteHeight, x, y, spriteWidth, spriteHeight)
//         ctx.resetTransform()
//     }

//     getDimensions(){
//         return {"width":this.texture.width/this.columns,"height":this.texture.height/this.rows}
//     }
// }

class Spritesheet{
    constructor(texture, tilewidth, tileheight=tilewidth, marginx=0, marginy=marginx){
        this.texture = new Image()
        this.texture.src=texture
        this.tilewidth=tilewidth
        this.tileheight=tileheight
        this.marginx = marginx
        this.marginy = marginy
    }
    draw(column,row,x,y,scale,direction){
        let spriteWidth=this.tilewidth
        let spriteHeight=this.tileheight
        ctx.drawImage(this.texture, spriteWidth*(column-1), spriteHeight*(row-1), spriteWidth, spriteHeight, Math.round(x), Math.round(y), spriteWidth, spriteHeight)
        ctx.resetTransform()
    }

    getDimensions(){
        return {"width":this.texture.width/this.columns,"height":this.texture.height/this.rows}
    }
}

//MAIN
//Textures

let icon = new Image()
icon.src="assets/textures/icon.png"

//Init
let playerPos = {x:100, y:130}
let camera = {x:0, y:0}

let lasttime = 0

let tiles = []

let t=0

update = () => {
    let delta = Date.now()-lasttime
    ctx.clearRect(0,0,canvas.width,canvas.height)

    t+=0.1
    if (t>=20){
        t=0
    }

    for (let i=-2; i<(canvas.width+canvas.height)/(Math.sqrt(2)*10); i++) {
        ctx.rotate(toRadians(45))
        //ctx.fillStyle=i%2==0?"rgb(240, 233, 217)":"rgb(216, 70, 70)"
        ctx.fillStyle=i%2==0?"rgb(240, 233, 217)":"rgb(216, 70, 70)"
        ctx.fillRect(i*10+t,i*-10-10-t,10,canvas.height*Math.sqrt(2)+10)
        ctx.resetTransform()
    }
    ctx.drawImage(icon, Math.round((canvas.width-icon.width)/2), Math.round((canvas.height-icon.height)/2))

    lasttime = Date.now()
    mouse.click=false
    requestAnimationFrame(update)
}
requestAnimationFrame(update)

window.onkeydown = (e) => {
    if (!pressedKeys.includes(e.key)){
        pressedKeys.push(e.key)
    }
}

window.onkeyup = (e) => {
    pressedKeys.splice(pressedKeys.indexOf(e.key),1)
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

//Extra funcs

function toRadians(degrees) {
    return degrees * Math.PI/180
}

function toDegrees(radians) {
    return radians / (Math.PI/180)
}