let center={x:W/2,y:H/2}
let tileSize=100
let boardSize=3
let currentTile=-1
let board=[]
let players=["⨯","o"]
for (let i=0; i<boardSize**2;i++){
    board.push("")
}

update = () => {
    clear()
    if (justClicked){
        board[currentTile]=players[0]
    }
    for (let i=0; i<boardSize**2;i++){
        let tileColor="rgb(0,0,0,1)"
        let tile = {x:center.x+i%boardSize*tileSize-boardSize*tileSize/2,y:center.y+Math.floor(i/boardSize)*tileSize-boardSize*tileSize/2}
        if (mouseAABB(tile.x,tile.y+tileSize,tile.x+tileSize,tile.y)){
            currentTile=i
            tileColor="rgb(255,255,255,0.5)"
        }
        rectangle(tile.x,tile.y,tileSize,tileSize,tileColor, 5,"white")
        text(board[i],tile.x+tileSize/2,tile.y+tileSize/2+35,100,"white","140px helvetica","center")
    }
}