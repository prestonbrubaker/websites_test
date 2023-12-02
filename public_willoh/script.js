let flowers = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    let flowerCount = 20; // Adjust the number of flowers as needed

    // Create initial set of flowers
    for (let i = 0; i < flowerCount; i++) {
        flowers.push(new Flower(random(width), height - 20, randomRedOrPink()));
    }
}

function draw() {
    background(255);

    // Draw and update each flower
    for (let flower of flowers) {
        flower.update();
        flower.display();
    }
}

// Flower class
class Flower {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = 0; // Starting size of the flower
        this.growthRate = random(0.1, 0.3); // How fast the flower grows
        this.maxSize = random(20, 40); // Maximum size of the flower
        this.stemHeight = 0; // Starting height of the stem
        this.maxStemHeight = random(50, 100); // Maximum height of the stem
        this.petals = floor(random(5, 8)); // Number of petals
    }

    update() {
        // Grow the flower and the stem
        if (this.size < this.maxSize) {
            this.size += this.growthRate;
        }
        if (this.stemHeight < this.maxStemHeight) {
            this.stemHeight += this.growthRate / 2;
        }
    }

    display() {
      // Draw the stem
      stroke(35, 177, 77); // Green for the stem
      strokeWeight(2);
      line(this.x, this.y, this.x, this.y - this.stemHeight);
  
      // Draw the flower
      fill(this.color);
      noStroke(); // Disable stroke for the petals
      for (let i = 0; i < this.petals; i++) {
          push();
          translate(this.x, this.y - this.stemHeight);
          rotate(TWO_PI / this.petals * i);
          ellipse(0, this.size / 4, this.size / 2, this.size); // Petal shape
          pop();
      }
  
      // Draw the center of the flower
      fill(255, 204, 0); // Yellow center
      ellipse(this.x, this.y - this.stemHeight, this.size / 4);
  }
  
}
function randomRedOrPink() {
    // Function to return a random red or pink color
    let colors = [
        color(255, 105, 180), // Hot pink
        color(255, 182, 193), // Light pink
        color(255, 0, 0),     // Red
        color(255, 20, 147)   // Deep pink
    ];
    return random(colors);
}