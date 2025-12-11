
let playing=false
let audioCtx = new window.AudioContext();
let oscillator= audioCtx.createOscillator();
oscillator.type="square";
oscillator.frequency.value=100;
oscillator.connect(audioCtx.destination);
oscillator.start()
function clicked(){
    if (!playing){
        audioCtx.resume()
    } else {
        audioCtx.suspend()
    }
    playing=!playing
}
function inputChanged(){
    document.getElementById('test').innerHTML=oscillator.frequency.value
    oscillator.frequency.value=+document.getElementById('input').value
}