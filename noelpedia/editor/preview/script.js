let text = document.createElement("div")
text.innerText= atob(window.location.search.split("?data=")[1])
document.body.appendChild(text)