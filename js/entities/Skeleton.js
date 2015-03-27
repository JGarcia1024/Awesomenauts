//enemy hero hack
// enemy hero class
game.EnemyHeroEntity = me.Entity.extend ({
	//constructor function 
	init: function(x, y, settings){
		//reachers the constructor function for enitity
		this._super(me.Entity, 'init', [x, y, {
			//settings. shoes the player
			image: "enemyhero",
			//sets aside a width of 64 pixels for the sprite
			width: 64,
			//sets aside a height of 64 pixels for the sprite
			height: 64,
			//gives the sprite a width of 64. 
			spritewidth : "64",
			//gives the sprite a width of 64
			spriteheight: "64",
			getShape: function(){
				//returns a rectangle of what the player walks into
				return(new me.Rect(0, 0, 64, 64)).toPolygon();
			}
		}]);
		//allows player to be interacted with
		this.type = "EnemyHeroEntity";
		//sets the player's health to 100
		this.health = game.data.playerHealth;
		//says the player is not dead
		this.dead = false;
		//sets movemet speed. allows player to move horizantally and vertically
		this.body.setVelocity(game.data.playerMoveSpeed, 20);
		//keeps track of which way the character is going
		this.facing = "left";
		//variable for keeping track of time and date
		this.now = new Date().getTime();
		//same ^^
		this.lastHit = this.now;
		//keeps the player from attacking multiple times
		this.lastAttack = new Date().getTime();
		//makesit so the player is always on the screen
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
		//gives player animation while standing
		this.renderable.addAnimation("idle", [78]);
		//gives player animation while walking
		this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
		//gives player animation while attacking
		this.renderable.addAnimation("attack", [169, 170, 171, 172, 173, 174, 173, 172, 171], 80);
		//the player's start animation
		this.renderable.setCurrentAnimation("idle");
	},

	//delta is the change in time that's happening
	update: function(delta){
		//keeps timer updated
		this.now = new Date().getTime();
		//runa when player's health reaches 0
		if (this.health <= 0) {
			//says player is dead
			this.dead = true;
		}
		//runs if the right key is pressed
		if(me.input.isKeyPressed("rights")){
			//when right key is pressed, adds to the position of my x by the velocity defined above in setVelocity and multiplying it by me.timer.tick
			//me.timer.tick makes the movement look smooth
			this.body.vel.x += this.body.accel.x * me.timer.tick;
			//so the program knows the character is facing right
			this.facing = "right";
			//flips the animation
			this.flipX(true);
		}
		//runs if left key is pressed
		else if(me.input.isKeyPressed("lefts")){
			//when right key is pressed, adds to the position of my x by the velocity defined above in setVelocity and multiplying it by me.timer.tick
			//me.timer.tick makes the movement look smooth
			this.body.vel.x -= this.body.accel.x * me.timer.tick;
			//so the program knows the character is facing left
			this.facing = "left";
			//doesn't flip the animation
			this.flipX(false);
		}
		//if the right key isn't being pressed, the player doesn't move
		else{
			this.body.vel.x = 0;
		}
		//runs only if the up key is pressed, the player isn't already jumping or falling
		if(me.input.isKeyPressed("jumps") && !this.body.jumping && !this.body.falling){
			//makes the player jump
			this.body.jumping = true;
			//sets velocity of the jump and the time
			this.body.vel.y -= this.body.accel.y * me.timer.tick;
		}
		//runs if the attack key is pressed
		if(me.input.isKeyPressed("attacks")){
			if(!this.renderable.isCurrentAnimation("attack")){
				//sets current animation to attack. goes back to idle oncethe attack is over it goes back to idle
				this.renderable.setCurrentAnimation("attack", "idle")
				//makes it so that next time the button is pressed the player starts from the first animation, not where it left off
				this.renderable.setAnimationFrame();
			}
		}
		//runs if the player is moving horizantally and not attacking
		else if(this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")){
			//runs if the player isn't already running the walk animation
			if(!this.renderable.isCurrentAnimation("walk")){
				//gives the player the walking animation
				this.renderable.setCurrentAnimation("walk");
			}
		}
		//runs if player is standing still and not attacking
		else if(!this.renderable.isCurrentAnimation("attack")){
			//gives the player the idle animation
			this.renderable.setCurrentAnimation("idle");
		}
		//checks to see if player is colliding with base
		me.collision.check(this, true, this.collideHandler.bind(this), true);
		//tells above code to work
		this.body.update(delta);
		//updates the code
		this._super(me.Entity, "update", [delta]);
		return true;
	},

	//runs when called
	loseHealth: function(damage){
		//subtracts set amount of health
		this.health = this.health - damage;
	},
	
	//function for when player collides with tower
	collideHandler: function(response){
		//runs if the player collides with the enemy base
		if (response.b.type === 'PlayerBase') {
			//represents the difference between player's y distance and enemy's y distance
			var ydif = this.pos.y - response.b.pos.y;
			//represents the difference between player's and enemy base's x distance
			var xdif = this.pos.x - response.b.pos.x;
			//runs if the player is on top of the enemy base
			if (ydif < -40 && xdif < 76 && xdif > -33) {
				//stops the player from moving down
				this.body.falling = false;
				//keeps the player from falling through the tower
				this.body.vel.y = -1;
			}
			//runs if the player's x position is 37 units away from the tower while facing right 
			else if (xdif > -33 && this.facing === "right" && xdif < 0) {
				//stops player from moving 
				this.body.vel.x = 0;
				//moves player slightly away from tower
				this.pos.x = this.pos.x -1;
			}
			//runs if the player's x position is 74 units away from the tower while facing left 
			else if (xdif < 76 && this.facing === "left" && xdif > 0) {
				//stops player from moving 
				this.body.vel.x = 0;
				//moves player slightly away from tower
				this.pos.x = this.pos.x +1;
			}
			//runs if the player is attacking and its been 1000 milliseconds since the last hit
			if (this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer) {
				//so the computer knows th eplayer just hit the tower
				this.lastHit = this.now;
				//calls the loseHealth function and sets the parameter to the playerAttack variable
				response.b.loseHealth(game.data.playerAttack);
			}
		}
		//runs if the player collides with the enemy creep
		else if (response.b.type === 'FriendCreep') {
			//stores the horizantal distance from the player to the enemy creep
			var xdif = this.pos.x - response.b.pos.x;
			//stores the vertical distance from the player to the enemy creep
			var ydif = this.pos.y - response.b.pos.y; 
			//runs if the player is to the left of the enemy creep
			if (xdif > 0) {
				//pushes the player 1 unit to the right
				this.pos.x = this.pos.x + 1;
				//runs if the player is facing left
				if (this.facing === "left") {
					//stops the player's movement
					this.body.vel.x = 0;
				}
			}
			else {
				//pushes the player 1 unit to the left
				this.pos.x = this.pos.x - 1;
				//runs if the player is facing right
				if (this.facing === "right") {
					//stops the player's movement
					this.body.vel.x = 0;
				}
			}
			//runs the loseHealth function only if the player is attacking the enemy creep
			//can only take one life point per second
			if (this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer) {
				//updates the timer
				this.lastHit = this.now;
				//calls the loseHealth function with a parameter of 1
				response.b.loseHealth(game.data.playerAttack);
			}
		}
	}
});
