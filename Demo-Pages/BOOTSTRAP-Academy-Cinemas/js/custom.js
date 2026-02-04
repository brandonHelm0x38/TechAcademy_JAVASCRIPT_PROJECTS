
// Initialize popovers for movie ratings
document.addEventListener('DOMContentLoaded', function() {
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    const popoverInstances = [];

    popoverTriggerList.forEach(function (element) {
        var imageSrc = element.getAttribute('data-bs-image');
        var contentHtml = "<img class='star-rating' src='" + imageSrc + "' alt='Movie Rating' style='width:100%;'>";
        var titleText = element.getAttribute('data-bs-title');
        var popover = new bootstrap.Popover(element, {
            trigger: 'click hover',
            html: true,
            content: contentHtml,
            title: titleText
        });
        popoverInstances.push(popover);
    });

    // Hide popovers when clicking outside
    document.addEventListener('click', function(event) {
        let isPopoverTrigger = event.target.closest('[data-bs-toggle="popover"]');
        let isPopover = event.target.closest('.popover');
        if (!isPopoverTrigger && !isPopover) {
            popoverTriggerList.forEach(function(element) {
                bootstrap.Popover.getInstance(element)?.hide();
            });
        }
    });

}); // End of DOMContentLoaded

// Initialize all toasts on the page
var toastElList = [].slice.call(document.querySelectorAll('.toast'))
var toastList = toastElList.map(function (toastEl) {
    return new bootstrap.Toast(toastEl);
})

// Move these functions to global scope
function displaySelectedMovieOptions() {
    var movieSelect = document.getElementById('movieSelect');
    var timeSelect = document.getElementById('timeSelect');
    var seats = document.getElementById('quantity').value;
    var movie = movieSelect.options[movieSelect.selectedIndex].text;
    var time = timeSelect.options[timeSelect.selectedIndex].text;
    // Validate selection
    var message;
    if (movieSelect.selectedIndex === 0 || timeSelect.selectedIndex === 0 || !seats) {
        message = '<span style="color:red;">Please select a movie, time, and number of seats.</span>';
    } else {
        message = "Purchase confirmed for: <strong>" + movie + "</strong><br>At: <strong>" + time + "</strong><br>For a total of: <strong>" + seats + "</strong> seats.";
    }
    // Display Toast with the message (use innerHTML for HTML formatting)
    var toastBody = document.getElementById('toastBody');
    toastBody.innerHTML = message;
    var toast = new bootstrap.Toast(document.getElementById('toastDisplay'));
    toast.show();
}

function buyTickets() {
    displaySelectedMovieOptions();
}

// Navbar shrink on scroll page down function
$(document).on("scroll", function() {
    if ($(document).scrollTop() > 50) {
        $(".navbar").addClass("nav-shrink");
        $("div.navbar-collapse").css("margin-top", "-6px");
    } else {
        $(".navbar").removeClass("nav-shrink");
        $("div.navbar-collapse").css("margin-top", "14px");
    }
});

// Close mobile menu on link click
$('.navbar-nav>li>a').on('click', function(){
    $('.navbar-collapse').collapse('hide');
});