const canvas = document.getElementsByTagName("canvas")
let ctx = []

const edits = document.getElementsByClassName("edit")[0].children

for (let i=0; i<canvas.length; i++) {
    canvas[i].width=351
    canvas[i].height=canvas[i].width
    ctx[i] = canvas[i].getContext("2d")
}

let result = new ImageData(canvas[1].width, canvas[1].height)

let input = new Image()
input.src = "rock.png"

input.onload = () => {
    ctx[0].fillStyle="white"
    ctx[0].fillRect(0,0,canvas[0].width, canvas[0].height)
    ctx[0].drawImage(input,0,0, input.width, input.height, 0,0,canvas[0].width,canvas[0].height)
}

// let update = () => {
//     //Clear canvas
//     ctx[1].clearRect(0,0,canvas[1].width,canvas[1].height)
//     drawCool()
    
//     requestAnimationFrame(update)
// }
// requestAnimationFrame(update)

function drawCool() {
    result = ctx[0].getImageData(0,0,canvas[1].width,canvas[1].height)
    
    for (let y=0; y<result.data.length; y+=4) {
        result.data[y]=eval(edits[0].children[0].value.replaceAll("x",result.data[y]))
        result.data[y+1]=eval(edits[1].children[0].value.replaceAll("x",result.data[y+1]))
        result.data[y+2]=eval(edits[2].children[0].value.replaceAll("x",result.data[y+2]))
        result.data[y+3]=255
    }
    ctx[1].putImageData(result, 0, 0)
}