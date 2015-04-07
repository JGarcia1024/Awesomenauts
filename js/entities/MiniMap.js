game.MiniMap = me.Entity.extend({
	init: function(x, y, settings){
		//customizes the map 
		//tells where the map will be displayed
		//tells how big the map is
		this._super(me.Entity, "init", [x, y, {
			image: "minimap",
			width: 699,
			height: 114,
			spritewidth: "699",
			spriteheight: "114",
			getShape: function(){
				return (new me.Rect(0, 0, 699, 144)) .toPolygon();
			}
		}]);
		//tells that the map will be floating
		this.floating = true;

	}
});