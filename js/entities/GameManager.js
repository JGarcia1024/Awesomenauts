//class that runs all the timers and occurences that aren't inside any of the other entities
game.GameTimeManager = Object.extend({
	//constructor function
	init: function(x, y, settings){
		//sets timer
		this.now = new Date().getTime();
		//keeps track of last time creep was made
		this.lastCreep = new Date().getTime();
		//says the game is not paused
		this.paused = game.data.paused;
		//keeps the function updating
		this.alwaysUpdate = true;
	},

	update: function(){
		//keeps track of timer
		this.now = new Date().getTime();
		
		this.goldTimerCheck();
		this.creepTimerCheck();

		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//enemy hero hack
		if(game.data.enemyHero.dead){
			//takes the player off the screen
			me.game.world.removeChild(game.data.enemyHero);
			//runs the resetPlayer function
			me.state.current().resetPlayer(10, 0);

		}
		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//pause hack
		// if (me.input.isKeyPressed("pause")) {
		// 	this.pauseGame();
		// }
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
		//updates
		return true;
	},

	goldTimerCheck: function(){
		//checks to make sure there is a multiple of ten. makes sure its been at least a second since last creep has been made
		if(Math.round(this.now/1000)%20 === 0 && (this.now - this.lastCreep >= 1000)){
			game.data.gold += 1;
			console.log("Current gold: " + game.data.gold);
		}
	},

	creepTimerCheck: function(){
		//checks to make sure there is a multiple of ten. makes sure its been at least a second since last creep has been made
		if(Math.round(this.now/1000)%10 === 0 && (this.now - this.lastCreep >= 1000)){
			//updates timer
			this.lastCreep = this.now;
			//creates and inserts creeps into world
			var creepe = me.pool.pull("EnemyCreep", 1000, 0, {});
			var creepf = me.pool.pull("FriendCreep", 0, 0, {});
			//adds the creeps to the world
			me.game.world.addChild(creepe, 5);
			me.game.world.addChild(creepf, 5);
		} 
	}
});


game.HeroDeathManager = Object.extend({
	init: function(x, y, settings){
		this.alwaysUpdate = true;
	},

	update: function(){
		//runs if player is dead
		if(game.data.player.dead){
			//takes the player off the screen
			me.game.world.removeChild(game.data.player);
			//runs the resetPlayer function
			me.state.current().resetPlayer(10, 0);

		}

		return true;
	}
});

game.ExperienceManager = Object.extend({
	init: function(x, y, settings){
		this.alwaysUpdate = true;
		this.gameover = false;
	},

	update: function(){
		if (game.data.win === true && !this.gameover) {
			this.gameOver(true);
		}
		else if (game.data.win === false && !this.gameover) {
			this.gameOver(false);
		}
		return true;
	},

	gameOver: function(win){
		if (win) {
			//adds 10 the the exp variable
			game.data.exp += 10;
		}
		else{
			//adds 1 the the exp variable
			game.data.exp += 1;
		}
		console.log(game.data.exp);
		console.log(game.data.exp2);
		//says game's over
		this.gameover = true;
		//saves the value of the exp variable
		me.save.exp = game.data.exp;
		me.save.exp2 = 4;
	}
});