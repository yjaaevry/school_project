game.ai = {
  player : null,
  ball : null,

  setPlayerAndBall : function(player, ball) {
    this.player = player;
    this.ball = ball;
  },

  move : function() {
    if ( this.ball.directionX == 1 ) {
      if ( this.player.originalPosition == "right" && this.ball.posX > game.groundWidth/2 ) {
        // follow
        this.followBall();
      }
      if ( this.player.originalPosition == "left" ) {
        // center
        this.goCenter();
      }
    } else {
      if ( this.player.originalPosition == "right" ) {
        // center
        this.goCenter();
      }
      if ( this.player.originalPosition == "left" && this.ball.posX < game.groundWidth/2 ) {
        // follow
        this.followBall();
      }
    }
  },

  followBall : function() {
    if ( this.ball.posY < this.player.posY + this.player.height/2 ) {
      // la position de la balle est sur l'écran, au dessus de celle de la raquette
      if ( this.ball.directionY == 1 ) {
        if ( this.ball.posX > 100 && this.ball.posX < game.groundWidth-100) {
          this.player.posY+=this.ball.speed - 1;
        } else {
          this.player.posY-=this.ball.speed * 2;
        }
      } else {
        this.player.posY-=this.ball.speed * 2;
      }
    } else if ( this.ball.posY > this.player.posY + this.player.height/2 ) {
      // la position de la balle est sur l'écran, en dessous de celle de la raquette
      if ( this.ball.directionY == -1 ) {
        if ( this.ball.posX > 100 && this.ball.posX < game.groundWidth-100) {
          this.player.posY-=this.ball.speed - 1;
        } else {
          this.player.posY+=this.ball.speed * 2;
        }
      } else {
        this.player.posY+=this.ball.speed * 2;
      }
    }
    if ( game.playerOne.posY < 0) {
      game.playerOne.posY = 0;
    }
    if ( game.playerOne.posY > game.groundHeight - game.playerOne.height) {
      game.playerOne.posY = game.groundHeight - game.playerOne.height;
    }
  },

  goCenter : function() {
    if ( this.player.posY + this.player.height/2 > game.groundHeight / 2 ) {
      this.player.posY--;
    } else if ( this.player.posY + this.player.height/2 < game.groundHeight / 2 ) {
      this.player.posY++;
    }
  }
}
