let currentNumber = '';
let firstNumber = '';
let operator = '';

const userName = prompt("Por favor, ingresa tu nombre:");
alert("¡Bienvenido, " + userName + "!");

console.log("¡Bienvenido, " + userName + "!");

function appendNumber(number) {
    currentNumber += number;
    document.getElementById('result').textContent = currentNumber;
    console.log("Numero seleccionado: " + number); // Mostrar operador en console.log
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
    console.log("Operador seleccionado: " + op); // Mostrar operador en console.log
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

// Event listener para botones numéricos
document.getElementById('numberButton1').addEventListener('click', function() {
    appendNumber('1');
});

document.getElementById('numberButton2').addEventListener('click', function() {
    appendNumber('2');
});

document.getElementById('numberButton3').addEventListener('click', function() {
    appendNumber('3');
});
document.getElementById('numberButton4').addEventListener('click', function() {
    appendNumber('4');
});
document.getElementById('numberButton5').addEventListener('click', function() {
    appendNumber('5');
});
document.getElementById('numberButton6').addEventListener('click', function() {
    appendNumber('6');
});
document.getElementById('numberButton7').addEventListener('click', function() {
    appendNumber('7');
});
document.getElementById('numberButton8').addEventListener('click', function() {
    appendNumber('8');
});
document.getElementById('numberButton9').addEventListener('click', function() {
    appendNumber('9');
});
document.getElementById('numberButton0').addEventListener('click', function() {
    appendNumber('0');
});


document.getElementById('addButton').addEventListener('click', function() {
    console.log("Botón Suma presionado");
    operate('+');
});

document.getElementById('subtractButton').addEventListener('click', function() {
    console.log("Botón Resta presionado");
    operate('-');
});

document.getElementById('multiplyButton').addEventListener('click', function() {
    console.log("Botón Multiplicación presionado");
    operate('*');
});

document.getElementById('divideButton').addEventListener('click', function() {
    console.log("Botón División presionado");
    operate('/');
});

document.getElementById('equalButton').addEventListener('click', function() {
    if (currentNumber === '' || firstNumber === '' || operator === '') {
        alert("Operación incorrecta. Por favor, ingrese números y operadores antes de calcular.");
    } else {
        calculate();
    }
});
