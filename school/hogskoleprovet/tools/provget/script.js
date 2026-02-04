let input=await fetch("test.txt").then((res)=>res.text())
input=input.split("open('").filter((x)=>{return x.startsWith("pdf")})
input.forEach((text, i, arr)=>{arr[i]=arr[i].split("#")[0]})
let p = document.getElementById("data")
for (let i=0; i<input.length; i++){
    let link= document.createElement("a")
    link.href="https://allarätt.nu/"+input[i]
    link.text=input[i]
    document.body.appendChild(link)
}
