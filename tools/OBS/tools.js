function dvdStandradSettings(){
    return {"text":"DVD","size":100,"x":W/2,"y":H/2,"vel":{"speed":1,"direction":Math.random()*360},"font":"Comic Sans MS","textsize":100,"includeDescent":false,"showHitboxes":false,"textColor":"white"}
}
    class dvdText {
    constructor(settings=dvdStandradSettings()){
        this.settings=dvdStandradSettings()
        if (settings!=dvdStandradSettings()) {
            for (let i=0; i<Object.keys(settings).length; i++){
                this.settings[Object.keys(settings)[i]]=settings[Object.keys(settings)[i]]
            }
        }
    }
    draw(delta){
        let displayedText = text(this.settings.text,this.settings.x,this.settings.y,null,this.settings.textColor,this.settings.size+"px "+this.settings.font,"left")
        if (this.settings.x+displayedText.width>W) {
            this.settings.vel.direction=-this.settings.vel.direction
            collision(this.settings.x+displayedText.width,this.settings.y-displayedText.height.ascent,0,displayedText.height.ascent+displayedText.height.descent)
        }
        if (this.settings.x<0) {
            this.settings.vel.direction=-this.settings.vel.direction
            collision(this.settings.x,this.settings.y-displayedText.height.ascent,0,displayedText.height.ascent+displayedText.height.descent)
        }
        if (this.settings.y-displayedText.height.ascent<0){
            this.settings.vel.direction=180-this.settings.vel.direction
            collision(this.settings.x,this.settings.y-displayedText.height.ascent,displayedText.width,0)
        }
        if (this.settings.y+displayedText.height.descent*this.settings.includeDescent>H){
            this.settings.vel.direction=180-this.settings.vel.direction
            collision(this.settings.x,this.settings.y+displayedText.height.descent*this.settings.includeDescent,displayedText.width,0)
        }
        this.settings.x+=this.settings.vel.speed*Math.sin(toRadians(this.settings.vel.direction))*delta
        this.settings.y+=this.settings.vel.speed*Math.cos(toRadians(this.settings.vel.direction))*delta
        if (this.settings.showHitboxes){
            rectangle(this.settings.x,this.settings.y-displayedText.height.ascent,displayedText.width,displayedText.height.ascent+displayedText.height.descent*this.settings.includeDescent,"rgba(0,0,255,0.5)")
        }
    }
}
let lifetime;
let particles=[]
let particleSettings={}
function drawParticles(delta){
    lifetime=1000/delta*2
    for (let i=0; i<particles.length;i++){
        particles[i][0]+=(particles[i][2]-(lifetime-particles[i][4])/lifetime*particles[i][2]*(particles[i][6]))*delta
        particles[i][1]+=(particles[i][3]-(lifetime-particles[i][4])/lifetime*particles[i][3]*(particles[i][6]))*delta
        if (particles[i][4]<2){
            particles.splice(i,1)
        } else {
            particles[i][4]-=1
            let poop=255-((lifetime-particles[i][4])/lifetime)*255
            rectangle(particles[i][0],particles[i][1],particles[i][4]/particles[i][5],particles[i][4]/particles[i][5],rgb(poop,poop,poop),particles[i][6]*360+(lifetime-particles[i][4])*(1+particles[i][6]))
        }
    }
}

const orientations = ["left","bottom","right","top"]
function collision(x,y,sideX,sideY){
    let collisionOrientation = (sideY==0)?(y>H/2?(1):(3)):(x>W/2?(2):(0))
    let particlesPerPixel=1
    let particleAmount=Math.max(sideX,sideY)*particlesPerPixel
    for (let i=0; i<particleAmount;i++){
        let speed=Math.random()*0.15
        let direction=Math.random()*180+90*collisionOrientation
        particles.push([x+sideX*i/particleAmount,y+sideY*i/particleAmount,speed*Math.sin(toRadians(direction)),speed*Math.cos(toRadians(direction)),lifetime,Math.random()*70+40,Math.random()])
    }
}