// Create a pop-up alert in the browser...
alert("Welcome to the Tech Academy JavaScript Projects!");
//window.alert("This is another alert example!"); // Note that only the most recently typed alert will display.

// Example: writing a string to the webpage...
var testString = "Hello, Tech Academy!";
document.write(testString);
document.write("<br>" + "<br>");

// Use '/' to escape normal processing and print quotes within a string, or to display a backslash itself...
var quoteString = "She said, \"JavaScript is fun!\"";
document.write(quoteString);
document.write("<br>");
var backslashString = "This is a backslash: \\";
document.write(backslashString);
document.write("<br>" + "<br>");

// Concatenation example...
var part1 = "This is the beginning of the string, ";
var part2 = "and this is the end of the string.";
var fullString = part1 + part2;
document.write(fullString);
document.write("<br>" + "<br>");

// JavaScript supports declaring multiple variables in one statement...
var x = 10, y = 15, z = x + y;
document.write("The sum of x and y is: " + z);
document.write("<br>");
var Family = "The Smiths", Dad = "John", Mom = "Jane", Son = "Jake", Daughter = "Jill";
document.write(Dad + " is part of " + Family);
document.write("<br>" + "<br>");

// Example of using 'let' to declare a block-scoped variable...
let blockVar = "I am block-scoped!";
document.write(blockVar);
document.write("<br>");

// This script displays an alert with the result of a simple arithmetic expression...
var a = 5;
var b = 20;
var sum = a + b;
// This writes the result directly to the webpage...
document.write("The sum of " + a + " and " + b + " is: " + sum);
document.write("<br>" + "<br>");

// Function to display/change HTML element ID content dynamically...
function dynamicParagraph() {  // This function changes the content of an HTML element with the ID "Button_Text"
    var str = "This is the stored/dynamic text from JavaScript!"; // The string to be displayed  
    document.getElementById("Paragraph_Text").innerHTML = str; // Set the inner HTML of the element with ID "Button_Text" to the string
}

// Function to change button text dynamically...
function dynamicButtonText() {  // This function changes the content of an HTML element with the ID "Button_Text2"
    var str = "This text has been changed!"; // The string to be displayed  
    document.getElementById("Button_Text").innerHTML = str; // Set the inner HTML of the element with ID "Button_Text2" to the string
}

// Hover to dynamically change button text color (function 1 of 2)
function mouseOver(myElement) { // This function changes the text of an HTML element when the mouse is over it
    myElement.innerHTML = "Thank you for hovering!";
} // (function 2 of 2)
function mouseOut(myElement) { // This function restores the original text when the mouse is no longer over the element
    myElement.innerHTML = "Hover Over Me!";
}