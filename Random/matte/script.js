let konsoll = document.getElementById("console")

window.onerror = (e) => {
    konsoll.innerText+=e
}