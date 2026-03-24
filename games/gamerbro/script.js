let player = {
    position: { x: 0, y: 0},
    velocity: { x: 0, y: 0}
}

let obstacles = []

obstacles.push({x: 0, y: 200, width: 500, height: 50})

update = () => {
    clear()
    rectangle(player.position.x,player.position.y,100,100,"white",undefined,undefined,0,true)
    handleMovement()
    //Gravity
    player.velocity.y+=1
    for (let i=0; i<obstacles.length; i++) {
        rectangle(obstacles[i].x, obstacles[i].y, obstacles[i].width, obstacles[i].height, "white", undefined, undefined, 0, true)
    }
}

function handleMovement() {
    // if (pressed_keys.includes("w")) {
    //     player.y -= 10
    // }
    // if (pressed_keys.includes("a")) {
    //     player.x -= 10
    // }
    // if (pressed_keys.includes("s")) {
    //     player.y += 10
    // }
    // if (pressed_keys.includes("d")) {
    //     player.x += 10
    // }
    player.position.x += player.velocity.x
    player.position.y += player.velocity.y
}