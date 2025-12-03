let textures = {"heart":"textures/heart.png", "reference":"textures/undertalefightreference.jpg"};
let heart = new Sprite(800,800,textures.heart,35,35)
let reference = new Sprite(0,0,textures.reference,W,H)

let bonetrousle=new Audio("music/bonetrousle.mp3")
bonetrousle.play()

update = () => {
    clear()
    reference.draw()
    rectangle(W/2-289,562,576,317,"black")
    heart.draw()
    if (pressed_keys.includes("d")){
        heart.x+=5
    }
    if (pressed_keys.includes("a")){
        heart.x-=5
    }
    if (pressed_keys.includes("w")){
        heart.y-=5
    }
    if (pressed_keys.includes("s")){
        heart.y+=5
    }
}
