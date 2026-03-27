const themes = {
    "light": {
        "background":"repeating-linear-gradient(-45deg,rgb(248, 248, 248) 0px 15px,rgb(238, 238, 238) 15px 35.4px)"
    },
    "dark": {
        "background":"repeating-linear-gradient(-45deg, rgb(64, 64, 64) 0px 15px, rgb(38, 38, 38) 15px 35.4px)"
    }
}
theme()
function theme() {
    let theme = document.getElementById("theme").value
    document.body.style.background=themes[theme].background
    document.body.style.backgroundSize="100px 100px"
}

//Infobox


let date = new Date()
let firstJan = new Date(date.getFullYear(), 0, 1)
let week = Math.floor((firstJan.getDay()-1+(date-firstJan)/86000000)/7)+1
document.getElementById("vecka").innerText = "Vecka "+ week