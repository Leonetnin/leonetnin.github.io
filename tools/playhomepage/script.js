const lightstripe="repeating-linear-gradient(-45deg,rgb(248, 248, 248) 0px 15px,rgb(238, 238, 238) 15px 35.4px)"
const darkstripe="repeating-linear-gradient(-45deg, rgb(64, 64, 64) 0px 15px, rgb(38, 38, 38) 15px 35.4px)"
const themes = {
    "light":""
}
function theme() {
    darkmode=!darkmode
    document.body.style.background=darkmode?darkstripe:lightstripe
    document.body.style.backgroundSize="100px 100px"
}