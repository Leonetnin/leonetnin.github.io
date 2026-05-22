const _controlChars = ["NUL", "SOH", "STX","ETX","EOT","ENQ","ACK","BEL","BS","HT","LF","VT","FF","CR","SO","SI","DLE","DC1","DC2","DC3","DC4","NAK","SYN","ETB","CAN","EM","SUB","ESC","FS","GS","RS","US"]
_controlChars[127] = "DEL"
function codePoint(point) {
    return _controlChars[point] || String.fromCharCode(point)
}

let tdiv = document.getElementById("table")
let loops = 4
let table = document.createElement("table")
let tinner="<tr><th colspan='100%'>ASCII</th></tr><tr>"+"<th>Decimal</th><th>Binary</th><th>Character</th>".repeat(loops)+"</tr>"

for (let i=0; i<128/loops; i++) {
    tinner+="<tr>"
    for (let j=0; j<loops; j++){
        tinner+=`<td>${i+128/loops*j}</td><td>${(i+128/loops*j).toString(2).padStart(8,"0")}</td><td>${codePoint(i+128/loops*j)}</td>`
    }
    tinner+="</tr>"
}
table.innerHTML=tinner
tdiv.appendChild(table)

