// Initialize all Bootstrap popovers on the page
document.addEventListener('DOMContentLoaded', function() {
	var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
	var popoverInstances = popoverTriggerList.map(function (popoverTriggerEl) {
		return new bootstrap.Popover(popoverTriggerEl, { trigger: 'click' });
	});

	popoverTriggerList.forEach(function (popoverTriggerEl, idx) {
		popoverTriggerEl.addEventListener('click', function (event) {
			// Close all other popovers
			popoverInstances.forEach(function (popover, i) {
				if (i !== idx) popover.hide();
			});
		});
	});
});
