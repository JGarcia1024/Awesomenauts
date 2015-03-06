game.GameTimerManager = Object.extend({
	init: function(x, y, settings){
		this.now = new Date().getTime();
		this.lastCreep = new Date().getTime();
		this.paused = false;
		this.alwaysUpdate = true;
	},

	update: function(){
		this.now = new Date().getTime();
		this.goldTimerCheck();
		this.creepTimerCheck();

		return true;
	},

	goldTimerCheck: function(){
		//stores gold
		if(Math.round(this.now/1000)%20 ===0 && (this.now - this.lastCreep >= 1000)){
			game.data.gold += 1;
			console.log("Current gold: " + game.data.gold);
		}
	},

	creepTimerCheck: function(){
			//stuff
		if(Math.round(this.now/1000)%10 ===0 && (this.now - this.lastCreep >= 1000)){
			this.lastCreep = this.now;
			var creep = me.pool.pull("EnemyCreep", 1000, 0, {});
			me.game.world.addChild(creep, 5);
		}	
	},
});


game.HeroDeathManager = Object.extend({
	init: function(x, y, settings){
		this.alwaysUpdate = true;
	}, 
		update: function(){
		//respawns player after dying and makes the previous player dissapear
		if(game.data.player.dead){
			me.game.world.removeChild(game.data.player);
			me.state.current().resetPlayer(10, 0);
		}

		return true;
	}
});
	//new function for gaining experience
game.ExperienceManager = Object.extend({
	init: function(x, y, settings){
		this.alwaysUpdate = true;
		this.gameOver = false;
	},

	update: function(){
	//checks to see if you won the game or not to givev you bonus xp
		if(game.data.win === true && !this.gameOver){
			this.gameOver(true);
		}else if(game.data.win === false && this.gameOver){
			this.gameOver(false);
		}
		console.log(game.data.exp);
		return true;
	},
	//makes an exp function
	gameOver: function(win){
		if(win){
	//sets exp when game is over and won
			game.data.exp += 10;
		}else{
	//sets exp when game is over and lost
			game.data.exp += 1;
		}
		//creates gameover screen when you destroy enemy base
		this.gameOver = true;
		//saves exp
		me.save.exp = game.data.exp;
	}
});