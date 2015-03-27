game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		// reset the score
		game.data.score = 0;


		//loads level
		me.levelDirector.loadLevel("level01");
		console.log(game.data.exp);
		console.log(game.data.exp2);
		//calls the resetPlayer function with the parameters 0 and 420
		this.resetPlayer(0, 420);
		//calls the resetPlayer function with the parameters 0 and 420
		this.resetEnemy(900, 420);
		//adds gamemanager to world
		var heroDeathManager = me.pool.pull("HeroDeathManager", 0 , 0, {});
		//puts gamemanager into world
		me.game.world.addChild(heroDeathManager, 0);

		//adds gamemanager to world
		var gameTimeManager = me.pool.pull("GameTimeManager", 0 , 0, {});
		//puts gamemanager into world
		me.game.world.addChild(gameTimeManager, 0);

		//adds gamemanager to world
		var ExperienceManager = me.pool.pull("ExperienceManager", 0 , 0, {});
		//puts gamemanager into world
		me.game.world.addChild(ExperienceManager, 0);
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//enemy hero hack

		//makes the D key into a variable
		me.input.bindKey(me.input.KEY.D, "right");
		//makes the A key into a variable
		me.input.bindKey(me.input.KEY.A, "left");
		//makes the W key into a variable
		me.input.bindKey(me.input.KEY.W, "jump");
		//makes an attack key
		me.input.bindKey(me.input.KEY.C, "attack");
		//Makes the right key into a variable
		me.input.bindKey(me.input.KEY.RIGHT, "rights");
		//makes the right key into a variable
		me.input.bindKey(me.input.KEY.LEFT, "lefts");
		//makes the up key into a variable
		me.input.bindKey(me.input.KEY.UP, "jumps");
		//makes space an attack key
		me.input.bindKey(me.input.KEY.SPACE, "attacks");

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//pause button hack
		//makes space an attack key
		me.input.bindKey(me.input.KEY.P, "pause");

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
	},

	//adds player to map
	resetPlayer: function(x, y){
		//pulls the player entity from the pool
		game.data.player = me.pool.pull("player", x, y, {});
		//adds him to the game and sets his layer-level
		me.game.world.addChild(game.data.player, 5);
	},

	resetEnemy: function(x, y){
		//pulls the player entity from the pool
		game.data.enemyHero = me.pool.pull("enemyHero", x, y, {});
		//adds him to the game and sets his layer-level
		me.game.world.addChild(game.data.enemyHero, 5);
	},
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//pause hack
	// pausedGame: function(){
	// 	if (game.data.paused === true) {
	// 		me.state.change(me.state.PAUSE);
	// 	}
	// }
	//pauseGame: function(){
		// this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge){
		// 		//runs if enter button is pressed
		// 		if (action === "pause") {
		// 			//goes to play screen
		// 			me.state.change(me.state.PAUSE);
		// 		}
		// });
		//me.state.change(me.state.PAUSE);
	//}
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
});
