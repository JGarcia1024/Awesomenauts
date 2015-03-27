game.SpendExp = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		//inserts the exp-screen image into the map
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('exp-screen')), -10); // TODO

		//binds keys
		me.input.bindKey(me.input.KEY.F1, "F1");
		me.input.bindKey(me.input.KEY.F2, "F2");
		me.input.bindKey(me.input.KEY.F3, "F3");
		me.input.bindKey(me.input.KEY.F4, "F4");
		me.input.bindKey(me.input.KEY.F5, "F5");


		//for new game
		me.game.world.addChild(new (me.Renderable.extend({
			init: function(){
				//calls super class and positions it
				this._super(me.Renderable, 'init', [10, 10, 300, 50]);
				//sets the font to arial, the size 46, and colors it white
				this.font = new me.Font("halo", 26, "#DE7E18");
			},
			//function that sets up the writing
			draw: function(renderer){
				//inserts the message "Press f1-f4 to buy, f5 to skip" and sets where writing starts
				this.font.draw(renderer.getContext(), "PRESS F1-F4 TO BUY, F5 TO SKIP", this.pos.x, this.pos.y);
				//inserts the message "Current EXP: " and adds the current exp and sets where writing starts
				this.font.draw(renderer.getContext(), "CURRENT EXP: " + game.data.exp.toString(), this.pos.x, this.pos.y + 50);
				//inserts the message "Current EXP: " and adds the current exp, the cost, and sets where writing starts
				this.font.draw(renderer.getContext(), "F1: INCREASE GOLD PRODUCTION. CURRENT LEVEL: " + game.data.exp.toString() + "COST: " + ((game.data.exp1 + 1) * 10), this.pos.x, this.pos.y + 100);
				//inserts the message "Current EXP: " and adds the current exp, the cost, and sets where writing starts
				this.font.draw(renderer.getContext(), "F2: INCREASE SPEED. CURRENT LEVEL: " + game.data.exp2.toString() + "COST: " + ((game.data.exp2 + 1) * 10), this.pos.x, this.pos.y + 150);
				//inserts the message "Current EXP: " and adds the current exp, the cost, and sets where writing starts
				this.font.draw(renderer.getContext(), "F3: INCREASE DAMAGE. CURRENT LEVEL: " + game.data.exp3.toString() + "COST: " + ((game.data.exp3 + 1) * 10), this.pos.x, this.pos.y + 200);
				//inserts the message "F4: INCREASE STARTING HEALTH. CURRENT LEVEL: " and adds the current exp, the cost, and sets where writing starts
				this.font.draw(renderer.getContext(), "F4: INCREASE STARTING HEALTH. CURRENT LEVEL: " + game.data.exp4.toString() + "COST: " + ((game.data.exp4 + 1) * 10), this.pos.x, this.pos.y + 250);
			},
			
		})));
		
		//checks if buttons are pressed
		this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge){
			//runs if F1 button is pressed
			if (action === "F1") {}
			//runs if F2 button is pressed
			if (action === "F2") {}
			//runs if F3 button is pressed
			if (action === "F3") {}
			//runs if F4 button is pressed
			if (action === "F4") {}
			//runs if F5 button is pressed
			if (action === "F5") {
				//runs the play screen
				me.state.change(me.state.PLAY);
			}
		});

	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		//unbinds keys
		me.input.unbindKey(me.input.KEY.F1, "F1");
		me.input.unbindKey(me.input.KEY.F2, "F2");
		me.input.unbindKey(me.input.KEY.F3, "F3");
		me.input.unbindKey(me.input.KEY.F4, "F4");
		me.input.unbindKey(me.input.KEY.F5, "F5");
		//unbinds event handler
		me.event.unsubscribe(this.handler);
	}
});