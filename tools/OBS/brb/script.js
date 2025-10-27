canvas.style.backgroundColor="black"
let width=200
let x=W/2
let y=H/2
let size=100
let vel={"x":2,"y":2}
update = () => {
    clear()
    //rectangle(x,y,size*1.75,size*0.8,"gray") --THIS IS THE HITBOX
    text("BRB",x-size/10,y+size*0.76,null,"white",size+"px Comic Sans MS","left")
    x+=vel.x
    y+=vel.y
    if (x+size*1.75>W) {
        vel.x=-Math.abs(vel.x)
    }
    if (x<0) {
        vel.x=Math.abs(vel.x)
    }
    if (y+size*0.8>H) {
        vel.y=-Math.abs(vel.y)
    }
    if (y<0) {
        vel.y=Math.abs(vel.y)
    }
}