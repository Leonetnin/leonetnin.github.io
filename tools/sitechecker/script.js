let xml = new XMLHttpRequest();
let url = "https://api.github.com/repos/Leonetnin/leonetnin.github.io/git/trees/main?recursive=1/"
let data=""
let li = document.createElement("li")

xml.open("GET", url, true)

xml.onload = function() {
    data = JSON.parse(this.response);
    for (let i=0; i<data["tree"].length; i++){
        if (data["tree"][i]["path"].endsWith(".html")){
            let link= document.createElement("a")
            link.href="https://noelastrom.se/"+data["tree"][i]["path"].split("index.html").join("")
            link.text=link.href
            document.getElementById("list").appendChild(li.cloneNode()).appendChild(link)
            console.log("https://noelastrom.se/"+data["tree"][i]["path"].split("index.html").join(""))
        }
    }
};

xml.send()