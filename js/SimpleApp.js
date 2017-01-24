var GAME = {};

SimpleApp = function(container)
{
	this.container = container;
	this.screens = {};
	this.currentScreen;
	this.fading = false;
	
	this.w = $(window).width(); 
	this.h = $(window).height(); 
}

SimpleApp.constructor = SimpleApp;

SimpleApp.prototype.gotoScreenByID = function(id)
{
	this.gotoScreen(this.screens[id]);
}

SimpleApp.prototype.gotoScreen = function(screen, instant)
{
	if(this.currentScreen == screen)return;
	
	this.nextScreen = screen;
	
	if(this.fading)return;
		//console.log("!!")
	
	this.fading = true;
	if(this.currentScreen)
	{
		if(instant)
		{
			TweenLite.to(this.currentScreen, 0, {alpha:0, onComplete:$.proxy(this.onFadeout, this)})
		}
		else
		{
			TweenLite.to(this.currentScreen, 0.4, {alpha:0, onComplete:$.proxy(this.onFadeout, this)})
		}
		// hide!
		// tween out on faded... show next!
		
	}
	else
	{
		this.onFadeout();
	}
}

SimpleApp.prototype.onFadeout = function()
{
	if(this.currentScreen)
	{
		if(this.currentScreen.onHidden)this.currentScreen.onHidden();
		this.container.removeChild(this.currentScreen);
	}
	this.currentScreen = this.nextScreen;
	this.currentScreen.alpha = 0;
	if(this.currentScreen.resize)this.currentScreen.resize(this.w, this.h);
	TweenLite.to(this.currentScreen, 0.4, {alpha:1, onComplete:$.proxy(this.onFadein, this)})
	this.container.addChildAt(this.currentScreen, 0);
	
}

SimpleApp.prototype.onFadein = function()
{
	this.fading = false;
	if(this.currentScreen.onShown)this.currentScreen.onShown();
	
	if(this.currentScreen != this.nextScreen)
	{
		this.gotoScreen(this.nextScreen);
	}
}

SimpleApp.prototype.resize = function(w, h)
{
	this.w = w;
	this.h = h;
	if(this.currentScreen)if(this.currentScreen.resize)this.currentScreen.resize(w, h);
}
