// Basic JavaScript for interactive elements
document.addEventListener('DOMContentLoaded', () => {
    // JavaScript code goes here
});

var hue = 0


function incrementHue() {
    // Get the element
    var element = document.getElementById("dynamic-color");

    // Extract the current hue value from the element's color
    var color = window.getComputedStyle(element).color;
    var hsl = color.match(/\d+/g); // This extracts numbers from the RGB color
    var saturation = 50;
    var lightness = 50;

    // Increment the hue
    hue += .01

    // Update the element's color
    element.style.color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

// Call incrementHue every 100 milliseconds (0.1 seconds)
setInterval(incrementHue, 10);

