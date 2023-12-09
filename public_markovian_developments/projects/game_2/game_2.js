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
    var blockSize = 5;
    const grid = 100;
    let hues = [];

    var maxW = canvas.width;
    var maxH = canvas.height;

    blockS = maxH / grid


    function drawCanvas(hues) {
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
        fetch('/save-game_2', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ hues: hues })
        });
    }

    function loadHues() {
        fetch('/get-game_2')
            .then(response => response.json())
            .then(data => {
                hues = data.hues;
                drawCanvas(hues);
            });
    }

    loadHues();
    setInterval(loadHues, 2000);

