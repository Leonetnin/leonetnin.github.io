let buttonWidth = (W-100)/6
let buttonHeight = (H-100)/4
let opened=[]
canvas.style.backgroundColor="grey"
update = () => {
    clear()
    for (let i=0; i<4; i++){
        for (let j=0; j<6; j++){
            button({text:opened.includes(i*6+j+1)?"Inte tjuvkika":i*6+j+1,x:50+j*buttonWidth, y:50+i*buttonHeight, width:buttonWidth, height:buttonHeight, bgColor:(j+i)%2==0?"rgb(212, 16, 16)":"rgb(23, 147, 23)", execute:function(){opened.push(i*6+j+1)},clickColor:(j+i)%2==0?"rgba(179, 22, 22, 1)":"rgba(23, 105, 23, 1)",focusColor:(j+i)%2==0?"rgba(237, 44, 44, 1)":"rgba(42, 199, 42, 1)"})
        }
    }
}