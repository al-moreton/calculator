const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-clear]');
const display = document.querySelector('.display');
const result = document.querySelector('.result');

let currentNumber = '';
let prevNumber = '';
let operation = '';
let formula = '';
let computedResult = '';

function add(a, b) {
    computedResult = a + b;
}

function subtract(a, b) {
    computedResult = a - b;
}

function multiply(a, b) {
    computedResult = a * b;
}

function divide(a, b) {
    computedResult = a / b;
}

function operate() {
    first = parseFloat(prevNumber);
    second = parseFloat(currentNumber);
    switch (operation) {
        case '+':
            add(first, second);
            break;
        case '-':
            subtract(first, second);
            break;
        case '*':
            multiply(first, second);
            break;
        case '/':
            divide(first, second);
            break;
        default:
            return;
    }
    prevNumber = computedResult;
    operation = '';
    currentNumber = '';
}

function getNumber(digit) {
    currentNumber += digit;
}

function updateDisplay() {
    formula = prevNumber + operation + currentNumber;
    display.textContent = formula;
}

function chooseOperator(digit) {
    operation = digit;
    if (!currentNumber) {
        return;
    } else {
        prevNumber = currentNumber;
        currentNumber = '';
    }
}

function deleteLastDigit() {
    currentNumber = currentNumber.toString().slice(0, -1)
}

numberButtons.forEach(function (button) {
    button.addEventListener('click', (e) => {
        getNumber(e.target.value);
        updateDisplay();
    })
})

operatorButtons.forEach(function (button) {
    button.addEventListener('click', (e) => {
        if (operation) {
            operate();
            chooseOperator(e.target.value);
            updateDisplay();
        } else {
            chooseOperator(e.target.value);
        }
        updateDisplay();
    })
})

equalsButton.addEventListener('click', function (e) {
    operate();
    updateDisplay();
})

deleteButton.addEventListener('click', function (e) {
    deleteLastDigit();
    updateDisplay();
})

clearButton.addEventListener('click', function (e) {
    prevNumber = '';
    currentNumber = '';
    operation = '';
    updateDisplay();
})

// after pressing =, should not be able to add more numbers until another operator is assigned