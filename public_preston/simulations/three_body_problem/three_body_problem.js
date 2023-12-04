//left canvas

var c = document.getElementById("canvas1");
var ctx = c.getContext("2d");


var itC = 0;
const tickS = 10;
var maxW = c.width;   
var maxH = c.height;

var blockSize = 10;

const bgHue = "#777777";

var x1 = -.2 + Math.random() * 0.00000000000001;
var y1 = 0;

var xv1 = 0;
var yv1 = -.002;

var x2 = .2;
var y2 = 0;

var xv2 = 0;
var yv2 = .002;

var x3 = 0;
var y3 = .2;

var xv3 = 0.002;
var yv3 = 0;

var gC = 0.0000002;

ctx.fillStyle = bgHue;
ctx.fillRect(0, 0, maxW, maxH);

//right canvas 

var c2 = document.getElementById("canvas2");
var ctx2 = c2.getContext("2d");

ctx2.fillStyle = bgHue;
ctx2.fillRect(0, 0, maxW, maxH);

function ticks() {
    tick();
    tick2();
    itC++;
}


function tick() {
    // Clear and fill background
    ctx.clearRect(0, 0, maxW, maxH - 100);
    ctx.fillStyle = bgHue;
    ctx.fillRect(0, 0, maxW, maxH - 100);
    
    // Write troubleshooting info
    ctx.fillStyle = "#000000";
    
    ctx.fillText("Simulation by Preston Brubaker", maxW / 2 - 20, maxH / 5);

    ctx.fillStyle = "#FF0000";
    ctx.fillRect(x1 * maxW + maxW / 2 - blockSize/2, y1 * maxH + maxH / 2 - blockSize/2, blockSize, blockSize);

    ctx.fillStyle = "#FFFF00";
    ctx.fillRect(x2 * maxW + maxW / 2 - blockSize/2, y2 * maxH + maxH / 2 - blockSize/2, blockSize, blockSize);

    ctx.fillStyle = "#0000FF";
    ctx.fillRect(x3 * maxW + maxW / 2 - blockSize/2, y3 * maxH + maxH / 2 - blockSize/2, blockSize, blockSize);

    // Calculate Gravity
    var dx12 = x2 - x1;
    var dy12 = y2 - y1;

    var dx13 = x3 - x1;
    var dy13 = y3 - y1;

    var dx23 = x3 - x2;
    var dy23 = y3 - y2;
    

    var dist12 = ( dx12 ** 2 + dy12 ** 2 ) ** 0.5;
    var dist13 = ( dx13 ** 2 + dy13 ** 2 ) ** 0.5;
    var dist23 = ( dx23 ** 2 + dy23 ** 2 ) ** 0.5;

    xv1 += gC * dx12 / ( dist12 ** 3 );
    yv1 += gC * dy12 / ( dist12 ** 3 );

    xv2 -= gC * dx12 / ( dist12 ** 3 );
    yv2 -= gC * dy12 / ( dist12 ** 3 );


    
    xv1 += gC * dx13 / ( dist13 ** 3 );
    yv1 += gC * dy13 / ( dist13 ** 3 );

    xv3 -= gC * dx13 / ( dist13 ** 3 );
    yv3 -= gC * dy13 / ( dist13 ** 3 );


    
    xv2 += gC * dx23 / ( dist23 ** 3 );
    yv2 += gC * dy23 / ( dist23 ** 3 );

    xv3 -= gC * dx23 / ( dist23 ** 3 );
    yv3 -= gC * dy23 / ( dist23 ** 3 );
    
    // Add velocities
    x1 += xv1;
    y1 += yv1;

    x2 += xv2;
    y2 += yv2;

    x3 += xv3;
    y3 += yv3;

    if(x1 < -.5){
        x1 = -.5;
        xv1 = 0;
    }
    if(x1 > .5){
        x1 = .5;
        xv1 = 0;
    }
    if(y1 < -.5){
        y1 = -.5;
        yv1 = 0;
    }
    if(y1 > .5){
        y1 = .5;
        yv1 = 0;
    }
    
    if(x2 < -.5){
        x2 = -.5;
        xv2 = 0;
    }
    if(x2 > .5){
        x2 = .5;
        xv2 = 0;
    }
    if(y2 < -.5){
        y2 = -.5;
        yv2 = 0;
    }
    if(y2 > .5){
        y2 = .5;
        yv2 = 0;
    }
    
    if(x3 < -.5){
        x3 = -.5;
        xv3 = 0;
    }
    if(x3 > .5){
        x3 = .5;
        xv3 = 0;
    }
    if(y3 < -.5){
        y3 = -.5;
        yv3 = 0;
    }
    if(y3 > .5){
        y3 = .5;
        yv3 = 0;
    }

}

function tick2() {
    // Clear and fill background
    ctx2.clearRect(0, 0, maxW, maxH - 100);
    ctx2.fillStyle = bgHue;
    ctx2.fillRect(0, 0, maxW, maxH - 100);
    
    // Write troubleshooting info
    ctx2.fillStyle = "#000000";
    
    ctx2.fillText("Simulation by Preston Brubaker", maxW / 2 - 20, maxH / 5);

    ctx2.fillStyle = "#FF0000";
    ctx2.fillRect(x1 * maxW + maxW / 2 - blockSize/2, y1 * maxH + maxH / 2 - blockSize/2, blockSize, blockSize);

    ctx2.fillStyle = "#FFFF00";
    ctx2.fillRect(x2 * maxW + maxW / 2 - blockSize/2, y2 * maxH + maxH / 2 - blockSize/2, blockSize, blockSize);

    ctx2.fillStyle = "#0000FF";
    ctx2.fillRect(x3 * maxW + maxW / 2 - blockSize/2, y3 * maxH + maxH / 2 - blockSize/2, blockSize, blockSize);

    // Calculate Gravity
    var dx12 = x2 - x1;
    var dy12 = y2 - y1;

    var dx13 = x3 - x1;
    var dy13 = y3 - y1;

    var dx23 = x3 - x2;
    var dy23 = y3 - y2;
    

    var dist12 = ( dx12 ** 2 + dy12 ** 2 ) ** 0.5;
    var dist13 = ( dx13 ** 2 + dy13 ** 2 ) ** 0.5;
    var dist23 = ( dx23 ** 2 + dy23 ** 2 ) ** 0.5;

    xv1 += gC * dx12 / ( dist12 ** 3 );
    yv1 += gC * dy12 / ( dist12 ** 3 );

    xv2 -= gC * dx12 / ( dist12 ** 3 );
    yv2 -= gC * dy12 / ( dist12 ** 3 );


    
    xv1 += gC * dx13 / ( dist13 ** 3 );
    yv1 += gC * dy13 / ( dist13 ** 3 );

    xv3 -= gC * dx13 / ( dist13 ** 3 );
    yv3 -= gC * dy13 / ( dist13 ** 3 );


    
    xv2 += gC * dx23 / ( dist23 ** 3 );
    yv2 += gC * dy23 / ( dist23 ** 3 );

    xv3 -= gC * dx23 / ( dist23 ** 3 );
    yv3 -= gC * dy23 / ( dist23 ** 3 );
    
    // Add velocities
    x1 += xv1;
    y1 += yv1;

    x2 += xv2;
    y2 += yv2;

    x3 += xv3;
    y3 += yv3;

    if(x1 < -.5){
        x1 = -.5;
        xv1 = 0;
    }
    if(x1 > .5){
        x1 = .5;
        xv1 = 0;
    }
    if(y1 < -.5){
        y1 = -.5;
        yv1 = 0;
    }
    if(y1 > .5){
        y1 = .5;
        yv1 = 0;
    }
    
    if(x2 < -.5){
        x2 = -.5;
        xv2 = 0;
    }
    if(x2 > .5){
        x2 = .5;
        xv2 = 0;
    }
    if(y2 < -.5){
        y2 = -.5;
        yv2 = 0;
    }
    if(y2 > .5){
        y2 = .5;
        yv2 = 0;
    }
    
    if(x3 < -.5){
        x3 = -.5;
        xv3 = 0;
    }
    if(x3 > .5){
        x3 = .5;
        xv3 = 0;
    }
    if(y3 < -.5){
        y3 = -.5;
        yv3 = 0;
    }
    if(y3 > .5){
        y3 = .5;
        yv3 = 0;
    }
}


setInterval(ticks, tickS);
