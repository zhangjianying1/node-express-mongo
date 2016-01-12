var express = require('express');
var router = express.Router();
var Movie = require('../model/movie');
router.get('/', function(req, res, next) {

	Movie.find(function(err, movie) {
		console.log(movie)
		if (err) {
			console.log(err);
		} else {
			console.log(movie)
		}
		
		res.render('adminlist', {title: 'adminlist', movie: movie});
	});	
});
module.exports = router;