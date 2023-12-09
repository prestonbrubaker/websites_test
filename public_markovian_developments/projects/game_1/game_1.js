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

document.addEventListener('DOMContentLoaded', function() {
    var xa = .2;
    var xb = .8;
    
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    var blockSize = 5;
    const grid = 100;
    let hues = [];

    canvas.width = window.innerWidth * 0.9;
    canvas.height = window.innerHeight * 0.6;

    var maxW = canvas.width;
    var maxH = canvas.height;
    var charW = maxW * 0.1;
    var charH = maxH * 0.7;

var char_1_hues = [
        [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 45, 69, 55, 51, 60, 90, 60, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 120, 60, 44, 43, 44, 43, 43, 42, 43, 43, 44, 47, 60, 60, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 79, 45, 43, 42, 43, 42, 42, 42, 42, 42, 42, 43, 42, 44, 46, 60, 60, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 60, 54, 43, 43, 43, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 43, 42, 44, 54, 60, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 60, 46, 43, 43, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 43, 43, 46, 60, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 50, 43, 43, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 44, 50, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 51, 43, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 43, 51, 60, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 79, 44, 42, 42, 42, 42, 43, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 43, 42, 42, 42, 42, 44, 60, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 47, 43, 42, 42, 43, 42, 40, 39, 41, 42, 42, 42, 42, 42, 42, 42, 42, 40, 40, 40, 41, 43, 42, 42, 42, 46, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 43, 42, 42, 42, 41, 40, 39, 40, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 41, 39, 39, 40, 43, 42, 42, 44, 60, 0, 0, 0, 0], [0, 0, 0, 0, 0, 47, 42, 42, 42, 40, 40, 40, 42, 43, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 40, 40, 40, 43, 42, 43, 50, 60, 0, 0, 0], [0, 0, 0, 0, 0, 44, 43, 43, 41, 40, 41, 43, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 41, 40, 41, 42, 42, 43, 180, 0, 0, 0], [0, 0, 0, 0, 60, 44, 42, 43, 40, 40, 43, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 40, 40, 43, 42, 43, 60, 0, 0, 0], [0, 0, 0, 0, 44, 42, 42, 41, 40, 42, 42, 42, 43, 42, 42, 43, 42, 42, 42, 42, 42, 42, 43, 42, 42, 42, 42, 42, 42, 41, 41, 42, 43, 48, 0, 0, 0], [0, 0, 0, 0, 50, 43, 43, 41, 41, 43, 42, 42, 40, 40, 40, 41, 42, 42, 42, 42, 42, 43, 40, 39, 39, 39, 43, 42, 42, 40, 42, 42, 43, 46, 60, 0, 0], [0, 0, 0, 0, 46, 42, 42, 42, 43, 43, 42, 40, 40, 40, 40, 40, 40, 42, 42, 42, 42, 40, 40, 40, 40, 40, 40, 43, 42, 42, 43, 42, 42, 44, 60, 0, 0], [0, 0, 0, 0, 45, 42, 42, 42, 42, 43, 75, 44, 40, 40, 41, 40, 39, 42, 42, 42, 41, 39, 41, 41, 41, 41, 43, 72, 43, 42, 42, 42, 43, 46, 60, 0, 0], [0, 0, 0, 0, 46, 42, 42, 42, 43, 127, 207, 157, 42, 42, 42, 42, 43, 42, 42, 42, 42, 41, 42, 42, 42, 43, 167, 206, 110, 43, 42, 42, 42, 45, 120, 0, 0], [0, 0, 0, 0, 46, 42, 42, 43, 86, 205, 206, 204, 44, 42, 42, 42, 42, 43, 42, 42, 42, 42, 42, 42, 42, 43, 205, 206, 206, 80, 43, 42, 42, 44, 60, 0, 0], [0, 0, 0, 0, 46, 43, 43, 55, 205, 206, 206, 206, 48, 42, 43, 42, 42, 42, 42, 42, 42, 42, 42, 42, 43, 48, 207, 206, 206, 206, 55, 43, 43, 47, 0, 0, 0], [0, 0, 0, 0, 53, 43, 46, 205, 206, 206, 206, 206, 137, 41, 41, 43, 42, 42, 42, 42, 42, 42, 42, 41, 41, 151, 206, 206, 206, 206, 204, 45, 43, 40, 0, 0, 0], [0, 0, 0, 0, 30, 44, 191, 206, 206, 206, 206, 206, 198, 40, 40, 40, 40, 39, 40, 40, 40, 39, 40, 40, 40, 198, 206, 206, 206, 206, 206, 190, 44, 90, 0, 0, 0], [0, 0, 0, 0, 0, 177, 206, 206, 206, 206, 206, 206, 206, 46, 42, 38, 40, 40, 41, 42, 41, 41, 40, 42, 44, 206, 206, 206, 206, 206, 206, 205, 161, 120, 0, 0, 0], [0, 0, 0, 0, 139, 205, 206, 206, 206, 206, 206, 206, 206, 75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 60, 83, 206, 206, 206, 206, 206, 206, 206, 205, 120, 0, 0, 0], [0, 0, 0, 0, 199, 205, 206, 206, 206, 206, 206, 206, 206, 43, 42, 42, 120, 60, 0, 0, 60, 60, 48, 44, 43, 206, 206, 206, 206, 206, 206, 206, 206, 200, 180, 0, 0], [0, 0, 0, 0, 206, 206, 206, 206, 206, 206, 206, 206, 206, 41, 40, 40, 41, 39, 39, 40, 41, 40, 40, 39, 42, 206, 206, 206, 206, 206, 206, 206, 206, 201, 60, 0, 0], [0, 0, 0, 0, 205, 206, 206, 206, 206, 206, 206, 206, 206, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 41, 206, 206, 206, 206, 206, 206, 206, 206, 204, 60, 0, 0], [0, 0, 0, 0, 155, 206, 206, 206, 206, 206, 206, 206, 199, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 39, 199, 206, 206, 206, 206, 206, 206, 205, 180, 0, 0, 0], [0, 0, 0, 0, 0, 205, 206, 206, 206, 206, 206, 205, 49, 42, 39, 40, 40, 40, 40, 40, 40, 40, 40, 39, 42, 48, 206, 206, 206, 206, 206, 206, 203, 180, 0, 0, 0], [0, 0, 0, 0, 0, 0, 205, 206, 206, 206, 203, 53, 43, 43, 43, 41, 39, 40, 40, 40, 40, 40, 40, 42, 42, 43, 56, 204, 206, 205, 205, 204, 150, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 120, 197, 204, 204, 56, 44, 42, 42, 42, 43, 43, 42, 42, 41, 42, 42, 42, 42, 43, 43, 44, 60, 203, 206, 193, 60, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 60, 60, 44, 43, 43, 43, 42, 42, 42, 42, 42, 43, 43, 42, 43, 44, 60, 90, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 90, 60, 45, 43, 43, 43, 42, 43, 42, 43, 43, 46, 45, 120, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 60, 56, 46, 0, 51, 60, 60, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 357, 357, 357, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 357, 0, 357, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 357, 357, 357, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 357, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 357, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 357, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 357, 357, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 357, 0, 357, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 357, 357, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 357, 0, 357, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 357, 357, 357, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
    ];

    
    if(maxW > maxH){
        blockSize = Math.floor(maxH /100);
    } else{
        blockSize = Math.floor(maxW / 100);
    }
    if(blockSize < 1){
        blockSize = 1;
    }

    function drawCanvas(hues) {
        for (let i = 0; i < 37; i++) {
            for (let j = 0; j < 65; j++) {
                ctx.fillStyle = `hsl(${hues[i][j]}, 100%, 50%)`;
                ctx.fillRect(j * blockSize, i * blockSize, blockSize, blockSize);
            }
        }
        ctx.clearRect(0,0,maxW,maxH)
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0,0,maxW,maxH);
        xa = hues[0][0];
        xb = hues[0][1];
        ctx.fillStyle = "#770000";
        ctx.fillRect(xa * maxW, maxH, charW, -1 * charH);
        ctx.fillStyle = "#007700";
        ctx.fillRect(xb * maxW, maxH, charW, -1 * charH);
        ctx.fillStyle = "#000000";
        ctx.fillText("HI, I'm P.!", xa * maxW, maxH - 1 * charH - 40);
        ctx.fillText("HI, I'm also Willoh!", xb * maxW, maxH - 1 * charH - 40);
        for ( var y = 0; y < 6; y++){
            for ( var x = 0; x < 5; x++){
                ctx.fillStyle = `hsl(${char_1_hues[y][x]}, 100%, 50%)`;
                ctx.fillRect(xa * maxW + x * charW / 5, maxH - y * charH / 6, charW / 5, -1 * charH / 6);
            }
        }
        
    }

    /********************************************************************
    canvas.addEventListener('click', function(event) {
        const x = Math.floor(event.offsetX / blockSize);
        const y = Math.floor(event.offsetY / blockSize);
        hues[y][x] = Math.floor(Math.random() * 360); // Random hue

        drawCanvas(hues);
        saveHues();
    });
    *********************************************************************/
    
    function saveHues() {
        hues[0][0] = xa;
        hues[0][1] = xb;
        fetch('/save-game_1', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ hues: hues })
        });
        loadHues();
    }

    function loadHues() {
        fetch('/get-game_1')
            .then(response => response.json())
            .then(data => {
                hues = data.hues;
                
                drawCanvas(hues);
            });
        
        
        
    }






    
    
    // Define functions for specific keys
    function handleKeyA() {
        console.log('Key A is held down');
        if(xa > 0){
            xa -= 0.01;
        }
        saveHues();
    }

    function handleKeyD() {
        console.log('Key D is held down');
        if(xa < 1 - charW / maxW){
            xa += 0.01;
        }
        
        saveHues();
    }

    function handleLeftArrow() {
        console.log('Left Arrow is held down');
        if(xb > 0){
            xb -= 0.01;
        }
        
        saveHues();
        
    }

    function handleRightArrow() {
        console.log('Right Arrow is held down');
        if(xb < 1 - charW / maxW){
            xb += 0.01;
        }
        saveHues();
    }

        // Object to keep track of key states and the interval function
    const keysPressed = {
        'a': { pressed: false, interval: null },
        'd': { pressed: false, interval: null },
        'ArrowLeft': { pressed: false, interval: null },
        'ArrowRight': { pressed: false, interval: null }
    };
    
    // Event listener for keydown
    document.addEventListener('keydown', function(event) {
        const key = event.key;
        if (!keysPressed[key].pressed) {
            keysPressed[key].pressed = true;
            // Clear any existing interval just in case
            if (keysPressed[key].interval !== null) {
                clearInterval(keysPressed[key].interval);
            }
            // Set a new interval
            keysPressed[key].interval = setInterval(() => {
                repeatFunction(key);
            }, 50); // Calls repeatFunction every 50ms
        }
    });
    
    // Event listener for keyup
    document.addEventListener('keyup', function(event) {
        const key = event.key;
        if (keysPressed[key].pressed) {
            keysPressed[key].pressed = false;
            // Clear the interval when the key is released
            clearInterval(keysPressed[key].interval);
            keysPressed[key].interval = null;
        }
    });

    // Function to call the appropriate function based on the key
    function repeatFunction(key) {
        switch (key) {
            case 'a':
                handleKeyA();
                break;
            case 'd':
                handleKeyD();
                break;
            case 'ArrowLeft':
                handleLeftArrow();
                break;
            case 'ArrowRight':
                handleRightArrow();
                break;
            default:
                // No action for other keys
                break;
        }
    }

    
    


    

    

    loadHues();
    setInterval(loadHues, 300);
});
