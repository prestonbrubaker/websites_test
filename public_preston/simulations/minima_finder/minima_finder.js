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
    
    var freqs = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()];
    
    var y = 0;
    
    ctx.fillStyle = bgHue;
    ctx.fillRect(0, 0, maxW, maxH);
    
    
    var c2 = document.getElementById("canvas2");
    var ctx2 = c2.getContext("2d");
    
    ctx2.fillStyle = bgHue;
    ctx2.fillRect(0, 0, maxW, maxH);


    var c3 = document.getElementById("canvas3");
    var ctx3 = c3.getContext("2d");

    ctx.fillStyle = "#333333";
    ctx.fillRect(0, maxH - 100, maxW, 100);
    ctx2.fillStyle = "#333333";
    ctx2.fillRect(0, maxH - 100, maxW, 100);
    
    ctx3.fillStyle = bgHue;
    ctx3.fillRect(0, 0, maxW, maxH);

    

function initialize() {


    itC = 0;
    
    ctx.clearRect(0, 0, maxW, maxH);
    ctx.fillStyle = bgHue;
    ctx.fillRect(0, 0, maxW, maxH);
    
    
    ctx2.clearRect(0, 0, maxW, maxH);
    ctx2.fillStyle = bgHue;
    ctx2.fillRect(0, 0, maxW, maxH);


    ctx.fillStyle = "#333333";
    ctx.fillRect(0, maxH - 100, maxW, 100);
    ctx2.fillStyle = "#333333";
    ctx2.fillRect(0, maxH - 100, maxW, 100);

    ctx3.fillStyle = bgHue;
    ctx3.fillRect(0, 0, maxW, maxH);

    freqs = [ Math.random(), Math.random(), Math.random(), Math.random(), Math.random()];

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
    for (var x = -6; x < 6; x += 0.01){
        y = 0;
        for (var i = 0; i < freqs.length; i++){
            y += Math.sin(freqs[i] * x);
        }
        ctx.fillRect((x) * 50 + maxW / 2, (y + 1) * 5 + maxH / 2, 5,5);
    }

    // Write troubleshooting info
    ctx.fillStyle = "#FFFFFF";

    ctx.fillText("Simulation Window 1", maxW / 2 - 50, maxH / 10);

    ctx.fillText("Iteration:  " + itC, 10, 10);
}

function tick2() {
    // Clear and fill background
    ctx2.clearRect(0, 0, maxW, maxH - 100);
    ctx2.fillStyle = bgHue;
    ctx2.fillRect(0, 0, maxW, maxH - 100);
    
    
    // Write troubleshooting info
    ctx2.fillStyle = "#FFFFFF";
    
    ctx2.fillText("Simulation Window 2", maxW / 2 - 50, maxH / 10);
    
}


setInterval(ticks, tickS);
