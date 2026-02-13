// Close mobile navbar menu when clicking outside
var navbarCollapse = document.getElementById('navbarNavDropdown');
var navbarToggler = document.querySelector('.navbar-toggler');
document.addEventListener('click', function(e) {
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        // If click is outside the navbar and menu
        if (!navbarCollapse.contains(e.target) && !navbarToggler.contains(e.target)) {
            // Bootstrap 5: collapse menu
            var bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
            if (bsCollapse) bsCollapse.hide();
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Show contact form on navbar Contact div click
    var contactNavLink = document.getElementById('contact-nav-link');
    if (contactNavLink) {
        contactNavLink.addEventListener('click', function(e) {
            e.preventDefault();
            if (contactForm) contactForm.style.display = 'flex';
        });
    }
        
	// Hide contact form by default
	var contactForm = document.getElementById('contact-form');
	if (contactForm) contactForm.style.display = 'none';

	// Show contact form on button click
	var contactButton = document.getElementById('contact-button');
	if (contactButton) {
		contactButton.addEventListener('click', function(e) {
			e.stopPropagation();
			if (contactForm) contactForm.style.display = 'flex';
		});
	}

	// Hide contact form when clicking outside of it
	document.addEventListener('mousedown', function(e) {
		if (contactForm && contactForm.style.display === 'flex') {
			if (!contactForm.contains(e.target) && e.target !== contactButton) {
				contactForm.style.display = 'none';
			}
		}
	});

	// Close contact form when close button is clicked
	var closeBtn = document.getElementById('close-contact-form');
	if (closeBtn) {
		closeBtn.addEventListener('click', function(e) {
			e.preventDefault();
			if (contactForm) contactForm.style.display = 'none';
		});
	}
});

// Form validation function
// Get elements from the DOM...
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const fullName = document.getElementById('name');
const email = document.getElementById('email');
const phoneNumber = document.getElementById('phone');
const message = document.getElementById('message');
const submitButton = document.getElementById('submit-btn');
const contactFormElement = document.querySelector('#contact-form form');

// Add event listeners...
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

fullName.addEventListener("blur", validateFullName);
email.addEventListener("blur", validateEmail);
phoneNumber.addEventListener("blur", validatePhoneNumber);
message.addEventListener("blur", validateMessage);

if (contactFormElement) {
    contactFormElement.addEventListener("submit", function(event) {
        let valid = validateForm();
        if (!valid) {
            event.preventDefault();
        }
    });
}

// Create validation functions...
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Full Name Validation: Must contain only letters and a single space, with each part between 1 and 20 characters
function validateFullName() {
    const namePattern = /^[a-zA-Z]{1,20}( )[a-zA-Z]{1,20}$/;
    let tempBool = false;
    if (!namePattern.test(fullName.value)) {
        fullName.classList.remove('Valid');
        fullName.classList.add('Not_Valid');
        // console.log('Full Name is not valid');
    } else {
        fullName.classList.remove('Not_Valid');
        fullName.classList.add('Valid');
        tempBool = true;
        // console.log('Full Name is valid');
    }
    return tempBool;
}

// Email Validation: Basic email format
function validateEmail() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let tempBool = false;
    if (!emailPattern.test(email.value)) {
        email.classList.remove('Valid');
        email.classList.add('Not_Valid');
        // console.log('Email is not valid');
    } else {
        email.classList.remove('Not_Valid');
        email.classList.add('Valid');
        tempBool = true;
        // console.log('Email is valid');
    }
    return tempBool;
}

// Phone Number Validation: Format xxx-xxx-xxxx
function validatePhoneNumber() {
    const phonePattern = /^\d{3}-\d{3}-\d{4}$/; // US phone number format
    const phonePatternAlt = /^\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}$/; // Alternative format accepts (xxx) xxx-xxxx or xxx.xxx.xxxx
    let tempBool = false;
    if (!phonePatternAlt.test(phoneNumber.value)) {
        phoneNumber.classList.remove('Valid');
        phoneNumber.classList.add('Not_Valid');
        // console.log('Phone Number is not valid');
    } else {
        phoneNumber.classList.remove('Not_Valid');
        phoneNumber.classList.add('Valid');
        tempBool = true;
        // console.log('Phone Number is valid');
    }
    return tempBool;
}

// Message Validation - Cannot be blank and must be at least 10 characters long
function validateMessage() {
    let tempBool = false;
    if (message.value.trim() === '' || message.value.trim().length < 10) {
        message.classList.remove('Valid');
        message.classList.add('Not_Valid');
        // console.log('Message is not valid');
    } else {
        message.classList.remove('Not_Valid');
        message.classList.add('Valid');
        tempBool = true;
        // console.log('Message is valid');
    }
    return tempBool;
}

// Form Validation on Submit: Ensure all fields are valid before submission
function validateForm() {
    let alertMsg = '';
    let boolFullName = validateFullName();
    if (!boolFullName) { alertMsg += 'Full Name is invalid.\n'; }
    let boolEmail = validateEmail();
    if (!boolEmail) { alertMsg += 'Email is invalid.\n'; }
    let boolPhone = validatePhoneNumber();
    if (!boolPhone) { alertMsg += 'Phone Number is invalid.\n'; }
    let boolMessage = validateMessage();
    if (!boolMessage) { alertMsg += 'Message must be at least 10 characters long.\n'; }

    if (alertMsg !== '') {
        alert('Please correct the following errors before submitting the form:\n\n' + alertMsg);
        return false;
    }
    // Success alert removed
    return true;
}
