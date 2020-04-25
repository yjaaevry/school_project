class Ball {
    constructor(player_pos) {
        this.width = 10;
        this.height = 10;
        this.color = "#FFFF00";
        this.speed = 5;
        this.start_game = false;
        this.wallSound = new Audio('../sound/wall.ogg');
        if (player_pos == 1) {
            this.posX = 200;
            this.posY = 200;
            this.directionX = 1;
            this.directionY = 1;
        }
        else if (player_pos == 2) {
            this.posX = 500;
            this.posY = 200;
            this.directionX = -1;
            this.directionY = 1;
        }
    }

    getPosX() {
        return this.posX;
    }

    getPosY() {
        return this.posY;
    }

    getSpeed() {
        return this.speed;
    }

    setPosX(posX) {
        return this.posX = posX;
    }

    setPosY(posY) {
        return this.posY = posY;
    }

    getStatus() {
        return this.start_game;
    }

    setStatus(status) {
        this.start_game = status;
    }

    setSpeed(speed) {
        this.speed = speed;
    }

    move() {
        this.posX += this.directionX * this.speed;
        this.posY += this.directionY * this.speed;
        return { posX: this.posX, posY: this.posY };
    }
    bounce(game) {
        if (this.posX > game.groundWidth || this.posX < 0) {
            this.directionX = -this.directionX;
            this.wallSound.play();
        }

        if (this.posY > game.groundHeight || this.posY < 0) {
            this.directionY = -this.directionY;
            this.wallSound.play();
        }

    }
    collide(anotherItem) {
        if (!(this.posX >= anotherItem.posX + anotherItem.width || this.posX <= anotherItem.posX - this.width
            || this.posY >= anotherItem.posY + anotherItem.height || this.posY <= anotherItem.posY - this.height)) {
            // Collision
            return true;
        }
        return false;
    }
    goal(player) {
        if (player.originalPosition === 1) {
            if (this.posX < 0) {
                return true
            }
            return false
        }
        else if (player.originalPosition === 2) {
            if (this.posX > game.groundWidth) {
                return true
            }
            return false
        }
    }
}