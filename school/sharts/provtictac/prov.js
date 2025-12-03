let board = ["-","-","-","-","-","-","-","-","-"]
let state="playing"
players=["X","O"]
while (state=="playing"){
    spelaDrag(players[board.filter((tile)=> tile=="-").length%2])
    for (let i=0; i<3; i++){
        console.log(board[i*3]+board[i*3+1]+board[i*3+2]+((i==2)?("\n"):("")))
    }
}
console.log(state)
function spelaDrag(player){
    if (board.indexOf("-")==-1){
        state="Oavgjort"
        return null
    }
    let drag;
    do {
        drag=Math.floor(Math.random()*9)
    } while (board[drag]!=="-")
    board[drag]=player
    drag = {row:Math.floor(drag/3),col:drag%3}
    if ((board[drag.col]==player && board[drag.col+3]==player && board[drag.col+6]==player) || (board[drag.row]==player && board[drag.row+1]==player && board[drag.row+2]==player) || (board[0]==player && board[4]==player && board[8]==player) || (board[2]==player && board[4]==player && board[6]==player)){
        state=player+" vinner efter "+(9-board.filter((tile)=> tile=="-").length)+" drag"
    }
}