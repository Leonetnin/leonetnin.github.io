let ericimage = new Image()
ericimage.src="/Random/eric-krausser.png"
let pasctexture=new Sprite(0,0, ericimage,300,300)
let pascimage = new Image()
pascimage.src="/Random/pasc.png"
let pascalc= new Sprite(0,0,pascimage,200,300)
let dx=0
let dy=0 
let pdx=0
let pdy=0
let width= 250
let height = 250
let holding=0;

update = (delta) => {
    clear()
    ericalc()
    pascalculate()
}

function pascalculate(){
    if (mouseAABB(pascalc) && mouse.button==0 && holding==0){
        holding=2
        pascalc.draw()
        return null;
    }
    if (holding==2){
        pascalc.x=mouse.x-pascalc.width/2
        pascalc.y=mouse.y-pascalc.height/2
        pascalc.draw()
        if (mouse.button==-1){
            holding=0
            pdx=mouse.velocity.x
            pdy=mouse.velocity.y
        }
        return null;
    }
    pascalc.x+=pdx
    pascalc.y+=pdy
    if (pascalc.x+pascalc.width>W){
        pdx=-Math.abs(pdx)*0.9
    }
    if (pascalc.x<0){
        pdx=Math.abs(pdx)*0.9
    }
    if (pascalc.y+pascalc.height>H){
        pdy=Math.round((-Math.abs(pdy)*0.9)*10)/10
    } else if (pascalc.y+pascalc.height+0.1<H){
        pdy+=1
    } 
    pdx*=0.994   
    pascalc.draw()
}

function ericalc(){
    if (mouseAABB(pasctexture) && mouse.button==0 && holding==0){
        holding=1
        pasctexture.draw()
        return null;
    }
    if (holding==1){
        pasctexture.x=mouse.x-pasctexture.width/2
        pasctexture.y=mouse.y-pasctexture.height/2
        pasctexture.draw()
        if (mouse.button==-1){
            holding=0
            dx=mouse.velocity.x
            dy=mouse.velocity.y
        }
        return null;
    }
    pasctexture.x+=dx
    pasctexture.y+=dy
    if (pasctexture.x+pasctexture.width>W){
        dx=-Math.abs(dx)*0.9
    }
    if (pasctexture.x<0){
        dx=Math.abs(dx)*0.9
    }
    if (pasctexture.y+pasctexture.height>H){
        dy=Math.round((-Math.abs(dy)*0.9)*10)/10
    } else if (pasctexture.y+pasctexture.height+0.1<H){
        dy+=1
    }
    if (justPressed(" ")){
        dy=-20
    }
    dx*=0.994   
    pasctexture.draw()
}
