let konsoll = document.getElementById("console")

window.onerror = (e) => {
    konsoll.innerText+=e
}

const consoleLog = console.log
console.log = (e) => {
    consoleLog(e)
    konsoll.innerText+=e

}