let hole = {x: 0, y:0}
let time=0
let rays=[]
for (let i=0; i<10; i++){
    rays.push({x:0,y:0, velocity:{x:0,y:0}})
}
update = () => {
    time+=1
    clear()
    for (let i=0; i<rays.length; i++){
        rays[i].x+=(mouse.x-rays[i].x-W/2)/10
        rays[i].y+=(mouse.y-rays[i].y-H/2)/10
        circle(rays[i].x+W/2,rays[i].y+H/2,10,"white")
    }
}