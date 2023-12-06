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
const tickS = 100;
const maxW = c.width;   
const maxH = c.height;
    
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
var air_temp = 20;

var flow_rate = 1; //kg per second
var mass_heater = 50; //kg
var mass_fluid = 1000;
var mass_vessel_cont = 300; //kg
var mass_vessel_wall = 50; //kg
var heat_cap_water = 4180; // J per kg Kelvin
var heat_cap_steel = 466; // J per kg Kelvin
var qdot = 0;
var qdot_1 = 0;
var qdot_2 = 0;
var qdot_3 = 0;
var qdot_4 = 0;
var dt = 10; //seconds per interval


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

    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("Electric Heater", 125, 300);
    ctx.fillText("Centrifugal Pump", 210, 450);
    ctx.fillText("Vessel", 430, 400);
    

    
    
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


function tick() {
    
    if(itC > 20000){
        initialize();
    }
    
    // Clear and fill background
    ctx2.clearRect(0, 0, maxW, maxH / 4);
    ctx2.fillStyle = bgHue;
    ctx2.fillRect(0, 0, maxW, maxH / 4);
    
    // Write troubleshooting info
    ctx2.fillStyle = "#FFFFFF";
    
    ctx2.fillText("Graph of Temperatures", maxW / 2 - 50, 10);
    // Write troubleshooting info
    ctx2.fillStyle = "#FFFFFF";
    ctx2.fillText("Iteration:  " + itC, 10, 10);
    ctx2.fillStyle = "#FF0000";
    ctx2.fillText("Heater", 10, 30);
    ctx2.fillStyle = "#FFFF00";
    ctx2.fillText("Heating Fluid", 10, 50);
    ctx2.fillStyle = "#00FF00";
    ctx2.fillText("Wall of Vessel", 10, 70);
    ctx2.fillStyle = "#0000FF";
    ctx2.fillText("Wall of Vessel", 10, 90);
    
    ctx3.clearRect(0,0,maxW,maxH / 2);
    ctx3.fillStyle = bgHue;
    ctx3.fillRect(0,0,maxW,maxH / 2);
    
    ctx3.fillStyle = "#FFFFFF";
    
    ctx3.fillText("Data and Setpoint Fittness", maxW / 2 - 50, 10);
    
    ctx3.fillText("Heater temp:  " + heater_temp, 10, 10);
    ctx3.fillText("Fluid temp:  " + fluid_temp, 10, 30);
    ctx3.fillText("vessel_wall_temp:  " + vessel_wall_temp, 10, 50);
    ctx3.fillText("vessel_cont_temp:  " + vessel_cont_temp, 10, 70);
    ctx3.fillText("q1 heater to fluid:  " + qdot_1, 10, 90);
    ctx3.fillText("q2 fluid to vessel wall:  " + qdot_2, 10, 110);
    ctx3.fillText("q3 vessel wall to vessel content:  " + qdot_3, 10, 130);
    ctx3.fillText("q4 vessel wall to air:  " + qdot_3, 10, 150);

    ctx3.fillStyle = "#FF0000";
    ctx3.fillText("Difference between vessel contents and setpoint", 10, 170);
    ctx3.fillStyle = "#00FF00";
    ctx3.fillText("Log of difference between vessel contents and setpoint", 10, 190);

    //plot temps
    ctx2.fillStyle = "#FF0000";
    ctx2.fillRect(itC / 5000 * maxW, maxH - (heater_temp - 20) * 1, 2, 2)
    
    ctx2.fillStyle = "#FFFF00";
    ctx2.fillRect(itC / 5000 * maxW, maxH - (fluid_temp - 20) * 1, 2, 2)

    ctx2.fillStyle = "#00FF00";
    ctx2.fillRect(itC / 5000 * maxW, maxH - (vessel_wall_temp - 20) * 1, 2, 2)

    ctx2.fillStyle = "#0000FF";
    ctx2.fillRect(itC / 5000 * maxW, maxH - (vessel_cont_temp - 20) * 1, 2, 2)

    ctx3.fillStyle = "#000000";
    ctx3.fillRect(0, 300, maxW, 5);
    ctx3.fillStyle = "#FF0000";
    ctx3.fillRect(itC / 5000 * maxW, 300 - (vessel_cont_temp - 75) * 3, 2, 2);
    ctx3.fillStyle = "#00FF00";
    ctx3.fillRect(itC / 5000 * maxW, 300 - Math.log(Math.abs((vessel_cont_temp - 75))) * 3, 2, 2);
    

    // Transfer heat

    // from heater to heating fluid
    qdot_1 = (heater_temp - fluid_temp) * 800;

    // from heating fluid to vessel wall
    qdot_2 = (fluid_temp - vessel_wall_temp) * 800;

    // from vessel wall to vessel content
    qdot_3 = (vessel_wall_temp - vessel_cont_temp) * 800;

    // from vessel wall to air
    qdot_4 = (vessel_wall_temp - air_temp) * 800;

    
    // from heater to heating fluid
    fluid_temp += qdot_1 / mass_fluid / heat_cap_water * dt;

    // from heating fluid to heater
    heater_temp -= qdot_1 / mass_heater / heat_cap_steel * dt;

    // from heating fluid to vessel wall
    vessel_wall_temp += qdot_2 / mass_vessel_wall / heat_cap_steel * dt;

    // from vessel wall to heating fluid
    fluid_temp -= qdot_2 / mass_fluid / heat_cap_water * dt;

    // from vessel wall to vessel content
    vessel_cont_temp += qdot_3 / mass_vessel_cont / heat_cap_water * dt;

    //from vessel wall to air
    vessel_wall_temp -= qdot_4 / mass_vessel_wall / heat_cap_steel * dt

    // from vessel content to vessel wall
    vessel_wall_temp -= qdot_3 / mass_vessel_wall / heat_cap_steel * dt;

    
    // add heat to heater
    if(vessel_cont_temp < 75){
        qdot = 100000;
        heater_temp += qdot / mass_heater / heat_cap_steel * dt;
        ctx.fillStyle = "hsl(0, 50%, " + 50 + "%)";
    } else {
        ctx.fillStyle = "hsl(0, 50%, " + 5 + "%)";
    }

    
    ctx.fillRect(85,160,30,180);
    
    itC++;
}



// Initialize
drawPFD();

setInterval(tick, tickS);
