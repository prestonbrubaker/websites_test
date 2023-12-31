    var canvas = document.getElementById('canvas1');
    var ctx = canvas.getContext('2d');
    var blockSize = 5;
    const grid = 100;
    let hues = [];
    var hue_sto = -1

    canvas.width = 500;
    canvas.height = 500;
    var maxW = canvas.width;
    var maxH = canvas.height;
    if(maxW > maxH){
        canvas.width = canvas.height;
        
        blockSize = Math.floor(maxH /100);
        
    } else{
        canvas.height = canvas.width;
        
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
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText("Hue: " + hue_sto, 10, 10);
    }

    canvas.addEventListener('click', function(event) {
        const x = Math.floor(event.offsetX / blockSize);
        const y = Math.floor(event.offsetY / blockSize);
        if(hue_sto == -1){
            hues[y][x] = Math.floor(Math.random() * 360); // Random hue
        } else {
            hues[y][x] = Math.floor(hue_sto);
        }

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

    function getValue() {
        hue_sto = document.getElementById('input_hue').value;
    }

    loadHues();
    setInterval(loadHues, 2000);

