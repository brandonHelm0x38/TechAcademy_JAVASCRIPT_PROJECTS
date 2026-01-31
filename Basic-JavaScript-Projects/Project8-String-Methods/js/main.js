// Function to demonstrate concatenation...
function concatMethod() {
    var part1 = "Hello, ";
    var part2 = "welcome to the world ";
    var part3 = "of JavaScript ";
    var part4 = "string methods.";
    var wholeSentence = part1.concat(part2, part3, part4);
    document.getElementById("Concatenated_Text").innerHTML = wholeSentence;
}

// Function to demonstrate slice method...
function sliceMethod() {
    var str = "Hello, welcome to the world of JavaScript string methods.";
    var slicedStr = str.slice(7, 27); // Extracts "welcome to the world"
    document.getElementById("Sliced_Text").innerHTML = slicedStr;
}

// Example of toUpperCase and toLowerCase methods...
var originalString = "JavaScript String Methods";
function toUpperCaseMethod() {
    var upperCaseString = originalString.toUpperCase();
    document.getElementById("Case_Changing_Text").innerHTML = upperCaseString;
}
function toLowerCaseMethod() {
    var lowerCaseString = originalString.toLowerCase();
    document.getElementById("Case_Changing_Text").innerHTML = lowerCaseString;
}

// Convert a number to a string using toString() method...
var num = 123;
function toStringMethod() {
    var numAsString = num.toString();
    document.getElementById("Number_As_String").innerHTML = numAsString;
}

// Format a number to a fixed number of decimal places using toFixed() method...
var floatNum = 45.6789;
function toFixedMethod() {
    var fixedNum = floatNum.toFixed(2); // Formats to 2 decimal places
    document.getElementById("Fixed_Number").innerHTML = fixedNum;
}

// Format a number to a specific precision using toPrecision() method...
var preciseNum = 123.456789;
function toPrecisionMethod() {
    var precise = preciseNum.toPrecision(4); // Formats to 4 significant digits
    document.getElementById("Precise_Number").innerHTML = precise;
}

// Example of valueOf() method...
var sampleString = new String("This is a sample string.");
function valueOfMethod() {
    var value = sampleString.valueOf();
    document.getElementById("Value_Of_Text").innerHTML = value;
}