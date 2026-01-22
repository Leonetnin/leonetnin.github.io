let won = document.getElementById("won")
let lost = document.getElementById("lost")
let amount = document.getElementById("amount")
let gambles=0
let temp = document.getElementById("temp")
let tempnum = 0

// for (let i=0; i<100000000; i++){
//     gambletemp(8)
// }
// temp.innerHTML=gambles+", "+tempnum

function gamble() {
    let wins=0
    let losses=0
    document.getElementById("coins").innerHTML=""
    for (let i=0; i<+amount.value;i++) {
        if (Math.random()>0.5){
            wins+=1
            let img=document.createElement("img")
            img.src="textures/greencircle.png"
            document.getElementById("coins").appendChild(img)
        } else {
            let img=document.createElement("img")
            img.src="textures/redcircle.png"
            document.getElementById("coins").appendChild(img)
            losses+=1
        }
    }
    won.innerHTML=wins
    lost.innerHTML=losses
    if (wins==losses){
        tempnum+=1
    }
    gambles+=1
    temp.innerHTML=gambles+", "+tempnum
}

function gambletemp(x) {
    let wins=0
    let losses=0
    document.getElementById("coins").innerHTML=""
    for (let i=0; i<x;i++) {
        if (Math.random()>0.5){
            wins+=1
        } else {
            losses+=1
        }
    }
    if (wins==losses){
        tempnum+=1
    }
    gambles+=1
}

function settings() {
    if (document.getElementById("menu").style.visibility=="visible"){
        document.getElementById("menu").style.visibility="hidden"
    } else {
        document.getElementById("menu").style.visibility="visible"
    }
}

amount.addEventListener("keypress", function(event){
    if (event.key=="Enter"){
        event.preventDefault();
        document.getElementById("gamble").click();
    }
})