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

canvas.width = 500;
canvas.height = 500;
var maxW = canvas.width;
var maxH = canvas.height;
var blockSize = Math.min(maxW, maxH) / grid;
var numbify = 0;
var key_g = 0;
var key_c = -0.5460471316795027;

function drawCanvas() {
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    if (unlocked == 1) {
        for (let i = 0; i < grid; i++) {
            for (let j = 0; j < grid; j++) {
                if (typeof hues[i][j] === 'number') {
                    ctx.fillStyle = `hsl(${hues[i][j]}, 100%, 50%)`;
                    ctx.fillRect(j * blockSize, i * blockSize, blockSize, blockSize);
                } else {
                    ctx.fillStyle = (i + j) % 2 == 1 ? "#777777" : "#FFFFFF";
                    ctx.fillRect(j * blockSize, i * blockSize, blockSize, blockSize);
                    ctx.fillStyle = "#000000";
                    ctx.fillText(hues[i][j], j * blockSize + blockSize / 2, i * blockSize + blockSize / 2);
                }
            }
        }
    } else {
        ctx.fillStyle = "#777777";
        ctx.fillRect(0, 0, maxW, maxH);
        ctx.fillStyle = "#000000";
        ctx.fillText("LOCKED!!!", maxW / 2, maxH / 2);
        ctx.fillText("Last Guess Numbified: " + numbify, maxW / 2, maxH / 2 + 30);
        ctx.fillText("Last Guess Key: " + key_g, maxW / 2, maxH / 2 + 60);
        ctx.fillText("Correct Key: " + key_a, maxW / 2, maxH / 2 + 90);
    }
}

canvas.addEventListener('click', function(event) {
    if (unlocked == 1) {
        const x = Math.floor(event.offsetX / blockSize);
        const y = Math.floor(event.offsetY / blockSize);
        hues[y][x] = Math.floor(Math.random() * 360);
        saveHues();
        drawCanvas();
    }
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

function stringToNumberHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0; // Convert to a 32bit integer
    }
    return hash;
}

function getValue() {
    var input_m = document.getElementById('input_message').value;
    numbify = stringToNumberHash(input_m);
    key_g = Math.sin ( numbify / 100 );
    if (key_g == -0.5460471316795027) {
        unlocked = 1;
        drawCanvas();
    } else if (unlocked == 1) {
        const x = Math.floor(Math.random() * grid);
        const y = Math.floor(Math.random() * grid);
        hues[y][x] = input_m;
        drawCanvas();
        saveHues();
    }
}





loadHues();
setInterval(loadHues, 2000);
