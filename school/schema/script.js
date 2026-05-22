Date.prototype.getWeek = function() {
    var date = new Date(this.getTime());
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    var week1 = new Date(date.getFullYear(), 0, 4);
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
}
let studentID = new URLSearchParams(window.location.search)
let datum = new Date()
let selectedWeek = datum.getWeek()

let table = document.getElementsByTagName("tbody")[0]
if (studentID.get("id")) {
    visaSchema(studentID.get("id"))
}

async function visaSchema(id) {   
    let signature = await fetch("https://proxy.corsfix.com/?https://web.skola24.se/api/encrypt/signature", {"headers": {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:150.0) Gecko/20100101 Firefox/150.0","Accept": "application/json, text/javascript, */*; q=0.01","Accept-Language": "en-US,en;q=0.9","Content-Type": "application/json","X-Scope": "8a22163c-8662-4535-9050-bc5e1923df48","X-Requested-With": "XMLHttpRequest","Sec-Fetch-Dest": "empty","Sec-Fetch-Mode": "cors","Sec-Fetch-Site": "same-origin","Priority": "u=0"},"body": "{\"signature\":\""+id+"\"}","method": "POST",}).then(res=>res.json()).then(data => {return data.data.signature})
    let noelSettings = {"renderKey":"","host":"skelleftea.skola24.se","unitGuid":"MWU2MTFmODQtNmVhNC1mNDc1LTg4YTgtMWI5MGM2YTc5MTRh","schoolYear":"ca3b462f-0083-4148-baa0-def0e20d3a0c","startDate":null,"endDate":null,"scheduleDay":0,"blackAndWhite":false,"width":1223,"height":550,"selectionType":4,"selection":signature,"showHeader":false,"periodText":"","week":selectedWeek,"year":2026,"privateFreeTextMode":false,"privateSelectionMode":null,"customerKey":"","personalTimetable":false}
    noelSettings.renderKey = await fetch("https://proxy.corsfix.com/?https://web.skola24.se/api/get/timetable/render/key", {method: "POST",headers: {"X-Scope":"8a22163c-8662-4535-9050-bc5e1923df48"},}).then(res => res.json()).then(data => {return data.data.key})
    let schema = await fetch("https://proxy.corsfix.com/?https://web.skola24.se/api/render/timetable", {method: "POST", body: JSON.stringify(noelSettings), headers: {"Cookie":"ASP.NET_SessionId=coc20xn4tymelx4xo0o1cwzo; s24_tenant=RbgG3Etq4Bll+S9HQhkgNNRKr+t082ZmpPhFeuAanzQ=; TS01fb1e5e=01b91fe1da5f238a19f6d23fb7028cb307a9b1d41347b0f057018a85bd88a4ebd90803cda9fbb0269a550a885becb43c042d3e6e06f5d120143cfb7c8ff50b41488c60e99ce8ce1989333a84b9d8b6d6c6f465e5ad","X-Scope":"8a22163c-8662-4535-9050-bc5e1923df48","Content-Type":"application/json"}}).then(res => res.json()).then(data => {return data.data})
    let lessonInfo= schema["lessonInfo"]
    console.log(schema)
    let colors = {}
    for (let i=0; i<schema.boxList.length; i++) {
        if (schema.boxList[i].lessonGuids){
            colors[schema.boxList[i].lessonGuids]=schema.boxList[i].bColor
        }
    }
    for (let i=0; i<lessonInfo.length; i++) {
        let lessonStart = lessonInfo[i].timeStart.split(":")
        let lessonEnd = lessonInfo[i].timeEnd.split(":")
        let lessonDuration = +lessonEnd[0] - lessonStart[0] + (+lessonEnd[1] - lessonStart[1])/60
        let lesson=document.createElement("div")
        lesson.style.top = ((+lessonStart[0]+lessonStart[1]/60)-8)*table.children[1].offsetHeight/8-1+"px"
        lesson.style.height=lessonDuration*table.children[1].offsetHeight/8-1+"px"
        lesson.style.backgroundColor=colors[lessonInfo[i].guidId]
        lesson.innerHTML=`<p>${lessonInfo[i].timeStart.slice(0,5).replace(/^0/,"")}</p><p>${lessonInfo[i].texts[0]}</p><p>${lessonInfo[i].texts[1]} <span style="float: right;">${lessonInfo[i].texts[2]}</span></p><p>${lessonInfo[i].timeEnd.slice(0,5).replace(/^0/,"")}</p>`
        table.children[1].children[lessonInfo[i]["dayOfWeekNumber"]].appendChild(lesson)
    }
}