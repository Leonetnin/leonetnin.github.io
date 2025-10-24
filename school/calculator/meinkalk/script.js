let theButtons = ["(", "%", "CE", "C", "Delete", ")", "1/X", "X^2", "√", "/", "place", "7", "8", "9", "*", "place", "4", "5", "6", "-", "place", "1", "2", "3", "+", "place", "+/-", "0", ".", "="]
let userInput = ""
let buttonReplacements = { "Delete": "userInput=userInput.substring(0,userInput.length-1)", "C": "userInput=''", "sqrt(x)": "userInput+=Math.sqrt(", "=": "eval('userInput='+userInput)" }
let distance = 0
let color = "black"
let colorOffset = 0
let buttonDimensions = [H / 7, H / 7]
let memory = []
let columns = 5
update = () => {
    clear()
    drawButtons(theButtons)
    drawResult()
    //Current inputting field
    text(userInput, W / 2, 50, 24, "white")
    //Little above text thing
    text()
}

function drawResult() {
    distance = mouseDistance(W / 2 - buttonDimensions[0] * 2 + buttonDimensions[0] * 2, buttonDimensions[1] / 2)
    colorOffset = 0
    if (distance < 200) {
        colorOffset = (200 - distance) / 10
    }
    color = rgb(15 + colorOffset, 23 + colorOffset, 56 + colorOffset)
    rectangle(W / 2 - buttonDimensions[0] * columns / 2, 0, buttonDimensions[0] * 5, buttonDimensions[1], color)
}
function drawButtons(buttons) {
    for (let i = 0; i < buttons.length; i++) {
        let x = W / 2 + (i % columns - columns / 2) * buttonDimensions[0]
        let y = (Math.floor(i / 5) + 1) * buttonDimensions[1]
        distance = mouseDistance(x + buttonDimensions[0] / 2, y + buttonDimensions[1] / 2)
        colorOffset = 0
        if (distance < 200) {
            colorOffset = (200 - distance) / 10
        }
        color = rgb(20 + colorOffset, 28 + colorOffset, 61 + colorOffset)
        rectangle(W / 2 - buttonDimensions[0] * 2, 0, buttonDimensions[0] * 4, buttonDimensions[1], color)
        button(buttons[i], x, y, function () { buttonClick(buttons[i]) }, buttonDimensions[0], buttonDimensions[1], color, "white", "white", buttonDimensions[0] / 3 - 2, 0)
    }
}
function buttonClick(button) {

    switch (button) {
        case "C":
            userInput = ""
            return null
        case "CE":
            userInput = ""
            return null
        case "Delete":
            userInput = userInput.substring(0, userInput.length - 1)
            return null
        case "√":
            userInput += "√("
            return null
        case "(":
            userInput += "("
            return null
        case ")":
            userInput += ")"
            return null
    }
    if (!(button == "-") && !numbers.includes(button) && !numbers.includes(userInput.charAt(userInput.length - 1)) && !(userInput.charAt(userInput.length - 1) == "%") && !(userInput.charAt(userInput.length - 1) == ")")) {
        return null
    }
    switch (button) {
        case "=":
            if (!(userInput.charAt(userInput.length - 1) == "." && !numbers.includes(userInput.charAt(userInput.length - 2)))) {
                userInput = calculate(userInput)
            }
            break
        case "X^2":
            userInput += "^2"
            break
        case "1/X":
            userInput = "1/" + userInput
            break
        case "+/-":
            if (userInput.charAt(0) == "-") {
                userInput = userInput.substring(1, userInput.length)
            } else {
                userInput = "-" + userInput
            }
            break
        case "-":
            if (userInput.charAt(userInput.length - 1) == "-" && userInput.charAt(userInput.length - 2) == "-") {
                return null
            }
            userInput += "-"
            break
        case ".":
            if (userInput.charAt(userInput.length - 1) == ".") {
                return null
            }
            userInput += "."
            break
        default:
            userInput += button
            break

    }
}

let prio_order = ["%", "^", "*", "/", "+", "-"]
let numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."]
function calculate(input = "1+5*3") {
    if (typeof (input) != "string" || input == "") {
        return ""
    }
    let expression = input.replace(/\g+/s, "").split("")
    for (let i = 0; i < expression.length; i++) {
        if (i == 0 && expression[i] == "-") {
            expression[i] += expression[i + 1];
            expression.splice(i + 1, 1);
        }
        if (expression[i] == "(") {
            while (expression[i] != ")") {
                expression[i] += expression[i + 1];
                expression.splice(i + 1, 1);
            }
            alert(expression)
            expression[i] = calculate(expression[i].substring(1, expression[i].length - 2))
        }
        if (numbers.includes(expression[i].charAt(expression[i].length - 1)) || (expression[i] == "-" && !numbers.includes(expression[i - 1].charAt(0)))) {
            while (numbers.includes(expression[i + 1])) {
                expression[i] += expression[i + 1];
                expression.splice(i + 1, 1);
            }
        }
    }
    for (let i = 0; i < prio_order.length; i++) {
        let operatorIndex = expression.indexOf(prio_order[i]);
        while (operatorIndex != -1) {
            if (prio_order[i] == "%") {
                expression[operatorIndex - 1] = expression[operatorIndex - 1] / 100
                expression.splice(operatorIndex, 1)
                if (numbers.includes(expression[operatorIndex].charAt(0))) {
                    expression[operatorIndex - 1] = calculateShort(expression[operatorIndex - 1], expression[operatorIndex], "");
                    expression.splice(operatorIndex, 1)
                }
            } else {
                expression[operatorIndex - 1] = calculateShort(expression[operatorIndex - 1], expression[operatorIndex + 1], prio_order[i]);
                expression.splice(operatorIndex, 2)
            }
            operatorIndex = expression.indexOf(prio_order[i])
        }
    }
    while (expression.length > 1) {
        expression[0] = calculateShort(expression[0], expression[1], "")
    }
    return expression[0].toString()
}

function calculateShort(a, b, operator) {
    a = (parseInt(a).toString == a) ? (parseInt(a)) : parseFloat(a)
    b = (parseInt(b).toString == b) ? (parseInt(b)) : parseFloat(b)
    memory = [b, operator]
    switch (operator) {
        case "+":
            return a + b
        case "-":
            return a - b
        case "*":
            return a * b
        case "/":
            return a / b
        case "^":
            return a ** b
        case "":
            return a * b
        default:
            console.log("Operator not found")
            break
    }
}