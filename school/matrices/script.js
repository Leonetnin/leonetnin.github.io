function solve() {
    document.getElementById("steps").innerText=""
    let input = document.getElementById("inp").value.split("\n")
    let first = [{x:0,y:0,z:0,r:0},{x:0,y:0,z:0,r:0},{x:0,y:0,z:0,r:0}]
    for (let i=0; i<3; i++){
        let equ = input[i].split("=")
        let terms = equ[0].replaceAll("-","+-").split("+")
        first[i]["r"]=equ[1]
        for(let j=0; j<terms.length; j++){
            let unknown=terms[j].split('').filter(char => /[a-zA-Z]/.test(char)).join("").toLowerCase()
            if (["x","y","z"].includes(unknown)){
                first[i][unknown]=["-",""].includes(terms[j].split(unknown)[0])?1:terms[j].split(unknown)[0]
                document.getElementById("errformat").hidden=true
            } else if (unknown!=""){
                invalid()
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

    factor = first[2]["y"]/first[0]["x"]
    first[2]["y"]=0
    first[2]["z"]-=factor*first[1]["z"]
    first[2]["r"]-=factor*first[1]["r"]

    addStep(snygg(first))

    let Z = first[2]["r"]/first[2]["z"]

    let Y = (first[1]["r"]-Z*first[1]["z"])/first[1]["y"]
    let X = (first[0]["r"]-Z*first[0]["z"]-Y*first[0]["y"])/first[0]["x"]

    addStep("Svar:\nX: "+X+", Y: "+Y+", Z: "+Z)


}

function invalid(){
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