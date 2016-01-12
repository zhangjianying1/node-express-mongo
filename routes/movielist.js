var express = require('express');
var router = express.Router();
var Kind = require('../model/kind');

router.get('/:id', function(req, res, next) {
	var id = req.params.id;

	if (id) {
		Kind.findById(id)
		.populate({
			path: 'movies',
			select: 'title url sellprice dirs'
		})
		.exec(function(err, kind) {
			if (err) {
				console.log(err);
			}
			console.log(kind)
			res.render('movielist', {title: 'MovieList', movie: kind});
		});
	}
});

module.exports = router;