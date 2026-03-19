let students=JSON.parse(await read("studentdata.json"))["classes"]["TE24a"]
const scrolldiv = document.getElementsByClassName("names")[0]
const list = document.getElementById("list")
let studentsort = Object.keys(students).sort(function(a,b){return (+students[a].personnummer.slice(4)) - (+students[b].personnummer.slice(4))})
const months = ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December", "Noeluari"]

let lowest = [1000,""]
let today = new Date
let todaydays=(today.getMonth()+1)*31+today.getDate()
for (let i=0; i<Object.keys(students).length;i++){
    let nummer=students[Object.keys(students)[i]].personnummer.toString()
    let date=Number(nummer.substring(4,6))*31+Number(nummer.substring(6,8))
    if (date>todaydays && date<lowest[0]){
        lowest=[date,Object.keys(students)[i]]
    }
}

let person = studentsort.indexOf(lowest[1])


for (let j=0; j<3; j++) {
    for (let i=0; i<studentsort.length;i++){
        const li = document.createElement("li")
        li.innerText= studentsort[i]
        list.appendChild(li)
    }
}

updateBirth()
let _scrollY = scrolldiv.scrollHeight/3/studentsort.length*(person)+scrolldiv.scrollHeight/3-15-person-window.innerHeight/2.3+50
scrolldiv.scrollTo(0, _scrollY)


document.addEventListener("keydown", (e)=>{
    if (e.key=="ArrowUp") {
        person-=1
        if (person<0) {
            person+=studentsort.length
        }
    } else if (e.key=="ArrowDown") {
        person+=1
        if (person>21) {
            person-=studentsort.length
        }
    } else {
        return null
    }
    updateBirth()
    
    _scrollY = scrolldiv.scrollHeight/3/studentsort.length*(person)+scrolldiv.scrollHeight/3-15-person-window.innerHeight/2.3+50
    scrolldiv.scrollTo(0, _scrollY)
    //document.getElementsByTagName("h1")[0].innerText=scrolldiv.scrollTop+","+scrolldiv.scrollHeight+", "+_scrollY
})

document.getElementsByClassName("names")[0].onscroll = ()=>{
    //scrolldiv.scrollTop+=scrolldiv.scrollHeight/studentsort.length
}

function updateBirth() {
    let studentName = studentsort[person]
    let studentBirth = students[studentName].personnummer
    let currentTime = new Date(today.getFullYear(),studentBirth.toString().substring(4,6)-1,studentBirth.toString().substring(6,8))
    let dagar = Math.ceil((currentTime.getTime()-today.getTime())/86400000)
    let year = (today.getFullYear()-Number(studentBirth.toString().substring(0,4)))
    
    if (dagar<0) {
        year+=1
        dagar+=365
    }
    
    document.getElementById("scrid").innerHTML=studentName+" fyller "+ year + " år om "+dagar+" dagar<br>" + (students[studentName].kön=="m"?"Hans":"Hennes") + " födelsedag är den "+(+studentBirth.substring(6, 8)) +" "+ months[+studentBirth.substring(4, 6)-1]
    for (let i=0; i<list.children.length;i++) {
        list.children[i].style="color: grey;"
    }
    list.children[person+22].style="text-decoration: underline;"
}