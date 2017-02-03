/**
 * @author Mat Groves
 */



var tempPoint = new PIXI.Point();
var matrix = mat3.create();


GAME.Enemy = function()
{
	this.hitScale = 2//1.25;
	this.count = 0;
	this.walkingFrames = [PIXI.Texture.fromFrame("enemyWalk0001.png"),
					      PIXI.Texture.fromFrame("enemyWalk0002.png"),
					      PIXI.Texture.fromFrame("enemyWalk0003.png"),
					      PIXI.Texture.fromFrame("enemyWalk0004.png"),
					      PIXI.Texture.fromFrame("enemyWalk0005.png")];
					      
	this.pickedupFrames = [PIXI.Texture.fromFrame("enemyHanging0001.png"),
						   PIXI.Texture.fromFrame("enemyHanging0002.png"),
						   PIXI.Texture.fromFrame("enemyHanging0003.png"),
						   PIXI.Texture.fromFrame("enemyHanging0004.png")];
						   
	this.throwFrame = PIXI.Texture.fromFrame("enemyFly.png");
	this.eatingFrame = PIXI.Texture.fromFrame("enemyAttack.png");
	this.flatFrame = PIXI.Texture.fromFrame("enemyFlat.png");
	
	//this.sittingFrame = PIXI.Texture.fromFrame("wolf_sit.png");
	
	this.pounceFrames =  [PIXI.Texture.fromFrame("enemyProne0001.png"),
					      PIXI.Texture.fromFrame("enemyProne0002.png"),
					      PIXI.Texture.fromFrame("enemyProne0003.png"),
					      PIXI.Texture.fromFrame("enemyProne0004.png")];
	
	
	this.walkingFrames.anchor = 0.5;
	//this.pickedupFrame.anchor = 0.25;
	
	PIXI.Sprite.call(this, this.walkingFrames[0]);//
	
	
	this.anchor.x = 0.5;
	this.anchor.y = 1//0.5;
	this.z = 0;
	this.zSpeed = 0;
	
	this.realY = 0;
	this.dashTarget = new PIXI.Point();
	this.elkTarget;
	
	this.state = 2;
	this.realPosition = new PIXI.Point();
	
	this.speed = 1//isMobile ? 1.4  : 1;
	this.throwSpeed = new PIXI.Point();
	this.lastPosition = new PIXI.Point();
	this.direction = new PIXI.Point();
	
	this.shadow = PIXI.Sprite.fromFrame("carry_shadow.png");
	this.shadow.anchor.x = this.shadow.anchor.y = 1;
	
	this.jumpDistance = 140 + Math.random() * 300;
	
	this.eatSpeed = new PIXI.Point(2, 2);
	//this.shadow.position = this.position;
	// mke clickable!
	this.interactive = true;
	
	this.touchstart = this.mousedown;
	this.touchend = this.mouseup;
	this.mouseupOutside = this.mouseup;
	this.touchendOutside = this.mouseup;
}

// constructor
GAME.Enemy.constructor = GAME.Enemy;
GAME.Enemy.prototype = Object.create( PIXI.Sprite.prototype );


GAME.Enemy.prototype.update = function()
{
	if(this.state == 0)
	{
		this.z += (40 - this.z ) * 0.3;
		this.lastPosition.x = this.realPosition.x;
		this.lastPosition.y = this.realPosition.y;
		
		this.realPosition.x += ( this.pointer.global.x - this.realPosition.x ) * 0.3;
		this.realPosition.y += ( this.pointer.global.y + 15 - this.realPosition.y + this.z ) * 0.3;
		
		this.throwSpeed.x += (this.realPosition.x - this.lastPosition.x) - this.throwSpeed.x * 0.3;
		this.throwSpeed.y += (this.realPosition.y - this.lastPosition.y) - this.throwSpeed.y * 0.3;
		
		
		this.rotation = this.throwSpeed.x * 0.01;
		
		this.count += 0.3;
		var round = (this.count + 0.5) | 0;
		this.setTexture(this.pickedupFrames[round % 4]);
		
	
		
		
	}
	else if(this.state == 1)
	{
		// throwing!
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
			this.rotation = Math.atan2(this.throwSpeed.y, this.throwSpeed.x);
			if(this.scale.x == -1) 	this.rotation += Math.PI;
		}
		else
		{
			this.rotation = 0;
		}
		
		
		if(this.realPosition.x < -60 || this.realPosition.x > GAME.width + 60)
		{
			// dead!
			this.isDead = true;
		}
		else if(this.position.y < -20 || this.position.y  > GAME.height + 20)
		{
			// dead!
			this.isDead = true;
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
			this.setTexture(this.flatFrame);
			
			
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
		this.anchor.x = 0.5;
		this.anchor.y = 1//0.5;
		// dashing!
		this.direction.x = this.elkTarget.x - this.realPosition.x;
		this.direction.y = this.elkTarget.y - this.realPosition.y;
		
		var dist = Math.sqrt(this.direction.x * this.direction.x + this.direction.y * this.direction.y)
		
		this.direction.x = this.direction.x/dist;
		this.direction.y = this.direction.y/dist;
		
		this.realPosition.x += this.direction.x * this.speed  * GAME.time.DELTA_TIME;
		this.realPosition.y += this.direction.y * this.speed  * GAME.time.DELTA_TIME;
		
		this.scale.x = (this.direction.x < 0) ? -1 : 1;
		
		this.count += 0.3 * GAME.time.DELTA_TIME;
		var round = (this.count + 0.5) | 0;
		this.setTexture(this.walkingFrames[round % 5]);
		
		if(dist < 40)
		{
			this.state = 5;
			this.setTexture(this.eatingFrame);
		}
		else if(dist < this.jumpDistance)
		{
		
			// pounce! 
			
			this.count = 0;
			this.state = 3;
			this.setTexture(this.pounceFrames[0]);
			this.pounceCount = 0;
			this.homeX = this.realPosition.x;
		}
		//
		//this.rotation = this.direction.y * -0.4;
	}
	else if(this.state == 3)
	{
		// POUNCING!!!!
		
		this.count += 0.3 * GAME.time.DELTA_TIME;
		var round = (this.count + 0.5) | 0;
		if(round > 4)round = 4;
		
		this.setTexture(this.pounceFrames[round % 4]);
		
		this.pounceCount +=  GAME.time.DELTA_TIME;
		if(this.pounceCount >= 60)
		{
			this.setTexture(this.throwFrame);
			
			this.direction.x = this.elkTarget.x - this.realPosition.x;
			this.direction.y = this.elkTarget.y - this.realPosition.y;
		
			var dist = Math.sqrt(this.direction.x * this.direction.x + this.direction.y * this.direction.y)
			
			this.z = Math.sin(((1-(dist/this.jumpDistance)) * Math.PI/2) * 2)  * 50;
			this.direction.x = this.direction.x/dist;
			this.direction.y = this.direction.y/dist;
			
			this.rotation = Math.atan2(this.direction.y, this.direction.x);
			
			if(this.scale.x == -1)
			{
			//	this.rotation *= -1
				this.rotation += Math.PI
			}
			//this.scale.x = 1;
			this.realPosition.x += this.direction.x * 6 * GAME.time.DELTA_TIME;//this.speed;
			this.realPosition.y += this.direction.y * 6 * GAME.time.DELTA_TIME;//this.speed;
			
			if(dist < 40)
			{
				this.state = 5;
				this.anchor.x = 0.5;
				this.anchor.y = 0.5;
				this.setTexture(this.eatingFrame);
				blood.positions.push(this.position);
			}
		}
		else
		{
			this.realPosition.x = this.homeX + Math.sin(this.pounceCount * 0.5) * 5 * this.pounceCount/60;
		}

	}
	else if(this.state == 4)
	{
		// check speed!
		this.throwSpeed.x *= 0.97;
		this.throwSpeed.y *= 0.97;
		
		this.realPosition.x += this.throwSpeed.x * GAME.time.DELTA_TIME;;
		this.realPosition.y += this.throwSpeed.y * GAME.time.DELTA_TIME;
	
		if(this.throwSpeed.x * this.throwSpeed.x + this.throwSpeed.y * this.throwSpeed.y < 0.1)
		{
			this.state = 2;
		}
		
		this.rotation = 0;
	}
	else if(this.state == 5)
	{
		// eating!
		this.rotation += 0.3;
		gameScreen.damage += 1;
		
		//this.realPosition.x += this.eatSpeed.x;
		//this.realPosition.y += this.eatSpeed.y;
		
//		if(this.realPosition.x < )
		//this.
//		 this.realPosition.x 
	}
	else if(this.state == 6)
	{
		// LEAVING!
		
		

		
	//	this.setTexture(this.sittingFrame);
	}
	
	this.position.x = this.realPosition.x;
	this.position.y = this.realPosition.y; //- this.z;
	
	this.shadow.position.x = this.realPosition.x;
	this.shadow.position.y = this.realPosition.y;// + this.z + 20;// + this.z;
	
	var scale = 0.8 + (1-(this.z/30)) * 0.2 
	if(scale < 0)scale = 0;
	this.shadow.scale.x = this.shadow.scale.y = scale;
	this.shadow.alpha = (this.z / 40) * 0.5//(1-(this.z/20) - this.shadow.alpha) * 0.2
	if(this.shadow.alpha > 1)this.shadow.alpha = 1;
}

GAME.Enemy.prototype.pushAway = function()
{
	if(this.state == 5)
	{
		var index = blood.positions.indexOf(this.position);
		blood.positions.splice(index, 1);
	}
	
	this.state = 1
	this.bounce = 0
	//this.alpha = 1;
	this.pickedup = false;
	this.setTexture(this.throwFrame);
	this.anchor.y = this.walkingFrames.anchor;
	
	this.throwSpeed.x = 22 + Math.random() * 5//this.realPosition.x - this.lastPosition.x;
	if(this.realPosition.x < GAME.width/2)this.throwSpeed.x *= -1;
	this.throwSpeed.y = Math.random() * 4//this.realPosition.y - this.lastPosition.y;
	
	if(this.throwSpeed.x * this.throwSpeed.x + this.throwSpeed.y * this.throwSpeed.y < 5)
	{
		
	}
	this.zSpeed = -7
	this.scale.x = (this.throwSpeed.x < 0) ? -1 : 1;
	
}


GAME.Enemy.prototype.mousedown = function(mouse)
{
	//if(this.state == 3)return;
	this.pointer = mouse;
	
	//this.setTexture(this.pickedupFrame);
	this.anchor.y = 0.25//this.pickedupFrame.anchor;
	this.count = 0;
	
	if(this.state == 3)
	{
		// NICE CATCH!
	//	if(this.pounceCount > 60)
		//{
			// leaping!
			var bonus = GAME.bonusPool.getObject();
			bonus.reset(this.position);
			GAME.bonusArray.push(bonus)
			gameScreen.addChild(bonus);
			gameScreen.score += 200;
	//	}
		//else
		//{
			// prone!
			//gameScreen.score += 100;	
		//}
	}
	else if(this.state == 5)
	{
		var index = blood.positions.indexOf(this.position);
		blood.positions.splice(index, 1);
	}
	//this.alpha = 0.5
	this.state = 0
	
	
}

GAME.Enemy.prototype.mouseup = function(mouse)
{
	console.log("IP!!")
	if(this.state == 3)return;
	this.state = 1
	this.bounce = 0
	//this.alpha = 1;
	this.pickedup = false;
	this.setTexture(this.throwFrame);
	this.anchor.y = this.walkingFrames.anchor;
	
	this.throwSpeed.x = this.realPosition.x - this.lastPosition.x;
	this.throwSpeed.y = this.realPosition.y - this.lastPosition.y;
	
	if(this.throwSpeed.x * this.throwSpeed.x + this.throwSpeed.y * this.throwSpeed.y < 5)
	{
		
	}
		
	GAME.siren.play();
	if(this.realPosition.y < 300)
	{
		var diff = this.realPosition.y - 300;
		this.realPosition.y  = 300;
		this.z = -diff;
	}
	
	this.zSpeed = -4
	this.scale.x = (this.throwSpeed.x < 0) ? -1 : 1;
		
}
