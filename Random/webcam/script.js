let video = document.getElementById("cam")
navigator.mediaDevices.getUserMedia({video: true}).then( (stream) => {
    video.srcObject = stream
    video.addEventListener("loadedmetadata", ()=>{
        video.play();
    })
})