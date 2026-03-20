let canvas = document.getElementById("_canvas")
const ctx = canvas.getContext("2d")
ctx.imageSmoothingEnabled = false
let W = window.innerWidth

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
        ctx.scale(direction,1)
        ctx.drawImage(this.texture,spriteWidth*(column-1),spriteHeight*(row-1),spriteWidth,spriteHeight,x*direction-((W-scale)/2)*(direction-1),y,scale,scale)
        ctx.resetTransform()
    }

    getDimensions(){
        return {"width":this.texture.width/this.columns,"height":this.texture.height/this.rows}
    }
}

//MAIN

let player = new Spritesheet("textures/player/male.png",8,4)

update = () => {
    player.draw(1,1,0,0,16,1)
    requestAnimationFrame(update)
}
requestAnimationFrame(update)
