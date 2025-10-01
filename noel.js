/*
---------------------------------
noel.js
version 0.1, alpha.
---------------------------------
Latest update: 2025-09-29, 12:00
---------------------------------*/

function read(path) {
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status==200){
            onCommandsLoaded(xhttp.responseText);
        }
    }
    let xhttp = new XMLHttpRequest
    xhttp.open("GET", path, true)
    xhttp.send(null)
    return(xhttp.responseText)
}

function poop(){
    alert(1)
}