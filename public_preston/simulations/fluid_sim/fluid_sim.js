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
    
var c = document.getElementById("canvas1");
var ctx = c.getContext("2d");

var c2 = document.getElementById("canvas2");
var ctx2 = c2.getContext("2d");

var c3 = document.getElementById("canvas3");
var ctx3 = c3.getContext("2d");
    
    
var itC = 0;
const tickS = 10;
var maxW = c.width;   
var maxH = c.height;
    
var blockSize = 8;
    
const bgHue = "#000000";


//simulation data
var px = [0, 0.1, 0.3, 0.4, 0.5];
var py = [0, 0.3, 0.5, 0.1, 0.3];

var pvx = [0, 0, 0, 0, 0];
var pvy = [0, 0, 0, 0, 0];

var pSpeed = [0, 0, 0, 0, 0];

var ps = 5;

var a = 0.0000000000000000001;
var b = 0.0000000000000000001;

var dt = 0.01;

var genC = 300;

var maxS = 0.00005;

var maxf = 0.000001



    

function initialize() {
    px = [];
    py = [];
    pvx = [];
    pvy = [];
    pSpeed = [];
    // Generate Initial Conditions
    for(var i = 0; i < genC; i++){
        px.push(Math.random());
        py.push(Math.random());
        pvx.push((Math.random() - 0.5) * 2 * maxS);
        pvy.push((Math.random() - 0.5) * 2 * maxS);
        pSpeed.push(0);
    }



    itC = 0;
    
    ctx.clearRect(0, 0, maxW, maxH);
    ctx.fillStyle = bgHue;
    ctx.fillRect(0, 0, maxW, maxH);
    
    
    ctx2.clearRect(0, 0, maxW, maxH);
    ctx2.fillStyle = bgHue;
    ctx2.fillRect(0, 0, maxW, maxH);


    ctx3.clearRect(0,0,maxW,maxH);
    
    ctx3.fillStyle = bgHue;
    ctx3.fillRect(0, 0, maxW, maxH);

    ctx3.fillStyle = "#FFFFFF";
    ctx3.fillText("Graph of", maxW / 2 - 100, 10);

}


function tick() {
    // Clear and fill background
    ctx.clearRect(0, 0, maxW, maxH);
    ctx.fillStyle = bgHue;
    ctx.fillRect(0, 0, maxW, maxH);
    ctx.fillStyle = "#FF0000";

    // Clear and fill background
    ctx2.clearRect(0, 0, maxW, maxH);
    ctx2.fillStyle = bgHue;
    ctx2.fillRect(0, 0, maxW, maxH);


    // Draw Particles
    for(var i = 0; i < px.length; i++){
        var x = px[i];
        var y = py[i];

        var x_draw = x * maxW;
        var y_draw = y * maxH;

        ctx.fillStyle = "#FF0000";
        ctx.fillRect(x_draw - 0.5 * ps, y_draw - 0.5 * ps, ps, ps);
    }


    //Iterate physics
    for (var i = 0; i < px.length; i++){
        // Iterate positions from velocity and handle wall collisions (shoutout to Willoh for figuring out the theoretical math behind all this)
        px[i] += pvx[i];
        var x = px[i];
        if(x > 1){
            px[i] = 1;
            pvx[i] *= -1;
        }else if(x < 0){
            px[i] = 0;
            pvx[i] *= -1;
        }
        py[i] += pvy[i];
        var y = py[i];
        if(y > 1){
            py[i] = 1;
            pvy[i] *= -1;
        }else if(y < 0){
            px[i] = 0;
            pvy[i] *= -1;
        }

        pSpeed[i] = (pvx[i] ** 2 + pvy[i] ** 2) ** 0.5;

        // Match each particle up to every other particle. I must later find a more efficient way to skip particles far away from each other.
        for(var j = 0; j < px.length; j++){
            if(i == j){ // This skips over the case for the particle being the same
                continue;
            }
            var x2 = px[j];
            var y2 = py[j];

            var dx = x2 - x;
            var dy = y2 - y;

            var d = (dx ** 2 + dy ** 2);
            
            var f = a / (d ** 3) - b / (d ** 2);
            
            if(f < maxf){
                pvx[i] -= f * (dx / d) * dt;
                pvx[j] += f * (dx / d) * dt;

                pvy[i] -= f * (dy / d) * dt;
                pvy[j] += f * (dy / d) * dt;
            }


        }


    }

    // Create and draw histogram
    var maxSpeed = Math.max(...pSpeed);
    var speeds = [];
    var binC = 40
    for(var i = 0; i < binC; i++){
        speeds.push(0);
    }

    for(var i = 0; i < px.length; i++){
        for(var j = 0; j < binC; j++){
            if((pSpeed[i] >= (maxSpeed * j / binC)) && (pSpeed[i] < (maxSpeed * (j + 1) / binC))){
                speeds[j]++;
            }
        }
    }

    for(var i = 0; i < binC; i++){
        ctx2.fillStyle = "#77FF77";
        var sX = 0.5;
        var sY = 0.5;
        var offX = 100;
        var offY = 100;
        ctx2.fillRect(i / binC * maxW * sX + offX, maxH - offY, 1 / binC * maxW * sX, -1 * speeds[i] / binC * maxH * sY);
    }

    
    // Write troubleshooting info
    ctx.fillStyle = "#FFFFFF";

    ctx.fillText("Simulation Window 1", maxW / 2 - 80, 10);

    ctx.fillText("Iteration:  " + itC, 10, 10);

    // Write troubleshooting info
    ctx2.fillStyle = "#FFFFFF";
    ctx2.fillText("Simulation Window 2", maxW / 2 - 50, 10);

    itC++;

    if(itC > 100000){
        initialize();
    }
}


initialize();

setInterval(tick, tickS);
