/**
 * @author Mat Groves
 */




GAME.TweetButton = function()
{
	PIXI.DisplayObjectContainer.call( this );//
	this.div = document.getElementById("tweet");
	
	this.bg = PIXI.Sprite.fromImage("img/BG_col_twitter.png");
	this.addChild(this.bg);
	
	this.bg.anchor.x = 0.5;
	this.bg.anchor.y = 0.5;
	this.bg.scale.x = 245/50;
	this.bg.scale.y = 245/50;
	
	this.f = PIXI.Sprite.fromImage("img/twitter_bird.png");//facebook_F.png
	this.addChild(this.f);
	this.f.anchor.x = this.f.anchor.y = 0.5;
	this.f.position.y  = -60;
}


GAME.TweetButton.constructor = GAME.TweetButton;
GAME.TweetButton.prototype = Object.create( PIXI.DisplayObjectContainer.prototype );

GAME.TweetButton.prototype.updateTransform = function()
{
	var rect = renderer.view.getBoundingClientRect();
	
	
	if(this.visible)
	{
		this.div.style.display = "block";	
	}
	else
	{
		this.div.style.display = "none";	
	}
	
	var transform = this.worldTransform;
	
	var val = "matrix(" + transform[0] + ", " +transform[3]+","+ transform[1] + "," +  
							transform[4] +"," + ( transform[2] )+ "," + ( transform[5] - 17 * transform[4] )+ ")";
	
	this.div.style.left = transform[2] / (renderer.width / rect.width) - 35 + "px"//style["-webkit-transform"] = val
	this.div.style.top = transform[5] / (renderer.height / rect.height) - 5 + "px"
	this.div.style.opacity = this.worldAlpha;
	PIXI.DisplayObjectContainer.prototype.updateTransform.call( this );
	
}

GAME.TweetButton.prototype.start = function(color)
{
		
}


