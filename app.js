// Construct the canvas
const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');
canvas.height = 600;
canvas.width = 600;

// Set initial values
let speed = 7;
let score = 0;

// Classes for game objects

class Player {
  constructor(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
  }

  update() {
      this.draw()
  }
}

class Alien {
  constructor(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
  }

  update() {
    this.y += speed;
    this.draw()
  }
}

// Initialisation of game objects
const player = new Player (canvas.width / 2, canvas.height - 10, 10, 'red');
const aliens = []

// Initialse game and spawn aliens

function init() {
player.update();

  setInterval(() => {
    speed += 1;
  }, 15000)

  setInterval(() => {
    alien = new Alien(Math.random() * canvas.width, 0, Math.random() * 50, `green`);
    aliens.push(alien);
  }, 7000 / speed)

}

// Game functions

function showScore(){
  c.clearRect(0, 0, canvas.width, canvas.height)
  c.font = '25px Ariel';
  c.fillStyle = 'black'
  c.fillText('Score: ' + score, 10, 30);
  c.fillText('Level: ' + `${speed - 6}` , 10, 60);
}

function removeAlien(alien){
  if(alien.y > canvas.height){
    score += 1;
    aliens.splice(alien, 1);
  }
}

function distance (x1, y1, x2, y2){
  let xDistance = x2 - x1;
  let yDistance = y2 - y1;
  return Math.sqrt((xDistance ** 2) + (yDistance ** 2))
}

// Player movement

document.addEventListener('keydown', (e) => {
  if (e.keyCode === 37 && player.x > 19){
    player.x -= 10;
  } else if (e.keyCode === 39 && player.x < canvas.width - 19){
    player.x += 10;
  }
});


// Animation Loop

function animate() {
  let playing = true;

  // Check if there's been a hit
  aliens.forEach((alien) => {
    if(distance(player.x, player.y, alien.x, alien.y) < player.radius + alien.radius){
      console.log('hit');
      playing = false;
    }
  })

  // If no hit keep playing

  if(playing){
    requestAnimationFrame(animate);
    showScore();
    player.update();
    aliens.forEach((alien) => {
      alien.update();
      removeAlien(alien);
    })

    // If hit then run endgame

  } else if (!playing && score <= 5){
    alert(`Could do better! Your score was ${score}. Refresh the page to play again.`)
  } else if (!playing && score > 5){
    alert(`Getting there! Your score was ${score}. Refresh the page to play again.`)
  } else if (!playing && score > 15){
    alert(`Decent! Your score was ${score}. Refresh the page to play again.`)
  } else if (!playing && score > 25){
    alert(`Pro! Your score was ${score}. Refresh the page to play again.`)
  } else if (!playing && score > 35){
    alert(`Excellent! Your score was ${score}. Refresh the page to play again.`)
  }
}

// Run the game

init()
animate()
