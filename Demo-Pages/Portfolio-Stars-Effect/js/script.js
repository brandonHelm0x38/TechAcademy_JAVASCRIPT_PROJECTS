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
