let replacements = {
    bold: "b",
    italic: "i",
    link: "a"
}

function format(type) {
    let textarea = document.getElementById("body")
    let start = textarea.selectionStart
    let end = textarea.selectionEnd
    textarea.value = `${textarea.value.substring(0, start)}<${replacements[type]}>${textarea.value.substring(start, end)}</${replacements[type]}>${textarea.value.substring(end, textarea.value.length)}`
    textarea.focus()
    textarea.selectionEnd = end + replacements[type].length + 2
}

document.getElementById("submit").onclick = () => {
    window.open("preview/index.html?data="+btoa(document.getElementById("body").value))
}