//loads the player base from melon js
game.EnemyBaseEntity = me.Entity.extend({
	init : function(x, y, settings){
		this._super(me.Entity, 'init', [x, y, {
			image: "tower",
			width: 100,
			height: 100,
			spritewidth: "100",
			spriteheight: "100",
			getShape: function(){
				return (new me.Rect(0, 0, 100, 70)).toPolygon();
			}
		}]);
		
		//tells us the tower has not been destroyed
		this.broken = false;
		//gives the tower a health
		//uses the global variable that helps the base loose health in game.js
		this.health = game.data.enemyBaseHealth;
		//even if we cannot see the screen it will still update
		this.alwaysUpdate = true;
		//if someone runs into the tower it will be able to collide
		this.body.onCollision = this.onCollision.bind(this);

		//type that can be used later during other collisons
		this.type = "EnemyBaseEntity";

		//renderable used to set animaton
		//sets the animation to the enemy base
		this.renderable.addAnimation("idle", [0]);
		this.renderable.addAnimation("broken", [1]);
		this.renderable.setCurrentAnimation("idle");
	},

	update:function(delta){
		// tells us to die if health is less than zeron
		if(this.health<=0){
			this.broken = true;
			//if the enemy dies he will not win
			game.data.win = true;
			this.renderable.setCurrentAnimation("broken");
		}
		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);
		return true;
	},

	onCollision: function(){
		
	},

	loseHealth: function(){
		//losses health
		this.health--;
	}

});
// line 85- 91 makes the player move while walking
