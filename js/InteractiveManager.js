var interactiveItems

var Interactive = function ()
{
	var items = [];
	var currentItem = null;
	var tempPoint = new PIXI.Point();
	var tempMatrix = mat3.create();
	
	this.add = function(sprite)
	{
		items.push(sprite);
	}
	
	this.remove = function(sprite)
	{
		var index = items.indexOf( sprite );
		if ( index !== -1 )items.splice( index, 1 );
	}
	
	this.hitTest = function(point)
	{
		console.log( items.length);
		for (var i=0; i < items.length; i++) 
		{
			var item = items[i];
			
			mat3.inverse(item.worldTransform, tempMatrix);
			
			tempPoint.x = tempMatrix[0] * mouse.x + tempMatrix[1] * mouse.y + tempMatrix[2]; 
			tempPoint.y = tempMatrix[4] * mouse.y + tempMatrix[3] * mouse.x + tempMatrix[5];
			
			var modWidth = item.width * item.hitScale;
			
			var diffX =  modWidth - item.width ;
			
			var x1 = (-item.width * item.anchor.x) - diffX * 0.5;
			
			if(tempPoint.x > x1 && tempPoint.x < x1 + modWidth)
			{
				var modHeight = item.height * item.hitScale;
				var diffY =  modHeight - item.height;
				var y1 = (-item.height * item.anchor.y) - diffY * 0.5;
			
			
				if(tempPoint.y > y1 && tempPoint.y < y1 + modHeight)
				{
					// hit!
					return item;
				}
			}
		}
		
		return null;
	}
	
	this.mousedown = function()
	{
		currentItem = this.hitTest();
		if(currentItem)
		{
			currentItem.mousedown();
		}
	}
	
	this.mouseup = function()
	{
		if(currentItem)
		{
			currentItem.mouseup();
		}
	}
}