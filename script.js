const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-clear]');
const display = document.querySelector('.display');
const result = document.querySelector('.result');

let currentNumber = '';
let prevNumber = '';
let currentOperation = '';
let prevOperation = '';
let prevFormula = '';
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

function percentage(a, b) {
    computedResult = (a / 100) * b;
}

function operate() {
    first = parseFloat(prevNumber);
    second = parseFloat(currentNumber);
    switch (currentOperation) {
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
        case '%':
            percentage(first, second);
            break;
        default:
            return;
    }
    formula = `${prevNumber} ${currentOperation} ${currentNumber}`;
    prevFormula = formula;
    prevNumber = computedResult;
    prevOperation = currentOperation;
    currentOperation = '';
    currentNumber = '';
}

function getNumber(digit) {
    currentNumber += digit;
}

function updateDisplay() {
    result.textContent = currentNumber;

    if (currentOperation) {
        display.textContent = prevNumber + currentOperation;
    } else if (computedResult) {
        display.textContent = prevFormula.toString();
        result.textContent = computedResult;
    } else {
        display.textContent = '';
    }
}

function clear() {
    prevNumber = '';
    currentNumber = '';
    currentOperation = '';
    prevOperation = '';
    computedResult = '';
}

function chooseOperator(digit) {
    if (currentOperation) {
        currentOperation = digit;
        updateDisplay();
    }
    currentOperation = digit;
    if (!currentNumber) {
        return;
    } else {
        prevNumber = currentNumber;
        currentNumber = '';
    }
}

function deleteLastDigit() {
    if (currentNumber) {
        currentNumber = currentNumber.toString().slice(0, -1)
    } else if (!currentNumber) {
        currentOperation = '';
        currentNumber = prevNumber;
        prevNumber = '';
        updateDisplay();
    }
}

numberButtons.forEach(function (button) {
    button.addEventListener('click', (e) => {
        if (prevNumber && computedResult && !currentOperation) {
            clear();
            getNumber(e.target.value);
            updateDisplay();
        } else {
            getNumber(e.target.value);
            updateDisplay();
        }
    })
})

operatorButtons.forEach(function (button) {
    button.addEventListener('click', (e) => {
        if (currentOperation && !currentNumber && e.target.value === '-') {
            currentNumber = '-';
        } else if (currentOperation && !currentNumber) {
            chooseOperator(e.target.value);
            updateDisplay();
        } else if (currentOperation) {
            operate();
            chooseOperator(e.target.value);
            updateDisplay();
        } else if (!currentOperation && !currentNumber) {
            chooseOperator(e.target.value);
            updateDisplay();
        } else if (!currentNumber && e.target.value === '-') {
            currentNumber = '-';
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
    clear();
    updateDisplay();
})

// DONE after pressing =, should not be able to add more numbers until another operator is assigned
// DONE how to move calc above after operator selected
// DONE add % operation 
// % operation to have different possibilities depending on order of input
// DONE delete doesn't work if trying to delete operation, or if just pressed equals
// DONE if selecting operation twice in a row, it should overwrite the existing operation
// DONE allow negative numbers
// DONE if operator is deleted, and another number is added, only the 2nd number added is saved to number variable
// round numbers
// 3 - 3 doesn't work, because 0 is interpreted as !=