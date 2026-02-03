// Show Bootstrap toast on button click
document.addEventListener('DOMContentLoaded', function() {
	var toastTrigger = document.getElementById('liveToastBtn');
	var toastLive = document.getElementById('liveToast');
	if (toastTrigger && toastLive) {
		var toast = new bootstrap.Toast(toastLive);
		toastTrigger.addEventListener('click', function() {
			toast.show();
		});
	}
});
