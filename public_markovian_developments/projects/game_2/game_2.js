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
    var charW = maxW * 0.37 * 0.7;
    var charH = maxH * 0.6 * 0.7;


    if(maxW > maxH){
        blockSize = Math.floor(maxH /100);
    } else{
        blockSize = Math.floor(maxW / 100);
    }
    if(blockSize < 1){
        blockSize = 1;
    }

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
        hues[0][0] = xa;
        hues[0][1] = xb;
        fetch('/save-game_2', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ hues: hues })
        });
        loadHues();
    }

    function loadHues() {
        fetch('/get-game_2')
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
        if(xb > 0){
            xb -= 0.01;
        }
        
        saveHues();
        
    }

    function handleRightArrow() {
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
