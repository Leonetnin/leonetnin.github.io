let toolbarheight = 75
const canvas = document.createElement('canvas')
canvas.id = "_canvas"
canvas.width = window.innerWidth
canvas.height = window.innerHeight-toolbarheight
document.body.appendChild(canvas)
let ctx = canvas.getContext("2d");

let rows = 5
let columns = 5
let amount=1
let circleradius = 30
function generatefield(rows, columns,amount=1){
    let blackcircles = []
    let blackcircle;
    ctx.clearRect(0,0,window.innerWidth,window.innerHeight)
    let offset = {x: (window.innerWidth-circleradius*2*columns)/2, y:(window.innerHeight-circleradius*2*rows)/2-toolbarheight/2}
    for (let i=0; i<amount; i++){
        do {
            blackcircle = (Math.ceil(Math.random()*rows*columns)-1)
        } while (blackcircles.includes(blackcircle)&&amount<rows*columns)
        blackcircles.push(blackcircle)
    }
    for (let i=0; i<rows; i++) {
        for (let j=0; j<columns; j++){
            ctx.beginPath()
            ctx.ellipse(offset.x+circleradius+j*circleradius*2, offset.y+circleradius+i*circleradius*2, circleradius, circleradius, 0, 0, 2*Math.PI)
            ctx.fillStyle = (blackcircles.includes(j+i*columns)||amount>=rows*columns)? "black":"red";
            ctx.fill()
        }
    }
}

generatefield(5,5)

let toolbartext = document.createElement("b")
toolbartext.innerHTML="TOOLBAR"
document.body.appendChild(toolbartext)
document.body.appendChild(document.createElement("br"))
cbutton("New ball", "generatefield(rows, columns, amount)")
cinput("rows=inputrow.value; generatefield(rows, columns, amount)", rows, " Rows:")
cinput("columns=inputrow.value; generatefield(rows, columns,amount)", columns," Columns:")
cinput("amount=inputrow.value; generatefield(rows, columns, amount)", amount, " Amount:")

function cbutton(text, onclick){
    let newnumberbutton = document.createElement("button")
    newnumberbutton.innerHTML=text
    newnumberbutton.onclick=function(){eval(onclick)}
    document.body.appendChild(newnumberbutton)
}

function cinput(oninput, standard="", text="X:"){
    let inputtext = document.createElement("label")
    inputtext.innerHTML=text
    document.body.appendChild(inputtext)
    let inputrow = document.createElement("input")
    inputrow.oninput=function(){eval(oninput)}
    inputrow.defaultValue=standard
    document.body.appendChild(inputrow)
}