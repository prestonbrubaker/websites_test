    var canvas = document.getElementById('canvas1');
    var ctx = canvas.getContext('2d');
    var blockSize = 5;
    const grid = 100;
    let hues = [];
    var hue_sto = 'Guest';
    var hue_num = 0;
    var col_c = 7;
    var col_n = ["Name", "Number", "Luck Implied Clicks", "Actual Clicks", "Last Generation", "Luck Ratio", "Secret Number"];
    var off_y = 150;
    var warning = "none";

    canvas.width = 800;
    canvas.height = 3000;
    var maxW = canvas.width;
    var maxH = canvas.height;
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
        ctx.fillText("Secret Number being used: " + hue_num,10,30);
        ctx.fillText("Feedback Message: " + warning, 10, 50);
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
        fetch('/save-game_4', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ hues: hues })
        });
    }

    function loadHues() {
        fetch('/get-game_4')
            .then(response => response.json())
            .then(data => {
                hues = data.hues;
                drawCanvas(hues);
            });
    }

    function getValue() {
        hue_sto = document.getElementById('input_hue').value;
        hue_num = parseFloat(document.getElementById('input_you').value);
        


        for(var y = 0; y < grid; y++){
            if(hues[y][0] == hue_sto && hues[y][6] != hue_num){
                warning = "Invalid secret number!";
            } else if(hues[y][0] == hue_sto && hues[y][6] == hue_num) {
                warning = "Successfully Logged In";
            }
            if(typeof hues[y][0] === 'number'){
                hues[y][0] = hue_sto;
                hues[y][6] = hue_num;
                saveHues();
                loadHues();
                break;
            }else{
                if(hues[y][0] == hue_sto){
                    break;
                }
            }
        }

    }

    function sort_iteration() {
        for(var y = 0; y < grid - 1; y++){
            if(hues[y + 1][2] > hues[y][2]){
                var temp_sto = [hues[y][0], hues[y][1], hues[y][2], hues[y][3], hues[y][4], hues[y][5], hues[y][6], hues[y][7]];
                hues[y][0] = hues[y + 1][0];
                hues[y][1] = hues[y + 1][1];
                hues[y][2] = hues[y + 1][2];
                hues[y][3] = hues[y + 1][3];
                hues[y][4] = hues[y + 1][4];
                hues[y][5] = hues[y + 1][5];
                hues[y][6] = hues[y + 1][6];
                hues[y][7] = hues[y + 1][7];

                hues[y + 1][0] = temp_sto[0];
                hues[y + 1][1] = temp_sto[1];
                hues[y + 1][2] = temp_sto[2];
                hues[y + 1][3] = temp_sto[3];
                hues[y + 1][4] = temp_sto[4];
                hues[y + 1][5] = temp_sto[5];
                hues[y + 1][6] = temp_sto[6];
                hues[y + 1][7] = temp_sto[7];
            }
        }
    }


    function assignValue(){
        var r1 = Math.random();
        if(r1 < 0.1) {
            sort_iteration();
        }
        for(var y = 0; y < grid; y++){
            if(hues[y][0] == hue_sto && hues[y][6] == hue_num){
                var r1 = Math.random();
                if(hues[y][1] < r1){
                    hues[y][1] = r1;
                    hues[y][2] = 1 / (1 - r1);
                }
                hues[y][3] ++;
                hues[y][4] = r1;
                hues[y][5] = hues[y][2] / hues[y][3];
                warning = "Click Successful!";
                saveHues();
                loadHues();
                break;
            } else{
                warning = "Invalid Secret Number!";
                loadHues();
            }
        }
        
    }

    loadHues();
    setInterval(loadHues, 2000);
