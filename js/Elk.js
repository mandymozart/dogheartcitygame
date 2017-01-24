/**
 * @author Mat Groves
 */




GAME.Elk = function()
{
	
	
	this.currentFrame = 0;
	this.chewingFrames = [PIXI.Texture.fromFrame("deer0001.png"),
						  PIXI.Texture.fromFrame("deer0002.png")];
					      
	this.lookingFrames = [PIXI.Texture.fromFrame("deer0001.png"),
					      PIXI.Texture.fromFrame("deer0002.png"),
					      PIXI.Texture.fromFrame("deer0003.png"),
					      PIXI.Texture.fromFrame("deer0004.png"),
					      PIXI.Texture.fromFrame("deer0004.png"),
					      PIXI.Texture.fromFrame("deer0004.png"),
					      PIXI.Texture.fromFrame("deer0004.png"),
					      PIXI.Texture.fromFrame("deer0004.png"),
					      PIXI.Texture.fromFrame("deer0004.png"),
					      PIXI.Texture.fromFrame("deer0004.png"),
					      PIXI.Texture.fromFrame("deer0004.png"),
					      PIXI.Texture.fromFrame("deer0004.png"),
					      PIXI.Texture.fromFrame("deer0004.png"),
					      PIXI.Texture.fromFrame("deer0003.png"),
					      PIXI.Texture.fromFrame("deer0002.png"),
					      PIXI.Texture.fromFrame("deer0001.png")];
	
	this.deadFrames = [PIXI.Texture.fromFrame("deerDie0002.png"),
					      PIXI.Texture.fromFrame("deerDie0003.png"),
					      PIXI.Texture.fromFrame("deerDie0004.png"),
					      PIXI.Texture.fromFrame("deerDie0005.png"),
					      PIXI.Texture.fromFrame("deerDie0006.png"),
					      PIXI.Texture.fromFrame("deerDie0007.png"),
					      PIXI.Texture.fromFrame("deerDie0008.png"),
					      PIXI.Texture.fromFrame("deerDie0009.png"),
					      PIXI.Texture.fromFrame("deerDie0010.png"),
					      PIXI.Texture.fromFrame("deerDie0011.png"),
					      PIXI.Texture.fromFrame("deerDie0012.png"),
					      PIXI.Texture.fromFrame("deerDie0013.png"),
					      PIXI.Texture.fromFrame("deerDie0014.png"),
					      PIXI.Texture.fromFrame("deerDie0015.png"),
					      PIXI.Texture.fromFrame("deerDie0015.png"),
					      PIXI.Texture.fromFrame("deerDie0015.png"),
					      PIXI.Texture.fromFrame("deerDie0015.png"),
					      PIXI.Texture.fromFrame("deerDie0015.png"),
					      PIXI.Texture.fromFrame("deerDie0015.png"),
					      PIXI.Texture.fromFrame("deerDie0015.png"),
					      PIXI.Texture.fromFrame("deerDie0015.png"),
					      PIXI.Texture.fromFrame("deerDie0015.png"),
					      PIXI.Texture.fromFrame("deerDie0015.png"),
					      PIXI.Texture.fromFrame("deerDie0015.png"),
					      PIXI.Texture.fromFrame("deerDie0015.png"),
					      PIXI.Texture.fromFrame("deerDie0015.png"),
					      PIXI.Texture.fromFrame("deerDie0015.png"),
					      PIXI.Texture.fromFrame("deerDie0015.png"),
					      PIXI.Texture.fromFrame("deerDie0015.png"),
					      PIXI.Texture.fromFrame("deerDie0015.png"),
					      PIXI.Texture.fromFrame("deerDie0015.png"),
					      PIXI.Texture.fromFrame("deerDie0015.png"),
					      PIXI.Texture.fromFrame("deerDie0015.png"),
					      PIXI.Texture.fromFrame("deerDie0015.png"),
					      PIXI.Texture.fromFrame("deerDie0015.png")];
					      
	this.currentFrames = this.lookingFrames;
	this.isLooking = false;
				      
	PIXI.Sprite.call(this, this.chewingFrames[0]);//

	this.anchor.x = 0.5;
	this.anchor.y = 0.7;
	
	this.count = 0;
}

// constructor
GAME.Elk.constructor = GAME.Elk;
GAME.Elk.prototype = Object.create( PIXI.Sprite.prototype );


GAME.Elk.prototype.update = function()
{

	if(this.isDead)
	{
		this.currentFrame += 0.2  * GAME.time.DELTA_TIME;
		
		if(this.currentFrame > this.currentFrames.length-1)
		{
			this.currentFrame = this.currentFrames.length-5-21;
		}
	}	
	else
	{
		this.currentFrame += 0.3 * GAME.time.DELTA_TIME;
		this.count +=  GAME.time.DELTA_TIME;
		if(this.count > 500)
		{
			this.count = 0;
			this.currentFrame = 0;
			this.currentFrames = this.lookingFrames;
		}
		
		if(this.currentFrame > this.currentFrames.length-1)
		{
			this.currentFrame = this.currentFrames.length-1;
		}

	}
		
	
	var round = (this.currentFrame + 0.5) | 0;
	this.setTexture(this.currentFrames[round ]);

	
}

GAME.Elk.prototype.die = function()
{
	this.currentFrame = 0;
	this.isDead = true;
	this.currentFrames = this.deadFrames;
}

GAME.Elk.prototype.reset = function()
{
	this.currentFrame = 0;
	this.isDead = false;
	this.currentFrames = this.lookingFrames;
}
