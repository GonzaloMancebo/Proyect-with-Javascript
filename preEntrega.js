let currentNumber = '';
let firstNumber = '';
let operator = '';

function appendNumber(number) {
    currentNumber += number;
    document.getElementById('result').textContent = currentNumber;
}

function operate(op) {
    if (currentNumber !== '') {
        if (firstNumber === '') {
            firstNumber = currentNumber;
            currentNumber = '';
        } else {
            calculate();
        }
        operator = op;
    }
}

function calculate() {
    let result;
    switch (operator) {
        case '+':
            result = parseFloat(firstNumber) + parseFloat(currentNumber);
            break;
        case '-':
            result = parseFloat(firstNumber) - parseFloat(currentNumber);
            break;
        case '*':
            result = parseFloat(firstNumber) * parseFloat(currentNumber);
            break;
        case '/':
            if (parseFloat(currentNumber) !== 0) {
                result = parseFloat(firstNumber) / parseFloat(currentNumber);
            } else {
                result = 'Error';
            }
            break;
    }
    document.getElementById('result').textContent = result;
    currentNumber = result.toString();
    firstNumber = '';
    operator = '';
}

function clearResult() {
    currentNumber = '';
    firstNumber = '';
    operator = '';
    document.getElementById('result').textContent = '0';
}