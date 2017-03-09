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

var stopWords= ['a','about','am','an','and','any','are','arent',
			'as','at','be','been','both','but','by','cant','cannot','could','couldnt',
			'did','didnt','do','does','doesnt','doing','dont','each','few','for','from',
			'had','hadnt','has','hasnt','havent','having','hed','hes','here','heres','hers',
			'herself','himself','how','hows','i','id','ill','im','ive','if','in','is','isnt',
			'it','its','itself','lets','more','most','mustnt','my','myself','nor','of','on',
			'or','ought','shant','shed','shouldnt','so','some','such','than','that','thats',
			'the','their','theirs','them','themselves','then','there','theres','these','theyd',
			'theyll','theyre','theyve','this','through','to','too','up','was','wasnt','wed',
			'well','weve','werent','what','whats','whens','wheres','which','while','who',
			'whos','whom','whys','with','yourself','yourselves']

var songMap = new Map();
var cache = new Map();

app.get('/', function(req,res) {
	res.render('index')
})

app.get('/styles.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'styles', 'main.css'));
});

app.get('/lyrics.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'styles', 'lyrics.css'));
});


app.get('/wordcloud2.js', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'node_modules', 'wordcloud', 'src',  'wordcloud2.js'));
});

app.get('/wordcloudpage.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'scripts', 'wordcloudpage.js'));
});

app.get('/wordcloud/', (req, res) => {
	res.status(404).send('404 Page Not Found');
})

app.get('/merge/', (req, res) => {
	res.status(404).send('404 Page Not Found');
})

app.get('/wordsearch/', (req, res) => {
	res.status(404).send('404 Page Not Found');
})

app.get('/wordsearch/:word', (req, res) => {
	res.status(404).send('404 Page Not Found');
})

app.get('/song/', (req, res) => {
	res.status(404).send('404 Page Not Found');
})

app.get('/song/:artist', (req, res) => {
	res.status(404).send('404 Page Not Found');
})

app.get('/song/:artist/:track', (req, res) => {
	res.status(404).send('404 Page Not Found');
})

app.get('/wordcloud/:artist', (req, res) => {
  var artist_name = req.params.artist;
  if (cache.has(artist_name)){
  	var words = cache.get(artist_name);
  	words = words.join();
  	res.render('wordcloud', {get: {artist1: artist_name, artist2: "", list: words}});
  }
  else {
	  request.get({
		url: 'http://localhost:3000/api/artistsearch',
		qs: {
		  artist: artist_name
		}

		}, (err, response, body) => {
		  /* istanbul ignore if */
		  if (err)
		  	return res.status(500).send('ERROR');

		  if (response.statusCode === 500) {
		  	return res.status(500).send('500 Artist Not Found');
		  }
	      var result = JSON.parse(body);
	      result = _.orderBy(_.keys(result),key => result[key], 'desc');
	      if (result.size > 250) {
	      	result = result.slice(0,250);
	      }
	      cache.set(artist_name, result);

	      result = result.join();

	      res.render('wordcloud', { get: {artist1: artist_name, artist2: "", list: result}});

		})
	}
});

app.get('/merge/:artist/:artist2', (req, res) => {
	var artist1 = req.params.artist;
	var artist2 = req.params.artist2;
	if (cache.has(artist1) && cache.has(artist2)) {
		var words1 = cache.get(artist1);
		var words2 = cache.get(artist2);
		words = _.union(words2, words1);
		words = words.join();
		if (words.size > 250) {
		  	words = words.slice(0,250);
		}

		res.render('wordcloud', {get: {artist1: artist1, artist2: artist2, list: words}})
	}
	else {
	  if (cache.has(artist1) && !cache.has(artist2)) {
		var words1 = cache.get(artist1);
		request.get({
		url: 'http://localhost:3000/api/artistsearch',
		qs: {
		  artist: artist2
		}

		}, (err, response, body) => {

		  /* istanbul ignore if */		  
		  if (err)
		  	return res.status(500).send('ERROR');

		  if (response.statusCode === 500) {
		  	return res.status(500).send('500 Artist Not Found');
		  }

	      var result = JSON.parse(body);
	      result = _.orderBy(_.keys(result),key => result[key], 'desc');
	      if (result.size > 250) {
	      	result = result.slice(0,250);
	      }
	      cache.set(artist2, result);

	      words = _.union(result, words1);
	      if (words.size > 250) {
		  	words = words.slice(0,250);
		  }
		  words = words.join();

	      res.render('wordcloud', { get: {artist1: artist1, artist2: artist2, list: words}});

		})
	  }
	  else {
	  	if (cache.has(artist2) && !cache.has(artist1)) {
			var words2 = cache.get(artist2);
			request.get({
			url: 'http://localhost:3000/api/artistsearch',
			qs: {
			  artist: artist1
			}

			}, (err, response, body) => {
		  	  /* istanbul ignore if */
			  if (err)
			  	return res.status(500).send('ERROR');	

			  if (response.statusCode === 500) {
			  	return res.status(500).send('500 Artist Not Found');
			  }

		      var result = JSON.parse(body);
		      result = _.orderBy(_.keys(result),key => result[key], 'desc');
		      if (result.size > 250) {
		      	result = result.slice(0,250);
		      }
		      cache.set(artist1, result);

		      words = _.union(result, words2);
		      if (words.size > 250) {
			  	words = words.slice(0,250);
			  }
			  words = words.join();

		      res.render('wordcloud', { get: {artist1: artist1, artist2: artist2, list: words}});

			})
	  	}
	  	else {
		  	request.get({
			url: 'http://localhost:3000/api/artistsearch',
			qs: {
			  artist: artist1
			}

			}, (err, response, body) => {
			  /* istanbul ignore if */ 
			  if (err)
			  	return res.status(500).send('ERROR');	

			  if (response.statusCode === 500) {
			  	return res.status(500).send('500 Artist Not Found');
			  }

		      var result1 = JSON.parse(body);
		      result1 = _.orderBy(_.keys(result1),key => result1[key], 'desc');
		      if (result1.size > 250) {
		      	result1 = result1.slice(0,250);
		      }
		      cache.set(artist1, result1);

		      request.get({
				url: 'http://localhost:3000/api/artistsearch',
				qs: {
				  artist: artist2
				}

				}, (err2, response2, body2) => {
				  /* istanbul ignore if */
				  if (err2)
			  		return res.status(500).send('ERROR');

			  	  if (response2.statusCode === 500) {
			  		return res.status(500).send('500 Artist Not Found');
			 	  }

			      var result2 = JSON.parse(body2);
			      result2 = _.orderBy(_.keys(result2),key => result2[key], 'desc');
			      if (result2.size > 250) {
			      	result2 = result2.slice(0,250);
			      }
			      cache.set(artist2, result2);

			      words = _.union(result2, result1);
				  if (words.size > 250) {
				  	words = words.slice(0,250);
				  }
				  words = words.join();

		      res.render('wordcloud', { get: {artist1: artist1, artist2: artist2, list: words}});
		  	  
		  	  });
		  });
	  	}
	  }
	}
})

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
		  /* istanbul ignore if */
		  if (err)
		  	return res.status(500).send('ERROR');

		  if (response.statusCode === 500) {
		  	return res.status(500).send('500 Word Not Found');
		  }


		  var result = JSON.parse(body);
		  var songs = _.toPairs(result);
		  async.map(songs, function(song, iAmDone) {
		  	var [songTitle, songId] = song;
		  	var wordCount = 0;
		  	if (songMap.has(songTitle) && songMap.get(songTitle)[0] === songId) {
		  		var lyrics = songMap.get(songTitle)[1];
     			var wordArray = lyrics.split(/[^a-zA-Z']/);
     			for (var x of wordArray) {
     				if (x.toLowerCase() === word.toLowerCase()) {
     					++wordCount;
     				}
     			}
		  		iAmDone(null,[songTitle, wordCount])
		  	}
		  	else {
	  			request.get({
	  				url:'http://api.musixmatch.com/ws/1.1/track.lyrics.get',
	    			qs: {
	     				apikey: 'a872c0cf5b5ae365e0406f59a49c6e6a',
	  					track_id: songId
	  				}

	  			}, function(err2, res2, body2) {
	  			  /* istanbul ignore if */
	  			  if (err2)
		  			return res.status(500).send('ERROR');

	     			var lyricResult = JSON.parse(body2);
	     			var lyrics = lyricResult.message.body.lyrics.lyrics_body;
	     			songMap.set(songTitle, [songId, lyrics]);
	     			var wordArray = lyrics.split(/[^a-zA-Z']/);
	     			for (var x of wordArray) {
	     				if (x.toLowerCase() === word.toLowerCase()) {
	     					++wordCount;
	     				}
	     			}

	    			iAmDone(null, [songTitle, wordCount]);
 				});
	  		}
		}, function(err3, result3) {
			 /* istanbul ignore if */
			 if (err3)
		  		return res.status(500).send('ERROR');
			 result3 = _.fromPairs(result3);
			 var freqs = [];
			 for (var key in result3){
			 	freqs.push(result3[key]);
			 }
		 result3 = _.orderBy(_.keys(result),key => result[key], 'desc');
			 result3 = result3.join();
			 freqs.sort(function(a,b) {return b-a});
			 freqs = freqs.join();
			 res.render('word', { get: {word: word, songs: result3, freqs: freqs, artist: artist}}); 

	})
	}
  );
});

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
		  /* istanbul ignore if */
		  if (err)
		  	return res.status(500).send('ERROR');

		  if (response.statusCode === 500) {
		  	return res.status(500).send('500 Word Not Found');
		  }

		  var result = JSON.parse(body);
		  var songs = _.toPairs(result);
		  async.map(songs, function(song, iAmDone) {
		  	var [songTitle, songId] = song;
		  	var wordCount = 0;
		  	if (songMap.has(songTitle) && songMap.get(songTitle)[0] === songId) {
		  		var lyrics = songMap.get(songTitle)[1];
     			var wordArray = lyrics.split(/[^a-zA-Z']/);
     			for (var x of wordArray) {
     				if (x.toLowerCase() === word.toLowerCase()) {
     					++wordCount;
     				}
     			}
		  		iAmDone(null,[songTitle, wordCount])
		  	}
		  	else {
	  			request.get({
	  				url:'http://api.musixmatch.com/ws/1.1/track.lyrics.get',
	    			qs: {
	     				apikey: 'a872c0cf5b5ae365e0406f59a49c6e6a',
	  					track_id: songId
	  				}

	  			}, function(err2, res2, body2) {
	  			  /* istanbul ignore if */
	  			  if (err2)
		  			return res.status(500).send('ERROR');

	     			var lyricResult = JSON.parse(body2);
	     			var lyrics = lyricResult.message.body.lyrics.lyrics_body;
	     			songMap.set(songTitle, [songId, lyrics]);
	     			var wordArray = lyrics.split(/[^a-zA-Z']/);
	     			for (var x of wordArray) {
	     				if (x.toLowerCase() === word.toLowerCase()) {
	     					++wordCount;
	     				}
	     			}

	    			iAmDone(null, [songTitle, wordCount]);
 				});
	  		}
		}, function(err3, result3) {
		  	/* istanbul ignore if */
		  	if (err3)
		  		return res.status(500).send('ERROR');

			 result3 = _.fromPairs(result3);
			 var freqs = [];
			 for (var key in result3){
			 	freqs.push(result3[key]);
			 }
		 result3 = _.orderBy(_.keys(result),key => result[key], 'desc');
			 result3 = result3.join();
			 freqs.sort(function(a,b) {return b-a});
			 freqs = freqs.join();
			 res.render('word', { get: {word: word, songs: result3, freqs: freqs, artist: artist}}); 

	})
	}
  );
});

app.get('/api/artistsearch', (req, res) => {
  request.get({
    url: 'http://api.musixmatch.com/ws/1.1/artist.search',
    qs: {
      apikey: 'a872c0cf5b5ae365e0406f59a49c6e6a',
      q_artist: req.query.artist,
      page_size: 2
    }

    }, (err, response, body) => {
      /* istanbul ignore if */
      if (err)
		  return res.status(500).send('ERROR');

      const artistResults = JSON.parse(body); 
      if (artistResults.message.body.artist_list[0] == null) {
 		  return res.status(500).send('500 Artist Not Found');     	
      }
      request.get({
      	url:'http://localhost:3000/api/trackget',
      	qs: {
      		artist_id: artistResults.message.body.artist_list[0].artist.artist_id,
      	}
      }, (err2, response2, body2) => {
      	/* istanbul ignore if */
      	if (err2)
		  return res.status(500).send('ERROR');

  	  	var result = JSON.parse(body2);
  	  	res.type('json');
  	  	res.send(result);
  	  })

    }
  );
});

app.get('/api/trackget', (req, res) => {
	request.get({
		url:'http://api.musixmatch.com/ws/1.1/track.search',
		qs:{
			apikey: 'a872c0cf5b5ae365e0406f59a49c6e6a',
			f_artist_id: req.query.artist_id,
			page_size: 6,
			s_track_rating: "desc"
		}
	}, (err, response, body) => {
	  /* istanbul ignore if */
	  if (err)
		  return res.status(500).send('ERROR');

		var result = JSON.parse(body);
		var track_names = _.map(result.message.body.track_list, 'track.track_name');
		var track_ids = _.map(result.message.body.track_list, 'track.track_id');
 		var tracks = _.fromPairs(_.unzip([track_names, track_ids]));
 		tracks = _.toPairs(tracks);

		async.map(tracks, function(track, iAmDone) {
			for (key in track) {
				var trackName = key;
				var trackId = track[key];
			}
			var myMap = new Map();
			/* istanbul ignore if*/
			if (songMap.has(trackName) && songMap.get(trackName)[0] === trackId) {
				lyrics = songMap.get(trackName)[1];
				var wordArray = lyrics.split(/[^a-zA-Z']/);
				for (i = 0; i < wordArray.length; i++) {
					if (wordArray[i] !== "") {
						word = wordArray[i].toLowerCase().replace(/'/g, "");
						if (stopWords.indexOf(word) < 0){
							if (myMap.has(word)) {
								myMap.set(word, myMap.get(word)+1);
							} 
							else {
								myMap.set(word, 1);
							}
						}
					}
				}
				iAmDone(null, myMap);
			}
			else {
				request.get({
					url: 'http://api.musixmatch.com/ws/1.1/track.lyrics.get',
					qs: {
						apikey: 'a872c0cf5b5ae365e0406f59a49c6e6a',
						track_id: trackId
					}
				}, function(err2, response2, body2) {
				  /* istanbul ignore if */
				  if (err2)
		  			return res.status(500).send('ERROR');

					var lyricResult = JSON.parse(body2);
	     			var lyrics = lyricResult.message.body.lyrics.lyrics_body;
	     			songMap.set(trackName, [trackId, lyrics]);
					var wordArray = lyrics.split(/[^a-zA-Z']/);
					for (i = 0; i < wordArray.length; i++) {
						if (wordArray[i] !== "") {
							word = wordArray[i].toLowerCase().replace(/'/g, "");
							if (stopWords.indexOf(word) < 0){
								if (myMap.has(word)) {
									myMap.set(word, myMap.get(word)+1);
								} 
								else {
									myMap.set(word, 1);
								}
							}
						}
					}
					iAmDone(null, myMap);
				})
			}
		}, function (err3, result3) {
		  /* istanbul ignore if */
		  if (err3)
		  	return res.status(500).send('ERROR');	

			var mergeMap = new Map();
			for (var y = 0; y < result3.length; y++) {
				var map = result3[y];
				for (var word of map.keys()) {
					if (mergeMap.has(word)) {
						mergeMap.set(word, mergeMap.get(word) + map.get(word));
					}
					else {
						mergeMap.set(word, map.get(word));
					}
				}
			}
			var obj = Object.create(null);
			for ([k,v] of mergeMap) {
				obj[k] = v;
			}
			res.type('json')
			res.send(JSON.stringify(obj));
		})
	})
})


//word
app.get('/api/wordsearch', (req, res) => {
  var artist = req.query.q_artist
  var artist2 = req.query.q_artist2
  if (!artist2) {
	  request.get({
	    url: 'http://api.musixmatch.com/ws/1.1/track.search',
	    qs: {
	      apikey: 'a872c0cf5b5ae365e0406f59a49c6e6a',
	      q_lyrics: req.query.word,
	      q_artist: artist,
	      f_has_lyrics: 1,
	      page_size: 5
	    }

	    }, (err, response, body) => {
	      /* istanbul ignore if */
	      if (err)
		  	return res.status(500).send('ERROR');

	      var songResults = JSON.parse(body);   

		  if (songResults.message.body.track_list[0] == null) {
		  	return res.status(500).send('500 Word Not Found');		  	
		  }

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
	      apikey: 'a872c0cf5b5ae365e0406f59a49c6e6a',
	      q_lyrics: req.query.word,
	      q_artist: artist,
     	  f_has_lyrics: 1,
	      page_size: 3
	    }

	    }, (err, response, body) => {
	      /* istanbul ignore if */
	      if (err)
		  	return res.status(500).send('ERROR');

	      var songResults1 = JSON.parse(body);

		  if (songResults1.message.body.track_list[0] == null) {
		  	return res.status(500).send('500 Word Not Found');		  	
		  }

	      var track_ids1 = _.map(songResults1.message.body.track_list, 'track.track_id');
	      var track_names1 = _.map(songResults1.message.body.track_list, 'track.track_name');


	      request.get ({
	      	url: 'http://api.musixmatch.com/ws/1.1/track.search',
	    	qs: {
	     	  apikey: 'a872c0cf5b5ae365e0406f59a49c6e6a',
	     	  q_lyrics: req.query.word,
	     	  q_artist: artist2,
	     	  f_has_lyrics: 1,
	      	  page_size: 2
	 	    }	

	  	  }, (err2, response2, body2) => {
	  	  	/* istanbul ignore if */
	  	  	if (err2)
		  		return res.status(500).send('ERROR');

	    	var songResults2 = JSON.parse(body2);

	    	if (songResults2.message.body.track_list[0] == null) {
		  		return res.status(500).send('500 Word Not Found');		  	
		  	}

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

app.get('/song/:artist/:track/:word', (req, res) => {
	var song = req.params.track;
	var artist = req.params.artist;
	var word = req.params.word;
	if (!songMap.has(song)) {
		res.status(500).send('500 Song Not Found')
	}
	else {
		var lyrics = songMap.get(song)[1];
		res.render('lyrics', {get: {song: song, lyrics: lyrics, artist: artist, word: word}});
	}
})

//if (!module.parent){
	http.createServer(app).listen(app.get('port'), function(){
	  console.log('Express server listening on port ' + app.get('port'));
	});
//}

