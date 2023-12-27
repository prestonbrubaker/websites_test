var c = document.getElementById("canvas1");
var ctx = c.getContext("2d");
var isFullscreen = false;

var pCXW = 1000;      
var pCYW = 800;       
var itC = 0;
const tickS = 50;
const pixS = 10;
const minW = 0;
const minH = 0;
var maxW = c.width;   
var maxH = c.height;   
const bgHue = "#87cefa";
var pCX = Math.floor(maxW / pixS);  
var pCY = Math.floor(maxH / pixS);  

var isMovingRight = false;
var isMovingLeft = false;
var isStill = false;


var pA = new Array(pCY);

var cloneA = new Array(pCY);


// Character

var offXP = 0;  //offset of pixels
var offYP = 190;  //offset of pixels

var player_w = 30;
var player_h = 50;
var player_off_x = maxW / 2;
var player_off_y = maxH / 2;

var player_v_x = 0;  // Player velocity
var player_v_y = 0;

var player_acc_x = .7; // Amount of acceleration for each key press
var player_acc_y = 1.5;

var on_ground = 0;
var in_wall = 0;

// World generation parameters

var min_cave_alt = 290;      // Minimum distance down for cave
var cave_chance = 0.001;     // Chance of a cave seeding
var cave_iterations = 40;    // Cave-forming iterations
var cave_spread_chance = 0.05;   // Chance of a cave spreading to neighbors during iteration

// World elements 0 = air, 1 = mars soil, 2 = dark mars soil, 3 = plant, 4 = earth stone, 5 = water
var elHues = ["#000000", "#8b4513", "#a0522d", "#007700", "#808080", "#000077"];


function genWorld() {
    
    
    
    // Create mars surface layer
    pAinv = new Array(pCXW)
    var alt = 250
    var altV = 0
    for (var x = 0; x < pCXW; x++){
        temp_y = new Array(pCYW);
        altV += (Math.random() - .5) * .5
        alt += altV
        altV *= .8
        if(alt < 0){
            alt = 0
        }
        for (var y = 0; y < pCYW; y++){
            r = Math.random();

            if(y < alt){
                temp_y[y] = 0;
            }
            else{
                r2 = Math.random();
                if(r2 > .2){
                    temp_y[y] = 1;
                }
                else{
                    temp_y[y] = 2;
                }
            }
        }
        pAinv[x] = temp_y
    }

    //transpose
    for(var y = 0; y < pCYW; y++){
        temp_x = new Array(pCXW);
        for(var x = 0; x < pCXW; x++){
            temp_x[x] = pAinv[x][y]
        }
        pA[y] = temp_x
    }

    // Cave generation - seeding

    for(var y = min_cave_alt; y < pCYW - 1; y++){
        for(var x = 1; x < pCXW - 1; x++){
            r = Math.random()
            if(pA[y][x] > 0 & r < cave_chance){
                pA[y][x] = 0
            }
        }
    }

    // Cave generation - expanding

    for(var i = 0; i < cave_iterations; i++){
        for(var y = min_cave_alt; y < pCYW - 1; y++){
            for(var x = 1; x < pCXW - 1; x++){
                if(pA[y][x] == 0){
                    continue;
                }
                neighborC = 0
                for(y_check = -1; y_check <= 1; y_check++){
                    for(x_check = -1; x_check <= 1; x_check++){
                        if(y_check == 0 & x_check == 0){
                            continue;
                        }
                        if(pA[y + y_check][x + x_check] == 0){
                            neighborC++;
                        }

                    }
                }
                r = Math.random()
                if(r < cave_spread_chance * neighborC){
                    pA[y][x] = 0;
                }
            }
        }
    }

    // Cave generation - remove isolated blocks
    for(var i = 0; i < cave_iterations; i++){
        for(var y = min_cave_alt; y < pCYW - 1; y++){
            for(var x = 1; x < pCXW - 1; x++){
                if(pA[y][x] == 0){
                    continue;
                }
                neighborC = 0
                for(y_check = -1; y_check <= 1; y_check++){
                    for(x_check = -1; x_check <= 1; x_check++){
                        if(y_check == 0 & x_check == 0){
                            continue;
                        }
                        if(pA[y + y_check][x + x_check] == 0){
                            neighborC++;
                        }

                    }
                }
                if(neighborC > 7){
                    pA[y][x] = 0;
                }
            }
        }
    }

    // Create Earth
    for(var y = 0; y < 120; y++){
        for(var x = 0; x < pCXW; x++){
            r = Math.random()
            if(r < 0.7){
                pA[y][x] = 4
            }
            else{
                pA[y][x] = 5
            }
            
        }
    }

    //Seed some grass
    for (var y = 0; y < pCYW - 1; y++){
        for (var x = 0; x < pCXW; x++){
            if(pA[y][x] == 0 && pA[y + 1][x] == 2 && Math.random() < 0.1){
                pA[y][x] = 3
            }
        }
    }
    saveWorld();
}

function saveWorld(){
    fetch('/save-bug_craft', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ hues: pA })
        });
}

function loadWorld(){
    fetch('/get-bug_craft')
            .then(response => response.json())
            .then(data => {
                pA = data.hues;
                
            });
}


function tick() {
    // Clear and fill background
    ctx.clearRect(minW, minH, maxW, maxH);
    ctx.fillStyle = bgHue;
    ctx.fillRect(minW, minH, maxW, maxH);


    // Draw screen
    for (var y = 0; y <= pCY; y++){
        for (var x = 0; x <= pCX; x++){
            var x_index = x + Math.floor(offXP)
            var y_index = y + Math.floor(offYP)
            if(pA[y_index][x_index] != 0){
                ctx.fillStyle = elHues[pA[y_index][x_index]];
                ctx.fillRect((x - offXP % 1) * pixS, (y - offYP % 1) * pixS, pixS, pixS);
            }
        }
    }

    // Draw player
    
    // Draw ref
    ctx.fillStyle = "#FF00FF";
    ctx.fillRect(player_off_x - 2 - player_w / 2, player_off_y - 2, 4, 4);

    ctx.fillRect(player_off_x - 2 + player_w / 2, player_off_y - 2, 4, 4);

    ctx.fillRect(player_off_x - 2 - player_w / 2, player_off_y - 2 - player_h, 4, 4);

    ctx.fillRect(player_off_x - 2 + player_w / 2, player_off_y - 2 - player_h, 4, 4);

    var x_coord = offXP * pixS + player_off_x;
    var y_coord = offYP * pixS + player_off_y;
    


    // Physics
    var player_index_x = Math.floor(x_coord / pixS)
    var player_index_y = Math.floor(y_coord / pixS)


    // Collision with ground and gravity (left detector and right detector)
    if(pA[Math.floor(y_coord / pixS + 0.1)][Math.floor(x_coord / pixS - player_w / 2 / pixS)] > 0 || pA[Math.floor(y_coord / pixS + 0.1)][Math.floor(x_coord / pixS + player_w / 2 / pixS)] > 0){
        offYP -= .2 *  ((offYP - .5) % 1 );
        if(on_ground == 0){
            player_v_y *= 0;
        }
        else{
   
        }
        on_ground = 1;
    }
    else if (pA[Math.floor(y_coord / pixS + 0.3)][Math.floor(x_coord / pixS - player_w / 2 / pixS)] == 0 && pA[Math.floor(y_coord / pixS + 0.3)][Math.floor(x_coord / pixS + player_w / 2 / pixS)] == 0){
        player_v_y += 0.1
        on_ground = 0;
    }

    // Collision with ceiling (upper-left detector and right detector)
    if(pA[Math.floor(y_coord / pixS - player_h / pixS - 0.1)][Math.floor(x_coord / pixS - player_w / 2 / pixS)] > 0 || pA[Math.floor(y_coord / pixS - player_h / pixS - 0.1)][Math.floor(x_coord / pixS + player_w / 2 / pixS)] > 0){
        if(offYP % 1 < 0.5){
            offYP += .1;
        }
        offYP = Math.ceil(offYP)
        offYP += 0;
        player_v_y *= -0.5;
    }

    // Collision with walls (left detector)
    if(pA[Math.floor(y_coord / pixS)][Math.floor(x_coord / pixS - player_w / 2 / pixS - .2)] > 0){
        //offXP = Math.ceil(offXP);
        offXP += .2 *  ((offXP - .5) % 1 ) + 0.001;
        player_v_x *= .01;
        in_wall = 1;
    }

    // Collision with walls (right detector)
    else if(pA[Math.floor(y_coord / pixS)][Math.floor(x_coord / pixS + player_w / 2 / pixS + .2)] > 0){
        //offXP = Math.floor(offXP);
        offXP -= .2 *  ((offXP - .5) % 1 ) + 0.001;
        player_v_x *= 0.1;
        in_wall = 1;
    }

    // Collision with walls (upper-left detector)
    else if(pA[Math.floor(y_coord / pixS - 1 - player_h / pixS)][Math.floor(x_coord / pixS - player_w / 2 / pixS - .2)] > 0){
        //offXP = Math.ceil(offXP);
        player_v_x *= 0.1;
        offXP += .2 *  ((offXP - .5) % 1 ) + 0.001;
        in_wall = 1;
    }

    // Collision with walls (upper-right detector)
    else if(pA[Math.floor(y_coord / pixS - 1 - player_h / pixS)][Math.floor(x_coord / pixS + player_w / 2 / pixS + .2)] > 0){
        //offXP = Math.floor(offXP);
        offXP -= .2 *  ((offXP - .5) % 1 ) + 0.001;
        player_v_x *= 0.1;
        in_wall = 1;
    }
    else{
        in_wall = 0;
    }


    offXP += player_v_x;
    offYP += player_v_y;

    if(player_v_x > 0.05){
        isMovingRight = true;
        isMovingLeft = false;
        isStill = false;
    }
    else if(player_v_x < -0.05){
        isMovingLeft = true;
        isMovingRight = false;
        isStill = false;
    }
    else{
        isMovingLeft = false;
        isMovingRight = false;
        isStill = true;
    }

    // Keep player in bounds
    if(offXP < 0){
        offXP = 0;
    }
    if(offXP > pCXW - pCX){
        offXP = pCXW - pCX;
    }
    if(offYP < 0){
        offYP = 0;
    }
    if(offYP > pCYW - pCY - 1){
        offYP = pCYW - pCY - 1;
    }

    if(on_ground == 0){
        player_v_x *= 0.90;
        player_v_y *= 0.90;
    }
    else{
        player_v_x *= 0.70;
        player_v_y *= 0.70;
    }
    

    // Iterate to spread grass
    
    for( i = 0; i < 1000; i++){
        x_check = Math.floor(Math.random() * pCXW);
        y_check = Math.floor(Math.random() * (pCYW - 1));
        if(pA[y_check][x_check] == 3){
            for(var y_it = -2; y_it <= 2; y_it++){
                for(var x_it = -2; x_it <= 2; x_it++){
                    if(y_check + y_it > pCYW - 1 || y_check + y_it < 0 || x_check + x_it > pCXW - 1 || x_check + x_it < 0){
                        continue;
                    }
                    if(Math.random() < 1 && (pA[y_check + 1 + y_it][x_check + x_it] == 2 || pA[y_check + 1 + y_it][x_check + x_it] == 3) && pA[y_check + y_it][x_check + x_it] == 0){
                        pA[y_check + y_it][x_check + x_it] = 3;
                    }
                }
            }
        }
    }
    


    // Write troubleshooting info
    ctx.fillStyle = "#000000";
    ctx.fillText("X-Value of Player: " + x_coord, 10, 10);
    ctx.fillText("Y-Value of Player: " + y_coord, 10, 20);
    ctx.fillText("X-index of Player: " + player_index_x, 10, 30);
    ctx.fillText("Y-index of Player: " + player_index_y, 10, 40);
    ctx.fillText("OffXP: " + offXP, 10, 50);
    ctx.fillText("OffYP: " + offYP, 10, 60);
    ctx.fillText("Player x-velocity: " + player_v_x, 10, 70);
    ctx.fillText("Player y-velocity: " + player_v_y, 10, 80);
    ctx.fillText("Player on Ground?: " + on_ground, 10, 90);
    ctx.fillText("Player in Wall?: " + in_wall, 10, 100);
    ctx.fillText("Iteration Count: " + itC, 10, 110);

    itC++;
}



// Get values of click
c.addEventListener('click', function(event) {
    var rect = c.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    x_index = Math.floor(x / pixS + offXP);
    y_index = Math.floor(y / pixS + offYP);

    for(var y_it = -2; y_it <= 2; y_it++){
        for(var x_it = -2; x_it <= 2; x_it++){
            if(y_index + y_it > pCYW - 1 || y_index + y_it < 0 || x_index + x_it > pCXW - 1 || x_index + x_it < 0){
                continue;
            }
            if(x_it ** 2 + y_it ** 2 > 5){
                continue;
            }
            pA[y_index + y_it][x_index + x_it] = 0;
        }
    }



});



// Get key value
document.addEventListener('keydown', function(event) {
    switch(event.key.toLowerCase()) {
        case 'w': // up
            isStill = true;
            if(offYP > 0 && on_ground == 1) player_v_y = -1 * player_acc_y;
            else player_v_y = 0;
            break;
        case 's': // down
            isStill = true;
            if(offYP < pCYW - pCY && on_ground != 1) player_v_y = 1 * player_acc_x;
            else player_v_y = 0;
            break;
        case 'a': // left
            isMovingLeft = true;
            if(offXP > 0 && in_wall == 0) player_v_x = -1 * player_acc_x;
            else player_v_x = 0;
            break;
        case 'd': // right
            isMovingRight = true;
            if(offXP < pCXW - pCX && in_wall == 0) player_v_x = player_acc_x;
            else player_v_x = 0;
            break;
        //case 'space': // spacebar 

        default:
            // Action for any other key
    }
});

document.addEventListener('keyup', function(event) {
    switch(event.key.toLowerCase()) {
        case 'w': // up
            //isStill = false;
            currentFrame = 2
            break;
        case 's': // down
            //isStill = false;
            currentFrame = 2
            break;
        case 'a': // left
            isMovingLeft = false;
            currentFrame = 2
            break;
        case 'd': // right
            isMovingRight = false;
            currentFrame = 2
            break;
        default:
            // Action for any other key
    }
});

// Mobile Controls--- Disregard for now
function setupMobileControls() {
    var upButton = document.getElementById('up-button');
    var downButton = document.getElementById('down-button');
    var leftButton = document.getElementById('left-button');
    var rightButton = document.getElementById('right-button');

    upButton.addEventListener('touchstart', function() {
        if(offYP > 0) player_v_y -= player_acc_y;
    });

    downButton.addEventListener('touchstart', function() {
        if(offYP < pCYW - pCY) player_v_y += player_acc_y;
    });

    leftButton.addEventListener('touchstart', function() {
        if(offXP > 0) player_v_x -= player_acc_x;
    });

    rightButton.addEventListener('touchstart', function() {
        if(offXP < pCXW - pCX) player_v_x += player_acc_x;
    });
}

// Call this function once the page has loaded
document.addEventListener('DOMContentLoaded', setupMobileControls);



// Initialize
loadWorld();



setInterval(tick, tickS);
