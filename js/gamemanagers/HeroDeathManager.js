//manages the players death
//oragnizes the code
game.HeroDeathManager = Object.extend({
	init: function(x, y, settings){
		this.alwaysUpdate = true;

	},

	update: function(){
		//dead function in game manager
		if(game.data.player.dead){
			me.game.world.removeChild(game.data.player);
			me.game.world.removeChild(game.data.miniPlayer);
			me.state.current().resetPlayer(10, 0);
		}
		return true;
	}
});