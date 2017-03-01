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

app.get('styles.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'styles', 'main.css'));
});

app.get('/api/artistsearch', (req, res) => {
  // variables defined in the req object can be accessed with req.query.<variable>
  // For example, if you make the request
  // request.get({ url: 'localhost:3000', qs: { foo: 'bar' } });
  // then req.query.foo is set to 'bar'
  // (The above request.get() is equivalent to visiting http://localhost:3000?foo=bar in your browser)

  // make a request to MM for the data
  // Example: https://github.com/pillowfication/myimagerepostuff/blob/master/bot/commands/kuubot-sauce.js#L74
  request.get({
    url: 'http://api.musixmatch.com/ws/1.1/artist.search',
    qs: {
      apikey: '101ee0383f1dc5b5665ba357d7a00514',
      q_artist: req.query.artist,
      page_size: 5
    }

    }, (err, response, body) => {
      if (err)
        return response.status(500).send('ERROR'); // we don't care about proper error codes/statuses (this occurs if requesting failed, or the server responded with an error status)

      const searchResults = JSON.parse(body); // if you need to sanitize the data do it here. I'm assuming MM returns a JSON object
      // sometimes no error is returned, but searchResults is still "bad".
      // for example, we got a good response but authentication failed.
      // then you will need to check that we got the results we are looking for.
      // if (!searchResults)
      //   return response.status(500).send('ERROR');

      // make it here means we got what we wanted
      res.type('json');
      res.send(JSON.stringify(searchResults));
    }
  );
});

app.get('/api/wordsearch', (req, res) => {
  // variables defined in the req object can be accessed with req.query.<variable>
  // For example, if you make the request
  // request.get({ url: 'localhost:3000', qs: { foo: 'bar' } });
  // then req.query.foo is set to 'bar'
  // (The above request.get() is equivalent to visiting http://localhost:3000?foo=bar in your browser)

  // make a request to MM for the data
  // Example: https://github.com/pillowfication/myimagerepostuff/blob/master/bot/commands/kuubot-sauce.js#L74
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
        return response.status(500).send('ERROR'); // we don't care about proper error codes/statuses (this occurs if requesting failed, or the server responded with an error status)

      const searchResults = JSON.parse(body); // if you need to sanitize the data do it here. I'm assuming MM returns a JSON object
      // sometimes no error is returned, but searchResults is still "bad".
      // for example, we got a good response but authentication failed.
      // then you will need to check that we got the results we are looking for.
      // if (!searchResults)
      //   return response.status(500).send('ERROR');

      // make it here means we got what we wanted
      res.type('json');
      res.send(JSON.stringify(searchResults));
    }
  );
});

app.get('/api/tracksearch', (req, res) => {
  // variables defined in the req object can be accessed with req.query.<variable>
  // For example, if you make the request
  // request.get({ url: 'localhost:3000', qs: { foo: 'bar' } });
  // then req.query.foo is set to 'bar'
  // (The above request.get() is equivalent to visiting http://localhost:3000?foo=bar in your browser)

  // make a request to MM for the data
  // Example: https://github.com/pillowfication/myimagerepostuff/blob/master/bot/commands/kuubot-sauce.js#L74
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
        return response.status(500).send('ERROR'); // we don't care about proper error codes/statuses (this occurs if requesting failed, or the server responded with an error status)

      const searchResults = JSON.parse(body); // if you need to sanitize the data do it here. I'm assuming MM returns a JSON object
      // sometimes no error is returned, but searchResults is still "bad".
      // for example, we got a good response but authentication failed.
      // then you will need to check that we got the results we are looking for.
      // if (!searchResults)
      //   return response.status(500).send('ERROR');

      // make it here means we got what we wanted

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

