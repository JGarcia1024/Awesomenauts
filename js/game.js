
/* Game namespace */
var game = {

	// an object where to store game information
	data : {
		// score
		score : 0,
		paused: false,
		enemyBaseHealth : 1,
		playerBaseHealth: 1,
		enemyCreepHealth: 5,
		playerHealth: 10,
		friendCreepHealth: 5,
		enemyCreepAttack: 1,
		friendCreepAttack: 1,
		playerAttack: 1,
		playerAttackTimer: 1000,
		creepAttackTimer: 1000,
		playerMoveSpeed: 8,
		creepMoveSpeed: 5,
		gameTimeManager: "",
		HeroDeathManager: "",
		player: "",
		EnemyHero: "",
		pauseScreen: "",
		exp: 0,
		gold: 0,
		exp1: 0,
		exp2: 0,
		exp3: 0,
		exp4: 0,
		win: 0
	},
	
	
	// Run on page load.
	"onload" : function () {
	// Initialize the video.
	//sets the height and width of the screen
	if (!me.video.init("screen",  me.video.CANVAS, 1067, 600, true, '1.0')) {
		alert("Your browser does not support HTML5 canvas.");
		return;
	}

	// add "#debug" to the URL to enable the debug Panel
	if (document.location.hash === "#debug") {
		window.onReady(function () {
			me.plugin.register.defer(this, debugPanel, "debug");
		});
	}
	//creates a place to save these 5 variables
	me.save.add({exp: 0, exp1: 0, exp2: 0, exp3: 0, exp4: 0});

	console.log(game.data.exp);
	console.log(game.data.exp2);

	me.state.SPENDEXP = 112;
	me.state.SPENDEXP = 113;

	// Initialize the audio.
	me.audio.init("mp3,ogg");

	// Set a callback to run when loading is complete.
	me.loader.onload = this.loaded.bind(this);

	// Load the resources.
	me.loader.preload(game.resources);

	// Initialize melonJS and display a loading screen.
	me.state.change(me.state.LOADING);
},

	// Run on game resources loaded.
	"loaded" : function () {
		//adds player to pool
		me.pool.register("player", game.PlayerEntity, true);
		//adds player base to pool
		me.pool.register("PlayerBase", game.PlayerBaseEntity);
		//adds enemy hero base to pool
		me.pool.register("EnemyHero", game.EnemyHeroEntity, true);
		//adds enemy base to pool
		me.pool.register("EnemyBase", game.EnemyBaseEntity);
		//adds enemy creep to pool
		me.pool.register("EnemyCreep", game.EnemyCreep, true);
		//adds friend creep to pool
		me.pool.register("FriendCreep", game.FriendCreep, true);
		//registers GameTimeManager
		me.pool.register("GameTimeManager", game.GameTimeManager);
		//registers Manager
		me.pool.register("HeroDeathManager", game.HeroDeathManager);
		//registers GameTimeManager
		me.pool.register("ExperienceManager", game.ExperienceManager);		

		me.state.set(me.state.MENU, new game.TitleScreen());
		me.state.set(me.state.PLAY, new game.PlayScreen());
		//creates exp screen
		me.state.set(me.state.SPENDEXP, new game.SpendExp());
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//pause hack
		//me.state.set(me.state.PAUSE, new game.PauseScreen());
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	

		// Start the game with the title screen
		me.state.change(me.state.MENU);
	}
};
