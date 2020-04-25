class Player {
    constructor(name, position) {
        this.name = name;
        this.originalPosition = position;
        this.width = 10;
        this.height = 50;
        this.goUp = false;
        this.goDown = false;
        this.score = 0;
        this.IA_role = false;
        this.createPlayer(game.nb_players)
    }
    getPlayerName() {
        return this.name;
    }
    getPlayerPosition() {
        return this.originalPosition;
    }

    getScore() {
        return this.score;
    }

    getIARole() {
        this.IA_role;
    }

    setScore() {
        this.score = score;
    }

    setPosition(posY) {
        this.posY = posY;
    }

    setIARole(role) {
        this.IA_role = role;
    }

    createPlayer(nb_players) {
        if (nb_players == 2) {
            if (this.originalPosition === 1) {
                this.color = "#FFFFFF";
                this.posX = 30;
                this.posY = 200;
            }
            else if (this.originalPosition === 2) {
                this.color = "#7F7F7F";
                this.posX = 650;
                this.posY = 200;
            }
        }
        else if (nb_players == 4) {
            if (this.originalPosition === 1) {
                this.color = "#FFFFFF";
                this.posX = 30;
                this.posY = 100;
            }
            else if (this.originalPosition === 2) {
                this.color = "#7F7F7F";
                this.posX = 650;
                this.posY = 100;
            }
            else if (this.originalPosition === 3) {
                this.color = "#FFFFFF";
                this.posX = 230;
                this.posY = 300;
            }
            else if (this.originalPosition === 4) {
                this.color = "#7F7F7F";
                this.posX = 450;
                this.posY = 300;
            }
        }
    }
}