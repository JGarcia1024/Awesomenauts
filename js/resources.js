game.resources = [

	/* Graphics. 
	 * @example
	 * {name: "example", type:"image", src: "data/img/example.png"},
	 */
	 // loads our background tiles
	 {name: "background-tiles", type:"image", src: "data/img/background-tiles.png"},
	 // loads meta-tiles
	 {name: "meta-tiles", type:"image", src: "data/img/meta-tiles.png"},
	 // loads the character
	 {name: "player", type:"image", src: "data/img/orcSpear.png"},
	 //loads the tower
	 {name: "tower", type:"image", src: "data/img/tower_round.svg.png"},
	 //loads the image for our creep/ enemy
	 {name: "creep1", type:"image", src: "data/img/brainmonster.png"},
	 // loads player 2s image
	 {name: "Player2", type:"image", src: "data/img/gloop.png"},
	 //loads title screen picture in the background
	 {name: "title-screen", type:"image", src: "data/img/title.png"},
	 {name: "exp-screen", type:"image", src: "data/img/loadpic.png"},
	 {name: "gold-screen", type:"image", src: "data/img/spend.png"},
	 {name: "load-screen", type:"image", src: "data/img/loadpic.png"},
	 {name: "new-screen", type:"image", src: "data/img/newpic.png"},
	/* Atlases 
	 * @example
	 * {name: "example_tps", type: "tps", src: "data/img/example_tps.json"},
	 */
		
	/* Maps. 
	 * @example
	 * {name: "example01", type: "tmx", src: "data/map/example01.tmx"},
	 * {name: "example01", type: "tmx", src: "data/map/example01.json"},
 	 */
 	 // loads level01 
 	 {name: "level01", type: "tmx", src: "data/map/test.tmx"},
	/* Background music. 
	 * @example
	 * {name: "example_bgm", type: "audio", src: "data/bgm/"},
	 */
	 {name: "Zelda Main Theme Song", type: "audio", src: "data/bgm/"},	

	/* Sound effects. 
	 * @example
	 * {name: "example_sfx", type: "audio", src: "data/sfx/"}
	 */
	 {name: "jump", type: "audio", src: "data/sfx/"},
	 {name: "stomp", type: "audio", src: "data/sfx/"}
];
