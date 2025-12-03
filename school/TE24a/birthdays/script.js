let students=JSON.parse(await read("studentdata.json"))["classes"]["TE24a"]
let lowest = [1000,""]
let today = new Date
let todaydays=(today.getMonth()+1)*31+today.getDate()
for (let i=0; i<Object.keys(students).length;i++){
    let nummer=students[Object.keys(students)[i]].toString()
    let date=Number(nummer.substring(4,6))*31+Number(nummer.substring(6,8))
    if (date>todaydays && date<lowest[0]){
        lowest=[date,Object.keys(students)[i]]
    }
}
let currentTime=new Date(today.getFullYear(),students[lowest[1]].toString().substring(4,6)-1,students[lowest[1]].toString().substring(6,8))
document.getElementById("scrid").innerHTML=lowest[1]+" fyller "+(today.getFullYear()-Number(students[lowest[1]].toString().substring(0,4))) + " år om "+Math.ceil((currentTime.getTime()-today.getTime())/86400000)+" dagar"