// Ternary Operator Example Function...
function rideFunction() {
    var height, can_ride;
    height = document.getElementById("height").value;
    can_ride = (height < 52) ? "You are too short to ride." : "You are tall enough to ride.";
    document.getElementById("ride").innerHTML = can_ride;
}
function votingAgeFunction() {
    var age, can_vote;
    age = document.getElementById("age").value;
    can_vote = (age < 18) ? "You are not old enough to vote." : "You are old enough to vote.";
    document.getElementById("vote").innerHTML = can_vote;
}

// Constructor Function Example...
function Vehicle(Make, Model, Year, Color) {
    this.Vehicle_Make = Make;
    this.Vehicle_Model = Model;
    this.Vehicle_Year = Year;
    this.Vehicle_Color = Color;
}
var Jack = new Vehicle("Dodge", "Viper", 2020, "Red");
var Emily = new Vehicle("Jeep", "Trail Hawk", 2019, "White and Black");
var Erik = new Vehicle("Ford", "Pinto", 1971, "Mustard");
function newVehicle() {
    document.getElementById("New_Vehicle_Text").innerHTML =
    "Erik drives a " + Erik.Vehicle_Color + "-colored " + Erik.Vehicle_Model +
    " manufactured in " + Erik.Vehicle_Year;
}

// Nested Function Example...
// Persistent counter for nestedFunction button clicks
let nestedFunctionClickCount = 0;
function nestedFunction() {
    nestedFunctionClickCount++;
    document.getElementById("Counting_Text").innerHTML =
        "Count: " + Count() +
        "<br>Button clicked: " + nestedFunctionClickCount + (nestedFunctionClickCount === 1 ? " time" : " times");
    function Count() {
        var starting_point = nestedFunctionClickCount;
        function Plus_one() {starting_point += 10;}
        Plus_one();
        return starting_point;
    }
}