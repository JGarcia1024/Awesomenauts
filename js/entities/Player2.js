game.Player2 = me.Entity.extend({
	init: function(x, y, settings){
		this._super(me.Entity, 'init', [x, y, {
			//loads our image creep 1 from our resources folder
			image: "Player2",
			width: 100,
			height: 85,
			spritewidth: "100",
			spriteheight: "85",
			getShape: function(){
				return (new me.Rect(0, 0, 52, 100)).toPolygon();
			}
		}]);
		this.health = 10;
		this.alwaysUpdate = true;
		//this.attacking lets us know if the enemy is currently attacking
		this.attacking = false;
		//keeps track of when our creep last attacked anything
		this.lastAttacking = new Date().getTime();
		// keeps track of last thing our creep hit anything
		this.lastHit = new Date().getTime();
		this.now = new Date().getTime();
		//sets veloctiy
		this.body.setVelocity(3, 20);

		this.type = "Player2";

		//sets animation/ how fast it walks
		this.renderable.addAnimation("walk", [3, 4, 5], 80);
		//sets the current animation of the character
		this.renderable.setCurrentAnimation("walk");
	},

	update: function(delta){
		this.now = new Date().getTime();
		//has player accelerate
		this.body.vel.x += this.body.accel.x * me.timer.tick;
		this.flipX(true);
		//checks for collisions with our player
		//if there are collisions it passes it to collide handler
		//me.collision.check(this, true, this.collideHandler.bind(this), true);

		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);

		return true;

	},

	//handels collisons with the player
	//any lines of code that deal with the collisions above get sent down here and passed through
	collideHandler: function(response) {
		//some simple code to start it off
		//shows what we are colliding with
		if(response.b.type === 'EnemyBaseEntity') {
			//tells if we are attacking
			this.attacking = true;
			//timer that tells the last time the player attacked
			//this.lastAttacking=this.now;
			//sets velocity to zero
			this.body.vel.x = 0;
			//if we get to close to the base we will stop
			//keeps moving the creep to the right to maintain its position
			this.pos.x = this.pos.x + 1;
			//checks that it has been at least one second since this creep has hit a base
			//checks another timer
			//lets you attack again if you had attacked the last second
			if((this.now-this.lastHit >= 1000)){
				//updates the last hit timer
				this.lastHit = this.now;
				//makes the player base call its loose health function and passes it at a
				//damage of 1
				//a function that causes the player to loose some health
				response.b.loseHealth(1);
			}
		}//what happens if we hit the player base
		else if (response.b.type=== 'EnemyCreep'){
			//tells if we are attacking
			this.attacking = true;
			//timer that tells the last time the player attacked
			this.lastAttacking=this.now;
			//sets velocity to zero
			this.body.vel.x = 0;
			//if we get to close to the base we will stop
			//keeps moving the creep to the right to maintain its position
			this.pos.x = this.pos.x + 1;
			//checks that it has been at least one second since this creep has hit something
			//checks another timer
			//lets you attack again if you had attacked the last second
			if((this.now-this.lastHit >= 1000)){
				//updates the last hit timer
				this.lastHit = this.now;
				//makes the player call its loose health function and passes it at a
				//damage of 1
				//a function that causes the player to loose some health
				//response.b.loseHealth(1);
			}
		}
	}
});