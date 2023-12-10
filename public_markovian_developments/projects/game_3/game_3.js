

    var canvas = document.getElementById('canvas1');
    var ctx = canvas.getContext('2d');
    var canvas2 = document.getElementById('canvas2');
    var ctx2 = canvas2.getContext('2d');
    var blockSize = 5;
    const grid = 3;
    let hues = [];
    var hue_sto = -1;
    var time = 0;
    var time_epoch_ref = Date.now();
    var time_epoch = 0;
    var time_lost = 0;
    var sum_sq_time_lost = 0;
    var comp_speed = 0;
    var tickS = 50;
    

    canvas.width = 500;
    canvas.height = 500;

    canvas2.width = 500;
    canvas2.height = 500;
    
    
    var maxW = canvas.width;
    var maxH = canvas.height;
    if(maxW > maxH){
        canvas.width = canvas.height;
        maxW = canvas.width;
        maxH = canvas.height;
        blockSize = Math.floor(maxH / grid);
        
    } else{
        canvas.height = canvas.width;
        maxW = canvas.width;
        maxH = canvas.height;
        blockSize = Math.floor(maxW / grid);

    }
    if(blockSize < 1){
        blockSize = 1;
    }

    function drawCanvas(hues) {
        ctx.clearRect(0,0,maxW,maxH);
        for (let i = 0; i < grid; i++) {
            for (let j = 0; j < grid; j++) {
                ctx.fillStyle = `hsl(${hues[i][j]}, 100%, 50%)`;
                ctx.fillRect(j * blockSize, i * blockSize, blockSize, blockSize);
            }
        }
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText("Hue: " + hue_sto, 10, 10);
        ctx2.clearRect(0,0,maxW,maxH);
        time_epoch = Date.now() - time_epoch_ref;
        time_lost = time - time_epoch;
        sum_sq_time_lost += time_lost ** 2;
        comp_speed = sum_sq_time_lost / time_epoch
        ctx2.fillStyle = "#000000";
        ctx2.fillText("Epoch Time: " + Date.now(),10,10);
        ctx2.fillText("Game Time: " + time,10,30);
        ctx2.fillText("Actual Time: " + time_epoch,10,50);
        ctx2.fillText("Lost Time: " + time_lost,10,70);
        ctx2.fillText("Sum Squared of Lost Time: " + sum_sq_time_lost,10,90);
        ctx2.fillText("Computer Fitness: " + comp_speed,10,110);
        if(Date.now() % Math.floor(hues[0][0]) < Math.floor(hues[0][0] / 2)){
            ctx2.fillStyle = "#000000";
        } else{
            ctx2.fillStyle = "#FFFFFF";
        }
        
        ctx2.fillRect(100,200,300,300);
        
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
        fetch('/save-game_3', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ hues: hues })
        });
    }

    function loadHues() {
        fetch('/get-game_3')
            .then(response => response.json())
            .then(data => {
                hues = data.hues;
                drawCanvas(hues);
            });
        time += tickS;
    }

    function getValue() {
        hue_sto = document.getElementById('input_hue').value;
    }

    loadHues();
    setInterval(loadHues, tickS);
