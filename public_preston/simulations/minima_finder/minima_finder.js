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
    
    
    var itC = 0;
    const tickS = 10;
    var maxW = c.width;   
    var maxH = c.height;
    
    var blockSize = 8;
    
    const bgHue = "#000000";
    
    var freqs = [Math.floor(Math.random() * 1000) / 1000, Math.floor(Math.random() * 1000) / 1000, Math.floor(Math.random() * 1000) / 1000, Math.floor(Math.random() * 1000) / 1000, Math.floor(Math.random() * 1000) / 1000];
    freqs.sort(function(a, b) {
        return a - b;
    });
    var freqs_g = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()];
    var freqs_c = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()];
    freqs_g.sort(function(a, b) {
        return a - b;
    });
    freqs_c.sort(function(a, b) {
        return a - b;
    });
    var y = 0;
    var y2 = 0;
    var y3 = 0;
    var sse = 0;
    var sse_c = 1000000000000;
    var se = 0;
    var se_c = 0;
    
    ctx.fillStyle = bgHue;
    ctx.fillRect(0, 0, maxW, maxH);
    
    
    var c2 = document.getElementById("canvas2");
    var ctx2 = c2.getContext("2d");
    
    ctx2.fillStyle = bgHue;
    ctx2.fillRect(0, 0, maxW, maxH);


    var c3 = document.getElementById("canvas3");
    var ctx3 = c3.getContext("2d");
    
    ctx3.fillStyle = bgHue;
    ctx3.fillRect(0, 0, maxW, maxH);

    ctx3.fillStyle = "#FFFFFF";
    ctx3.fillText("Graph of log of Loss Vs. Iteration Count", maxW / 2 - 100, 10);

    

function initialize() {


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
    ctx3.fillText("Graph of log of Loss Vs. Iteration Count", maxW / 2 - 100, 10);

    freqs = [Math.floor(Math.random() * 1000) / 1000, Math.floor(Math.random() * 1000) / 1000, Math.floor(Math.random() * 1000) / 1000, Math.floor(Math.random() * 1000) / 1000, Math.floor(Math.random() * 1000) / 1000];
    freqs.sort(function(a, b) {
        return a - b;
    });
    freqs_g = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()];
    freqs_c = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()];
    freqs_g.sort(function(a, b) {
        return a - b;
    });
    freqs_c.sort(function(a, b) {
        return a - b;
    });

    sse_c = 1000000000000;

}



function ticks() {
    tick();
    tick2();
    itC++;

    if(itC > 10000){
        initialize();
    }
    
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
    
    sse = 0;
    for (var x = 20; x < 100; x += 0.01){
        y = 0;
        y2 = 0;
        y3 = 0;
        for (var i = 0; i < freqs.length; i++){
            y += Math.sin(freqs[i] * x);
            y2 += Math.sin(freqs_g[i] * x);
            y3 += Math.sin(freqs_c[i] * x);
        }
        se = (y2 - y) ** 2;
        se_c = (y3 - y) **2;
        sse += se
        ctx.fillStyle = "#0000FF";
        ctx.fillRect((x) * 5 - 50, (y + 1) * 20 + maxH / 3, 3,3);
        ctx.fillStyle = "#FF0000";
        ctx.fillRect((x) * 5 - 50, (y2 + 1) * 20 + maxH / 3, 3,3);
        ctx.fillStyle = "#00FF00";
        ctx.fillRect((x) * 5 - 50, (y3 + 1) * 20 + maxH / 3, 3,3);
        ctx.fillStyle = "#FF00FF";
        ctx.fillRect((x) * 5 - 50, se_c * -4 + maxH * 5 / 6, 3,3);
    }

    if( sse < sse_c ){
        for (var i = 0; i < freqs.length; i++){
            freqs_c[i] = freqs_g[i];
        }
        sse_c = sse;
    }

    for (var i = 0; i < freqs.length; i++){
            freqs_g[i] = freqs_c[i];
        }
    freqs_g.sort(function(a, b) {
        return a - b;
    });
    freqs_c.sort(function(a, b) {
        return a - b;
    });
    rm = 10 ** Math.floor(Math.random() * -12 + 1);
    for (var i = 0; i < freqs.length; i++){
            var r2 = Math.random();
            if(r2 < (1 / freqs.length)){
                freqs_g[i] += (Math.random() - 0.5) * 2 * rm;
                if(freqs_g[i] < 0){
                    freqs_g[i] *= -1;
                }
                if(freqs_g[i] > 1){
                    freqs_g[i] = 1;
                }
                
            }
        }


    // Write troubleshooting info
    ctx.fillStyle = "#FFFFFF";

    ctx.fillText("Simulation Window 1", maxW / 2 - 80, 10);

    ctx.fillText("Iteration:  " + itC, 10, 10);
    ctx.fillText("Current Loss:  " + sse, 10, 30);
    ctx.fillText("Best Loss:  " + sse_c, 10, 50);

    ctx.fillStyle = "#0000FF";
    ctx.fillText("Function to be Guessed", 300, 10);
    ctx.fillStyle = "#00FF00";
    ctx.fillText("Best Guess for Parameters", 300, 30);
    ctx.fillStyle = "#FF0000";
    ctx.fillText("Current Trial for Guess", 300, 50);
    ctx.fillStyle = "#FF00FF";
    ctx.fillText("Square difference between actual and best guess", 200, 70);
}

function tick2() {
    
    
    
    // Write troubleshooting info
    ctx2.fillStyle = "#FFFFFF";

    
    
    ctx2.fillText("Simulation Window 2", maxW / 2 - 50, 10);

    ctx2.fillText("Actual Parameters: ", 10, 30);

    ctx2.fillText("Best Guess of Parameters: ", 10, 50);

    ctx2.fillText("Current Guess of Parameters: ", 10, 70);

    for (var i = 0; i < freqs.length; i++){
        ctx2.fillText(Math.floor(freqs[i] * 1000) / 1000, i * 50 + 200, 30);
        ctx2.fillText(Math.floor(freqs_c[i] * 1000) / 1000, i * 50 + 200, 50);
        ctx2.fillText(Math.floor(freqs_g[i] * 1000) / 1000, i * 50 + 200, 70);
    }

    ctx3.fillStyle = "#FFFFFF";
    ctx3.fillRect(itC / 10000 * maxW, maxH - Math.log(sse_c) * 20 - 200,2,2);
    
}


setInterval(ticks, tickS);
