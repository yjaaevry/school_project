game.control = {

    controlSystem: null,
    mousePointer: null,

    onMouseMove: function (event) {

        game.control.controlSystem = "MOUSE";

        if (game.nb_players == 2) {
            if (game.playerId == 2) {

                if (event) {
                    game.control.mousePointer = event.clientY;
                }

                if (game.control.mousePointer > game.playerTwo.posY) {
                    game.playerTwo.goDown = true;
                    game.playerTwo.goUp = false;
                } else if (game.control.mousePointer < game.playerTwo.posY) {
                    game.playerTwo.goDown = false;
                    game.playerTwo.goUp = true;
                } else {
                    game.playerTwo.goDown = false;
                    game.playerTwo.goUp = false;
                }
            }
            else {
                if (event) {
                    game.control.mousePointer = event.clientY;
                }

                if (game.control.mousePointer > game.playerOne.posY) {
                    game.playerOne.goDown = true;
                    game.playerOne.goUp = false;
                } else if (game.control.mousePointer < game.playerOne.posY) {
                    game.playerOne.goDown = false;
                    game.playerOne.goUp = true;
                } else {
                    game.playerOne.goDown = false;
                    game.playerOne.goUp = false;
                }
            }
        }
        else if (game.nb_players == 4) {
            if (game.playerId == 2) {

                if (event) {
                    game.control.mousePointer = event.clientY;
                }

                if (game.control.mousePointer > game.playerTwo.posY) {
                    game.playerTwo.goDown = true;
                    game.playerTwo.goUp = false;
                } else if (game.control.mousePointer < game.playerTwo.posY) {
                    game.playerTwo.goDown = false;
                    game.playerTwo.goUp = true;
                } else {
                    game.playerTwo.goDown = false;
                    game.playerTwo.goUp = false;
                }
            }
            else if (game.playerId == 3) {

                if (event) {
                    game.control.mousePointer = event.clientY;
                }

                if (game.control.mousePointer > game.playerThree.posY) {
                    game.playerThree.goDown = true;
                    game.playerThree.goUp = false;
                } else if (game.control.mousePointer < game.playerThree.posY) {
                    game.playerThree.goDown = false;
                    game.playerThree.goUp = true;
                } else {
                    game.playerThree.goDown = false;
                    game.playerThree.goUp = false;
                }
            } else if (game.playerId == 4) {

                if (event) {
                    game.control.mousePointer = event.clientY;
                }

                if (game.control.mousePointer > game.playerFour.posY) {
                    game.playerFour.goDown = true;
                    game.playerFour.goUp = false;
                } else if (game.control.mousePointer < game.playerFour.posY) {
                    game.playerFour.goDown = false;
                    game.playerFour.goUp = true;
                } else {
                    game.playerFour.goDown = false;
                    game.playerFour.goUp = false;
                }
            } else if (game.playerId == 1) {
                if (event) {
                    game.control.mousePointer = event.clientY;
                }

                if (game.control.mousePointer > game.playerOne.posY) {
                    game.playerOne.goDown = true;
                    game.playerOne.goUp = false;
                } else if (game.control.mousePointer < game.playerOne.posY) {
                    game.playerOne.goDown = false;
                    game.playerOne.goUp = true;
                } else {
                    game.playerOne.goDown = false;
                    game.playerOne.goUp = false;
                }
            }
        }

    },
    startTheGame: function () {
        game.ball.start_game = true;
        game.whoStart = true;
    },
    quitTheGame: function () {
        location.reload()
        game.exitGame = true;
    }
}