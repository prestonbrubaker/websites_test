var c = document.getElementById("canvas1");
var ctx = c.getContext("2d");


var itC = 0;
const tickS = 100;
var maxW = c.width;   
var maxH = c.height;

var blockSize = 50;

const bgHue = "#777777";

var x1 = 0;
var y1 = 0;

var x2 = .3;
var y2 = 0;




function tick() {
    // Clear and fill background
    ctx.clearRect(0, 0, maxW, maxH);
    ctx.fillStyle = bgHue;
    ctx.fillRect(0, 0, maxW, maxH);
    
    // Write troubleshooting info
    ctx.fillStyle = "#000000";
    
    ctx.fillText("Program by Preston Brubaker", maxW / 2, maxH / 2);

    ctx.fillStyle = "#FF0000";

    ctx.fillRect(x1 * maxW + maxW / 2, y1 * maxH + maxH / 2, blockS, blockS);

    ctx.fillStyle = "#007700";

    ctx.fillRect(x2 * maxW + maxW / 2, y2 * maxH + maxH / 2, blockS, blockS);

    ctx.fillRect(0, 0, blockS, blockS);
    


    itC++;
}


setInterval(tick, tickS);
