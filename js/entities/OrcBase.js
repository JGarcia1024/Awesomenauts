game.PlayerBaseEntity = me.Entity.extend({
	init: function(x, y, settings){
		//reachers the constructor function for tower
		this._super(me.Entity, 'init', [x, y, {
			//settings. shoes the tower
			image: "tower",
			//sets aside a width of 100 pixels for the tower
			width: 100,
			//sets aside a height of 100 pixels for the tower
			height: 100,
			//gives the tower a width of 100. 
			spritewidth : "100",
			//gives the tower a width of 100
			spriteheight: "100",
			getShape: function(){
				//returns a rectangle of what the tower walks into
				return(new me.Rect(0, 0, 100, 60)).toPolygon();
			}
		}]);
		//says that tower hasn't been destroyed
		this.broken = false;
		//gives tower a "health" of ten
		this.health = game.data.playerBaseHealth;
		//makes sure the tower's status is always updating, eben when it isn't on the map
		this.alwaysUpdate = true;
		//makes teh tower collidable
		this.body.onCollision = this.onCollision.bind(this);
		//checks what player is running into
		this.type = "PlayerBase";
		//adds the defualt animatin for the game
		this.renderable.addAnimation("idle", [0]);
		//adds the animation for when the tower is broken
		this.renderable.addAnimation("broken", [1]);
		//sets the desfault animation
		this.renderable.setCurrentAnimation("idle");
	},	

	update:function(delta){
		//runs if health is less than or equal to 0
		if(this.health <= 0){
			//makes the tower "broken"
			this.broken = true;
			//if player base breaks player loses
			game.data.win = false;
			//sets animation for "broken"
			this.renderable.setCurrentAnimation("broken");
		} 
		//updates tower status
		this.body.update(delta);
		//updates
		this._super(me.Entity, "update", [delta]);
		return true;
	},

	//runs whenever called on
	loseHealth: function(damage){
		//subtracts set damage amount from health everytime ran
		this.health = this.health - damage;
	},

	//function that runs when base is touched
	onCollision: function(){

	}
});

