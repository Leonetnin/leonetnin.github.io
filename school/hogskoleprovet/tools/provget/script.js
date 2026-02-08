let input=await fetch("test.txt").then((res)=>res.text())
input=input.split("open('").filter((x)=>{return x.startsWith("pdf")})
input.forEach((text, i, arr)=>{arr[i]=arr[i].split("#")[0]})
let p = document.getElementById("data")
let button=document.createElement("button")
button.innerText="download"
button.onclick=()=>{
    for (let i=0; i<input.length; i++){
        fetch("https://allarätt.nu/"+input[i])
        .then(response => response.blob())
        .then(blob => {
                let link= document.createElement("a")
                link.href=URL.createObjectURL(blob)
                link.text=input[i]
                link.download=input[i].slice(4)
                document.body.appendChild(link)
                link.click()
            })
    }
}
document.body.appendChild(button)