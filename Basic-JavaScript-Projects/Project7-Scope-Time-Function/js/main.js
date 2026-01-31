// Function to add ten to a given number and display the result
function addTen(number) {
    console.log("Input number:", number);
    let result = number + 10;
    document.getElementById("result").innerHTML = "Result: " + result;
}

// Function to display a greeting based on the current time of day
function timeGreeting() {
    let now = new Date();
    let hours = now.getHours();
    let greeting;
    if (hours < 12) {
        greeting = "Good morning!";
    } else if (hours < 18) {
        greeting = "Good afternoon!";
    } else {
        greeting = "Good evening!";
    }
    document.getElementById("timeGreetingText").innerHTML = greeting;
}