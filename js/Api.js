var API = {
    'highscore': 0,
    'scores': [
        {
            'score': 25200,
            'name': 'Mighty Mouse',
            'email': '',
            'facebook': '',
            'twitter': '',
            'instagram': ''
        },
        {
            'score': 20500,
            'name': 'Disrupt',
            'email': '',
            'facebook': '',
            'twitter': '',
            'instagram': ''
        },
        {
            'score': 19700,
            'name': 'Zoe McPherson',
            'email': '',
            'facebook': '',
            'twitter': '',
            'instagram': ''
        },
        {
            'score': 18200,
            'name': 'Shige',
            'email': '',
            'facebook': '',
            'twitter': '',
            'instagram': ''
        },
        {
            'score': 17300,
            'name': 'Kiki Hitomi',
            'email': '',
            'facebook': '',
            'twitter': '',
            'instagram': ''
        },
    ],
    'csv': []
};


API.getScores = function () {
    console.log('API::getScores')
    GAME.Highscores.prototype.render()
}

API.saveScore = function (score) {
    console.warn('API::saveScore', score)
    console.warn('Saving deactivated in this demo.')
}

API.getCSV = function (hash) {
    console.log('API::getCSV')
    API.createDownloadLink(API.csv);
}

API.ConvertToCSV = function (object) {
    var csv = 'Rank,Score,Name,Email,Facebook,Twitter,Instagram\n'
    i = 0;
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

/* CSV download prompt */
$(document).ready(function () {
    /* Initialize */
    API.getScores();

    if (window.location.hash == '#/9SVtIu8T83') {
        API.getCSV(window.location.hash)
    }
})