let objects = ["gate", "start", "finish"]
let selectedObject="start"
let state = "edit"
let map = {"start":null,"finish":null,"gates":[]}
let player = {x:0,y:0,vx:0,vy:0}
let trail=[]
update = () => {
    clear()
    drawMap()
    switch (state){
        case "edit":
            button({text:"Done",x:W-110,y:10,bgColor:"white",focusColor:rgb(240,240,240),clickColor:rgb(220,220,220),width:100,execute:function(){state="play"; player.x=map.start.x;player.y=map.start.y}})
            text("Selected Object: "+selectedObject,10,30,24,"black","24px comic sans ms","left")
            if (mouseDistance(W-50,30)>100){
                if (selectedObject=="gate"){
                    circle(mouse.x,mouse.y,10,"rgba(0,0,0,0.5)")
                } else{
                    rectangle(mouse.x-50,mouse.y-5,100,10,"rgba(0,0,0,0.5)")
                }
                if (justPressed("1")){
                    selectedObject="start"
                }
                if (justPressed("2")){
                    selectedObject="gate"
                }
                if (justPressed("3")){
                    selectedObject="finish"
                }
                if (justClicked){
                    switch (selectedObject){
                        case "start":
                            map.start={x:mouse.x,y:mouse.y}
                            selectedObject="gate"
                            break;
                        case "finish":
                            map.finish={x:mouse.x,y:mouse.y}
                            break
                        case "gate":
                            map.gates.push({x:mouse.x,y:mouse.y,passed:false})
                            break
                        default:
                            alert("Error, non existent selected object")
                    }
                }
            }
            break;
        case"play":
            circle(player.x,player.y,10,"blue")
            trail.push([player.x,player.y])
            if (pressed_keys.includes("ArrowRight")){
                if (direction(player.vx)==-1){
                    player.vx/=1.4
                }
                player.vx+=1
            } else if (pressed_keys.includes("ArrowLeft")){
                if (direction(player.vx)==1){
                    player.vx/=1.4
                }
                player.vx-=1
            } else {
                player.vx/=1.2
            }
            player.vy+=0.02
            player.vx=clamp(player.vx,-10,10)
            player.x+=player.vx
            player.y+=player.vy
            for (let i=0;i<map.gates.length;i++){
                if (Math.sqrt((player.x-map.gates[i].x)**2+(player.y-map.gates[i].y)**2)<10){
                    state="crashed"
                }
                if (player.y>map.gates[i].y && !map.gates[i].passed){
                    if (player.x*(i%2*2-1)>map.gates[i].x*(i%2*2-1)){
                        state="wrong"
                    } else {
                        map.gates[i].passed=true
                    }
                }
            }
            if (player.y>map.finish.y){
                if (player.x>map.finish.x-50 && player.x<map.finish.x+50){
                    state="win"
                } else {
                    state="wrong"
                }
            }
            break;
        case "crashed":
            text("GAME OVER, YOU CRASHED",W/2,H/2,100)
            break;
        case "wrong":
            text("GAME OVER, OFFSIDE",W/2,H/2,100)
            break;
        case "win":
            text("YOU WON",W/2,H/2,100)
            break;
        default:
            alert("Ogiltigt state: "+state)
    }
}

function drawMap(){
    for (let i=0; i<trail.length;i++){
        circle(trail[i][0],trail[i][1],10,"rgb(200,200,200)")
    }
    if (map.start!=null){
        rectangle(map.start.x-50,map.start.y-5,100,10)
    }
    if (map.finish!=null){
        rectangle(map.finish.x-50,map.finish.y+5,100,10)
    }
    for (let i=0; i<map.gates.length;i++){
        circle(map.gates[i].x,map.gates[i].y,10)
    }
}