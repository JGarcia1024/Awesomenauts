game.SpearThrow = me.Entity.extend({
	init: function(x, y, settings, facing){
		this._super(me.Entity, 'init', [x, y, {
			//loads our image creep 1 from our resources folder
			image: "spear",
			width: 48,
			height: 48,
			spritewidth: "48",
			spriteheight: "48",
			getShape: function(){
				return (new me.Rect(0, 0, 48, 48)).toPolygon();
			}
		}]);
		//updates the enemy creep
		this.alwaysUpdate = true;
		//sets veloctiy
		this.body.setVelocity(8, 0);
		this.attack = game.data.ability3*3;
		this.type = "spear";
		this.facing = facing
	},

	update: function(delta){
		if(this.facing === "left"){
		//has player accelerate
		this.body.vel.x -= this.body.accel.x * me.timer.tick;
	}else{
		this.body.vel.x += this.body.accel.x * me.timer.tick;
	}

		//checks for collisions with our player
		//if there are collisions it passes it to collide handler
		me.collision.check(this, true, this.collideHandler.bind(this), true);

		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);

		return true;
	},

	//handels collisons with the player
	//any lines of code that deal with the collisions above get sent down here and passed through
	collideHandler: function(response) {
		//some simple code to start it off
		//shows what we are colliding with
		if(response.b.type === 'EnemyBase' || response.b.type === 'EnemyCreep') {
				//makes the player base call its loose health function and passes it at a
				//damage of 1
				//a function that causes the player to loose some health
				//uses the global variable that helps the player loose health
				//variable located in game.js
				response.b.loseHealth(this.attack);
				me.game.world.removeChild(this);
			}
		}

});