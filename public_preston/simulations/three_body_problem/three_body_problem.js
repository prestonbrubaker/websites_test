var c = document.getElementById("canvas1");
var ctx = c.getContext("2d");


var itC = 0;
const tickS = 100;
var maxW = c.width;   
var maxH = c.height;
var pixS = Math.floor(10);

const bgHue = "#777777";

var pA = new Array(pCY);

var cloneA = new Array(pCY);



function tick() {
    // Clear and fill background
    ctx.clearRect(minW, minH, maxW, maxH);
    ctx.fillStyle = bgHue;
    ctx.fillRect(minW, minH, maxW, maxH);

    // Write troubleshooting info
    ctx.fillStyle = "#000000";

    ctx.fillText("Program by Preston Brubaker", 300, 10);


    itC++;
}


setInterval(tick, tickS);
