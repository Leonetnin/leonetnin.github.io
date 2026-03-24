let canvas = document.getElementById("_canvas")
const ctx = canvas.getContext("2d")
ctx.imageSmoothingEnabled = false
let W = canvas.width

let pressedKeys = []

let cameraoffset = {x:canvas.width/2-8, y:canvas.height/2-8}

class Spritesheet{
    constructor(texture, columns, rows){
        this.texture = new Image()
        this.texture.src=texture
        this.columns=columns
        this.rows=rows
    }
    draw(column,row,x,y,scale,direction){
        let spriteWidth=this.texture.width/this.columns
        let spriteHeight=this.texture.height/this.rows
        ctx.drawImage(this.texture, spriteWidth*(column-1), spriteHeight*(row-1), spriteWidth, spriteHeight, x, y, spriteWidth, spriteHeight)
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

let map = new Image()
map.src="textures/maps/pallettown.png"

let playerPos = {x:100, y:130}
let camera = {x:0, y:0}

let player = new Spritesheet("textures/player/male.png",3,4)
let lasttime = 0
update = () => {
    let delta = Date.now()-lasttime
    ctx.clearRect(0,0,canvas.width,canvas.height)
    camera.x = playerPos.x-cameraoffset.x
    camera.y = playerPos.y-cameraoffset.y
    ctx.drawImage(map, -camera.x, -camera.y)

    player.draw(animations.walking[Math.floor(animationFrameFloat)], Math.floor(playerDirection), Math.round(playerPos.x-camera.x),Math.round(playerPos.y-camera.y))
    movement(delta)

    lasttime = Date.now()
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
// for (let i=0; i<canvas.width; i++) {
//     for (let j=0; j<canvas.height; j++) {
//         ctx.fillStyle=(i+j)%2==1?"black":"white"
//         ctx.fillRect(i,j,1,1)
//     }
// }

function collide() {
    // if (playerPos.x<15){
    //     playerPos.x=15
    // }
    // if (playerPos.x>map.width-15){
    //     playerPos.x=map.width-15
    // }
    // if (playerPos.y<0){
    //     playerPos.y=0
    // }
    // if (playerPos.y>map.height-19){
    //     playerPos.y=map.height-19
    // }
}