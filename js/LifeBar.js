
LifeBar = function()
{
	PIXI.DisplayObjectContainer.call(this);
	
	this.bar = PIXI.Sprite.fromImage("img/healthBar.png");
	this.addChild(this.bar);
	this.bar.position.x = 39;
	this.bar.position.y = 6;
	this.bar.scale.x = 0.9;
	this.bar.scale.y = 0.78;
	
	this.frame = PIXI.Sprite.fromFrame("healthFrame_green.png")
	this.addChild(this.frame);
	
	//this.addChild(PIXI.Sprite.fromImage("img/bar.png"));
	//this.interactive = false;
	
}

LifeBar.constructor = LifeBar;
LifeBar.prototype = Object.create( PIXI.DisplayObjectContainer.prototype ); 



