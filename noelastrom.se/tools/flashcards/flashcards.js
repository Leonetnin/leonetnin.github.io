let c_save=0
let saveStandard = {"title":"Flashcard set title", "bg_color":"rgb(60,110,68)","flashcards":[["AAAAAA", "Answer"]]}
let c_title=saveStandard["title"]
let c_cards=saveStandard["flashcards"]
let c_bgc=saveStandard["bg_color"]
let c_question = c_cards[0][0]
let c_answer = c_cards[0][1]
let cardWidth = 300
let cardSide = 1
document.body.style.backgroundColor=c_bgc
let flipping = false
let flipSpeed = 20
let cardColor = "rgb(255,255,255)"
let testShape = [0,0,0,200,cardWidth,200,cardWidth,0]
let cardHeight={"left":200,"right":200}
let cardDimensions = {"left":200, "bottom":300, "right":200, "top":300,"perspective":1.5}
let edit=null
let editColor="rgb(50,50,50)"
let showingPointer = false
let cooldown=0;
let flipSide = 1

update = (delta) => {
    testShape = [0,-cardHeight.left/2,0,cardHeight.left/2,cardWidth,cardHeight.right/2,cardWidth,-cardHeight.right/2]
    clear()
    text(c_title,W/2,100,48,(edit=="title")?(editColor):("black"))
    //rectangle(W/2-cardWidth/2,H/2-100,cardWidth,200,cardColor)
    foursided(W/2-cardWidth/2,H/2,testShape,"white",true)
    shape(W/2+130,H/2+110,[0,0,0,30,20,15],"black",2,"rgb(50,80,50)")
    shape(W/2-150,H/2+110,[0,15,20,0,20,30],"black",2,"rgb(50,80,50)")
    if (justPressed(" ") && edit==null && flipping==false){
        flipSide=cardSide
        flipping=true
    }
    if (cardSide==1){
        text("                  "+c_question.replace("A","B")+"                  ",W/2,H/2,24,(edit=="question")?(editColor):("black"),"24px Serif", Math.abs(cardWidth))
    } else {
        text("                  "+c_answer+"                    ",W/2,H/2,24,(edit=="answer")?(editColor):("black"),"24px Serif", Math.abs(cardWidth))
    }
    if (flipping) {
        if ((cardWidth-flipSpeed*flipSide)*flipSide>-300*flipSide){
            let mval=cardDimensions.right*cardDimensions.perspective
            let kval = cardDimensions.right*(cardDimensions.perspective-1)/cardDimensions.top
            cardWidth-=flipSpeed*flipSide
            cardHeight.left=kval*Math.abs(cardWidth)+mval-cardDimensions.left
            cardHeight.right=-kval*Math.abs(cardWidth)+mval
            if (cardWidth==0){
                cardSide *=-1
            }
        } else {
            cardWidth=300*cardSide
            cardHeight.left=200
            cardHeight.right=200
            flipping=false
        }
        let colorDiff= 255-(300-Math.abs(cardWidth))/4
        cardColor="rgb("+colorDiff+","+colorDiff+","+colorDiff+")"
    }
    if (mouse.button==0 && mouseAABB(0,100,W,60)) {
        edit="title"
    }
    if (mouse.button==0 && mouseAABB(W/2-150,H/2+100,W/2+150,H/2-100)) {
        edit="question"
    }
    switch (edit) {
        case "title":
            if (mouse.button==0 && !mouseAABB(0, 100,W,60)) {
                edit=null
                if (showingPointer){
                    c_title = c_title.substring(0,c_title.length-1)
                    showingPointer=false
                }
            }
            editVarByKeyboard("c_title")
            break;
        case "question":
            if (mouse.button==0 && !mouseAABB(W/2-150,H/2+100,W/2+150,H/2-100)) {
                edit=null
                if (showingPointer){
                    c_question = c_question.substring(0,c_question.length-1)
                    showingPointer=false
                }
            }
            editVarByKeyboard("c_question")
            break;
        
        default:
            break;
    }
}   


function changeSave(save) {
    let data=localStorage.getItem("save"+save.toString())
    c_save=save
    c_title=data["title"]
    document.body.style.backgroundColor=data["bg_color"]
    c_cards=data["flashcards"]
}

function showPointer(variable) {
    if (cooldown>0){
        cooldown-=1
    } else {
        if (showingPointer==false) {
            cooldown=60
            showingPointer=true
            eval(variable+'+="|"')
        } else {
            cooldown=60
            showingPointer=false
            eval(variable+"="+variable+".substring(0,"+variable+".length-1)") 
        }
    }
}

function editVarByKeyboard(variable){
    showPointer(variable)
    let result = eval(variable)
    if (pressed_keys.length!=0){
        if (pressed_keys[0]=="Backspace"){
            if (showingPointer){
                result = result.substring(0,result.length-2)
                result += "|"
                pressed_keys.splice(0,1)
            } else {
                result = result.substring(0,result.length-1)
                pressed_keys.splice(0,1)
            }
        } else if (pressed_keys[0]=="Shift") {
            if (pressed_keys.length>1){
                if (showingPointer){
                    result = result.substring(0,result.length-1)
                    result+=pressed_keys[1]+"|"
                } else {
                    result+=pressed_keys[1]
                }
                pressed_keys.splice(1,1)
            }
        } else if (pressed_keys[0]=="Enter") {
            edit=null
            if (showingPointer){
                result = result.substring(0,result.length-1)
                showingPointer=false
            }
            pressed_keys.splice(0,1)
        } else if (pressed_keys[0]=="Control") {
            pressed_keys.splice(0,1)
        } else if (pressed_keys[0]=="AltGraph"){
                pressed_keys.splice(0,1)
        } else {
            if (showingPointer){
                result = result.substring(0,result.length-1)
                result+=pressed_keys[0]+"|"
            } else {
                result+=pressed_keys[0]
            }
            pressed_keys.splice(0,1)
        }
    }
    eval(variable+"=result")
}

function saveSet(){
    if (c_save=0){
        localStorage.setItem("save"+(localStorage.length+1).toString(), {"title":c_title, "bg_color":c_bgc,"flashcards":c_cards})
    }
}

//localStorage.setItem("save"+currentsave.toString())
