let hole = {x: 0, y:0}
let time=0
let rays=[]
for (let i=0; i<1; i++){
    rays.push({x:0,y:0, velocity:{x:0,y:0}})
}
update = () => {
    time+=1
    clear()
    circle(W/2+hole.x,H/2+hole.y,50,"white")
    hole.x += (mouse.x-hole.x-W/2)/10
    hole.y += (mouse.y-hole.y-H/2)/10
    for (let i=0; i<rays.length; i++){
        if (Math.abs(rays[i].x-hole.x)<10){
            rays[i].velocity.x+=1
        }
        //rays[i].velocity.y+=100/(rays[i].y-hole.y)
        //apply velocity
        rays[i].x+=rays[i].velocity.x
        rays[i].y+=rays[i].velocity.y
        circle(rays[i].x+W/2,rays[i].y+H/2,10,"white")
    }
    
}