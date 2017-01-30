GAME.Highscores = function () {

}


// constructor
GAME.Highscores.constructor = GAME.Highscores;

GAME.Highscores.prototype.render = function(){
	// Clear
	scoresTable = $('#scores-table');
	scoresTable.html('');

	i = 0;
	$.each(API.scores, function(k,score){
		i++;
		// console.log(score.name);
		scoresTable.append('<tr><td>#'+i+'</td><td>'+score.score+'</td><td>'+score.name+'</td></tr>');
	})
}

// helper
GAME.Highscores.prototype.validEmail = function(v) {
	if(v=='') return false;
    var r = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
    return (v.match(r) == null) ? false : true;
}

GAME.Highscores.prototype.show = function () {
	if(GAME.alreadySubmitted == true) {
		alert('You just submitted this score! Play again to re-enter the competiton!');
		console.warn('You just submitted this score. Play again to enter the competition!');
		return;
	}

	console.log('Highscores::show')
	
	var ranked = false;

	$.each(API.scores, function(key, score){
		console.log(score.score);
		if(score.score < gameScreen.score) {
			ranked = true;
			
		} 
	})

	// Check if 5th position of high score list is smaller than gameScreen score of current user
	if (ranked) {
		console.log('Highscores::Congratulations, you ranked in the highscores top 5! Hurray!');
		/* We will need to go through jQuery here to get user input via the slide out. */
		// Update score
		$('#submit-score').text(gameScreen.score);
		// Display slide-out
		$('body').addClass('show-submit');
		nameInput = $('#submit-name');
		emailInput = $('#submit-email');
		twitterInput = $('#submit-twitter');
		facebookInput = $('#submit-facebook');
		instagramInput = $('#submit-instragram');

		// Submit actions
		$('#submit-button').click(function(e){
			errors = [];
			e.preventDefault();
			// Get values
			name = nameInput.val();
			email = emailInput.val();
			facebook = facebookInput.val();
			twitter = twitterInput.val();
			instagram = instagramInput.val();
			// Evaluate errors
			if(name == '') {
				nameInput.addClass('invalid');
				errors.push ('Name can not be empty! ');
			} else {
				nameInput.removeClass('invalid');
			}
			if(!GAME.Highscores.prototype.validEmail(email)) { // unknown why this.validEmail wont catch
				emailInput.addClass('invalid');
				errors.push('Email is not in a valid format! ');
			}
			
			if(errors.length == 0){
				$('#submit-form').removeClass('has-errors');
				$('#submit-email').removeClass('has-errors');
				$('#submit-name').removeClass('has-errors');
				// Prepare Score Object to submit internally
				var scoreObject = {};
				scoreObject.score = gameScreen.score;
				scoreObject.name = name;
				scoreObject.email = email;
				scoreObject.facebook = facebook;
				scoreObject.twitter = twitter;
				scoreObject.instgram = instagram;
				GAME.Highscores.prototype.saveScore(scoreObject);

			} else {
				$('#submit-form .error-messages').text(errors.join());
				$('#submit-form').addClass('has-errors');
			}
		})
		// Cancel button
		$('#submit-cancel').click(function(){
			$('body').removeClass('show-submit');
		})

	} else {
		console.log('Highscores::Sorry, no awards for such a low performance! Try again!')
		$('body').addClass('show-highscores');

	}

}


GAME.Highscores.prototype.saveScore = function (scoreObject) {
	API.saveScore(scoreObject)

	// TODO: double check if user is still in highscore while others submit new scores
	$('#highscores .message').text('Congratulations '+scoreObject.name+', you made it in the highscores.')
	// Prevent player from submitting same score (get's cancelled on restart)
	GAME.alreadySubmitted = true;
	// Close submit slide out
	$('body').removeClass('show-submit');
	// Display highscores
	$('body').addClass('show-highscores');

}
