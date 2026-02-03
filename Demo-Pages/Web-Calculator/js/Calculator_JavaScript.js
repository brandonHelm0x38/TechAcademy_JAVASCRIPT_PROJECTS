// Create an object to hold calculator state and methods
const Calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
};

// This modifies values each time a number button is clicked
function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = Calculator;
    // This checks if the calculator is waiting for the second operand, and sets the displayValue to the key that was clicked
    if (waitingForSecondOperand === true) {
        Calculator.displayValue = digit;
        Calculator.waitingForSecondOperand = false;
    } else {
        // This overwrites displayValue if the current value is '0' otherwise it adds to it
        Calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
}

// This handles decimal points
function inputDecimal(dot) {
    // This ensures that there is only one decimal point in the number
    if (Calculator.waitingForSecondOperand === true) return;
    if (!Calculator.displayValue.includes(dot)) {
        Calculator.displayValue += dot;
    }
}

// This handles operators
function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = Calculator;
    // Convert the displayValue string to a floating-point number, and store it in Calculator.firstOperand
    const inputValue = parseFloat(displayValue);
    // This checks if an operator already exists and if the calculator is waiting for the second operand
    if (operator && Calculator.waitingForSecondOperand) {
        Calculator.operator = nextOperator;
        return;
    }
    // This checks if firstOperand is null and if the inputValue is a number
    if (firstOperand == null && !isNaN(inputValue)) {
        Calculator.firstOperand = inputValue;
    } else if (operator) {
        const valueNow = firstOperand || 0;
        // This performs the calculation and updates the displayValue
        let result = performCalculation[operator](valueNow, inputValue);
        // This fixes floating point precision issues
        result = Number(result.toFixed(9));
        // This will remove any trailing zeros
        result = (result * 1).toString();
        Calculator.displayValue = parseFloat(result);
        Calculator.firstOperand = parseFloat(result);
    }
    Calculator.waitingForSecondOperand = true;
    Calculator.operator = nextOperator;
}

// This object maps operators to their corresponding calculation functions
const performCalculation = {
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
    '=': (firstOperand, secondOperand) => secondOperand,
};

// This resets the calculator to its initial state
function resetCalculator() {
    Calculator.displayValue = '0';
    Calculator.firstOperand = null;
    Calculator.waitingForSecondOperand = false;
    Calculator.operator = null;
}

// This updates the calculator display; Makes use of the HTML element with the class name 'calculator-screen' with querySelector
function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = Calculator.displayValue;
}
updateDisplay();

// This adds an event listener to the calculator keys
const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
    // The target varaiable is used to identify which element was clicked
    const { target } = event;
    // If the element that was clicked is not a button, exit the function
    if (!target.matches('button')) {
        return;
    }
    if (target.classList.contains('operator')) {
        handleOperator(target.value);
        updateDisplay();
        return;
    }
    if (target.classList.contains('decimal')) {
        inputDecimal(target.value);
        updateDisplay();
        return;
    }
    if (target.classList.contains('all-clear')) {
        resetCalculator();
        updateDisplay();
        return;
    }
    inputDigit(target.value);
    updateDisplay();
});