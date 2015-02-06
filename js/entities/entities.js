//adds a specific player
game.PlayerEntity = me.Entity.extend({
	init: function(x, y, settings) {
		this._super(me.Entity, 'init', [x, y, {
			image: "player",
			width: 64,
			height: 64,
			spritewidth: "64",
			spriteheight: "64",
			getShape: function() {
				return(new me.Rect(0, 0, 64, 64)).toPolygon();
			}
		}]);
			//sets the spawn
		this.body.setVelocity(5, 20);
		//Keeps track of which direction your character is going
		this.facing = "right";
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
			//grabs animation from image
		this.renderable.addAnimation("idle", [78]);
		this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
		this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);

		this.renderable.setCurrentAnimation("idle");

	},


	update: function(delta){
			//binds a key
		if(me.input.isKeyPressed("right")){
			//adds to the position of my x by the velocity defined above in
			//setVelocity() and multiplying it by me.timer.tick.
			//me.timer.tick makes the movement look smooth
			this.body.vel.x += this.body.accel.x * me.timer.tick;
			this.facing = "right";
			this.flipX(true);
			//set player to move left
		}else if(me.input.isKeyPressed("left")){
			this.facing = "left";
			this.body.vel.x -=this.body.accel.x * me.timer.tick;
			//flips animation
			this.flipX(false);	
		}else{
			this.body.vel.x = 0;
		}
			//sets animation
			// && !this.jumping && !this.falling makes it so you can't
			// double jump while jumping or falling
		if(me.input.isKeyPressed("jump") && !this.body.jumping && !this.body.falling){
			this.body.jumping = true;
			this.body.vel.y -= this.body.accel.y * me.timer.tick;
		}



			//takes binded key from play.js and uses it
		if(me.input.isKeyPressed("attack")){
			if(!this.renderable.isCurrentAnimation("attack")){
				console.log(!this.renderable.isCurrentAnimation("attack"));
			//sets the current animation to attack and once that is over
			//goes back to the idle animation
				this.renderable.setCurrentAnimation("attack", "idle");
			//makes it so that the next time we start this sequence, we begin
			//from the first animation, not wherever we left off when we
			//switched to another animation
				this.renderable.setAnimationFrame();
			}
		}

			//sets current animation
		else if(this.body.vel.x !== 0){
			if(!this.renderable.isCurrentAnimation("walk")){
				this.renderable.setCurrentAnimation("walk");
			}
		}
		else{
			this.renderable.setCurrentAnimation("idle");
		}

		if(me.input.isKeyPressed("attack")){
			if(!this.renderable.isCurrentAnimation("attack")){
				this.renderable.setCurrentAnimation("attack", "idle");
				this.renderable.setAnimationFrame();
			}
		}
			//Makes perameter
		me.collision.check(this, true, this.collideHandler.bind(this), true);

		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);
		return true;

	},
			//Hold all information for collision
	collideHandler: function(response){
		if(response.b.type==='EnemyBaseEntity'){
			var ydif = this.pos.y - response.b.pos.y;
			var xdif = this.pos.x - response.b.pos.x;

			console.log("xdif" + xdif + ydif);
			//sets barrier on right side of the enemy base
			if(xdif>-35 && this.facing=='right' && (xdif<0)){
				this.body.vel.x = 0;
				this.pos.x = this.pos.x -1;
			//sets barrier on left side of the enemy base
			// && x(y)dif>(<)0 makes it so the barrier doesn't work while facibg the other way
			}else if(xdif<70 && this.facing=='left' && xdif>0){
				this.body.vel.x = 0;
				this.pos.x = this.pos.x +1;

			}
		}
	}
});
	//adds base class
game.PlayerBaseEntity = me.Entity.extend({
	init : function(x, y, settings){
		this._super(me.Entity, 'init', [x, y, {
			//adds image
			image: "tower",
			width: 100,
			height: 100,
			spritewidth: "100",
			spriteheight: "100",
			getShape: function() {
				return (new me.Rect(0, 0, 100, 70)).toPolygon();
			}
		}]);
			//variable that say that tower is not destroyed
		this.broken = false;
		this.health = 10;
		this.alwaysUpdate = true;
		//if someone runs with the tower, they will collide
		this.body.onCollision = this.onCollision.bind(this);
		
		this.type = "PlayerBaseEntity";

		//adds animation for PlayerBase
		this.renderable.addAnimation("idle", [0]);
		//burning animation
		this.renderable.addAnimation("broken", [1]);
		//normal animation
		this.renderable.setCurrentAnimation("idle");
	},

	update:function(delta) {
		//if health is below 0, then you should die
		if(this.health<=0){
			this.broken = true;
			this.renderable.setCurrentAnimation("broken");
		}
		this.body.update(delta);

	this._super(me.Entity, "update", [delta]);
	return true;
	},

	onCollision: function(){
		
	}	

});

game.EnemyBaseEntity = me.Entity.extend({
	init : function(x, y, settings){
		this._super(me.Entity, 'init', [x, y, {
			//adds image
			image: "tower",
			width: 100,
			height: 100,
			spritewidth: "100",
			spriteheight: "100",
			getShape: function() {
				return (new me.Rect(0, 0, 100, 70)).toPolygon();
			}
		}]);
			//variable that say that tower is not destroyed
		this.broken = false;
		this.health = 10;
		this.alwaysUpdate = true;
		//if someone runs with the tower, they will collide
		this.body.onCollision = this.onCollision.bind(this);
		
		this.type = "EnemyBaseEntity";
			//sets animation for EnemyBase
		this.renderable.addAnimation("idle", [0]);
			//burned base
		this.renderable.addAnimation("broken", [1]);
			//fixed base
		this.renderable.setCurrentAnimation("idle");
	},

	update:function(delta) {
		//if health is below 0, then you should die
		if(this.health<=0){
			this.broken = true;
			this.renderable.setCurrentAnimation("broken");
		}
		this.body.update(delta);

	this._super(me.Entity, "update", [delta]);
	return true;
	},

	onCollision: function(){
		
	}	

});