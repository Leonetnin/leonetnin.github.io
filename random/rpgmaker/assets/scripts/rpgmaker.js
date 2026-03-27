//fetch config settings
async function getdata() {
    return await fetch('config/config.json')
        .then(response => response.json())
        .then(responseJson => {return responseJson})
}
async function loader() {
    const _json = await this.getdata()
    runGame(_json)
}
loader()

function runGame(_configSettings) {
    //Init
    const resolution = _configSettings["resolution"].split("x")
    let canvas = document.getElementById("_canvas")
    canvas.width = +resolution[0]
    canvas.height = +resolution[1]
    const ctx = canvas.getContext("2d")
    ctx.imageSmoothingEnabled = false
    
    //Check if user has dev enabled
    
    let searchparams = new URLSearchParams(window.location.search)
    if (searchparams.has("dev")){
        const element = document.createElement("div")
        element.id = "dev"
        element.innerHTML="<label>Dev Console</label><textarea id='console' readonly></textarea><input id='consoleinput' onkeypress='function key(e){if(e.key==`Enter`){document.getElementById(`console`).innerText += document.getElementById(`consoleinput`).value; eval(document.getElementById(`consoleinput`).value)}}; key(event)'>"
        document.body.appendChild(element)
        
        //Console
        let konsoll = document.getElementById("console")
        window.onerror = (e) => {
            konsoll.innerText+=e
        }
        
        const consoleLog = console.log
        console.log = (e) => {
            consoleLog(e)
            konsoll.innerText+=e
        }
    }
    
    //Mouse
    document.addEventListener("mousedown", _mouse)
    document.addEventListener("mousemove", _mouse)
    document.addEventListener("mouseup", _mouse)
    const mouse = {
        x:0,
        y:0,
        down: false,
        click:false
    }
    function _mouse(e) {
        switch (e.type) {
            case "mousedown":
                mouse.down = true
                mouse.click = true
                break;
            case "mouseup":
                mouse.down = false
                break;
            case "mousemove":
                mouse.x = e.x
                mouse.y = e.y
                break;
        }
    }
    
    let pressedKeys = []
    
    window.onkeydown = (e) => {
        if (!pressedKeys.includes(e.key)){
            pressedKeys.push(e.key)
        }
    }
    
    window.onkeyup = (e) => {
        pressedKeys.splice(pressedKeys.indexOf(e.key),1)
    }
    
    //Extra funcs
    
    function toRadians(degrees) {
        return degrees * Math.PI/180
    }
    
    function toDegrees(radians) {
        return radians / (Math.PI/180)
    }
    
    //Update
    
        //standard screens vars
    let t=0
    let icon = new Image()
    icon.src="assets/textures/icon.png"
    
    let update = (delta) => {};
    let _delta = 0;
    let _previousTimeStamp = 0
    let rollintro = _configSettings["useintro"]
    if (_configSettings["useintro"]) {
        _updateHandler = () => {
            _delta = document.timeline.currentTime - _previousTimeStamp
            _previousTimeStamp=document.timeline.currentTime
            if (rollintro) {
                intro(_delta)
            } else {
                update?.(_delta);
            }
            mouse.click=false
            requestAnimationFrame(_updateHandler);
        }
    } else {
        _updateHandler = () => {
            _delta = document.timeline.currentTime - _previousTimeStamp
            _previousTimeStamp=document.timeline.currentTime
            update?.(_delta);
            mouse.click=false
            requestAnimationFrame(_updateHandler);
        }
    }
    _updateHandler()
    
    function intro(delta) {
        ctx.clearRect(0,0,canvas.width,canvas.height)
        t+=0.015*delta
    
        for (let i=-2; i<(canvas.width+canvas.height)/(Math.sqrt(2)*10); i++) {
            ctx.rotate(toRadians(45))
            //ctx.fillStyle=i%2==0?"rgb(240, 233, 217)":"rgb(216, 70, 70)"
            ctx.fillStyle=i%2==0?"rgb(240, 233, 217)":"rgb(216, 70, 70)"
            ctx.fillRect(i*10+(t%20),i*-10-10-(t%20),10,canvas.height*Math.sqrt(2)+10)
            ctx.resetTransform()
        }
        ctx.drawImage(icon, Math.round((canvas.width-(icon.width))/2), Math.round((canvas.height-icon.height)/2),icon.width,icon.height)
        ctx.font="7px '5x7'"
        ctx.fillStyle="black"
        //ctx.fillText("A tool by Noel Astrom",mouse.x,mouse.y)
        ctx.resetTransform()
        if (t>50) {
            rollintro=false
            clear()
        }
    }
    
    function clear() {
        ctx.clearRect(0,0,canvas.width,canvas.height)
    }
    
    class Spritesheet{
        constructor(texture, tilewidth, tileheight=tilewidth, marginx=0, marginy=marginx){
            this.texture = new Image()
            this.texture.src=texture
            this.tilewidth=tilewidth
            this.tileheight=tileheight
            this.marginx = marginx
            this.marginy = marginy
        }
        draw(column,row,x,y,scale,direction){
            let spriteWidth=this.tilewidth
            let spriteHeight=this.tileheight
            ctx.drawImage(this.texture, spriteWidth*(column-1), spriteHeight*(row-1), spriteWidth, spriteHeight, Math.round(x), Math.round(y), spriteWidth, spriteHeight)
            ctx.resetTransform()
        }
    
        getDimensions(){
            return {"width":this.texture.width/this.columns,"height":this.texture.height/this.rows}
        }
    }
}