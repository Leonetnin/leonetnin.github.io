canvas.style.backgroundColor="black"
let things=[]
things.push(new dvdText({"text":"BRB","font":"impact","size":100,"vel":{"speed":0.25,"direction":Math.random()*360}}))
things.push(new dvdText({"text":"AFK","font":"impact","size":100,"vel":{"speed":0.25,"direction":Math.random()*360}}))

update = (delta) => {
    clear()
    text("I'm temporarily away from my keyboard, be right backing.", W/2, H/2, null, "rgb(70,70,75)","24px Comic Sans MS")
    for (let i=0; i<things.length;i++) {
        things[i].draw(delta)
    }
    drawParticles(delta)
}

//dvd properties --> text. size, x, y, vel, font, textsize, include descent, showHitboxes, textColor