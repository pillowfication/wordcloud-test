var request = require('request');
var async = require('async')
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

app.get('/wordcloud2.js', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'node_modules', 'wordcloud', 'src',  'wordcloud2.js'));
});

app.get('/wordcloudpage.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'scripts', 'wordcloudpage.js'));
});

app.get('/wordcloud/:artist', (req, res) => {
  var artist_name = req.params.artist;
  request.get({
	url: 'http://localhost:3000/api/artistsearch',
	qs: {
	  artist: artist_name
	}

	}, (err, response, body) => {
	  if (err)
        return response.status(500).send('ERROR');

      var result = JSON.parse(body);
      result = _.orderBy(_.keys(result),key => result[key], 'desc');

      res.render('wordcloud', { get: {artist_name: artist_name, list: result}});
      //res.type('json');
      //res.send(send)
	})
});

app.get('/wordsearch/:word/:artist', (req, res) => {
	var word = req.params.word;
	var artist = req.params.artist;
	request.get ({
		url:'http://localhost:3000/api/wordsearch',
		qs: {
			q_artist: artist,
			word: word
		}

		}, (err, response, body) => {

		  var result = JSON.parse(body);
		  var songs = _.toPairs(result);

		  async.map(songs, function(song, iAmDone) {
		  	var [songTitle, songId] = song;
  			request.get({
  				url:'http://api.musixmatch.com/ws/1.1/track.lyrics.get',
    			qs: {
     				apikey: '101ee0383f1dc5b5665ba357d7a00514',
  					track_id: songId
  				}

  			}, function(err2, res2, body2) {
    			if (err2)
     			 iAmDone(err2);

     			var wordCount = 0;
     			var lyricResult = JSON.parse(body2);
     			var lyrics = lyricResult.message.body.lyrics.lyrics_body;
     			var wordArray = lyrics.split(/[^a-zA-Z']/);
     			for (var x of wordArray) {
     				if (x === word) {
     					++wordCount;
     				}
     			}

    			iAmDone(null, [songTitle, wordCount]);
 			});
			}, function(err3, result3) {
  			if (err3) {
   			 // if one of the request.get calls failed...
 			 }
 			 result3 = _.fromPairs(result3);
 			 res.type('json')
 			 res.send(result3); // result is an array of all the COUNTs in iAmDone(null, COUNT);
		  });
		  //res.type('json');
		  //res.send(result); 
		  //res.render('word');
		})
	}
);

app.get('/wordsearch/:word/:artist/:artist2', (req,res) => {
	var word = req.params.word;
	var artist = req.params.artist;
	var artist2 = req.params.artist2;
	request.get ({
		url:'http://localhost:3000/api/wordsearch',
		qs: {
			q_artist: artist,
			q_artist2: artist2,
			word: word
		}

		}, (err, response, body) => {

		  var result = JSON.parse(body);
		  var songs = _.toPairs(result);

		  async.map(songs, function(song, iAmDone) {
		  	var [songTitle, songId] = song;
  			request.get({
  				url:'http://api.musixmatch.com/ws/1.1/track.lyrics.get',
    			qs: {
      				apikey: '101ee0383f1dc5b5665ba357d7a00514',
  					track_id: songId
  				}

  			}, function(err2, res2, body2) {
    			if (err2)
     			 iAmDone(err2);

     			var wordCount = 0;
     			var lyricResult = JSON.parse(body2);
     			var lyrics = lyricResult.message.body.lyrics.lyrics_body;
     			var wordArray = lyrics.split(/[^a-zA-Z']/);
     			for (var x of wordArray) {
     				if (x === word) {
     					++wordCount;
     				}
     			}

    			iAmDone(null, [songTitle, wordCount]);
 			});
			}, function(err3, result3) {
  			if (err3) {
   			 // if one of the request.get calls failed...
 			 }
 			 result3 = _.fromPairs(result3);
 			 res.type('json')
 			 res.send(result3); // result is an array of all the COUNTs in iAmDone(null, COUNT);
		  });
		  //res.type('json');
		  //res.send(result); 
		  //res.render('word');
		})
	}
);

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
      		artist_id: artistResults.message.body.artist_list[0].artist.artist_id,
      	}
      }, (err2, response2, body2) => {
  	  	if (err2)
  	  		return response2.status(500).send('ERROR');

  	  	
  	  	var result = JSON.parse(body2);
  	  	res.type('json');
  	  	res.send(result);
  	  })

    }
  );
});


app.get('/api/albumget', (req, res) => {
	request.get ({
		url: 'http://api.musixmatch.com/ws/1.1/artist.albums.get',
		qs: {
			apikey: '101ee0383f1dc5b5665ba357d7a00514',
			artist_id: req.query.artist_id,
			page_size: 6,
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
						page_size: 3,
						f_has_lyrics: 1
					}

					}, (err2, response2, body2) => {
						if (err2)
							return response2.status(500).send('ERROR');

						const trackResults = JSON.parse(body2);

						var track_ids = _.map(trackResults.message.body.track_list, 'track.track_id');
						for (y in track_ids){
							request.get ( {
								url: 'http://api.musixmatch.com/ws/1.1/track.lyrics.get',
								qs: {
									apikey:'101ee0383f1dc5b5665ba357d7a00514',
									track_id: track_ids[y]
								}

								}, (err3, response3, body3) => {
									if (err3)
										return response3.status(500).send('ERROR');

									const lyricResults = JSON.parse(body3);

									var lyrics = lyricResults.message.body.lyrics.lyrics_body;
									var wordArray = lyrics.split(/[^a-zA-Z']/);
									for (i = 0; i < wordArray.length; i++) {
										if (wordArray[i] !== "") {
											word = wordArray[i].toLowerCase()
											if (myMap.has(word)) {
												myMap.set(word, myMap.get(word)+1);
											} 
											else {
												myMap.set(word, 1);
											}
										}
									}
								}
							)
						}
					}
				)
			}
			setTimeout(function() {
				var obj = Object.create(null);
				for ([k,v] of myMap){
					obj[k] = v;
				}
				console.log("fuck" + obj['what'])
				res.type('json');
				obj = JSON.stringify(obj);
				res.send(obj);
			}, 500);
		}	
	)
});

//word
app.get('/api/wordsearch', (req, res) => {
  var artist = req.query.q_artist
  var artist2 = req.query.q_artist2
  if (!artist2) {
	  request.get({
	    url: 'http://api.musixmatch.com/ws/1.1/track.search',
	    qs: {
	      apikey: '101ee0383f1dc5b5665ba357d7a00514',
	      q_lyrics: req.query.word,
	      q_artist: artist,
	      f_has_lyrics: 1,
	      page_size: 5
	    }

	    }, (err, response, body) => {
	      if (err)
	        return response.status(500).send('ERROR'); 

	      var songResults = JSON.parse(body);    
	      var track_names = _.map(songResults.message.body.track_list, 'track.track_name');	      
	      var track_ids = _.map(songResults.message.body.track_list, 'track.track_id');
 		  var track = _.fromPairs(_.unzip([track_names, track_ids]));
  
	      res.type('json');
	      res.send(JSON.stringify(track));
	    }
	  );
  }
  else {
	  request.get({
	    url: 'http://api.musixmatch.com/ws/1.1/track.search',
	    qs: {
	      apikey: '101ee0383f1dc5b5665ba357d7a00514',
	      q_lyrics: req.query.word,
	      q_artist: artist,
     	  f_has_lyrics: 1,
	      page_size: 3
	    }

	    }, (err, response, body) => {
	      if (err)
	        return response.status(500).send('ERROR'); 

	      var songResults1 = JSON.parse(body);
	      var track_ids1 = _.map(songResults1.message.body.track_list, 'track.track_id');
	      var track_names1 = _.map(songResults1.message.body.track_list, 'track.track_name');


	      request.get ({
	      	url: 'http://api.musixmatch.com/ws/1.1/track.search',
	    	qs: {
	     	  apikey: '101ee0383f1dc5b5665ba357d7a00514',
	     	  q_lyrics: req.query.word,
	     	  q_artist: artist2,
	     	  f_has_lyrics: 1,
	      	  page_size: 2
	 	    }	

	  	  }, (err2, response2, body2) => {
	  	    if (err2)
	       	  return response2.status(500).send('ERROR'); 

	    	var songResults2 = JSON.parse(body2);
	        var track_ids2 = _.map(songResults2.message.body.track_list, 'track.track_id');
	        var track_names2 = _.map(songResults2.message.body.track_list, 'track.track_name');

	        var track_ids = track_ids1.concat(track_ids2);
	        var track_names = track_names1.concat(track_names2);

 		    var track = _.fromPairs(_.unzip([track_names, track_ids]));
	    	res.type('json');
	    	res.send(JSON.stringify(track));
	  	}	

	);
	});
  };
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

