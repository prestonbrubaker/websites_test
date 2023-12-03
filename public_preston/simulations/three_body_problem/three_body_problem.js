var c = document.getElementById("canvas1");
var ctx = c.getContext("2d");


var itC = 0;
const tickS = 100;
var maxW = c.width;   
var maxH = c.height;
var pixS = Math.floor(10);

const bgHue = "#777777";




function tick() {
    // Clear and fill background
    ctx.clearRect(0, 0, maxW, maxH);
    ctx.fillStyle = bgHue;
    ctx.fillRect(0, 0, maxW, maxH);

    // Write troubleshooting info
    ctx.fillStyle = "#000000";

    ctx.fillText("Program by Preston Brubaker", maxW / 2, maxH / 2);


    itC++;
}


setInterval(tick, tickS);
