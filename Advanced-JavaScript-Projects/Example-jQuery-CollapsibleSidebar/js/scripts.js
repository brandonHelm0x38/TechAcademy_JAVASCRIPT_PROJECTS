$(document).ready(function() {
    // Initial state: start collapsed if you prefer
    $("#sidebar").addClass("is-collapsed");
    $("#main-content").addClass("is-expanded");

    // Toggle button handlers
    $("#open-btn, #close-btn").click(function() {
        $("#sidebar").toggleClass("is-collapsed");
        $("#main-content").toggleClass("is-expanded");
    });
});