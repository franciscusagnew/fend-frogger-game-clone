// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = 60;
    this.speed = 5;
};

const positions = [60, 145, 230];
// Randomize enemy positions
function randomIndex(position) {
    return position[Math.floor((Math.random() * position.length))];  
}

let number = randomIndex(positions);
console.log(number);

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Player Class
var Player = function() {
    // The image/sprite for our player
    this.sprite = 'images/char-boy.png';
    this.x = 201;
    this.y = 400;
};

// Update the player's position
Player.prototype.update = function(dt) {
    // tbd
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Moves the player according to the user's input, required method for game
Player.prototype.handleInput = function(string) {
    let result = string;
    console.log(result);

    if (result === 'left') {
        console.log('The left key was pressed!');
        this.x = this.x - 100;
    } else if (result === 'up') {
        console.log('The up key was pressed!');
        this.y = this.y - 81;
    } else if (result === 'right') {
        console.log('The right was pressed!');
        this.x = this.x + 100;
    } else if (result === 'down') {
        console.log('The down key was pressed!');
        this.y = this.y + 81;
    } else {
        console.log('Some other key was pressed!');
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [];
for (let i = 0; i < 3; i++) {
    allEnemies[i] = new Enemy();
}

// Place the player object in a variable called player
let player = new Player();

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
