/*
---------------------------------
noel.js
version 0.1, alpha.
---------------------------------
Latest update: 2025-10-21, 11:30
---------------------------------*/

const canvas = document.createElement('canvas');
canvas.id = "_canvas";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);
let H = window.innerHeight;
let W = window.innerWidth;
let _terminalActivated = false;

let ctx = canvas.getContext("2d");

function toRadians(degrees) {
    return degrees * Math.PI/180
}

function toDegrees(radians) {
    return radians / (Math.PI/180)
}


let camera = {
    position: {x:0, y:0},
    rotation: 0,
    zoom: 1
}

function rectangle(x, y, width, height, color = "black", lineWidth=undefined, lineColor="white", rotation = 0, withcam = false, roundness=0) {
    ctx.fillStyle = color;
    ctx.translate(x+width/2,y+height/2);
    ctx.rotate(toRadians(rotation));
    if (roundness==0){
        if (withcam) {
            ctx.fillRect(-camera.position.x+W/2-width, -camera.position.y+H/2-height, width, height);
        }
        else {
            ctx.fillRect(-width/2, -height/2, width, height);
        }
    } else {
        ctx.beginPath();
        ctx.roundRect(-width/2, -height/2, width, height,roundness);
        ctx.closePath();
        ctx.fill();
    }
    if (lineWidth!==undefined){
        ctx.lineWidth=lineWidth
        ctx.strokeStyle=lineColor;
        ctx.strokeRect(-width/2,-height/2,width,height)
    }
    ctx.resetTransform();
}

function ellipse(x,y,radiusX,radiusY, color = "black", lineWidth, rotation = 5){
    ctx.beginPath()
    ctx.ellipse(x, y, radiusX, radiusY, rotation, 0, 2*Math.PI)
    if (lineWidth !== undefined) {
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = color;
        ctx.stroke()
    }
    else{
        ctx.fillStyle = color;
        ctx.fill()
    }
    ctx.closePath()
}

function circle(x, y, radius, color, lineWidth) {
    ellipse(x, y, radius, radius, color, lineWidth)
}

function line(x1,y1,x2,x3,color="black",width=2){
    ctx.beginPath()
    ctx.moveTo(x1,y1)
    ctx.lineTo(x2,x3)
    ctx.lineWidth=width;
    ctx.strokeStyle=color
    ctx.stroke();
    ctx.closePath()
}

function text(text, x=W/2, y=200, size = 24, color="black", font = size+"px Serif", align="center",width=10000, maxWidth=100000, fillOut=false) {
    ctx.fillStyle = color
    ctx.font = font
    ctx.textAlign=align
    // ctx.shadowOffsetX=1
    // ctx.shadowOffsetY=1
    // ctx.shadowColor="gray"
    let lines = (text+"").split("\n")
    for (let i=0; i<lines.length+1;i++){
        if(ctx.measureText(lines[i]).width>maxWidth && lines>1){
            let cutoffWidth = 0
            let choppedUpText = lines[i].split("")
            let j=choppedUpText.length-1;
            while (ctx.measureText(lines[i]).width-cutoffWidth>maxWidth){
                cutoffWidth+=ctx.measureText(choppedUpText[j]).width
                j-=1
            }
            choppedUpText[j]="\n"
            lines[i] = choppedUpText.join("")
            lines = lines.join("\n")
            lines = (lines+"").split("\n")
        }
    }
    for (let i=0; i<lines.length;i++){
        let spaceWidth = ctx.measureText(" ").width
        if (fillOut){
            let padding=repeatStr(" ",Math.floor((maxWidth-ctx.measureText(lines[i]).width)/spaceWidth/2))
            lines[i]=padding+lines[i]+padding
        }
        ctx.fillText(lines[i],x,y+(i)*(size)-(lines.length-1)*size/2, width)
    }
    ctx.shadowOffsetX=0
    ctx.shadowOffsetY=0
    let textMetrics = ctx.measureText(lines[0])
    //rectangle(x,y-textHeight+30,textMetrics.width,textHeight,"rgba(0,255,0,0.5)")
    return {"height":{"ascent":textMetrics.actualBoundingBoxAscent,"descent":textMetrics.actualBoundingBoxDescent},"width":textMetrics.actualBoundingBoxRight}
}

function repeatStr(stringInput, times){
    let result = ""
    for (let i=0; i<times;i++){
        result+=stringInput
    }
    return result
}

function clear(){
    ctx.clearRect(0,0,window.innerWidth,window.innerHeight)
}

function test(){
    ctx.beginPath();
    ctx.moveTo(60, 40);
    ctx.lineTo(180, 90);
    ctx.lineTo(130, 210);
    ctx.lineTo(10, 160);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

function foursided(x,y,[x1,y1,x2,y2,x3,y3,x4,y4],color,borderColor="black",borderWidth=0){
    ctx.fillStyle=color
    ctx.lineWidth=borderWidth
    ctx.strokeStyle=borderColor
    ctx.beginPath();
    ctx.moveTo(x1+x, y1+y);
    ctx.lineTo(x2+x, y2+y);
    ctx.lineTo(x3+x, y3+y);
    ctx.lineTo(x4+x, y4+y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

let _triangleShape = [0,50,50,50,25,0]

function shape(x,y,shape=_triangleShape,color="black", lineWidth=0, lineColor="white",rotation=0,withcam=false){
    let pointXY=[[],[]]
    for (let i=0; i<shape.length; i+=2){
        pointXY[0].push(shape[i])
        pointXY[1].push(shape[i+1])
    }
    ctx.lineWidth=lineWidth;
    let width=Math.max(...pointXY[0])-Math.min(...pointXY[0])
    let height=Math.max(...pointXY[1])-Math.min(...pointXY[1])
    ctx.translate(x+width/2,y+height/2);
    ctx.rotate(toRadians(rotation));
    ctx.strokeStyle=lineColor;
    ctx.fillStyle=color;
    ctx.beginPath();
    ctx.moveTo(shape[0]-width/2,shape[1]-height/2)
    for (let i=1; i<shape.length; i++){
        ctx.lineTo(shape[i*2]-width/2,shape[i*2+1]-height/2)
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    //circle at center
    //circle(0,0,2)
    ctx.resetTransform()
}

//name="Button", x=10, y=10,execute=function(){}, width, height, color="white", borderColor="black", textColor="black", size=24,padding,image=false
const buttonStandardStyle={"text":"Button", "textAlign":"center", "fontSize":24,"x":10,"y":10,"font":"24px Arial","execute":function(){alert("Clicked!")},"width":50,"height":50,"bgColor":"white","focusColor":"white","clickColor":"gray","borderWidth":5,"borderColor":"black","textColor":"black","size":24,"padding":5,"image":false}
function button(userData=buttonStandardStyle) {
    let data=buttonStandardStyle
    if (userData!=buttonStandardStyle){
        for (let i=0; i<Object.keys(userData).length; i++){
            data[Object.keys(userData)[i]]=userData[Object.keys(userData)[i]]
        }
    }
    if (mouseAABB(data.x,data.y+data.height,data.x+data.width,data.y)){
        if (mouse.button==0) {
            data.bgColor=data.clickColor
            if (justClicked){
                data.execute()
            }
        } else {
            data.bgColor=data.focusColor
        }
    }
    rectangle(data.x,data.y,data.width,data.height,data.bgColor,0,false,data.roundness)
    text(data.text,data.x+data.width/2,data.y+data.height/2+data.fontSize/2-4,data.fontSize,data.textColor,data.font,data.textAlign)
}
// if (image){
//     ctx.drawImage(name,x,y,width,height)
//     if (mouseAABB(x,y+height,x+width,y)){
//         if (justClicked) {
//             execute()
//         }
//     }
// } else {
//     text("",x+4,y+size+7,0,"black",size+"px Serif", "left")
//     padding = (padding==null)?(24):(padding)
//     width=(width==null)?(ctx.measureText(name).width+2*padding):(width+2*padding)
//     height=(height==null)?(size+padding*2):(height+2*padding)
//     borderColor=(borderColor==null)?("black"):(borderColor)
//     if (mouseAABB(x,y+height,x+width,y)){
//         if (justClicked) {
//             execute()
//         }
//     }
//     foursided(x,y,[0,0,0,height,width,height,width,0], color, borderColor,3)
//     //rectangle(x,y,width,height,color)
//     text(name,x+(width-ctx.measureText(name).width)/2,y+height/2+6+size/3-7.8,0,textColor,size+"px Serif", "left")
// }

let update = null;
let _delta = 0;
let _previousTimeStamp = 0
let justClicked=false
function _updateHandler(){
    _delta = document.timeline.currentTime - _previousTimeStamp
    _previousTimeStamp=document.timeline.currentTime
    update?.(_delta);
    justClicked=false
    requestAnimationFrame(_updateHandler);
}
_updateHandler()

function rgb(red, green, blue, alpha=0) {
    return "rgb("+red+","+green+","+blue+")"
}

const mouse = {
    get x() {return _mouseX},
    get y() {return _mouseY},
    get position() {return ({x: _mouseX, y:_mouseY})},
    get button() {return _mouseButton},
    get velocity() {return {x:_mouseVX,y:_mouseVY}}
}

function mouseAABB(Left, Bottom, Right, Top) {
    if (Left.x!=undefined){
        return (mouse.x>Left.x && mouse.x<Left.x+Left.width && mouse.y>Left.y && mouse.y<Left.y+Left.height)
    }
    return (mouse.x>Left && mouse.x<Right && mouse.y>Top && mouse.y<Bottom)
}

function mouseDistance(x,y){
    return Math.sqrt((_mouseX-x)**2+(_mouseY-y)**2)
}

let _mouseX = 0;
let _mouseY = 0;
let _mouseButton = -1;
let _mouseVX=0
let _mouseVY=0

function _mouse(data) {
    if (data.type == "mousemove") {
        _mouseX = data.x;
        _mouseY = data.y;
        _mouseVX=data.movementX;
        _mouseVY=data.movementY;
    }
    if (data.type == "mousedown") {
        _mouseButton = data.button;
        justClicked=true
    }
    if (data.type == "mouseup") {
        _mouseButton = -1;
    }
};

document.addEventListener("mousemove", _mouse)
document.addEventListener("mousedown", _mouse)
document.addEventListener("mouseup", _mouse)

let pressed_keys = []
let _justPressed = []

function _keyboard(data) {
    if (data.type == "keydown" && !pressed_keys.includes(data.key)) {
        pressed_keys.push(data.key)
        _justPressed.push(data.key)
    }
    if (data.type == "keyup") {
        pressed_keys.splice(pressed_keys.indexOf(data.key), 1)
    }
    if (pressed_keys.includes("Shift") && pressed_keys.includes("ArrowRight") && pressed_keys.includes("T") && _terminalActivated==false){
        terminal()
    }
}

function terminal(){
    if (_terminalActivated==false){
        _terminalActivated=true
        let _inputField = document.createElement("input")
        let _inputSend = document.createElement("button")
        _inputField.id="terminalInput"
        _inputSend.id="terminalSend"
        _inputSend.innerHTML=">"
        _inputSend.onclick=function () {eval(_inputField.value); _inputField.value=""}
        document.body.appendChild(_inputField)
        document.body.appendChild(_inputSend)
    }
    text("Terminal",W/2,50,48,"rgba(0, 0, 0, 0.5)")

    if (pressed_keys.includes("Escape")){
        _terminalActivated=false
        document.body.removeChild(document.getElementById("terminalInput"))
        document.body.removeChild(document.getElementById("terminalSend"))
    } else {
        requestAnimationFrame(terminal)
    }
}

function justPressed(key){
    if (_justPressed.includes(key)){
        _justPressed.splice(_justPressed.indexOf(key), 1)
        return true
    } else {
        return false
    }
}

function keybinds(binds) {
    let bindsum = ""
    for (let i = 0; i < Object.keys(binds).length; i++){
        if (pressed_keys.includes(Object.keys(binds)[i])){
            bindsum += Object.values(binds)[i] + ";";
        }
    }
    return bindsum
}
function nalert(message="",time=1) {
    if (time>0){
        time-=1
        requestAnimationFrame(nalert)
    }
}

function getHttp(inptUrl) {
    let xmlHttp = new XMLHttpRequest;
    xmlHttp.onreadystatechange=function()
    {
        if (xmlHttp.readyState==4 && xmlHttp.status==200)
        {
            return xmlHttp.responseURL;
        }
    }
    xmlHttp.open("GET", inptUrl, true);
    xmlHttp.send(null)
}

document.addEventListener("keydown", _keyboard)
document.addEventListener("keyup", _keyboard)

class Hitbox {
    x=0;
    y=0;
    shape="rectangle";
    width= 100;
    constructor(x ,y, shape, width, height = width){
        this.x=x
        this.y=y
        this.shape=shape
        this.width=width
        if (shape="rectangle"){
            this.height=height
        }
    }
    static AABB(hitbox1, hitbox2) {
        //Remove "är lika med" tecken to make them count as not touching when at least one of their borders share the same coordinate (as in both have a edge on x=100 looking like theyre touching)
        //return (hitbox1.x < hitbox2.x+hitbox2.width && hitbox1.x+hitbox1.width > hitbox2.x && hitbox1.y < hitbox2.y+hitbox2.height && hitbox1.y+hitbox1.height > hitbox2.y)
        return [hitbox1.x < hitbox2.x+hitbox2.width, hitbox1.x+hitbox1.width > hitbox2.x, hitbox1.y < hitbox2.y+hitbox2.height, hitbox1.y+hitbox1.height > hitbox2.y]
    }
    static _oldest;
    static _latest;
    static _Tedges;
    static _changed;

    static collide(hitbox1,hitbox2){
        this._oldest = this._latest
        this._latest = this.AABB(hitbox1,hitbox2)
    
        if (!this._latest.includes(false)){
            this._Tedges = [hitbox1.x-hitbox1.width,hitbox1.x+hitbox1.width,hitbox1.y-hitbox1.height,hitbox1.y+hitbox1.height]
            if (this._oldest.includes(false)){
                this._changed = this._oldest.indexOf(false) 
            }
            else {
                this._changed = 0
            }
            if (this._changed>1){
                hitbox2.y = this._Tedges[this._changed]
            }
            else{
                hitbox2.x = this._Tedges[this._changed]
            }
            // return true
        }
        return false
    }
    visible = false
}

class Sprite{
    constructor(x, y, texture,alpha=1){
        this.texture = new Image()
        this.texture.src=texture
        this.x = x
        this.y = y
        this.alpha=alpha
    }
    getDimensions(){
        return {"width":this.texture.width,"height":this.texture.height}
    }
    draw(width=this.texture.width,height=this.texture.height) {
        ctx.globalAlpha=this.alpha
        ctx.drawImage(this.texture,this.x,this.y,width,height)
        ctx.globalAlpha=1
    }
}

class Spritesheet{
    constructor(texture, columns, rows){
        this.texture = new Image()
        this.texture.src=texture
        this.columns=columns
        this.rows=rows
    }
    draw(column,row,x,y,scale,direction){
        let spriteWidth=this.texture.width/this.columns
        let spriteHeight=this.texture.height/this.rows
        ctx.translate(W*(direction-1)*-0.5,0)
        ctx.scale(direction,1)
        ctx.drawImage(this.texture,spriteWidth*(column-1),spriteHeight*(row-1),spriteWidth,spriteHeight,x*direction-((W-scale)/2)*(direction-1),y,scale,scale)
        ctx.resetTransform()
    }

    getDimensions(){
        return {"width":this.texture.width/this.columns,"height":this.texture.height/this.rows}
    }
}

function resized() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    H = window.innerHeight
    W = window.innerWidth
}

window.addEventListener("resize", resized);

async function read(path) {
    let filepromise = new Promise(function(resolve){
        let xhttp = new XMLHttpRequest
        xhttp.open("GET", path, true)
        xhttp.onload = function(){
            if (this.status==200){
                resolve(xhttp.responseText);
            } else {
                resolve("Error: 404")
            }
        }
        xhttp.send(null)
    })
    return(await filepromise)
}

function direction(value){
    return value/Math.abs(value)
}

function clamp(variable, valueMin, valueMax) {
    return (variable>valueMax)?(valueMax):((variable<=valueMin)?(valueMin):(variable))
}