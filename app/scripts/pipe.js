window.Pipe = (function() {
	'use strict';

  // All these constants are in em's, multiply by 10 pixels
  // for 1024x576px canvas.
	// Pipe hight is 35 and gap between is 15
  var SPEED = 30; // * 10 pixels per second
  var WIDTH = 12.2;
  var HEIGHT = 100.6;

  var Pipe = function(el, game) {
  	this.el = el;
  	this.game = game;
  	this.pos = {x: 0, y: 0};
  }

  //Resets the state of the pipe for a new game
  Pipe.prototype.reset = function() {
  	this.pos.x = 102.4;
  	this.pos.y = -(Math.floor(Math.random() * (15) + 15));
  };

  Pipe.prototype.onFrame = function(delta) {
		this.pos.x -= delta * SPEED;
		if(this.pos.x <= -WIDTH)
		{
			this.reset();
		}
  	this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
  };

  return Pipe;

})();
