let declarations=["const","let","var","function","true","false","async","null","get","new","class","this","constructor","static","=>"]
let operands=["=","+","/","-",",",";","<",">","!","?",".","&","|","*",""]
let commands=["if","for","return","else","while","do","break","switch","await"]

let thing = await read("/school/PROV/julkalender/grid/script.js")
thing=thing.split("\n")
for (let i=0; i<thing.length;i++){
    if (thing[i].indexOf("//")!=-1){
        thing[i]=thing[i].substring(0,thing[i].indexOf("//"))+"<span style='color:green'>"+thing[i].substring(thing[i].indexOf("//"))+"</span>"
        //thing[i]="<span style='color:green'>"+thing[i]+"</span>"
    }
}
document.getElementById("grid").innerHTML=thing.join("\n")

thing = await read("/school/PROV/julkalender/random/script.js")
thing=thing.split("\n")
for (let i=0; i<thing.length;i++){
    if (thing[i].indexOf("//")!=-1){
        thing[i]=thing[i].substring(0,thing[i].indexOf("//"))+"<span style='color:green'>"+thing[i].substring(thing[i].indexOf("//"))+"</span>"
        //thing[i]="<span style='color:green'>"+thing[i]+"</span>"
    }
}
document.getElementById("random").innerHTML=thing.join("\n")