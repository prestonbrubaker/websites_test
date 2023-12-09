function toggleDropdown() {
    var dropdownContent = document.getElementById("dropdownMenu");
    dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
}

window.onclick = function(event) {
    if (!event.target.matches('.dropdwn')) {
        var dropdownContent = document.getElementById("dropdownMenu");
        if (dropdownContent.style.display === "block") {
            dropdownContent.style.display = "none";
        }
    }
}

var canvas = document.getElementById('canvas1');
var ctx = canvas.getContext('2d');
const grid = 5;
let hues = new Array(grid).fill().map(() => new Array(grid).fill(0));
var unlocked = 0;


var blockSize = Math.min(canvas.width, canvas.height) / grid;

function drawCanvas() {
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    if(unlocked == 1){
        for (let i = 0; i < grid; i++) {
            for (let j = 0; j < grid; j++) {
                if (typeof hues[i][j] === 'number') {
                    ctx.fillStyle = `hsl(${hues[i][j]}, 100%, 50%)`;
                    ctx.fillRect(j * blockSize, i * blockSize, blockSize, blockSize);
                } else {
                    if ( (i + j ) % 2 == 1){
                        ctx.fillStyle = "#777777";
                    }else {
                        ctx.fillStyle = "#FFFFFF";
                    }
                    ctx.fillRect(j * blockSize, i * blockSize, blockSize, blockSize);
                    ctx.fillStyle = "#000000";
                    ctx.fillText(hues[i][j], j * blockSize + blockSize / 2, i * blockSize + blockSize / 2);
                }
            }
        }
    } else {
        ctx.fillStyle = "#777777";
        ctx.fillRect(0,0,maxW,maxH);
        ctx.fillStyle = "#000000";
        ctx.fillText("LOCKED!!!, maxW / 2, maxH / 2);
}

canvas.addEventListener('click', function(event) {
    const x = Math.floor(event.offsetX / blockSize);
    const y = Math.floor(event.offsetY / blockSize);
    hues[y][x] = Math.floor(Math.random() * 360);
    saveHues();
    drawCanvas();
});

drawCanvas(); // Initial draw to fill the canvas

function saveHues() {
    fetch('/save-game_2', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hues: hues })
    }).catch(error => console.error('Error:', error));
}

function loadHues() {
    fetch('/get-game_2')
        .then(response => response.json())
        .then(data => {
            if (data && data.hues) {
                hues = data.hues;
                drawCanvas();
            }
        }).catch(error => console.error('Error:', error));
}

function getValue() {
    x = Math.floor(Math.random() * grid);
    y = Math.floor(Math.random() * grid);
    var input = document.getElementById('input_message').value
    if(input == "Scott" || input == "scott"){
        unlocked = 1;
        
    } else if (unlocked == 1){
        hues[y][x] = input;
    }
    saveHues();
    loadHues();
}

loadHues();
setInterval(loadHues, 2000);

