// JavaScript Switch Statement Function
function favoriteColor() {
    var colorOutput;
    var colors = document.getElementById("Color_Input").value;
    var colorString = " is a great color!";
    switch(colors) {
        case "Red":
            colorOutput = "Red" + colorString;
            break;
        case "Yellow":
            colorOutput = "Yellow" + colorString;
            break;
        case "Green":
            colorOutput = "Green" + colorString;
            break;
        case "Blue":
            colorOutput = "Blue" + colorString;
            break;
        case "Pink":
            colorOutput = "Pink" + colorString;
            break;
        case "Purple":
            colorOutput = "Purple" + colorString;
            break;
        default:
            colorOutput = "Please enter a color exactly as written on the above list.";
    }
    document.getElementById("Color_Result").innerHTML = colorOutput;
}

// getElementsByClassName Example Function
function changeClassText() {
    var A = document.getElementsByClassName("Click");
    A[0].innerHTML = "The text has changed!";
    A[0].style.fontSize = "25px";
    A[0].style.color = "blue";
}