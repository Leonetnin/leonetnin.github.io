const calcButtonTexts = ["%","CE","C","⌫","¹/x","x²","²√x","÷","7","8","9","×","4","5","6","−","1","2","3","+","⁺/₋","0",",","="]
const buttonStyle={}


update = () => {
    clear()
    for (let i=0; i<4; i++){
        for (let j=0; j<6; j++){
            if (i==3&&j==5){
                button({"text":calcButtonTexts[i+j*4],"x":10,"y":j*20})
            } else {
                button({"text":calcButtonTexts[i+j*4],"x":10,"y":j*20})
            }
        }
    }
}

function calcClick(){
    alert(1)
}
alert(1) //button(calcButtonTexts[i+j*4], i*100, j*100, calcClick, 50, 50,rgb(249,249,249),rgb(229, 229, 229),"black",48,24,false)