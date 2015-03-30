game.NewProfile = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		//adds title screen to the beggining of the game
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('new-screen')), -10); // TODO
	    //binds the F1 key so that the player can increase their gold
	    me.input.unbindKey(me.input.KEY.B);
	    me.input.unbindKey(me.input.KEY.Q);
	    me.input.unbindKey(me.input.KEY.E);
	    me.input.unbindKey(me.input.KEY.W);
	    me.input.unbindKey(me.input.KEY.A);
	
		//adds the word awesomenauts to the game
		me.game.world.addChild(new (me.Renderable.extend({
			init: function(){
				this._super(me.Renderable, 'init', [10, 10, 300, 50]);
				this.font = new me.Font("Arial", 26, "white");
				//me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
			},

			//function renderer tells the font size of the words in quotations
			draw: function(renderer){
				this.font.draw(renderer.getContext(), "PICK A USERNAME AND PASSWORD", this.pos.x, this.pos.y);
			}

		})));
	
		
	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {

	}
});

	