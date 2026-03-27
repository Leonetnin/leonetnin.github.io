let canvas = document.getElementById("_canvas")
const ctx = canvas.getContext("2d")
ctx.imageSmoothingEnabled = false
let W = canvas.width

let pressedKeys = []

let cameraoffset = {x:canvas.width/2-8, y:canvas.height/2-8}

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
let animations = {
    walking: [1,2,3,2]
}

//Textures

let maps = {
    "home":"textures/insides/playerhome.png",
    "room":"textures/insides/playerroom.png",
    "oaklab":"textures/insides/oaklab.png",
    "pallet":"textures/maps/pallettown.png"
}

let map = new Image()
map.src=maps.oaklab
let player = new Spritesheet("textures/player/male.png",16,20)
let trees = new Spritesheet("textures/tilesheets/trees.png", 16, 16, 1)

//Init
let playerPos = {x:100, y:130}
let camera = {x:0, y:0}

let lasttime = 0

let tiles = []

update = () => {
    let delta = Date.now()-lasttime
    ctx.clearRect(0,0,canvas.width,canvas.height)

    let rect = canvas.getBoundingClientRect()
    let relativemouse = {x:(mouse.x-rect.left)/3, y:(mouse.y-rect.top)/3}

    camera.x = playerPos.x-cameraoffset.x
    camera.y = playerPos.y-cameraoffset.y
    ctx.drawImage(map, -camera.x, -camera.y)

    player.draw(animations.walking[Math.floor(animationFrameFloat)], Math.floor(playerDirection), Math.round(playerPos.x-camera.x),Math.round(playerPos.y-camera.y))
    movement(delta)

    //Draw UI
    ctx.font = "10px Verdana"
    ctx.fillStyle="white"
    ctx.fillText(tiles,10,10)

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

//Speed in px/s
const speed = 60
let moving = false
let animationFrameFloat = 1

let playerDirection = 1

function movement(delta) {
    const boost = (pressedKeys.includes(" ")?2:1)
    let moves = [pressedKeys.indexOf("w"), pressedKeys.indexOf("a"), pressedKeys.indexOf("s"), pressedKeys.indexOf("d")]
    switch (pressedKeys[(Math.max(...moves))]) {
        case "w":
            playerPos.y-=speed/1000*delta*boost
            playerDirection = 2
            break
        case "a":
            playerPos.x-=speed/1000*delta*boost
            playerDirection = 3
            break
        case "s":
            playerPos.y+=speed/1000*delta*boost
            playerDirection = 1
            break
        case "d":
            playerPos.x+=speed/1000*delta*boost
            playerDirection = 4
            break
        default:
            animationFrameFloat=1
            return null
    }
    collide()
    animationFrameFloat=(animationFrameFloat+speed/8000*delta*boost)%4
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