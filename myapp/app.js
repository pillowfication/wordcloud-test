var request = require('request');
var _ = require('lodash')
var bodyParser = require('body-parser')

var express = require('express'),
    http = require('http'),
    path = require('path'),

    // require php-express and config
    phpExpress = require('php-express')({
        binPath: '/usr/bin/php' // php bin path.
    });


// init express
var app = express();
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({
	extended: true
}));  // body parser is required!!


// set view engine to php-express
app.set('views', path.join(__dirname, 'views'));
app.engine('php', phpExpress.engine);
app.set('view engine', 'php');
app.use(express.static(path.join(__dirname, 'public')));

// routing all .php file to php-express
app.all(/.+\.php$/, phpExpress.router);

app.get('/', function(req,res) {
	res.render('index')
})

app.get('/styles.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'styles', 'main.css'));
});

app.get('/wordcloud/:artist', (req, res) => {
  request.get({
	url: 'http://localhost:3000/api/artistsearch',
	qs: {
	  artist: req.params.artist
	}

	}, (err, response) => {
	  if (err)
        return response.status(500).send('ERROR');

      res.send(response);
	})
});

app.get('/api/artistsearch', (req, res) => {
  request.get({
    url: 'http://api.musixmatch.com/ws/1.1/artist.search',
    qs: {
      apikey: '101ee0383f1dc5b5665ba357d7a00514',
      q_artist: req.query.artist,
      page_size: 2
    }

    }, (err, response, body) => {
      if (err)
        return response.status(500).send('ERROR'); 

      const artistResults = JSON.parse(body); 
      request.get({
      	url:'http://localhost:3000/api/albumget',
      	qs: {
      		artist_id: artistResults.message.body.artist_list[0].artist.artist_id
      	}
      }, (err2, response2) => {
  	  	if (err2)
  	  		return response2.status(500).send('ERROR');

  	  	res.send(response2)
  	  })

    }
  );
});

var count = 0;
app.get('/api/albumget', (req, res) => {
	request.get ({
		url: 'http://api.musixmatch.com/ws/1.1/artist.albums.get',
		qs: {
			apikey: '101ee0383f1dc5b5665ba357d7a00514',
			artist_id: req.query.artist_id,
			page_size: 5,
			g_album_name: 1

		}

		}, (err, response, body) => {
			if (err)
				return response.status(500).send('ERROR');

			const albumResults = JSON.parse(body);

			var album_ids = _.map(albumResults.message.body.album_list, 'album.album_id');

			var myMap = new Map();
			for (x in album_ids) {
				request.get ({
					url: 'http://api.musixmatch.com/ws/1.1/album.tracks.get',
					qs: {
						apikey: '101ee0383f1dc5b5665ba357d7a00514',
						album_id: album_ids[x],
						page_size: 2,
						f_has_lyrics: 1
					}

					}, (err2, response2, body2) => {
						if (err2)
							return response2.status(500).send('ERROR');

						const trackResults = JSON.parse(body2);
						count++;
						console.log(count);

						var track_ids = _.map(trackResults.message.body.track_list, 'track.track_id');
						for (y in track_ids){
							request.get ( {
								url: 'http://api.musixmatch.com/ws/1.1/track.lyrics.get',
								qs: {
									apikey:'101ee0383f1dc5b5665ba357d7a00514',
									track_id: track_ids[y],
								}

								}, (err3, response3, body3) => {
									if (err3)
										return response3.status(500).send('ERROR');

									const lyricResults = JSON.parse(body3);

									var lyrics = lyricResults.message.body.lyrics.lyrics_body;
									var wordArray = lyrics.match(/[^\s]+/g);
									for (i = 0; i < wordArray.length; i++) {
										word = wordArray[i].toLowerCase()
										if (myMap.has(word)) {
											myMap.set(word, myMap.get(word)+1);
										} 
										else {
											myMap.set(word, 1);
										}
									}
								}
							)
						}
					}
				)
			}
			setTimeout(function() {console.log("fuck" + myMap.get('for'))}, 500);
			res.type('json');
			res.send(JSON.stringify(albumResults));
		}	
	)
});

//word
app.get('/api/wordsearch', (req, res) => {
  request.get({
    url: 'http://api.musixmatch.com/ws/1.1/track.search',
    qs: {
      apikey: '101ee0383f1dc5b5665ba357d7a00514',
      q_lyrics: req.query.word,
      f_has_lyrics: true,
      page_size: 5
    }

    }, (err, response, body) => {
      if (err)
        return response.status(500).send('ERROR'); 

      const searchResults = JSON.parse(body);      
      res.type('json');
      res.send(JSON.stringify(searchResults));
    }
  );
});


//test
app.get('/api/tracksearch', (req, res) => {
  request.get({
    url: 'http://api.musixmatch.com/ws/1.1/chart.artists.get',
    qs: {
      apikey: '101ee0383f1dc5b5665ba357d7a00514',
      page: 1,
      page_size: 3,
      country: req.query.country
    }

    }, (err, response, body) => {
      if (err)
        return response.status(500).send('ERROR'); 

      const searchResults = JSON.parse(body); 
      var artists = _.map(searchResults.message.body.artist_list, 'artist.artist_name');
      var results = {result: artists};

      res.type('json');
      res.send(JSON.stringify(results));
    }
  );
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

