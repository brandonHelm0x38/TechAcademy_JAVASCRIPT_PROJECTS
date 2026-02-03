// Toggle navs back to docked state
function toggleFeaturePageNavs() {
    var featureSectionNavsDocked = document.getElementById('feature-section-navs-docked');
    var featureSectionNavsOpened = document.getElementById('feature-section-navs-opened');
    var webGLdocked = document.getElementById('webGL-aside-docked');
    var webGLopened = document.getElementById('webGL-aside-opened');
    var linkedContentDocked = document.getElementById('linked-content-nav-docked');
    var linkedContentOpened = document.getElementById('linked-content-nav-opened');

    // Show docked, hide opened
    featureSectionNavsDocked.style.display = '';
    webGLdocked.style.display = '';
    linkedContentDocked.style.display = '';

    featureSectionNavsOpened.style.display = 'none';
    webGLopened.style.display = 'none';
    linkedContentOpened.style.display = 'none';
}
// Wrap all code in DOMContentLoaded to ensure the DOM is fully loaded before accessing elements
document.addEventListener('DOMContentLoaded', function() {
    var featureSectionNavsDocked = document.getElementById('feature-section-navs-docked');
    var featureSectionNavsOpened = document.getElementById('feature-section-navs-opened');
	var webGLdocked = document.getElementById('webGL-aside-docked'); // This doubles as a button to open the asides
	var webGLopened = document.getElementById('webGL-aside-opened');
    var linkedContentDocked = document.getElementById('linked-content-nav-docked'); // This doubles as a button to open the asides
    var linkedContentOpened = document.getElementById('linked-content-nav-opened');
    var linkedContentCloseBtn = document.getElementById('lc-nav-close-btn'); // This is the button to close the asides


    // Functionality for opening asides (1 of 2)
    webGLdocked.onclick = function() {
        // Hide the docked asides
        featureSectionNavsDocked.style.display = 'none';
        webGLdocked.style.display = 'none';
        linkedContentDocked.style.display = 'none';
        // Show the opened asides
        featureSectionNavsOpened.style.display = 'block';
        webGLopened.style.display = 'block';
        linkedContentOpened.style.display = 'flex';
    };
    // Functionality for opening asides (2 of 2)
    linkedContentDocked.onclick = function() {
        // Hide the docked asides
        featureSectionNavsDocked.style.display = 'none';
        webGLdocked.style.display = 'none';
        linkedContentDocked.style.display = 'none';
        // Show the opened asides
        featureSectionNavsOpened.style.display = 'block';
        webGLopened.style.display = 'block';
        linkedContentOpened.style.display = 'flex';
    };
});
