let theButtons = ["%", "CE", "C", "Delete", "1/X", "X^2", "sqrt(x)", "/", "7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+", "+/-", "0", ".", "="]
let userInput = ""
let buttonReplacements = { "Delete": "userInput=userInput.substring(0,userInput.length-1)", "C": "userInput=''", "sqrt(x)": "userInput+=Math.sqrt(", "=": "eval('userInput='+userInput)" }
let distance = 0
let color = "black"
let colorOffset = 0
update = () => {
    clear()
    drawButtons(theButtons)
    text(userInput, W / 2, 50, 24, "white")

}
function drawButtons(buttons) {
    for (let i = 0; i < buttons.length; i++) {
        let x = W / 2 - 100 * 2 + i % 4 * 98
        let y = 100 + Math.floor(i / 4) * 98
        distance = mouseDistance(x + 50, y + 50)
        colorOffset = 0
        if (distance < 200) {
            colorOffset = (200 - distance) / 10
        }
        color = rgb(20 + colorOffset, 28 + colorOffset, 61 + colorOffset)
        button(buttons[i], x, y, function () { if (buttonReplacements[buttons[i]] != undefined) { calculate(userInput) } else { userInput += buttons[i] } }, 50, 50, color, "white", "white")
    }
}

let prio_order = ["^", "*", "/", "+", "-"]
let numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
function calculate(input = "1+5*3") {
    let expression = input.replace(/\g+/s, "").split("")
    for (let i = 0; i < expression.length; i++) {
        if (numbers.includes(expression[i])) {
            while (numbers.includes(expression[i + 1])) {
                expression[i] += expression[i + 1];
                expression.splice(i + 1, 1)
            }
        }
    }


}