game.TitleScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		//inserts the title-screen image into the map
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('title-screen')), -10); // TODO

		//for new game
		me.game.world.addChild(new (me.Renderable.extend({
			init: function(){
				//calls super class 
				this._super(me.Renderable, 'init', [300, 540, 300, 50]);
				//sets the font to arial, the size 46, and colors it white
				this.font = new me.Font("flame", 46, "#DE7E18");
				//if the mouse is clicked on the title screen, a new game will start
				me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
			},
			//function that sets up the writing
			draw: function(renderer){
				//inserts the message "Awesomenauts!" and sets where writing starts
				this.font.draw(renderer.getContext(), "START A NEW GAME!", this.pos.x, this.pos.y);
			},

			update: function(dt){
				//makes sure its listening
				return true;
			},

			newGame: function(){
				//gets rid of the mouse as an object
				me.input.releasePointerEvent('pointerdown', this);
				//erases the saved values of the variables
				me.save.remove('exp');
				me.save.remove('exp1');
				me.save.remove('exp2');
				me.save.remove('exp3');
				me.save.remove('exp4');
				//creates a place to save these 5 variables
				me.save.add({exp: 0, exp1: 0, exp2: 0, exp3: 0, exp4: 0});
				//sets screen to play screen
				me.state.change(me.state.PLAY);
			}
		})));

		//for continued game
		me.game.world.addChild(new (me.Renderable.extend({
			init: function(){
				//calls super class 
				this._super(me.Renderable, 'init', [380, 340, 250, 50]);
				//sets the font to arial, the size 46, and colors it white
				this.font = new me.Font("flame", 46, "#DE7E18");
				//if the mouse is clicked on the title screen, a new game will start
				me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
			},
			//function that sets up the writing
			draw: function(renderer){
				//inserts the message "Awesomenauts!" and sets where writing starts
				this.font.draw(renderer.getContext(), "CONTINUE!", this.pos.x, this.pos.y);
			},

			update: function(dt){
				//makes sure its listening
				return true;
			},

			newGame: function(){
				// sets saved exp values to the variables in the new game
				game.data.exp = me.save.exp;
				game.data.exp1 = me.save.exp1;
				game.data.exp2 = me.save.exp2;
				game.data.exp3 = me.save.exp3;
				game.data.exp4 = me.save.exp4;

				//gets rid of the mouse as an object
				me.input.releasePointerEvent('pointerdown', this);
				//sets screen to exp screen
				me.state.change(me.state.SPENDEXP);
			}
		})));
		
	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		
	}
});