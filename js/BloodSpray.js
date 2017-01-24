

GAME.BloodSpray = function(stage)
{
	this.stage = stage;
	this.target = new PIXI.Point();
	
	this.particals = [];
	this.particalPool = new GAME.GameObjectPool(Partical);
	this.max = 100
	this.count = 0;
	this.posIndex =0;
	
	this.positions = [];
	
	GAME.BloodTextures = [PIXI.Texture.fromFrame("bloodSplash0001.png"),
							PIXI.Texture.fromFrame("bloodSplash0002.png"),
							PIXI.Texture.fromFrame("bloodSplash0003.png"),
							PIXI.Texture.fromFrame("bloodSplash0004.png"),
							PIXI.Texture.fromFrame("bloodSplash0005.png"),
							PIXI.Texture.fromFrame("bloodSplash0006.png"),
							PIXI.Texture.fromFrame("bloodSplash0007.png"),
							PIXI.Texture.fromFrame("bloodSplash0008.png"),
							PIXI.Texture.fromFrame("bloodSplash0009.png"),
							PIXI.Texture.fromFrame("bloodSplash0010.png"),
							PIXI.Texture.fromFrame("bloodSplash0011.png"),
							PIXI.Texture.fromFrame("bloodSplash0012.png"),
							PIXI.Texture.fromFrame("bloodSplash0013.png"),
							PIXI.Texture.fromFrame("bloodSplash0014.png"),
							PIXI.Texture.fromFrame("bloodSplash0015.png")];
	
}

// constructor
GAME.BloodSpray.constructor = GAME.BloodSpray;

GAME.BloodSpray.prototype.update = function()
{
	//PIXI.Rope.prototype.updateTransform.call(this);
	
	this.count++;
	if(this.count % 3)
	{
		if( this.positions.length > 0)
		{
			//console.log( this.positions)
			var partical = this.particalPool.getObject();
		//	
			this.stage.addChild(partical);
			this.particals.push(partical);
			partical.count = 0;
			partical.speed.x = (Math.random() -0.5) * 6;
			partical.speed.y = -(Math.random()) * 7;
			
			var tempPos =  this.positions[this.posIndex % this.positions.length];
			this.posIndex++;
			partical.position.x =  tempPos.x - this.stage.position.x;
			partical.position.y = tempPos.y - this.stage.position.y;
		}
	}
	
	for (var i=0; i < this.particals.length; i++) 
	{
		var partical =  this.particals[i];
		
		partical.position.x += partical.speed.x;
		partical.position.y += partical.speed.y;
		
		partical.speed.y += 0.3;
		partical.speed.x *= 0.99;
		
		
		// animate
		partical.count += 0.5 * GAME.time.DELTA_TIME;
		var round = (partical.count + 0.5) | 0;
		if(round > 14)
		{
			round = 14;
			this.stage.removeChild(partical);
			this.particals.splice(i, 1);
			this.particalPool.returnObject(partical);
			i--;
		}
		
		partical.setTexture(GAME.BloodTextures[round]);
		
	//	if(partical.position.y > 100)
	//	{
			
	//	}
	};	
}

GAME.BloodSpray.prototype.reset = function()
{
	this.positions = [];
}

Partical = function()
{
	PIXI.Sprite.call(this, PIXI.Texture.fromFrame("bloodSplat.png"));
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this.count = 0;
	this.speed = new PIXI.Point();
}

Partical.constructor = Partical;
Partical.prototype = Object.create( PIXI.Sprite.prototype );


