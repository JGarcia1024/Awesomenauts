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
		this.updateWhenPaused = true;
		this.buying = false;
	},

	update: function(){
		this.now = new Date().getTime();

		if(me.input.isKeyPressed("buy") && this.now-this.lastBuy >=1000){
			this.lastBuy = this.now;
			if(!this.buying){
				this.startBuying();
			}else{
				this.stopBuying();
			}
		}

		//checks the buy keys below
		this.checkBuyKeys();


		return true;
		
	},

//enables player to buy certain level ups by pussing f keys
	startBuying: function(){
		this.buying = true;
		me.state.pause(me.state.PLAY);
		game.data.pausePos = me.game.viewport.localToWorld(0, 0);
		game.data.buyscreen = new me.Sprite(game.data.pausePos.x, game.data.pausePos.y, me.loader.getImage('gold-screen'));
		game.data.buyscreen.updateWhenPaused = true;
		game.data.buyscreen.setOpacity(0.8);
		me.game.world.addChild(game.data.buyscreen, 34);
		game.data.player.body.setVelocity(0, 0);
		me.state.pause(me.state.PLAY);
		me.input.bindKey(me.input.KEY.F1, "F1", true);
		me.input.bindKey(me.input.KEY.F2, "F2", true);
		me.input.bindKey(me.input.KEY.F3, "F3", true);
		me.input.bindKey(me.input.KEY.F4, "F4", true);
		me.input.bindKey(me.input.KEY.F5, "F5", true);
		me.input.bindKey(me.input.KEY.F6, "F6", true);
		this.setBuyText();
	},

	setBuyText: function(){
		//adds the word awesomenauts to the game
		game.data.buytext = new (me.Renderable.extend({
			init: function(){
				this._super(me.Renderable, 'init', [game.data.pausePos.x, game.data.pausePos.y, 300, 50]);
				this.font = new me.Font("Arial", 26, "white");
				this.updateWhenPaused = true;
				this.alwaysUpdate = true;
				//me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
			},

			//function renderer tells the font size of the words in quotations
			draw: function(renderer){
				this.font.draw(renderer.getContext(), "PRESS F1-F6 TO BUY, B TO EXIT. Current Gold: " + game.data.gold, this.pos.x, this.pos.y);
				this.font.draw(renderer.getContext(), "Skill 1: Increase Damage. Current Level: " + game.data.skill1 + " Cost: " + ((game.data.skill1+1)*10), this.pos.x, this.pos.y);
				this.font.draw(renderer.getContext(), "Skill 2: Run Faster! Current Level: " + game.data.skill2 + " Cost: " + ((game.data.skill2+1)*10), this.pos.x, this.pos.y);
				this.font.draw(renderer.getContext(), "Skill 3: Increase Health. Current Level:  " + game.data.skill3 + " Cost: " + ((game.data.skill3+1)*10), this.pos.x, this.pos.y);
				this.font.draw(renderer.getContext(), "O Ability: Speed Burst. Current Level: " + game.data.ability1 + " Cost: " + ((game.data.ability1+1)*10), this.pos.y);
				this.font.draw(renderer.getContext(), "W Ability: Eat Your Creep for Health: " + game.data.ability2 + " Cost: " + ((game.data.ability2+1)*10), this.pos.y);
				this.font.draw(renderer.getContext(), "E Ability: Throw Your Spear: " + game.data.ability3 + " Cost: " + ((game.data.ability3+1)*10), this.pos.x, this.pos.y);

			}


		})));
		me.game.world.addChild(game.data.buytext, 35);
	},

//reverse function. enables the player to not buy or undo the buy
	stopBuying: function(){
		this.buying = false;
		me.state.resume(me.state.PLAY);
		game.data.player.body.setVelocity(game.data.playerMoveSpeed, 20);
		me.game.world.removeChild(game.data.buyscreen);
		me.input.unbindKey(me.input.KEY.F1, "F1", true);
		me.input.unbindKey(me.input.KEY.F2, "F2", true);
		me.input.unbindKey(me.input.KEY.F3, "F3", true);
		me.input.unbindKey(me.input.KEY.F4, "F4", true);
		me.input.unbindKey(me.input.KEY.F5, "F5", true);
		me.input.unbindKey(me.input.KEY.F6, "F6", true);
		me.game.world.removeChild(game.data.buytext);
	}

//check that the buy keys are working
checkBuyKeys: function(){
	if(me.input.isKeyPressed("F1")){
		//checks the cost of the key pressed
		if(this.checkCost(1)){
			//checks if the player bought the upgrade
			this.makePurchase(1);
		}
	}else if(me.input.isKeyPressed("F2")){
		//checks the cost of the key pressed
		if(this.checkCost(2)){
			//checks if the player bought the upgrade
			this.makePurchase(2);
		}
	}else if(me.input.isKeyPressed("F3")){
		//checks the cost of the key pressed
		if(this.checkCost(3)){
			//checks if the player bought the upgrade
			this.makePurchase(3);
		}
	}else if(me.input.isKeyPressed("F4")){
		//checks the cost of the key pressed
		if(this.checkCost(4)){
			//checks if the player bought the upgrade
			this.makePurchase(4);
		}
	}else if(me.input.isKeyPressed("F5")){
		//checks the cost of the key pressed
		if(this.checkCost(5)){
			//checks if the player bought the upgrade
			this.makePurchase(5);
		}
	}else if(me.input.isKeyPressed("F6")){
		//checks the cost of the key pressed
		if(this.checkCost(6)){
			//checks if the player bought the upgrade
			this.makePurchase(6);
		}
	}
},
//checks the cost of the key pressed
checkCost: function(skill){
	//if the key is pressed and if the player has the money the skill will be achieved
	if(skill===1 && (game.data.gold >= ((game.data.skill1+1)*10))){
		return true;
	}//if the key is pressed and if the player has the money the skill will be achieved
	else if(skill===2 && (game.data.gold >= ((game.data.skill2+1)*10))){
		return true;
	}//if the key is pressed and if the player has the money the skill will be achieved
	else if(skill===3 && (game.data.gold >= ((game.data.skill3+1)*10))){
		return true;
	}//if the key is pressed and if the player has the money the skill will be achieved
	else if(skill===4 && (game.data.gold >= ((game.data.ability1+1)*10))){
		return true;
	}//if the key is pressed and if the player has the money the skill will be achieved
	else if(skill===5 && (game.data.gold >= ((game.data.ability2+1)*10))){
		return true;
	}//if the key is pressed and if the player has the money the skill will be achieved
	else if(skill===6 && (game.data.gold >= ((game.data.ability3+1)*10))){
		return true;
		//if the player does not have the money they will not get the skill
	}else{
		return false;
	}
},
//enables the purchase to be made
makePurchase: function(skill){
	if(skill === 1){
		game.data.gold -= ((game.data.skill1 + 1)* 10);
		game.data.skill += 1;
		game.data.player.attack += 1;
	}else if(skill ===2){
		game.data.gold -= ((game.data.skill2 + 1)* 10);
		game.data.skill2 += 1;
	}else if(skill ===3){
		game.data.gold -= ((game.data.skill3 + 1)* 10);
		game.data.skill3 += 1;
	}else if(skill ===4){
		game.data.gold -= ((game.data.ability1 + 1)* 10);
		game.data.ability1 += 1;
	}else if(skill ===5){
		game.data.gold -= ((game.data.ability2 + 1)* 10);
		game.data.ability2 += 1;
	}else if(skill ===6){
		game.data.gold -= ((game.data.ability3 + 1)* 10);
		game.data.ability3 += 1;
	}
}



});

