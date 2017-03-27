window.Pipe = (function() {
	'use strict';

  // All these constants are in em's, multiply by 10 pixels
  // for 1024x576px canvas.
  var SPEED = 30; // * 10 pixels per second
  var WIDTH = 12.2;
  var HEIGHT = 100.6;
  var INITIAL_POSITION_X = 102.4;
  var INITIAL_POSITION_Y = -30;

  var Pipe = function(el, game) {
  	this.el = el;
  	this.game = game;
  	this.pos = {x: 0, y: 0};
  }

  //Resets the state of the pipe for a new game
  Pipe.prototype.reset = function() {
  	this.pos.x = INITIAL_POSITION_X;
  	this.pos.y = INITIAL_POSITION_Y;
  };

  Pipe.prototype.onFrame = function(delta) {
		this.pos.x -= delta * SPEED;

  	this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
  };

  return Pipe;

})();
