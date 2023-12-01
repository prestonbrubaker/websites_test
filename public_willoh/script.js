const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let player = { x: 50, width: 50, height: 50, dy: 0 };
let gravity = 0.5;
let obstacles = [];
let isJumping = false;
let score = 0;
let groundLevel;
let maxJumpHeight = 100; // Maximum height the player can reach above the ground

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight * 0.3; // Increased frame height
  groundLevel = canvas.height - 40; // Taller ground/grass area
  player.y = groundLevel - player.height;
}

function drawPlayer() {
  ctx.fillStyle = 'black';
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function updatePlayer() {
  if (isJumping) {
    player.dy = -10;
    isJumping = false;
  }

  player.y += player.dy;
  player.dy += gravity;

  // Limit the jump height
  if (player.y < groundLevel - player.height - maxJumpHeight) {
    player.dy = gravity;
  }

  // Prevent player from going below the ground
  if (player.y > groundLevel - player.height) {
    player.y = groundLevel - player.height;
    player.dy = 0;
  }
}

function drawGround() {
  // Enhanced ground/grass appearance
  ctx.fillStyle = '#0a8021'; // Darker green for the grass
  ctx.fillRect(0, groundLevel, canvas.width, 40); // Taller grass area
  // Add more details to the grass if needed
}

function drawObstacles() {
  ctx.fillStyle = 'red';
  obstacles.forEach(obstacle => {
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
  });
}

function updateObstacles() {
  if (Math.random() < 0.02) { // Adjust the frequency of obstacles
    obstacles.push({ x: canvas.width, y: groundLevel - 50, width: 20, height: 50 });
  }

  obstacles.forEach(obstacle => {
    obstacle.x -= 5; // Adjust the speed of obstacles
  });

  obstacles = obstacles.filter(obstacle => obstacle.x + obstacle.width > 0);
}

function checkCollision() {
  obstacles.forEach(obstacle => {
    if (player.x < obstacle.x + obstacle.width &&
        player.x + player.width > obstacle.x &&
        player.y < obstacle.y + obstacle.height &&
        player.y + player.height > obstacle.y) {
      resetGame(); // Reset the game on collision
    }
  });
}

function resetGame() {
  score = 0;
  obstacles = [];
}

function drawScore() {
  ctx.fillStyle = 'black';
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, 10, 30);
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawGround();
  drawPlayer();
  updatePlayer();
  drawObstacles();
  updateObstacles();
  checkCollision();
  drawScore();

  score++;

  requestAnimationFrame(gameLoop);
}

window.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && player.y >= groundLevel - player.height) {
      isJumping = true;
    }
  });
  
gameLoop();
