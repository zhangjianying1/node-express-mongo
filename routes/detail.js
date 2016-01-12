var express = require('express');
var router = express.Router();
var Comment = require('../model/comment');
var Movie = require('../model/movie');

router.get('/:id', function(req, res, next) {
	var id = req.params.id;
	var p =  req.query.p || 0;
	var number = 2;
	var pages = 0;
	
	if (id) {
		Movie.update({_id: id}, {$inc: {pv: 1}}).exec(function(err){
			if (err) {
				console.log(err)
			}
		});
		Movie.findById(id, function(err, movie) {
			
			if (err) {
				console.log(err);
			} else {
				
				Comment.fetchId(movie._id, function(err, comments) {
					if (err) {
						console.log(err);
					} else if (comments){
						
						pages = Math.ceil(comments.length / number);
						
						res.render('detail', {
							title: 'detail', 
							movie: movie, 
							comments: comments.slice(p*number, p*number + 2),
							pages: pages,
							p: p 
						});	
					} else {
						res.render('detail', {title: 'detail', movie: movie});	
					}
				});
			
			}
		});
	}
});
module.exports = router;