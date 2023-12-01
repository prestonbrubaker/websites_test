document.addEventListener('DOMContentLoaded', () => {
    var hue = 0;
    var x = 20;
    var y = 20;
    
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
    // Accessing the canvas element
    var canvas = document.getElementById('canvas1');
    var ctx = canvas.getContext('2d');

    var maxW = canvas1.width;
    var maxH = canvas1.height;

    ctx.fillStyle = "#777777";
    ctx.fillRect(0, 0, maxW, maxH);

    function incrementHue() {
        // Increment the hue
        hue = (hue + 1) % 360; // This will cycle hue from 0 to 359

        // Set the fill color using HSL
        var color_rect = "hsl(" + hue + ", 100%, 50%)";
        ctx.fillStyle = color_rect;

        // Clear the canvas and draw a new rectangle
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillRect(50, 50, 100, 100);
    }

    // Call incrementHue every 100 milliseconds (0.1 seconds)
    setInterval(incrementHue, 100);
});
