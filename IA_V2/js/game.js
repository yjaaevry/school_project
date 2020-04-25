var game = {
  groundWidth : 900,//700
  groundHeight : 500,//400
  groundColor: "#000000",
  netWidth : 6,
  netColor: "#FFFFFF",
  once : false,

  starttime : null,
  delay : null,
  groundLayer : null,
  scoreLayer : null,
  playersBallLayer : null,
  wallSound : null,
  playerSound : null,
  failSound : null,

  init : function() {
    this.groundLayer = game.display.createLayer("terrain", this.groundWidth, this.groundHeight, document.getElementById('myDiv'), 0, "#000000", 0, 0);
    game.display.drawRectangleInLayer(this.groundLayer, this.netWidth, this.groundHeight, this.netColor, this.groundWidth/2 - this.netWidth/2, 0);
    this.scoreLayer = game.display.createLayer("score", this.groundWidth, this.groundHeight, document.getElementById('myDiv'), 1, undefined, 0, 0);
    this.displayScore(this.playerOne.score, this.playerTwo.score);
    this.playersBallLayer = game.display.createLayer("joueursetballe", this.groundWidth, this.groundHeight, document.getElementById('myDiv'), 2, undefined, 0, 0);
    this.displayBall(200, 200);
    this.initPlayers();
    this.displayPlayers();
    this.initKeyboard(game.control.onKeyDown, game.control.onKeyUp);
    game.initMouse(game.control.onMouseMove);
    this.wallSound = new Audio("./sound/pingMur.ogg");
    this.playerSound = new Audio("./sound/pingRaquette.ogg");
    this.failSound = new Audio("./sound/echec.mp3");
    this.starttime = new Date();
    game.ai.setPlayerAndBall(this.playerOne, this.ball);
  },

  scorePosPlayer1 : 0,
  scorePosPlayer2 : 0,

  displayScore : function(scorePlayer1, scorePlayer2) {
    this.scorePosPlayer1 = (this.groundWidth/2)-50;
    this.scorePosPlayer2 = (this.groundWidth/2)+18;
    if (scorePlayer1 < 10 && scorePlayer2 < 10) {
      game.display.drawTextInLayer(this.scoreLayer, scorePlayer1, "60px Arial", "#00FFFF", this.scorePosPlayer1, 55);
      game.display.drawTextInLayer(this.scoreLayer, scorePlayer2, "60px Arial", "#00FFFF", this.scorePosPlayer2, 55);
      game.display.drawTextInLayer(this.scoreLayer, "Equipe 1", "10px Arial", "#FF0000", 30, 20);
      game.display.drawTextInLayer(this.scoreLayer, "Equipe 2", "10px Arial", "#FF0000", this.groundWidth-80, 20);
      game.display.drawTextInLayer(this.scoreLayer, this.delay, "10px Arial", "#FF0000", (this.groundWidth/2)-100, 20);
      game.display.drawTextInLayer(this.scoreLayer, this.ball.speed, "10px Arial", "#FF0000", (this.groundWidth/2)+100, 20);
    } else {
      if (scorePlayer1 == 10) {
        game.display.drawTextInLayer(this.scoreLayer, "Player One won", "60px Arial", "#FF00FF", (this.groundWidth/2)-150, this.groundHeight/2);
      } else {
        game.display.drawTextInLayer(this.scoreLayer, "Player Two won", "60px Arial", "#FF00FF", (this.groundWidth/2)-150, this.groundHeight/2);
      }
      setTimeout(function() {
        alert ("on joue ?!");
        window.reload();
      }, 1500);
    }
  },

  ball : {
      width : 10,
      height : 10,
      color : "#FFFF00",
      speed : 2,
      posX : 200,
      posY : 200,
      directionX : 1,
      directionY : 1,

      move : function() {
        this.posX += this.directionX * this.speed;
        this.posY += this.directionY * this.speed;
      },

      bounce : function() {
        // changement de forme de balle
        //if ( this.posY > game.groundHeight - this.height || this.posY < 0  ) {
        if ( this.posY >= game.groundHeight - this.width/2 || this.posY <= this.width/2  ) {
          this.directionY = -this.directionY;
          game.wallSound.play();
        }
      },

      match : function(soundToPlay) {
        // changement de forme de balle
        //if ( this.posX > game.groundWidth - this.width || this.posX < 0 ) {
        if ( this.posX > game.groundWidth - this.width/2 || this.posX < this.width/2 ) {
          if ( this.directionX == 1) {
            game.playerOne.score ++;
          } else {
            game.playerTwo.score ++;
          }
          game.ball.posX = game.groundWidth/2;
          game.ball.posY = game.groundHeight/2;
          this.directionX = -this.directionX;
          game.ball.speed = 2;
          game.failSound.play();
        }
      },

      collide : function(anotherItem) {
        // changement de forme de balle
        //if ( !( this.posX >= anotherItem.posX + anotherItem.width || this.posX <= anotherItem.posX - this.width
        //|| this.posY >= anotherItem.posY + anotherItem.height || this.posY <= anotherItem.posY - this.height ) ) {
        if ( !( this.posX - this.width/2 >= anotherItem.posX + anotherItem.width || this.posX <= anotherItem.posX - this.width/2
        || this.posY - this.width/2 >= anotherItem.posY + anotherItem.height || this.posY <= anotherItem.posY - this.width/2 ) ) {
          // Collision
          return true;
        }
        return false;
      },
    },

  moveBall : function() {
    this.ball.move();
    this.ball.bounce();
    this.ball.match();
    this.displayBall();
  },

  collideBallWithPlayersAndAction : function() {
    if ( this.ball.collide(game.playerOne) ) {
      if (this.ball.posX < 0 + this.ball.width) {
        game.ball.directionY = -game.ball.directionY;
      } else {
        game.ball.directionX = -game.ball.directionX;
      }
      this.playerSound.play();
    }
    if ( this.ball.collide(game.playerTwo) ) {
      if (this.ball.posX > this.groundWidth - this.ball.width) {
        game.ball.directionY = -game.ball.directionY;
      } else {
        game.ball.directionX = -game.ball.directionX;
      }
      this.playerSound.play();
    }
  },

  displayBall : function() {
    //game.display.drawRectangleInLayer(this.playersBallLayer, this.ball.width, this.ball.height, this.ball.color, this.ball.posX, this.ball.posY);
    game.display.drawBallInLayer(this.playersBallLayer, this.ball.width, this.ball.color, this.ball.posX, this.ball.posY);
  },

  playerOne : {
    width : 10,
    height : 50,
    color : "#FFFFFF",
    posX : 0,
    posY : 0,
    goUp : false,
    goDown : false,
    score : 0,
    originalPosition : "left"
  },

  playerTwo : {
    width : 10,
    height : 50,
    color : "#FFFFFF",
    posX : 0,
    posY : 0,
    goUp : false,
    goDown : false,
    score : 0,
    originalPosition : "right"
  },

  initPlayers : function() {
    this.playerOne.posX = 10;
    this.playerOne.posY = this.groundHeight/2;
    this.playerTwo.posX = this.groundWidth - 20;
    this.playerTwo.posY = this.groundHeight/2;
  },

  displayPlayers : function() {
    game.display.drawRectangleInLayer(this.playersBallLayer, this.playerOne.width, this.playerOne.height, this.playerOne.color, this.playerOne.posX, this.playerOne.posY);
    game.display.drawRectangleInLayer(this.playersBallLayer, this.playerTwo.width, this.playerTwo.height, this.playerTwo.color, this.playerTwo.posX, this.playerTwo.posY);
  },

  clearLayer : function(targetLayer) {
    targetLayer.clear();
  },

  initKeyboard : function(onKeyDownFunction, onKeyUpFunction) {
    window.onkeydown = onKeyDownFunction;
    window.onkeyup = onKeyUpFunction;
  },

  initMouse : function(onMouseMoveFunction) {
    window.onmousemove = onMouseMoveFunction;
  },

  movePlayers : function() {
    if (game.playerOne.goUp && game.playerOne.posY > 0)
      game.playerOne.posY-=this.ball.speed * 2;
    else if (game.playerOne.goDown && game.playerOne.posY < game.groundHeight - game.playerOne.height)
      game.playerOne.posY+=this.ball.speed * 2;
    if (game.playerTwo.goUp && game.playerTwo.posY > game.control.mousePointer)
      game.playerTwo.posY-=this.ball.speed * 2;
    else if (game.playerTwo.goDown && game.playerTwo.posY < game.control.mousePointer && game.playerTwo.posY < game.groundHeight - game.playerTwo.height)
      game.playerTwo.posY+=this.ball.speed * 2;
  },

  setPlayerOne(playerOne) {
    this.playerOne = playerOne;

},

setPlayerTwo(playerTwo) {
    this.playerTwo = playerTwo;
    if (this.playerOne && this.playerTwo) {
        this.letsgo = true;
    }
},

  speedUpdate : function() {
    currenttime = new Date();
    this.delay = Math.floor((currenttime - game.starttime)/1000);
    if (this.delay%10 == 0 && this.once){
      game.ball.speed ++;
      this.once = false;
    }
    if (this.delay%10 == 1)
      this.once = true;
  }
};
