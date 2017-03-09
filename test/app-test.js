var request = require('request');
var expect = require('chai').expect;
var app = require('../myapp/app.js')

describe('Searching for Artist', function() {
	describe ('Null Input', function() {
		it ('Returns 404 Page Not Found', function(done) {
			request ({
				method: 'GET',
				url: 'http://localhost:3000/wordcloud/'
			}, (err, res, body) => {
				expect(res.statusCode).to.equal(404);
				done();
			});
		});
	});

	describe ('Bad Input', function() {
		it ('Returns 500 Internal Server Error/Artist Not Found', function(done) {
			request ({
				method: 'GET',
				url: 'http://localhost:3000/wordcloud/asd;flkjasdf'
			}, (err, res, body) => {
				expect(res.statusCode).to.equal(500);
				done();
			});
		});
	});

	describe ('Good Input', function() {
		it ('Does not return 404 Page Not Found', function(done) {
			request ({
				method: 'GET',
				url: 'http://localhost:3000/wordcloud/Justin Bieber'
			}, (err, res, body) => {
				expect(res.statusCode).to.not.equal(404);
				done();
			});
		});

		it ('Does not return 500 Artist Not Found', function(done) {
			request ({
				method: 'GET',
				url: 'http://localhost:3000/wordcloud/Justin Bieber'
			}, (err, res, body) => {
				expect(res.statusCode).to.not.equal(404);
				done();
			});
		});

		it ('Does not return undefined response', function(done) {
			request ({
				method: 'GET',
				url: 'http://localhost:3000/wordcloud/Justin Bieber'
			}, (err, res, body) => {
				expect(body).to.exist;
				done();
			});
		});				
	});
});

describe ('Merging An Artist', function() {
	describe ('Null Input', function() {
		it ('Returns 404 Page Not Found', function(done) {
			request ({
				method: 'GET',
				url: 'http://localhost:3000/merge/'
			}, (err, res, body) => {
				expect(res.statusCode).to.equal(404);
				done();
			});
		});
	});

	describe ('Bad Input', function() {
		it ('Returns 500 Internal Server Error/Artist Not Found', function(done) {
			request ({
				method: 'GET',
				url: 'http://localhost:3000/merge/Justin Timberlake/asd;flkjasdf'
			}, (err, res, body) => {
				expect(res.statusCode).to.equal(500);
				done();
			});
		});
	});

	describe ('Good Input 1', function() {
		it ('Does not return 404 Page Not Found', function(done) {
			request ({
				method: 'GET',
				url: 'http://localhost:3000/merge/Justin Timberlake/Bruno Mars'
			}, (err, res, body) => {
				expect(res.statusCode).to.not.equal(404);
				done();
			});
		});

		it ('Does not return 500 Artist Not Found', function(done) {
			request ({
				method: 'GET',
				url: 'http://localhost:3000/merge/Justin Timberlake/Sia'
			}, (err, res, body) => {
				expect(res.statusCode).to.not.equal(404);
				done();
			});
		});

		it ('Does not return undefined response', function(done) {
			request ({
				method: 'GET',
				url: 'http://localhost:3000/merge/Justin Timberlake/Avicii'
			}, (err, res, body) => {
				expect(body).to.exist;
				done();
			});
		});				
	});
	describe ('Good Input 2', function() {
		it ('Does not return 404 Page Not Found', function(done) {
			request ({
				method: 'GET',
				url: 'http://localhost:3000/merge/Avicii/Justin Timberlake'
			}, (err, res, body) => {
				expect(res.statusCode).to.not.equal(404);
				done();
			});
		});

		it ('Does not return 500 Artist Not Found', function(done) {
			request ({
				method: 'GET',
				url: 'http://localhost:3000/merge/Bruno Mars/Justin Timberlake'
			}, (err, res, body) => {
				expect(res.statusCode).to.not.equal(404);
				done();
			});
		});

		it ('Does not return undefined response', function(done) {
			request ({
				method: 'GET',
				url: 'http://localhost:3000/merge/Sia/Justin Timberlake'
			}, (err, res, body) => {
				expect(body).to.exist;
				done();
			});
		});				
	});
});

describe ('Song List with One Artist', function() {
	describe ('Both the Word and the Artist are undefined', function () {
		it ('Returns 404 Page Not Found', function(done) {
			request ({
				method: 'GET',
				url: 'http://localhost:3000/wordsearch/'
			}, (err, res, body) => {
				expect(res.statusCode).to.equal(404);
				done();
			});
		});		
	});
	describe ('Artist is undefined', function () {
		it ('Returns 404 Page Not Found', function(done) {
			request ({
				method: 'GET',
				url: 'http://localhost:3000/wordsearch/:word'
			}, (err, res, body) => {
				expect(res.statusCode).to.equal(404);
				done();
			});
		});		
	});
	describe ('Word Bad Input', function () {
		it ('Returns 500 Internal Server Error/Artist Not Found', function(done) {
			request ({
				method: 'GET',
				url: 'http://localhost:3000/wordsearch/lk;jh/Coldplay'
			}, (err, res, body) => {
				expect(res.statusCode).to.equal(500);
				done();
			});
		});
	});
	describe ('Artist Bad Input', function () {
		it ('Returns 500 Internal Server Error/Artist Not Found', function(done) {
			request ({
				method: 'GET',
				url: 'http://localhost:3000/wordsearch/you/lk;jh'
			}, (err, res, body) => {
				expect(res.statusCode).to.equal(500);
				done();
			});
		});
	});
	describe ('Good Input', function() {
		it ('Does not return 404 Page Not Found', function(done) {
			request ({
				method: 'GET',
				url: 'http://localhost:3000/wordsearch/you/Coldplay'
			}, (err, res, body) => {
				expect(res.statusCode).to.not.equal(404);
				done();
			});
		});

		it ('Does not return 500 Artist Not Found', function(done) {
			request ({
				method: 'GET',
				url: 'http://localhost:3000/wordsearch/you/Coldplay'
			}, (err, res, body) => {
				expect(res.statusCode).to.not.equal(404);
				done();
			});
		});

		it ('Does not return undefined response', function(done) {
			request ({
				method: 'GET',
				url: 'http://localhost:3000/wordsearch/you/Coldplay'
			}, (err, res, body) => {
				expect(body).to.exist;
				done();
			});
		});				
	});
});
describe ('Song List with Two Artists', function() {
	describe ('Artist 1 Bad Input', function () {
		it ('Returns 500 Internal Server Error/Artist Not Found', function(done) {
			request ({
				method: 'GET',
				url: 'http://localhost:3000/wordsearch/you/lk;jh/Coldplay'
			}, (err, res, body) => {
				expect(res.statusCode).to.equal(500);
				done();
			});
		});
	});
	describe('Artist 2 Bad Input', function () {
		it ('Returns 500 Internal Server Error/Artist Not Found', function(done) {
			request ({
				method: 'GET',
				url: 'http://localhost:3000/wordsearch/you/Maroon 5/lk;jh'
			}, (err, res, body) => {
				expect(res.statusCode).to.equal(500);
				done();
			});
		});
	});
	describe ('Good Input', function() {
		it ('Does not return 404 Page Not Found', function(done) {
			request ({
				method: 'GET',
				url: 'http://localhost:3000/wordsearch/you/Coldplay/Maroon 5'
			}, (err, res, body) => {
				expect(res.statusCode).to.not.equal(404);
				done();
			});
		});

		it ('Does not return 500 Artist Not Found', function(done) {
			request ({
				method: 'GET',
				url: 'http://localhost:3000/wordsearch/you/Coldplay/Maroon 5'
			}, (err, res, body) => {
				expect(res.statusCode).to.not.equal(404);
				done();
			});
		});

		it ('Does not return undefined response', function(done) {
			request ({
				method: 'GET',
				url: 'http://localhost:3000/wordsearch/you/Coldplay/Maroon 5'
			}, (err, res, body) => {
				expect(body).to.exist;
				done();
			});
		});				
	});
});

describe('Lyrics Page', function() {
	describe ('Artist, Song, and Word are undefined', function () {
		it ('Returns 404 Page Not Found', function(done) {
			request ({
				method: 'GET',
				url: 'http://localhost:3000/song/'
			}, (err, res, body) => {
				expect(res.statusCode).to.equal(404);
				done();
			});
		});		
	});
	describe ('Song and Word are undefined', function () {
		it ('Returns 404 Page Not Found', function(done) {
			request ({
				method: 'GET',
				url: 'http://localhost:3000/song/:artist'
			}, (err, res, body) => {
				expect(res.statusCode).to.equal(404);
				done();
			});
		});		
	});
	describe ('Word is undefined', function () {
		it ('Returns 404 Page Not Found', function(done) {
			request ({
				method: 'GET',
				url: 'http://localhost:3000/song/:artist/:song'
			}, (err, res, body) => {
				expect(res.statusCode).to.equal(404);
				done();
			});
		});		
	});	
	describe ('Song Bad Input', function () {
		it ('Returns 500 Internal Server Error/Artist Not Found', function(done) {
			request ({
				method: 'GET',
				url: 'http://localhost:3000/song/Justin Bieber/113673904/you'
			}, (err, res, body) => {
				expect(res.statusCode).to.equal(500);
				done();
			});
		});
	});
	describe ('Good Input', function() {
		it ('Does not return 404 Page Not Found', function(done) {
			request ({
				method: 'GET',
				url: 'http://localhost:3000/song/Justin Bieber/113673904/you'
			}, (err, res, body) => {
				expect(res.statusCode).to.not.equal(404);
				done();
			});
		});

		it ('Does not return 500 Artist Not Found', function(done) {
			request ({
				method: 'GET',
				url: 'http://localhost:3000/song/Justin Bieber/113673904/you'
			}, (err, res, body) => {
				expect(res.statusCode).to.not.equal(500);
				done();
			});
		});

		it ('Does not return undefined response', function(done) {
			request ({
				method: 'GET',
				url: 'http://localhost:3000/song/Justin Bieber/113673904/you'
			}, (err, res, body) => {
				expect(body).to.exist;
				done();
			});
		});				
	});
});
