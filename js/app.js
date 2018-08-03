// PNumber of player lives
let lives = 3;
document.querySelector('.lives').innerHTML = lives;
// Player's current score
let score = 0;
// Player's final score
let finalScore;
// Enemy positions
const enemyPos = [60, 145, 230];

// Randomize enemy positions
function randomIndex(position) {
    return position[Math.floor((Math.random() * position.length))];  
}

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = randomIndex(enemyPos);
    this.speed = Math.floor((Math.random() * 250) + 150);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // Check enemy's screen position 
    if(this.x > 505) {
        this.x = 0;
        this.y = randomIndex(enemyPos);
        this.speed = Math.floor((Math.random() * 200) + 100);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Player Class
var Player = function(x, y) {
    // The image/sprite for our player
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};

// Update the player's position
Player.prototype.update = function(dt) {
    if (dt > 0) {
        this.x = x * dt;
        this.y = y * dt;
    };
    // Check for collisions
    checkCollisions();
    console.log(this.y);
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Moves the player according to the user's input, required method for game
Player.prototype.handleInput = function(input) {
    if (input == 'left' && this.x > 100) {
        this.x -= 100;
    } else if (input == 'right' && this.x < 400) {
        this.x += 100;
    } else if (input == 'down' && this.y < 400) {
        this.y += 81;
    } else if (input == 'up' && this.y > 0) {
        this.y -= 81;
        if (this.y == -5) {
            score += 5;
            document.querySelector('.score').innerHTML = score;
            document.querySelector('.finalScore').innerHTML = score;
            setTimeout(function() {
                // Reset player's start position
                player.x = 201;
                player.y = 400;
            }, 1000);
        }
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [];
for (let i = 0; i < 4; i++) {
    allEnemies[i] = new Enemy();
}

// Place the player object in a variable called player
let player = new Player(201, 400);

// Check to see if enemy collides with player
let checkCollisions = function() {
    for (var i = 0; i < allEnemies.length; i++) {
        if (Math.abs(player.x - allEnemies[i].x) < 50 && 
            Math.abs(player.y - allEnemies[i].y) < 40) {
            player.x = 201;
            player.y = 400;
            lives -= 1;
            document.querySelector('.lives').innerHTML = lives;
            if (lives === 0) {
                gameOverModal.style.display = "block";
            }
        }
    }
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

document.querySelector('.start').addEventListener('click', playerSelect);

// Toggle character selection
function playerSelect(e) {
    if (e.target && e.target.matches('img.boy')) {
        player.sprite = 'images/char-boy.png';
    } else if (e.target && e.target.matches('img.cat-girl')) {
        player.sprite = 'images/char-cat-girl.png';
    } else if (e.target && e.target.matches('img.horn-girl')) {
        player.sprite = 'images/char-horn-girl.png';
    } else if (e.target && e.target.matches('img.princess-girl')) {
        player.sprite = 'images/char-princess-girl.png';
    }
}

// Pick character that the user selected
document.querySelector('.start').addEventListener('keyup', select);

function select() {
    player.sprite = document.activeElement.getAttribute('src');
}

/*
 * Modals
 */

// Get the modal
var startModal = document.querySelector('.start');
var gameOverModal = document.querySelector('.gameOver');

// Get the buttons that starts the game
var playBtn = document.querySelector(".playBtn");
var restartBtn = document.querySelector(".restartBtn");

// When the user clicks on the playBtn, close the modal 
playBtn.onclick = function() {
    startModal.style.display = "none";
}

// When the user clicks on the restartBtn, restart game
restartBtn.onclick = function() {
    gameOverModal.style.display = "none";
    score = 0;
    document.querySelector('.score').innerHTML = score;
    lives = 3;
    document.querySelector('.lives').innerHTML = lives;
    startModal.style.display = "block";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == startModal || event.target == gameOverModal) {
        startModal.style.display = "none";
    }
}
