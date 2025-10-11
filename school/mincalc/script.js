let theButtons = ["%", "CE", "C", "Delete", "1/X", "X^2", "sqrt(x)", "/", "7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+", "+/-", "0", ".", "="]
let userInput = ""
update = () => {
    clear()
    drawButtons(theButtons)
    text(userInput, W / 2, 50, 24, "white")
}
function drawButtons(buttons) {
    for (let i = 0; i < buttons.length; i++) {
        button(buttons[i], W / 2 - 100 * 2 + i % 4 * 98, 100 + Math.floor(i / 4) * 98, function () { if (buttons[i]=="=") { eval("userInput="+userInput) } else { userInput += buttons[i] } }, 50, 50,"rgb(0,28,60)", "white","white")
    }
}