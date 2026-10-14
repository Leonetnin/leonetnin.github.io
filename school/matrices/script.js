function solve() {
    document.getElementById("errformat").hidden=true
    document.getElementById("steps").innerText=""
    let input = document.getElementById("inp").value.split("\n")
    let first = [{x:0,y:0,z:0,r:0},{x:0,y:0,z:0,r:0},{x:0,y:0,z:0,r:0}]
    for (let i=0; i<3; i++){
        let equ = input[i].split("=")
        let terms = equ[0].replaceAll("-","+-").split("+").filter(term => term!="")
        if (equ.length!=2){
            invalid("använd exakt ett lika med tecken",i+1)
            return null
        }
        if (equ[1]!=equ[1].split('').filter(char => /[0-9]|\.|-/.test(char)).join('') || equ[1].indexOf("-")>0){
            invalid("resultatet får bara vara ett tal",i+1)
            return null
        }
        if (terms.length!=3){
            invalid("fel antal termer",i+1)
            return null
        }
        first[i]["r"]=+equ[1]
        for(let j=0; j<terms.length; j++){
            let unknown=terms[j].split('').filter(char => /[a-zA-Z]/.test(char)).join("").toLowerCase()
            if (["x","y","z"].includes(unknown)){
                first[i][unknown]=["-",""].includes(terms[j].split(unknown)[0])?(1*(terms[j].includes("-")*-2+1)):terms[j].split(unknown)[0]
            } else if (unknown!=""){
                invalid("använd endast x, y och z")
            }
        }
    }

    addStep(snygg(first))

    let factor = first[2]["x"]/first[0]["x"]
    first[2]["x"]=0
    first[2]["y"]-=factor*first[0]["y"]
    first[2]["z"]-=factor*first[0]["z"]
    first[2]["r"]-=factor*first[0]["r"]

    addStep(snygg(first))

    factor = first[1]["x"]/first[0]["x"]
    first[1]["x"]=0
    first[1]["y"]-=factor*first[0]["y"]
    first[1]["z"]-=factor*first[0]["z"]
    first[1]["r"]-=factor*first[0]["r"]

    addStep(snygg(first))

    factor = first[2]["y"]/first[1]["y"]
    first[2]["y"]=0
    first[2]["z"]-=factor*first[1]["z"]
    first[2]["r"]-=factor*first[1]["r"]

    addStep(snygg(first))

    let Z = first[2]["r"]/first[2]["z"]

    let Y = (first[1]["r"]-Z*first[1]["z"])/first[1]["y"]
    let X = (first[0]["r"]-Z*first[0]["z"]-Y*first[0]["y"])/first[0]["x"]

    first[2]["r"]/=first[2]["z"]
    first[2]["z"]=1

    addStep(snygg(first))

    first[1]["r"]-=first[2]["r"]*first[1]["z"]
    first[1]["z"]=0

    addStep(snygg(first))


    addStep("Svar:\nX: "+X+", Y: "+Y+", Z: "+Z)


}

function invalid(msg, row){
    document.getElementById("errformat").innerText="Ogiltigt format"+(row!=null?(" på rad "+row):"")+(msg!=null?(": "+msg):"")
    document.getElementById("errformat").hidden=false
}

function snygg(input) {
    let output = ""
    for (let i=0; i<input.length; i++){
        for (let j=0; j<Object.values(input[i]).length; j++) {
            output += "| "+Object.values(input[i])[j]+" |"
        }
        output+="\n"
    }
    return output
}

function addStep(text) {
    document.getElementById("steps").innerText+=text+"\n"

}