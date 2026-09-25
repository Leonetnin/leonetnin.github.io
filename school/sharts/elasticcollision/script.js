let balls = []
balls.push({x:0,y:100,vx:10,vy:0,r:10})
balls.push({x:50,y:100,vx:0,vy:0,r:10})

update = (delta) => {
    clear()
    for (let i=0; i<balls.length; i++) {
        balls[i].x+=balls[i].vx*delta/1000
        balls[i].y+=balls[i].vy*delta/1000
        circle(balls[i].x,balls[i].y,balls[i].r)
    }
    for (let i=0; i<balls.length; i++) {
        for (let j=0; j<balls.length; j++) {
            let n = Math.sqrt((balls[i].x-balls[j].x)**2+(balls[i].y-balls[j].y)**2)
            if (i!=j && n<balls[i].r+balls[j].r){
                let normalV = [(balls[i].x-balls[j].x)/n,(balls[i].y-balls[j].y)/n]
                let tanV = [-normalV[1],normalV[0]]
    
                let ATan = balls[i].x*tanV[0]+balls[i].y*tanV[1]
                let ANormal = balls[i].x*normalV[0]+balls[i].y*normalV[1]
    
                let vA= [tanV[0]*ATan,tanV[1]*ATan]
                let vB= [normalV[0]*ANormal,normalV[1]*ANormal]
    
                balls[i].vx=vA[0]
                balls[i].vy=vA[1]
                balls[j].vx=vB[0]
                balls[j].vy=vB[1]
                //ANORMAL: balls[i].x*normalV[0]+balls[i].y*normalV[1]
                
            }
    
        }
    }
}

