const pascal = document.getElementsByTagName("img")[0]
let pascals = 0
window.onmousedown = () => {
    pascal.src="images/mouthscal.jpg"
    pascals+=1
    document.getElementById("pascals").innerText="Pascals: "+pascals
}
window.onmouseup = () => {
    pascal.src="images/smugscal.jpg"
}