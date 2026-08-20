let currentNumber = "";
let previousNumber = "";
let operator = null;

const currentDisplay = document.getElementById("current");
const previousDisplay = document.getElementById("previous");


function appendNumber(number) {

    if (number === "." && currentNumber.includes(".")) {
        return;
    }

    if (currentNumber === "0" && number !== ".") {
        currentNumber = "";
    }

    currentNumber += number;

    updateDisplay();
}


function chooseOperator(selectedOperator) {

    if (currentNumber === "" && previousNumber === "") {
        return;
    }

    if (currentNumber === "" && operator !== null) {
        operator = selectedOperator;
        return;
    }

    if (previousNumber !== "") {
        calculate();
    }

    previousNumber = currentNumber;
    currentNumber = "";
    operator = selectedOperator;

    updateDisplay();
}


function calculate() {

    if (previousNumber === "" || currentNumber === "" || operator === null) {
        return;
    }

    let previous = parseFloat(previousNumber);
    let current = parseFloat(currentNumber);

    let result;

    switch (operator) {

        case "+":
            result = previous + current;
            break;

        case "-":
            result = previous - current;
            break;

        case "*":
            result = previous * current;
            break;

        case "/":
            if (current === 0) {
                currentDisplay.innerText = "Error";
                previousDisplay.innerText = "Cannot divide by 0";
                resetCalculator();
                return;
            }

            result = previous / current;
            break;
    }

    result = Number(result.toFixed(10));

    currentNumber = result.toString();
    previousNumber = "";
    operator = null;

    updateDisplay();
}


function percentage() {

    if (currentNumber === "") {
        return;
    }

    currentNumber = (parseFloat(currentNumber) / 100).toString();

    updateDisplay();
}


function deleteNumber() {

    currentNumber = currentNumber.slice(0, -1);

    updateDisplay();
}


function clearDisplay() {

    currentNumber = "";
    previousNumber = "";
    operator = null;

    updateDisplay();
}


function resetCalculator() {

    setTimeout(() => {
        currentNumber = "";
        previousNumber = "";
        operator = null;

        updateDisplay();
    }, 1000);
}


function updateDisplay() {

    currentDisplay.innerText = currentNumber || "0";

    if (operator && previousNumber) {

        let symbol = operator;

        if (operator === "*") symbol = "×";
        if (operator === "/") symbol = "÷";

        previousDisplay.innerText =
            `${previousNumber} ${symbol}`;

    } else {
        previousDisplay.innerText = "";
    }
}


// Keyboard Support

document.addEventListener("keydown", function(event) {

    if (
        (event.key >= "0" && event.key <= "9") ||
        event.key === "."
    ) {
        appendNumber(event.key);
    }

    if (
        event.key === "+" ||
        event.key === "-" ||
        event.key === "*" ||
        event.key === "/"
    ) {
        chooseOperator(event.key);
    }

    if (event.key === "Enter" || event.key === "=") {
        calculate();
    }

    if (event.key === "Backspace") {
        deleteNumber();
    }

    if (event.key === "Escape") {
        clearDisplay();
    }

    if (event.key === "%") {
        percentage();
    }

});