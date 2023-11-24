
TitleScreen = function()
{
	PIXI.DisplayObjectContainer.call(this);
	
	
	
	this.logoContainer = new PIXI.DisplayObjectContainer();
	
	this.logo1 = PIXI.Sprite.fromImage("img/jahtari.jpg");
	this.logo2 = PIXI.Sprite.fromImage("img/wearepictures.png");
	this.logo3 = PIXI.Sprite.fromImage("img/shalomsalon.png");
	
	this.logo1.anchor.x = this.logo1.anchor.y = 0.5;
	this.logo2.anchor.x = this.logo2.anchor.y = 0.5;
	this.logo3.anchor.x = this.logo3.anchor.y = 0.5;
	
	this.logo1.alpha = 0;
	this.logo2.alpha = 0;
	this.logo3.alpha = 0;
	
	this.logoContainer.addChild(this.logo1);
	this.logoContainer.addChild(this.logo2);
	this.logoContainer.addChild(this.logo3);
	
	this.title = PIXI.Sprite.fromImage("img/TITLE.png");
	this.title.anchor.x = this.title.anchor.y = 0.5;
	
	this.playButton = PIXI.Sprite.fromImage("img/play.png");
	
	this.playButton.touchstart = this.playButton.mouseover = function(){this.setTexture(PIXI.Texture.fromImage("img/play_rollpress.png"))}
	this.playButton.touchend = this.playButton.mouseout = function(){
		
		
		this.setTexture(PIXI.Texture.fromImage("img/play.png"))
	//	this.texture.setFrame(new PIXI.Rectangle(0, 0, 100, 20))
	
	}
	
	this.playButton.hitScale = 1;
	
	this.playButton.anchor.x = this.playButton.anchor.y = 0.5;
	this.playButton.interactive = true;
	this.playButton.position.x = 400;
	this.playButton.position.y = 300;
	
	this.addChild(this.logoContainer);
	var delay = 1//1;//0.1//0.1;
	var fadeIn = 0.5;//0.5//0.1;
	
	this.introTimeline = new TimelineLite();
	//append a to() tween
//	this.introTimeline.to(this.logo1, fadeIn, {alpha:0, ease:Sine.easeOut, delay:0.5});
	
	this.introTimeline.to(this.logo1, fadeIn, {alpha:1, ease:Sine.easeIn});
	this.introTimeline.to(this.logo1, fadeIn, {alpha:0, ease:Sine.easeOut, delay:delay});
	
	this.introTimeline.to(this.logo2, fadeIn, {alpha:1, ease:Sine.easeIn});
	this.introTimeline.to(this.logo2, fadeIn, {alpha:0, ease:Sine.easeOut, delay:delay});
	
	this.introTimeline.to(this.logo3, fadeIn, {alpha:1, ease:Sine.easeIn});
	this.introTimeline.to(this.logo3, fadeIn, {alpha:0, ease:Sine.easeOut, delay:delay});
	
	
	//introTimeline.to(flashLogo, fadeIn, {alpha:1, ease:Sine.easeIn});
	//introTimeline.to(flashLogo, fadeIn, {alpha:0, ease:Sine.easeOut, delay:delay});
	this.introTimeline.call(this.onIntrosComplete.bind(this));
//	this.gameover = new GameoverOverlay();
//	this.addChild(this.gameover);
	//this.tweet.scale.x = 2;
	//this.tweet.scale.y = 2;
	
}

TitleScreen.constructor = TitleScreen;
TitleScreen.prototype = Object.create( PIXI.DisplayObjectContainer.prototype ); 

TitleScreen.prototype.onIntrosComplete = function()
{
	this.removeChild(this.logoContainer);
	
	this.title.alpha = 0;
	this.playButton.alpha = 0;
	
	TweenLite.to(this.title, 0.5, {alpha:1, ease:Sine.easeOut})
	TweenLite.to(this.playButton, 0.5, {alpha:1, ease:Sine.easeOut, delay:0.3})
	
	this.addChildAt(this.playButton, 0);
	this.addChild(this.title)
}

TitleScreen.prototype.onShown = function()
{
	this.introTimeline.play();
	this.playButton.click = this.playButton.tap = $.proxy(this.onPlayPressed, this);
}

TitleScreen.prototype.onHidden = function()
{
	//interactiveManager.remove(this.playButton);	
}

TitleScreen.prototype.onPlayPressed = function(data)
{
	//highScores.show()
	//return;
	//return;
	this.playButton.setInteractive(false);
	setTimeout(this.onHandFinished.bind(this), 600)
	//alert("!")
	
	stage.addChild(hand)
	
}

TitleScreen.prototype.onHandFinished = function()
{
	// var music = document.getElementById("music");
	console.log(music);
	music.pause();
	music.play();
	
	muteButton.alpha = 0;
	muteButton.visible = true;
	TweenLite.to(muteButton, 0.3, {alpha:1, ease:Sine.eaesIn});
	//this.transition.start();
	//simpleApp.gotoScreen(gameScreen);
	transition.start(0);
	transition.onComplete= function()
	{
		simpleApp.gotoScreen(gameScreen, true);
	}
}



TitleScreen.prototype.resize = function(w, h)
{
	this.logoContainer.position.x = w/2;
	this.logoContainer.position.y = h/2;
	
	this.title.position.x = w/2;
	this.title.position.y = 250;
	
	this.playButton.position.x = w/2;
	this.playButton.position.y = 470;
	
//	this.gameover.resize(w,h);
//	highScores.resize(w,h);
	//interactiveManager.remove(this.playButton);	
}
