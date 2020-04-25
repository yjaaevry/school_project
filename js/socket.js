(function () {
    let socket = io();
    var requestAnimId;

    var initialisation = function () {
        // le code de l'initialisation
        game.init();
        requestAnimId = window.requestAnimationFrame(main); // premier appel de main au rafraîchissement de la page
    }

    var main = function () {
        // le code du jeu
        game.clearLayer(game.playersBallLayer);
        updatePlayers()
        game.displayPlayers();
        game.displayBall();
        go()
        game.moveBall();
        updateBall()
        game.checkGoal();
        game.checkVictory();
        checkEndGame();
        if (game.IA) {
            game.ia.move();
        }
        game.collideBallWithPlayersAndAction();
        requestAnimId = window.requestAnimationFrame(main); // rappel de main au prochain rafraîchissement de la page
    }
    const input = document.createElement('input');
    const message = document.getElementById("message");
    const outputname = document.getElementById("outputname");
    const outputmessage = document.getElementById("outputmessage");
    const btn = document.getElementById("send");
    const output = document.getElementById("output");
    btn.onclick = () => {
        console.log(message.value);

        socket.emit('chat', {
            message: message.value,
            name: input.value
        })
    }

    //----------------chat

		socket.on('chat', (data) => {
			socket.emit('chat', data)
		})

		socket.on('chat', (data) => {
			socket.emit('broadcast', data);
			socket.broadcast.emit('message', data)
		});
	//-------------

    var updatePlayers = function () {
        if (game.nb_players == 2) {
            if (game.playerId == 1) {
                let player1_pos = game.movePlayer(game.getPlayerOne());
                if (player1_pos) {
                    socket.emit('updatePlayer', { room: this.pong.getChambreId(), id: game.playerId, position: player1_pos })
                }
            }
            else {
                let player2_pos = game.movePlayer(game.getPlayerTwo());
                if (player2_pos) {
                    socket.emit('updatePlayer', { room: this.pong.getChambreId(), id: game.playerId, position: player2_pos })
                }
            }
        }
        else if (game.nb_players == 4) {
            if (game.playerId == 1) {
                let player1_pos = game.movePlayer(game.getPlayerOne());
                if (player1_pos) {
                    socket.emit('updatePlayer', { room: this.pong.getChambreId(), id: game.playerId, position: player1_pos })
                }
            }
            else if (game.playerId == 2) {
                let player2_pos = game.movePlayer(game.getPlayerTwo());
                if (player2_pos) {
                    socket.emit('updatePlayer', { room: this.pong.getChambreId(), id: game.playerId, position: player2_pos })
                }
            }
            else if (game.playerId == 3) {
                let player3_pos = game.movePlayer(game.getPlayerThree());
                if (player3_pos) {
                    socket.emit('updatePlayer', { room: this.pong.getChambreId(), id: game.playerId, position: player3_pos })
                }
            } else if (game.playerId == 4) {
                let player4_pos = game.movePlayer(game.getPlayerFour());
                if (player4_pos) {
                    socket.emit('updatePlayer', { room: this.pong.getChambreId(), id: game.playerId, position: player4_pos })
                }
            }
        }

    }

    var go = function () {
        if (game.nb_players == 2) {
            if (game.playerId == 1 && game.whoStart) {
                socket.emit('updateGameStatus', { room: this.pong.getChambreId(), start: true })
            }
            else if (game.playerId == 2 && game.whoStart) {
                socket.emit('updateGameStatus', { room: this.pong.getChambreId(), start: true })
            }
        }
        else if (game.nb_players == 4) {
            if (game.playerId == 1 && game.whoStart) {
                socket.emit('updateGameStatus', { room: this.pong.getChambreId(), start: true })
            }
            else if (game.playerId == 2 && game.whoStart) {
                socket.emit('updateGameStatus', { room: this.pong.getChambreId(), start: true })
            }
            else if (game.playerId == 3 && game.whoStart) {
                socket.emit('updateGameStatus', { room: this.pong.getChambreId(), start: true })
            }
            else if (game.playerId == 4 && game.whoStart) {
                socket.emit('updateGameStatus', { room: this.pong.getChambreId(), start: true })
            }
        }
        socket.on('broadcast', (data) => {
            console.log(Object.keys(data.message).length)
            outputmessage.innerHTML += `<br>${data.name}:${data.message}`
        });
        socket.on('message', (data) => {
            outputmessage.innerHTML += `<br>${data.name}:${data.message}`
        });
    }

    var updateBall = function () {
        if (game.nb_players == 2) {
            if (game.playerId == 1 && game.whoStart) {
                socket.emit('updateBall', { room: this.pong.getChambreId(), posX: game.getBall().getPosX(), posY: game.getBall().getPosY() })
            }
            else if (game.playerId == 2 && game.whoStart) {
                socket.emit('updateBall', { room: this.pong.getChambreId(), posX: game.getBall().getPosX(), posY: game.getBall().getPosY() })
            }
        }
        else if (game.nb_players == 4) {
            if (game.playerId == 1 && game.whoStart) {
                socket.emit('updateBall', { room: this.pong.getChambreId(), posX: game.getBall().getPosX(), posY: game.getBall().getPosY() })
            }
            else if (game.playerId == 2 && game.whoStart) {
                socket.emit('updateBall', { room: this.pong.getChambreId(), posX: game.getBall().getPosX(), posY: game.getBall().getPosY() })
            }
            else if (game.playerId == 3 && game.whoStart) {
                socket.emit('updateBall', { room: this.pong.getChambreId(), posX: game.getBall().getPosX(), posY: game.getBall().getPosY() })
            }
            else if (game.playerId == 4 && game.whoStart) {
                socket.emit('updateBall', { room: this.pong.getChambreId(), posX: game.getBall().getPosX(), posY: game.getBall().getPosY() })
            }
        }
    }

    var checkEndGame = function () {
        if (game.exitGame && game.amIPlayerOne) {
            socket.emit('endGame', { room: this.pong.getChambreId(), id: game.playerId });
        }
        else if (game.exitGame && !game.amIPlayerOne) {
            socket.emit('endGame', { room: this.pong.getChambreId(), id: game.playerId });
        }
    }

    // Creation of the Player one
    $('#battle').on('click', () => {
        document.location.href="./IA_V2/pong.html";
    });

    $('#new').on('click', () => {
        const name = $('#nameNew').val();
        if (!name) {
            alert('Veuillez saisir un pseudo');
            return;
        }
        const nb_player = $('input[name=nb_player]:checked').val();
        socket.emit('createGame', { name: name, nb_player: nb_player });
    });

    socket.on('newGame', (data) => {
        const message =
             `Salut ${data.name} ! ID Chambre : 
         ${data.room}. En attentes de joueurs...`;

        this.pong = new Chambre(data.room);
        this.pong.displayHeader(message);

    });

    $('#join').on('click', () => {
        // $('.layout').css('top', '100%');
        // $('.layout').css('left', '73%');
        const name = $('#name_Join').val();
        const chambreId = $('#room').val();
        if (!name || !chambreId) {
            alert('Veuillez saisir un pseudo et une chambre.');
            return;
        }
        socket.emit('joinGame', { name, room: chambreId });
    });

    socket.on('player1', (data) => {
        const message = `Salut ${data.player1.name}. Equipe 1`;
        $('#welcome').html(message);
        game.amIPlayerOne = true;
        game.playerId = 1
    });

    socket.on('player2', (data) => {
        const message = `Salut ${data.player2.name}. Equipe 2`;

        this.pong = new Chambre(data.room);
        this.pong.displayHeader(message);
        game.playerId = 2

    });
    socket.on('player3', (data) => {
        const message = `Salut ${data.player3.name}. Equipe 1 `;

        this.pong = new Chambre(data.room);
        this.pong.displayHeader(message);
        game.playerId = 3

    });
    socket.on('player4', (data) => {
        const message = `Salut ${data.player4.name}. Equipe 2`;

        this.pong = new Chambre(data.room);
        this.pong.displayHeader(message);
        game.playerId = 4

    });

    socket.on('playgame', (data) => {
        if (data.nb_player == 2) {
            player1 = new Player(data.player1.name, data.player1.position)
            game.setPlayerOne(player1)
            player2 = new Player(data.player2.name, data.player2.position)
            game.setPlayerTwo(player2)
        } else if (data.nb_player == 4) {
            game.nb_players = data.nb_player
            player1 = new Player(data.player1.name, data.player1.position)
            game.setPlayerOne(player1)
            player2 = new Player(data.player2.name, data.player2.position)
            game.setPlayerTwo(player2)
            player3 = new Player(data.player3.name, data.player3.position)
            game.setPlayerThree(player3)
            player4 = new Player(data.player4.name, data.player4.position)
            game.setPlayerFour(player4)
        }

        initialisation();

    });
    socket.on('movePlayers', (data) => {
        if (game.nb_players == 2) {
            if (data.id == 1) {
                game.getPlayerOne().setPosition(data.position)
            }
            else {
                game.getPlayerTwo().setPosition(data.position)
            }
        } else if (game.nb_players == 4) {
            if (data.id == 1) {
                game.getPlayerOne().setPosition(data.position)
            }
            else if (data.id == 2) {
                game.getPlayerTwo().setPosition(data.position)
            }
            else if (data.id == 3) {
                game.getPlayerThree().setPosition(data.position)
            }
            else {
                game.getPlayerFour().setPosition(data.position)
            }
        }
    })
    socket.on('moveBall', (data) => {
        game.getBall().setPosX(data.posX);
        game.getBall().setPosY(data.posY);
    });
    socket.on('updateStart', (data) => {
        game.getBall().setStatus(data.start);
    });

    socket.on('exitGame', (data) => {
        if (game.nb_players == 2) {
            if (data.id == 1) {
                message = game.getPlayerOne().getPlayerName() + ' à quitté la chambre'
            }
            else if (data.id == 2) {
                message = game.getPlayerTwo().getPlayerName() + ' à quitté la chambre'
            }
        }
        else if (game.nb_players == 4) {
            if (data.id == 1) {
                message = game.getPlayerOne().getPlayerName() + ' à quitté la chambre'
            }
            else if (data.id == 2) {
                message = game.getPlayerTwo().getPlayerName() + ' à quitté la chambre'
            }
            else if (data.id == 3) {
                message = game.getPlayerThree().getPlayerName() + ' à quitté la chambre'
            }
            else if (data.id == 4) {
                message = game.getPlayerFour().getPlayerName() + ' à quitté la chambre'
            }
        }
        alert(message);
        location.reload();
    });
    /*socket.on('err', (data) => {
        alert(data.message);
        location.reload();
    });*/
}());