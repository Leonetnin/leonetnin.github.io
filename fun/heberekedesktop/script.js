canvas.style.backgroundColor=rgb(144, 207, 255)

let spriteSheet = new Spritesheet("textures/Character.png",22,5);
let heberekeVelocity = {"x":0, "y":0,"xMax":1,"yMax":1,"xAcceleration":0.5}
let heberekePosition = {"x":0, "y":0}
let friction=1.04
let gravity=1
let onGround=false
let animation="idle"
let animationFrame=0
let animations={"idle":[1],"walking":[4,5,4,3,6,2,6,3],"falling":[9]}
let direction=1
let worldFloor=H

//Self moving stuff
let action;

update = () => {
    clear()
    //Left/Right Movement
    if (pressed_keys.includes("ArrowRight")){
        direction=1
        if (heberekeVelocity.x<0){
            heberekeVelocity.x/=friction
        }
        heberekeVelocity.x+=heberekeVelocity.xAcceleration/100
        heberekeVelocity.x = clamp(heberekeVelocity.x,-1,1)
    } else if (pressed_keys.includes("ArrowLeft")){
        direction=-1
        if (heberekeVelocity.x>0){
            heberekeVelocity.x/=friction
        }
        heberekeVelocity.x-=heberekeVelocity.xAcceleration/100
        heberekeVelocity.x = clamp(heberekeVelocity.x,-1,1)
    } else {
        heberekeVelocity.x=heberekeVelocity.x/friction
        if (Math.abs(heberekeVelocity.x)<heberekeVelocity.xAcceleration/10){
            heberekeVelocity.x=0
        }
    }

    
    //Gravity
    if (heberekePosition.y+spriteSheet.getDimensions().height<worldFloor){
        heberekeVelocity.y+=gravity/30
        
    } else{
        onGround=true
        heberekePosition.y=worldFloor-spriteSheet.getDimensions().height
        heberekeVelocity.y=0
    }

    //Collision Detection
    
    
    //Jumping
    if (pressed_keys.includes("ArrowUp") && onGround){
        heberekeVelocity.y=-1.5
        onGround=false
    }
    //Apply velocities
    heberekePosition.x+=heberekeVelocity.x
    heberekePosition.y+=heberekeVelocity.y

    //TEMPORARY TELEPORT
    if (heberekePosition.x>W){
        heberekePosition.x=0-spriteSheet.getDimensions().width
    } else if (heberekePosition.x<-spriteSheet.getDimensions().width){
        heberekePosition.x=W
    }
    //TEMP END

    //Animation --This section needs work, highly unoptimized and kind of bad lmao (very repeated)
    if (onGround){
        if (heberekeVelocity.x==0){
            animate("idle")
        } else {
            animate("walking",Math.abs(heberekeVelocity.x)/10)
        }
    } else {
        animate("falling")
    }

    //Drawing sprite
    spriteSheet.draw(animations[animation][Math.round(animationFrame)],1,Math.round(heberekePosition.x),heberekePosition.y,32,direction)
}

function animate(set,speed=1){
    if (animation!=set){
        animationFrame=0
        animation=set
    } else {
        if (animationFrame>=animations[animation].length-1){
            animationFrame=0
        } else if (animations[animation].length!=1){
            animationFrame+=speed
        }
    }
}

//always row 1
/*
animation walking (column)
-4
-5
-4
-3
-6
-2
-6
-3

(antar jag, inte confirmed) vänd:
-11
-6
-3

stopp:
-saktar ner animationen längs med att velocity => 0
-1

tvärvänd:
-7
**-IBLAND 1** (möjligtvis alltid, men att det bara sker just då man stannar och har 0 velocity)
-11
-6
-3
*/