/**
 * @author Mat Groves
 */



var tempPoint = new PIXI.Point();
var matrix = mat3.create();


GAME.Goody = function()
{
	this.hitScale = 2///1.75;
	
	this.walkingFrame = PIXI.Texture.fromFrame("heartPickup.png");
	this.pickedupFrame = PIXI.Texture.fromFrame("heartPickup.png");
	this.throwFrame = PIXI.Texture.fromFrame("heartPickup.png");
	this.eatingFrame = PIXI.Texture.fromFrame("heartPickup.png");
	this.sittingFrame = PIXI.Texture.fromFrame("heartPickup.png");
	
	this.pounceFrame = PIXI.Texture.fromFrame("heartPickup.png");
	
	
	this.walkingFrame.anchor = 0.5;
	this.pickedupFrame.anchor = 0.25;
	
	PIXI.Sprite.call(this, this.walkingFrame);//
	
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	
	this.z = 0;
	this.zSpeed = 0;
	
	this.realY = 0;
	this.dashTarget = new PIXI.Point();
	this.elkTarget;
	
	this.state = 2;
	this.realPosition = new PIXI.Point();
	
	this.speed = 1;
	this.throwSpeed = new PIXI.Point();
	this.lastPosition = new PIXI.Point();
	this.direction = new PIXI.Point();
	
	this.shadow = PIXI.Sprite.fromFrame("carry_shadow.png");
	this.shadow.anchor.x = this.shadow.anchor.y = 0.5;
	
	this.jumpDistance = 100 + Math.random() * 300;
	
	//this.shadow.position = this.position;
	this.interactive = true;
	
	this.touchstart = this.mousedown;
	this.touchend = this.mouseup;
}

// constructor
GAME.Goody.constructor = GAME.Goody;
GAME.Goody.prototype = Object.create( PIXI.Sprite.prototype );


GAME.Goody.prototype.update = function()
{
	if(this.state == 0)
	{
		this.z += (40 - this.z ) * 0.3;
		this.lastPosition.x = this.realPosition.x;
		this.lastPosition.y = this.realPosition.y;
		
		this.realPosition.x += ( this.mouse.global.x - this.realPosition.x ) * 0.3;
		this.realPosition.y += ( this.mouse.global.y + 15 - this.realPosition.y + this.z ) * 0.3;
		
		this.throwSpeed.x += (this.realPosition.x - this.lastPosition.x) - this.throwSpeed.x * 0.3;
		this.throwSpeed.y += (this.realPosition.y - this.lastPosition.y) - this.throwSpeed.y * 0.3;
		
		this.rotation = this.throwSpeed.x * 0.01;
		
		this.direction.x = this.elkTarget.x - this.position.x;
		this.direction.y = this.elkTarget.y - 40 - this.position.y;
		
		if(	this.direction.x * this.direction.x + this.direction.y * this.direction.y < 70 * 70)
		{
			gameScreen.enemyManager.disperce();
			this.isDead = true;
			 gameScreen.life += 10;
			 stage.addChild(explosion);
			 if(gameScreen.life>100)gameScreen.life = 100;
			
		}
	}
	else if(this.state == 1)
	{
		
		
		if(this.realPosition.y < 300)
		{
			var diff = this.realPosition.y - 300;
			this.realPosition.y = 299;
			this.zSpeed += 0.1;
			this.z += -this.throwSpeed.y * GAME.time.DELTA_TIME;
		}
		else
		{
		
			this.zSpeed += 0.2;
			this.realPosition.y += this.throwSpeed.y * GAME.time.DELTA_TIME;
		
		}
			this.throwSpeed.y *= 0.97;
			this.zSpeed += 0.2;
			this.z -= this.zSpeed;
			
			this.throwSpeed.x *= 0.97;
			this.realPosition.x += this.throwSpeed.x  * GAME.time.DELTA_TIME;
	
		if(this.bounce == 0)
		{
		//	this.rotation = Math.atan2(this.throwSpeed.y, this.throwSpeed.x);
		//	if(this.scale.x == -1) 	this.rotation += Math.PI;
		}
		else
		{
			this.rotation = 0;
		//	this.scale.x = (this.throwSpeed.x < 0) ? -1 : 1;
		}
		
		
		if(this.realPosition.x < 0 || this.realPosition.x > GAME.width)
		{
			// dead!
			this.isDead = true;
		}
		else if(this.position.y < 0 || this.position.y  > GAME.height)
		{
			// dead!
			this.isDead = true;
		}
		else
		{
			this.direction.x = this.elkTarget.x - this.position.x;
			this.direction.y = this.elkTarget.y - 40 - this.position.y;
			
			if(	this.direction.x * this.direction.x + this.direction.y * this.direction.y < 70 * 70)
			{
				gameScreen.enemyManager.disperce();
				 gameScreen.life += 10;
				 stage.addChild(explosion);
				 if(gameScreen.life>100)gameScreen.life = 100;
				this.isDead = true;
			}
		}
		
		if(this.z < 0)
		{
			this.z = 0;
			this.zSpeed *= -0.8;
			this.throwSpeed.x *= 0.92;
			this.throwSpeed.y *= 0.92;
			
			if(this.realPosition.y == 299)
			{
				this.throwSpeed.y = 0;
				this.zSpeed *= 0.65
				this.realPosition.y = 300;
			}
			
			this.bounce++;
			//this.setTexture(this.flatFrame);
			
			
			if(this.bounce > 2)
			{
				this.state = 4;
				this.rotation = 0;
			//	this.setTexture(this.flatFrame);
				
			}
		}
		

			
	
	}
	else if(this.state == 2)
	{
		this.z = 40;
		this.state = 1;
		// dashing!
		this.direction.x = this.elkTarget.x - this.realPosition.x;
		this.direction.y = this.elkTarget.y - this.realPosition.y;
		
		var dist = Math.sqrt(this.direction.x * this.direction.x + this.direction.y * this.direction.y)
				
		if(dist < 40)
		{
			// 
			
			this.isDead = true;
		}
		//
		//this.rotation = this.direction.y * -0.4;
	}
	else if(this.state == 3)
	{
		


	}
	else if(this.state == 4)
	{
		// check speed!
	}
	else if(this.state == 5)
	{
		// eating!
		

		//this.
//		 this.realPosition.x 
	}
	else if(this.state == 6)
	{
		// LEAVING!
		this.setTexture(this.sittingFrame);
	}
	
	this.position.x = this.realPosition.x;
	this.position.y = this.realPosition.y - this.z;
	
	this.shadow.position.x = this.realPosition.x;
	this.shadow.position.y = this.realPosition.y + 30;// + this.z + 20;// + this.z;
	
	
		var scale = 0.8 + (1-(this.z/30)) * 0.2 
	if(scale < 0)scale = 0;
	this.shadow.scale.x = this.shadow.scale.y = scale;
	this.shadow.alpha = (this.z / 40) * 0.5//(1-(this.z/20) - this.shadow.alpha) * 0.2
	if(this.shadow.alpha > 1)this.shadow.alpha = 1;
}

GAME.Goody.prototype.mousedown = function(mouse)
{
	//if(this.state == 3)return;
	this.mouse = mouse;
	
	this.setTexture(this.pickedupFrame);
	
	//this.alpha = 0.5
	this.state = 0
	
	
}

GAME.Goody.prototype.mouseup = function(mouse)
{
	if(this.state == 3)return;
	this.state = 1
	this.bounce = 0
	//this.alpha = 1;
	this.pickedup = false;
	this.setTexture(this.throwFrame);
	
	this.throwSpeed.x = this.realPosition.x - this.lastPosition.x;
	this.throwSpeed.y = this.realPosition.y - this.lastPosition.y;
	
	if(this.throwSpeed.x * this.throwSpeed.x + this.throwSpeed.y * this.throwSpeed.y < 5)
	{
		
	}
	
	if(this.realPosition.y < 300)
	{
		var diff = this.realPosition.y - 300;
		this.realPosition.y  = 300;
		this.z = -diff;
	}
	
	this.zSpeed = -4
		
}
