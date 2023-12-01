document.addEventListener('DOMContentLoaded', () => {
    var hue = 0;

    // Accessing the canvas element
    var canvas = document.getElementById('canvas1');
    var ctx = canvas.getContext('2d');

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
