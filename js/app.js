// Enemies our player must avoid
class Enemy {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        this.x += this.speed * dt;
        //handle enemies leaving canvas and coming back randomly
        if (this.x > 510) {
            this.x = -50;
            //change this for random speed.
            this.speed = 100 + Math.floor(Math.random() * 155);
        }
        //handle enemy hitting the player
        if (player.x < this.x + 80 &&
            player.x + 80 > this.x &&
            player.y < this.y + 60 &&
            60 + player.y > this.y) {
            //reset position:
            player.x = 202;
            player.y = 405;
        }
    }
    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        // image of player
        this.player = 'images/char-princess-girl.png';
    }
    //player update()
    update(dt) {
        //no need in this version
    }
    //player render()
    render() {
        ctx.drawImage(Resources.get(this.player), this.x, this.y);
    }
    //player handleInput()
    handleInput(keyPress) {
        console.log("key pressed! : " + keyPress )
        // win condtion i.e player in water at end.
        if (this.y < 0) {
            setTimeout(() => {
                this.x = 202;
                this.y = 405;
            }, 1000);
        }
        //normal movement
        switch (keyPress) {
            case (keyPress == 'left' && this.x > 0):
                this.x -= 102;
                break;
            case (keyPress == 'right' && this.x < 405):
                this.x += 102;
                break;
            case (keyPress == 'up' && this.y > 0):
                this.x -= 83;
                break;
            case (keyPress == 'down' && this.y < 405):
                this.y += 83;
                break;
        }
    }
}



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
//define enemie start locations

var enemyLocation = [63, 147, 230];

// add new enmies to regenerate them.
enemyLocation.forEach(function (y) {
    enemy = new Enemy(0, y, 100);
    allEnemies.push(enemy);
});



var player = new Player(202, 405);


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
