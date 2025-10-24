let thing = await read("/school/calculator/msrecreation/script.js")
let kod = document.getElementById("code")

let declarations=["const","let","var","function","true","false","async","null","get","new","class","this","constructor","static","=>"]
let operands=["=","+","/","-",",",";","<",">","!","?",".","&","|","*",""]
let commands=["if","for","return","else","while","do","break","switch","await"]
thing=thing.split("\n")
for (let i=0; i<thing.length;i++){
    if (thing[i].indexOf("//")!=-1){
        thing[i]=thing[i].substring(0,thing[i].indexOf("//"))+"<span style='color:green'>"+thing[i].substring(thing[i].indexOf("//"))+"</span>"
        //thing[i]="<span style='color:green'>"+thing[i]+"</span>"
    }
}
kod.innerHTML=thing.join("\n")