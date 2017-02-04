var GAME = GAME || {};

GAME.Score = function()
{
	PIXI.DisplayObjectContainer.call( this );
	this.ratio = 0;
	this.interactive = false;
	
	this.glyphs = {
			0:"no0000.png",
			1:"no0001.png",
			2:"no0002.png",
			3:"no0003.png",
			4:"no0004.png",
			5:"no0005.png",
			6:"no0006.png",
			7:"no0007.png",
			8:"no0008.png",
			9:"no0009.png"
	}
	
	for(i in this.glyphs)this.glyphs[i] = PIXI.Texture.fromFrame(this.glyphs[i]);
	
	this.digits = [];
	
	for ( var i = 0; i < 8; i++) 
	{
		this.digits[i] = new PIXI.Sprite(this.glyphs[i]);
		this.addChild(this.digits[i]);
	}
	
	this.setScore(formatScore(12345))
}


GAME.Score.constructor = PIXI.Score;
GAME.Score.prototype = Object.create( PIXI.DisplayObjectContainer.prototype );

GAME.Score.prototype.setScore = function(score)
{
	var split = formatScore(score).split("");
	var position = 0;
	var gap = 10;
	// Score
	for ( var i = 0; i < split.length; i++) 
	{
		var digit = this.digits[i];
		digit.visible = true;
		digit.setTexture(this.glyphs[split[i]]);
		digit.position.x = position; 
		position += digit.width + gap;
	}
	
	for ( var i = 0; i < this.digits.length; i++) 
	{
		this.digits[i].position.x -= position/2;
	}
	
	for ( var i = split.length; i < this.digits.length; i++) 
	{
		this.digits[i].visible = false;
	}
}

GAME.Score.prototype.jump = function()
{
	this.ratio = 2.2;
}

function formatScore(n)
{
	
	var nArray = n.toString().split("");
	var text = "";
	var total = nArray.length;
	
	var offset = (total % 3)-1;
	for(var i = 0; i < total; i++)
	{
		text += nArray[i];
		if((i - offset) % 3 == 0 && i != total-1)text+="";	
	}
	
	return text;
}