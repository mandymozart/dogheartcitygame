/**
 * @author Mat Groves
 */




GAME.FacebookButton = function()
{
	PIXI.DisplayObjectContainer.call( this );//
	this.div = document.getElementById("facebook");
	
	this.bg = PIXI.Sprite.fromImage("img/BG_col_facebook.png");
	this.addChild(this.bg);
	this.f = PIXI.Sprite.fromImage("img/facebook_F.png");//facebook_F.png
	this.addChild(this.f);
	this.f.anchor.x = this.f.anchor.y = 0.5;
	this.f.position.y  = -60;
	this.bg.anchor.x = 0.5;
	this.bg.anchor.y = 0.5;
	this.bg.scale.x = 245/50;
	this.bg.scale.y = 245/50;
}


GAME.FacebookButton.constructor = GAME.FacebookButton;
GAME.FacebookButton.prototype = Object.create( PIXI.DisplayObjectContainer.prototype );

GAME.FacebookButton.prototype.updateTransform = function()
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
	this.div.style.top = transform[5] / (renderer.height / rect.height) -5 + "px"
	this.div.style.opacity = this.worldAlpha;
	PIXI.DisplayObjectContainer.prototype.updateTransform.call( this );
	
}

GAME.FacebookButton.prototype.hide = GAME.TweetButton.prototype.hide = function()
{
	this.div.style.display = "none";
}