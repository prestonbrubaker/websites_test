var c = document.getElementById("canvas1");
var ctx = c.getContext("2d");


var itC = 0;
const tickS = 100;
var maxW = c.width;   
var maxH = c.height;

var blockSize = 10;

const bgHue = "#333333";

var x1 = 0;
var y1 = 0;

var xv1 = 0;
var yv1 = 0;

var x2 = .3;
var y2 = 0;

var xv2 = 0;
var yv2 = 0.01;

var gC = 0.0000001;




function tick() {
    // Clear and fill background
    ctx.clearRect(0, 0, maxW, maxH);
    ctx.fillStyle = bgHue;
    ctx.fillRect(0, 0, maxW, maxH);
    
    // Write troubleshooting info
    ctx.fillStyle = "#000000";
    
    ctx.fillText("Program by Preston Brubaker", maxW / 2 - 20, maxH / 5);

    ctx.fillStyle = "#FF0000";
    ctx.fillRect(x1 * maxW + maxW / 2 - blockSize/2, y1 * maxH + maxH / 2 - blockSize/2, blockSize, blockSize);

    ctx.fillStyle = "#FFFF00";
    ctx.fillRect(x2 * maxW + maxW / 2 - blockSize/2, y2 * maxH + maxH / 2 - blockSize/2, blockSize, blockSize);

    // Calculate Gravity
    var dx12 = x2 - x1;
    var dy12 = y2 - y1;

    var dist = ( dx12 ** 2 + dy12 ** 2 ) ** 0.5;

    xv1 += gC * dx12 / ( dist ** 3 );
    yv1 += gC * dy12 / ( dist ** 3 );

    xv2 -= gC * dx12 / ( dist ** 3 );
    yv2 -= gC * dy12 / ( dist ** 3 );
    
    // Add velocities
    x1 += xv1;
    y1 += yv1;

    x2 += xv2;
    y2 += yv1;

    itC++;
}


setInterval(tick, tickS);
