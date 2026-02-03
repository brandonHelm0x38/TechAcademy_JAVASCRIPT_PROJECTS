document.addEventListener("DOMContentLoaded", function() {
    function setMarqueeDuration() {
        var scrollText = document.getElementById("scroll-text");
        var container = scrollText.parentElement;
        // Clone the element to measure width without animation
        var clone = scrollText.cloneNode(true);
        clone.style.position = "absolute";
        clone.style.visibility = "hidden";
        clone.style.whiteSpace = "nowrap";
        clone.style.animation = "none";
        container.appendChild(clone);
        var textWidth = clone.offsetWidth;
        container.removeChild(clone);
        var containerWidth = container.offsetWidth;
        // Calculate duration: longer text = longer duration
        // 100px/sec is a reasonable speed
        var speed = 100; // px per second
        var distance = textWidth + containerWidth;
        var duration = distance / speed;
        scrollText.style.animationDuration = duration + "s";
    }
    setMarqueeDuration();
    // If you update the text dynamically, call setMarqueeDuration() again
    // Example:
    // document.getElementById("update-text").onclick = function() {
    //     document.getElementById("scroll-text").textContent = "New text here!";
    //     setMarqueeDuration();
    // };
});
