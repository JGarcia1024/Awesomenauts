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
		this.type = "PlayerEntity";
		//gives player a certain amount of health
		this.health = 20;
			//sets the spawn
		this.body.setVelocity(5, 20);
		//Keeps track of which direction your character is going
		this.facing = "right";
		//states the amount of hit
		this.now = new Date().getTime();
		this.lastHit = this.now;
		this.lastAttack = new Date().getTime();
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
			//grabs animation from image
		this.renderable.addAnimation("idle", [78]);
		this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
		this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);

		this.renderable.setCurrentAnimation("idle");

	},


	update: function(delta){
		this.now = new Date().getTime();
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
		else if(this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")){
			if(!this.renderable.isCurrentAnimation("walk")){
				this.renderable.setCurrentAnimation("walk");
			}
		}else if(!this.renderable.isCurrentAnimation("attack")){
			this.renderable.setCurrentAnimation("idle");
		}
			//Makes perameter
		me.collision.check(this, true, this.collideHandler.bind(this), true);

		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);
		return true;



	},

loseHealth: function(damage){
	this.health = this.health - damage;
	console.log(this.health);
},



			//Hold all information for collision
	collideHandler: function(response){
		if(response.b.type==='EnemyBaseEntity'){
			var ydif = this.pos.y - response.b.pos.y;
			var xdif = this.pos.x - response.b.pos.x;

			console.log("xdif" + xdif + ydif);
			//sets barrier on the top of the enemy base
			//y axis must come first because it;s more important
			if(ydif<-40 && xdif< 70 && xdif>-35){
				this.body.falling = false;
				this.body.vel.y = -1;
			}
			//sets barrier on right side of the enemy base
			else if(xdif>-35 && this.facing=='right' && (xdif<0)){
				this.body.vel.x = 0;
				this.pos.x = this.pos.x -1;
			//sets barrier on left side of the enemy base
			// && x(y)dif>(<)0 makes it so the barrier doesn't work while facibg the other way
			}else if(xdif<70 && this.facing=='left' && xdif>0){
				this.body.vel.x = 0;
				this.pos.x = this.pos.x +1;
			}
			//sets the amount of hits it take to destroy
			//the enemy base
			if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= 1000){
				this.lastHit = this.now;
				response.b.loseHealth();
			}

		}else if(response.b.type==='EnemyCreep'){
			var xdif = this.pos.x - response.b.pos.x;
			var ydif = this.pos.y - response.b.pos.y;

			if (xdif>0){
				this.pos.x = this.pos.x + 1;
				if(this.facing==="left"){
					this.body.vel.x = 0;
				}
			}else{
				this.pos.x = this.pos.x - 1;
				if(this.facing==="right"){
					this.body.vel.x = 0;
				}
			}
			if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= 1000
				&& (Math.abs(ydif) <=40) && 
				(((xdif>0) && this.facing==="left") || ((xdif<0) && this.facing==="right"))
				){
				this.lastHit = this.now;
				response.b.loseHealth(1);
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
		this.type = "PlayerBase";

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

	loseHealth: function(damage){
		this.health = this.health - damage;
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
		//renders broken animation
			this.renderable.setCurrentAnimation("broken");
		}
		this.body.update(delta);

	this._super(me.Entity, "update", [delta]);
	return true;
	},

	onCollision: function(){
		
	},
	//loss of health
	loseHealth: function(){
		this.health--;
	}

});
		//class for creep enemy
game.EnemyCreep = me.Entity.extend({
	init: function(x, y, setting){
		this._super(me.Entity, 'init', [x, y, {
		//creates image for creep
			image: "creep1",
			width: 32,
			height: 64,
			spritewidth: "32",
			spriteheight: "64",
			getShape: function(){
				return (new me.Rect(0, 0, 32, 64)).toPolygon();
			}
		}]);
		//gives health
		this.health = 10;
		this.alwaysUpdate = true;
		//this.attacking lets us know if the enemy is currently attacking
		this.attacking = false;
		//keeps track of when our creep last attacked anything
		this.lastAttacking = new Date().getTime();
		//keep track of the last time our creep hit anything
		this.lastHit = new Date().getTime();
		this.now = new Date().getTime();
		//sets speed
		this.body.setVelocity(3, 20);

		this.type = "EnemyCreep";
		//uses images
		this.renderable.addAnimation("walk", [3, 4, 5], 80);
		this.renderable.setCurrentAnimation("walk");
	},

	loseHealth: function(damage){
		this.health = this.health - damage;
	},

	update: function(delta){
		console.log(this.health);
		if(this.health <= 0){
			me.game.world.removeChild(this);
		}

		this.now = new Date().getTime();

		this.body.vel.x -= this.body.accel.x * me.timer.tick;

		me.collision.check(this, true, this.collideHandler.bind(this), true);
		

		this.body.update(delta);


		this._super(me.Entity, "update", [delta]);
		return true;

	},

	collideHandler: function(response){
		if(response.b.type==='PlayerBase'){
			this.attacking=true;
			this.lastAttacking=this.now;
			//this.lastAttacking=this.now;
			this.body.vel.x = 0;
			this.pos.x = this.pos.x + 1;
			//makes player lose health
			if((this.now-this.lastHit >= 1000)){
				this.lasHit = this.now;
				response.b.loseHealth(1);
			}
		}else if (response.b.type==='PlayerEntity'){
			var xdif = this.pos.x - response.b.pos.x;
			this.attacking=true;
			//this.lastAttacking=this.now;
			if(xdif>0){
			this.pos.x = this.pos.x + 1;
			this.body.vel.x = 0;
			}
			//gives health to player
			if((this.now-this.lastHit >= 1000) && xdif>0){
				this.lasHit = this.now;
				response.b.loseHealth(1);
			}
		}
	}

});
	//function that sets timer for creep
game.GameManager = Object.extend({
	init: function(x, y, settings){
		this.now = new Date().getTime();
		this.lastCreep = new Date().getTime();

		this.alwaysUpdate = true;
	},

	update: function(){
		this.now = new Date().getTime();
		//stuff
		if(Math.round(this.now/1000)%10 ===0 && (this.now - this.lastCreep >= 1000)){
			this.lastCreep = this.now;
			var creep = me.pool.pull("EnemyCreep", 1000, 0, {});
			me.game.world.addChild(creep, 5);
		}

		return true;
	}
});