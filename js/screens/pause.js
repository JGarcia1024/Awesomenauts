game.PauseScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		//inserts the title-screen image into the map
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('pause-screen')), -10); // TODO
		//makes the enter key into an object
		me.input.bindKey(me.input.KEY.ENTER, "start");

		me.game.world.addChild(new (me.Renderable.extend({
			init: function(){
				//calls super class 
				this._super(me.Renderable, 'init', [510, 30, me.game.viewport.width, me.game.viewport.height]);
				//sets the font to arial, the size 46, and colors it white
				this.font = new me.Font("Arial", 46, "white");
			},
			//function that sets up the writing
			draw: function(renderer){
				
				//inserts the message "Press ENTER to play!" and sets where writing starts
				this.font.draw(renderer.getContext(), "Press ENTER to play!", 250, 530);
			}
		})));
		//listens to see if enter button is pressed
		this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge){
			//runs if enter button is pressed
			if (action === "start") {
				//goes to play screen
				me.state.change(me.state.PLAY);
			}
		});
	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		//removes the enter key's status as an object
		me.input.unbindKey(me.input.KEY.ENTER); 
		//inform's program not to listen for pressed enter key
		me.event.unsubscribe(this.handler);
	}
});