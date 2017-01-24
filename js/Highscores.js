GAME.Highscores = function () {

}


// constructor
GAME.Highscores.constructor = GAME.Highscores;

GAME.Highscores.prototype.populateHighscores = function(){
	scoresTable = $('#scores-table');
	scores = this.getScoresFromApi();
	// Clear
	scoresTable.html('');
	console.log(scores);
	i = 0;
	$.each(scores, function(k,score){
		i++;
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
		alert('You just submitted this score! Play again to reenter!');
		return;
	}
	console.warn('You just submitted this score. Play again to enter the competition!');
	var scope = this;

	console.log('Highscores::show')
	console.warn('TODO: connect to server side score list')
	
	var scores = this.getScoresFromApi();
	console.log(scores);

	// Check if 5th position of high score list is smaller than gameScreen score of current user
	if (scores[4].score < gameScreen.score) {
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
				GAME.Highscores.prototype.postScoresToApi(scoreObject);

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
		this.onScoresRecieved.bind(this);
		$('body').addClass('show-highscores');
		this.onScoresRecieved();	

	}

}

/* API communication requirements: 

	- results come shall come in descending order from server
	- only return name and score, no social handles
	- while writing data to the server, these can not be left out

	Attention: remove mock data when integrated
*/
GAME.Highscores.prototype.getScoresFromApi = function() {
	$.ajax(
		{
			type: 'post',
			url: '/',
			dataType: 'json', // expected returned data format.
			success: function (data) {
				return data.scores;
				console.log(data);  

			},
			error: function() {
				return [{ score: '0', name: 'Server', email: 'Error' }];
				console.warn('Highscores::server ajax response not received')
			}
		}
	);

	// TODO: comment out mock data.
	return [
		{ score: '7000', name: 'no' },
		{ score: '5000', name: 'no' },
		{ score: '4000', name: 'no' },
		{ score: '2000', name: 'no' },
		{ score: '0', name: 'no' }
	]
	
}

GAME.Highscores.prototype.postScoresToApi = function (scoreObject) {
	console.log(scoreObject)
	/* This function is the reentry point from the slide out with input fields */
	// post the score to the server
	// Ajax it away
	// $.ajax({
	// 	url: '/helloworld',
	// 	type: 'POST',
	// 	data: { json: JSON.stringify(scoreObject) },
	// 	dataType: 'json'
	// }).done(
	// 	function () {
			this.onScoreSubmitted.bind(this)
			this.onScoreSubmitted();
			// TODO: double check if user is still in highscore while others submit new scores
			$('#highscores .message').text('Congratulations '+scoreObject.name+', you made it in the highscores.')
		// }
		// )
		// .error(
		// function () {
		// 	console.log('Highscores::error posting score to server')
		// }
		// );

}

GAME.Highscores.prototype.onScoreSubmitted = function (response) {
	console.log("Highscores::scoreSubmitted: " + response);

	// Prevent player from submitting same score (get's cancelled on restart)
	GAME.alreadySubmitted = true;

	// Close submit slide out
	$('body').removeClass('show-submit');
	// now load up the scores!
	this.onScoresRecieved.bind(this);
	this.onScoresRecieved();
}

GAME.Highscores.prototype.onScoresRecieved = function (response) {

	// Update scores from server
	scores = this.getScoresFromApi();

	// Update DOM
	this.populateHighscores();

	// Display highscores
	$('body').addClass('show-highscores');
}

// DOM Manipulation outside of canvas
GAME.Highscores.prototype.populateHighscores();
	