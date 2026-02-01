// Function to display/change HTML element ID content dynamically...
function dynamicParagraph() {  // This function changes the content of an HTML element with the ID "Button_Text"
    var str = "This is the stored/dynamic text from JavaScript!" + "<br>"; // The string to be displayed  
    str += "This is the second line of dynamic text.";
    document.getElementById("Paragraph_Text").innerHTML = str; // Set the inner HTML of the element with ID "Button_Text" to the string
}

// Function to change button text dynamically...
function dynamicButtonText() {  // This function changes the content of an HTML element with the ID "Button_Text2"
    var str = "This text has been changed!"; // The string to be displayed  
    document.getElementById("Button_Text").innerHTML = str; // Set the inner HTML of the element with ID "Button_Text2" to the string
}

// Hover to dynamically change button text color (function 1 of 2)...
function mouseOver(myElement) { // This function changes the text of an HTML element when the mouse is over it
    myElement.innerHTML = "Thank you for hovering!";
} // (function 2 of 2)...
function mouseOut(myElement) { // This function restores the original text when the mouse is no longer over the element
    myElement.innerHTML = "Hover Over Me!";
}

// Fourth Button mimicks first; displays current date and time in element below...
function displayDate() { // This function displays the current date and time in an HTML element with the ID "Date_Text"
    document.getElementById("Date_Text").innerHTML = Date(); // Set the inner HTML of the element with ID "Date_Text" to the current date and time
}

// Fifth button code implementation with event listener...
document.addEventListener("DOMContentLoaded", function() {
    const fifthBtn = document.getElementById("myBtn");
    if (fifthBtn) {
        fifthBtn.addEventListener("click", function () {
            document.getElementById("demo").innerHTML = Date();
        });
    }
});

// Return statement example; A different way of implementation of the button which displays the below text
function returnFunctionResult(arg1, arg2) {
    let result = arg1 * arg2;
    return result;
}

// Let keyword example with block scope; 
function letFunction() {
    let X = 10;
    {
        let X = 20;
        document.getElementById("Let_Return_Text").innerHTML = "The value of X inside the block is: " + X;
    }
    document.getElementById("Let_Return_Text").innerHTML += "<br>The value of X outside the block is: " + X;
}

// Var keyword example with block scope; 
function varFunction() {
    var X = 10;
    {
        var X = 20;
        document.getElementById("Var_Return_Text").innerHTML = "The value of X inside the block is: " + X;
    }
    document.getElementById("Var_Return_Text").innerHTML += "<br>The value of X outside the block is: " + X;
}

// Utilizing let keyword with an object, as well as a method within the object to create the description of the car
function simpleConstructorFunction() {
    let car = {
    make: "Dodge ",
    model: "Viper",
    year: "2021 ",
    color: "red ",
    description : function() {
        return "The car is a " + this.year + this.color + this.make + this.model;
        }
    }
    document.getElementById("Constructor_Return_Text").innerHTML = car.description();
}

// Break statement example within a loop
function breakFunction() {
    let text = "";
    for (let i = 0; i < 10; i++) {
        if (i === 5) { break; }
        text += "The number is " + i + "<br>";
    }
    document.getElementById("Break_Return_Text").innerHTML = text;
}

// Continue statement example within a loop
function continueFunction() {
    let text = "";
    for (let i = 0; i < 10; i++) {
        if (i === 5) { continue; }  // Skip the iteration when i is 5
        text += "The number is " + i + "<br>";
    }
    document.getElementById("Continue_Return_Text").innerHTML = text;
}