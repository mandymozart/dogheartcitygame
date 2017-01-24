/**
 * @author Mat Groves
 */




GAME.Hand = function()
{
	this.currentFrame = 0;
	this.frames = [PIXI.Texture.fromFrame("creatorHand0001.png"),
					      PIXI.Texture.fromFrame("creatorHand0002.png"),
					      PIXI.Texture.fromFrame("creatorHand0003.png"),
					      PIXI.Texture.fromFrame("creatorHand0004.png"),
					      PIXI.Texture.fromFrame("creatorHand0005.png")];
					      
				      
	PIXI.Sprite.call(this, this.frames[0]);//

	this.anchor.x = 0.5;
	this.anchor.y = 1;
	
	this.animating = false;
}

// constructor
GAME.Hand.constructor = GAME.Hand;
GAME.Hand.prototype = Object.create( PIXI.Sprite.prototype );

GAME.Hand.prototype.tap = function()
{
	this.animating = false;
	this.currentFrame = 0;
	this.setTexture(this.frames[0]);
	this.rotation = Math.PI/2; 
	TweenLite.to(this, 0.5, {rotation:0});
	this.position.x = GAME.width/2 + 100;
	this.position.y = GAME.height + 500;
	TweenLite.to(this.position, 0.5, {y:GAME.height, onComplete:$.proxy(this.onIn, this)})
}

GAME.Hand.prototype.onIn = function()
{
	this.animating = true;
}

GAME.Hand.prototype.update = function()
{
	//this.position.x = mouse.x + 80;
	//this.position.y = mouse.y + 300;
	if(this.animating)
	{
		this.currentFrame += 0.2;
		this.count ++;
			
		if(this.currentFrame > this.frames.length-1)
		{
			this.currentFrame = this.frames.length-1;
			this.animating = false;
			this.onComplete();
		}
	
		var round = (this.currentFrame + 0.5) | 0;
		this.setTexture(this.frames[round %  5]);
	}
	
}

