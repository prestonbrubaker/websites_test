let startTime;
let colorStopsStart = []; // Start gradient colors
let colorStopsEnd = []; // End gradient colors

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop(); // We will manually control the drawing loop
  colorMode(RGB); // Use RGB color mode
  startTime = millis();

  // Manually define color stops for the starting ombre (sunrise)
  colorStopsStart = [
    // Replace these colors with those from your sunrise image
    color(255, 189, 109), 
    color(255, 112, 67),  
    color(255, 84, 78),   
  ];

  // Manually define color stops for the ending ombre (sunset)
  colorStopsEnd = [
    // Replace these colors with those from your sunset image
    color(64, 164, 223), 
    color(75, 119, 190), 
    color(52, 92, 150),  
  ];
}

function draw() {
  let cycleDuration = 60000; // 1 minute cycle for a full transition
  let halfCycle = cycleDuration / 2; // Half cycle for transition back
  let elapsedTime = (millis() - startTime) % cycleDuration;
  let lerpValue;

  if (elapsedTime < halfCycle) {
    // First half of the cycle - transition from start to end colors
    lerpValue = map(elapsedTime, 0, halfCycle, 0, 1);
  } else {
    // Second half of the cycle - transition from end back to start colors
    lerpValue = map(elapsedTime, halfCycle, cycleDuration, 1, 0);
  }

  // Calculate and draw the gradient
  drawGradient(lerpValue);
}


function drawGradient(t) {
  for (let i = 0; i <= height; i++) {
    let interA = lerpColor(colorStopsStart[0], colorStopsEnd[0], t);
    let interB = lerpColor(colorStopsStart[1], colorStopsEnd[1], t);
    let interC = lerpColor(colorStopsStart[2], colorStopsEnd[2], t);
    
    // Here we calculate the color at the current height position
    let colorAtHeight = lerpColor(interA, interB, i / height);
    colorAtHeight = lerpColor(colorAtHeight, interC, i / height);

    stroke(colorAtHeight);
    line(0, i, width, i);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Call the draw function every 30 milliseconds to update the canvas
setInterval(() => {
  loop();
}, 30);
