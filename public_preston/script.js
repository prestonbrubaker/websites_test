function toggleDropdown() {
    var dropdownContent = document.getElementById("dropdownMenu");
    dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
}

window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdownContent = document.getElementById("dropdownMenu");
        if (dropdownContent.style.display === "block") {
            dropdownContent.style.display = "none";
        }
    }
}

// Basic JavaScript for interactive elements
document.addEventListener('DOMContentLoaded', () => {
    
    var hue = 0;
    
    var xV = 5;
    var yV = 5;
    var blockS = 20;
    var speed = 1;
    
    // Accessing the canvas element
    var canvas = document.getElementById('canvas1');
    var ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth * 0.2;
    canvas.height = window.innerHeight * 0.4;
  
    var maxW = canvas.width;
    var maxH = canvas.height;

    var x = Math.random() * .5 * maxW;
    var y = Math.random() * .5 * maxH;
  
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, maxW, maxH);
  
    function incrementHue() {

        
  
        // Clear the canvas and draw a new rectangle
        ctx.clearRect(0, 0, maxW, maxH);
        ctx.fillStyle = "#FFFFFF";
        var hue_2 = (hue + 180) % 360;
        ctx.fillRect(0, 0, maxW, maxH);
  
  
        ctx.fillStyle = color_rect;
        ctx.fillStyle = "#4A90E2";
        ctx.fillRect(x, y, blockS, blockS);
  
        x += xV * speed;
        y += yV * speed;
  
        if(x > maxW - blockS || x < 0){
            xV *= -1;
        }
        if(y > maxH - blockS || y < 0){
            yV *= -1;
        }
        speed += .000;
  
        if(speed > 5){
            speed = 0;
        }
    }
  
    
  
    // Call incrementHue every 50 milliseconds (0.05 seconds)
    setInterval(incrementHue, 50);
  });
  
