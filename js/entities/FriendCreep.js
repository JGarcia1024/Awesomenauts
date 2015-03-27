//friend creep hack one
game.FriendCreep = me.Entity.extend({
	init: function(x, y, settings){
			//reaches the constructor function for enitity
			this._super(me.Entity, 'init', [x, y, {
				//settings. shows the creep
				image: "creep2",
				//sets aside a width of 64 pixels for the sprite
				width: 100,
				//sets aside a height of 64 pixels for the sprite
				height: 85,
				//gives the sprite a width of 64. 
				spritewidth : "100",
				//gives the sprite a width of 64
				spriteheight: "85",
				//gives creep a form
				getShape: function(){
					return(new me.Rect(0, 0, 100, 85)).toPolygon();
				}
			}]);
			//sets health to ten
			this.health = game.data.friendCreepHealth;
			//makes the creep's satus continuosly update
			this.alwaysUpdate = true;
			//says the creep is not attacking
			this.attacking = false;
			//records last time creep attacked anything
			this.lastAttacking = new Date().getTime();
			//records last time creep hit anything
			this.lastHit = new Date().getTime();
			//timer for attacking
			this.now = new Date().getTime();
			//sets the creep's horizantal and vertical speed
			this.body.setVelocity(3, 20);
			//sets the sprite's type
			this.type = "FriendCreep";
			//creates the walking animation
			this.renderable.addAnimation("walk", [0, 1, 2, 3, 4], 100);
			//applies the walking animation
			this.renderable.setCurrentAnimation("walk");
		},

		//subtracts health from friend creep
		loseHealth: function(damage) {
			this.health = this.health - damage;
		},

		//delta is the change in time that's happening
		update: function(delta){
			//updates attack
			this.now = new Date().getTime();
			//makes the creep move
			this.body.vel.x += this.body.accel.x *  me.timer.tick;
			this.flipX(true);
			//checks for collisions with player
			me.collision.check(this, true, this.collideHandler.bind(this), true);
			//basic update functions
			this.body.update(delta);
			this._super(me.Entity, "update", [delta]);
			return true;
		},

		//function for creeps' collisions
		collideHandler: function(response){
			//runs if creep collides with tower 
			if (response.b.type === 'EnemyBaseEntity') {
				//makes the creep attack
				this.attacking = true;
				//timer that says when last attacked
				//this.lastAttacking = this.now;
				//prevents the creep from walking through the tower
				this.body.vel.x = 0;
				//pushes the creep back a little to maintain its position
				this.pos.x = this.pos.x - 1;
				//Only allows the creep to hit the tower once every second
				if ((this.now - this.lastHit >= game.data.creepAttackTimer)) {
					//updates the lastHit timer
					this.lastHit = this.now;
					//runs the losehealth function, with 1 point damage
					response.b.loseHealth(game.data.friendCreepAttack);
				}
			}

			else if (response.b.type === 'EnemyHeroEntity') {
				//see where the player is compared to the creep
				var xdif = this.pos.x - response.b.pos.x;
				//makes the creep attack
				this.attacking = true;
				//timer that says when last attacked
				//this.lastAttacking = this.now;
				
				//only runs if the creep's face is right in front of the orc or under
				if (xdif < 0) {
					//prevents the creep from walking through the player
					this.body.vel.x = 0;
					//pushes the creep back a little to maintain its position
					this.pos.x = this.pos.x - 1;
				}
				//Only allows the creep to hit the tower once every second and if the player is not behind the creep
				if ((this.now - this.lastHit >= game.data.creepAttackTimer) && xdif > 0) {
					//updates the lastHit timer
					this.lastHit = this.now;
					//runs the losehealth function, with 1 point damage
					response.b.loseHealth(game.data.friendCreepAttack);
				}
			}

			else if (response.b.type === 'EnemyHeroEntity') {
				//see where the player is compared to the creep
				var xdif = this.pos.x - response.b.pos.x;
				//makes the creep attack
				this.attacking = true;
				//only runs if the creep's face is right in front of the orc or under
				if (xdif > 0) {
					//prevents the creep from walking through the player
					this.body.vel.x = 0;
					//pushes the creep back a little to maintain its position
					this.pos.x = this.pos.x - 1;
				}
				//Only allows the creep to hit the tower once every second and if the player is not behind the creep
				if ((this.now - this.lastHit >= game.data.creepAttackTimer) && xdif > 0) {
					//updates the lastHit timer
					this.lastHit = this.now;
					//runs the losehealth function, with 1 point damage
					response.b.loseHealth(game.data.enemyCreepAttack);
				}
			}


			// else if (response.b.type === 'EnemyCreep') {
			// 	//see where the player is compared to the creep
			// 	var xdif = this.pos.x - response.b.pos.x;
			// 	//makes the creep attack
			// 	this.attacking = true;
			// 	//timer that says when last attacked
			// 	//this.lastAttacking = this.now;
				
			// 	//only runs if the creep's face is right in front of the orc or under
			// 	if (xdif > 0) {
			// 		//prevents the creep from walking through the player
			// 		this.body.vel.x = 0;
			// 		//pushes the creep back a little to maintain its position
			// 		this.pos.x = this.pos.x - 1;
			// 	}
			// 	//Only allows the creep to hit the tower once every second and if the player is not behind the creep
			// 	if ((this.now - this.lastHit >= game.data.friendCreepAttackTimer) && xdif > 0) {
			// 		//updates the lastHit timer
			// 		this.lastHit = this.now;
			// 		//runs the losehealth function, with 1 point damage
			// 		response.b.loseHealth(game.data.friendCreepAttack);
			// 	}
			// }
		}
	
});