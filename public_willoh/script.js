const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let player = { x: 50, width: 50, height: 50, dy: 0 };
let gravity = 0.5;
let obstacles = [];
let isJumping = false;
let score = 0;
let groundLevel;
let groundSegments = [];
let maxJumpHeight = 100; // Maximum height the player can reach above the ground
let lastObstacleTime = 0;
let obstacleInterval = 1500; // Minimum time interval between obstacles in milliseconds
let groundSpeed = 5; // Speed of ground movement

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight * 0.3; // Increased frame height
  groundLevel = canvas.height - 40; // Taller ground/grass area
  player.y = groundLevel - player.height;
  generateGround();
}

function generateGround() {
  groundSegments = [];
  let segmentWidth = 20;
  for (let i = 0; i < canvas.width / segmentWidth; i++) {
    groundSegments.push({
      x: i * segmentWidth,
      color: getRandomGreen()
    });
  }
}

function getRandomGreen() {
  let greens = ['#0b8922', '#0b8922', '#0b8922'];
  return greens[Math.floor(Math.random() * greens.length)];
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
    groundSegments.forEach(segment => {
      ctx.fillStyle = segment.color;
      ctx.fillRect(segment.x, groundLevel, 20, 40);
    });
  }
  
  function updateGround() {
    groundSegments.forEach(segment => {
      segment.x -= groundSpeed;
    });
  
    if (groundSegments[0].x <= -20) {
      groundSegments.shift();
      groundSegments.push({
        x: groundSegments[groundSegments.length - 1].x + 20,
        color: getRandomGreen()
      });
    }
  }  

function drawObstacles() {
  ctx.fillStyle = 'red';
  obstacles.forEach(obstacle => {
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
  });
}

function updateObstacles() {
   if (Date.now() - lastObstacleTime > obstacleInterval && Math.random() < 0.01) {
    obstacles.push({ x: canvas.width, y: groundLevel - 50, width: 20, height: 50 });
    lastObstacleTime = Date.now();
  }
  obstacles.forEach(obstacle => {
    obstacle.x -= groundSpeed;
  });
    if (Math.random() < 0.015) { // Adjust the frequency of obstacles
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
    updateGround();
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
