let won = document.getElementById("won")
let lost = document.getElementById("lost")
let amount = document.getElementById("amount")

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