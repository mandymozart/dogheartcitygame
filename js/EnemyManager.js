/**
 * @author Mat Groves
 */

/**
 * @author Mat Groves
 */

var GAME = GAME || {};

var laserCount = 0;

GAME.EnemyManager = function(engine)
{
	this.engine = engine;
	
	this.enemies = [];
	
	this.enemyPool = new GAME.GameObjectPool(GAME.Enemy);
	
	this.spawnCount = 0;
	this.spawnRate = 100;
	this.spawnRate2 = 300;
	this.levelCount = 0;
	this.levelUp = 60 * 8;
	this.speed = 1;
	this.mode = 0;
	this.level = 0;
	this.ang = 0;
	
//	this.addEnemy( 300, 300);	
}

// constructor
GAME.EnemyManager.constructor = GAME.EnemyManager;

GAME.EnemyManager.prototype.update = function()
{
	for (var i = 0; i < this.enemies.length; i++) 
	{
		var enemy = this.enemies[i]
		enemy.update();
		
		if(enemy.isDead)
		{
			gameScreen.score += 50;
			this.enemyPool.returnObject(enemy);
			this.enemies.splice(i, 1);
			i--;
			interactiveManager.remove(enemy);
			this.engine.gameContainer.removeChild(enemy);
			this.engine.shadowContainer.removeChild(enemy.shadow);
		}
		/*	this.enemyPool.returnObject(enemy);
			this.enemies.splice(i, 1);
			
			this.engine.view.gameFront.removeChild(enemy.view);
			i--;
		}*/
	}
	
	if(this.engine.isGameover)return;
	
	this.levelCount++;
	if(this.levelCount > this.levelUp)
	{
		this.levelCount = 0;
		this.speed += 0.1;
		this.level++;
		
		if(this.level % 5)
		{
			//	this.mode++;
			//	this.mode %= 2;
		}
		
		if(this.level == 5)
		{
		//	this.spawnRate *= isMobile ? 0.7 : 0.99;
		//	this.spawnRate *= isMobile ? 0.7 : 1;
		}
		this.spawnRate *= isMobile ? 0.7 : 0.9;
	}
	
	if(this.mode == 0)
	{
		this.spawnCount += GAME.time.DELTA_TIME;
		
		if(this.spawnCount >= this.spawnRate)
		{
			this.spawnCount = 0;
		
			if(Math.random() > 0.33333333)
			{
				if(Math.random() > 0.5)
				{
					this.addEnemy(-60, 310 + Math.random() * (GAME.height-310));	
				}
				else
				{
					this.addEnemy( GAME.width + 60, 310 + Math.random() * (GAME.height -310));	
				}
			}
			else
			{
				
				this.addEnemy(Math.random() * GAME.width, GAME.height);	
			}
		}
		
		//if(this.levelCount % 5 == 0)this.mode = 1;
	}
	else if(this.mode == 1)
	{
		this.spawnCount += GAME.time.DELTA_TIME;
		
		if(this.spawnCount >= this.spawnRate * 0.8)
		{
			//console.log( this.spawnRate2)
			this.spawnCount = 0;
			this.ang ++;
			
			
			var total = 100// + this.levelCount;
			this.ang %= total;
			var ang = this.ang/total;
			ang *= Math.PI * 2;
			
			var xpos = Math.sin( ang - Math.PI / 2);
			var ypos = Math.cos( ang - Math.PI / 2);
			this.addEnemy(GAME.width/2 + xpos * GAME.width/1.2,GAME.height/2 +  ypos * GAME.height/1.2);	
			
		}
	}
	else if(this.mode == 2)
	{
		this.spawnCount += GAME.time.DELTA_TIME;
		
		if(this.spawnCount >= this.spawnRate)
		{
			this.spawnCount = 0;
			for (var i=0; i < 10; i++) 
			{
				this.addEnemy(Math.random() * GAME.width, GAME.height);	
			};
		}
	}
//	help.innerHTML =  this.enemies.length;
}

GAME.EnemyManager.prototype.addEnemy = function(x, y)
{
	var enemy = this.enemyPool.getObject();
	enemy.realPosition.x = x;
	enemy.realPosition.y = y;
	enemy.elkTarget = this.engine.elk.position;
	
	enemy.speed = this.speed;
	if(this.level % 5 == 0)
	{
	//	enemy.speed *= 1.3;	
	}
	
	interactiveManager.add(enemy);
	
	this.enemies.push(enemy);
	this.engine.gameContainer.addChild(enemy);
	this.engine.shadowContainer.addChild(enemy.shadow);
}

GAME.EnemyManager.prototype.pickup = function(x, y)
{
	
}

GAME.EnemyManager.prototype.disperce = function()
{
	for (var i = 0; i < this.enemies.length; i++) 
	{
		var enemy = this.enemies[i];
		enemy.pushAway();	
	}
	
}

GAME.EnemyManager.prototype.destroyAll = function()
{
	for (var i = 0; i < this.enemies.length; i++) 
	{
		var enemy = this.enemies[i];
		this.enemyPool.returnObject(enemy);
		this.enemies.splice(i, 1);
		i--;
		interactiveManager.remove(enemy);
		this.engine.gameContainer.removeChild(enemy);
		this.engine.shadowContainer.removeChild(enemy.shadow);
	}
	
	this.speed = 1;
	this.spawnCount = 0;
	this.spawnRate = 100;
	this.levelCount = 0;
	this.levelUp = 60 * 10;
	this.level = 0;
}

