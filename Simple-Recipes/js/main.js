// RECIPE POPUP MODALS SECTION
// =============================================================================
// Sets up the button that will open the recipe modal
// var modalButtons = document.querySelectorAll('input[type="button"].modal-button');
var btns = document.querySelectorAll("input.modal-button");

// Defines all modals for each recipe
var modals = document.querySelectorAll(".recipe-modal");

// Get the span element that closes the modal
var closeBtn = document.getElementsByClassName("close-btn");

// When the user clicks the button, open the modal
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Version 1: Generated; Event Listener Implementation
// btns.forEach(function(btn, index) {
//     btn.addEventListener("click", function() {
//         modals[index].style.display = "block";
//     });
// });
// Version 2: The Tech Academy Example
for (var i = 0; i < btns.length; i++) {
    btns[i].onclick = function(event) {
        var modalId = this.getAttribute("href").substring(1); // Get the modal ID from the href attribute
        var modal = document.getElementById(modalId);
        modal.style.display = "block";
    };
}

// When the user clicks the close button, close the modal
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Version 1: Generated; Event Listener Implementation
// Array.from(closeBtn).forEach(function(btn, index) {
//     btn.addEventListener("click", function() {
//         modals[index].style.display = "none";
//     });
// });
// Version 2: The Tech Academy Example
for (var i = 0; i < closeBtn.length; i++) {
    closeBtn[i].onclick = function() {
        var modal = this.closest(".recipe-modal");
        modal.style.display = "none";
    };
}

// When the user clicks anywhere outside of the modal, close it
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Version 1: Generated; Event Listener Implementation
window.addEventListener("click", function(event) {
    modals.forEach(function(modal) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
});

// END OF RECIPE POPUP MODALS SECTION

// EMAIL VALIDATION SECTION
// =============================================================================
document.getElementById("contactForm").addEventListener("submit", function(event) {
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();
    let errorMessages = [];
    const valMsg = document.getElementById("validateMsg");
    valMsg.innerHTML = ""; // Clear previous messages
    let allClear = true;

    // This sets a timeout to clear validation messages after 3 seconds
    let timeout;
    function timeoutFunction() {
        timeout = setTimeout(function() {
            valMsg.innerHTML = "";
        }, 3000);
    }
    timeoutFunction();

    // Validate First Name
    if (firstName === "") {
        valMsg.innerHTML = valMsg.innerHTML +"<p style='color: red;'>First Name is required.</p>";
        allClear = false;
        // errorMessages.push("First Name is required.");
    }
    // Validate Last Name
    if (lastName === "") {
        valMsg.innerHTML = valMsg.innerHTML + "<p style='color: red;'>Last Name is required.</p>";
        allClear = false;
        // errorMessages.push("Last Name is required.");
    }
    // Validate Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        valMsg.innerHTML = valMsg.innerHTML + "<p style='color: red;'>Please enter a valid email address.</p>";
        allClear = false;
        // errorMessages.push("Please enter a valid email address.");
    }
    // Validate Phone (optional)
    const phonePattern = /^\d{10}$/;
    if (phone !== "" && !phonePattern.test(phone)) {
        valMsg.innerHTML = valMsg.innerHTML + "<p style='color: red;'>Please enter a valid 10-digit phone number.</p>";
        allClear = false;
        // errorMessages.push("Please enter a valid 10-digit phone number.");
    }

    // Validate Message
    if (message === "") {
        valMsg.innerHTML = valMsg.innerHTML + "<p style='color: red;'>Message is required.</p>";
        allClear = false;
        // errorMessages.push("Message is required.");
    }

    // If there are errors, prevent form submission; Otherwise display either errors or success message
    if (errorMessages.length > 0 || !allClear) {
        event.preventDefault();
        // alert(errorMessages.join("\n"));
    }
    else {
        event.preventDefault();
        valMsg.innerHTML = valMsg.innerHTML + "<p style='color: green;'>Form submitted successfully!</p>";
        // alert("Form submitted successfully!");
    }

    const formData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        message: message,
        subscribe: document.getElementById("subscriberCheckbox").checked
    };
    // For demonstration purposes, log the form data to the console
    console.log("Form Data Submitted:", JSON.stringify(formData));

});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~