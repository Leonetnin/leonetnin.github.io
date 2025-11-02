canvas.style.backgroundColor="rgba(36, 35, 44, 1)"

let playerX=0
let playerY=0
let velocity=0
let velocityX=0
let velocityY=0
let speed=2
let playerRotation=0
let keyDirections={"w":0,"a":270,"s":180,"d":90}
let direction=0;
let portalProperties = {"width":100,"xa":-200,"xb":200}

update = () => {
    clear()
    //Movement
    let movementPresses=pressingKeys(["w","a","s","d"])
    if (movementPresses.length>0){
        let totalDirection=0;
        for (let i=0; i<movementPresses.length;i++){
            totalDirection+=keyDirections[movementPresses[i]]
        }
        direction=totalDirection/movementPresses.length
        velocity=speed
    } else {
        velocity=0
        direction=0
    }
    
    if (pressed_keys.includes("ArrowRight")) {
        playerRotation+=1
    }
    if (pressed_keys.includes("ArrowLeft")) {
        playerRotation-=1
    }

    //Applying velocities
    velocityX=velocity*Math.sin(toRadians(playerRotation+direction))
    velocityY=velocity*Math.cos(toRadians(playerRotation+direction))
    
    playerX+=velocityX
    playerY-=velocityY

    //Drawing player
    shape(playerX,playerY,_triangleShape,"rgba(177, 30, 30, 1)",0,"black",playerRotation)

    //Casting rays
    line(playerX,playerY,W,H)

    //Drawing other camera
    //shape(100,100,_triangleShape,"rgba(30, 45, 177, 1)",null,"black",playerRotation)

    //Drawing portals
    //rectangle(W/2-portalProperties.width/2+portalProperties.xa,H/2,100,10,"black")
    //rectangle(W/2-portalProperties.width/2+portalProperties.xb,H/2,100,10,"black")

}

function firstOccuring(a,b,array){
    return (array.indexOf(a)+array.indexOf(b)==-2)?(null):(array.indexOf(a)>array.indexOf(b)?(a):(b))
}

function pressingKeys(keys){
    let result=[]
    for (let i=0; i<keys.length;i++){
        if (pressed_keys.includes(keys[i])){
            result.push(keys[i])
        }
    }
    return result
}