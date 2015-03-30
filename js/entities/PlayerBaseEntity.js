//loads the player base from melon js
game.PlayerBaseEntity = me.Entity.extend({
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
		//uses the global variable that helps the player base loose health
		//variable located in game.js
		this.health = game.data.playerBaseHealth;
		//even if we cannot see the screen it will still update
		this.alwaysUpdate = true;
		//if someone runs into the tower it will be able to collide
		this.body.onCollision = this.onCollision.bind(this);

		//type that can be used later during other collisons
		this.type = "PlayerBase";
		//adds animation to the tower
		this.renderable.addAnimation("idle", [0]);
		this.renderable.addAnimation("broken", [1]);
		this.renderable.setCurrentAnimation("idle");
	},

	update:function(delta){
		// tells us to die if health is less than zero
		if(this.health<=0){
			this.broken = true;
			//if the player is dead he will not win
			game.data.win = false;
			this.renderable.setCurrentAnimation("broken");
		}
		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);
		return true;
	},

	//function for loosing health when attacking
	loseHealth: function(damage){
		this.health = this.health - damage;

	},

	onCollision: function(){

	}

});