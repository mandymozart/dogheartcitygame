// Initialize Firebase
var config = {
    apiKey: "AIzaSyBajpFCLdgfNBnuTB5c7cY-ZyO2KWQPChM",
    authDomain: "dogheartcity.firebaseapp.com",
    databaseURL: "https://dogheartcity.firebaseio.com",
    storageBucket: "dogheartcity.appspot.com",
    messagingSenderId: "505899840153"
};
firebase.initializeApp(config);

var database = firebase.database();


var API = {};

API.getScores = function () {
    console.log('API::getScores');
    database.ref().limitToLast(5).orderByChild('score').on('child_added', function (snapshot){
        API.scores = snapshot.val();
        // console.log(API.scores)

        // DOM Manipulation outside of canvas
        GAME.Highscores.prototype.render()
            
    });

}

API.saveScore = function (score) {
    // console.log('API::saveScore')
    database.ref('scores').push(score);
}

/* Initialize */
API.getScores();