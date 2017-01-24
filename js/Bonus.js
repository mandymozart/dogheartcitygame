/**
 * @author Mat Groves
 */




GAME.Bonus = function()
{
	PIXI.Sprite.call(this, PIXI.Texture.fromFrame("x2.png"));//
	this.life = 100;
	this.anchor.x = 0.5;
	this.anchor.y = 1;
}

// constructor
GAME.Bonus.constructor = GAME.Bonus;
GAME.Bonus.prototype = Object.create( PIXI.Sprite.prototype );

GAME.bonusArray = [];

GAME.Bonus.prototype.updateTransform = function()
{
	
	this.life -= GAME.time.DELTA_TIME;
	this.position.y -= 1 * GAME.time.DELTA_TIME;
	
	// 40 - 0
	
	if(this.life < 10)
	{
		this.alpha =  (this.life) / 10;
	}
	//if(this.alpha > 1)this.alpha = 1;
	
	PIXI.Sprite.prototype.updateTransform.call( this );
}

GAME.Bonus.prototype.reset = function(position)
{
	this.life = 50;
	this.alpah = 1;
	this.position.x = position.x;
	this.position.y = position.y;
	this.scale.x = this.scale.y = 0;
	TweenLite.to(this.scale, 0.6, {x:1, y:1, ease:Elastic.easeOut})
}

GAME.bonusPool = new GAME.GameObjectPool(GAME.Bonus);
	
