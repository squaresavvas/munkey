var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Create the player character
var player = {
  x: 50,
  y: 360,
  width: 50,
  height: 50,
  speed: 5,
  jumping: false,
  jumpSpeed: 15,
  jumpHeight: 150,
  image: new Image(),
  dx: 0,
  dy: 0,
  isDead: false
};
player.image.src = "monkey.png";

// Create an array to hold the enemies
var enemies = [];

// Create the game loop
var gameLoop = setInterval(function() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the player character
  ctx.drawImage(player.image, player.x, player.y, player.width, player.height);

  // Check if the player is dead
  if (player.isDead) {
    clearInterval(gameLoop);
    alert("Game over!");
    return;
  }

  // Handle user input
  if (keys["ArrowLeft"]) {
    player.dx = -player.speed;
  }
  if (keys["ArrowRight"]) {
    player.dx = player.speed;
  }
  if (keys["ArrowUp"] && !player.jumping) {
    player.jumping = true;
    player.dy = -player.jumpSpeed;
  }

  // Apply gravity to the player character
  player.dy += 1.5;
  player.y += player.dy;

  // Handle collisions with the bottom of the canvas
  if (player.y + player.height > canvas.height) {
    player.y = canvas.height - player.height;
    player.jumping = false;
  }

  // Handle collisions with the sides of the canvas
  if (player.x + player.dx < 0 || player.x + player.dx + player.width > canvas.width) {
    player.dx = 0;
  }

  // Move the player character
  player.x += player.dx;
  player.dx = 0;

  // Draw the enemies
  for (var i = 0; i < enemies.length; i++) {
    var enemy = enemies[i];
    ctx.drawImage(enemy.image, enemy.x, enemy.y, enemy.width, enemy.height);

    // Check for collisions between the player and enemies
    if (checkCollision(player, enemy)) {
      player.isDead = true;
    }

    // Move the enemies
    enemy.x -= enemy.speed;

    // Remove enemies that have gone off the left side of the canvas
    if (enemy.x + enemy.width < 0) {
      enemies.splice(i, 1);
      i--;
    }
  }

  // Spawn new enemies randomly
  if (Math.random() < 0.02) {
    var enemy = {
      x: canvas
