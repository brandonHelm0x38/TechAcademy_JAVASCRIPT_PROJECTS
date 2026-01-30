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