//adds a specific player
game.PlayerEntity = me.Entity.extend({
	init: function(x, y, settings) {
		this.setSuper();
		this.setPlayerTimers();
		this.setAttributes();

		this.type = "PlayerEntity";
		this.setFlags();
		//saves the data when the plaer attacks for game.js
		this.attack = game.data.playerAttack;
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

		this.addAnimation();
			
		this.renderable.setCurrentAnimation("idle");

	},
	//New functions bellow help code be organize
	setSuper: function(){
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

	},

	setPlayerTimers: function(){
		//states the amount of hit
		this.now = new Date().getTime();
		this.lastHit = this.now;
		this.lastAttack = new Date().getTime();

	},

	setAttributes: function(){
		//gives player a certain amount of health
		this.health = game.data.playerHealth;
		//sets the spawn
		this.body.setVelocity(game.data.playerMoveSpeed, 20);
	},

	setFlags: function(){
		//Keeps track of which direction your character is going
		this.facing = "right";
		//makes player die to respawn
		this.dead = false;
	},

	addAnimation: function(){
		//grabs animation from image
		this.renderable.addAnimation("idle", [78]);
		this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
		this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);

	},


	update: function(delta){
		this.now = new Date().getTime();

		this.dead = checkIfDead();

		this.checkKeyPressedAndMove();

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

	checkIfDead: function(){
		if(this.health <= 0){
			return = true;
		}
		return false;
	},

	checkKeyPressedAndMove: function(){
			//binds a key
		if(me.input.isKeyPressed("right")){
			this.moveRight();
			//set player to move left
		}else if(me.input.isKeyPressed("left")){
			this.moveLeft();
		}else{
			this.body.vel.x = 0;
		}
			//sets animation
			// && !this.jumping && !this.falling makes it so you can't
			// double jump while jumping or falling
		if(me.input.isKeyPressed("jump") && !this.body.jumping && !this.body.falling){
			this.jump();
		}
	},

	moveRight: function(){
			//adds to the position of my x by the velocity defined above in
			//setVelocity() and multiplying it by me.timer.tick.
			//me.timer.tick makes the movement look smooth
			this.body.vel.x += this.body.accel.x * me.timer.tick;
			this.facing = "right";
			this.flipX(true);
	},

	moveLeft: function(){
			this.facing = "left";
			this.body.vel.x -=this.body.accel.x * me.timer.tick;
			//flips animation
			this.flipX(false);	
	},

	jump: function(){
			this.body.jumping = true;
			this.body.vel.y -= this.body.accel.y * me.timer.tick;
	};

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
				//this.pos.x = this.pos.x -1;
			//sets barrier on left side of the enemy base
			// && x(y)dif>(<)0 makes it so the barrier doesn't work while facibg the other way
			}else if(xdif<70 && this.facing=='left' && xdif>0){
				this.body.vel.x = 0;
				//this.pos.x = this.pos.x +1;
			}
			//sets the amount of hits it take to destroy
			//the enemy base
			if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer){
				this.lastHit = this.now;
				response.b.loseHealth(game.data.playerAttack);
			}

			//adds left sides to creep
		}else if(response.b.type==='EnemyCreep'){
			var xdif = this.pos.x - response.b.pos.x;
			var ydif = this.pos.y - response.b.pos.y;
			//creates left side damage for creep
			if (xdif>0){
				//this.pos.x = this.pos.x + 1;
				if(this.facing==="left"){
					this.body.vel.x = 0;
				}
			//adds right side to creep 
			}else{
				this.pos.x = this.pos.x - 1;
				if(this.facing==="right"){
					this.body.vel.x = 0;
				}
			}
			if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer
				&& (Math.abs(ydif) <=40) && 
				(((xdif>0) && this.facing==="left") || ((xdif<0) && this.facing==="right"))
				){
				//function adds gold
				this.lastHit = this.now;
				if(response.b.health <= game.data.playerAttack){
				//if adds 1 gold when creep dies
					game.data.gold += 1;
					console.log("Current gold: " + game.data.gold); 
				}
				response.b.loseHealth(game.data.playerAttack);
			}
		}
	}
});



