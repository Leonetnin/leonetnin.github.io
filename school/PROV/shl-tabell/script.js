let shldata;

let lagfront = {
    "SKE":"<div class='lag'><img src='logos/aik.png'><label><input type='checkbox'></label><p>SKE</p></div>",
    "FHC":"<div class='lag'><img src='logos/fhc.png'><label><input type='checkbox'></label><p>FHC</p></div>"
}

let laginfo = {
    "SKE":"<div class='laginfo'><img src='logos/aik.png'><p>Skellefteå AIK</p><p id='pointske'></p></div>",
    "FHC":"<div class='laginfo'><img src='logos/fhc.png'><p>Frölunda HC</p><p id='pointfhc'></p></div>"
}

function getdata() {
    fetch('shldata.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();  
        })
        .then(data => {shldata=data; loaded()})  
        .catch(error => console.error('Failed to fetch data:', error)); 
}
getdata()


const rows = document.getElementsByTagName("td")
function loaded() {
    const lag = Object.keys(shldata)
    let first = ""
    if (shldata[lag[0]].points>shldata[lag[1]].points){
        first="SKE"
    } else {
        if (shldata[lag[0]].points==shldata[lag[1]].points) {
            if (shldata[lag[0]].diff>shldata[lag[1]].diff) {
                first="SKE"
            } else {
                first="FHC"
            }
        } else {
            first="FHC"
        }
    }
    rows[1].innerHTML=lagfront[first]
    rows[2].innerHTML=shldata[first].diff
    rows[3].innerHTML=shldata[first].points
    rows[6].innerHTML=lagfront[lag[Math.abs(lag.indexOf(first)-1)]]
    rows[7].innerHTML=shldata[lag[Math.abs(lag.indexOf(first)-1)]].diff
    rows[8].innerHTML=shldata[lag[Math.abs(lag.indexOf(first)-1)]].points
    //Info boxes
    rows[4].innerHTML=laginfo[first]
    rows[9].innerHTML=laginfo[lag[Math.abs(lag.indexOf(first)-1)]]
    document.getElementById("pointfhc").innerText=rows[8].innerHTML+ "p"
    document.getElementById("pointske").innerText=rows[3].innerHTML+ "p"

}

rows[2].onblur=()=>{
    shldata[rows[1].innerText].diff=rows[2].innerText
    loaded()
}
rows[3].onblur=()=>{
    shldata[rows[1].innerText].points=rows[3].innerText
    loaded()
}

rows[7].onblur=()=>{
    shldata[rows[6].innerText].diff=rows[7].innerText
    loaded()
}
rows[8].onblur=()=>{
    shldata[rows[6].innerText].points=rows[8].innerText
    loaded()
}

