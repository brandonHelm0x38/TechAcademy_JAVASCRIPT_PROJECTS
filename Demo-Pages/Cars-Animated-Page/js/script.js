// Functionality for page fade-in effect on load
$(document).ready(function () {
    // Remove the fade-in class to trigger fade-in
    $("body").removeClass("fade-in");
});

// Optional: Add fade-out on page unload (if desired)
// $(window).on('beforeunload', function () {
//     $("body").addClass("loaded");
// });

// Close contact form when close button is clicked
$("#close-contact-form").on("click", function (e) {
    e.preventDefault();
    $("#contact-form").css("display", "none");
});

// Show contact form on button click
$("#contact-button").on("click", function (e) {
    e.stopPropagation();
    $("#contact-form").css("display", "flex");
});

// Hide contact form when clicking outside of it
$(document).on("mousedown", function (e) {
    var $form = $("#contact-form");
    if ($form.is(":visible") && !$form.is(e.target) && $form.has(e.target).length === 0) {
        $form.css("display", "none");
    }
});

// Document ready function to ensure the DOM is fully loaded before executing scripts
$(document).ready(function () {
    // Page Fade-in Effect
    $("body").removeClass("loaded");

    //shineLoop uses the animate event method by using the chaining technique to
    //utilize more than one event method in the same function
    function shineLoop() {
        $(".shine").animate({ backgroundPositionX: '1600px' }, 3000)
            .animate({ backgroundPositionX: '-800px' }, 3000);
    };
    //setInterval will repeat the about shineLoop function and 0 
    //sets the delayed amount of time between each repeat
    setInterval(shineLoop, 0);

    //Shrinks header size when the document is scrolled down by 50 pixels
    $(document).on("scroll", function () {
        if ($(document).scrollTop() > 50) {
            $("h1").addClass("header-scrolled");
        } else {
            $("h1").removeClass("header-scrolled");
        }
    });

    //Triggers the images to slide down to show each title one after the other
    //when the user's mouseenters the div area with the #classicCars ID
    $("#classicCars").on({
        mouseenter: function () {
            $("#titleOne").show(1000);
            $("#titleTwo").show(1500);
            $("#titleThree").show(2000);
        }
    });

    //Triggers the images to slide up and hide each title one after the other
    //when the user's mouse leaves the div area with the #classicCars ID
    $("#classicCars").on({
        mouseleave: function () {
            $("#titleOne").hide(2000);
            $("#titleTwo").hide(1500);
            $("#titleThree").hide(1000);
        }
    });

    //Creates a toggle effect on each FAQ question by checking each element's sibling 
    //so they don't all display when one question is clicked
    $('div.question').on('click', function () {
        $(this).next().slideToggle('slow')
    });

});