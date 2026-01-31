// Generated Countdown Timer Example...
function countdown1() {
    var seconds = parseInt(document.getElementById("secondsInput1").value);
    var countdownDisplay = document.getElementById("countdownDisplay1");
    if (isNaN(seconds) || seconds < 0) {
        countdownDisplay.innerHTML = "Please enter a valid number of seconds.";
        return;
    }
    var interval = setInterval(function() {
        countdownDisplay.innerHTML = seconds + " seconds remaining";
        seconds--;
        if (seconds < 0) {
            clearInterval(interval);
            countdownDisplay.innerHTML = "Time's up!";
        }
    }, 1000);
}

// Tech Academy Countdown Timer Example; Has an alert pop-up when time is up...
function countdown2() {
    var seconds = parseInt(document.getElementById("secondsInput2").value);
    var timer = document.getElementById("countdownDisplay2");
    function tick() {
        seconds--;
        timer.innerHTML = seconds;
        var time = setTimeout(tick, 1000);
        if (seconds == -1) {
            alert("Time's up!");
            clearTimeout(time);
            timer.innerHTML = "";
        }
    }
    tick();
}

// Slideshow Functionality...

var slideIndex = 1;
var slideTimeout;

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n === undefined) {
        slideIndex++;
    } else {
        slideIndex = n;
    }
    if (slideIndex > slides.length) {slideIndex = 1;}
    if (slideIndex < 1) {slideIndex = slides.length;}
    for (i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].classList.add("active");
    dots[slideIndex-1].className += " active";
    clearTimeout(slideTimeout);
    slideTimeout = setTimeout(function() { showSlides(); }, 4000); // Auto-advance
}

function plusSlides(n) {
    showSlides(slideIndex + n);
}

function currentSlide(n) {
    showSlides(n);
}

window.onload = function() {
    showSlides(slideIndex);
};

