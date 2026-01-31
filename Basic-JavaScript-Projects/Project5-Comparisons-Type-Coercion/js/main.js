// An example of JavaScript's type coercion in action...
var coercedSum = "5" + 10; // The number 10 is coerced into a string and concatenated
document.write("The result of '5' + 10 is: " + coercedSum + "<br>");
var coercedSum2 = 5 + "10"; // The number 10 is coerced into a string and concatenated
document.write("The result of 5 + '10' is: " + coercedSum2);
document.write("<br><br>");

// Set of variables which hold the 7 different JavaScript data types...
var myString = "This is a string."; // String
var myNumber = 42;
var myBoolean = true; // Boolean
var myUndefined; // Undefined
var myNull = null;
var myObject = {name: "Alice", age: 30}; // Object
var mySymbol = Symbol("mySymbol");
document.write("Data Types Examples:" + "<br>");
document.write(typeof myString + "<br>");
document.write("String: " + myString + "<br>");
document.write(typeof myNumber + "<br>");
document.write("Number: " + myNumber + "<br>");
document.write(typeof myBoolean + "<br>");
document.write("Boolean: " + myBoolean + "<br>");
document.write(typeof myUndefined + "<br>");
document.write("Undefined: " + myUndefined + "<br>");
document.write(typeof myNull + "<br>");
document.write("Null: " + myNull + "<br>");
document.write(typeof myObject + "<br>");
document.write("Object: " + JSON.stringify(myObject) + "<br>");
document.write(typeof mySymbol + "<br>");
document.write("Symbol: " + mySymbol.toString() + "<br><br>");

// isNan() function examples...
var nanExample1 = "Hello";
var nanExample2 = 123;
document.write("isNaN() Function Examples:" + "<br>");
document.write("Is '" + nanExample1 + "' NaN? " + isNaN(nanExample1) + "<br>");
document.write("Is " + nanExample2 + " NaN? " + isNaN(nanExample2) + "<br>");
document.write("<br>");

// Output Nan example...
var outputNan = 0 / 0; // This will result in NaN
document.write("Output NaN Example:" + "<br>");
document.write("0 divided by 0 is: " + outputNan + "<br>");
document.write("<br>");

// Infinity and -Infinity examples...
var positiveInfinity = 1.7976931348623157e+308 * 2; // A number larger than the maximum representable number
var negativeInfinity = -1.7976931348623157e+308 * 2;
document.write("Infinity Examples:" + "<br>");
document.write("Positive Infinity: " + positiveInfinity + "<br>");
document.write("Negative Infinity: " + negativeInfinity + "<br>");
document.write("<br>");

// Boolean comparisons examples...
var boolComparison1 = (10 > 5);
var boolComparison2 = (5 > 10);
document.write("Boolean Comparisons Examples:" + "<br>");
document.write("Is 10 greater than 5? " + boolComparison1 + "<br>");
document.write("Is 5 greater than 10? " + boolComparison2 + "<br>");
document.write("<br>");

// Console log examples; Console.log is better for debugging as it doesn't alter the layout of the page or create an unwanted pop-up on the page...
console.log("Console Log Examples:");
console.log("This is a simple console log message.");
console.log("The result of 15 + 27 is: " + (15 + 27));
console.log("Boolean comparison (20 < 10): " + (20 < 10));
console.log("Is 10 == '10'? " + (10 == '10'));
console.log("Is 10 === '10'? " + (10 === '10'));
console.log("Is 10 === 10? " + (10 === 10));
console.log("Is 7 == 10? " + (7 == 10));
console.log("Is 7 === 10? " + (7 === 10));
console.log("Is 10 === '7'? " + (10 === '7'));
console.log("Is ( 5 > 3 ) && ( 10 > 7 )? " + ( (5 > 3) && (10 > 7) ) );
console.log("Is ( 5 > 3 ) && ( 10 < 7 )? " + ( (5 > 3) && (10 < 7) ) );
console.log("Is ( 5 > 3 ) || ( 10 < 7 )? " + ( (5 > 3) || (10 < 7) ) );
console.log("Is ( 5 < 3 ) || ( 10 < 7 )? " + ( (5 < 3) || (10 < 7) ) );
console.log("Is ! ( 20 > 10 )? " + ( !(20 > 10) ) );
console.log("Is ! ( 5 > 10 )? " + ( !(5 > 10) ) );
// ===============================================================================

// ===============================================================================
// Function to demonstrate type coercion on hover (first example)...
function typeCoercion1() {
    var coercedSum = "5" + 10; // The number 10 is coerced into a string and concatenated
    document.getElementById("TypeCoercion1").innerHTML = "The result of '5' + 10 is: " + coercedSum;
}
function resetTypeCoercion1() {
    document.getElementById("TypeCoercion1").innerHTML = "Hover to see type coercion of '5' + 10...";
}
// Function to demonstrate type coercion on hover (second example)...
function typeCoercion2() {
    var coercedSum2 = 5 + "10"; // The number 10 is coerced into a string and concatenated
    document.getElementById("TypeCoercion2").innerHTML = "The result of 5 + '10' is: " + coercedSum2;
}
function resetTypeCoercion2() {
    document.getElementById("TypeCoercion2").innerHTML = "Hover to see type coercion of 5 + '10'...";
}