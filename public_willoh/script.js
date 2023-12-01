// Basic JavaScript for interactive elements
document.addEventListener('DOMContentLoaded', () => {
    // JavaScript code goes here
});

var hue = 0

// Accessing the canvas element
var canvas = document.getElementById('canvas1');
var ctx = canvas.getContext('2d');


function incrementHue() {
    // Get the element
    var element = document.getElementById("dynamic-color");

    // Extract the current hue value from the element's color
    var color = window.getComputedStyle(element).color;
    var hsl = color.match(/\d+/g); // This extracts numbers from the RGB color
    var saturation = 50;
    var lightness = 50;

    // Increment the hue
    hue += 1

    // Update the element's color
    element.style.color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;


    // Set the fill color using HSL
    // Example: HSL with 200 hue, 100% saturation, 50% lightness
    var color_rect = "hsl(" + hue + ", 100%, 50%)";
    ctx.fillStyle = color_rect;
    
    // Draw a rectangle
    // fillRect(x, y, width, height)
    ctx.fillRect(50, 50, 100, 100);

}

// Call incrementHue every 100 milliseconds (0.1 seconds)
setInterval(incrementHue, 10);

