
GameoverOverlay = function()
{
	PIXI.DisplayObjectContainer.call(this);
	
	this.gameover = PIXI.Sprite.fromImage("img/gameover.png");
	this.gameover.anchor.x = this.gameover.anchor.y = 0.5;
	
	this.gameover.position.x = 400;
	this.gameover.position.y = 150;
	
	//this.addChild(this.gameover);
	
	this.tryAgain = PIXI.Sprite.fromImage("img/BG_col_playAgain.png");
	this.tryAgain.scale.x = 268/50;
	this.tryAgain.scale.y = 245/50;
	
	this.tryAgain.text = PIXI.Sprite.fromImage("img/play_again.png");//play_again_rollpress.png
	this.tryAgain.text.scale.x = 1/this.tryAgain.scale.x;
	this.tryAgain.text.scale.y = 1/this.tryAgain.scale.y;
	this.tryAgain.text.anchor.x = this.tryAgain.text.anchor.y = 0.5;
	
	this.tryAgain.addChild(this.tryAgain.text);
	this.tryAgain.mouseover = this.tryAgain.touchstart = function(){
		this.text.setTexture(PIXI.Texture.fromImage("img/play_again_rollpress.png"));
	}
	
	this.tryAgain.mouseout = this.tryAgain.touchend = function(){
		this.text.setTexture(PIXI.Texture.fromImage("img/play_again.png"));
	}
	
	this.tryAgain.anchor.x = this.tryAgain.anchor.y = 0.5;
	
	this.submitButton = PIXI.Sprite.fromImage("img/BG_col_submit.png");
	this.submitButton.scale.x = 268/50;
	this.submitButton.scale.y = 245/50;
	this.submitButton.hitScale = 1;
	this.submitButton.anchor.x = this.submitButton.anchor.y = 0.5;
	
	// submit text..
	this.submitButton.text = PIXI.Sprite.fromImage("img/submit.png");//play_again_rollpress.png
	this.submitButton.text.scale.x = 1/this.submitButton.scale.x;
	this.submitButton.text.scale.y = 1/this.submitButton.scale.y;
	this.submitButton.text.position.y = 60/ this.submitButton.scale.y;
	this.submitButton.text.anchor.x = this.submitButton.text.anchor.y = 0.5;
	this.submitButton.addChild(this.submitButton.text);
	this.submitButton.mouseover = this.submitButton.touchstart = function(){
		this.text.setTexture(PIXI.Texture.fromImage("img/submit_rollpress.png"));
	}
	
	this.submitButton.mouseout = this.submitButton.touchend = function(){
		this.text.setTexture(PIXI.Texture.fromImage("img/submit.png"));
	}
	
	this.submitButton.click = this.submitButton.tap = function(){
		highScores.show();	
		//console.log("!!!!!!")
	}

	
	//this.tryAgain.text = PIXI.Sprite.fromImage("img/play_again.png");//play_again_rollpress.png
	
	
	this.tryAgain.position.x = 400;
	this.tryAgain.position.y = 450;
	
	this.addChild(this.gameover);
	this.addChild(this.tryAgain);
	this.addChild(this.submitButton);
	//this.addChild(this.tryAgain);
	
	this.tryAgain.click =  this.tryAgain.tap = $.proxy(this.onTryAgainPressed, this);
	this.tryAgain.hitScale = 1;
	
	var delay = 2//1//1;//0.1//0.1;
	var fadeIn = 0.5;//0.5//0.1;
	
			
	this.tryAgain.alpha = 0;
	this.submitButton.alpha = 0;
	this.gameover.alpha = 0;
	
	this.tl = new TimelineLite();
	//append a to() tween
//	this.introTimeline.to(this.logo1, fadeIn, {alpha:0, ease:Sine.easeOut, delay:0.5});
	
	
	this.tl.to(this.gameover, fadeIn, {alpha:1, ease:Sine.easeIn});
	this.tl.to(this.gameover, fadeIn, {alpha:0, ease:Sine.easeOut, delay:delay});
	
	this.tl.to(this.tryAgain, fadeIn, {alpha:1, ease:Sine.easeIn}, 3.2);
	this.tl.to(this.submitButton, fadeIn, {alpha:1, ease:Sine.easeIn}, 3.4);
	
	this.tl.call(this.onPlayAgainFaded.bind(this));
	
	
	
}

GameoverOverlay.constructor = GameoverOverlay;
GameoverOverlay.prototype = Object.create( PIXI.DisplayObjectContainer.prototype ); 

GameoverOverlay.prototype.show = function()
{
	this.gameover.visible = true;
	this.tryAgain.setInteractive(false);
	this.tl.restart();
	this.tl.play();
	$('#gameover-overlay').fadeIn()
}

GameoverOverlay.prototype.onPlayAgainFaded = function()
{
	
	//this.removeChild(this.tryAgain);
	this.tryAgain.setInteractive(true);
	this.submitButton.setInteractive(true);
	
}



GameoverOverlay.prototype.hide = function()
{
	
	this.tryAgain.setInteractive(false);
	$('#gameover-overlay').fadeOut()

}

GameoverOverlay.prototype.onTryAgainPressed = function()
{
	this.tryAgain.setInteractive(false);
	this.tl.reverse();
	//this.onContinue();
	setTimeout(this.onContinue, 1000)
	this.gameover.visible = false;
}

GameoverOverlay.prototype.onSubmitPressed = function()
{
		
}


GameoverOverlay.prototype.resize = function(w, h)
{
	this.tryAgain.position.x = 245 + 268/2;
	this.tryAgain.position.y = h/2 ;
	
	this.submitButton.position.x = 245 + 268/2 + 268;
	this.submitButton.position.y = h/2 ;
	
	this.gameover.position.x = w/2;
	this.gameover.position.y = h/2 - 20;
	
}
