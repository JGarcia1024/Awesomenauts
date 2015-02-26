
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
		this.health = game.data.enemyCreepHealth;
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
		//registers creep health
	loseHealth: function(damage){
		this.health = this.health - damage;
	},
		//shows health
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
				response.b.loseHealth(game.data.enemyCreepAttack);
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
