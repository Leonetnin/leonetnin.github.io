let c_save=0
let saveStandard = {"title":"Flashcard set title", "bg_color":"rgb(60,110,68)","flashcards":[["Q", "A"]]}
let c_title=saveStandard["title"]
let c_cards=saveStandard["flashcards"]
let c_bgc=saveStandard["bg_color"]
let c_question = c_cards[0][0]
let c_answer = c_cards[0][1]
let cardWidth = 300
let cardSide = 1
let flipping = false
let flipSpeed = 2
let cardColor = "rgb(255,255,255)"
let testShape = [0,0,0,200,cardWidth,200,cardWidth,0]
let cardHeight={"left":200,"right":200}
let cardDimensions = {"left":200, "bottom":300, "right":200, "top":300,"perspective":1.4}
let edit=null
let editColor="rgb(50,50,50)"
let showingPointer = false
let cooldown=0;
let flipSide = 1
let selectedCard=0;
let createdCard=false
let saved=false

update = (delta) => {
    testShape = [0,-cardHeight.left/2,0,cardHeight.left/2,cardWidth,cardHeight.right/2,cardWidth,-cardHeight.right/2]
    document.body.style.backgroundColor = c_bgc
    clear()
    c_question = c_cards[selectedCard][0]
    c_answer = c_cards[selectedCard][1]
    //monitor values
    //monitor(["FPS: "+Math.round(1000/delta)])
    text(c_title,W/2,100,48,(edit=="title")?(editColor):("black"))
    text("save "+c_save,50,30)
    //rectangle(W/2-cardWidth/2,H/2-100,cardWidth,200,cardColor)
    foursided(W/2-cardWidth/2,H/2,testShape,cardColor,true)
    shape(W/2+130,H/2+110,[0,0,0,30,20,15],"black",2,"rgb(50,80,50)")
    shape(W/2-150,H/2+110,[0,15,20,0,20,30],"black",2,"rgb(50,80,50)")
    text(selectedCard,W/2,H/2+137,36)
    if (selectedCard==c_cards.length-1){
        rectangle(W/2+200,H/2-25,50,50,"white")
        rectangle(W/2+205,H/2-5,40,10,"black")
        rectangle(W/2+220,H/2-20,10,40,"black")
        if (!createdCard && mouse.button==0 && mouseAABB(W/2+200,H/2+25,W/2+250,H/2-25)) {
            createdCard=true
            c_cards.push(["Q","A"])
            selectedCard=c_cards.length-1
        }
    }

    rectangle(10,H-50,80,40,"white")
    text("save",50,H-25)
    if (!saved && mouse.button==0 && mouseAABB(10, H-10, 90,H-50)) {
        saved=true
        saveSet()
        alert("Saved")
    }

    rectangle(10,H-100,142,40,"white")
    text("Change save",80,H-75)
    if (!saved && mouse.button==0 && mouseAABB(10, H-60, 152,H-100)) {
        saved=true
        changeSave(prompt("Which save?"))
        
    }

    if (mouse.button==-1){
        createdCard=false
        saved=false
    }

    if (justPressed(" ") && edit==null && flipping==false){
        flipSide=cardSide
        flipping=true
    }
    if (justPressed("ArrowRight") && edit==null && flipping==false){
        if (selectedCard+2>c_cards.length){
            selectedCard=0
        } else {
            selectedCard+=1
        }
    }
    if (justPressed("ArrowLeft") && edit==null && flipping==false){
        if (selectedCard<1){
            selectedCard=c_cards.length-1
        } else {
            selectedCard-=1
        }
    }
    if (cardSide==1){
        text(c_question,W/2,H/2,24,(edit=="question")?(editColor):("black"),"24px Serif", "center", Math.abs(cardWidth),300,true)
    } else {
        text(c_answer,W/2,H/2,24,(edit=="answer")?(editColor):("black"),"24px Serif", "center", Math.abs(cardWidth), 300,true)
    }
    if (flipping) {
        flip(delta)
    }
    if (mouse.button==0 && mouseAABB(0,100,W,60)) {
        edit="title"
    }
    if (mouse.button==0 && mouseAABB(W/2-150,H/2+100,W/2+150,H/2-100)) {
        edit = (cardSide==1) ? ("question") : ("answer")
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
            c_cards[selectedCard][0]=c_question
            break;

        case "answer":
            if (mouse.button==0 && !mouseAABB(W/2-150,H/2+100,W/2+150,H/2-100)) {
                edit=null
                if (showingPointer){
                    c_answer = c_answer.substring(0,c_answer.length-1)
                    showingPointer=false
                }
            }
            editVarByKeyboard("c_answer")
            c_cards[selectedCard][1]=c_answer
            break;
        
        default:
            break;
    }
}   


function changeSave(save) {
    let data=JSON.parse(localStorage.getItem("save"+save))
    if (data){
        selectedCard=0
        c_save=save
        c_title=data["title"]
        c_bgc=data["bg_color"]
        c_cards=data["flashcards"]
    } else {
        alert("Invalid index!")
    }
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
        } else if (pressed_keys.includes("Shift") && !pressed_keys.includes("Enter")) {
            if (pressed_keys.length>1){
                if (showingPointer){
                    result = result.substring(0,result.length-1)
                    result+=pressed_keys[1]+"|"
                } else {
                    result+=pressed_keys[1]
                }
                pressed_keys.splice(1,1)
            }
        } else if (pressed_keys.includes("Enter")) {
            if (!(pressed_keys.includes("Shift"))) {
                edit=null
                if (showingPointer){
                    result = result.substring(0,result.length-1)
                    showingPointer=false
                }
                pressed_keys.splice(pressed_keys.indexOf("Enter"),1)
            } else {
                if (showingPointer){
                    result = result.substring(0,result.length-1)
                    result+="\n"+"|"
                } else {
                    result+="\n"
                }
                pressed_keys.splice(pressed_keys.indexOf("Enter"),1)
            }
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
    if (c_save==0){
        localStorage.setItem("save"+(localStorage.length+1).toString(), JSON.stringify({"title":c_title, "bg_color":c_bgc,"flashcards":c_cards}))
        c_save=localStorage.length
    } else {
        localStorage.setItem("save"+c_save, JSON.stringify({"title":c_title, "bg_color":c_bgc,"flashcards":c_cards}))
    }
}

function flip(delta) {
    if ((cardWidth-flipSpeed*flipSide)*flipSide>-300){
        let kval = cardDimensions.right*(cardDimensions.perspective-1)/cardDimensions.top
        cardWidth-=flipSpeed*flipSide*delta
        cardHeight.left=flipSide*kval*(Math.abs(cardWidth)-300)+cardDimensions.left
        cardHeight.right=-flipSide*kval*(Math.abs(cardWidth)-300)+cardDimensions.right
        cardSide = (cardWidth>0) ? (1) : (-1)
    } else {
        cardWidth=300*cardSide
        cardHeight.left=200
        cardHeight.right=200
        flipping=false
    }
    let colorDiff= 255-(300-Math.abs(cardWidth))/7
    cardColor="rgb("+colorDiff+","+colorDiff+","+colorDiff+")"
}

function monitor(variables) {
    text(variables)
}

//localStorage.setItem("save"+currentsave.toString())