window.Cloud = (function() {
	'use strict';

  var INITIAL_POSITION_X = 0;
	var INITIAL_POSITION_Y = 0;

  var Cloud = function(el, game) {
  	this.el = el;
  	this.game = game;
  	this.pos = {x: 0, y: 0};
  }

  Cloud.prototype.continue = function() {
    this.pos.x = 102.4;
    this.pos.y = 0;
  }

  Cloud.prototype.reset = function() {
    this.pos.x = INITIAL_POSITION_X;
    this.pos.y = INITIAL_POSITION_Y;
  }

  Cloud.prototype.onFrame = function(speed, width) {
    this.pos.x -= speed;

    if(this.pos.x <= -width) {
      this.continue();
    }

    this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
  }

return Cloud;

})();
