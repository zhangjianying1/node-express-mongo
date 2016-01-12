var express = require('express');
var router = express.Router();
var Movie = require('../model/movie');
var Kind = require('../model/kind');

router.get('/:id', function(req, res, next) {
	var id = req.params.id;
	var _kinds;

	if (id) {
		Kind.find().exec(function(err, kinds) {
			if (err) {
				console.log(err);
			} else {
				_kinds = kinds;
				Movie.findById(id, function(err, movie) {
					if (err) {
						console.log(err);
					} else {
						res.render('admin', {title: 'edit', movie: movie, kinds: _kinds});
					}
				});
			}
		});
		
	}
});
module.exports = router;