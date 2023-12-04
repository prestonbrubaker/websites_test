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
var isFullscreen = false;


var itC = 0;
const tickS = 100;
const minW = 0;
const minH = 0;
var maxW = c.width;   
var maxH = c.height;
var pixS = Math.floor(10);
var pixS_OG = pixS;

// Creatures
cr_x = [400, 300, 200, 100];
cr_y = [400, 200, 304, 100];

cr_v_x = [0, 0, 0, 0];
cr_v_y = [0, 0, 0, 0];
cr_age = [0, 0, 0, 0];

cr_food = [10, 10, 10, 10];
cr_speed = [3, 2, 1.5, 5];
cr_rep_ratio = [0.5, 0.2, 0.4, 0.9];

cr_size = 10;

cr_hue = [20, 100, 200, 300];


const bgHue = "#777777";
var pCX = Math.floor(maxW / pixS );  // count of pixels across the screen
var pCY = Math.floor(maxH / pixS );  // count of pixels across the screen
var maxW_OG = maxW;
var maxH_OG = maxH;



function updateWorld() {
    maxW = c.width;
    maxH = c.height;
    pixS = maxW / maxW_OG * pixS_OG;
}



var pA = new Array(pCY);

var cloneA = new Array(pCY);


function initialize(){
    for (var y = 0; y < pCY ; y++){
        temp_x = new Array(pCX);
        for (var x = 0; x < pCX; x++){
            temp_x[x] = Math.random() * 3;
        }
        pA[y] = temp_x;
        cloneA[y] = temp_x;
    }
}

function calculateMean(arr) {
    const total = arr.reduce((sum, value) => sum + value, 0);
    return total / arr.length;
}

function calculateStandardDeviation(arr) {
    const mean = calculateMean(arr);
    const squareDiffs = arr.map(value => {
        const diff = value - mean;
        return diff * diff;
    });
    const avgSquareDiff = calculateMean(squareDiffs);
    return Math.sqrt(avgSquareDiff);
}


function tick() {
    // Clear and fill background
    ctx.clearRect(minW, minH, maxW, maxH);
    ctx.fillStyle = bgHue;
    ctx.fillRect(minW, minH, maxW, maxH);
    
    var total_food = 0
    // Draw screen
    ctx.fillStyle = "#666666";
    var max_i_love_willoh = 0
    for( var y = 0; y < pCY; y++){
        for (var x = 0; x < pCX; x++){
            if(pA[y][x] > max_i_love_willoh){
                max_i_love_willoh = pA[y][x];
            }
        }
    }

    for( var y = 0; y < pCY; y++){
        for (var x = 0; x < pCX; x++){
            ctx.fillStyle = "hsl(" + Math.abs(pA[y][x]) * 360 / max_i_love_willoh + ", 10%, 30%)"; // Blue color
            ctx.fillRect(x * pixS, y * pixS, pixS, pixS);
            total_food += pA[y][x];
            pA[y][x] += Math.random() * Math.random() * 0.08;
            
        }
    }
    var current_len = cr_hue.length;
    // Draw Fish
    for( var i = 0; i < current_len; i++){
        x = cr_x[i];
        y = cr_y[i];
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(x - 0.5 * cr_size * 1.2, y - 0.5 * cr_size * 1.2, cr_size * 1.2, cr_size * 1.2);
        ctx.fillStyle = "hsl(" + cr_hue[i] + ", 50%, 50%)";
        ctx.fillRect(x - 0.5 * cr_size, y - 0.5 * cr_size, cr_size, cr_size);
        cr_v_x[i] += (Math.random() - 0.5) * cr_speed[i];
        cr_v_y[i] += (Math.random() - 0.5) * cr_speed[i];
        if(x < 0){
            x = 0;
            cr_v_x[i] *= -.1;
        }
        if(x > pCX * pixS - cr_size){
            x = pCX * pixS - cr_size;
            cr_v_x[i] *= -.1;
        }
        if(y < 0){
            y = 0;
            cr_v_y[i] *= -.1;
        }
        if(y > pCY * pixS - cr_size){
            y = pCY * pixS - cr_size;
            cr_v_y[i] *= -.1;
        }

        index_x = Math.floor(x / pixS);
        index_y = Math.floor(y / pixS);
        if(index_x < 0){
            index_x = 0;
        }
        if(index_x > pCX - 1){
            index_x = pCX - 1;
        }
        if(index_y < 0){
            index_y = 0;
        }
        if(index_y > pCY - 1){
            index_y = pCY - 1;
        }
        //Add food
        if(pA[index_y][index_x] > 0){
            var food_trans = 0.25 * pA[index_y][index_x];
            pA[index_y][index_x] -= food_trans;
            cr_food[i] += food_trans;
        }

        //Have child if possible
        if(cr_food[i] > 20){
            var child_trans = cr_food[i] * cr_rep_ratio[i];
            cr_food[i] -= child_trans;
            cr_x.push(cr_x[i]);
            cr_y.push(cr_y[i]);
            cr_v_x.push(cr_v_x[i] * 0.5);
            cr_v_y.push(cr_v_y[i] * 0.5);
            cr_food.push(child_trans);
            cr_hue.push(cr_hue[i] + (Math.random() - 0.5) * 10);
            cr_speed.push(cr_speed[i] * (Math.random() * 0.1 + 0.95));
            cr_age.push(0);
            cr_rep_ratio.push(cr_rep_ratio[i] + (Math.random() - 0.5) * 0.01)
        }

        x += cr_v_x[i];
        y += cr_v_y[i];

        cr_x[i] = x;
        cr_y[i] = y;

        // Metabolism
        cr_food[i] -= .01 * Math.abs(cr_speed[i]) ** 2 + .1;
        cr_age[i] += 1;
        

    }

    // Kill those without food or too old
    for(var i = current_len - 1; i >= 0; i--){
        if(cr_food[i] <= 0 || cr_age[i] > 200 + 200 * Math.random()){
            cr_x.splice(i, 1);
            cr_y.splice(i, 1);
            cr_food.splice(i, 1);
            cr_hue.splice(i, 1);
            cr_speed.splice(i, 1);
            cr_v_x.splice(i, 1);
            cr_v_y.splice(i, 1);
            cr_age.splice(i, 1);
            cr_rep_ratio.splice(i, 1);
        }
    }

    // Write troubleshooting info
    ctx.fillStyle = "#000000";
    ctx.fillText("Total Food: " + total_food, 10, 10);

    avg_food = calculateMean(cr_food);
    std_dev_food = calculateStandardDeviation(cr_food);



    ctx.fillText("Average food of organisms: " + Math.floor(avg_food), 10, 20);

    ctx.fillText("Std Dev of food of organisms: " + Math.floor(std_dev_food * 10) / 10, 10, 30);

    avg_speed = calculateMean(cr_speed);

    std_dev_speed = calculateStandardDeviation(cr_speed);

    ctx.fillText("Average speed of organisms: " + Math.floor(avg_speed * 1000) / 1000, 10, 40);

    ctx.fillText("Std Dev of speed of organisms: " + Math.floor(std_dev_speed * 1000) / 1000, 10, 50);

    avg_reprat = calculateMean(cr_rep_ratio);

    std_dev_reprat = calculateStandardDeviation(cr_rep_ratio);

    ctx.fillText("Average reproduction ratio of organisms: " + Math.floor(avg_reprat * 10000) / 10000, 10, 60);

    ctx.fillText("Std Dev of reproduction ratio of organisms: " + Math.floor(std_dev_reprat * 10000) / 10000, 10, 70);

    ctx.fillText("Number of organisms: " + cr_hue.length, 10, 80);

    ctx.fillText("Program by Preston Brubaker", 300, 10);
    ctx.fillText("A red background tile has no food, and the tile has a more purple-shifted hue as it has more food.", 300, 20);
    ctx.fillText("Each agent (small squares) consumes food from the backhround tile and can reproduce if it has sufficient food.", 300, 30);
    ctx.fillText("During reproduction, a small mutation is applied to allow for the agent to become better at getting all the food through generations.", 300, 40);
    ctx.fillText("The trait 'reproduction ratio' decides what fraction of the parents food stores goes to the child", 300, 50);




    itC++;
}

// Initialize

initialize();



setInterval(tick, tickS);
