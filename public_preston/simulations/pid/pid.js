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
    
const bgHue = "#777777";
    
    
ctx.fillStyle = bgHue;
ctx.fillRect(0, 0, maxW, maxH);


//right canvas 
    
var c2 = document.getElementById("canvas2");
var ctx2 = c2.getContext("2d");
    
ctx2.fillStyle = bgHue;
ctx2.fillRect(0, 0, maxW, maxH);

var c3 = document.getElementById("canvas3");
var ctx3 = c3.getContext("2d");
    
ctx3.fillStyle = bgHue;
ctx3.fillRect(0, 0, maxW, maxH);


// Simulation Parameters

var heater_temp = 20;
var fluid_temp = 20;
var vessel_wall_temp = 20;
var vessel_cont_temp = 20;

var flow_rate = 1; //kg per second
var mass_heater = 1; //kg
var mass_fluid = 10;
var mass_reactor_fluid = 1000; //kg
var mass_vessel_wall = 1; //kg
var heat_cap_water = 4180; // J per kg Kelvin
var heat_cap_steel = 0.502; // J per kg Kelvin
var qdot = 0;
var dt = 0.01; //seconds per interval


function drawPFD() {
    
    // Clear and fill background
    ctx.clearRect(0, 0, maxW, maxH - 100);
    ctx.fillStyle = bgHue;
    ctx.fillRect(0, 0, maxW, maxH - 100);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("Simulation Window 1: Process Flow Diagram (PFD)", maxW / 2 - 100, 10);

    ctx.fillStyle = "#000000";
    
    // Heater Block    
    ctx.fillRect(75,150,50,200);

    // Reactor Vessel
    ctx.fillRect(375,75,50,350);
    ctx.beginPath();
    ctx.arc(400, 75, 24, 0, 2 * Math.PI); // Center (100, 100), Radius 50
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(400, 425, 24, 0, 2 * Math.PI); // Center (100, 100), Radius 50
    ctx.stroke();

    // Top linkage from reactor vessel to heater block
    ctx.beginPath();
    ctx.moveTo(100, 150); // Start point (x, y);
    ctx.lineTo(100, 100); // End point (x, y);
    ctx.lineTo(400, 100); // End point (x, y);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(100, 150); // Start point (x, y);
    ctx.lineTo(108, 140); // End point (x, y);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(100, 150); // Start point (x, y);
    ctx.lineTo(92, 140); // End point (x, y);
    ctx.stroke();

    // Bottom linkage from heater block to pump
    ctx.beginPath();
    ctx.moveTo(100, 350); // Start point (x, y);
    ctx.lineTo(100, 425); // End point (x, y);
    ctx.lineTo(250, 425); // End point (x, y);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(250, 425); // Start point (x, y);
    ctx.lineTo(240, 417); // End point (x, y);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(250, 425); // Start point (x, y);
    ctx.lineTo(240, 433); // End point (x, y);
    ctx.stroke();
    

    // Pump
    ctx.beginPath();
    ctx.arc(250, 425, 25, 0, 2 * Math.PI); // Center (100, 100), Radius 50
    ctx.stroke();

    // Pump to reactor vessel
    ctx.beginPath();
    ctx.moveTo(250, 400); // Start point (x, y);
    ctx.lineTo(375, 400); // End point (x, y);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(375, 400); // Start point (x, y);
    ctx.lineTo(365, 408); // End point (x, y);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(375, 400); // Start point (x, y);
    ctx.lineTo(365, 392); // End point (x, y);
    ctx.stroke();

    
    
    ctx.fillRect(375,75,50,350);
    

    
    
}
    

function initialize() {

    //left canvas

    itC = 0;
    
    ctx.clearRect(0, 0, maxW, maxH);
    ctx.fillStyle = bgHue;
    ctx.fillRect(0, 0, maxW, maxH);
    
    //right canvas 
    
    ctx2.clearRect(0, 0, maxW, maxH);
    ctx2.fillStyle = bgHue;
    ctx2.fillRect(0, 0, maxW, maxH);

    ctx3.fillStyle = bgHue;
    ctx3.fillRect(0, 0, maxW, maxH);

}



function ticks() {
    tick();
    itC++;

    if(itC > 20000){
        initialize();
    }
    
}


function tick() {
    

    // Clear and fill background
    ctx2.clearRect(0, 0, maxW, maxH - 100);
    ctx2.fillStyle = bgHue;
    ctx2.fillRect(0, 0, maxW, maxH - 100);
    
    // Write troubleshooting info
    ctx2.fillStyle = "#FFFFFF";
    
    ctx2.fillText("Simulation Window 2", maxW / 2 - 50, maxH / 10);
    // Write troubleshooting info
    ctx2.fillStyle = "#FFFFFF";
    ctx2.fillText("Iteration:  " + itC, 10, 10);

    ctx3.clearRect(0,0,maxW,maxH);
    ctx3.fillStyle = bgHue;
    ctx3.fillRect(0,0,maxW,maxH);
    
    ctx3.fillStyle = "#FFFFFF";
    ctx3.fillText("Heater temp:  " + heater_temp, 10, 10);
    ctx3.fillText("Fluid temp:  " + fluid_temp, 10, 30);
    ctx3.fillText("vessel_wall_temp:  " + vessel_wall_temp, 10, 50);
    ctx3.fillText("vessel_cont_temp:  " + vessel_cont_temp, 10, 70);

    // Transfer heat
    var heater_temp = 20;
var fluid_temp = 20;
var vessel_wall_temp = 20;
var vessel_cont_temp = 20;
    // from heater to heating fluid
    qdot = (heater_temp - fluid_temp) * 0.0001;
    fluid_temp += qdot / mass_fluid / heat_cap_water * dt;

    // from heating fluid to vessel wall
    qdot = (fluid_temp - vessel_wall_temp) * 0.0001;
    vessel_wall_temp += qdot / mass_vessel_wall / heat_cap_steel * dt;

    // from vessel wall to vessel content
    qdot = (vessel_wall_temp - vessel_cont_temp) * 0.0001;
    vessel_cont_temp += qdot / mass_vessel_cont / heat_cap_water * dt;


    // add heat to heater
    qdot = 10;
    heater_temp += 1 / mass_heater / heat_cap_steel * dt;
    
    
    
}



// Initialize
drawPFD();

setInterval(ticks, tickS);
