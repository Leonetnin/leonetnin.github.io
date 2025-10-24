let currentDropdown=null


function dropdown(id){
    let dropdownElement=document.getElementById(id+"Dropdown").classList
    if (dropdownElement.contains("show")){
        dropdownElement.remove("show")  
    } else {
        dropdownElement.add("show")
    }
    currentDropdown=(dropdownElement.contains("show"))?("file"):(null)
}

window.onclick= function (event){
    let buttons=document.getElementsByClassName("tool")
    for (let i=0; i<buttons.length;i++){
        if (!event.target.matches("."+buttons[i].innerHTML.toLowerCase()+"Button")){
            document.getElementById(buttons[i].innerHTML.toLowerCase()+"Dropdown").classList.remove("show")
        }
    }
}

let textarea=document.getElementById("input")
textarea.oninput = function () {
    if (textarea.value.includes("#bg_color:")){
        textarea.style.backgroundColor=textarea.value.split("\n")[1]
    } else {
        textarea.style.backgroundColor="white"
    }
}