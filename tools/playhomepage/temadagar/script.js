let tds = document.body.children[0].children[0].children[0].children
let temadagar = {}
for (let i=0; i<tds.length; i++) {
    let data = tds[i].children[0].innerText.split('">')
    data=data[data.length-1].split(" - ")
    if (temadagar[data[0]]==undefined) {
        temadagar[data[0]] = [data[1]]
    } 
}