let red = document.getElementById("red")
let img = document.getElementsByTagName("img")[0]
let imgpos = img.getBoundingClientRect()
let selected = 1
document.addEventListener("mousemove", mouse)
document.addEventListener("mousedown", mouse)
document.addEventListener("mouseup", mouse)

document.addEventListener("keydown", key)

function key(e) {
    selected=e.key
}

function mouse(e) {
    switch (e.type) {
        case "mousemove":
            red.style.left=(e.x-7.5)+"px"
            red.style.top=(e.y-7.5)+"px"
            polygon[selected]=[(e.x-imgpos.left)/img.width*100,(e.y-imgpos.top)/img.height*100]
            img.style="clip-path: "+polygize(polygon)
        case "mouseup":
            polygon.push([0, 0])
    }
}


function polygize(input) {
    if (input.length==0) {
        return ""
    }
    let loopResult="polygon("
    for(let i=0; i<input.length; i++){
        if (i!=0){
            loopResult+=","
        }
        loopResult+= input[i][0]+"% "+input[i][1]+"%"
    }
    loopResult+=");"
    return loopResult
}
let polygon = []