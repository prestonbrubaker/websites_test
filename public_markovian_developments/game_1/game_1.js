

document.addEventListener('DOMContentLoaded', function() {
    var xa = 0;
    var xb = 0;
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    var blockSize = 5;
    const grid = 100;
    let hues = [];

    canvas.width = window.innerWidth * 0.9;
    canvas.height = window.innerHeight * 0.9;

    var maxW = canvas.width;
    var maxH = canvas.height;

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
        fetch('/save-game_1', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ hues: hues })
        });
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
        xa -= 0.1;
    }

    function handleKeyD() {
        console.log('Key D is held down');
        xa += 0.1;
    }

    function handleLeftArrow() {
        console.log('Left Arrow is held down');
        xb -= 0.1;
    }

    function handleRightArrow() {
        console.log('Right Arrow is held down');
        xb += 0.1;
    }

    // Object to keep track of key states
    const keysPressed = {
        'a': false,
        'd': false,
        'ArrowLeft': false,
        'ArrowRight': false
    };

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

    // Event listener for keydown
    document.addEventListener('keydown', function(event) {
        const key = event.key;
        if (keysPressed.hasOwnProperty(key) && !keysPressed[key]) {
            keysPressed[key] = true;
            repeatFunction(key);
        }
    });

    // Event listener for keyup
    document.addEventListener('keyup', function(event) {
        const key = event.key;
        if (keysPressed.hasOwnProperty(key)) {
            keysPressed[key] = false;
        }


        
    });

    ctx.fillStyle = "#FF0000";
    ctx.fillRect(xa * maxW, 200, 50, 200);
    ctx.fillStyle = "#00FF00";
    ctx.fillRect(xb * maxW, 200, 50, 200);

    loadHues();
    setInterval(loadHues, 2000);
});
