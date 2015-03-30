//removes the player and resets him if he dies
//adds gold
//manages creeps
game.GameTimerManager = Object.extend({
	init: function(x, y, settings){
		this.now = new Date().getTime();
		this.lastCreep = new Date().getTime();
		//creepe cannot pause at all
		this.paused = false;
		this.alwaysUpdate = true;
	},

	update: function(){
		this.now = new Date().getTime();
		this.goldTimerCheck();
		this.creepTimerCheck();

		return true;
	},
	//organizes code above
	goldTimerCheck: function(){
		//controls when the creep spons
		if(Math.round(this.now/1000)%20 ===0 && (this.now - this.lastCreep >= 1000)){
			game.data.gold += (game.data.exp1+1);
			console.log("Current gold: " + game.data.gold);

		}
	},
	creepTimerCheck: function(){
		//controls when the creep spons
		if(Math.round(this.now/1000)%10 ===0 && (this.now - this.lastCreep >= 1000)){
			//controls when the creep spons
			this.lastCreep = this.now;
			//bulids a creep and puts it into the world
			var creepe = me.pool.pull("EnemyCreep", 1000, 0, {});
			me.game.world.addChild(creepe, 5);

			//var creepe1 = me.pool.pull("Player2", 1000, 0, {});
			//me.game.world.addChild(creepe, 5);

		}
	}
});

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
			me.state.current().resetPlayer(10, 0);
		}
		return true;
	}
});

//gains the player expeience if they win 
game.ExperienceManager = Object.extend({
	init: function (x, y, settings) {
		this.alwaysUpdate = true;
		this.gameover = false;
	},

	update: function(){
		if(game.data.win === true && !this.gameover){
			//the game is over when the player dies
			this.gameOver(true);
		}else if(game.data.win === false && !this.gameover){
			this.gameOver(false);
			//this.gameOver = true;
			//saves current game variable
			//me.save.exp = game.data.exp;
		}
		console.log(game.data.exp);


		return true;
	},
	//organizes update function
	//game over function
	gameOver: function(win){
		if(win){
			game.data.exp += 10;
		}else{
			game.data.exp += 1;
		}
		    console.log(game.data.exp);
			this.gameover = true;
			//saves the 5 exp variables in game.js
			me.save.exp = game.data.exp;
			
			
	}
});

game.SpendGold = Object.extend({
	init: function (x, y, settings){
		this.now = new Date().getTime();
		this.lastBuy = new Date().getTime();
		//creepe cannot pause at all
		this.paused = false;
		this.alwaysUpdate = true;
	},

	update: function(){
		return true;
	}


});

