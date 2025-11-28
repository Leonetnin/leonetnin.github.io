let buttonWidth = W/12
let buttonHeight = buttonWidth
let opened=[]
canvas.style.backgroundColor="grey"
let x = []
let y = []
while (x.length < 24){
    x=[]
    y=[]
    for (let i=0; i<24; i++){
        let collision=true
        let loops=0
        while (collision==true || loops>100){
            collision=false
            x[i]=Math.random()*(W-buttonWidth)
            y[i]=Math.random()*(H-buttonHeight)
            for (let j=0; j<x.length-1; j++){
                if(x[i]<x[j]+buttonWidth && x[i]+buttonWidth>x[j] && y[i]<y[j]+buttonHeight && y[i]+buttonHeight>y[j]){
                    collision=true
                }
            }
            loops+=1
        }
    }
}
update = () => {
    clear()
    for (let i=0; i<24; i++){
        button({font:"18px comic sans ms",text:opened.includes(i)?"Inte tjuvkika":i+1,x:x[i], y:y[i], width:buttonWidth, height:buttonHeight, bgColor:(i)%2==0?"rgb(212, 16, 16)":"rgb(23, 147, 23)", execute:function(){opened.push(i)},clickColor:(i)%2==0?"rgba(179, 22, 22, 1)":"rgba(23, 105, 23, 1)",focusColor:(i)%2==0?"rgba(237, 44, 44, 1)":"rgba(42, 199, 42, 1)"})
    }
}