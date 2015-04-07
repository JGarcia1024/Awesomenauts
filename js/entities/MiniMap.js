game.MiniMap = me.Entity.extend({
	init: function(x, y, settings){
		//customizes the map 
		//tells where the map will be displayed
		//tells how big the map is
		this._super(me.Entity, "init", [x, y, {
			image: "minimap",
			width: 376,
			height: 217,
			spritewidth: "376",
			spriteheight: "217",
			getShape: function(){
				return (new me.Rect(0, 0, 376, 217)) .toPolygon();
			}
		}]);
		//tells that the map will be floating
		this.floating = true;

	}
});