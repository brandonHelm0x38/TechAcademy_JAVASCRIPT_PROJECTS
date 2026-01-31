// Functionality to demonstrate addition operator and dynamic HTML content change...
function addition() {
    var var1 = 10;
    var var2 = 15;
    var sum = var1 + var2;
    document.getElementById("Addition").innerHTML = "The sum of " + var1 + " and " + var2 + " is: " + sum;
}
function resetAdditionText() {
    document.getElementById("Addition").innerHTML = "Hover to see Addition in action...";
}

// Functionality to demonstrate subtraction operator and dynamic HTML content change...
function subtraction() {
    var var1 = 10;
    var var2 = 15;
    var difference = var1 - var2;
    document.getElementById("Subtraction").innerHTML = "The difference between " + var1 + " and " + var2 + " is: " + difference;
}
function resetSubtractionText() {
    document.getElementById("Subtraction").innerHTML = "Hover to see Subtraction in action...";
}

// Functionality to demonstrate multiplication operator and dynamic HTML content change...
function multiplication() {
    var var1 = 6;
    var var2 = 8;
    var product = var1 * var2;
    document.getElementById("Multiplication").innerHTML = "The product of " + var1 + " and " + var2 + " is: " + product;
}
function resetMultiplicationText() {
    document.getElementById("Multiplication").innerHTML = "Hover to see Multiplication in action...";
}

// Functionality to demonstrate division operator and dynamic HTML content change...
function division() {
    var var1 = 48;
    var var2 = 6;
    var quotient = var1 / var2;
    document.getElementById("Division").innerHTML = "The quotient of " + var1 + " and " + var2 + " is: " + quotient;
}
function resetDivisionText() {
    document.getElementById("Division").innerHTML = "Hover to see Division in action...";
}

// Functionality to demonstrate modulus operator and dynamic HTML content change...
function modulus() {
    var var1 = 29;
    var var2 = 5;
    var remainder = var1 % var2;
    document.getElementById("Modulus").innerHTML = "The remainder when " + var1 + " is divided by " + var2 + " is: " + remainder;
}
function resetModulusText() {
    document.getElementById("Modulus").innerHTML = "Hover to see Modulus in action...";
}

// Functionality to demonstrate complex math expression and dynamic HTML content change...
function complexMath() {
    var result = (10 + 5) * 3 / 2 - 4 % 3;
    document.getElementById("Complex_Math").innerHTML = "The result of the expression (10 + 5) * 3 / 2 - 4 % 3 is: " + result;
}
function resetComplexMathText() {
    document.getElementById("Complex_Math").innerHTML = "Hover to see Complex Math in action...";
}

// Functionality to demonstrate negation operator and dynamic HTML content change...
function negation() {
    var x = 10;
    document.getElementById("Negation").innerHTML = "The negation of " + x + " is: " + -x;
}
function resetNegationText() {
    document.getElementById("Negation").innerHTML = "Hover to see Negation in action...";
}

// Functionality to demonstrate increment operator and dynamic HTML content change with running count...
let incrementCount = 0;
let x = 0;
function increment() {
    x++;
    incrementCount++;
    document.getElementById("Increment").innerHTML =
        "After incrementing, the value is: " + x +
        "<br>Interacted with: " + incrementCount + (incrementCount === 1 ? " time" : " times");
}
function resetIncrementText() {
    document.getElementById("Increment").innerHTML =
        "Hover to see Increment in action..." +
        "<br>Interacted with: " + incrementCount + (incrementCount === 1 ? " time" : " times");
}

// Functionality to demonstrate increment operator and dynamic HTML content change with running count...
let decrementCount = 0;
let start100 = 100;
function decrement() {
    start100--;
    decrementCount++;
    document.getElementById("Decrement").innerHTML =
        "After decrementing, the value is: " + start100 +
        "<br>Interacted with: " + decrementCount + (decrementCount === 1 ? " time" : " times");
}
function resetDecrementText() {
    document.getElementById("Decrement").innerHTML =
        "Hover to see Decrement in action..." +
        "<br>Interacted with: " + decrementCount + (decrementCount === 1 ? " time" : " times");
}

// Functionality to demonstrate random number generation and dynamic HTML content change...
function randomNumber(range) {
    var randNum = Math.random() * range;
    document.getElementById("Random_Number").innerHTML = "A random number between 0 and " + range + " is now " + randNum;
}
function resetRandomNumberText(range) {
    document.getElementById("Random_Number").innerHTML = "Hover to see a random number between 0 and " + range + " ...";
}

// Functionality to demonstrate rounding and dynamic HTML content change...
function roundNumber(num) {
    var rounded = Math.round(num);
    document.getElementById("Round_Number").innerHTML = "The number " + num + " rounded is " + rounded;
}
function resetRoundNumberText(num) {
    document.getElementById("Round_Number").innerHTML = "Hover to see rounding of " + num + " ...";
}

// Functionality to demonstrate power/exponent operator and dynamic HTML content change...
function powerNumber(base, exponent) {
    var powered = Math.pow(base, exponent);
    document.getElementById("Power_Number").innerHTML = base + " raised to the power of " + exponent + " is " + powered;
}
function resetPowerNumberText(base, exponent) {
    document.getElementById("Power_Number").innerHTML = "Hover to see " + base + " raised to the power of " + exponent + " ...";
}

// Functionality to demonstrate square root calculation and dynamic HTML content change...
function squareRootNumber(num) {
    var sqrt = Math.sqrt(num);
    document.getElementById("Square_Root").innerHTML = "The square root of " + num + " is " + sqrt;
}
function resetSquareRootText(num) {
    document.getElementById("Square_Root").innerHTML = "Hover to see the square root of " + num + " ...";
}

// Functionality to demonstrate absolute value calculation and dynamic HTML content change...
function absoluteValueNumber(num) {
    var absVal = Math.abs(num);
    document.getElementById("Absolute_Value").innerHTML = "The absolute value of " + num + " is " + absVal;
}
function resetAbsoluteValueText(num) {
    document.getElementById("Absolute_Value").innerHTML = "Hover to see the absolute value of " + num + " ...";
}

// Functionality to demonstrate floor calculation and dynamic HTML content change...
function floorNumber(num) {
    var floored = Math.floor(num);
    document.getElementById("Floor_Number").innerHTML = "The floor of " + num + " is " + floored;
}
function resetFloorNumberText(num) {
    document.getElementById("Floor_Number").innerHTML = "Hover to see the floor of " + num + " ...";
}

// Functionality to demonstrate ceiling calculation and dynamic HTML content change...
function ceilingNumber(num) {
    var ceiled = Math.ceil(num);
    document.getElementById("Ceiling_Number").innerHTML = "The ceiling of " + num + " is " + ceiled;
}
function resetCeilingNumberText(num) {
    document.getElementById("Ceiling_Number").innerHTML = "Hover to see the ceiling of " + num + " ...";
}

// Functionality to demonstrate sine calculation and dynamic HTML content change...
function sineNumber(degrees) {
    var radians = degrees * (Math.PI / 180);
    var sineVal = Math.sin(radians);
    document.getElementById("Sine_Number").innerHTML = "The sine of " + degrees + " degrees is " + sineVal;
}
function resetSineNumberText(degrees) {
    document.getElementById("Sine_Number").innerHTML = "Hover to see the sine of " + degrees + " degrees ...";
}

// Functionality to demonstrate cosine calculation and dynamic HTML content change...
function cosineNumber(degrees) {
    var radians = degrees * (Math.PI / 180);
    var cosineVal = Math.cos(radians);
    document.getElementById("Cosine_Number").innerHTML = "The cosine of " + degrees + " degrees is " + cosineVal;
}
function resetCosineNumberText(degrees) {
    document.getElementById("Cosine_Number").innerHTML = "Hover to see the cosine of " + degrees + " degrees ...";
}

// Functionality to demonstrate tangent calculation and dynamic HTML content change...
function tangentNumber(degrees) {
    var radians = degrees * (Math.PI / 180);
    var tangentVal = Math.tan(radians);
    document.getElementById("Tangent_Number").innerHTML = "The tangent of " + degrees + " degrees is " + tangentVal;
}
function resetTangentNumberText(degrees) {
    document.getElementById("Tangent_Number").innerHTML = "Hover to see the tangent of " + degrees + " degrees ...";
}

// Functionality to demonstrate logarithm calculation and dynamic HTML content change...
function logarithmNumber(num) {
    var logVal = Math.log(num);
    document.getElementById("Logarithm_Number").innerHTML = "The natural logarithm of " + num + " is " + logVal;
}
function resetLogarithmNumberText(num) {
    document.getElementById("Logarithm_Number").innerHTML = "Hover to see the natural logarithm of " + num + " ...";
}

// Functionality to demonstrate exponential calculation and dynamic HTML content change...
function exponentialNumber(num) {
    var expVal = Math.exp(num);
    document.getElementById("Exponential_Number").innerHTML = "The exponential of " + num + " is " + expVal;
}
function resetExponentialNumberText(num) {
    document.getElementById("Exponential_Number").innerHTML = "Hover to see the exponential of " + num + " ...";
}

// Functionality to demonstrate PI constant and dynamic HTML content change...
function displayPI() {
    document.getElementById("Pi_Value").innerHTML = "The value of PI is approximately " + Math.PI;
}
function resetPiValueText() {
    document.getElementById("Pi_Value").innerHTML = "Hover to see the value of PI ...";
}

// Functionality to demonstrate Euler's number and dynamic HTML content change...
function displayE() {
    document.getElementById("E_Value").innerHTML = "The value of Euler's number e is approximately " + Math.E;
}
function resetEValueText() {
    document.getElementById("E_Value").innerHTML = "Hover to see the value of Euler's number e ...";
}

// Format a number to a fixed number of decimal places using toFixed() method...
var floatNum = 45.6789;
function toFixedMethod() {
    var fixedNum = floatNum.toFixed(2); // Formats to 2 decimal places
    document.getElementById("Fixed_Number").innerHTML = fixedNum;
}
function resetFixedNumberText() {
    document.getElementById("Fixed_Number").innerHTML = "Hover to see " + floatNum + " formatted to 2 decimal places...";
}

// Format a number to a specific precision using toPrecision() method...
var preciseNum = 123.456789;
function toPrecisionMethod() {
    var precise = preciseNum.toPrecision(4); // Formats to 4 significant digits
    document.getElementById("Precise_Number").innerHTML = precise;
}
function resetPreciseNumberText() {
    document.getElementById("Precise_Number").innerHTML = "Hover to see " + preciseNum + " formatted to 4 significant digits...";
}