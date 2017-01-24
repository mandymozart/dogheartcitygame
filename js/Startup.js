
Startup = function()
{
	// stress test!
	this.loader = new PIXI.AssetLoader(["img/BG_col_01.png",
										"img/BG_col_02.png",
										"img/BG_col_03.png",
										"img/BG_col_04.png",
										"img/BG_col_05.png",
										"img/gameover.png",
										 "img/TITLE.png",
										 "img/play_again_rollpress.png",
										  "img/submit_rollpress.png",
										 "img/play.png",
										 "img/play_rollpress.png",
										 "img/wearepictures.png", 
										 "img/shalomsalon.png",
										 "img/jahtari.png",
										 "img/gameAssets-dhc.json",
										 "img/gameAssets-hd.json",
										 "img/frontEndAssets-hd.json",
										 "img/handAssets-hd.json",
										 "img/hudAssets.json"])
	
	simpleApp.gotoScreen(loadingScreen);
	
	this.loader.addEventListener( 'onComplete', function ( event ) 
	{
//		simpleApp.gotoScreen(titleScreen);

		gameScreen = new GAME.Game();
		titleScreen = new TitleScreen();
		
		transition = new GAME.TransitionAnimation();
		stage.addChildAt(transition, 1);
		simpleApp.gotoScreen(titleScreen);
		
		hand = new GAME.ExplosionAnimation();
	
		hand.position.x = GAME.width/2;
		hand.position.y = GAME.height/2 + 30;

	} );
}

Startup.constructor = Startup;

Startup.prototype.run = function()
{
	this.loader.load();
}
