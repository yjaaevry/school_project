game.control = {

  mousePointer : null,

  onKeyDown : function(event) {
    if ( event.keyCode == game.keycode.KEYDOWN ) {
      game.playerOne.goDown = true;
    } else if ( event.keyCode == game.keycode.KEYUP ) {
      game.playerOne.goUp = true;
    }
  },

  onKeyUp : function(event) {
    if ( event.keyCode == game.keycode.KEYDOWN ) {
      game.playerOne.goDown = false;
    } else if ( event.keyCode == game.keycode.KEYUP ) {
      game.playerOne.goUp = false;
    }
  },

  onMouseMove : function (event) {
      game.control.mousePointer = event.clientY;

    if ( game.control.mousePointer > game.playerTwo.posY ) {
      game.playerTwo.goDown = true;
      game.playerTwo.goUp = false;
    } else if ( game.control.mousePointer < game.playerTwo.posY ) {
      game.playerTwo.goDown = false;
      game.playerTwo.goUp = true;
    } else {
      game.playerTwo.goDown = false;
      game.playerTwo.goUp = false;
    }
  }
}
