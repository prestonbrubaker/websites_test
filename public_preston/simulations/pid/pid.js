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
const tickS = 20;
const maxW = c.width;   
const maxH = c.height;
    
const bgHue = "#777777";
    
    
ctx.fillStyle = bgHue;
ctx.fillRect(0, 0, maxW, maxH);

    
var c2 = document.getElementById("canvas2");
var ctx2 = c2.getContext("2d");
    
ctx2.fillStyle = bgHue;
ctx2.fillRect(0, 0, maxW, maxH);

ctx2.fillStyle = "#000000"
ctx2.fillRect(30, maxH - 30, maxW - 60,2);
ctx2.fillRect(30, maxH - 30, -2,-250);

ctx2.fillStyle = "#FFFFFF";
ctx2.fillText("Time", maxW / 2 - 20, 485);
ctx2.fillText("Temp.", 0, 310);

var c3 = document.getElementById("canvas3");
var ctx3 = c3.getContext("2d");
    
ctx3.fillStyle = bgHue;
ctx3.fillRect(0, 0, maxW, maxH);

ctx3.fillStyle = "#000000";
ctx3.fillRect(29, 299, maxW - 60, 2);
ctx3.fillRect(29,maxH - 30, 2, -300);

ctx3.fillStyle = "#FFFFFF";
ctx3.fillText("Time", maxW / 2 - 20, 310);
ctx3.fillText("Temp.", 0, 260);



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
var heat_cap_ethylene_glycol = 2090; // J per kg Kelvin
var qdot = 0;
var qdot_1 = 0;
var qdot_2 = 0;
var qdot_3 = 0;
var qdot_4 = 0;
var dt = 10; //seconds per interval
var setpoint_temp = 75;
var max_q = 100000;
var derivative = 0;
var derivative_sto = 0;
var multiplier = 0;
var integral = 0;

var method = 0; // 0 is setpoint, 1 is proportional, 2 is PD, 3 is PID


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
    ctx.arc(400, 75, 24, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(400, 425, 24, 0, 2 * Math.PI);
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
    ctx.arc(250, 425, 25, 0, 2 * Math.PI);
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
    ctx.fillText("Electric Heater", 130, 340);
    ctx.fillText("Centrifugal Pump", 210, 460);
    ctx.fillText("Vessel", 430, 410);
    

    
    
}
    

function initialize() {

    //left canvas

    itC = 0;
    
    ctx2.clearRect(0, 0, maxW, maxH);
    ctx2.fillStyle = bgHue;
    ctx2.fillRect(0, 0, maxW, maxH);

    ctx3.clearRect(0,0,maxW,maxH);
    ctx3.fillStyle = bgHue;
    ctx3.fillRect(0, 0, maxW, maxH);

    ctx3.fillStyle = "#000000";
    ctx3.fillRect(29, 299, maxW - 60, 2);
    ctx3.fillRect(29,maxH - 30, 2, -300);
    
    ctx3.fillStyle = "#FFFFFF";
    ctx3.fillText("Time", maxW / 2 - 20, 310);
    ctx3.fillText("Temp.", 0, 260);
    
    heater_temp = 20;
    fluid_temp = 20;
    vessel_wall_temp = 20;
    vessel_cont_temp = 20;
    air_temp = 20;

    ctx2.fillStyle = "#000000"
    ctx2.fillRect(29, maxH - 31, maxW - 60,2);
    ctx2.fillRect(29, maxH - 31, -2,-250);

    ctx2.fillStyle = "#FFFFFF";
    ctx2.fillText("Time", maxW / 2 - 20, 485);
    ctx2.fillText("Temp.", 0, 310);

}


function tick() {
    
    if(itC > 8000){
        initialize();
    }
    
    // Clear and fill background
    ctx2.clearRect(0, 0, maxW, maxH / 4);
    ctx2.fillStyle = "#555555";
    ctx2.fillRect(0, 0, maxW, maxH / 4);
    
    // Write troubleshooting info
    ctx2.fillStyle = "#FFFFFF";
    
    ctx2.fillText("Graph of Temperatures", maxW / 2 - 30, 10);

    if(method == 0){
        ctx2.fillText("Control Mode: Setpoint", maxW / 2 - 30, 50);
    }else if (method == 1){
        ctx2.fillText("Control Mode: Proportional", maxW / 2 - 30, 50);
    }else if (method == 2){
        ctx2.fillText("Control Mode: PD", maxW / 2 - 30, 50);
    }else if (method == 3){
        ctx2.fillText("Control Mode: PID", maxW / 2 - 30, 50);
    }

    
    // Write troubleshooting info
    ctx2.fillStyle = "#FFFFFF";
    ctx2.fillText("Time (minutes):  " + Math.floor (itC * dt / 60), 10, 10);
    ctx2.fillStyle = "#FF0000";
    ctx2.fillText("Heater", 10, 30);
    ctx2.fillStyle = "#FFFF00";
    ctx2.fillText("Heating Fluid", 10, 50);
    ctx2.fillStyle = "#00FF00";
    ctx2.fillText("Wall of Vessel", 10, 70);
    ctx2.fillStyle = "#0000FF";
    ctx2.fillText("Vessel Contents", 10, 90);
    
    ctx3.clearRect(0,0,maxW,150);
    ctx3.fillStyle = "#555555";
    ctx3.fillRect(0,0,maxW,150);
    
    ctx3.fillStyle = "#FFFFFF";
    
    ctx3.fillText("Data and Setpoint Fittness", maxW / 2 - 50, 10);
    
    ctx3.fillText("Heater temp:  " + Math.floor(heater_temp) + "° C", 10, 30);
    ctx3.fillText("Fluid temp:  " + Math.floor(fluid_temp) + "° C", 10, 50);
    ctx3.fillText("Vessel wall temp:  " + Math.floor(vessel_wall_temp) + "°C", 10, 70);
    ctx3.fillText("Vessel cont temp:  " + (Math.floor(vessel_cont_temp * 10) / 10) + "°C", 10, 90);

    ctx3.fillText("Derivative:  " + Math.floor(derivative * 60 * 100) / 100 + "°C/min", 150, 30);
    ctx3.fillText("Pseudo-Integral:  " + Math.floor(integral / 60) + "°C * min", 150, 50);
    ctx3.fillText("Multiplier of qmax:  " + Math.floor(multiplier * 100) / 100 , 150, 70);
    
    ctx3.fillText("q1 heater to fluid:  " + Math.floor(qdot_1) + " J/s", 300, 30);
    ctx3.fillText("q2 fluid to vessel wall:  " + Math.floor(qdot_2) + " J/s", 300, 50);
    ctx3.fillText("q3 vessel wall to vessel content:  " + Math.floor(qdot_3) + " J/s", 300, 70);
    ctx3.fillText("q4 vessel wall to air:  " + Math.floor(qdot_4) + " J/s", 300, 90);
    if(vessel_cont_temp < 150){
        ctx3.fillText("Abs. pressure in vessel:  " + Math.floor((10 ** (5.08354 - 1663.125 / (vessel_cont_temp + 273.15 - 45.622)) + 1.01325 ) * 1000) / 1000 + " bar", 300, 110)    //Antoine Equation Parameters taken from NIST Chemistry WebBook, SRD 69
    } else {
        ctx3.fillText("Abs. pressure in vessel:  " + Math.floor((10 ** (3.55959 - 643.748 / (vessel_cont_temp + 273.15 - 198.043)) + 1.01325 ) * 1000) / 1000 + " bar", 300, 110)    //Antoine Equation Parameters taken from NIST Chemistry WebBook, SRD 69
    }
    ctx3.fillStyle = "#0000FF";
    ctx3.fillText("Difference between vessel contents and setpoint:  " + Math.floor(vessel_cont_temp - 75) + "°C", 10, 110);
    ctx3.fillStyle = "#00FF00";
    ctx3.fillText("Log of absolute difference between vessel contents and setpoint:  " + Math.floor(Math.log(Math.abs((vessel_cont_temp - 75)))), 10, 130);

    //plot temps
    ctx2.fillStyle = "#FF0000";
    ctx2.fillRect(itC / 8000 * (maxW - 60) + 30, maxH - (heater_temp - 20) * 1 - 30, 2, 2)
    
    ctx2.fillStyle = "#FFFF00";
    ctx2.fillRect(itC / 8000 * (maxW - 60) + 30, maxH - (fluid_temp - 20) * 1 - 30, 2, 2)

    ctx2.fillStyle = "#00FF00";
    ctx2.fillRect(itC / 8000 * (maxW - 60) + 30, maxH - (vessel_wall_temp - 20) * 1 - 30, 2, 2)

    ctx2.fillStyle = "#0000FF";
    ctx2.fillRect(itC / 8000 * (maxW - 60) + 30, maxH - (vessel_cont_temp - 20) * 1 - 30, 2, 2)
    
    
    ctx3.fillStyle = "#0000FF";
    ctx3.fillRect(itC / 8000 * (maxW - 60) + 30, 300 - (vessel_cont_temp - 75) * 3, 2, 2);
    ctx3.fillStyle = "#00FF00";
    ctx3.fillRect(itC / 8000 * (maxW - 60) + 30, 300 - Math.log(Math.abs((vessel_cont_temp - 75))) * 10, 2, 2);

    

    // Transfer heat

    // from heater to heating fluid
    qdot_1 = (heater_temp - fluid_temp) * 800;

    // from heating fluid to vessel wall
    qdot_2 = (fluid_temp - vessel_wall_temp) * 500;

    // from vessel wall to vessel content
    qdot_3 = (vessel_wall_temp - vessel_cont_temp) * 500;

    // from vessel wall to air
    qdot_4 = (vessel_wall_temp - air_temp) * 150;

    
    // from heater to heating fluid
    fluid_temp += qdot_1 / mass_fluid / heat_cap_ethylene_glycol * dt;

    // from heating fluid to heater
    heater_temp -= qdot_1 / mass_heater / heat_cap_steel * dt;

    // from heating fluid to vessel wall
    vessel_wall_temp += qdot_2 / mass_vessel_wall / heat_cap_steel * dt;

    // from vessel wall to heating fluid
    fluid_temp -= qdot_2 / mass_fluid / heat_cap_ethylene_glycol * dt;

    // from vessel wall to vessel content
    integral += (vessel_cont_temp - setpoint_temp) * dt;
    integral *= 0.995;
    vessel_cont_temp += qdot_3 / mass_vessel_cont / heat_cap_water * dt;
    derivative = qdot_3 / mass_vessel_cont / heat_cap_water;
    
    //from vessel wall to air
    vessel_wall_temp -= qdot_4 / mass_vessel_wall / heat_cap_steel * dt

    // from vessel content to vessel wall
    vessel_wall_temp -= qdot_3 / mass_vessel_wall / heat_cap_steel * dt;

    
    // add heat to heater
    if(method == 0){    //setpoint control
        if(vessel_cont_temp < setpoint_temp){
            multiplier = 1;
            qdot = max_q;
            ctx.fillStyle = "hsl(0, 50%, " + 50 + "%)";
        } else {
            multiplier = 0;
            qdot = 0;
            ctx.fillStyle = "hsl(0, 50%, " + 5 + "%)";
        }
    }else if (method == 1){    // Proportional Control
        multiplier = (setpoint_temp - vessel_cont_temp) / 80;
        if(multiplier > 1){
            qdot = max_q;
        } else if (multiplier > 0){
            qdot = max_q * multiplier;
            ctx.fillStyle = "hsl(0, 50%, " + (50 * multiplier) + "%)";
        } else {
            qdot = 0;
            ctx.fillStyle = "hsl(0, 50%, " + 5 + "%)";
        }
    }else if (method == 2) {    // PD Control
        multiplier = (setpoint_temp - vessel_cont_temp) / 20 - 100 * derivative;
        if(multiplier > 1){
            qdot = max_q;
        } else if (multiplier > 0){
            qdot = max_q * multiplier;
            ctx.fillStyle = "hsl(0, 50%, " + (50 * (multiplier)) + "%)";
        } else {
            qdot = 0;
            ctx.fillStyle = "hsl(0, 50%, " + 5 + "%)";
        }
    }else if (method == 3){    // PID Control
        multiplier = (setpoint_temp - vessel_cont_temp) / 20 - 2100 * derivative - integral / 3000;
        if(multiplier > 1){
            qdot = max_q;
        } else if (multiplier > 0){
            qdot = max_q * multiplier;
            ctx.fillStyle = "hsl(0, 50%, " + (50 * (multiplier)) + "%)";
        } else {
            qdot = 0;
            ctx.fillStyle = "hsl(0, 50%, " + 5 + "%)";
        }
    }

    if (multiplier > 1){
        multiplier = 1;
    }else if (multiplier < 0){
        multiplier = 0;
    }
    
    heater_temp += qdot / mass_heater / heat_cap_steel * dt;

    
    ctx.fillRect(85,160,30,180);
    
    itC++;
}

function button_pressed(setting) {
    method = setting;
    initialize();
}

function disturbance(amount) {
    vessel_cont_temp += amount;
}



// Initialize
drawPFD();

setInterval(tick, tickS);
