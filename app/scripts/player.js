window.Player = (function() {
	'use strict';

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 30; // * 10 pixels per second
	var WIDTH = 5;
	var HEIGHT = 5;
	var INITIAL_POSITION_X = 30;
	var INITIAL_POSITION_Y = 25;

	var Player = function(el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: 0, y: 0 };
		this.velocity = 0;
		this.gravity = 0.03;
		this.jumpHeight = 0.6;
		this.angle = 0;
		/*
		 * Makes the player jump
		 */
		this.jump = function() {
			this.velocity = -this.jumpHeight;
		}
	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Player.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
		this.velocity = 0;
	};

	Player.prototype.onFrame = function(delta) {
		if (Controls.keys.space || Controls.keys.touchDown) {
			document.getElementById('jump_sound').play();
			this.jump();
		}

		this.velocity += this.gravity;
		this.pos.y += this.velocity;


		this.checkCollisionWithBounds();

		// Update UI
		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em) rotate(' + this.velocity * 40 + 'deg)');
	};

	Player.prototype.checkCollisionWithBounds = function() {
		if (this.pos.x < 0 ||
			this.pos.x + WIDTH > this.game.WORLD_WIDTH ||
			this.pos.y < 0 ||
			this.pos.y + HEIGHT > this.game.WORLD_HEIGHT-6.8) {
			return this.game.gameover();
		}
	};

	return Player;

})();
