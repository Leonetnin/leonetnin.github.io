const cells = document.getElementsByTagName("td")
const circle = "<img src='images/circle.png' alt='circle' width=100 height=100>"
const cross = "<img src='images/cross.png' alt='cross' width=100 height=100>"

let turn = 0
let board = [0,0,0,0]
for (let i = 0; i < cells.length; i++) {
    const element = cells[i];
    element.onclick = () => {
        turn+=1
        element.innerHTML=(turn%2==0)?circle:cross
        if (turn==3){
            const win = document.createElement("p")
            win.innerText="Kryss vann!"
            document.body.appendChild(win)
            for (let i = 0; i < cells.length; i++) {
                const element = cells[i];
                element.onclick = null
            }
        }
    }
}