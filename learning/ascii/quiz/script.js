let _controlChars = ["NUL", "SOH", "STX","ETX","EOT","ENQ","ACK","BEL","BS","HT","LF","VT","FF","CR","SO","SI","DLE","DC1","DC2","DC3","DC4","NAK","SYN","ETB","CAN","EM","SUB","ESC","FS","GS","RS","US"]
let _alphabet = []
let _symbols = []
let _numbers = []

let _ascii = ["NUL", "SOH", "STX","ETX","EOT","ENQ","ACK","BEL","BS","HT","LF","VT","FF","CR","SO","SI","DLE","DC1","DC2","DC3","DC4","NAK","SYN","ETB","CAN","EM","SUB","ESC","FS","GS","RS","US"," ","!",'"',"#","$","%","&","'","(",")","*","+",",","-",".","/","0","1","2","3","4","5","6","7","8","9",":",";","<","=",">","?","@","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","[","\\","]","^","_","`","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","{","|","}","~","DEL"]

for (let i=0; i<95; i++) {
    let char = String.fromCharCode(i+32)
    if (char.match(/[a-z]/i)) {
        _alphabet.push(char)
    } else if (char.match(/[0-9]/)) {
        _numbers.push(char)
    } else {
        _symbols.push(char)
    }
}
_controlChars[127] = "DEL"

let userInput = document.getElementsByTagName("input")[0]
let question = document.getElementsByTagName("p")[0]

let wins = 0
let plays = 0

let charSelection = []

newQuestion()
userInput.onbeforeinput = (e) => {
    if (e.inputType!="insertLineBreak") {return null}
    switch (userInput.value) {
        case "skip":
            newQuestion()
            break
        case _ascii.indexOf(question.innerText).toString(2).padStart(8,"0"):
            newQuestion()
            wins+=1
            break
        default:
    }
    userInput.value=""
    plays+=1
    document.getElementById("correct").innerText=wins+"/"+plays+" ("+Math.round(wins/plays*100, 2)+"%)"
}



function newQuestion() {
    let selection = []
    let gamemode = document.getElementById("reverse").checked
    selection = selection.concat(document.getElementById("control").checked?_controlChars:[])
    selection = selection.concat(document.getElementById("alphabet").checked?_alphabet:[])
    selection = selection.concat(document.getElementById("numbers").checked?_numbers:[])
    selection = selection.concat(document.getElementById("symbols").checked?_symbols:[])
    selection=selection.filter(String)
    if (document.getElementById("reverse").checked) {
        question.innerText=selection[Math.floor(Math.random()*selection.length)]
    } else {
        question.innerText=selection[Math.floor(Math.random()*selection.length)]
    }
}

//_controlChars[Math.floor(Math.random()*_controlChars.length)]

//question.innerText=Math.floor(Math.random()*128).toString(2).padStart(8,"0")
