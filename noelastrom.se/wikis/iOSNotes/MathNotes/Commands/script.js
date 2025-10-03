let xhttp = new XMLHttpRequest
let commands = null
xhttp.onreadystatechange = function(){
    if (this.readyState == 4 && this.status==200){
        onCommandsLoaded(xhttp.responseText)
        
    }
}
xhttp.open("GET", "commands.json", true)
xhttp.send(null)

function onCommandsLoaded(input){
    let commands = JSON.parse(input)
    let command;
    for (command in commands) {
        let element = document.createElement("a")
        element.innerHTML=command
        element.href=command
        document.body.appendChild(element)
    };
}