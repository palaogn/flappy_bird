
window.Game = (function() {
	'use strict';

	/**
	 * Main game class.
	 * @param {Element} el jQuery element containing the game.
	 * @constructor
	 */
	var Game = function(el) {
		this.el = el;
		this.player = new window.Player(this.el.find('.Player'), this);
		this.pipe = new window.Pipe(this.el.find('.Pipe'), this);
		this.cloud1 = new window.Cloud(this.el.find('.Cloud1'), this);
		this.cloud2 = new window.Cloud(this.el.find('.Cloud2'), this);
		this.cloud3 = new window.Cloud(this.el.find('.Cloud3'), this);
		this.cloud4 = new window.Cloud(this.el.find('.Cloud4'), this);
		this.isPlaying = false;
		this.score = 0;

		//game scales to the size of the screen
		function resize() {
			let fontSize = Math.min(
				window.innerWidth / Game.prototype.WORLD_WIDTH,
				window.innerHeight / Game.prototype.WORLD_HEIGHT
			);
			el.css('fontSize', fontSize + 'px');
		}

		resize();

		//every time the window is resized, it scales
		$(window).on('resize', resize);


		// Cache a bound onFrame since we need it each frame.
		this.onFrame = this.onFrame.bind(this);
	};

	/**
	 * Runs every frame. Calculates a delta and allows each game
	 * entity to update itself.
	 */
	Game.prototype.onFrame = function() {
		// Check if the game loop should stop.
		if (!this.isPlaying) {
			return;
		}

		// Calculate how long since last frame in seconds.
		var now = +new Date() / 1000,
				delta = now - this.lastFrame;
		this.lastFrame = now;

		// Update game entities.
		this.cloud1.onFrame(0.04, 123.3);
		this.cloud2.onFrame(0.03, 123.3);
		this.cloud3.onFrame(0.01, 147.2);
		this.cloud4.onFrame(0.08, 59.9);
		this.player.onFrame(delta);
		this.pipe.onFrame(delta);

		// Request next frame.
		window.requestAnimationFrame(this.onFrame);
	};

	/**
	 * Starts a new game.
	 */
	Game.prototype.start = function() {
		this.score = 0;
		this.reset();

		// Restart the onFrame loop
		this.lastFrame = +new Date() / 1000;
		window.requestAnimationFrame(this.onFrame);
		this.isPlaying = true;
	};

	/**
	 * Resets the state of the game so a new game can be started.
	 */
	Game.prototype.reset = function() {
		this.player.reset();
		this.pipe.reset();
		this.cloud1.reset();
		this.cloud2.reset();
		this.cloud3.reset();
		this.cloud4.reset();
	};

	/**
	 * Signals that the game is over.
	 */
	Game.prototype.gameover = function() {
		this.isPlaying = false;
		document.getElementById("game_score").innerHTML = this.score-1;
		// Should be refactored into a Scoreboard class.
		var that = this;
		var scoreboardEl = this.el.find('.Scoreboard');
		scoreboardEl
			.addClass('is-visible')
			.find('.Scoreboard-restart')
				.one('click', function() {
					//console.log("wat");
					scoreboardEl.removeClass('is-visible');
					that.start();
				});
	};

	/**
	 * Some shared constants.
	 */
	Game.prototype.WORLD_WIDTH = 102.4;
	Game.prototype.WORLD_HEIGHT = 57.6;

	return Game;
})();
