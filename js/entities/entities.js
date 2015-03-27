// // player's class
// game.PlayerEntity = me.Entity.extend ({
// 	//constructor function 
// 	init: function(x, y, settings){
// 		//reachers the constructor function for enitity
// 		this._super(me.Entity, 'init', [x, y, {
// 			//settings. shoes the player
// 			image: "player",
// 			//sets aside a width of 64 pixels for the sprite
// 			width: 64,
// 			//sets aside a height of 64 pixels for the sprite
// 			height: 64,
// 			//gives the sprite a width of 64. 
// 			spritewidth : "64",
// 			//gives the sprite a width of 64
// 			spriteheight: "64",
// 			getShape: function(){
// 				//returns a rectangle of what the player walks into
// 				return(new me.Rect(0, 0, 64, 64)).toPolygon();
// 			}
// 		}]);
// 		//allows player to be interacted with
// 		this.type = "PlayerEntity";
// 		//sets the player's health to 100
// 		this.health = game.data.playerHealth;
// 		//says the player is not dead
// 		this.dead = false;
// 		//sets attack
// 		this.attack = game.data.playerAttack;
// 		//sets movemet speed. allows player to move horizantally and vertically
// 		this.body.setVelocity(game.data.playerMoveSpeed, 20);
// 		//keeps track of which way the character is going
// 		this.facing = "right";
// 		//variable for keeping track of time and date
// 		this.now = new Date().getTime();
// 		//same ^^
// 		this.lastHit = this.now;
// 		//keeps the player from attacking multiple times
// 		this.lastAttack = new Date().getTime();
// 		//makesit so the player is always on the screen
// 		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
// 		//gives player animation while standing
// 		this.renderable.addAnimation("idle", [78]);
// 		//gives player animation while walking
// 		this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
// 		//gives player animation while attacking
// 		this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
// 		//the player's start animation
// 		this.renderable.setCurrentAnimation("idle");
// 	},


// 	//delta is the change in time that's happening
// 	update: function(delta){
// 		//keeps timer updated
// 		this.now = new Date().getTime();
// 		//runa when player's health reaches 0
// 		if (this.health <= 0) {
// 			//says player is dead
// 			this.dead = true;
// 		}
// 		//runs if the right key is pressed
// 		if(me.input.isKeyPressed("right")){
// 			//when right key is pressed, adds to the position of my x by the velocity defined above in setVelocity and multiplying it by me.timer.tick
// 			//me.timer.tick makes the movement look smooth
// 			this.body.vel.x += this.body.accel.x * me.timer.tick;
// 			//so the program knows the character is facing right
// 			this.facing = "right";
// 			//flips the animation
// 			this.flipX(true);
// 		}

// 		else if(me.input.isKeyPressed("left")){
// 			//when right key is pressed, adds to the position of my x by the velocity defined above in setVelocity and multiplying it by me.timer.tick
// 			//me.timer.tick makes the movement look smooth
// 			this.body.vel.x -= this.body.accel.x * me.timer.tick;
// 			//so the program knows the character is facing left
// 			this.facing = "left";
// 			//doesn't flip the animation
// 			this.flipX(false);
// 		}

// 		//if the right key isn't being pressed, the player doesn't move
// 		else{
// 			this.body.vel.x = 0;
// 		}
// 		//runs only if the up key is pressed, the player isn't already jumping or falling
// 		if(me.input.isKeyPressed("jump") && !this.body.jumping && !this.body.falling){
// 			//makes the player jump
// 			this.body.jumping = true;
// 			//sets velocity of the jump and the time
// 			this.body.vel.y -= this.body.accel.y * me.timer.tick;
// 		}

// 		//runs if the attack key is pressed
// 		if(me.input.isKeyPressed("attack")){
// 			if(!this.renderable.isCurrentAnimation("attack")){
// 				//sets current animation to attack. goes back to idle oncethe attack is over it goes back to idle
// 				this.renderable.setCurrentAnimation("attack", "idle")
// 				//makes it so that next time the button is pressed the player starts from the first animation, not where it left off
// 				this.renderable.setAnimationFrame();
// 			}
// 		}

// 		//runs if the player is moving horizantally and not attacking
// 		else if(this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")){
// 			//runs if the player isn't already running the walk animation
// 			if(!this.renderable.isCurrentAnimation("walk")){
// 				//gives the player the walking animation
// 				this.renderable.setCurrentAnimation("walk");
// 			}
// 		}
// 		//runs if player is standing still and not attacking
// 		else if(!this.renderable.isCurrentAnimation("attack")){
// 			//gives the player the idle animation
// 			this.renderable.setCurrentAnimation("idle");
// 		}
// 		//checks to see if player is colliding with base
// 		me.collision.check(this, true, this.collideHandler.bind(this), true);
// 		//tells above code to work
// 		this.body.update(delta);
// 		//updates the code
// 		this._super(me.Entity, "update", [delta]);
// 		return true;
// 	},
// 	//runs when called
// 	loseHealth: function(damage){
// 		//subtracts set amount of health
// 		this.health = this.health - damage;
// 	},
// 	//function for when player collides with tower
// 	collideHandler: function(response){
// 		//runs if the player collides with the enemy base
// 		if (response.b.type === 'EnemyBaseEntity') {
// 			//represents the difference between player's y distance and enemy's y distance
// 			var ydif = this.pos.y - response.b.pos.y;
// 			//represents the difference between player's and enemy base's x distance
// 			var xdif = this.pos.x - response.b.pos.x;
// 			//runs if the player is on top of the enemy base
// 			if (ydif < -40 && xdif < 60 && xdif > -35) {
// 				//stops the player from moving down
// 				this.body.falling = false;
// 				//keeps the player from falling through the tower
// 				this.body.vel.y = -1;
// 			}
// 			//runs if the player's x position is 37 units away from the tower while facing right 
// 			else if (xdif > -36 && this.facing === "right" && xdif < 0) {
// 				//stops player from moving 
// 				this.body.vel.x = 0;
// 				//moves player slightly away from tower
// 				this.pos.x = this.pos.x -1;
// 			}
// 			//runs if the player's x position is 74 units away from the tower while facing left 
// 			else if (xdif < 75 && this.facing === "left" && xdif > 0) {
// 				//stops player from moving 
// 				this.body.vel.x = 0;
// 				//moves player slightly away from tower
// 				this.pos.x = this.pos.x +1;
// 			}
// 			//runs if the player is attacking and its been 1000 milliseconds since the last hit
// 			if (this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer
// 				//and if the y difference is less than 41
// 				&& (Math.abs(ydif) <= 40) &&
// 				//and if the player is facing the creep's baack or front
// 				((xdif > 0 ) && this.facing === "left") || ((xdif < 0) && this.facing === "right")) {
// 				//so the computer knows th eplayer just hit the tower
// 				this.lastHit = this.now;
// 				//calls the loseHealth function and sets the parameter to the playerAttack variable
// 				response.b.loseHealth(game.data.playerAttack);
// 			}
// 		}
// 		//runs if the player collides with the enemy creep
// 		else if (response.b.type === 'EnemyCreep') {
// 			//stores the horizantal distance from the player to the enemy creep
// 			var xdif = this.pos.x - response.b.pos.x;
// 			//stores the vertical distance from the player to the enemy creep
// 			var ydif = this.pos.y - response.b.pos.y; 
// 			//runs if the player is to the left of the enemy creep
// 			if (xdif > 0) {
// 				//pushes the player 1 unit to the right
// 				this.pos.x = this.pos.x + 1;
// 				//runs if the player is facing left
// 				if (this.facing === "left") {
// 					//stops the player's movement
// 					this.body.vel.x = 0;
// 				}
// 			}
// 			else {
// 				//pushes the player 1 unit to the left
// 				this.pos.x = this.pos.x - 1;
// 				//runs if the player is facing right
// 				if (this.facing === "right") {
// 					//stops the player's movement
// 					this.body.vel.x = 0;
// 				}
// 			}
// 			//runs the loseHealth function only if the player is attacking the enemy creep
// 			//can only take one life point per second
// 			if (this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer) {
// 				//updates the timer
// 				this.lastHit = this.now;
// 				//runs if the creep's health is less than the player's attack
// 				if (response.b.health <= game.data.playerAttack) {
// 					//adds one gold
// 					game.data.gold += 1;
// 					console.log("Current gold: " + game.data.gold);
// 				}
// 				//calls the loseHealth function with a parameter of 1
// 				response.b.loseHealth(game.data.playerAttack);
// 			}
// 		}
// 	}
// });

// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //enemy hero hack
// // enemy hero class
// game.EnemyHeroEntity = me.Entity.extend ({
// 	//constructor function 
// 	init: function(x, y, settings){
// 		//reachers the constructor function for enitity
// 		this._super(me.Entity, 'init', [x, y, {
// 			//settings. shoes the player
// 			image: "enemyhero",
// 			//sets aside a width of 64 pixels for the sprite
// 			width: 64,
// 			//sets aside a height of 64 pixels for the sprite
// 			height: 64,
// 			//gives the sprite a width of 64. 
// 			spritewidth : "64",
// 			//gives the sprite a width of 64
// 			spriteheight: "64",
// 			getShape: function(){
// 				//returns a rectangle of what the player walks into
// 				return(new me.Rect(0, 0, 64, 64)).toPolygon();
// 			}
// 		}]);
// 		//allows player to be interacted with
// 		this.type = "EnemyHeroEntity";
// 		//sets the player's health to 100
// 		this.health = game.data.playerHealth;
// 		//says the player is not dead
// 		this.dead = false;
// 		//sets movemet speed. allows player to move horizantally and vertically
// 		this.body.setVelocity(game.data.playerMoveSpeed, 20);
// 		//keeps track of which way the character is going
// 		this.facing = "left";
// 		//variable for keeping track of time and date
// 		this.now = new Date().getTime();
// 		//same ^^
// 		this.lastHit = this.now;
// 		//keeps the player from attacking multiple times
// 		this.lastAttack = new Date().getTime();
// 		//makesit so the player is always on the screen
// 		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
// 		//gives player animation while standing
// 		this.renderable.addAnimation("idle", [78]);
// 		//gives player animation while walking
// 		this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
// 		//gives player animation while attacking
// 		this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
// 		//the player's start animation
// 		this.renderable.setCurrentAnimation("idle");
// 	},


// 	//delta is the change in time that's happening
// 	update: function(delta){
// 		//keeps timer updated
// 		this.now = new Date().getTime();
// 		//runa when player's health reaches 0
// 		if (this.health <= 0) {
// 			//says player is dead
// 			this.dead = true;
// 		}
// 		//runs if the right key is pressed
// 		if(me.input.isKeyPressed("rights")){
// 			//when right key is pressed, adds to the position of my x by the velocity defined above in setVelocity and multiplying it by me.timer.tick
// 			//me.timer.tick makes the movement look smooth
// 			this.body.vel.x += this.body.accel.x * me.timer.tick;
// 			//so the program knows the character is facing right
// 			this.facing = "right";
// 			//flips the animation
// 			this.flipX(true);
// 		}

// 		else if(me.input.isKeyPressed("lefts")){
// 			//when right key is pressed, adds to the position of my x by the velocity defined above in setVelocity and multiplying it by me.timer.tick
// 			//me.timer.tick makes the movement look smooth
// 			this.body.vel.x -= this.body.accel.x * me.timer.tick;
// 			//so the program knows the character is facing left
// 			this.facing = "left";
// 			//doesn't flip the animation
// 			this.flipX(false);
// 		}

// 		//if the right key isn't being pressed, the player doesn't move
// 		else{
// 			this.body.vel.x = 0;
// 		}
// 		//runs only if the up key is pressed, the player isn't already jumping or falling
// 		if(me.input.isKeyPressed("jumps") && !this.body.jumping && !this.body.falling){
// 			//makes the player jump
// 			this.body.jumping = true;
// 			//sets velocity of the jump and the time
// 			this.body.vel.y -= this.body.accel.y * me.timer.tick;
// 		}

// 		//runs if the attack key is pressed
// 		if(me.input.isKeyPressed("attacks")){
// 			if(!this.renderable.isCurrentAnimation("attack")){
// 				//sets current animation to attack. goes back to idle oncethe attack is over it goes back to idle
// 				this.renderable.setCurrentAnimation("attack", "idle")
// 				//makes it so that next time the button is pressed the player starts from the first animation, not where it left off
// 				this.renderable.setAnimationFrame();
// 			}
// 		}

// 		//runs if the player is moving horizantally and not attacking
// 		else if(this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")){
// 			//runs if the player isn't already running the walk animation
// 			if(!this.renderable.isCurrentAnimation("walk")){
// 				//gives the player the walking animation
// 				this.renderable.setCurrentAnimation("walk");
// 			}
// 		}
// 		//runs if player is standing still and not attacking
// 		else if(!this.renderable.isCurrentAnimation("attack")){
// 			//gives the player the idle animation
// 			this.renderable.setCurrentAnimation("idle");
// 		}
// 		//checks to see if player is colliding with base
// 		me.collision.check(this, true, this.collideHandler.bind(this), true);
// 		//tells above code to work
// 		this.body.update(delta);
// 		//updates the code
// 		this._super(me.Entity, "update", [delta]);
// 		return true;
// 	},
// 	//runs when called
// 	loseHealth: function(damage){
// 		//subtracts set amount of health
// 		this.health = this.health - damage;
// 	},
// 	//function for when player collides with tower
// 	collideHandler: function(response){
// 		//runs if the player collides with the enemy base
// 		if (response.b.type === 'PlayerBase') {
// 			//represents the difference between player's y distance and enemy's y distance
// 			var ydif = this.pos.y - response.b.pos.y;
// 			//represents the difference between player's and enemy base's x distance
// 			var xdif = this.pos.x - response.b.pos.x;
// 			//runs if the player is on top of the enemy base
// 			if (ydif < -40 && xdif < 76 && xdif > -33) {
// 				//stops the player from moving down
// 				this.body.falling = false;
// 				//keeps the player from falling through the tower
// 				this.body.vel.y = -1;
// 			}
// 			//runs if the player's x position is 37 units away from the tower while facing right 
// 			else if (xdif > -33 && this.facing === "right" && xdif < 0) {
// 				//stops player from moving 
// 				this.body.vel.x = 0;
// 				//moves player slightly away from tower
// 				this.pos.x = this.pos.x -1;
// 			}
// 			//runs if the player's x position is 74 units away from the tower while facing left 
// 			else if (xdif < 76 && this.facing === "left" && xdif > 0) {
// 				//stops player from moving 
// 				this.body.vel.x = 0;
// 				//moves player slightly away from tower
// 				this.pos.x = this.pos.x +1;
// 			}
// 			//runs if the player is attacking and its been 1000 milliseconds since the last hit
// 			if (this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer
// 				//and if the y difference is less than 41
// 				&& (Math.abs(ydif) <= 40) &&
// 				//and if the player is facing the creep's baack or front
// 				((xdif > 0 ) && this.facing === "left") || ((xdif < 0) && this.facing === "right")) {
// 				//so the computer knows th eplayer just hit the tower
// 				this.lastHit = this.now;
// 				//calls the loseHealth function and sets the parameter to the playerAttack variable
// 				response.b.loseHealth(game.data.playerAttack);
// 			}
// 		}
// 		//runs if the player collides with the enemy creep
// 		else if (response.b.type === 'FriendCreep') {
// 			//stores the horizantal distance from the player to the enemy creep
// 			var xdif = this.pos.x - response.b.pos.x;
// 			//stores the vertical distance from the player to the enemy creep
// 			var ydif = this.pos.y - response.b.pos.y; 
// 			//runs if the player is to the left of the enemy creep
// 			if (xdif > 0) {
// 				//pushes the player 1 unit to the right
// 				this.pos.x = this.pos.x + 1;
// 				//runs if the player is facing left
// 				if (this.facing === "left") {
// 					//stops the player's movement
// 					this.body.vel.x = 0;
// 				}
// 			}
// 			else {
// 				//pushes the player 1 unit to the left
// 				this.pos.x = this.pos.x - 1;
// 				//runs if the player is facing right
// 				if (this.facing === "right") {
// 					//stops the player's movement
// 					this.body.vel.x = 0;
// 				}
// 			}
// 			//runs the loseHealth function only if the player is attacking the enemy creep
// 			//can only take one life point per second
// 			if (this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer) {
// 				//updates the timer
// 				this.lastHit = this.now;
// 				//calls the loseHealth function with a parameter of 1
// 				response.b.loseHealth(game.data.playerAttack);
// 			}
// 		}
// 	}
// });

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// //tower class
// game.PlayerBaseEntity = me.Entity.extend({
// 	init: function(x, y, settings){
// 		//reachers the constructor function for tower
// 		this._super(me.Entity, 'init', [x, y, {
// 			//settings. shoes the tower
// 			image: "tower",
// 			//sets aside a width of 100 pixels for the tower
// 			width: 100,
// 			//sets aside a height of 100 pixels for the tower
// 			height: 100,
// 			//gives the tower a width of 100. 
// 			spritewidth : "100",
// 			//gives the tower a width of 100
// 			spriteheight: "100",
// 			getShape: function(){
// 				//returns a rectangle of what the tower walks into
// 				return(new me.Rect(0, 0, 100, 60)).toPolygon();
// 			}
// 		}]);
// 		//says that tower hasn't been destroyed
// 		this.broken = false;
// 		//gives tower a "health" of ten
// 		this.health = game.data.playerBaseHealth;
// 		//makes sure the tower's status is always updating, eben when it isn't on the map
// 		this.alwaysUpdate = true;
// 		//makes teh tower collidable
// 		this.body.onCollision = this.onCollision.bind(this);
// 		//checks what player is running into
// 		this.type = "PlayerBase";
// 		//adds the defualt animatin for the game
// 		this.renderable.addAnimation("idle", [0]);
// 		//adds the animation for when the tower is broken
// 		this.renderable.addAnimation("broken", [1]);
// 		//sets the desfault animation
// 		this.renderable.setCurrentAnimation("idle");

// 	},	


// 	update:function(delta){
// 		//runs if health is less than or equal to 0
// 		if(this.health <= 0){
// 			//makes the tower "broken"
// 			this.broken = true;
// 			//sets animation for "broken"
// 			this.renderable.setCurrentAnimation("broken");
// 		} 
// 		//updates tower status
// 		this.body.update(delta);
// 		//updates
// 		this._super(me.Entity, "update", [delta]);
// 		return true;
// 	},
// 	//runs whenever called on
// 	loseHealth: function(damage){
// 		//subtracts set damage amount from health everytime ran
// 		this.health = this.health - damage;
// 	},
// 	//function that runs when base is touched
// 	onCollision: function(){

// 	}
// });


// //tower class
// game.EnemyBaseEntity = me.Entity.extend({
// 	init: function(x, y, settings){
// 		//reachers the constructor function for tower
// 		this._super(me.Entity, 'init', [x, y, {
// 			//settings. shoes the tower
// 			image: "tower",
// 			//sets aside a width of 100 pixels for the tower
// 			width: 100,
// 			//sets aside a height of 100 pixels for the tower
// 			height: 100,
// 			//gives the tower a width of 100. 
// 			spritewidth : "100",
// 			//gives the tower a width of 100
// 			spriteheight: "100",
// 			getShape: function(){
// 				//returns a rectangle of what the tower walks into
// 				return(new me.Rect(0, 0, 100, 60)).toPolygon();
// 			}
// 		}]);
// 		//says that tower hasn't been destroyed
// 		this.broken = false;
// 		//gives tower a "health" of ten
// 		this.health = game.data.enemyBaseHealth;
// 		//makes sure the tower's status is always updating, eben when it isn't on the map
// 		this.alwaysUpdate = true;
// 		//makes the tower collidable
// 		this.body.onCollision = this.onCollision.bind(this);
// 		//checks what player is running into
// 		this.type = "EnemyBaseEntity";
// 		//adds the defualt animatin for the game
// 		this.renderable.addAnimation("idle", [0]);
// 		//adds the animation for when the tower is broken
// 		this.renderable.addAnimation("broken", [1]);
// 		//sets the default animation
// 		this.renderable.setCurrentAnimation("idle");
// 	},	


// 	update:function(delta){
// 		//runs if health is less than or equal to 0
// 		if(this.health<=0){
// 			//makes the tower "broken"
// 			this.broken = true;
// 			//sets animation for "broken"
// 			this.renderable.setCurrentAnimation("broken");
// 		}
// 		//updates tower status
// 		this.body.update(delta);
// 		//updates
// 		this._super(me.Entity, "update", [delta]);
// 		return true;
// 	},
// 	//function that runs when base is touched
// 	onCollision: function(){
		
// 	},

// 	loseHealth: function(){
// 		//makes the tower loose 1 health on each hit
// 		this.health--;
// 	}
// });

// game.EnemyCreep = me.Entity.extend({
// 	init: function(x, y, settings){
// 			//reaches the constructor function for enitity
// 			this._super(me.Entity, 'init', [x, y, {
// 				//settings. shows the creep
// 				image: "creep1",
// 				//sets aside a width of 64 pixels for the sprite
// 				width: 32,
// 				//sets aside a height of 64 pixels for the sprite
// 				height: 64,
// 				//gives the sprite a width of 64. 
// 				spritewidth : "32",
// 				//gives the sprite a width of 64
// 				spriteheight: "64",
// 				//gives creep a form
// 				getShape: function(){
// 					return(new me.Rect(0, 0, 32, 64)).toPolygon();
// 				}
// 			}]);
// 			//sets health to ten
// 			this.health = game.data.enemyCreepHealth;
// 			//makes the creep's satus continuosly update
// 			this.alwaysUpdate = true;
// 			//says the creep is not attacking
// 			this.attacking = false;
// 			//records last time creep attacked anything
// 			this.lastAttacking = new Date().getTime();
// 			//records last time creep hit anything
// 			this.lastHit = new Date().getTime();
// 			//timer for attacking
// 			this.now = new Date().getTime();
// 			//sets the creep's horizantal and vertical speed
// 			this.body.setVelocity(3, 20);
// 			//sets the sprite's type
// 			this.type = "EnemyCreep";
// 			//creates the walking animation
// 			this.renderable.addAnimation("walk", [3, 4, 5], 80);
// 			//applies the walking animation
// 			this.renderable.setCurrentAnimation("walk");
// 		},
// 		//subtracts health from enemy creep
// 		loseHealth: function(damage) {
// 			this.health = this.health - damage;
// 		},


// 		//delta is the change in time that's happening
// 		update: function(delta){
// 			//removes enemy creep sprtites once their health is at zero
// 			if(this.health <= 0){
// 				me.game.world.removeChild(this);
// 			}
// 			//updates attack
// 			this.now = new Date().getTime();
// 			//makes the creep move
// 			this.body.vel.x -= this.body.accel.x *  me.timer.tick;
// 			//checks for collisions with player
// 			me.collision.check(this, true, this.collideHandler.bind(this), true);
// 			//basic update functions
// 			this.body.update(delta);
// 			this._super(me.Entity, "update", [delta]);
// 			return true;
// 		},
// 		//function for creeps' collisions
// 		collideHandler: function(response){
// 			//runs if creep collides with tower 
// 			if (response.b.type === 'PlayerBase') {
// 				//makes the creep attack
// 				this.attacking = true;
// 				//timer that says when last attacked
// 				//this.lastAttacking = this.now;
// 				//prevents the creep from walking through the tower
// 				this.body.vel.x = 0;
// 				//pushes the creep back a little to maintain its position
// 				this.pos.x = this.pos.x + 1;
// 				//Only allows the creep to hit the tower once every second
// 				if ((this.now - this.lastHit >= game.data.creepAttackTimer)) {
// 					//updates the lastHit timer
// 					this.lastHit = this.now;
// 					//runs the losehealth function, with 1 point damage
// 					response.b.loseHealth(game.data.enemyCreepAttack);
// 				}
// 			}
// 			else if (response.b.type === 'PlayerEntity') {
// 				//see where the player is compared to the creep
// 				var xdif = this.pos.x - response.b.pos.x;
// 				//makes the creep attack
// 				this.attacking = true;
// 				//timer that says when last attacked
// 				//this.lastAttacking = this.now;
				
// 				//only runs if the creep's face is right in front of the orc or under
// 				if (xdif > 0) {
// 					//prevents the creep from walking through the player
// 					this.body.vel.x = 0;
// 					//pushes the creep back a little to maintain its position
// 					this.pos.x = this.pos.x + 1;
// 				}
// 				//Only allows the creep to hit the tower once every second and if the player is not behind the creep
// 				if ((this.now - this.lastHit >= game.data.creepAttackTimer) && xdif > 0) {
// 					//updates the lastHit timer
// 					this.lastHit = this.now;
// 					//runs the losehealth function, with 1 point damage
// 					response.b.loseHealth(game.data.enemyCreepAttack);
// 				}
// 			}
// 		}
	
// });


// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// //friend creep hack one
// game.FriendCreep = me.Entity.extend({
// 	init: function(x, y, settings){
// 			//reaches the constructor function for enitity
// 			this._super(me.Entity, 'init', [x, y, {
// 				//settings. shows the creep
// 				image: "creep2",
// 				//sets aside a width of 64 pixels for the sprite
// 				width: 100,
// 				//sets aside a height of 64 pixels for the sprite
// 				height: 85,
// 				//gives the sprite a width of 64. 
// 				spritewidth : "100",
// 				//gives the sprite a width of 64
// 				spriteheight: "85",
// 				//gives creep a form
// 				getShape: function(){
// 					return(new me.Rect(0, 0, 100, 85)).toPolygon();
// 				}
// 			}]);
// 			//sets health to ten
// 			this.health = game.data.friendCreepHealth;
// 			//makes the creep's satus continuosly update
// 			this.alwaysUpdate = true;
// 			//says the creep is not attacking
// 			this.attacking = false;
// 			//records last time creep attacked anything
// 			this.lastAttacking = new Date().getTime();
// 			//records last time creep hit anything
// 			this.lastHit = new Date().getTime();
// 			//timer for attacking
// 			this.now = new Date().getTime();
// 			//sets the creep's horizantal and vertical speed
// 			this.body.setVelocity(3, 20);
// 			//sets the sprite's type
// 			this.type = "FriendCreep";
// 			//creates the walking animation
// 			this.renderable.addAnimation("walk", [0, 1, 2, 3, 4], 100);
// 			//applies the walking animation
// 			this.renderable.setCurrentAnimation("walk");
// 		},

// 		//subtracts health from friend creep
// 		loseHealth: function(damage) {
// 			this.health = this.health - damage;
// 		},

// 		//delta is the change in time that's happening
// 		update: function(delta){
// 			//updates attack
// 			this.now = new Date().getTime();
// 			//makes the creep move
// 			this.body.vel.x += this.body.accel.x *  me.timer.tick;
// 			this.flipX(true);
// 			//checks for collisions with player
// 			me.collision.check(this, true, this.collideHandler.bind(this), true);
// 			//basic update functions
// 			this.body.update(delta);
// 			this._super(me.Entity, "update", [delta]);
// 			return true;
// 		},
// 		//function for creeps' collisions
// 		collideHandler: function(response){
// 			//runs if creep collides with tower 
// 			if (response.b.type === 'EnemyBaseEntity') {
// 				//makes the creep attack
// 				this.attacking = true;
// 				//timer that says when last attacked
// 				//this.lastAttacking = this.now;
// 				//prevents the creep from walking through the tower
// 				this.body.vel.x = 0;
// 				//pushes the creep back a little to maintain its position
// 				this.pos.x = this.pos.x - 1;
// 				//Only allows the creep to hit the tower once every second
// 				if ((this.now - this.lastHit >= game.data.friendCreepAttack)) {
// 					//updates the lastHit timer
// 					this.lastHit = this.now;
// 					//runs the losehealth function, with 1 point damage
// 					response.b.loseHealth(game.data.friendCreepAttack);
// 				}
// 			}

// 			else if (response.b.type === 'EnemyHeroEntity') {
// 				//see where the player is compared to the creep
// 				var xdif = this.pos.x - response.b.pos.x;
// 				//makes the creep attack
// 				this.attacking = true;
// 				//timer that says when last attacked
// 				//this.lastAttacking = this.now;
				
// 				//only runs if the creep's face is right in front of the orc or under
// 				if (xdif < 0) {
// 					//prevents the creep from walking through the player
// 					this.body.vel.x = 0;
// 					//pushes the creep back a little to maintain its position
// 					this.pos.x = this.pos.x - 1;
// 				}
// 				//Only allows the creep to hit the tower once every second and if the player is not behind the creep
// 				if ((this.now - this.lastHit >= game.data.creepAttackTimer) && xdif > 0) {
// 					//updates the lastHit timer
// 					this.lastHit = this.now;
// 					//runs the losehealth function, with 1 point damage
// 					response.b.loseHealth(game.data.enemyCreepAttack);
// 				}
// 			}
// 			// else if (response.b.type === 'EnemyCreep') {
// 			// 	//see where the player is compared to the creep
// 			// 	var xdif = this.pos.x - response.b.pos.x;
// 			// 	//makes the creep attack
// 			// 	this.attacking = true;
// 			// 	//timer that says when last attacked
// 			// 	//this.lastAttacking = this.now;
				
// 			// 	//only runs if the creep's face is right in front of the orc or under
// 			// 	if (xdif > 0) {
// 			// 		//prevents the creep from walking through the player
// 			// 		this.body.vel.x = 0;
// 			// 		//pushes the creep back a little to maintain its position
// 			// 		this.pos.x = this.pos.x - 1;
// 			// 	}
// 			// 	//Only allows the creep to hit the tower once every second and if the player is not behind the creep
// 			// 	if ((this.now - this.lastHit >= game.data.friendCreepAttackTimer) && xdif > 0) {
// 			// 		//updates the lastHit timer
// 			// 		this.lastHit = this.now;
// 			// 		//runs the losehealth function, with 1 point damage
// 			// 		response.b.loseHealth(game.data.friendCreepAttack);
// 			// 	}
// 			// }
// 		}
	
// });


// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// //class that runs all the timers and occurences that aren't inside any of the other entities
// game.GameManager = Object.extend({
// 	//constructor function
// 	init: function(x, y, settings){
// 		//sets timer
// 		this.now = new Date().getTime();
// 		//keeps track of last time creep was made
// 		this.lastCreep = new Date().getTime();
// 		//says the game is not paused
// 		this.paused = game.data.paused;
// 		//keeps the function updating
// 		this.alwaysUpdate = true;
// 	},

// 	update: function(){
// 		//keeps track of timer
// 		this.now = new Date().getTime();
// 		//runs if player is dead
// 		if(game.data.player.dead){
// 			//takes the player off the screen
// 			me.game.world.removeChild(game.data.player);
// 			//runs the resetPlayer function
// 			me.state.current().resetPlayer(10, 0);

// 		}

// 		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 		//enemy hero hack
// 		if(game.data.enemyHero.dead){
// 			//takes the player off the screen
// 			me.game.world.removeChild(game.data.enemyHero);
// 			//runs the resetPlayer function
// 			me.state.current().resetPlayer(10, 0);

// 		}
// 		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 		//checks to make sure there is a multiple of ten. makes sure its been at least a second since last creep has been made
// 		if(Math.round(this.now/1000)%20 === 0 && (this.now - this.lastCreep >= 1000)){
// 			game.data.gold += 1;
// 			console.log("Current gold: " + game.data.gold);
// 		}

// 		//checks to make sure there is a multiple of ten. makes sure its been at least a second since last creep has been made
// 		if(Math.round(this.now/1000)%10 === 0 && (this.now - this.lastCreep >= 1000)){
// 			//updates timer
// 			this.lastCreep = this.now;
// 			//creates and inserts creeps into world
// 			var creepe = me.pool.pull("EnemyCreep", 1000, 0, {});
// 			var creepf = me.pool.pull("FriendCreep", 0, 0, {});
// 			//adds the creeps to the world
// 			me.game.world.addChild(creepe, 5);
// 			me.game.world.addChild(creepf, 5);
// 		} 
// 		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 		//pause hack
// 		// if (me.input.isKeyPressed("pause")) {
// 		// 	game.data.paused = true;
// 		// 	pausedGame();
// 		// }
// 		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
// 		//updates
// 		return true;
// 	}
// });