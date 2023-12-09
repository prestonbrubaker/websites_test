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
const grid = 100;
let hues = new Array(grid).fill().map(() => new Array(grid).fill(0));

canvas.width = 500;
canvas.height = 500;
var blockSize = Math.min(canvas.width, canvas.height) / grid;

function drawCanvas() {
    for (let i = 0; i < grid; i++) {
        for (let j = 0; j < grid; j++) {
            ctx.fillStyle = `hsl(${hues[i][j]}, 100%, 50%)`;
            ctx.fillRect(j * blockSize, i * blockSize, blockSize, blockSize);
        }
    }
}

canvas.addEventListener('click', function(event) {
    const x = Math.floor(event.offsetX / blockSize);
    const y = Math.floor(event.offsetY / blockSize);
    hues[y][x] = Math.floor(Math.random() * 360);
    drawCanvas();
});

drawCanvas(); // Initial draw to fill the canvas
