// since it is a class both letter are capitilized
// player class. Shows the image that the player is, the height and width
//also the shape of it
game.PlayerEntity = me.Entity.extend({
	init: function(x, y, settings) {
		//leads to set super fuction below
		//use these fucntions to orgainize code
		this.setSuper(x, y);
		//leads to set player timer function
		this.setPlayerTimers();
		//leads to the function attribute
		this.setAttributes();
		//sets type so that creep can collide with it
		this.type = "PlayerEntity";
		//leads to set flags function
		this.setFlags();
		
		//where ever the player goes the screen follows
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
		
		//leads to add animation fucntion below
		//used to organize code
		this.addAnimation();

		//sets currect animation
		this.renderable.setCurrentAnimation("idle");

		
	},

	//function sets up the super class
	setSuper: function (x, y){
		this._super(me.Entity, 'init', [x, y, {
			image: "player", 
			width: 64,
			height: 64,
			spritewidth: "64",
			spriteheight: "64",
			getShape: function(){
				return(new me.Rect(0, 0, 100, 70)).toPolygon();
			} 
			}]);
	},

//takes all the code from other parts and puts it in a function to make it more organized
//timers set
	setPlayerTimers: function(){
		//keeps track of what time it is for the game
		this.now = new Date().getTime();
		//lets the character hit the other characters over and over again
		this.lastHit = this.now;
		this.lastAttack = new Date().getTime();
	},

	//set attributes function
	//leads up to line 11
	setAttributes: function(){
		//sets players health
		//uses the global variable that helps the player loose health
		//variable located in game.js
		this.heatlth = game.data.playerHealth;
		//sets the speed of the character
		this.body.setVelocity(game.data.playerMoveSpeed, 20);
		//a gold is added when the creep dies from attack
		this.attack = game.data.playerAttack;
	},
	//used to organize our code
	//leads to line of code above
	setFlags: function(){
		//keeps track of what direction your character is going
		this.facing = "right";
		//players death function
		//what happens if the player dies
		this.dead = false;
		//linked to update class or attacking fuctnion
		//used to orgainze code
		this.attacking = false;
	},
	//leads to add animation line of code above
	//used to orgainze code
	addAnimation: function(){
		//this anmiantion is used for when we are just standing
		this.renderable.addAnimation("idle", [78]);
		//adds animation to orcs/ characters walk
		// 80 at the end is the speed of the walk
		// the numbers in the brackets are the different pics we are using for the animation
		this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
		//adds animation to the action attack
		this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
	},

	update: function(delta){
		//updates this.now
		this.now = new Date().getTime();
		//checks to see if our player has or had not died
		//leads to function below
		//used to organize code
		this.dead = this.checkIfDead();
		//leads to fucntion below
		//organizes code
		this.checkKeyPressesAndMove ();
		//organizes our code
		this.setAnimation();
		//checks for collisions
		me.collision.check(this, true, this.collideHandler.bind(this), true);

		// tells the code above to work
		this.body.update(delta);
		
		//another call to the parent class
		this._super(me.Entity, "update", [delta]);
		return true;
	},

	//fucntion leads up to line of code
	//organizes our code
	checkIfDead: function(){
		//makes the player die
		if (this.health <= 0){
			return true;
		}
		return false;
	},
	//organizes my code
	//leads up to code under update fucntion
	checkKeyPressesAndMove: function(){
		//checks and sees if the right key is pressed
		if(me.input.isKeyPressed("right")){
			//function below
			//organizes code
			this.moveRight();
			//if we press the wrong button then the else statement will go into effect
			// if statement binds the left key so that we can move left
		}else if(me.input.isKeyPressed("left")){
			//linked to fucntion below
			//organizes code
			this.moveLeft();
			}else{
			this.body.vel.x = 0;
		}
		//not in else statement because jumping involves the y axis not the x
		// binds the space bar so that we can jump
		if(me.input.isKeyPressed("jump") && !this.body.jumping && !this.body.falling){
			//linked to code below
			//organizes code
			this.jump();
		}
		//attack function
		//orgainzes update function
		this.attacking = me.input.isKeyPressed("attack");
	},

	//organizes code
	//linked to pressandmove fucntion
	moveRight: function(){
		    // adds the position of my x by adding the velocity defined above in
			// setVelocity() and multiplying it by me.timer.tick
			// me.timer.tick makes the movement look smooth
			this.body.vel.x += this.body.accel.x * me.timer.tick;
			//checks what way your character is going
			this.facing = "right";
			//flips the character so he doesnt go backwards
			this.flipX(true);
	},
 	//organizes code
	//linked to pressandmove fucntion
 	moveLeft: function(){
 		this.facing = "left";
			this.body.vel.x -=this.body.accel.x * me.timer.tick;
			this.flipX(false);
 	},
     //organizes code
	//linked to pressandmove fucntion
 	jump: function(){
 		this.body.jumping = true;
			this.body.vel.y -= this.body.accel.y * me.timer.tick;
			me.audio.play("stomp");

 	},
 	//linked to attack fucntion in update class
 	setAnimation: function(){
 		//if attack key is pressed character will attack
		//linked to checkKeyPressesandMove fucntion to organize code
		if(this.attacking){
			//checks if it has gone through its animation stage
			if(!this.renderable.isCurrentAnimation("attack")){
				//sets the current animation to attackand once that is over
				// goes back to the idle animation
				this.renderable.setCurrentAnimation("attack", "idle");
				//makes it so that the next time we start this sequence we begin
				// from the the first animation, not wherever we left off when we
				// switched to another animation
				//this.renderable.setCurrentAnimationFrame();
				me.audio.play("jump");
			}
		}
		//checks if character is moving
		//checks that we dont have an attack animation going on
		else if(this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")){
		//if statement checks to see whats going on with the character
		if(!this.renderable.isCurrentAnimation("walk")){
			this.renderable.setCurrentAnimation("walk");
		}
	}//else statement fixes the error of the character walking backwards
	else if(!this.renderable.isCurrentAnimation("attack")){
		this.renderable.setCurrentAnimation("idle");
	}

 	},

	loseHealth: function(damage){
		//player loses health
		this.health = this.health - damage;
		//prints out what our health is
		console.log(this.health);


	},


	// tells us if we collide with the enemy base
	collideHandler: function(response){
		if(response.b.type==='EnemyBaseEntity'){
			//organizes the code
			this.collideWithEnemyBase(response);
			//makes the creep loose health
		}else if(response.b.type==='EnemyCreep'){
			//orgainzes the code
			this.collideWithEnemyCreep(response);
		}
	},

	collideWithEnemyBase:function(response){
		    var ydif = this.pos.y - response.b.pos.y;
			var xdif = this.pos.x - response.b.pos.x;
 			
 			//checks to see when character collides with enemy base
			console.log("xdif " + xdif + "ydif " + ydif);

			//jumping through the top of the enemy base
			if(ydif<-40 && xdif< 70 && xdif>-35){
				this.body.falling = false;
				this.body.vel.y = -1;
			}
			//the the player goes more than the number placed then it will stop moving
			//facing code allows us to move away from the base
			// xdif makes sure that both if statements wont trigger
			else if(xdif>-35 && this.facing==='right' && (xdif<0)){
				//stops player from moving if they hit the base
				this.body.vel.x = 0;
				// moves player back a bit
				////this.pos.x = this.pos.x - 1;
				//else if statement is used if the character is facing left
			}else if(xdif<70 && this.facing==='left' && xdif>0){
				this.body.vel.x = 0;
				////this.pos.x = this.pos.x +1;
			}
			//checks if the current animation is attack
			//uses the global variable that helps the player loose health
		    //variable located in game.js
			if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer){
				//cosole.log("tower Hit");
				this.lastHit = this.now;
				//character dies/looses health when the player attacks the creep more than a certain number of attacks
				response.b.loseHealth(game.data.playerAttack);
			}
	},
	collideWithEnemyCreep:function(response){
		    //lets you loose health if you are facing the x axis
			var xdif = this.pos.x - response.b.pos.x;
			//lets you loose health if you are facing the y axis
			var ydif = this.pos.y - response.b.pos.y;
			//orgainizes code
			this.stopMovement(xdif);
			//linked to check attack fucntion
			if(this.checkAttack(xdif, ydif)){
				this.hitCreep(response);
			};
			
	},
	stopMovement: function(xdif){
		//loose health if character comes in form the right or left
			//makes it so that we cant walk right into the base
			if (xdif>0){
				////this.pos.x = this.pos.x + 1;
				//keeps track of what way we are facing
				if(this.facing==="left"){
					this.body.vel.x = 0;
				}
			}else{
				this.pos.x = this.pos.x - 1;
				//keeps track of what way we are facing
				if(this.facing==="right"){
					this.body.vel.x = 0;
				}
			}
	},
	checkAttack: function(xdif, ydif){
		//uses the global variable that helps the player loose health
			//variable located in game.js
			if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer
				//checks the absolute value of the y and x difference
				&& (Math.abs(ydif) <=40) && 
				(((xdif>0) && this.facing==="left") || ((xdif<0) && this.facing==="right"))
				){
				//updates the timers
				this.lastHit = this.now;
				return true;
			}
			//if the attack check is false it will return false
			return false;
	},
	hitCreep: function  (response) {
		//linked to the line of code above 
				//if the creepe health is less than our attack, execute code in if statement
				if(response.b.health <= game.data.playerAttack){
					//adds one gold for a creep kill
					game.data.gold += 1;
					console.log("Current gold: " + game.data.gold);
				}
				//the player dies or looses health if it is attacking for too long
				//timer
				response.b.loseHealth(game.data.playerAttack);
	}
});
