const calcButtonTexts = ["%","CE","C","⌫","¹/x","x²","²√x","÷","7","8","9","×","4","5","6","−","1","2","3","+","⁺/₋","0",".","="]
const buttonStyle={}

//MS CALC SPACINGS
//Main buttons to edge: 5px
//Main buttons between each other: 3px
// max Width before history 558
//History width 405/406
const screenPadding = 5
const buttonPadding = 2
let buttonWidth=0
let buttonHeight=0
let topSection=0
let historyWidth;
let numbers=["0","1","2","3","4","5","6","7","8","9","⁺/₋",".","-","e"]
let refer=new Sprite(0,-30,"reference.png")
let input="0"
let latestInput=""
let justLatest=true

update = () => {
    historyWidth=235+((W-558)/(screen.width-558))*100
    buttonWidth = (W-historyWidth*(W>558)-screenPadding*2-buttonPadding*3)/4+4
    buttonHeight=(H-130)*(0.129-buttonPadding/1000)
    topSection=H*0.3
    clear()
    for (let i=0; i<4; i++){
        for (let j=0; j<6; j++){
            if (i==3&&j==5){
                button({"text":calcButtonTexts[i+j*4],"roundness":5,"execute":function(){calculateInput(); justLatest=true},"textColor":"black","bgColor":"rgb(82, 22, 155)","focusColor":"rgb(76, 22, 142)","clickColor":"rgb(71, 23, 130)","width":buttonWidth, "height":buttonHeight,"x":screenPadding+i*(buttonWidth+buttonPadding),"y":H-screenPadding-buttonHeight*6-buttonPadding*5+j*(buttonHeight+buttonPadding)})
            } else {
                let buttonColors=["rgb(59, 59, 59)","rgb(50, 50, 50)","rgb(40, 40, 40)"]
                let buttonColor = (numbers.includes(calcButtonTexts[i+j*4]))?(0):(1)
                if (["Cannot divide by zero","Result is undefined"].includes(input) && ([".","⁺/₋"].includes(calcButtonTexts[i+j*4]) ||(!numbers.includes(calcButtonTexts[i+j*4]) && !["CE","C","⌫",".","⁺/₋"].includes(calcButtonTexts[i+j*4])))){
                    button({"text":calcButtonTexts[i+j*4],"roundness":5,"execute":function(){},"textColor":"rgb(115, 115, 115)","bgColor":"rgb(40, 40, 40)","focusColor":"rgb(40, 40, 40)","clickColor":"rgb(40, 40, 40)","font":"normal 300 20px Segoe UI Symbol","width":buttonWidth, "height":buttonHeight,"x":screenPadding+i*(buttonWidth+buttonPadding),"y":H-screenPadding-buttonHeight*6-buttonPadding*5+j*(buttonHeight+buttonPadding)})
                    continue;
                } else {
                    button({"text":calcButtonTexts[i+j*4],"roundness":5,"execute":function(){handleInput(this.text)},"textColor":"white","bgColor":buttonColors[buttonColor],"focusColor":buttonColors[buttonColor+(buttonColor==0)*2-1],"clickColor":buttonColors[2-(buttonColor==1)],"font":"normal 300 20px Segoe UI Symbol","width":buttonWidth, "height":buttonHeight,"x":screenPadding+i*(buttonWidth+buttonPadding),"y":H-screenPadding-buttonHeight*6-buttonPadding*5+j*(buttonHeight+buttonPadding)})
                }
            }
        }
    }
    text(input,buttonWidth*4+buttonPadding*3-2,164,"100","white","normal 600 67px/30px Segoe UI Variable","right")
    text(latestInput,buttonWidth*4+buttonPadding*3-6,90,"100","rgb(115, 115, 115)","normal 600 15px/30px Segoe UI Variable","right")
    // refer.alpha=0.2
    //refer.draw(W,H+73)
}


function handleInput(button){
    switch (button){
        case "⌫":
            if (["Cannot divide by zero","Result is undefined"].includes(input)){
                input="0"
                latestInput=""
                break;
            }
            if (!justLatest){
                input=input.slice(0,input.length-1)
            }
            break;
        case "C":
            input="0"
            latestInput=""
            break;
        case "CE":
            input="0"
            break;
        case "%":
            if (["+","-"].includes(latestInput[latestInput.length-1])) {
                input=Number(latestInput.slice(0,latestInput.length-1))*Number(input)/100
                latestInput+=input
            } else {
                if (justLatest){
                    input=Number(latestInput.slice(0,latestInput.length-1))/100
                } else {
                    input=Number(input)/100*Number(latestInput.slice(0,latestInput.length-1))
                }
                latestInput+=input
            }
            justLatest=true
            break;
        case "¹/x":
            if (input=="0"){
                if (latestInput=="0÷"){
                    input="Result is undefined."
                } else{
                    input="Cannot divide by zero."
                }
                break;
            }
            if (latestInput[latestInput.length-1]=="="){
                latestInput=input
            }
            latestInput=(latestInput=="")?(latestInput="1/("+input+")"):(latestInput="1/("+latestInput+")")
            input=(1/Number(input)).toString()
            justLatest=true
            break;
        case "x²":
            if (latestInput[latestInput.length-1]=="="){
                latestInput=input
            }
            latestInput=(latestInput=="")?(latestInput="sqr("+input+")"):(latestInput="sqr("+latestInput+")")
            input=(Number(input)**2).toString()
            justLatest=true
            break;
        case "²√x":
            if (latestInput[latestInput.length-1]=="="){
                latestInput=input
            }
            latestInput=(latestInput=="")?(latestInput="√("+input+")"):(latestInput[latestInput.length-1]==")"?(latestInput="√("+latestInput+")"):(latestInput+="√("+input+")"))
            input=Math.sqrt(Number(input)).toString()
            justLatest=true
            break;
        case "⁺/₋":
            input=(input[0]=="-")?(input.slice(1,input.length)):("-"+input)
            break;
        default:
            if (numbers.includes(button)){
                if (justLatest){
                    input=""
                    justLatest=false
                }
                if (input=="0"){
                    input=button
                } else {
                    input+=button
                }
            } else {
                if (latestInput==""){
                    latestInput=input+button
                    justLatest=true
                } else if (latestInput[latestInput.length-1]!="="){
                    if (["÷","×","−","+",].includes(latestInput[latestInput.length-1])){
                        latestInput=latestInput.slice(0,latestInput.length-1)
                    }else {
                        calculateInput()
                        justLatest=true
                    }
                }
                latestInput=input+button
            }
    }
    if (input=="NaN"){
        input="Invalid input"
    }
}

function calculateInput() {
    if (["Cannot divide by zero","Result is undefined"].includes(input)){
        input="0"
        latestInput=""
        return null
    }
    const unmoddedInput=input
    switch (latestInput[latestInput.length-1]) {
        case "+":
            input=(Number(latestInput.slice(0,latestInput.length-1))+Number(input)).toString()
            latestInput+=unmoddedInput+"="
            break;
        case "−":
            input=(Number(latestInput.slice(0,latestInput.length-1))-Number(input)).toString()
            latestInput+=unmoddedInput+"="
            break;
        case "×":
            input=(Number(latestInput.slice(0,latestInput.length-1))*Number(input)).toString()
            latestInput+=unmoddedInput+"="
            break;
        case "÷":
            if (input=="0"){
                if (latestInput=="0÷"){
                    input="Result is undefined"
                } else{
                    input="Cannot divide by zero"
                }
                break;
            }
            input=(Number(latestInput.slice(0,latestInput.length-1))/Number(input)).toString()
            latestInput+=unmoddedInput+"="
            break;
        case "=":
            if (latestInput[latestInput.length-2]==")"){
                latestInput=input
                break;
            }
            latestInput=latestInput.slice(0,latestInput.length-1)
            //input=(Number(latestInput.slice(0,latestInput.length-1))+Number(input)).toString()
            for (let i=0;i<latestInput.length;i++){
                if (numbers.includes(latestInput[i])==false){
                    input=latestInput.slice(i+1,latestInput.length)
                    latestInput=unmoddedInput+latestInput.slice(i,i+1)
                    break;
                }
            }
            calculateInput()
            break;
        case ")":
            latestInput+="="
            break;
        default:
            if (justLatest){
                latestInput=latestInput.slice(0,latestInput.length-input.toString().length)
                justLatest=false
                calculateInput()
            }
    }
}