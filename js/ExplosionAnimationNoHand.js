/**
 * @author Mat Groves
 */




GAME.ExplosionAnimationNoHand = function()
{
		      
	PIXI.DisplayObjectContainer.call(this);//
	
	this.sprites = [];
	for (var i in boomMap) 
	{
		var data = boomMap[i];
		var sprite = PIXI.Sprite.fromFrame(data.view + ".png");
		this.addChild(sprite);
		data.sprite = sprite;
		sprite.visible = false;
	};
	
	this.currentFrame = 0;
	
	
}

// constructor
GAME.ExplosionAnimationNoHand.constructor = GAME.ExplosionAnimationNoHand;
GAME.ExplosionAnimationNoHand.prototype = Object.create( PIXI.DisplayObjectContainer.prototype );

GAME.ExplosionAnimationNoHand.prototype.updateTransform = function()
{
	
	this.currentFrame += 0.5 * GAME.time.DELTA_TIME;
//	this.currentFrame %= 45;
	if(this.currentFrame >= 10)
	{
		this.currentFrame = 0;
		this.parent.removeChild(this);
		return;
	}
	
	var position = this.currentFrame//(stage.interactionManager.mouse.global.x / GAME.width) * 45/// //this.currentFrame;
	
	position = Math.round(position);
	
	for(var i in boomMap)
	{
		var data = boomMap[i];
	
		
		if(position >= data.startFrame && position < data.endFrame)
		{
			//trace(">>")
			data.sprite.visible = true;
			//data.sprite.alpha  =0.5;
			var frameindex = position-data.startFrame;
			var lowIndex = Math.floor(frameindex);
			var highIndex = Math.round(frameindex);
			
			var ratio = frameindex - lowIndex;
			
			// x pos
			var positionX1 =  data.position[lowIndex * 2];
			var positionX2 =  data.position[highIndex * 2];
			
			var interX = positionX1 + (positionX2 - positionX1) * ratio;
			
			// y pos
			
			var positionY1 =  data.position[lowIndex * 2 + 1];
			var positionY2 =  data.position[highIndex * 2 + 1];
			
			var interY = positionY1 + (positionY2 - positionY1) * ratio;
			
			data.sprite.position.x = positionX1// interX
			data.sprite.position.y = positionY1//interY
			
			var interScaleX = 1;
			var interScaleY = 1;
			
			if(data.scale)
			{
				var scaleX1 =  data.scale[lowIndex * 2];
				var scaleX2 =  data.scale[highIndex * 2];
				
				interScaleX = scaleX1 + (scaleX2 - scaleX1) * ratio;
				
				var scaleY1 =  data.scale[lowIndex * 2 + 1];
				var scaleY2 =  data.scale[highIndex * 2 + 1];
				
				interScaleY = scaleY1 + (scaleY2 - scaleY1) * ratio;
			}
			
			data.sprite.scale.x = interScaleX;
			data.sprite.scale.y = interScaleY;
			
			
			var interAlpha = 1;
			
			if(data.alpha)
			{
				var alpha1 =  data.alpha[lowIndex];
				var alpha2 =  data.alpha[highIndex];
				
				
				interAlpha = alpha1 + (alpha2 - alpha1) * ratio;
				
			}
			
			data.sprite.alpha = interAlpha
			
			if(data.rotation)
			{
				
				var rotation1 =  data.rotation[lowIndex];
				var rotation2 =  data.rotation[highIndex];
				
				interRotation = rotation1 + (rotation2 - rotation1) * ratio;
				data.sprite.rotation = interRotation * (Math.PI / 180)
			}
		

		}
		else
		{
			data.sprite.visible = false;
			
		}
	}

	
	PIXI.DisplayObjectContainer.prototype.updateTransform.call(this)
}
