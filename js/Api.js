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


var API = {
    'scores' : [],
    // 'scores': [
    //     {
    //         'score': 0,
    //         'name': 'test_empty',
    //         'email': '',
    //         'facebook': '',
    //         'twitter': '',
    //         'instagram': ''
    //     },
    //     {
    //         'score': 0,
    //         'name': '',
    //         'email': '',
    //         'facebook': '',
    //         'twitter': '',
    //         'instagram': ''
    //     },
    //     {
    //         'score': 0,
    //         'name': '',
    //         'email': '',
    //         'facebook': '',
    //         'twitter': '',
    //         'instagram': ''
    //     },
    //     {
    //         'score': 0,
    //         'name': '',
    //         'email': '',
    //         'facebook': '',
    //         'twitter': '',
    //         'instagram': ''
    //     },
    //     {
    //         'score': 0,
    //         'name': '',
    //         'email': '',
    //         'facebook': '',
    //         'twitter': '',
    //         'instagram': ''
    //     },
    // ],
    'csv': []
};


API.getScores = function () {
    console.log('API::getScores')
    // API.scores = []
    var i = 0;
    database.ref('scores').limitToLast(5).orderByChild('score').on('child_added', function (snapshot, error) {
        API.scores.push(snapshot.val())
        i++
        // Wait till top 5 is loaded (dont understand why this is looping)
        if(i>4){ GAME.Highscores.prototype.render() }

    });

}

API.saveScore = function (score) {
    // console.log('API::saveScore')
    database.ref('scores').push(score);
}

API.getCSV = function (hash) {
    console.log('API::getCSV with hash:'+hash)
    if (hash != '#/9SVtIu8T83') return
    console.log('API::permission granted')


    database.ref('scores').orderByChild('score').once('value').then(function (snapshot) {
        API.csv = API.ConvertToCSV(snapshot.val());
        console.log(API.csv)
        API.createDownloadLink(API.csv);
    });
}

API.ConvertToCSV = function (object) {
    var csv = 'Rank,Score,Name,Email,Facebook,Twitter,Instagram\n'
    i=0;
    $.each(object, function (k, score) {
        i++
        // console.log(score.name);
        csv += i + ',' + score.score + ',' + score.name + ',' + score.email + ',' + score.facebook + ',' + score.twitter + ',' + score.instagram + '\n'
    })

    return csv
}

API.createDownloadLink = function (str) {

    var fileName = 'dogheartcity-highscores-' + $.now() + '.csv'
    var blobObject = null

    if (window.navigator.msSaveOrOpenBlob) {
        var fileData = [str]
        blobObject = new Blob(fileData)
        window.navigator.msSaveOrOpenBlob(blobObject, fileName)

    } else {
        var url = "data:text/plain;charset=utf-8," + encodeURIComponent(str)
        $('body').append('<a id="save-csv-button" download="" href="' + url + '">Save as CVS</a>')
        $('#save-csv-button').click(function () {
            $(this).remove()
        })
    }
}


/* Initialize */
API.getScores();

/* CSV download prompt */
$(document).ready(function () {
    if (window.location.hash == '#/9SVtIu8T83') {
        API.getCSV(window.location.hash)
    }
})