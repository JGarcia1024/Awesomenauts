game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		// reset the score
		game.data.score = 0;

		// loads level 1 in play.js so that it will show up on your screen
		me.levelDirector.loadLevel("level01");

		//linked to reset player
		//resets the player when it dies
		this.resetPlayer(0, 420);

		//loads the plyer so that it will show up when you run it
		var player = me.pool.pull("player", 0, 420, {});
		//adds player into the world
		me.game.world.addChild(player, 0);
		

		//generates game mangaer in play.js
		var gameTimerManager = me.pool.pull("GameTimerManager", 0, 0, {});
		//adds game manager into the game/world
		me.game.world.addChild(gameTimerManager, 0);

		//generates hero death manager in play.js
		var heroDeathManager = me.pool.pull("HeroDeathManager", 0, 0, {});
		//adds hero death manager into the game/world
		me.game.world.addChild(heroDeathManager, 0);

		//var ExperienceManager = me.pool.pull("ExperienceManager", 0, 0, {});
		//adds expierence manager into the game/world
		//me.game.world.addChild(ExperienceManager, 0);

		var spendGold = me.pool.pull("SpendGold", 0, 0, {});
		//adds expierence manager into the game/world
		me.game.world.addChild(spendGold, 0);

		me.input.bindKey(me.input.KEY.B, "buy");
		me.input.bindKey(me.input.KEY.Q, "skill1");
		me.input.bindKey(me.input.KEY.W, "skill2");
		me.input.bindKey(me.input.KEY.E, "skill3");
		me.input.bindKey(me.input.KEY.RIGHT, "right");
		//binds the left key for movement
		me.input.bindKey(me.input.KEY.LEFT, "left");
		// binds the space bar for jumping
		me.input.bindKey(me.input.KEY.SPACE, "jump");
		//binds the attack key for attack
		me.input.bindKey(me.input.KEY.A, "attack");
		



		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
		//plays background music
		me.audio.playTrack("Zelda Main Theme Song");
		
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
	},
	//resets the player
	//global varible in game used
	resetPlayer: function(x, y){
		game.data.player = me.pool.pull("player", x, y, {});
		// adds player to the world
		me.game.world.addChild(game.data.player, 5);
	}
});
