let points = []
let projectionCenter = {x:W/2,y:H/2}
points.push({x:-50,y:-50,z:0,connections:[2,3,4]})
points.push({x:50,y:50,z:0,connections:[2,3,6]})
points.push({x:50,y:-50,z:0,connections:[5]})
points.push({x:-50,y:50,z:0,connections:[7]})

points.push({x:-50,y:-50,z:100,connections:[5,7]})
points.push({x:50,y:-50,z:100,connections:[]})
points.push({x:50,y:50,z:100,connections:[5,7]})
points.push({x:-50,y:50,z:100,connections:[]})

let camera = {x:0,y:0,z:-200}
let focal=1000

update = () => {
    clear()
    if (pressed_keys.includes("a")){
        camera.x-=10
    }
    if (pressed_keys.includes("d")){
        camera.x+=10
    }
    if (pressed_keys.includes("e")){
        camera.y-=10
    }
    if (pressed_keys.includes("q")){
        camera.y+=10
    }
    if (pressed_keys.includes("w")){
        camera.z+=1
    }
    if (pressed_keys.includes("s")){
        camera.z-=1
    }
    for (let i=0; i<points.length; i++){
        //(points[i].x-camera.x)*focal/(points[i].z-camera.z)+projectionCenter.x
        let projection=calculateProjection(points[i])
        for (let j=0; j<points[i].connections.length;j++){
            let testProjection=calculateProjection(points[points[i].connections[j]])
            line(projection.x,projection.y,testProjection.x,testProjection.y)
        }
        // if (points[i].z>camera.z){
        //     circle(projection.x,projection.y,10)
        // }
    }
    text(Object.values(camera))
}

function calculateProjection(point){
    return {x:(point.x-camera.x)*focal/(point.z-camera.z)+projectionCenter.x, y:(point.y-camera.y)*focal/(point.z-camera.z)+projectionCenter.y}
}