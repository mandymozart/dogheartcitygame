/**
 * @author Mat Groves
 */

/**
 * @author Mat Groves
 */

var GAME = GAME || {};

var laserCount = 0;

GAME.GoodyManager = function(engine)
{
	this.engine = engine;
	
	this.goodies = [];
	
	this.goodyPool = new GAME.GameObjectPool(GAME.Goody);
	
	this.spawnCount = 0;
	this.spawnRate = 700;
	this.levelCount = 0;
	this.levelUp = 60 * 10;
//	this.addEnemy( 300, 300);	
}

// constructor
GAME.GoodyManager.constructor = GAME.GoodyManager;

GAME.GoodyManager.prototype.update = function()
{
	for (var i = 0; i < this.goodies.length; i++) 
	{
		var goody = this.goodies[i]
		goody.update();
		
		if(goody.isDead)
		{
			this.goodyPool.returnObject(goody);
			this.goodies.splice(i, 1);
			i--;
			interactiveManager.remove(goody);
			this.engine.gameContainer.removeChild(goody);
			this.engine.shadowContainer.removeChild(goody.shadow);
			
		}
		/*	this.enemyPool.returnObject(enemy);
			this.enemies.splice(i, 1);
			
			this.engine.view.gameFront.removeChild(enemy.view);
			i--;
		}*/
	}
	
	if(this.engine.isGameover)return;
	
	
	
	this.spawnCount+= GAME.time.DELTA_TIME;
		
	if(this.spawnCount >= this.spawnRate)
	{
		this.spawnCount = 0;
		
			this.addEnemy(100 + Math.random() * GAME.width-200, 310 + Math.random() * (GAME.height - 310));	
			
	}
	
	//help.innerHTML =  this.goodies.length;
}

GAME.GoodyManager.prototype.addEnemy = function(x, y)
{
	var goody = this.goodyPool.getObject();
	goody.realPosition.x = x;
	goody.realPosition.y = y;
	goody.elkTarget = this.engine.elk.position;
	
	interactiveManager.add(goody);
	
	this.goodies.push(goody);
	this.engine.gameContainer.addChild(goody);
	this.engine.shadowContainer.addChild(goody.shadow);
}

GAME.GoodyManager.prototype.pickup = function(x, y)
{
	
}

GAME.GoodyManager.prototype.disperce = function()
{
	for (var i = 0; i < this.goodies.length; i++) 
	{
		var goody = this.goodies[i];
		goody.state = 6;	
	}
	
}

GAME.GoodyManager.prototype.destroyAll = function()
{
	for (var i = 0; i < this.goodies.length; i++) 
	{
		var goody = this.goodies[i];
		this.goodyPool.returnObject(goody);
		this.goodies.splice(i, 1);
		i--;
		interactiveManager.remove(goody);
		this.engine.gameContainer.removeChild(goody);
		this.engine.shadowContainer.removeChild(goody.shadow);
	}
	
}

