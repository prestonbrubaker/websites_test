
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    const grid = 100; // 100x100 grid
    let hues = [];

    // Function to adjust canvas size
    function adjustCanvasSize() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    adjustCanvasSize(); // Adjust on initial load

    // Adjust canvas size on window resize
    window.addEventListener('resize', adjustCanvasSize);

    function drawCanvas(hues) {
        var blockSize = canvas.width / grid; // Calculate block size based on canvas size

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
        hues[y][x] = Math.floor(Math.random() * 360); // Random hue

        drawCanvas(hues);
        saveHues();
    });

    function saveHues() {
        fetch('/save-canvas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ hues: hues })
        });
    }

    function loadHues() {
        fetch('/get-canvas')
            .then(response => response.json())
            .then(data => {
                hues = data.hues;
                drawCanvas(hues);
            });
    }

    loadHues();
    setInterval(loadHues, 2000);
});
