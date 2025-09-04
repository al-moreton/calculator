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
    if (b === 0) {
        computedResult = `Error!`;
    } else {
        computedResult = a / b;
    }
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
    computedResult = formatResult(computedResult)
    formula = `${prevNumber} ${currentOperation} ${currentNumber}`;
    prevFormula = formula;
    prevNumber = computedResult;
    prevOperation = currentOperation;
    currentOperation = '';
    currentNumber = '';
}

function getNumber(digit) {
    if (digit === '.' && currentNumber.includes('.')) {
        return;
    }
    if (digit === '-' && currentNumber === '') {
        currentNumber = '-';
        return;
    }
    currentNumber += digit;
}

function updateDisplay() {
    result.textContent = currentNumber;

    if (currentOperation !== '') {
        display.textContent = `${prevNumber} ${currentOperation}`;
    } else if (computedResult !== '') {
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

function formatResult(num) {
    if (typeof num !== 'number') {
        return num;
    }
    return Math.round((num + Number.EPSILON) * 1e12) / 1e12;
}

function normalizeOperator(digit) {
    if (digit === '−') return '-';
    return digit;
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
        const digit = normalizeOperator(e.target.value);

        if (!currentNumber && !prevNumber && digit === '-') {
            currentNumber = '-';
            updateDisplay();
            return;
        }

        if (currentOperation && !currentNumber) {
            chooseOperator(digit);
            updateDisplay();
            return;
        }

        if (currentOperation && currentNumber) {
            operate();
            chooseOperator(digit);
            updateDisplay();
            return;
        }

        chooseOperator(digit);
        updateDisplay();
    });
});

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