function toggleDropdown() {
    var dropdownContent = document.getElementById("dropdownMenu");
    dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
}

window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdownContent = document.getElementById("dropdownMenu");
        if (dropdownContent.style.display === "block") {
            dropdownContent.style.display = "none";
        }
    }
}

//left canvas
    
    var c = document.getElementById("canvas1");
    var ctx = c.getContext("2d");
    
    
    var itC = 0;
    const tickS = 10;
    var maxW = c.width;   
    var maxH = c.height;
    
    var blockSize = 5;
    
    const bgHue = "#000000";
    
    var x1 = Math.random() - 0.5;
    var y1 = Math.random() - 0.5;
    
    var xv1 = 0.002 * 2 * (Math.random() - 0.5);
    var yv1 = 0.002 * 2 * (Math.random() - 0.5);
    
    var x2 = Math.random() - 0.5;
    var y2 = Math.random() - 0.5;
    
    var xv2 = 0.002 * 2 * (Math.random() - 0.5);
    var yv2 = 0.002 * 2 * (Math.random() - 0.5);
    
    var x3 = Math.random() - 0.5;
    var y3 = Math.random() - 0.5;
    
    var xv3 = 0.002 * 2 * (Math.random() - 0.5);
    var yv3 = 0.002 * 2 * (Math.random() - 0.5);
    
    var gC = 0.0000003;
    
    ctx.fillStyle = bgHue;
    ctx.fillRect(0, 0, maxW, maxH);
    
    //right canvas 
    
    var x1_2 = x1 + 0.00000000000001;
    var y1_2 = y1;
    
    var xv1_2 = xv1;
    var yv1_2 = yv1;
    
    var x2_2 = x2;
    var y2_2 = y2;
    
    var xv2_2 = xv2;
    var yv2_2 = yv2;
    
    var x3_2 = x3;
    var y3_2 = y3;
    
    var xv3_2 = xv3;
    var yv3_2 = yv3;
    
    var c2 = document.getElementById("canvas2");
    var ctx2 = c2.getContext("2d");
    
    ctx2.fillStyle = bgHue;
    ctx2.fillRect(0, 0, maxW, maxH);

    var total_dist_1 = 0;
    var total_dist_2 = 0;

    var c3 = document.getElementById("canvas3");
    var ctx3 = c3.getContext("2d");
    
    ctx3.fillStyle = bgHue;
    ctx3.fillRect(0, 0, maxW, maxH);
    ctx3.fillStyle = "#FFFFFF";
    ctx3.fillText("Data Analysis Graph", maxW / 2 - 90, maxH / 10);
    ctx3.fillStyle = "#00FF00";
    ctx3.fillText("Sum of square of differences in location between each dot of the same color", 10, maxH / 10 + 20);
    ctx3.fillText("between simulation 1 and simulation 2", 10, maxH / 10 + 40);
    ctx3.fillStyle = "#0000FF";
    ctx3.fillText("Negative log of sum of square of differences in location between each dot", 10 , maxH / 10 + 60);
    ctx3.fillText("of the same color between simulation 1 and simulation 2", 10, maxH / 10 + 80);
    ctx3.fillStyle = "#FF0000";
    ctx3.fillRect(0, maxH - 30 + 1 / 50 * -3 * maxH - 1, maxW, 2);
    

function initialize() {

    //left canvas

    itC = 0;
    
    x1 = Math.random() - 0.5;
    y1 = Math.random() - 0.5;
    
    xv1 =  0.002 * 2 * (Math.random() - 0.5);;
    yv1 =  0.002 * 2 * (Math.random() - 0.5);;
    
    x2 = Math.random() - 0.5;
    y2 = Math.random() - 0.5;
    
    xv2 =  0.002 * 2 * (Math.random() - 0.5);;
    yv2 =  0.002 * 2 * (Math.random() - 0.5);;
    
    x3 = Math.random() - 0.5;
    y3 = Math.random() - 0.5;
    
    xv3 =  0.002 * 2 * (Math.random() - 0.5);;
    yv3 =  0.002 * 2 * (Math.random() - 0.5);;
    ctx.clearRect(0, 0, maxW, maxH);
    ctx.fillStyle = bgHue;
    ctx.fillRect(0, 0, maxW, maxH);
    
    //right canvas 
    
    x1_2 = x1 + 0.00000000000001;
    y1_2 = y1;
    
    xv1_2 = xv1;
    yv1_2 = yv1;
    
    x2_2 = x2;
    y2_2 = y2;
    
    xv2_2 = xv2;
    yv2_2 = yv2;
    
    x3_2 = x3;
    y3_2 = y3;
    
    xv3_2 = xv3;
    yv3_2 = yv3;
    ctx2.clearRect(0, 0, maxW, maxH);
    ctx2.fillStyle = bgHue;
    ctx2.fillRect(0, 0, maxW, maxH);

    ctx3.fillStyle = bgHue;
    ctx3.fillRect(0, 0, maxW, maxH);
    ctx3.fillStyle = "#FFFFFF";
    ctx3.fillText("Data Analysis Graph", maxW / 2 - 90, maxH / 10);
    ctx3.fillStyle = "#00FF00";
    ctx3.fillText("Sum of square of differences in location between each dot of the same color", 10, maxH / 10 + 20);
    ctx3.fillText("between simulation 1 and simulation 2", 10, maxH / 10 + 40);
    ctx3.fillStyle = "#0000FF";
    ctx3.fillText("Negative log of sum of square of differences in location between each dot", 10 , maxH / 10 + 60);
    ctx3.fillText("of the same color between simulation 1 and simulation 2", 10, maxH / 10 + 80);
    ctx3.fillStyle = "#FF0000";
    ctx3.fillRect(0, maxH - 30 + 1 / 50 * -3 * maxH - 1, maxW, 2);

}



function ticks() {
    tick();
    tick2();
    itC++;

    if(itC > 20000){
        initialize();
    }
    
}


function tick() {
    // Clear and fill background
    ctx.clearRect(0, 0, maxW, maxH - 100);
    ctx.fillStyle = bgHue;
    ctx.fillRect(0, 0, maxW, maxH - 100);
    
    

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

    total_dist_1 = dist12 + dist13 + dist23;

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
    // Write troubleshooting info
    ctx.fillStyle = "#FFFFFF";

    ctx.fillText("Simulation Window 1", maxW / 2 - 120, maxH / 10);

    ctx.fillText("Iteration:  " + itC, 10, 10);
}

function tick2() {
    // Clear and fill background
    ctx2.clearRect(0, 0, maxW, maxH - 100);
    ctx2.fillStyle = bgHue;
    ctx2.fillRect(0, 0, maxW, maxH - 100);
    
    // Write troubleshooting info
    ctx2.fillStyle = "#FFFFFF";
    
    ctx2.fillText("Simulation Window 2", maxW / 2 - 120, maxH / 10);



    ctx2.fillStyle = "#FF0000";
    ctx2.fillRect(x1_2 * maxW + maxW / 2 - blockSize/2, y1_2 * maxH + maxH / 2 - blockSize/2, blockSize, blockSize);

    ctx2.fillStyle = "#FFFF00";
    ctx2.fillRect(x2_2 * maxW + maxW / 2 - blockSize/2, y2_2 * maxH + maxH / 2 - blockSize/2, blockSize, blockSize);

    ctx2.fillStyle = "#0000FF";
    ctx2.fillRect(x3_2 * maxW + maxW / 2 - blockSize/2, y3_2 * maxH + maxH / 2 - blockSize/2, blockSize, blockSize);

    // Calculate Gravity
    var dx12_2 = x2_2 - x1_2;
    var dy12_2 = y2_2 - y1_2;

    var dx13_2 = x3_2 - x1_2;
    var dy13_2 = y3_2 - y1_2;

    var dx23_2 = x3_2 - x2_2;
    var dy23_2 = y3_2 - y2_2;
    

    var dist12_2 = ( dx12_2 ** 2 + dy12_2 ** 2 ) ** 0.5;
    var dist13_2 = ( dx13_2 ** 2 + dy13_2 ** 2 ) ** 0.5;
    var dist23_2 = ( dx23_2 ** 2 + dy23_2 ** 2 ) ** 0.5;

    total_dist_2 = dist12_2 + dist13_2 + dist23_2;

    xv1_2 += gC * dx12_2 / ( dist12_2 ** 3 );
    yv1_2 += gC * dy12_2 / ( dist12_2 ** 3 );

    xv2_2 -= gC * dx12_2 / ( dist12_2 ** 3 );
    yv2_2 -= gC * dy12_2 / ( dist12_2 ** 3 );


    
    xv1_2 += gC * dx13_2 / ( dist13_2 ** 3 );
    yv1_2 += gC * dy13_2 / ( dist13_2 ** 3 );

    xv3_2 -= gC * dx13_2 / ( dist13_2 ** 3 );
    yv3_2 -= gC * dy13_2 / ( dist13_2 ** 3 );


    
    xv2_2 += gC * dx23_2 / ( dist23_2 ** 3 );
    yv2_2 += gC * dy23_2 / ( dist23_2 ** 3 );

    xv3_2 -= gC * dx23_2 / ( dist23_2 ** 3 );
    yv3_2 -= gC * dy23_2 / ( dist23_2 ** 3 );
    
    // Add velocities
    x1_2 += xv1_2;
    y1_2 += yv1_2;

    x2_2 += xv2_2;
    y2_2 += yv2_2;

    x3_2 += xv3_2;
    y3_2 += yv3_2;

    if(x1_2 < -.5){
        x1_2 = -.5;
        xv1_2 = 0;
    }
    if(x1_2 > .5){
        x1_2 = .5;
        xv1_2 = 0;
    }
    if(y1_2 < -.5){
        y1_2 = -.5;
        yv1_2 = 0;
    }
    if(y1_2 > .5){
        y1_2 = .5;
        yv1_2 = 0;
    }
    
    if(x2_2 < -.5){
        x2_2 = -.5;
        xv2_2 = 0;
    }
    if(x2_2 > .5){
        x2_2 = .5;
        xv2_2 = 0;
    }
    if(y2_2 < -.5){
        y2_2 = -.5;
        yv2_2 = 0;
    }
    if(y2_2 > .5){
        y2_2 = .5;
        yv2_2 = 0;
    }
    
    if(x3_2 < -.5){
        x3_2 = -.5;
        xv3_2 = 0;
    }
    if(x3_2 > .5){
        x3_2 = .5;
        xv3_2 = 0;
    }
    if(y3_2 < -.5){
        y3_2 = -.5;
        yv3_2 = 0;
    }
    if(y3_2 > .5){
        y3_2 = .5;
        yv3_2 = 0;
    }

    var variance = ( total_dist_2 - total_dist_1 ) ** 2;

    var variance_2 = ( (x1_2 - x1) ** 2 + (y1_2 - y1) ** 2 + (x2_2 - x2) ** 2 + (y2_2 - y2) ** 2 + (x3_2 - x3) ** 2 + (y3_2 - y3) ** 2 ) ** 0.5; 

    ctx2.fillStyle = "#FFFFFF";
    
    ctx2.fillText("Log of variance of sum of square of differences:  " + Math.floor(Math.log(variance_2)), 10, 10);

    ctx3.fillStyle = "#440000";
    
    ctx3.fillStyle = "#0000FF";
    
    ctx3.fillRect(itC / 20000 * maxW, maxH - 30 + 1 / 50 * Math.log(variance_2) * maxH, 2, 2);

    ctx3.fillStyle = "#00FF00";
    
    ctx3.fillRect(itC / 20000 * maxW, maxH - 30 + 1 / 50 * -3 * maxH - 1 - variance_2 * maxH / 3, 2, 2);
    
}


setInterval(ticks, tickS);
