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
			//tells the player if they won at the end of the game
			alert("YOU WIN!");
		}else if(game.data.win === false && !this.gameover){
			this.gameOver(false);
			//this.gameOver = true;
			//tells the player that they lost when the game is over
			alert("YOU LOSE!");
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
			
		// <!-- makes the register key work and execute the action it is suppose to do
			$.ajax({
				type: "POST",
				url: "php/controller/save-user.php",
				data: {
					exp: game.data.exp,
					exp1: game.data.exp1,
					exp2: game.data.exp2,
					exp3: game.data.exp3,
					exp4: game.data.exp4,
				},
				dataType: "text"
			}) // if the register works then this code will execute
			.success(function(response){
				if(response==="true"){
					me.state.change(me.state.MENU);
				}else{
					alert(response);
				}
			})
			//if the register doesnt work this code will execute
			.fail(function(response){
				//if it doesnt work this will be printed
				alert("Fail");
			});
		}
}			
	
);
