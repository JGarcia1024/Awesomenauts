game.TitleScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		//adds title screen to the beggining of the game
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('title-screen')), -10); // TODO
	    
		//fixes pointer problem
		game.data.option1 = new (me.Renderable.extend({
			init: function(){
				this._super(me.Renderable, 'init', [270, 240, 300, 50]);
				this.font = new me.Font("Arial", 46, "white");
				me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
			},

			//function renderer tells the font size of the words in quotations
			draw: function(renderer){
				this.font.draw(renderer.getContext(), "START A NEW GAME", this.pos.x, this.pos.y);
			},


			update: function(dt){
				return true;
			},

			newGame: function(){
				me.input.releasePointerEvent('pointerdown', this);
			    me.input.releasePointerEvent('pointerdown', game.data.option2);
				me.state.change(me.state.NEW);
			}
		}));

		me.game.world.addChild(game.data.option1);

		//adds the word awesomenauts to the game
		game.data.option2 = new (me.Renderable.extend({
			init: function(){
				this._super(me.Renderable, 'init', [270, 340, 250, 50]);
				this.font = new me.Font("Arial", 46, "white");
				me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
			},

			//function renderer tells the font size of the words in quotations
			draw: function(renderer){
				this.font.draw(renderer.getContext(), "CONTINUE", this.pos.x, this.pos.y);
			},


			update: function(dt){
				return true;
			},

			newGame: function(){
				me.input.releasePointerEvent('pointerdown', this);
				me.input.releasePointerEvent('pointerdown', game.data.option2);
				me.state.change(me.state.LOAD);
			}
		}));

		me.game.world.addChild(game.data.option2);
		//me.game.world.addChild(game.data.option2);
		
	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
	
	}
});
