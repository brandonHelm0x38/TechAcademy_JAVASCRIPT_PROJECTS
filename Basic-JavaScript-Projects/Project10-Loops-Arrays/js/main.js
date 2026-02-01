// Simple for loop that adds 2 to X, 4 times
function callForLoop1() {
    var X = 2;

    for (var i = 0; i < 4; i++) {
        X += 2;
    }
    document.getElementById("For_Loop_Result_Text1").innerHTML = X;
}

// Simple while loop that adds 10 to X while X is less than 200
function callWhileLoop1() {
    var X = 50;

    while (X < 200) {
        X += 10;
    }
    document.getElementById("While_Loop_Result_Text1").innerHTML = X;
}

// Array example with loop to display elements
function arrayLoopFunction() {
    var instruments = ["Guitar", "Drums", "Piano", "Bass", "Violin", "Trumpet", "Flute"];
    var content = "";
    var Y;
    for (Y = 0; Y < instruments.length; Y++) {
        content += instruments[Y] + "<br>";
    }
    document.getElementById("Array_Loop_Result_Text").innerHTML = content;
}

// Cycle through fruits
var fruitIndex = 0;
function cycleThroughFruits() {
    var fruits = ["Apple", "Banana", "Cherry", "Date", "Elderberry", "Fig", "Grape"];
    document.getElementById("Fruit_Cycle_Result_Text").innerHTML = fruits[fruitIndex];
    fruitIndex = (fruitIndex + 1) % fruits.length;
}

// Constant object example
function constantFunction() {
    const musicalInstrument = {type:"Guitar", brand:"Fender", color:"Black"};
    musicalInstrument.color = "Blue";
    musicalInstrument.price = "$900";
    document.getElementById("Constant_Return_Text").innerHTML = "The cost of the " +
    musicalInstrument.type + " was " + musicalInstrument.price;
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

// Return statement example; A different way of implementation of the button which displays the below text
function returnFunctionResult(arg1, arg2) {
    let result = arg1 * arg2;
    return result;
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