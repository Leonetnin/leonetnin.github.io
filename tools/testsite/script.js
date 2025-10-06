let framerate = null
let delta = 0;
let test=0
let fontSize=50
update = (delta) => {
    clear()
    button(" + ", W/2-12,H/2-25,function(){test+=1}, 0,0, "white", Math.abs(fontSize), null)
    text(test)
    if (pressed_keys.includes("ArrowLeft")){
        fontSize-=1
    }
    if (pressed_keys.includes("ArrowRight")){
        fontSize+=1
    }
}
