// Basic JavaScript for interactive elements
document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('DOMContentLoaded', () => {
    var hue = 0;
    var x = 78;
    var y = 235;
    var xV = 5;
    var yV = 5;
    var blockS = 20;
    
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
        

        // Clear the canvas and draw a new rectangle
        ctx.clearRect(0, 0, maxW, maxH);
        ctx.fillStyle = "#777777";
        ctx.fillRect(0, 0, maxW, maxH);


        ctx.fillStyle = color_rect;
        ctx.fillRect(x, y, blockS, blockS);

        x += xV;
        y += yV;

        if(x > maxW - blockS || x < 0){
            xV *= -1;
        }
        if(y > maxH - blockS || y < 0){
            yV *= -1;
        }
    }

    // Call incrementHue every 100 milliseconds (0.1 seconds)
    setInterval(incrementHue, 10);
});
});
