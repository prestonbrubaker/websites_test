// Basic JavaScript for interactive elements
document.addEventListener('DOMContentLoaded', () => {
    // JavaScript code goes here
});

function incrementHue() {
    // Get the element
    var element = document.getElementById("dynamic-color");

    // Extract the current hue value from the element's color
    var color = window.getComputedStyle(element).color;
    var hsl = color.match(/\d+/g); // This extracts numbers from the RGB color
    var hue = parseInt(hsl[0]);
    var saturation = parseInt(hsl[1]);
    var lightness = parseInt(hsl[2]);

    // Increment the hue
    hue = (hue + 1) % 360; // Ensure the hue value stays within the 0-359 range

    // Update the element's color
    element.style.color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

// Call incrementHue every 100 milliseconds (0.1 seconds)
setInterval(incrementHue, 100);

