canvas.style.backgroundColor="black"
let things=[]
things.push(new dvdText({"text":"BRB","font":"impact","size":100,"vel":{"speed":0.25,"direction":Math.random()*360}}))
things.push(new dvdText({"text":"AFK","font":"impact","size":100,"vel":{"speed":0.25,"direction":Math.random()*360}}))

update = (delta) => {
    clear()
    for (let i=0; i<things.length;i++) {
        things[i].draw(delta)
    }
    drawParticles(delta)
}

//dvd properties --> text. size, x, y, vel, font, textsize, include descent, showHitboxes, textColor