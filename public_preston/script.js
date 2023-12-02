// Basic JavaScript for interactive elements
document.addEventListener('DOMContentLoaded', () => {
    function getRandomColor() {
        const hue = Math.floor(Math.random() * 360);
        const saturation = 50
        const lightness = 50
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }

    function applyRandomBackgroundColor() {
        const randomColor = getRandomColor();
        document.body.style.backgroundColor = randomColor;
    }

    applyRandomBackgroundColor();
    
    var hue = 0;
    var x = 78;
    var y = 235;
    var xV = 5;
    var yV = 5;
    var blockS = 20;
    var speed = 1;
    
    // Accessing the canvas element
    var canvas = document.getElementById('canvas1');
    var ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth * 0.5;
    canvas.height = window.innerHeight * 0.4;
  
    var maxW = canvas.width;
    var maxH = canvas.height;
  
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, maxW, maxH);
  
    function incrementHue() {
        // Increment the hue
        hue = (hue + speed) % 360; // This will cycle hue from 0 to 359
  
        // Set the fill color using HSL
        var color_rect = "hsl(" + hue + ", 100%, 50%)";
        
  
        // Clear the canvas and draw a new rectangle
        ctx.clearRect(0, 0, maxW, maxH);
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, maxW, maxH);
  
  
        ctx.fillStyle = color_rect;
        ctx.fillRect(x, y, blockS, blockS);
  
        x += xV * speed;
        y += yV * speed;
  
        if(x > maxW - blockS || x < 0){
            xV *= -1;
        }
        if(y > maxH - blockS || y < 0){
            yV *= -1;
        }
        speed += .001;
  
        if(speed > 5){
            speed = 0;
        }
    }
  
    
  
    // Call incrementHue every 50 milliseconds (0.05 seconds)
    setInterval(incrementHue, 50);
  });
  
