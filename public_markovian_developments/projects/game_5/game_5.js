document.body.style.cursor = 'url(../images/select.png), auto';

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

    var canvas2 = document.getElementById('canvas2');
    var ctx2 = canvas2.getContext('2d');
    var blockSize = 5;
    const grid = 100;
    let hues = [];
    var hue_sto = 'Guest';
    var col_c = 7;
    var col_n = ["Name", "Number", "Luck Implied Clicks", "Actual Clicks", "Last Generation", "Luck Ratio", "Secret Number"];
    var off_y = 50;

    canvas.width = 800;
    canvas.height = 3000;
    canvas2.width = 800;
    canvas2.height = 800;
    var maxW = canvas.width;
    var maxH = canvas.height;
    var maxW2 = canvas2.width;
    var maxH2 = canvas2.height;
    blockSize = maxH / grid
    if(blockSize < 1){
        blockSize = 1;
    }

    function drawCanvas(hues) {
        ctx.clearRect(0,0,maxW,maxH);
        ctx.fillStyle = "#777777";
        ctx.fillRect(0,0,maxW,maxH);
        ctx.fillStyle = "#000000";
        for (var x = 0; x < col_c; x++){
            ctx.fillText( col_n[x], x * maxW / col_c, off_y - 20);
        }
        
        for (let i = 0; i < grid; i++) {
            for (let j = 0; j < col_c; j++) {
                if (typeof hues[i][j] === 'number') {
                    ctx.fillStyle = `hsl(${hues[i][j]}, 100%, 50%)`;
                    ctx.fillRect(j * maxW / col_c, i * blockSize + off_y, maxW / 2, blockSize);
                    ctx.fillStyle = "#000000";
                    ctx.fillText(hues[i][j], j * maxW / col_c + blockSize / 2, i * blockSize + blockSize / 2 + off_y);
                } else {
                    ctx.fillStyle = (i + j) % 2 == 1 ? "#777777" : "#FFFFFF";
                    ctx.fillRect(j * maxW / col_c, i * blockSize + off_y, maxW / 2, blockSize);
                    ctx.fillStyle = "#000000";
                    ctx.fillText(hues[i][j], j * maxW / 2 + blockSize / 2, i * blockSize + blockSize / 2 + off_y);
                }
            }
        }
    
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText("Logged in as: " + hue_sto, 10, 10);

        ctx2.clearRect(0,0,maxW2,maxH2);
        ctx2.fillStyle = "#777777";
        ctx2.fillRect(0,0,maxW2,maxH2);
        for (var y = 0; y < grid; y++) {
            ctx2.fillStyle = "#000000";
            ctx2.fillRect(y / grid * maxW2, maxH2 / 2 - hues[y][1] * 100 - 1000 * 100, 5, 5);
        }
        
    }

    canvas.addEventListener('click', function(event) {
        const x = Math.floor(event.offsetX / maxW * col_c);
        const y = Math.floor((event.offsetY - off_y) / blockSize);
        if(hue_sto == -1){
            hues[y][x] = 0;
        }

        drawCanvas(hues);
        saveHues();
    });

    function saveHues() {
        fetch('/save-game_5', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ hues: hues })
        });
    }

    function loadHues() {
        fetch('/get-game_5')
            .then(response => response.json())
            .then(data => {
                hues = data.hues;
                drawCanvas(hues);
            });
    }

    function getValue() {
        hue_sto = document.getElementById('input_hue').value;
        

    }

    function assignValue(){
        var r1 = Math.random();
        if(hues[0][3] >= grid){
            hues[0][3] = 1;
        }
        var y = hues[0][3];
        hues[y][0] = y;
        hues[y][1] = hues[y - 1][1] * ( 1 + (r1 - 0.5) * 2 / 1000);

        hues[0][3]++;

        saveHues();
        loadHues();

        
        
    }

    function reset() {
        hues[0][3] = 1;
        hues[0][0] = 0;
        hues[0][1] = 1000;
        saveHues();
        loadHues();
    }

    loadHues();
    setInterval(loadHues, 2000);
