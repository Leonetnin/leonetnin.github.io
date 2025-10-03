let url = window.location.toString()
if (url.startsWith("https://noelastrom.se/wikis/iOSNotes/MathNotes/Commands/")){
    let xhttp = new XMLHttpRequest
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status==200){
            onCommandsLoaded(xhttp.responseText)
            
        }
    }
    xhttp.open("GET", "wikis/iOSNotes/MathNotes/Commands/commands.json", true)
    xhttp.send(null)

    function onCommandsLoaded(input){
        let commands = JSON.parse(input)
        let p_command=document.createElement("p")
        p_command.innerHTML=commands[document.body.appendChild(h1_command)].description
        document.body.appendChild(p_command)
    }

    let h1_command=document.createElement("h1")
    h1_command.innerHTML="Command sumting"

    document.body.appendChild(h1_command)
} else if (url.startsWith("http://127")){
    let h1_local = document.createElement("h1")
    let p_local = document.createElement("p")
    h1_local.innerHTML="You are on local host";
    p_local.innerHTML="So I assume you're testing and it doesn't work.";
    document.body.appendChild(h1_local)
    document.body.appendChild(p_local)
}else{
    let h1_404 = document.createElement("h1")
    let p_404 = document.createElement("p")
    h1_404.innerHTML="This site doesn't exist. 404 or something.";
    p_404.innerHTML="And i don't wanna do fancy css for this";
    document.body.appendChild(h1_404)
    document.body.appendChild(p_404)
}