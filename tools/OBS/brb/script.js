let settings={"dvdspeed":3,"font":"Comic Sans MS","textsize":100,"":null}

class dvdText {
    constructor(text="DVD",x=W/2,y=H/2,vel={"speed":settings.dvdspeed,"direction":Math.random()*360},size=settings.textsize){
        this.text=text;
        this.x=x;
        this.y=y;
        this.vel=vel;
        this.size=size
    }
    draw(){
        if (this.x+this.size*1.75>W) {
            this.vel.direction=-this.vel.direction
            collision(this.x+this.size*1.75,this.y+this.size*0.4)
        }
        if (this.x<0) {
            this.vel.direction=-this.vel.direction
            collision(this.x,this.y+this.size*0.4-17)
        }
        if (this.y<0){
            this.vel.direction=180-this.vel.direction
            collision(this.x+this.size*1.75/2,this.y)
        }
        if (this.y+this.size*0.8>H){
            this.vel.direction=180-this.vel.direction
            collision(this.x+this.size*1.75/2,this.y+this.size*0.4+30)
        }
        this.x+=this.vel.speed*Math.sin(toRadians(this.vel.direction))
        this.y+=this.vel.speed*Math.cos(toRadians(this.vel.direction))
        text(this.text,this.x-this.size/10,this.y+this.size*0.76,null,"white",this.size+"px "+settings.font,"left")
    }
}

canvas.style.backgroundColor="black"
let things=[]
let particles=[]
let lifetime;
things.push(new dvdText("BRB"))
things.push(new dvdText("AFK"))
update = (delta) => {
    clear()
    lifetime=1000/delta*2
    for (let i=0; i<things.length;i++){
        things[i].draw()
    }
    for (let i=0; i<particles.length;i++){
        particles[i][0]+=particles[i][2]-(lifetime-particles[i][4])/lifetime*particles[i][2]*(particles[i][6])
        particles[i][1]+=particles[i][3]-(lifetime-particles[i][4])/lifetime*particles[i][3]*(particles[i][6])
        if (particles[i][4]<2){
            particles.splice(i,1)
        } else {
            particles[i][4]-=1
            let poop=255-((lifetime-particles[i][4])/lifetime)*255
            rectangle(particles[i][0],particles[i][1],particles[i][4]/particles[i][5],particles[i][4]/particles[i][5],rgb(poop,poop,poop),particles[i][6]*360+(lifetime-particles[i][4])*(1+particles[i][6]))
        }
    }
    //rectangle(x,y,size*1.75,size*0.8,"gray") --THIS IS THE HITBOX
    //text("BRB",x-size/10,y+size*0.76,null,"white",size+"px Comic Sans MS","left")
}
function collision(x,y){
    for (let i=0; i<250;i++){
        let speed=(Math.random()-0.5)*2
        let direction=Math.random()*360
        particles.push([x,y,speed*Math.sin(direction),speed*Math.cos(direction),lifetime,Math.random()*70+40,Math.random()])
    }
    // things.push(new dvdText("BRB"))
    // things.splice(0,1)
}