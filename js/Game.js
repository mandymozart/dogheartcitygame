var GAME = {};

// green 7ebf74
// turq 41bcaf
// yellow d6df24
// pink f28db3
// purp 584087
var backgroundColors = [ 0x7ebf74, 0x41bcaf, 0xcd6df24, 0xf28db3, 0x584087];
var backgroundColorsName = ["healthFrame_green.png", 
							"healthFrame_turq.png",
							"healthFrame_yellow.png",
							"healthFrame_pink.png",
							"healthFrame_purple.png"]
							
var backgroundColorsName2 = ["img/BG_col_01.png", 
							"img/BG_col_02.png",
							"img/BG_col_03.png",
							"img/BG_col_04.png",
							"img/BG_col_05.png"];

var treePositions = [-22, 102,
					 12, 56,
					 74, 70,
					 118, 84,
					 296, 74,
					 764, 50,
					 
					  802, 56,
					   838, 62,
					    948, 52,
					     978, 82]
var colorPos = 0;

GAME.time = new Time();

// Prevent player from submitting same score (get's cancelled on restart)
GAME.alreadySubmitted = false;

// Sounds
GAME.siren = new Audio('audio/siren.mp3');

GAME.Game = function()
{
	GAME.width = 1024;
	GAME.height = 690;
	
	PIXI.DisplayObjectContainer.call(this);
	this.bgContainer = new PIXI.DisplayObjectContainer();
	
	this.bpm = 0;
	
	// clouds!
	this.clouds = [];
	for (var i=0; i < 3; i++) 
	{
	 	var cloud = PIXI.Sprite.fromFrame("cloud.png");
	 	this.bgContainer.addChild(cloud);
	 	cloud.position.y = 10 + 50 + Math.random() * 60;
	 	cloud.position.x = (1024 / 3) * i + Math.random() * 100;
	 	cloud.speed = 1 + Math.random() * 2;
	 	cloud.speed *= 0.1;
	 	cloud.anchor.x = cloud.anchor.y = 0.5 
	 	this.clouds.push(cloud);
	};
	
	this.bgContainer.interactive = false;
	
	this.shadowContainer = new PIXI.DisplayObjectContainer();
	this.gameContainer = new PIXI.DisplayObjectContainer();
	
	//this.gameContainer.updateTransform = depthSwapUpdateTransform;
	
	this.damage = 0;
	this.score = 0;
		
	// hud
	this.life = 100;
	
	this.lifeBar = new LifeBar();
	this.lifeBar.position.x = GAME.width/2 - 271/2;
	this.lifeBar.position.y = GAME.height - 50;
	
	this.gameoverView = new GameoverOverlay();
	
	this.addChild(this.bgContainer);
	this.addChild(this.shadowContainer);
	this.addChild(this.gameContainer);
	this.addChild(this.lifeBar);
	
	this.elk = new GAME.Elk();//PIXI.Sprite.fromFrame("deer.png");		
	
	this.elk.position.x = GAME.width/2;
	this.elk.position.y = GAME.height/2 + 50;
	
	this.enemyManager = new GAME.EnemyManager(this);
	this.goodyManager = new GAME.GoodyManager(this);
	
	this.addChild(this.elk);
	
	this.isGameover = false;
	
	this.scoreView = new GAME.Score();
	this.scoreView.position.x = GAME.width/2;
	this.scoreView.position.y = 20;
	this.addChild(this.scoreView);

	this.white = PIXI.Sprite.fromImage("img/whiteSquare.png");
	this.white.scale.x = GAME.width / 10;
	this.white.scale.y = GAME.height / 10;
	


	this.trees = [];
	
	// trees!
	for (var i=0; i < treePositions.length/2; i++) 
	{
	 	var tree = PIXI.Sprite.fromFrame( i % 2 ? "bigben.png" : "gherkin.png");
	 	this.bgContainer.addChild(tree);
	 	tree.anchor.x = 0.5;
	 	tree.anchor.y = 1;
	 	tree.random = Math.random();
	 	tree.position.x = treePositions[i*2] + 68/2;
	 	tree.position.y = treePositions[i*2 + 1] + 218;
	 	
	 	this.trees.push(tree);
	};
	
	var shed = PIXI.Sprite.fromFrame( "london_eye.png");
	shed.position.x = 171;
	shed.position.y = 204 + 88 + 10;
	shed.anchor.x = 0.5;
	shed.anchor.y = 1;
	this.bgContainer.addChild(shed);
	shed.random = -1//Math.random();
	this.trees.push(shed);
	/*this.square = PIXI.Sprite.fromImage("img/square.png");
	this.square.hitScale = 1.5;
	this.square.position.x = 300;
	this.square.position.y = 300;
	this.square.anchor.x = 0.5;
	this.square.anchor.y = 1;
	this.square.mousedown = function(){ this.alpha = 0.5 };
	this.square.mouseup = function(){ this.alpha = 1};
	
	
	
	stage.addChild(this.square);
	
	interactiveManager.add(this.square);*/
	
	blood = new GAME.BloodSpray(this.elk);
	
	explosion = new GAME.ExplosionAnimationNoHand();
	explosion.position.x = this.elk.position.x;
	explosion.position.y = this.elk.position.y - 100;
}

GAME.Game.constructor = GAME.Game;
GAME.Game.prototype = Object.create( PIXI.DisplayObjectContainer.prototype ); 


GAME.Game.prototype.onShown = function()
{
	//stage.setBackgroundColor(backgroundColors[colorPos % backgroundColors.length]);
	this.lifeBar.frame.setTexture(PIXI.Texture.fromFrame(backgroundColorsName[colorPos % backgroundColors.length]));
}

GAME.Game.prototype.start = function()
{
	
}

GAME.Game.prototype.gameover = function()
{
	this.isGameover = true;
	this.enemyManager.disperce();
	blood.reset();
	this.addChild(this.gameoverView);
	this.gameoverView.show();
	
	this.gameoverView.onContinue = $.proxy(this.restart, this);
}

GAME.Game.prototype.restart = function()
{
	//this.addChild(this.hand);
	//this.hand.tap();
	hand.position.y = GAME.height/2 - 20;
	stage.addChild(hand);
	// Prevent player from submitting same score twice
	GAME.alreadySubmitted = false;
	setTimeout(this.onHandTap.bind(this), 600)
	//(this.onHandTap)
}

GAME.Game.prototype.onHandTap = function()
{
	
	this.gameoverView.hide();
	this.score = 0;
	//this.removeChild(this.gameoverView);
	//this.addChild(this.white);
	//this.white.alpha = 0;
	//TweenLite.to(this.white, 0.6, {alpha:1, onComplete:$.proxy(this.onGameoverFade, this)})
	
	colorPos++;
	
	
	transition.onComplete = this.onGameoverFade.bind(this);
	transition.onCompleteReal = this.onGameoverFadeIn.bind(this);
	
	
	transition.start(colorPos % backgroundColors.length);
}

GAME.Game.prototype.onGameoverFade = function()
{
	
	this.life = 100;
	this.lifeBar.bar.scale.x = (this.life / 100) * 0.92;
	//stage.setBackgroundColor(backgroundColors[colorPos % backgroundColors.length]);
	this.lifeBar.frame.setTexture(PIXI.Texture.fromFrame(backgroundColorsName[colorPos % backgroundColors.length]));
	
	this.elk.reset();
	
	this.enemyManager.destroyAll();
	this.goodyManager.destroyAll();
	
	this.removeChild(this.gameoverView);
		
	//TweenLite.to(this.white, 0.3, {alpha:0, delay:0.5, onComplete:$.proxy(this.onGameoverFadeIn, this)})

}


GAME.Game.prototype.onGameoverFadeIn = function()
{
	this.isGameover = false;
	
	
}


GAME.Game.prototype.update = function()
{
	GAME.time.update();
	
	// trees!
	this.bpm += GAME.time.DELTA_TIME * 1;
	// musical tree!
	var sin = Math.sin(this.bpm * 0.1);
	var cos = Math.cos(this.bpm * 0.1);
	for (var i=0; i < this.trees.length; i++) 
	{
		var tree = this.trees[i];
		tree.scale.x = 0.95 + sin * 0.05;
		tree.scale.y = 0.95 + sin * -0.05;
		tree.rotation = Math.cos(this.bpm * 0.1 * 0.5) * 0.05 * (0.5 + tree.random * 0.5);
	};
	
	this.damage = 0;
	this.elk.update();
	blood.update();
	this.enemyManager.update();
	this.goodyManager.update();
	
	this.elk.position.x = GAME.width/2 + Math.sin(this.life * 5) * 5;
	
	for (var i=0; i < this.clouds.length; i++) 
	{
	 	var cloud = this.clouds[i];
	 	cloud.position.x -= cloud.speed * GAME.time.DELTA_TIME;
	 	cloud.scale.x = cloud.scale.y = 0.98 + cos * 0.02;
	 	if(cloud.position.x < -160)cloud.position.x += GAME.width +260;
	 	
	 }
	 
	 if(this.isGameover)return;
	
	this.life -= this.damage * 0.1 * GAME.time.DELTA_TIME;
	if(this.life < 0)
	{
		this.gameover();
		// GAME OVER!
		this.elk.die();//elksetTexture(PIXI.Texture.fromFrame("ohdeer.png"))
	}
	
//	 console.log(Math.sin(Math.PI/2));
	this.scoreView.setScore(this.score);
	console.log(this.score)
	this.lifeBar.bar.scale.x = (this.life / 100) * 0.92;
	
	//
	var item = GAME.bonusArray[0];
	if(item)
	{
		if(item.life < 0)
		{
			item.parent.removeChild(item);
			GAME.bonusArray.splice(0, 1);
			GAME.bonusPool.returnObject(item);
		}
	}

}

GAME.Game.prototype.resize = function(w, h)
{
	GAME.width = w;
	GAME.height = h;
	
	this.gameoverView.resize(w, h);
}

var depthSwapUpdateTransform = function()
{
	var parent = this.parent;
	
	PIXI.DisplayObject.prototype.updateTransform.call( this );
	
	this.children.sort(sortFunction);

	for(var i=0,j=this.children.length; i<j; i++)
	{
		this.children[i].updateTransform();	
	}
}

var sortFunction = function(x, y)
{
    return x.position.y - y.position.y;
}

