// Basic JavaScript Object --> Dictionary Example...
var animal = {Species:"Dog", Color:"Brown", Breed:"Labrador Retriever", Age:5, Sound:"Bark!"}; // Object named animal with properties
// Function to display/change HTML element ID content dynamically...
function displayDictionary() {  // This function changes the content of an HTML element with the ID "Dictionary_Text"
    var outStr = "My " + animal.Breed + " is a " + animal.Color + " " + animal.Species + " and is " + animal.Age + " years old. It likes to " + animal.Sound;
    document.getElementById("Dictionary_Text").innerHTML = outStr; // Set the inner HTML of the element with ID "Dictionary_Text" to the string
}

// Function to delete the Age property and reprint the message
function deleteAgeAndDisplay() {
    delete animal.Age;
    var outStr = "My " + animal.Breed + " is a " + animal.Color + " " + animal.Species;
    if (animal.Age !== undefined) {
        outStr += " and is " + animal.Age + " years old.";
    }
    outStr += " It likes to " + animal.Sound;
    document.getElementById("Dictionary_Text").innerHTML = outStr;
}