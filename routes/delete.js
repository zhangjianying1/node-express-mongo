var express = require('express');
var router = express.Router();
var Movie = require('../model/movie');

router.get('/:id', function(req, res, next) {
	var id = req.params.id;
	if (id) {
		Movie.delOne(id, function(err, movie) {
			if (err) {
				console.log(err);
			} else {

			}
			res.redirect('/admin/list');
		});
	}
});	
module.exports = router;